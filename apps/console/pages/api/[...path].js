import {
  AXES, GateError, applyAxisScopedRepair, applyChecklistCompletion, axesForRepair, finalizeTwoSurfaces, lockTechnicalState,
  makeQaFixture, materializeTechnicalState, packageTwoSurfaces, status, technicalAuditView, unresolvedChecklist, validateAudit
} from '../../lib/maestro.js';
import { AUDIT_SCHEMA, CHECKLIST_SCHEMA, RESOLUTION_SCHEMA, auditInstructions, checklistInstructions, resolutionInstructions } from '../../lib/ai-contracts.js';

export const config={api:{bodyParser:false,responseLimit:false},maxDuration:300};
const MAX=400000;
const key=()=>String(process.env.OPENAI_API_KEY||process.env.OPEN_AI_KEY||process.env.OPENAI_KEY||'').trim();
const model=requested=>String(requested||process.env.OPENAI_MODEL||'gpt-5.6').trim();
function secure(res){res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Robots-Tag','noindex, nofollow')}
async function body(req){const chunks=[];let n=0;for await(const chunk of req){n+=chunk.length;if(n>MAX)throw new GateError('BODY_TOO_LARGE','Request body exceeds 400 KB.',413);chunks.push(chunk)}if(!chunks.length)return{};try{return JSON.parse(Buffer.concat(chunks).toString('utf8'))}catch{throw new GateError('INVALID_JSON','Request body must be valid JSON.',422)}}
function enforce(req){if(req.headers['x-maestro-request']!=='1')throw new GateError('REQUEST_HEADER','Missing Maestro request header.',403);const origin=req.headers.origin;if(origin){const host=String(req.headers['x-forwarded-host']||req.headers.host||'').split(',')[0].trim();let oh='';try{oh=new URL(origin).host}catch{}if(!host||oh!==host)throw new GateError('ORIGIN','Cross-origin API requests are blocked.',403)}}
function outputText(j){const parts=[];for(const item of j?.output||[])for(const c of item?.content||[])if(c?.type==='output_text'&&typeof c.text==='string')parts.push(c.text);return parts.join('')}
async function aiJson({name,schema,instructions,input,requestedModel}){
  const token=key();if(token.length<16)throw new GateError('AI_KEY_REQUIRED','The Vercel project does not have a usable server-side OpenAI key configured.',422);
  const chosen=model(requestedModel);if(!/^[A-Za-z0-9._:/-]{1,100}$/.test(chosen))throw new GateError('AI_MODEL','Configured model ID is invalid.');
  const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({model:chosen,store:false,instructions,input,text:{format:{type:'json_schema',name,strict:true,schema}},max_output_tokens:20000})});
  if(!r.ok)throw new GateError('AI_PROVIDER',`OpenAI returned HTTP ${r.status}. Provider body and credential were not persisted.`,502);
  const j=await r.json();if(j.status&&j.status!=='completed')throw new GateError('AI_INCOMPLETE',`OpenAI response ended with status ${j.status}.`,502);
  const raw=outputText(j);if(!raw)throw new GateError('AI_OUTPUT','OpenAI returned no structured output text.',502);
  try{return JSON.parse(raw)}catch{throw new GateError('AI_JSON','OpenAI returned structured output that could not be parsed.',502)}
}
function recoverAxes(error){
  if(['SOURCE_COVERAGE','SOURCE_FIDELITY','SECTION_SET','SECTION_LINES','SECTION_SHAPE'].includes(error.code))return ['PER','LYR'];
  if(['REQUIRED_NULL','TECHNICAL_TYPE','CHECKLIST_VALUE','CHECKLIST_OWNER','CHECKLIST_SEM'].includes(error.code)){const hit=String(error.message).match(/([A-Z]+)\.K/);return hit&&AXES.includes(hit[1])?[hit[1]]:AXES}
  return AXES;
}
const WORKER_DEFECTS=new Set(['SOURCE_COVERAGE','SOURCE_FIDELITY','SECTION_SET','SECTION_LINES','SECTION_SHAPE','REQUIRED_NULL','TECHNICAL_TYPE','WORKER_PACKETS','WORKFORCE_COVERAGE','WORKER_PACKET','SEM_BLOCK']);
const CHECKLIST_DEFECTS=new Set(['CHECKLIST_PACKET','CHECKLIST_ADDRESS','CHECKLIST_DUPLICATE','CHECKLIST_OWNER','CHECKLIST_SEM','CHECKLIST_VALUE','CHECKLIST_MISSING','TECHNICAL_NULLS','TECHNICAL_TYPE','REQUIRED_NULL']);
function rerouteLimit(){const n=Number.parseInt(process.env.MAESTRO_MAX_REROUTES||'8',10);return Number.isFinite(n)&&n>=1&&n<=24?n:8}

async function completeChecklist(envelope,state,requestedModel){
  let calls=0,reroutes=0,defect=null;
  for(let round=0;round<rerouteLimit();round++){
    const pending=unresolvedChecklist(state);if(!pending.length)return {state,calls,reroutes};
    const packet=await aiJson({name:'maestro_checklist_completion',schema:CHECKLIST_SCHEMA,instructions:checklistInstructions(envelope,pending,{defect}),input:'Replace every assigned Technical UST null. Return one lawful fill per pending address.',requestedModel});calls++;
    try{state=applyChecklistCompletion(state,packet);return {state,calls,reroutes}}
    catch(e){if(!(e instanceof GateError)||!CHECKLIST_DEFECTS.has(e.code))throw e;defect=e.asObject();reroutes++}
  }
  throw new GateError('WORKER_REROUTE_EXHAUSTED','Worker reroute loop exceeded the configured request budget before the Technical UST checklist reached zero nulls.',502,{phase:'SEQUENTIAL_AXIS_COMPLETION',reroutes});
}

