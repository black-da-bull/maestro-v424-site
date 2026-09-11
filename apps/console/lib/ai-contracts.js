import { RUNTIME_VERSION, TWENTY_FACTORS, WORKERS } from './maestro.js';

const str={type:'string',minLength:1};
const num01={type:'number',minimum:0,maximum:1};
const obj=properties=>({type:'object',additionalProperties:false,properties,required:Object.keys(properties)});
const arr=(items,extra={})=>({type:'array',items,...extra});
const strs=(min=1,max=20)=>arr(str,{minItems:min,maxItems:max});
const semCell=obj({status:{type:'string',enum:['PASS','WARN','BLOCK']},finding:str});
const sem=obj({K1:semCell,K2:semCell,K3:semCell,K4:semCell,K5:semCell,K6:semCell,K7:semCell});
const line=obj({text:str,adlib:{type:'string'},sfx:{type:'string'},source_index:{type:'integer',minimum:-1},syllable_count:{type:'integer',minimum:1},stress_pattern:str,rhyme_class:str,motif_tag:str,emotional_beat:str});
const section=obj({
  id:str,title:str,bars:{type:'integer',minimum:1,maximum:64},function:str,focus:str,tempo_mode:str,dynamic_level:num01,call_response:str,
  performance_notes:str,production_cues:str,into_cue:str,out_of_cue:str,energy_jump:str,transition_fx:arr(str,{maxItems:8}),pause_slots:str,rhyme_scheme:str,lines:arr(line,{minItems:1,maxItems:32})
});
const workerPacket=obj({owner:{type:'string',enum:WORKERS},finding:str,risk_notes:arr({type:'string'}),null_disposition:str,sem});
const instrumentRole=obj({instrument:str,role:str});
const layerAmount=obj({layer:str,amount:num01});

export const RESOLUTION_SCHEMA=obj({
  technical:obj({
    theory:obj({tonal_center:str,mode:str,function_inventory:strs(),cadential_shapes:strs(),chord_extensions:strs(),meter:str,tempo_bpm:{type:'integer',minimum:35,maximum:240},feel_mode:str,tension_release_curve:str}),
    voices:obj({lead_timbre:str,register:str,accent:str,emotion_palette:strs(),flow_patterns:strs(),articulation_sharpness:num01,stack_roles:strs(),voicing_style:str}),
    style:obj({primary_genre:str,secondary_genres:strs(),era:strs(),modernity:str,texture:strs(),aesthetic:str,start_state:str,mid_state:str,end_state:str,tension_theme:strs(),resolution_theme:strs(),playback_context:strs(),focus:str}),
    timbre:obj({core_instruments:strs(),instrument_roles:arr(instrumentRole,{minItems:1,maxItems:24}),texture_mode:str,analog_digital:obj({analog:num01,digital:num01}),noise_sources:arr(str,{maxItems:12}),sub_register:str,low_mids:str,high_mids:str,air_band:str,clash_policy:str,signature_instrument:str,hook_fx:arr(str,{maxItems:12}),intro_signature:str,outro_signature:str,forbidden_timbres:arr(str,{maxItems:12})}),
    performance:obj({kick_behavior:str,snare_behavior:str,hihat_grid:str,bass_relation:str,push_pull:{type:'string',enum:['ahead','center','behind','slightly_ahead','slightly_behind']},fill_frequency:{type:'string',enum:['rare','moderate','very_often']},breakdown_strategy:str,climax_location:str,timing_variation:str,humanized_elements:strs(),swing_source:str,crowd_interaction_cues:arr(str,{maxItems:16}),dj_cues:arr(str,{maxItems:16}),sections:arr(section,{minItems:1,maxItems:16})}),
    post_production:obj({priority_order:strs(),vocal_position:str,low_end_policy:str,mid_clarity:strs(),top_end:str,reverb:arr(str,{maxItems:12}),delay:arr(str,{maxItems:12}),dry_wet:arr(layerAmount,{minItems:1,maxItems:16}),space_identity:str,target_lufs:{type:'number',minimum:-24,maximum:-5},reference_profile:str,saturation:num01,stereo_width:str,limiter:str,target_systems:strs(),mono_compat:str,club_impact:num01,headphone_immersion:num01}),
    lyrics:obj({pov:{type:'string',enum:['1st','2nd','3rd','shifting']},tense:{type:'string',enum:['past','present','future','braided']},themes:strs(),profanity_policy:{type:'string',enum:['none','limited','free']},imagery_register:{type:'string',enum:['concrete','mixed','abstract']}})
  }),
  worker_packets:arr(workerPacket,{minItems:8,maxItems:8})
});

