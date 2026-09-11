import crypto from 'node:crypto';
import { TECHNICAL_REGISTRY } from './technical-registry.js';

export const RUNTIME_VERSION = 'v5-c.runtime.admin_patch_2026_06_06.002';
export const PATCH_ID = 'MAESTRO_ADMIN_CONTEXT_PATCH_2026_06_06_RUNTIME_REPAIR_002';
export const CREATIVE_ORDER = ['Theory','Voices','Style','Timbre','Performance','Post-Production','▸ LYRICS BLOCK'];
export const WORKERS = ['Canon','Mo','Metro','Sage','Vanessa','Alan','Dave','Eldrik'];
export const AXES = ['THY','VOC','STY','TIM','PER','POST','LYR'];
export const TWENTY_FACTORS = [
  ['F01','flow density & breath count'],
  ['F02','rhyme symmetry across verses'],
  ['F03','pacing entropy vs internal consistency'],
  ['F04','line length variance vs impact retention'],
  ['F05','emotional polarity per stanza'],
  ['F06','visualizability of lines'],
  ['F07','beat adaptability & melodic scalability'],
  ['F08','imagery uniqueness'],
  ['F09','audience empathy activation'],
  ['F10','semantic overlap with archetypes'],
  ['F11','performative contrast potential'],
  ['F12','repeatability index (hook & chorus)'],
  ['F13','socio-political subtext density'],
  ['F14','flow-mode shift frequency'],
  ['F15','recursiveness of metaphors'],
  ['F16','narrative vs poetic ratio'],
  ['F17','call-and-response compatibility'],
  ['F18','memory activation likelihood'],
  ['F19','energy return curve'],
  ['F20','voice character assignability'],
].map(([id,label])=>({id,label}));

const DIRECT_BINDINGS = [
  ['theory.tonal_center','THY.K1.S1','Alan'],
  ['theory.mode','THY.K1.S2','Alan'],
  ['theory.function_inventory','THY.K2.S1','Alan'],
  ['theory.cadential_shapes','THY.K2.S2','Alan'],
  ['theory.chord_extensions','THY.K2.S5','Alan'],
  ['theory.meter','THY.K3.S1','Dave'],
  ['theory.tempo_bpm','THY.K3.S2','Dave'],
  ['theory.feel_mode','THY.K3.S3','Dave'],
  ['theory.tension_release_curve','THY.K4.S5','Alan'],

  ['voices.lead_timbre','VOC.K1.S1','Vanessa'],
  ['voices.register','VOC.K1.S2','Vanessa'],
  ['voices.accent','VOC.K1.S3','Vanessa'],
  ['voices.emotion_palette','VOC.K1.S5','Vanessa'],
  ['voices.flow_patterns','VOC.K2.S1','Vanessa'],
  ['voices.articulation_sharpness','VOC.K2.S4','Vanessa'],
  ['voices.stack_roles','VOC.K3.S1','Vanessa'],
  ['voices.voicing_style','VOC.K3.S2','Vanessa'],

  ['style.primary_genre','STY.K1.S1','Metro'],
  ['style.secondary_genres','STY.K1.S2','Metro'],
  ['style.era','STY.K2.S1','Metro'],
  ['style.modernity','STY.K2.S2','Metro'],
  ['style.texture','STY.K2.S3','Metro'],
  ['style.aesthetic','STY.K2.S4','Metro'],
  ['style.start_state','STY.K3.S1','Metro'],
  ['style.mid_state','STY.K3.S2','Metro'],
  ['style.end_state','STY.K3.S3','Metro'],
  ['style.tension_theme','STY.K3.S4','Metro'],
  ['style.resolution_theme','STY.K3.S5','Metro'],
  ['style.playback_context','STY.K4.S1','Mo'],
  ['style.focus','STY.K4.S3','Mo'],

  ['timbre.core_instruments','TIM.K1.S1','Eldrik'],
  ['timbre.instrument_roles','TIM.K1.S2','Eldrik'],
  ['timbre.texture_mode','TIM.K1.S3','Eldrik'],
  ['timbre.analog_digital','TIM.K1.S4','Eldrik'],
  ['timbre.noise_sources','TIM.K1.S5','Eldrik'],
  ['timbre.sub_register','TIM.K2.S1','Eldrik'],
  ['timbre.low_mids','TIM.K2.S2','Eldrik'],
  ['timbre.high_mids','TIM.K2.S3','Eldrik'],
  ['timbre.air_band','TIM.K2.S4','Eldrik'],
  ['timbre.clash_policy','TIM.K2.S5','Eldrik'],
  ['timbre.signature_instrument','TIM.K3.S1','Eldrik'],
  ['timbre.hook_fx','TIM.K3.S2','Eldrik'],
  ['timbre.intro_signature','TIM.K3.S3','Eldrik'],
  ['timbre.outro_signature','TIM.K3.S4','Eldrik'],
  ['timbre.forbidden_timbres','TIM.K3.S5','Eldrik'],

  ['performance.kick_behavior','PER.K1.S1','Dave'],
  ['performance.snare_behavior','PER.K1.S2','Dave'],
  ['performance.hihat_grid','PER.K1.S3','Dave'],
  ['performance.bass_relation','PER.K1.S4','Dave'],
  ['performance.push_pull','PER.K1.S5','Dave'],
  ['performance.fill_frequency','PER.K2.S2','Dave'],
  ['performance.breakdown_strategy','PER.K2.S4','Alan'],
  ['performance.climax_location','PER.K2.S5','Alan'],
  ['performance.timing_variation','PER.K3.S1','Dave'],
  ['performance.humanized_elements','PER.K3.S3','Dave'],
  ['performance.swing_source','PER.K3.S5','Dave'],
  ['performance.crowd_interaction_cues','PER.K4.S4','Alan'],
  ['performance.dj_cues','PER.K4.S5','Alan'],

  ['post_production.priority_order','POST.K1.S1','Eldrik'],
  ['post_production.vocal_position','POST.K1.S2','Eldrik'],
  ['post_production.low_end_policy','POST.K1.S3','Eldrik'],
  ['post_production.mid_clarity','POST.K1.S4','Eldrik'],
  ['post_production.top_end','POST.K1.S5','Eldrik'],
  ['post_production.reverb','POST.K2.S1','Eldrik'],
  ['post_production.delay','POST.K2.S2','Eldrik'],
  ['post_production.dry_wet','POST.K2.S3','Eldrik'],
  ['post_production.space_identity','POST.K2.S4','Eldrik'],
  ['post_production.target_lufs','POST.K3.S1','Eldrik'],
  ['post_production.reference_profile','POST.K3.S2','Eldrik'],
  ['post_production.saturation','POST.K3.S3','Eldrik'],
  ['post_production.stereo_width','POST.K3.S4','Eldrik'],
  ['post_production.limiter','POST.K3.S5','Eldrik'],
  ['post_production.target_systems','POST.K4.S1','Eldrik'],
  ['post_production.mono_compat','POST.K4.S3','Eldrik'],
  ['post_production.club_impact','POST.K4.S4','Eldrik'],
  ['post_production.headphone_immersion','POST.K4.S5','Eldrik'],

  ['lyrics.pov','LYR.K1.S1','Sage'],
  ['lyrics.tense','LYR.K1.S2','Sage'],
  ['lyrics.themes','LYR.K1.S3','Sage'],
  ['lyrics.profanity_policy','LYR.K1.S4','Sage'],
  ['lyrics.imagery_register','LYR.K1.S5','Sage'],
];

