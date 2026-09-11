import test from 'node:test';
import assert from 'node:assert/strict';
import {Readable} from 'node:stream';
import handler from '../pages/api/[...path].js';
import {makeQaFixture, materializeTechnicalState, unresolvedChecklist} from '../lib/maestro.js';

function req(path,{method='GET',body,headers={}}={}){const raw=body===undefined?'':JSON.stringify(body),r=Readable.from(raw?[Buffer.from(raw)]:[]);r.method=method;r.query={path:path.split('/')};r.headers={host:'console.test',...headers};return r}
function res(){const headers={};return{statusCode:200,body:null,headers,setHeader(k,v){headers[k.toLowerCase()]=String(v)},status(n){this.statusCode=n;return this},json(v){this.body=v;return this},send(v){this.body=v;return this}}}
async function call(path,opts){const a=req(path,opts),b=res();await handler(a,b);return b}
const H={'x-maestro-request':'1'};

const passSem=()=>Object.fromEntries(['K1','K2','K3','K4','K5','K6','K7'].map(k=>[k,{status:'PASS',finding:'fixture completion'}]));
function valueForType(type){if(type==='bool')return false;if(type==='integer')return 1;if(type==='float')return -10;if(type==='scale_0_1')return 0.5;if(type==='ratio'||type==='ratio_map'||String(type).startsWith('map<'))return {};if(type==='enum_list'||String(type).startsWith('list<')||String(type).startsWith('ordered_list<'))return [];return 'resolved fixture value'}
function checklistFor(f){const state=materializeTechnicalState(f.envelope,f.resolution);return {fills:unresolvedChecklist(state).map(x=>({address:x.address,owner:x.owner,value_json:JSON.stringify(valueForType(x.type)),rationale:'fixture worker replaced null',sem:passSem()}))}}

const apiPayload=value=>({ok:true,json:async()=>({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify(value)}]}]})});
function withOpenAI(sequence,fn){const oldFetch=global.fetch,oldKey=process.env.OPENAI_API_KEY;process.env.OPENAI_API_KEY='sk-test-server-only-never-returned';const seen=[];global.fetch=async(url,opts)=>{seen.push({url,body:JSON.parse(opts.body)});const v=sequence.shift();if(v===undefined)throw new Error('unexpected provider call');return apiPayload(v)};return Promise.resolve().then(()=>fn(seen)).finally(()=>{global.fetch=oldFetch;if(oldKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=oldKey})}

test('status exposes server key presence only and current canonical counts',async()=>{process.env.OPENAI_API_KEY='sk-test-server-only-never-returned';try{const r=await call('status');assert.equal(r.statusCode,200);assert.equal(r.body.ai.server_key_configured,true);assert.equal(JSON.stringify(r.body).includes(process.env.OPENAI_API_KEY),false);assert.equal(r.body.technical_ust.subkeys,165);assert.deepEqual(r.body.primary_outputs,['suno_style_prompt','creative_ust_lyrics_prompt'])}finally{delete process.env.OPENAI_API_KEY}});

test('single generate endpoint converts user input into exactly two primary prompts after full checklist fill',()=>{
  const f=makeQaFixture(),check=checklistFor(f);
  return withOpenAI([f.resolution,check,f.audit],async seen=>{
    const r=await call('generate',{method:'POST',body:{envelope:f.envelope},headers:H});
    assert.equal(r.statusCode,200);assert.deepEqual(Object.keys(r.body.outputs),['suno_style_prompt','creative_ust_lyrics_prompt']);assert.equal(r.body.receipt.status,'PACKAGED');assert.equal(r.body.receipt.provider.calls,3);assert.equal(r.body.receipt.reroutes,0);assert.equal(JSON.stringify(r.body).includes('line_instances'),false);assert.equal(JSON.stringify(r.body).includes('worker_packets'),false);
    assert.equal(seen.length,3);for(const x of seen){assert.equal(x.url,'https://api.openai.com/v1/responses');assert.equal(x.body.store,false);assert.equal(x.body.text.format.type,'json_schema');assert.equal(x.body.text.format.strict,true)}
    assert.match(seen[1].body.instructions,/REPLACE every assigned null/);
  });
});

test('worker validation defect reroutes to the responsible worker and still completes',()=>{
  const f=makeQaFixture(),bad=structuredClone(f.resolution);bad.technical.theory.tonal_center='';const check=checklistFor(f);
  return withOpenAI([bad,f.resolution,check,f.audit],async seen=>{
    const r=await call('generate',{method:'POST',body:{envelope:f.envelope},headers:H});assert.equal(r.statusCode,200);assert.equal(r.body.receipt.provider.calls,4);assert.ok(r.body.receipt.reroutes>=1);assert.match(seen[1].body.instructions,/Repair defect from prior attempt/);
  });
});

test('blocking audit reroutes back to worker until a later audit passes',()=>{
  const f=makeQaFixture(),check=checklistFor(f),blocked=structuredClone(f.audit);blocked.overall_status='BLOCK';blocked.factors[0].status='BLOCK';blocked.repair_requests=[{owner:'Sage',axes:['LYR'],addresses:['LYR.K1.S3'],instruction:'tighten lyric motion'}];
  return withOpenAI([f.resolution,check,blocked,f.resolution,check,blocked,f.resolution,check,f.audit],async seen=>{
    const r=await call('generate',{method:'POST',body:{envelope:f.envelope},headers:H});assert.equal(r.statusCode,200);assert.equal(r.body.receipt.provider.calls,9);assert.ok(r.body.receipt.reroutes>=2);assert.equal(seen.length,9);assert.match(seen[3].body.instructions,/Only these Technical UST axes are authorized to change/);
  });
});

test('missing server key blocks generation without exposing provider request',async()=>{delete process.env.OPENAI_API_KEY;const f=makeQaFixture(),r=await call('generate',{method:'POST',body:{envelope:f.envelope},headers:H});assert.equal(r.statusCode,422);assert.equal(r.body.gate,'AI_KEY_REQUIRED')});

test('POST request header is mandatory',async()=>{const f=makeQaFixture(),r=await call('generate',{method:'POST',body:{envelope:f.envelope}});assert.equal(r.statusCode,403);assert.equal(r.body.gate,'REQUEST_HEADER')});

test('cross-origin POST is blocked',async()=>{const f=makeQaFixture(),r=await call('generate',{method:'POST',body:{envelope:f.envelope},headers:{...H,origin:'https://elsewhere.invalid'}});assert.equal(r.statusCode,403);assert.equal(r.body.gate,'ORIGIN')});

test('release returns prompt-only zip and verifies receipt',()=>{const f=makeQaFixture(),check=checklistFor(f);return withOpenAI([f.resolution,check,f.audit],async()=>{const g=await call('generate',{method:'POST',body:{envelope:f.envelope},headers:H});const r=await call('release',{method:'POST',body:{result:g.body},headers:H});assert.equal(r.statusCode,200);assert.equal(Buffer.isBuffer(r.body),true);assert.equal(r.body.subarray(0,2).toString(),'PK');assert.equal(r.headers['x-maestro-scope'],'PROMPT_ONLY')});});

test('fixture endpoint returns user input only, not canonical internal state',async()=>{const r=await call('fixture');assert.equal(r.statusCode,200);assert.ok(r.body.envelope.request);assert.equal(r.body.resolution,undefined);assert.equal(r.body.audit,undefined)});