const factor=obj({id:{type:'string',enum:TWENTY_FACTORS.map(x=>x.id)},status:{type:'string',enum:['PASS','WARN','BLOCK']},finding:str,addresses:arr({type:'string'})});
const council=obj({role:{type:'string',enum:WORKERS},verdict:{type:'string',enum:['ACCEPT','ACCEPT_WITH_LIMITS','REJECT']},finding:str,addresses:arr({type:'string'})});
const repair=obj({owner:{type:'string',enum:WORKERS},axes:arr({type:'string',enum:['THY','VOC','STY','TIM','PER','POST','LYR']},{minItems:1}),addresses:arr({type:'string'}),instruction:str});
export const AUDIT_SCHEMA=obj({overall_status:{type:'string',enum:['PASS','BLOCK']},narrative_cohesion:{type:'string',enum:['PASS','BLOCK']},factors:arr(factor,{minItems:20,maxItems:20}),council:arr(council,{minItems:8,maxItems:8}),repair_requests:arr(repair,{maxItems:16})});

export function resolutionInstructions(envelope,{defect=null,current=null,repairAxes=[]}={}){
  const mode=current?'TARGETED REPAIR':'INITIAL RESOLUTION';
  return [
    `MoMoney Maestro ${RUNTIME_VERSION} resident-worker session. Mode: ${mode}.`,
    'You are not the controller. Simulate bounded resident-worker labor and return only the strict JSON object requested by the schema. The controller maps these typed values into canonical Technical UST addresses.',
    'Technical UST is the sole canonical truth object. Do not emit Creative UST, Show Summary, Suno prompts, or another derivative surface in this response.',
    'Resident authority: Canon = schema/phase/lock law; Mo = excellence floor; Metro = emotional/cultural truth; Sage = lyric motion/narrative; Vanessa = vocal believability; Alan = arrangement/form/section space; Dave = groove/pocket; Eldrik = timbre/post/engineering.',
    'Every worker_packets entry must be present exactly once. SEM is concurrent quality pressure: K1 structural viability; K2 cross-axis coherence; K3 creative strength; K4 performance truth; K5 sonic identity; K6 compression survivability; K7 external viability. Use BLOCK only for a real unresolved defect.',
    'Resolve every field with concrete song-specific values and canonical types. Lists stay lists. Ratios/scales stay numeric. target_lufs is numeric. instrument_roles and dry_wet use their structured map-entry arrays. Never use placeholder words such as TBD, unknown, insert, n/a, or null.',
    'Performance.sections is the authoritative section-instance plan. Each section needs a 0..1 dynamic_level and a concrete call_response policy even when that policy is none. Include bar counts, section function, performance notes, production cues, transitions, rhyme scheme, and line-level lyric metadata.',
    'If source lyrics are supplied and lyric_policy is preserve, use exactly those lyric content lines, in the same order, with one and only one line object per protected source line. Set source_index to its zero-based index. Do not add, drop, paraphrase, reorder, merge, or split protected lyric lines. Adlib and sfx metadata may be added without changing line.text.',
    'If no source lyrics are supplied, write original lyrics appropriate to the request and set source_index to -1 for every generated line.',
    'Do not put governance names, council language, worker names, Technical UST addresses, or internal process commentary inside lyric text.',
    'Treat downstream character budgets as local compatibility targets, not claims about current Suno limits. Keep semantic descriptors compact while preserving creative leverage.',
    `Operator request envelope: ${JSON.stringify(envelope)}`,
    defect?`Repair defect from prior attempt: ${JSON.stringify(defect)}`:'',
    repairAxes.length?`Only these Technical UST axes are authorized to change in this repair: ${repairAxes.join(', ')}. Return a full schema object for validation, but preserve all other axes semantically.`:'',
    current?`Current prior resolution for reference: ${JSON.stringify(current)}`:''
  ].filter(Boolean).join('\n\n');
}