const STRUCTURAL_BINDINGS = [
  ['VOC.K3.S4','Vanessa'],['PER.K2.S1','Alan'],
  ['PER.K5.S1','Alan'],['PER.K5.S2','Alan'],['PER.K5.S3','Alan'],['PER.K5.S4','Alan'],['PER.K5.S5','Dave'],
  ['PER.K6.S1','Alan'],['PER.K6.S2','Alan'],['PER.K6.S3','Alan'],['PER.K6.S4','Eldrik'],['PER.K6.S5','Alan'],
  ['LYR.K2.S1','Sage'],['LYR.K2.S3','Sage'],
  ['LYR.K3.S1','Sage'],['LYR.K3.S2','Sage'],['LYR.K3.S3','Sage'],['LYR.K3.S4','Sage'],['LYR.K3.S5','Sage'],
  ['LYR.K5.S1','Canon'],['LYR.K5.S2','Canon'],['LYR.K5.S3','Canon'],['LYR.K5.S4','Canon'],['LYR.K5.S5','Canon'],
];

const EXPECTED_IDS = new Set(TECHNICAL_REGISTRY.map(x=>x.id));
for (const [,id] of DIRECT_BINDINGS) if (!EXPECTED_IDS.has(id)) throw new Error(`Unknown Technical UST binding ${id}`);
for (const [id] of STRUCTURAL_BINDINGS) if (!EXPECTED_IDS.has(id)) throw new Error(`Unknown Technical UST structural binding ${id}`);
if (new Set(TECHNICAL_REGISTRY.map(x=>x.id)).size !== 165) throw new Error('Technical UST registry must contain exactly 165 unique subkeys.');
if (new Set(TECHNICAL_REGISTRY.map(x=>x.key)).size !== 33) throw new Error('Technical UST registry must contain exactly 33 unique keys.');
if (new Set(TECHNICAL_REGISTRY.map(x=>x.axis)).size !== 7) throw new Error('Technical UST registry must contain exactly 7 axes.');


const OWNER_PREFIXES = [
  ['LYR.K5','Canon'],
  ['THY.K3','Dave'],
  ['PER.K1','Dave'],['PER.K3','Dave'],['PER.K5.S5','Dave'],
  ['PER.K6.S4','Eldrik'],
  ['STY.K4','Mo'],
  ['THY','Alan'],['VOC','Vanessa'],['STY','Metro'],['TIM','Eldrik'],['PER','Alan'],['POST','Eldrik'],['LYR','Sage'],
];
export function ownerForAddress(id){
  for(const [prefix,owner] of OWNER_PREFIXES) if(id===prefix||id.startsWith(prefix+'.')) return owner;
  return 'Canon';
}

export class GateError extends Error {
  constructor(code,message,status=422,details=null){super(message);this.code=code;this.status=status;this.details=details}
  asObject(){return {status:'BLOCKED',gate:this.code,message:this.message,...(this.details?{details:this.details}:{})}}
}
const gate=(ok,code,msg,status=422,details=null)=>{if(!ok)throw new GateError(code,msg,status,details)};
const stable=v=>Array.isArray(v)?v.map(stable):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])])):v;
const canon=v=>JSON.stringify(stable(v));
export const digest=v=>crypto.createHash('sha256').update(Buffer.isBuffer(v)?v:Buffer.from(typeof v==='string'?v:canon(v))).digest('hex');
export const sourceDigest=e=>digest(e);
const getPath=(o,p)=>p.split('.').reduce((a,k)=>a?.[k],o);
const nonEmpty=v=>v!==null&&v!==undefined&&(typeof v!=='string'||v.trim()!=='');
const text=v=>Array.isArray(v)?v.map(x=>x&&typeof x==='object'?Object.entries(x).map(([k,y])=>`${k}: ${y}`).join(' '):String(x)).join('; '):v&&typeof v==='object'?Object.entries(v).map(([k,x])=>`${k}: ${Array.isArray(x)?x.join(' / '):x}`).join('; '):String(v??'');
const cleanMeta=v=>text(v).replace(/[\r\n]+/g,' ').replace(/,/g,';').replace(/\|/g,'/').replace(/\[/g,'(').replace(/\]/g,')').trim();
const lineText=v=>String(v??'').replace(/\r\n?/g,'\n');

export function sourceUnits(envelope){
  const rows=lineText(envelope?.raw_lyrics||'').split('\n');
  const units=[];
  for(const raw of rows){
    let s=raw.trim(); if(!s) continue;
    if(/^\[[^\n]*\]$/.test(s)) continue;
    if(/^\(\*\*.*\*\*\)$/.test(s)) continue;
    const speaker=s.match(/^\[([^\]]+)\]\s*(.+)$/); if(speaker) s=speaker[2].trim();
    if(s.startsWith('"')&&s.endsWith('"')&&s.length>=2) s=s.slice(1,-1);
    units.push({source_index:units.length,text:s});
  }
  return units;
}

export function classify(envelope){
  gate(envelope&&typeof envelope.request==='string'&&envelope.request.trim(),'REQUEST','Provide a creative request.');
  const t=envelope.request.toLowerCase();
  if(/audit|verify|validate|review/.test(t)&&!/(create|write|compose|generate|make)/.test(t)) return 'VALIDATION';
  if(/revise|change|fix|adjust/.test(t)&&(envelope.raw_lyrics||envelope.project_id)) return 'SONG_REFINEMENT';
  return 'EXECUTE';
}

export function profile(){
  const style=Number.parseInt(process.env.MAESTRO_STYLE_SOFT_CAP||'1000',10);
  const lyrics=Number.parseInt(process.env.MAESTRO_LYRICS_SOFT_CAP||'4800',10);
  return {style_soft_cap:Number.isFinite(style)?style:1000,lyrics_soft_cap:Number.isFinite(lyrics)?lyrics:4800,limit_authority:'local compatibility profile; not asserted as current Suno platform limit'};
}

export function createTechnicalState(envelope){
  const source_digest=sourceDigest(envelope);
  const entries={};
  for(const r of TECHNICAL_REGISTRY) entries[r.id]={...r,value:null,state:'NULL',required:true,required_for_surface:true,owner:ownerForAddress(r.id),evidence_refs:[],sem:null,null_disposition:'pending_worker_fill',transitions:['NULL']};
  return {runtime_version:RUNTIME_VERSION,canonical_truth_object:'Technical UST',source_digest,request_class:classify(envelope),entries,section_instances:[],line_instances:[],worker_packets:[],phase:'SEQUENTIAL_AXIS_COMPLETION',locked:false,lock_digest:null};
}


function normalizeCanonicalValue(entry,value){
  const typ=String(entry?.type||'');
  if(/^map<|ratio_map|^ratio$/.test(typ)&&Array.isArray(value)){
    const out={};for(const x of value){if(x&&typeof x==='object'){if('instrument' in x)out[x.instrument]=x.role;else if('layer' in x)out[x.layer]=x.amount;else if('section' in x)out[x.section]=x.value;}}
    return out;
  }
  return value;
}

function canonicalTypeOk(entry,value){
  const typ=String(entry?.type||'');
  if(typ==='bool') return typeof value==='boolean';
  if(typ==='integer') return Number.isInteger(value);
  if(typ==='float') return typeof value==='number'&&Number.isFinite(value);
  if(typ==='scale_0_1') return typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<=1;
  if(typ==='ratio'||typ==='ratio_map'||typ.startsWith('map<')) return value&&typeof value==='object'&&!Array.isArray(value);
  if(typ==='enum_list'||typ.startsWith('list<')||typ.startsWith('ordered_list<')) return Array.isArray(value);
  return typeof value==='string'&&value.trim().length>0;
}

