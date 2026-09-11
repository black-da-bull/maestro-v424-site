import test from 'node:test';
import assert from 'node:assert/strict';
import {Readable} from 'node:stream';
import handler from '../pages/api/[...path].js';
import {REVIEWERS} from '../lib/maestro.js';
function req(path,{method='GET',body,headers={}}={}){const raw=body===undefined?'':JSON.stringify(body),r=Readable.from(raw?[Buffer.from(raw)]:[]);r.method=method;r.query={path:path.split('/')};r.headers={host:'console.test',...headers};return r}
function res(){const headers={};return{statusCode:200,body:null,headers,setHeader(k,v){headers[k.toLowerCase()]=String(v)},status(n){this.statusCode=n;return this},json(v){this.body=v;return this},send(v){this.body=v;return this}}}
async function call(path,opts){const a=req(path,opts),b=res();await handler(a,b);return b}
const H={'x-maestro-request':'1'};
const review=c=>({candidate_digest:c.candidate_digest,rounds:[{claims:REVIEWERS.map(role=>({role,verdict:'ACCEPT_WITH_LIMITS'}))}]});
test('status exposes key presence only',async()=>{process.env.OPENAI_API_KEY='sk-test-server-only-never-return';try{const r=await call('status');assert.equal(r.statusCode,200);assert.equal(r.body.ai.server_key_configured,true);assert.equal(JSON.stringify(r.body).includes(process.env.OPENAI_API_KEY),false)}finally{delete process.env.OPENAI_API_KEY}});
test('fixture compiles through API',async()=>{const f=(await call('fixture')).body,r=await call('candidate',{method:'POST',body:f,headers:H});assert.equal(r.statusCode,200);assert.ok(r.body.checks.every(x=>x.status==='PASS'))});
test('POST header is mandatory',async()=>{const f=(await call('fixture')).body,r=await call('candidate',{method:'POST',body:f});assert.equal(r.statusCode,403);assert.equal(r.body.gate,'REQUEST_HEADER')});
test('cross-origin POST is blocked',async()=>{const f=(await call('fixture')).body,r=await call('candidate',{method:'POST',body:f,headers:{...H,origin:'https://elsewhere.invalid'}});assert.equal(r.statusCode,403);assert.equal(r.body.gate,'ORIGIN')});
test('source mutation fails closed',async()=>{const f=(await call('fixture')).body;f.request.raw_lyrics+='\nALTERED';const r=await call('candidate',{method:'POST',body:f,headers:H});assert.equal(r.statusCode,422);assert.equal(r.body.gate,'SOURCE_BINDING')});
test('release requires matching review and returns zip',async()=>{const f=(await call('fixture')).body,c=(await call('candidate',{method:'POST',body:f,headers:H})).body,r=await call('release',{method:'POST',body:{...f,review:review(c)},headers:H});assert.equal(r.statusCode,200);assert.equal(Buffer.isBuffer(r.body),true);assert.equal(r.body.subarray(0,2).toString(),'PK');assert.equal(r.headers['x-maestro-scope'],'PROMPT_ONLY')});