async function resolveTechnical(envelope,requestedModel,{seedResolution=null,initialDefect=null,initialAxes=[]}={}){
  let calls=0,reroutes=0,resolution=seedResolution,defect=initialDefect,repairAxes=[...initialAxes],state=null;
  for(let round=0;round<rerouteLimit();round++){
    const candidate=await aiJson({name:resolution?'maestro_technical_reroute':'maestro_technical_resolution',schema:RESOLUTION_SCHEMA,instructions:resolutionInstructions(envelope,{defect,current:resolution,repairAxes}),input:resolution?'Repair the routed worker scope and return the complete strict resolution object.':'Resolve the operator input into internal Technical UST state.',requestedModel});calls++;
    resolution=resolution&&repairAxes.length?applyAxisScopedRepair(resolution,candidate,repairAxes):candidate;
    try{state=materializeTechnicalState(envelope,resolution);break}
    catch(e){if(!(e instanceof GateError)||!WORKER_DEFECTS.has(e.code))throw e;defect=e.asObject();repairAxes=recoverAxes(e);reroutes++}
  }
  if(!state)throw new GateError('WORKER_REROUTE_EXHAUSTED','Worker reroute loop exceeded the configured request budget before the initial Technical UST pass validated.',502,{phase:'SEQUENTIAL_AXIS_COMPLETION',reroutes});
  const completion=await completeChecklist(envelope,state,requestedModel);calls+=completion.calls;reroutes+=completion.reroutes;state=completion.state;
  return {resolution,state,calls,reroutes};
}
async function auditTechnical(state,requestedModel){
  return aiJson({name:'maestro_prelock_audit',schema:AUDIT_SCHEMA,instructions:auditInstructions(technicalAuditView(state)),input:'Run the required 20-factor and resident-worker pre-lock audit.',requestedModel});
}
async function generate(envelope,requestedModel){
  let run=await resolveTechnical(envelope,requestedModel);let {resolution,state}=run;let calls=run.calls,reroutes=run.reroutes;
  let audit=null,decision=null;
  for(let round=0;round<rerouteLimit();round++){
    audit=await auditTechnical(state,requestedModel);calls++;
    decision=validateAudit(audit);
    if(decision.status==='PASS')break;
    let repairAxes=axesForRepair(audit);if(!repairAxes.length)repairAxes=[...AXES];
    const repaired=await resolveTechnical(envelope,requestedModel,{seedResolution:resolution,initialDefect:{gate:'AUDIT_REROUTE',repair_requests:audit.repair_requests,blocked_factors:decision.factorBlocks.map(x=>x.id),rejected_roles:decision.rejects.map(x=>x.role)},initialAxes:repairAxes});
    resolution=repaired.resolution;state=repaired.state;calls+=repaired.calls;reroutes+=repaired.reroutes+1;
  }
  if(!decision||decision.status!=='PASS')throw new GateError('WORKER_REROUTE_EXHAUSTED','Resident-worker audit reroutes exceeded the configured request budget before lock.',502,{phase:'ROUND_ROBIN_DELIBERATION',reroutes});
  lockTechnicalState(state,audit);
  const result=finalizeTwoSurfaces(envelope,state,audit);
  result.receipt.provider={name:'OpenAI',model:model(requestedModel),calls};
  result.receipt.reroutes=reroutes;
  result.receipt.gate_sequence=['SEQUENTIAL_AXIS_COMPLETION','DRAFT_TECHNICAL_UST_FREEZE','ROUND_ROBIN_DELIBERATION','DEFINITIVE_TECHNICAL_UST_LOCK','FOIL_PROMOTION_DEDUP','DERIVATIVE_SURFACE_DRAFTING','SURFACE_FREEZE','PACKAGING'];
  return result;
}

export default async function handler(req,res){
  secure(res);const path=Array.isArray(req.query.path)?req.query.path.join('/'):String(req.query.path||'');
  try{
    if(req.method==='GET'&&path==='status'){const s=status();s.ai={provider:'OpenAI',default_model:process.env.OPENAI_MODEL||'gpt-5.6',server_key_configured:Boolean(key()),credential_delivery:'server_env_only',api:'Responses API + strict JSON Schema'};return res.status(200).json(s)}
    if(req.method==='GET'&&path==='fixture')return res.status(200).json({envelope:makeQaFixture().envelope});
    if(req.method!=='POST')return res.status(405).json({status:'BLOCKED',gate:'METHOD',message:'Method not allowed.'});
    enforce(req);const d=await body(req);
    if(path==='generate'){if(!d.envelope)throw new GateError('MISSING_INPUT','Provide an envelope.');return res.status(200).json(await generate(d.envelope,d.model))}
    if(path==='release'){if(!d.result)throw new GateError('MISSING_INPUT','Provide the frozen generation result.');const archive=packageTwoSurfaces(d.result);res.setHeader('Content-Type','application/zip');res.setHeader('Content-Disposition','attachment; filename="maestro-suno-prompts.zip"');res.setHeader('X-Maestro-Scope','PROMPT_ONLY');res.setHeader('X-Maestro-Digest',d.result.receipt.output_digest);return res.status(200).send(archive)}
    return res.status(404).json({status:'BLOCKED',gate:'NOT_FOUND',message:'API route not found.'});
  }catch(e){if(e instanceof GateError)return res.status(e.status||422).json(e.asObject());console.error('maestro_api_error',e?.name||'Error');return res.status(500).json({status:'BLOCKED',gate:'SERVER',message:'Unexpected server error. Nothing was released.'})}
}