function resolveEntry(state,id,value,owner,evidence_refs,sem){
  gate(EXPECTED_IDS.has(id),'TECHNICAL_ADDRESS',`Unknown Technical UST address ${id}.`);
  gate(nonEmpty(value),'REQUIRED_NULL',`Required Technical UST address ${id} remained empty.`);
  value=normalizeCanonicalValue(state.entries[id],value);
  gate(canonicalTypeOk(state.entries[id],value),'TECHNICAL_TYPE',`Technical UST address ${id} does not match canonical type ${state.entries[id].type}.`);
  state.entries[id]={...state.entries[id],value,state:'RESOLVED',required_for_surface:true,owner,evidence_refs:[...new Set(evidence_refs)],sem:sem||null,null_disposition:null,transitions:['NULL','PROPOSED','PRESSURED','RESOLVED']};
}

function packetByRole(resolution,role){return (resolution.worker_packets||[]).find(x=>x.owner===role)}
function semBlocked(packet){return Object.values(packet?.sem||{}).some(v=>v?.status==='BLOCK')}
function verifyWorkerPackets(resolution){
  gate(Array.isArray(resolution.worker_packets),'WORKER_PACKETS','Staff resolution must include worker packets.');
  const roles=new Set(resolution.worker_packets.map(x=>x.owner));
  gate(WORKERS.every(x=>roles.has(x)),'WORKFORCE_COVERAGE','All resident workers must return a packet.',422,{missing:WORKERS.filter(x=>!roles.has(x))});
  for(const role of WORKERS){const p=packetByRole(resolution,role);gate(p&&nonEmpty(p.finding),'WORKER_PACKET',`${role} packet is incomplete.`);gate(!semBlocked(p),'SEM_BLOCK',`${role} reported a blocking concurrent SEM condition.`)}
}

function ownerSem(resolution,owner){return packetByRole(resolution,owner)?.sem||null}
function ownerEvidence(envelope,owner){return [`operator:${sourceDigest(envelope)}`,`worker:${owner}`]}

function sectionMaps(sections){
  const titles=sections.map(s=>s.title);
  const barMap=Object.fromEntries(sections.map(s=>[s.title,s.bars]));
  const functionMap=Object.fromEntries(sections.map(s=>[s.title,s.function]));
  const focusMap=Object.fromEntries(sections.map(s=>[s.title,s.focus]));
  const tempoMap=Object.fromEntries(sections.map(s=>[s.title,s.tempo_mode]));
  const dynamicMap=Object.fromEntries(sections.map(s=>[s.title,s.dynamic_level]));
  const callResponse=Object.fromEntries(sections.map(s=>[s.title,s.call_response]));
  const into=Object.fromEntries(sections.map(s=>[s.title,s.into_cue]));
  const out=Object.fromEntries(sections.map(s=>[s.title,s.out_of_cue]));
  const energy=Object.fromEntries(sections.slice(0,-1).map((s,i)=>[`${s.title}->${sections[i+1].title}`,sections[i+1].energy_jump]));
  const fx=Object.fromEntries(sections.slice(0,-1).map((s,i)=>[`${s.title}->${sections[i+1].title}`,sections[i+1].transition_fx]));
  const pauses=sections.filter(s=>nonEmpty(s.pause_slots)).map(s=>`${s.title}: ${s.pause_slots}`);
  const linesPer=Object.fromEntries(sections.map(s=>[s.title,s.lines.length]));
  const rhymes=Object.fromEntries(sections.map(s=>[s.title,s.rhyme_scheme]));
  const lineMeta={syllables:{},stress:{},rhyme:{},motif:{},emotion:{}};
  sections.forEach((s,si)=>s.lines.forEach((l,li)=>{const id=`LN.${si+1}.${li+1}`;lineMeta.syllables[id]=l.syllable_count;lineMeta.stress[id]=l.stress_pattern;lineMeta.rhyme[id]=l.rhyme_class;lineMeta.motif[id]=l.motif_tag;lineMeta.emotion[id]=l.emotional_beat;}));
  return {titles,barMap,functionMap,focusMap,tempoMap,dynamicMap,callResponse,into,out,energy,fx,pauses,linesPer,rhymes,lineMeta};
}

export function materializeTechnicalState(envelope,resolution){
  gate(resolution&&resolution.technical,'TECHNICAL_RESOLUTION','Staff resolution did not return Technical UST material.');
  verifyWorkerPackets(resolution);
  const state=createTechnicalState(envelope);
  for(const [path,id,owner] of DIRECT_BINDINGS){
    const value=getPath(resolution.technical,path);
    resolveEntry(state,id,value,owner,ownerEvidence(envelope,owner),ownerSem(resolution,owner));
  }
  const sections=resolution.technical.performance?.sections;
  gate(Array.isArray(sections)&&sections.length>=1,'SECTION_SET','Technical UST requires at least one ordered section instance for this surface projection.');
  for(const s of sections){
    gate(nonEmpty(s.title)&&Number.isInteger(s.bars)&&s.bars>0,'SECTION_SHAPE','Every section needs a title and positive integer bar count.');
    gate(Array.isArray(s.lines)&&s.lines.length>0,'SECTION_LINES',`Section ${s.title} has no lyric lines.`);
  }
  state.section_instances=sections.map((s,si)=>({section_id:`SEC.${si+1}`,title:s.title,bars:s.bars,function:s.function,focus:s.focus,tempo_mode:s.tempo_mode,performance_notes:s.performance_notes,production_cues:s.production_cues,dynamic_level:s.dynamic_level,call_response:s.call_response,into_cue:s.into_cue,out_of_cue:s.out_of_cue,energy_jump:s.energy_jump,transition_fx:s.transition_fx,pause_slots:s.pause_slots,rhyme_scheme:s.rhyme_scheme,state:'RESOLVED',owner:'Alan'}));
  state.line_instances=sections.flatMap((s,si)=>s.lines.map((l,li)=>({line_id:`LN.${si+1}.${li+1}`,section_id:`SEC.${si+1}`,section_title:s.title,text:l.text,adlib:l.adlib,sfx:l.sfx,source_index:l.source_index,syllable_count:l.syllable_count,stress_pattern:l.stress_pattern,rhyme_class:l.rhyme_class,motif_tag:l.motif_tag,emotional_beat:l.emotional_beat,state:'RESOLVED',owner:'Sage',evidence_refs:ownerEvidence(envelope,'Sage'),transitions:['NULL','PROPOSED','PRESSURED','RESOLVED']})));
  const m=sectionMaps(sections);
  const computed=[
    ['VOC.K3.S4',m.callResponse,'Vanessa'],['PER.K2.S1',m.dynamicMap,'Alan'],
    ['PER.K5.S1',m.titles,'Alan'],['PER.K5.S2',m.barMap,'Alan'],['PER.K5.S3',m.functionMap,'Alan'],['PER.K5.S4',m.focusMap,'Alan'],['PER.K5.S5',m.tempoMap,'Dave'],
    ['PER.K6.S1',m.into,'Alan'],['PER.K6.S2',m.out,'Alan'],['PER.K6.S3',m.energy,'Alan'],['PER.K6.S4',m.fx,'Eldrik'],['PER.K6.S5',m.pauses.length?m.pauses:['none'],'Alan'],
    ['LYR.K2.S1',m.linesPer,'Sage'],['LYR.K2.S3',m.rhymes,'Sage'],
    ['LYR.K3.S1',m.lineMeta.syllables,'Sage'],['LYR.K3.S2',m.lineMeta.stress,'Sage'],['LYR.K3.S3',m.lineMeta.rhyme,'Sage'],['LYR.K3.S4',m.lineMeta.motif,'Sage'],['LYR.K3.S5',m.lineMeta.emotion,'Sage'],
    ['LYR.K5.S1',true,'Canon'],['LYR.K5.S2',['metadata_annotation','sfx_binding','adlib_overlay','section_header_adjustment'],'Canon'],['LYR.K5.S3',['paraphrase','synonym_substitution','unapproved_line_reorder'],'Canon'],['LYR.K5.S4',['source_fidelity','surface_schema','twenty_factor_audit'],'Canon'],['LYR.K5.S5',{'source_fidelity':1,'surface_schema':1,'twenty_factor_audit':1},'Canon'],
  ];
  for(const [id,value,owner] of computed) resolveEntry(state,id,value,owner,ownerEvidence(envelope,owner),ownerSem(resolution,owner));

  const src=sourceUnits(envelope);
  if(src.length){
    const generated=state.line_instances;
    if((envelope.lyric_policy||'preserve')==='preserve') gate(generated.length===src.length,'SOURCE_COVERAGE','Preserve mode forbids dropping, duplicating, or adding lyric lines.',422,{expected:src.length,received:generated.length});
    const protectedLines=generated.filter(l=>Number.isInteger(l.source_index)&&l.source_index>=0).sort((a,b)=>a.source_index-b.source_index);
    gate(protectedLines.length===src.length,'SOURCE_COVERAGE','Protected source lines were dropped or duplicated.',422,{expected:src.length,received:protectedLines.length});
    gate(protectedLines.every((l,i)=>l.source_index===i&&l.text===src[i].text),'SOURCE_FIDELITY','Protected lyric text or order changed.');
  }

  const required=Object.values(state.entries).filter(x=>x.state==='RESOLVED');
  gate(required.length>0,'TECHNICAL_REQUIRED','Initial worker pass did not resolve any Technical UST addresses.');

  const scopeByRole={
    Canon:['PER.K5','LYR.K5'],Mo:['STY.K4','THY','VOC','STY','TIM','PER','POST','LYR'],Metro:['STY','LYR.K1'],Sage:['LYR'],Vanessa:['VOC'],Alan:['THY.K1','THY.K2','THY.K4','PER.K2','PER.K4','PER.K5','PER.K6'],Dave:['THY.K3','PER.K1','PER.K3','PER.K5.S5'],Eldrik:['TIM','POST','PER.K6.S4']
  };
  state.worker_packets=WORKERS.map(role=>{
    const p=packetByRole(resolution,role); const prefixes=scopeByRole[role];
    const affected=required.filter(e=>prefixes.some(pre=>e.id===pre||e.id.startsWith(pre+'.')||e.axis===pre)).map(e=>e.id);
    return {owner:role,raw_evidence_ref:`operator:${state.source_digest}`,affected_addresses:affected,finding:p.finding,sem:p.sem,risks:p.risk_notes||[],null_disposition:p.null_disposition||'assigned fills resolved; remaining nulls queued for owner reroute'};
  });
  state.phase='DRAFT_TECHNICAL_UST_FREEZE';
  state.draft_digest=digest(required.map(x=>[x.id,x.value,x.owner]));
  return state;
}