export function auditInstructions(auditView){
  return [
    `MoMoney Maestro ${RUNTIME_VERSION} pre-lock round-robin audit. Evaluate the internal Technical UST only. Do not emit any Suno-facing surface.`,
    'This is a single-model emulation of the resident staff, not independent experts. Every council role must appear exactly once. REJECT only when a genuine blocker remains; ACCEPT_WITH_LIMITS is appropriate for nonblocking uncertainty.',
    'Evaluate all 20 factors exactly once. There is no invented numeric threshold. PASS means adequate for release; WARN means nonblocking limitation; BLOCK means a defect that must be repaired before lock.',
    `Required factors: ${TWENTY_FACTORS.map(x=>`${x.id} ${x.label}`).join('; ')}`,
    'Narrative cohesion is a hard gate. Pressure structural viability, cross-axis coherence, creative strength, performance truth, sonic identity, compression survivability, parser safety, source fidelity, and lyric-lock readiness.',
    'If BLOCK is returned, provide at least one repair_request with the responsible resident worker, affected canonical axis or axes, affected addresses when known, and a concise repair instruction. Scope repairs to the earliest affected axis and necessary dependents only.',
    'Do not claim audio rendering, rights clearance, HPA measurement, DSP execution, or independent multi-model review. Those systems are external and NOT_RUN here.',
    `Technical UST audit view: ${JSON.stringify(auditView)}`
  ].join('\n\n');
}

const checklistFill=obj({
  address:str,
  owner:{type:'string',enum:WORKERS},
  value_json:str,
  rationale:str,
  sem
});
export const CHECKLIST_SCHEMA=obj({fills:arr(checklistFill,{minItems:1,maxItems:165})});

export function checklistInstructions(envelope,pending,{defect=null}={}){
  return [
    `MoMoney Maestro ${RUNTIME_VERSION} Technical UST checklist completion pass.`,
    'Technical UST is a checklist. Your job is to REPLACE every assigned null with a concrete value. Do not preserve an assigned null merely because the user did not state it explicitly. Infer the most coherent value from the complete operator input and already-resolved song state.',
    'Return exactly one fill for every pending address and no others. Each address has a designated worker owner. Do not change ownership.',
    'value_json must be a JSON-encoded value matching the canonical type. Examples: strings use JSON strings; lists use JSON arrays; maps and ratios use JSON objects; bool uses true/false; integer/float/scales use JSON numbers. Empty arrays or objects are allowed only when the resolved meaning is genuinely none/empty, not as a substitute for thinking.',
    'Never return null, TBD, unknown, insert, unresolved, not applicable, or placeholder prose. If the previous packet failed validation, repair the failed addresses and still return the full pending assignment.',
    'SEM is concurrent. A BLOCK inside a fill means that fill is not acceptable and will be rerouted to the same owner. Prefer resolving the issue in this packet rather than declaring it blocked.',
    'Do not emit Creative UST, Show Summary, Suno prompts, controller commentary, or governance text.',
    `Operator request envelope: ${JSON.stringify(envelope)}`,
    `Pending Technical UST checklist assignments: ${JSON.stringify(pending)}`,
    defect?`Prior worker packet validation defect. Correct it on reroute: ${JSON.stringify(defect)}`:''
  ].filter(Boolean).join('\n\n');
}
