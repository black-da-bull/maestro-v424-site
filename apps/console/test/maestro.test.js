import test from 'node:test';
import assert from 'node:assert/strict';
import { TECHNICAL_REGISTRY } from '../lib/technical-registry.js';
import {
  CREATIVE_ORDER, TWENTY_FACTORS, WORKERS, applyAxisScopedRepair, applyChecklistCompletion, axesForRepair, finalizeTwoSurfaces,
  lockTechnicalState, makeQaFixture, materializeTechnicalState, packageTwoSurfaces, sourceUnits, status, unresolvedChecklist,
  validateAudit, validateSurfaces
} from '../lib/maestro.js';

const deep=v=>structuredClone(v);

const passSem=()=>Object.fromEntries(['K1','K2','K3','K4','K5','K6','K7'].map(k=>[k,{status:'PASS',finding:'fixture completion'}]));
function valueForType(type){
  if(type==='bool')return false;
  if(type==='integer')return 1;
  if(type==='float')return -10;
  if(type==='scale_0_1')return 0.5;
  if(type==='ratio'||type==='ratio_map'||String(type).startsWith('map<'))return {};
  if(type==='enum_list'||String(type).startsWith('list<')||String(type).startsWith('ordered_list<'))return [];
  return 'resolved fixture value';
}
function checklistPacket(state){return {fills:unresolvedChecklist(state).map(x=>({address:x.address,owner:x.owner,value_json:JSON.stringify(valueForType(x.type)),rationale:'fixture worker replaced null',sem:passSem()}))}}
function completedState(f){const partial=materializeTechnicalState(f.envelope,f.resolution);return applyChecklistCompletion(partial,checklistPacket(partial))}


test('canonical Technical UST registry is complete',()=>{
  assert.equal(new Set(TECHNICAL_REGISTRY.map(x=>x.axis)).size,7);
  assert.equal(new Set(TECHNICAL_REGISTRY.map(x=>x.key)).size,33);
  assert.equal(new Set(TECHNICAL_REGISTRY.map(x=>x.id)).size,165);
});

test('Technical UST checklist completion replaces every one of 165 null slots',()=>{
  const f=makeQaFixture(),partial=materializeTechnicalState(f.envelope,f.resolution);
  assert.ok(unresolvedChecklist(partial).length>0);
  const state=applyChecklistCompletion(partial,checklistPacket(partial));
  assert.equal(unresolvedChecklist(state).length,0);
  assert.equal(Object.values(state.entries).filter(x=>x.state==='RESOLVED').length,165);
});

test('incomplete checklist packet is a reroute defect rather than a lockable state',()=>{
  const f=makeQaFixture(),partial=materializeTechnicalState(f.envelope,f.resolution),packet=checklistPacket(partial);packet.fills.pop();
  assert.throws(()=>applyChecklistCompletion(partial,packet),/omitted Technical UST nulls/);
  assert.equal(partial.locked,false);
});

test('status exposes exactly two primary surfaces',()=>{
  const s=status();
  assert.deepEqual(s.primary_outputs,['suno_style_prompt','creative_ust_lyrics_prompt']);
  assert.equal(s.technical_ust.never_output,true);
  assert.deepEqual(s.creative_ust.order,CREATIVE_ORDER);
});

test('premature surface compilation fails closed',()=>{
  const f=makeQaFixture(),state=materializeTechnicalState(f.envelope,f.resolution);
  assert.throws(()=>finalizeTwoSurfaces(f.envelope,state,f.audit),/cannot compile before Technical UST lock/);
});