export function unresolvedChecklist(state){
  return Object.values(state.entries).filter(e=>e.state==='NULL').map(e=>({address:e.id,axis:e.axis,key:e.key,key_name:e.key_name,name:e.name,type:e.type,role:e.role||'',owner:ownerForAddress(e.id)}));
}

function parseFillValue(raw,address){
  gate(typeof raw==='string'&&raw.trim(),'CHECKLIST_VALUE',`Worker fill ${address} did not provide value_json.`);
  try{return JSON.parse(raw)}catch{throw new GateError('CHECKLIST_VALUE',`Worker fill ${address} value_json is not valid JSON.`)}
}

export function applyChecklistCompletion(state,completion){
  gate(completion&&Array.isArray(completion.fills),'CHECKLIST_PACKET','Technical UST completion worker did not return fills.');
  const pending=unresolvedChecklist(state); const expected=new Map(pending.map(x=>[x.address,x]));
  const seen=new Set(); const next=structuredClone(state);
  for(const fill of completion.fills){
    gate(fill&&typeof fill.address==='string'&&expected.has(fill.address),'CHECKLIST_ADDRESS',`Worker returned an unassigned or already-resolved address ${fill?.address||''}.`);
    gate(!seen.has(fill.address),'CHECKLIST_DUPLICATE',`Worker returned duplicate fill ${fill.address}.`); seen.add(fill.address);
    const spec=expected.get(fill.address); gate(fill.owner===spec.owner,'CHECKLIST_OWNER',`Technical UST address ${fill.address} must be resolved by ${spec.owner}.`);
    gate(fill.sem&&Object.values(fill.sem).every(v=>v&&v.status!=='BLOCK'),'CHECKLIST_SEM',`Worker ${fill.owner} returned a blocking SEM condition for ${fill.address}.`);
    const value=parseFillValue(fill.value_json,fill.address);
    resolveEntry(next,fill.address,value,fill.owner,[`operator:${next.source_digest}`,`worker:${fill.owner}`],fill.sem);
    next.entries[fill.address].fill_rationale=fill.rationale;
    next.entries[fill.address].null_disposition='replaced_by_worker';
  }
  const missing=pending.filter(x=>!seen.has(x.address)).map(x=>x.address);
  gate(missing.length===0,'CHECKLIST_MISSING','Worker completion packet omitted Technical UST nulls.',422,{missing});
  const remaining=unresolvedChecklist(next);
  gate(remaining.length===0,'TECHNICAL_NULLS','Technical UST checklist still contains unresolved nulls.',422,{remaining:remaining.map(x=>x.address)});
  next.phase='DRAFT_TECHNICAL_UST_FREEZE';
  next.draft_digest=digest(Object.values(next.entries).map(x=>[x.id,x.value,x.owner]));
  return next;
}

export function technicalAuditView(state){
  const resolved=Object.values(state.entries).filter(x=>x.state!=='NULL').map(x=>({address:x.id,axis:x.axis,value:x.value,owner:x.owner}));
  return {runtime_version:RUNTIME_VERSION,source_digest:state.source_digest,phase:state.phase,resolved,section_instances:state.section_instances,line_instances:state.line_instances,unresolved_null_count:Object.values(state.entries).filter(x=>x.state==='NULL').length,worker_packets:state.worker_packets.map(p=>({owner:p.owner,affected_addresses:p.affected_addresses,finding:p.finding,sem:p.sem,risks:p.risks}))};
}

export function validateAudit(audit){
  gate(audit&&Array.isArray(audit.factors)&&Array.isArray(audit.council),'AUDIT_SHAPE','Audit response is incomplete.');
  const factors=new Map(audit.factors.map(x=>[x.id,x]));
  gate(TWENTY_FACTORS.every(x=>factors.has(x.id)),'TWENTY_FACTOR_COVERAGE','All 20 required audit factors must be evaluated.',422,{missing:TWENTY_FACTORS.filter(x=>!factors.has(x.id)).map(x=>x.id)});
  const council=new Map(audit.council.map(x=>[x.role,x]));
  gate(WORKERS.every(x=>council.has(x)),'COUNCIL_COVERAGE','All resident review perspectives must participate.',422,{missing:WORKERS.filter(x=>!council.has(x))});
  const factorBlocks=[...factors.values()].filter(x=>x.status==='BLOCK');
  const rejects=[...council.values()].filter(x=>x.verdict==='REJECT');
  const blocked=audit.overall_status==='BLOCK'||audit.narrative_cohesion==='BLOCK'||factorBlocks.length>0||rejects.length>0;
  if(blocked) return {status:'BLOCK',factorBlocks,rejects,repair_requests:audit.repair_requests||[]};
  gate(audit.overall_status==='PASS','AUDIT_STATUS','Audit must explicitly PASS before Technical UST can lock.');
  return {status:'PASS',factorBlocks:[],rejects:[],repair_requests:[]};
}

export function lockTechnicalState(state,audit){
  const v=validateAudit(audit); gate(v.status==='PASS','AUDIT_BLOCK','Technical UST cannot lock while audit blockers remain.');
  gate(Object.values(state.entries).every(e=>e.state==='RESOLVED'),'TECHNICAL_NULLS','Technical UST cannot lock while any checklist null remains.');
  for(const e of Object.values(state.entries)){e.state='LOCKED';e.transitions=[...e.transitions,'LOCKED'];}
  for(const l of state.line_instances){l.state='LOCKED';l.transitions=[...l.transitions,'LOCKED'];}
  for(const s of state.section_instances) s.state='LOCKED';
  state.phase='DEFINITIVE_TECHNICAL_UST_LOCK'; state.locked=true;
  state.lock_digest=digest({entries:Object.values(state.entries).map(x=>[x.id,x.value,x.owner,x.state]),sections:state.section_instances,lines:state.line_instances.map(x=>[x.line_id,x.text,x.adlib,x.sfx,x.source_index,x.state])});
  return state;
}

export function axesForRepair(audit){
  const req=audit?.repair_requests||[]; const axes=new Set();
  for(const r of req){for(const a of r.axes||[]) if(AXES.includes(a)) axes.add(a);for(const id of r.addresses||[]){const a=String(id).split('.')[0];if(AXES.includes(a)) axes.add(a)}}
  if(axes.has('PER')||axes.has('LYR')){axes.add('PER');axes.add('LYR')}
  return [...axes];
}

export function applyAxisScopedRepair(originalResolution,replacement,axes){
  gate(axes.length>0,'REPAIR_SCOPE','Blocking audit did not identify a lawful repair scope.');
  const out=structuredClone(originalResolution);
  const map={THY:'theory',VOC:'voices',STY:'style',TIM:'timbre',PER:'performance',POST:'post_production',LYR:'lyrics'};
  for(const axis of axes){const k=map[axis];gate(replacement?.technical?.[k],'REPAIR_PAYLOAD',`Repair response omitted ${axis}.`);out.technical[k]=replacement.technical[k]}
  if(axes.includes('PER')||axes.includes('LYR')) out.technical.performance.sections=replacement.technical.performance.sections;
  out.worker_packets=replacement.worker_packets;
  return out;
}

function val(state,id){return state.entries[id]?.value}
function metaLine(key,value){return `[${key} | ${cleanMeta(value)}]`}
function instrumentPick(core,pattern){const items=text(core).split(/[;,]/).map(x=>x.trim()).filter(Boolean);return items.filter(x=>pattern.test(x)).join('; ')}

function makeStylePrompt(state){
  const genre=[val(state,'STY.K1.S1'),val(state,'STY.K1.S2')].map(text).filter(Boolean).join(' + ');
  const arc=[val(state,'STY.K3.S1'),val(state,'STY.K3.S2'),val(state,'STY.K3.S3')].map(text).join(' -> ');
  const parts=[
    `${genre}.`,
    `${text(val(state,'STY.K2.S1'))}; ${text(val(state,'STY.K2.S2'))}.`,
    `Emotional arc: ${arc}.`,
    `Texture: ${text(val(state,'STY.K2.S3'))}; ${text(val(state,'STY.K2.S4'))}.`,
    `Voice: ${text(val(state,'VOC.K1.S1'))}; ${text(val(state,'VOC.K2.S1'))}.`,
    `Room/production: ${text(val(state,'POST.K2.S4'))}; ${text(val(state,'POST.K1.S3'))}.`,
    `Arrangement: ${text(val(state,'PER.K5.S1'))}; climax ${text(val(state,'PER.K2.S5'))}.`,
    `Focus: ${text(val(state,'STY.K4.S3'))}; playback ${text(val(state,'STY.K4.S1'))}.`
  ];
  return parts.join(' ').replace(/\s+/g,' ').trim();
}

function formatLyricRow(line){
  let out=`"${String(line.text??'')}"`;
  if(nonEmpty(line.adlib)) out+=`, (${String(line.adlib).replace(/[\r\n]+/g,' ').trim()})`;
  if(nonEmpty(line.sfx)) out+=`${nonEmpty(line.adlib)?' ':', '}** sfx: ${String(line.sfx).replace(/[\r\n]+/g,' ').trim()} **`;
  return out;
}

function projectState(state){
  const sections=state.section_instances.map(sec=>({...sec,lines:state.line_instances.filter(l=>l.section_id===sec.section_id)}));
  return {
    theory:{tonal_center:val(state,'THY.K1.S1'),mode:val(state,'THY.K1.S2'),function_inventory:val(state,'THY.K2.S1'),cadential_shapes:val(state,'THY.K2.S2'),chord_extensions:val(state,'THY.K2.S5'),meter:val(state,'THY.K3.S1'),tempo_bpm:val(state,'THY.K3.S2'),feel_mode:val(state,'THY.K3.S3'),tension_release_curve:val(state,'THY.K4.S5')},
    voices:{lead_timbre:val(state,'VOC.K1.S1'),register:val(state,'VOC.K1.S2'),accent:val(state,'VOC.K1.S3'),emotion_palette:val(state,'VOC.K1.S5'),flow_patterns:val(state,'VOC.K2.S1'),articulation_sharpness:val(state,'VOC.K2.S4'),stack_roles:val(state,'VOC.K3.S1'),voicing_style:val(state,'VOC.K3.S2'),call_response:val(state,'VOC.K3.S4')},
    style:{primary_genre:val(state,'STY.K1.S1'),secondary_genres:val(state,'STY.K1.S2'),era:val(state,'STY.K2.S1'),modernity:val(state,'STY.K2.S2'),texture:val(state,'STY.K2.S3'),aesthetic:val(state,'STY.K2.S4'),start_state:val(state,'STY.K3.S1'),mid_state:val(state,'STY.K3.S2'),end_state:val(state,'STY.K3.S3'),tension_theme:val(state,'STY.K3.S4'),resolution_theme:val(state,'STY.K3.S5'),playback_context:val(state,'STY.K4.S1'),focus:val(state,'STY.K4.S3')},
    timbre:{core_instruments:val(state,'TIM.K1.S1'),instrument_roles:val(state,'TIM.K1.S2'),texture_mode:val(state,'TIM.K1.S3'),analog_digital:val(state,'TIM.K1.S4'),noise_sources:val(state,'TIM.K1.S5'),sub_register:val(state,'TIM.K2.S1'),low_mids:val(state,'TIM.K2.S2'),high_mids:val(state,'TIM.K2.S3'),air_band:val(state,'TIM.K2.S4'),clash_policy:val(state,'TIM.K2.S5'),signature_instrument:val(state,'TIM.K3.S1'),hook_fx:val(state,'TIM.K3.S2'),intro_signature:val(state,'TIM.K3.S3'),outro_signature:val(state,'TIM.K3.S4'),forbidden_timbres:val(state,'TIM.K3.S5')},
    performance:{kick_behavior:val(state,'PER.K1.S1'),snare_behavior:val(state,'PER.K1.S2'),hihat_grid:val(state,'PER.K1.S3'),bass_relation:val(state,'PER.K1.S4'),push_pull:val(state,'PER.K1.S5'),dynamic_map:val(state,'PER.K2.S1'),fill_frequency:val(state,'PER.K2.S2'),breakdown_strategy:val(state,'PER.K2.S4'),climax_location:val(state,'PER.K2.S5'),timing_variation:val(state,'PER.K3.S1'),humanized_elements:val(state,'PER.K3.S3'),swing_source:val(state,'PER.K3.S5'),crowd_interaction_cues:val(state,'PER.K4.S4'),dj_cues:val(state,'PER.K4.S5'),sections},
    post_production:{priority_order:val(state,'POST.K1.S1'),vocal_position:val(state,'POST.K1.S2'),low_end_policy:val(state,'POST.K1.S3'),mid_clarity:val(state,'POST.K1.S4'),top_end:val(state,'POST.K1.S5'),reverb:val(state,'POST.K2.S1'),delay:val(state,'POST.K2.S2'),dry_wet:val(state,'POST.K2.S3'),space_identity:val(state,'POST.K2.S4'),target_lufs:val(state,'POST.K3.S1'),reference_profile:val(state,'POST.K3.S2'),saturation:val(state,'POST.K3.S3'),stereo_width:val(state,'POST.K3.S4'),limiter:val(state,'POST.K3.S5'),target_systems:val(state,'POST.K4.S1'),mono_compat:val(state,'POST.K4.S3'),club_impact:val(state,'POST.K4.S4'),headphone_immersion:val(state,'POST.K4.S5')},
    lyrics:{pov:val(state,'LYR.K1.S1'),tense:val(state,'LYR.K1.S2'),themes:val(state,'LYR.K1.S3'),profanity_policy:val(state,'LYR.K1.S4'),imagery_register:val(state,'LYR.K1.S5')}
  };
}