test('locked Technical UST derives current Creative UST and style prompt',()=>{
  const f=makeQaFixture(),state=completedState(f);
  lockTechnicalState(state,f.audit);
  const result=finalizeTwoSurfaces(f.envelope,state,f.audit);
  assert.deepEqual(Object.keys(result.outputs),['suno_style_prompt','creative_ust_lyrics_prompt']);
  const u=result.outputs.creative_ust_lyrics_prompt;
  let last=-1;for(const h of CREATIVE_ORDER){const at=u.indexOf(h==='▸ LYRICS BLOCK'?h:`[${h}]`);assert.ok(at>last,`${h} order`);last=at}
  assert.equal(u.includes('[CREW_TAGS]'),false);
  assert.equal(u.includes('[Road-Map]'),false);
  assert.equal(/durationbars:/i.test(u),false);
  assert.match(u,/\[[^\n|]+ \| \d+ bars \|/);
  assert.ok(result.outputs.suno_style_prompt.length>100);
  assert.equal(JSON.stringify(result).includes('line_instances'),false);
  assert.equal(JSON.stringify(result).includes('entries'),false);
});

test('20-factor coverage is mandatory without invented numeric threshold',()=>{
  const f=makeQaFixture(),bad=deep(f.audit);bad.factors.pop();
  assert.throws(()=>validateAudit(bad),/All 20 required audit factors/);
});

test('audit block cannot lock Technical UST',()=>{
  const f=makeQaFixture(),state=materializeTechnicalState(f.envelope,f.resolution),bad=deep(f.audit);
  bad.overall_status='BLOCK';bad.factors[0].status='BLOCK';bad.repair_requests=[{owner:'Sage',axes:['LYR'],addresses:['LYR.K1.S3'],instruction:'repair lyric motion'}];
  assert.equal(validateAudit(bad).status,'BLOCK');
  assert.throws(()=>lockTechnicalState(state,bad),/cannot lock/);
  assert.deepEqual(axesForRepair(bad),['LYR','PER']);
});

test('preserve mode requires exact source lyric text and forbids added lines',()=>{
  const f=makeQaFixture();
  f.envelope.raw_lyrics='First exact line\nSecond exact line';f.envelope.lyric_policy='preserve';
  f.resolution.technical.performance.sections=[{id:'S1',title:'Verse',bars:4,function:'source',focus:'source',tempo_mode:'base',performance_notes:'close',production_cues:'dry',into_cue:'none',out_of_cue:'none',energy_jump:'none',transition_fx:'none',pause_slots:'none',rhyme_scheme:'free',lines:[
    {text:'First exact line',adlib:'',sfx:'',source_index:0,syllable_count:4,stress_pattern:'natural',rhyme_class:'A',motif_tag:'source',emotional_beat:'setup'},
    {text:'Second exact line',adlib:'',sfx:'',source_index:1,syllable_count:4,stress_pattern:'natural',rhyme_class:'B',motif_tag:'source',emotional_beat:'turn'}
  ]}];
  const state=materializeTechnicalState(f.envelope,f.resolution);assert.equal(state.line_instances.length,2);
  const mutated=deep(f.resolution);mutated.technical.performance.sections[0].lines[1].text='Changed line';
  assert.throws(()=>materializeTechnicalState(f.envelope,mutated),/Protected lyric text or order changed/);
  const added=deep(f.resolution);added.technical.performance.sections[0].lines.push({text:'Extra line',adlib:'',sfx:'',source_index:-1,syllable_count:3,stress_pattern:'natural',rhyme_class:'C',motif_tag:'extra',emotional_beat:'extra'});
  assert.throws(()=>materializeTechnicalState(f.envelope,added),/forbids dropping, duplicating, or adding/);
});

test('source parser normalizes existing quote wrappers and section headers',()=>{
  assert.deepEqual(sourceUnits({raw_lyrics:'[Verse 1]\n"Line one"\n[LEAD] Line two'}).map(x=>x.text),['Line one','Line two']);
});

test('packaging verifies frozen output digest',()=>{
  const f=makeQaFixture(),state=completedState(f);lockTechnicalState(state,f.audit);const r=finalizeTwoSurfaces(f.envelope,state,f.audit);
  const zip=packageTwoSurfaces(r);assert.equal(zip.subarray(0,2).toString(),'PK');assert.match(zip.toString('latin1'),/suno_style_prompt\.txt/);assert.match(zip.toString('latin1'),/creative_ust_lyrics_prompt\.txt/);
  const bad=deep(r);bad.outputs.suno_style_prompt+=' tampered';assert.throws(()=>packageTwoSurfaces(bad),/do not match the frozen receipt/);
});

test('axis scoped repair leaves unrelated axes unchanged',()=>{
  const f=makeQaFixture(),replacement=deep(f.resolution);replacement.technical.lyrics.themes='new theme';replacement.technical.style.primary_genre='should not copy';
  const out=applyAxisScopedRepair(f.resolution,replacement,['LYR']);
  assert.equal(out.technical.lyrics.themes,'new theme');
  assert.equal(out.technical.style.primary_genre,f.resolution.technical.style.primary_genre);
});

test('surface validation rejects legacy constructs',()=>{
  const f=makeQaFixture(),state=completedState(f);lockTechnicalState(state,f.audit);const r=finalizeTwoSurfaces(f.envelope,state,f.audit);
  assert.throws(()=>validateSurfaces(f.envelope,r.outputs.suno_style_prompt,r.outputs.creative_ust_lyrics_prompt+'\n[Road-Map]'),/Forbidden legacy/);
});

test('factor and workforce constants are complete',()=>{assert.equal(TWENTY_FACTORS.length,20);assert.equal(new Set(WORKERS).size,8)});