function makeCreativeUst(state){
  const t=projectState(state), sections=t.performance.sections;
  const core=t.timbre.core_instruments;
  const keys=instrumentPick(core,/organ|piano|rhodes|keys|keyboard|synth|clav/i)||'none; preserve space for primary timbres';
  const guitars=instrumentPick(core,/guitar|steel|dobro|banjo|string/i)||'none; preserve space for primary timbres';
  const theory=[
    '[Theory]',metaLine('mode',t.theory.mode),metaLine('tonal center',t.theory.tonal_center),metaLine('meter',t.theory.meter),metaLine('tempo',`${t.theory.tempo_bpm} BPM; ${t.theory.feel_mode}`),metaLine('chord color',`${text(t.theory.function_inventory)}; extensions ${text(t.theory.chord_extensions)}; cadences ${text(t.theory.cadential_shapes)}`)
  ].join('\n');
  const voices=[
    '[Voices]',metaLine('performers',t.voices.stack_roles),metaLine('register',t.voices.register),metaLine('delivery',t.voices.flow_patterns),metaLine('expression',t.voices.emotion_palette),metaLine('layering',t.voices.voicing_style),metaLine('articulation',`sharpness ${t.voices.articulation_sharpness}; ${t.voices.accent}`)
  ].join('\n');
  const style=[
    '[Style]',metaLine('genre',`${t.style.primary_genre} + ${text(t.style.secondary_genres)}`),metaLine('era',`${t.style.era}; ${t.style.modernity}`),metaLine('intent',`${t.style.tension_theme} -> ${t.style.resolution_theme}; ${t.style.start_state} -> ${t.style.end_state}`),metaLine('texture',t.style.texture),metaLine('aesthetic',t.style.aesthetic),metaLine('focus',t.style.focus)
  ].join('\n');
  const timbre=[
    '[Timbre]',metaLine('drum tone',`${t.performance.kick_behavior}; ${t.performance.snare_behavior}; ${t.performance.hihat_grid}`),metaLine('bass tone',`${t.timbre.sub_register}; ${t.performance.bass_relation}`),metaLine('keyboard tone',`${keys}; ${t.timbre.texture_mode}`),metaLine('guitar tone',`${guitars}; ${t.timbre.high_mids}`),metaLine('fx palette',`${text(t.timbre.hook_fx)}; ${text(t.timbre.noise_sources)}`),metaLine('vocal tone',`${t.voices.lead_timbre}; ${t.post_production.vocal_position}`)
  ].join('\n');
  const execution=sections.map(s=>`${s.title} (${s.bars} bars)`).join(' -> ');
  const performance=[
    '[Performance]',metaLine('execution',execution),metaLine('gesture',`${text(t.performance.crowd_interaction_cues)}; ${text(t.voices.call_response)}`),metaLine('rhythm handling',`${t.theory.meter}; ${t.theory.feel_mode}; ${t.performance.push_pull}; ${t.performance.swing_source}`),metaLine('touch',`${text(t.performance.humanized_elements)}; ${t.performance.breakdown_strategy}; ${t.timbre.signature_instrument}`),metaLine('phrasing ops',`${text(t.voices.flow_patterns)}; articulation sharpness ${t.voices.articulation_sharpness}; line stress follows Technical UST lyric metadata`)
  ].join('\n');
  const post=[
    '[Post-Production]',metaLine('mastering',`target ${t.post_production.target_lufs} LUFS profile; ${t.post_production.limiter}; ${t.post_production.mono_compat}`),metaLine('mix notes',`${text(t.post_production.priority_order)}; vocal ${t.post_production.vocal_position}; ${t.post_production.low_end_policy}; ${t.post_production.space_identity}`),metaLine('automation priorities',`${text(t.performance.dynamic_map)}; climax ${t.performance.climax_location}; ${sections.map(s=>`${s.title}: ${s.production_cues}`).join('; ')}`),metaLine('cleanup rules',`${text(t.post_production.mid_clarity)}; ${t.post_production.top_end}; ${t.timbre.clash_policy}`)
  ].join('\n');
  const lyr=['▸ LYRICS BLOCK'];
  for(const s of sections){
    lyr.push(`[${cleanMeta(s.title)} | ${s.bars} bars | ${cleanMeta(s.performance_notes)} | ${cleanMeta(s.production_cues)}]`);
    for(const l of s.lines) lyr.push(formatLyricRow(l));
    lyr.push('');
  }
  lyr.push('[End]');
  return [theory,voices,style,timbre,performance,post,lyr.join('\n')].join('\n\n');
}

export function validateSurfaces(envelope,stylePrompt,creativeUst){
  const p=profile();
  gate([...stylePrompt].length<=p.style_soft_cap,'STYLE_BUDGET',`Suno style prompt exceeds the local ${p.style_soft_cap}-character compatibility budget.`,422,{count:[...stylePrompt].length,limit:p.style_soft_cap});
  gate([...creativeUst].length<=p.lyrics_soft_cap,'LYRICS_BUDGET',`Creative UST exceeds the local ${p.lyrics_soft_cap}-character compatibility budget.`,422,{count:[...creativeUst].length,limit:p.lyrics_soft_cap});
  let last=-1;for(const h of CREATIVE_ORDER){const at=creativeUst.indexOf(h==='▸ LYRICS BLOCK'?h:`[${h}]`);gate(at>last,'CREATIVE_UST_ORDER','Creative UST canonical blocks are missing or out of order.');last=at}
  gate(!creativeUst.includes('[CREW_TAGS]')&&!creativeUst.includes('[Road-Map]'),'LEGACY_SURFACE','Forbidden legacy Creative UST constructs detected.');
  gate(!/durationbars:/i.test(creativeUst),'LEGACY_DURATION','Legacy durationBars syntax is forbidden.');
  const mandatory=['[mode |','[tonal center |','[meter |','[tempo |','[chord color |','[performers |','[register |','[delivery |','[expression |','[layering |','[articulation |','[genre |','[era |','[intent |','[texture |','[aesthetic |','[focus |','[drum tone |','[bass tone |','[keyboard tone |','[guitar tone |','[fx palette |','[vocal tone |','[execution |','[gesture |','[rhythm handling |','[touch |','[phrasing ops |','[mastering |','[mix notes |','[automation priorities |','[cleanup rules |'];
  gate(mandatory.every(x=>creativeUst.includes(x)),'CREATIVE_UST_FIELDS','Creative UST is missing one or more mandatory fields.');
  const pre=creativeUst.split('▸ LYRICS BLOCK')[0];gate(!pre.includes(','),'METADATA_COMMA','Commas outside the Lyrics Block are parser-hostile under the active compatibility contract.');
  gate(creativeUst.trim().endsWith('[End]'),'END_MARKER','Creative UST must terminate with [End].');
  const src=sourceUnits(envelope);for(const u of src) gate(creativeUst.includes(`"${u.text}"`),'SOURCE_SURFACE_FIDELITY',`Protected source lyric ${u.source_index} is missing from the final Creative UST.`);
  return {status:'PASS',style_chars:[...stylePrompt].length,creative_ust_chars:[...creativeUst].length,local_profile:p};
}

export function finalizeTwoSurfaces(envelope,state,audit){
  gate(state.locked&&state.phase==='DEFINITIVE_TECHNICAL_UST_LOCK','PREMATURE_SURFACE','Derivative Suno surfaces cannot compile before Technical UST lock.');
  gate(validateAudit(audit).status==='PASS','AUDIT_BLOCK','Audit must pass before surface derivation.');
  state.phase='FOIL_PROMOTION_DEDUP';
  const suno_style_prompt=makeStylePrompt(state);
  const creative_ust_lyrics_prompt=makeCreativeUst(state);
  state.phase='DERIVATIVE_SURFACE_DRAFTING';
  const surface_validation=validateSurfaces(envelope,suno_style_prompt,creative_ust_lyrics_prompt);
  state.phase='SURFACE_FREEZE';
  const output_digest=digest({suno_style_prompt,creative_ust_lyrics_prompt,technical_lock:state.lock_digest});
  state.phase='PACKAGING';
  return {
    outputs:{suno_style_prompt,creative_ust_lyrics_prompt},
    receipt:{
      status:'PACKAGED',runtime_version:RUNTIME_VERSION,patch_stack:[PATCH_ID],canonical_truth_object:'Technical UST',technical_ust_digest:state.lock_digest,output_digest,source_digest:state.source_digest,independent_experts:false,
      audit:{factors:20,passes:audit.factors.filter(x=>x.status==='PASS').length,warnings:audit.factors.filter(x=>x.status==='WARN').length,blocks:0,council_roles:WORKERS.length,narrative_cohesion:audit.narrative_cohesion},
      surface_validation,external:{audio_render:'NOT_RUN',rights:'NOT_RUN',hpa:'NOT_RUN',dsp:'NOT_RUN'}
    }
  };
}

export function status(){
  return {runtime_version:RUNTIME_VERSION,patch_stack:[PATCH_ID],canonical_truth_object:'Technical UST',technical_ust:{axes:7,keys:33,subkeys:165,addressing:'axis.key.subkey.null(n+1)',never_output:true},creative_ust:{order:CREATIVE_ORDER,forbidden_legacy:['CREW_TAGS','Road-Map','standalone FX block']},primary_outputs:['suno_style_prompt','creative_ust_lyrics_prompt'],workers:WORKERS,twenty_factor_audit:TWENTY_FACTORS.map(x=>x.id),profile:profile(),external:{audio_render:'NOT_CONNECTED',rights:'NOT_RUN',hpa:'NOT_RUN',dsp:'NOT_RUN'}};
}

export function makeQaFixture(){
  const envelope={request:'Create a song about holding your ground after a hard season.',title:'Hold the Line',style_brief:'Southern soul trap with live-room gospel pressure',operation:'original',raw_lyrics:'',lyric_policy:'rewrite',infer:true};
  const technical={
    theory:{tonal_center:'D',mode:'Dorian',function_inventory:['i','IV'],cadential_shapes:['plagal lift','suspended turnaround'],chord_extensions:['minor 7ths','add9','sus4'],meter:'4/4',tempo_bpm:92,feel_mode:'laid_back',tension_release_curve:'restrained verse -> rising hook -> stripped bridge -> earned final lift'},
    voices:{lead_timbre:'weathered Southern alto',register:'A3-E5 lead; lower support doubles',accent:'light Southern drawl',emotion_palette:['guarded','exposed','defiant'],flow_patterns:['conversational verse phrasing','open-throat hook sustain'],articulation_sharpness:0.68,stack_roles:['Lead: primary vocal','Low doubles: selected anchors','Gospel group: hook response'],voicing_style:'dry lead; selective doubles; choir blooms only on hooks'},
    style:{primary_genre:'Southern soul trap',secondary_genres:['gospel','blues'],era:['modern live-room production'],modernity:'modern_lean',texture:['close dry verses','wider communal hooks'],aesthetic:'late-night chapel room with street-level grit',start_state:'weary restraint',mid_state:'honest confrontation',end_state:'earned resolve',tension_theme:['survival without hardening'],resolution_theme:['strength through chosen community'],playback_context:['headphones','car','small-room live set'],focus:'lead truth; hook memory; human room energy'},
    timbre:{core_instruments:['trap kit','808','Hammond organ','Rhodes','pedal steel'],instrument_roles:[{instrument:'Hammond organ',role:'harmonic glue'},{instrument:'Rhodes',role:'pocket color'},{instrument:'pedal steel',role:'emotional answer'}],texture_mode:'medium_space',analog_digital:{analog:0.65,digital:0.35},noise_sources:['room tone','foot movement'],sub_register:'round mono 808 with short sustain',low_mids:'organ body kept behind lead',high_mids:'pedal steel answers and vocal presence',air_band:'hats; handclaps; short room tails',clash_policy:'keep 808 fundamental clear of organ low octave',signature_instrument:'pedal steel answer motif',hook_fx:['handclap bloom','short plate lift'],intro_signature:'room tone + organ breath',outro_signature:'steel tail + room decay',forbidden_timbres:['supersaw drops','glossy EDM risers']},
    performance:{kick_behavior:'anchors downbeats; syncopates around vocal pickups',snare_behavior:'firm backbeat with sparse ghost clap',hihat_grid:'straight 16ths with restrained triplet turns',bass_relation:'808 reinforces key kicks and leaves vocal holes',push_pull:'slightly behind',fill_frequency:'rare',breakdown_strategy:'strip drums and low end for bridge first half',climax_location:'Final Chorus',timing_variation:'8-18 ms on human layers',humanized_elements:['claps','organ swells','steel answers'],swing_source:'vocal phrasing',crowd_interaction_cues:['brief choir answers','breath-space before hooks'],dj_cues:[],sections:[
      {id:'S1',title:'Verse 1',bars:8,function:'establish',focus:'private weariness',tempo_mode:'base pocket',dynamic_level:0.55,call_response:'none',performance_notes:'close lead; leave breath',production_cues:'dry center; sparse organ',into_cue:'room tone pickup',out_of_cue:'one-beat breath',energy_jump:'small lift',transition_fx:['organ swell'],pause_slots:'bar 8 beat 4',rhyme_scheme:'ABAB',lines:[
        {text:'I kept the porch light on through every kind of rain',adlib:'',sfx:'',source_index:-1,syllable_count:13,stress_pattern:'mixed conversational',rhyme_class:'A',motif_tag:'weather',emotional_beat:'endurance'},
        {text:'Learned which promises get quiet when the bills come due',adlib:'',sfx:'',source_index:-1,syllable_count:14,stress_pattern:'front weighted',rhyme_class:'B',motif_tag:'truth',emotional_beat:'disillusion'},
        {text:'Now I know the sound of my own name without the shame',adlib:'',sfx:'',source_index:-1,syllable_count:13,stress_pattern:'even',rhyme_class:'A',motif_tag:'identity',emotional_beat:'recognition'},
        {text:'And I know who stays when there is nothing left to prove',adlib:'',sfx:'',source_index:-1,syllable_count:13,stress_pattern:'late lift',rhyme_class:'B',motif_tag:'community',emotional_beat:'trust'}]},
      {id:'S2',title:'Chorus',bars:8,function:'payoff',focus:'communal resolve',tempo_mode:'base pocket; wider feel',dynamic_level:0.82,call_response:'response group answers hook tails',performance_notes:'open-throat lead; response group enters',production_cues:'choir width; plate blooms only on tails',into_cue:'clap pickup',out_of_cue:'hold final word',energy_jump:'clear lift',transition_fx:['short plate bloom'],pause_slots:'none',rhyme_scheme:'AABB',lines:[
        {text:'I can stand the rain if I can stand here true',adlib:'stand',sfx:'',source_index:-1,syllable_count:12,stress_pattern:'hook strong',rhyme_class:'A',motif_tag:'weather',emotional_beat:'resolve'},
        {text:'I do not need the storm to tell me what to do',adlib:'tell it',sfx:'',source_index:-1,syllable_count:13,stress_pattern:'hook strong',rhyme_class:'A',motif_tag:'agency',emotional_beat:'defiance'},
        {text:'Bring the whole room in when the old fear calls my name',adlib:'come on',sfx:'handclap bloom',source_index:-1,syllable_count:13,stress_pattern:'rising',rhyme_class:'B',motif_tag:'community',emotional_beat:'connection'},
        {text:'I am still right here and I can stand the rain',adlib:'right here',sfx:'',source_index:-1,syllable_count:12,stress_pattern:'landing',rhyme_class:'B',motif_tag:'weather',emotional_beat:'release'}]},
      {id:'S3',title:'Bridge',bars:4,function:'contrast',focus:'vulnerability',tempo_mode:'half-time feel',dynamic_level:0.42,call_response:'none',performance_notes:'near-whisper first two bars; no choir',production_cues:'drop 808; organ and room only',into_cue:'hard low-end mute',out_of_cue:'snare fill into final lift',energy_jump:'deep drop then surge',transition_fx:['room inhale'],pause_slots:'bar 4 beat 4',rhyme_scheme:'free',lines:[
        {text:'Strength is not the same as never needing hands',adlib:'',sfx:'',source_index:-1,syllable_count:11,stress_pattern:'slow',rhyme_class:'C',motif_tag:'community',emotional_beat:'admission'},
        {text:'I found mine when I finally let them understand',adlib:'',sfx:'',source_index:-1,syllable_count:13,stress_pattern:'rising',rhyme_class:'C',motif_tag:'trust',emotional_beat:'opening'}]},
      {id:'S4',title:'Final Chorus',bars:8,function:'earned payoff',focus:'full-room resolve',tempo_mode:'base pocket; maximum lift',dynamic_level:0.95,call_response:'full response group answers hook tails',performance_notes:'lead plus full response group; keep lead intelligible',production_cues:'widest room image; steel answers; mono low end',into_cue:'full-band return',out_of_cue:'hold final cadence into room decay',energy_jump:'final peak',transition_fx:['clap swell'],pause_slots:'none',rhyme_scheme:'AABB',lines:[
        {text:'I can stand the rain if I can stand here true',adlib:'stand',sfx:'',source_index:-1,syllable_count:12,stress_pattern:'hook strong',rhyme_class:'A',motif_tag:'weather',emotional_beat:'resolve'},
        {text:'I do not need the storm to tell me what to do',adlib:'tell it',sfx:'',source_index:-1,syllable_count:13,stress_pattern:'hook strong',rhyme_class:'A',motif_tag:'agency',emotional_beat:'defiance'},
        {text:'Bring the whole room in when the old fear calls my name',adlib:'come on',sfx:'handclap bloom',source_index:-1,syllable_count:13,stress_pattern:'rising',rhyme_class:'B',motif_tag:'community',emotional_beat:'connection'},
        {text:'I am still right here and I can stand the rain',adlib:'right here',sfx:'steel tail',source_index:-1,syllable_count:12,stress_pattern:'landing',rhyme_class:'B',motif_tag:'weather',emotional_beat:'release'}]}
    ]},
    post_production:{priority_order:['lead vocal','kick/808','snare/clap','harmonic bed','ear candy'],vocal_position:'center and forward; room behind it',low_end_policy:'mono kick and 808; short release; no harmonic masking',mid_clarity:['cut low-mid buildup before adding presence'],top_end:'soft air; no brittle hat or sibilance spike',reverb:['short room verses','darker plate hook tails'],delay:['rare quarter-note throw on selected line endings'],dry_wet:[{layer:'lead',amount:0.15},{layer:'support',amount:0.4}],space_identity:'small live room that becomes communal without turning glossy',target_lufs:-10,reference_profile:'live-room soul impact over loudness chasing',saturation:0.18,stereo_width:'mono-compatible core; hooks widen above low mids',limiter:'soft ceiling; preserve kick transient',target_systems:['headphones','car','club','phone mono'],mono_compat:'high',club_impact:0.85,headphone_immersion:0.8} ,
    lyrics:{pov:'1st',tense:'present',themes:['endurance','agency','chosen community'],profanity_policy:'none',imagery_register:'concrete'}
  };
  const sem=Object.fromEntries(['K1','K2','K3','K4','K5','K6','K7'].map(k=>[k,{status:'PASS',finding:'fixture coverage'}]));
  const worker_packets=WORKERS.map(owner=>({owner,finding:`${owner} fixture packet`,risk_notes:[],null_disposition:'unscoped nulls preserved',sem}));
  const resolution={technical,worker_packets};
  const audit={overall_status:'PASS',narrative_cohesion:'PASS',factors:TWENTY_FACTORS.map(x=>({id:x.id,status:'PASS',finding:'fixture pass',addresses:[]})),council:WORKERS.map(role=>({role,verdict:'ACCEPT_WITH_LIMITS',finding:'fixture review',addresses:[]})),repair_requests:[]};
  return {envelope,resolution,audit};
}

const crcTable=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc=b=>{let c=0xffffffff;for(const x of b)c=crcTable[(c^x)&255]^(c>>>8);return(c^0xffffffff)>>>0};
const u16=n=>{const b=Buffer.alloc(2);b.writeUInt16LE(n);return b};const u32=n=>{const b=Buffer.alloc(4);b.writeUInt32LE(n>>>0);return b};
function zip(files){const ls=[],cs=[];let off=0;for(const[name,val]of Object.entries(files)){const d=Buffer.from(String(val)),nb=Buffer.from(name),z=crc(d);const l=Buffer.concat([u32(0x04034b50),u16(20),u16(0),u16(0),u16(0),u16(0),u32(z),u32(d.length),u32(d.length),u16(nb.length),u16(0),nb,d]);ls.push(l);cs.push(Buffer.concat([u32(0x02014b50),u16(20),u16(20),u16(0),u16(0),u16(0),u16(0),u32(z),u32(d.length),u32(d.length),u16(nb.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(off),nb]));off+=l.length}const body=Buffer.concat(ls),dir=Buffer.concat(cs);return Buffer.concat([body,dir,u32(0x06054b50),u16(0),u16(0),u16(cs.length),u16(cs.length),u32(dir.length),u32(body.length),u16(0)])}
export function packageTwoSurfaces(result){
  gate(result?.outputs?.suno_style_prompt&&result?.outputs?.creative_ust_lyrics_prompt,'PACKAGE_INPUT','Two frozen prompt surfaces are required for packaging.');
  gate(result?.receipt?.status==='PACKAGED','PACKAGE_RECEIPT','A frozen packaging receipt is required.');
  const expected=digest({suno_style_prompt:result.outputs.suno_style_prompt,creative_ust_lyrics_prompt:result.outputs.creative_ust_lyrics_prompt,technical_lock:result.receipt.technical_ust_digest});
  gate(expected===result.receipt.output_digest,'PACKAGE_DIGEST','Output surfaces do not match the frozen receipt.');
  return zip({'suno_style_prompt.txt':result.outputs.suno_style_prompt,'creative_ust_lyrics_prompt.txt':result.outputs.creative_ust_lyrics_prompt,'verification_receipt.json':JSON.stringify(result.receipt,null,2)});
}
