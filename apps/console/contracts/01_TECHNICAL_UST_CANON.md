# Technical UST — Current Canon v0.1 (O-16 derivation)
**The sole canonical truth object. Internal process/control artifact at lock — NEVER an output.**

## Axis registry (P-2: 7 audio axes; M13 applied — Roadmap is not an axis)
**Axis names are RE-EXPANDED to match the Creative UST metacontainers (operator, 2026-07-19) —
Technical↔Creative axis identity is literal, 1:1, and is the linkage law.**
| Code (alias) | Canonical axis name | Creative UST container | Notes |
|---|---|---|---|
| THY | Theory | Theory | |
| VOC | Voices | Voices | crew tags consolidate here (Y-3 freeze) |
| STY | Style | Style | AestheticIntent = era alias |
| TIM | Timbre | Timbre | |
| PER | Performance | Performance | code is 3-letter; 4-letter variant retired. Carries `Performance.execution` — structure-reservation migrated from the retired Roadmap axis (M13) |
| POST | Post-Production | Post-Production | |
| LYR | Lyrics | Lyrics Block | section headers carry timing (M13); lyric lock applies |
VIS/VIG/SEL: separate optional module set (visual identity axis + generation + surface export),
NOT part of the audio runtime axis registry. Extension point documented in 08.
Aliases never become separate identities; resolve via this registry only. MAP appears in historical
artifacts only — read under M13/DEC-09; never instantiate as an axis.

## Addressing & null protocol
Address form `axis.key.subkey.null(n+1)`; addressable, nullable, lineage-preserving.
Address law: resolve · preserve · justify · escalate. Nulls are signal and structured possibility —
no silent fill, no skipped subkey, no truncation. Never delete, never infer a null closed.

## State machine
NULL → PROPOSED → PRESSURED → RESOLVED → LOCKED (monotonic; no drop, no revert).
Invariants: populated addresses never return to NULL; locked operator values (97.5) hold unless a
supersession is logged; only ROOT supersession clears a guard (AI proposals record, never clear).

## MATERIALIZED FULL TOPOLOGY (O16C — compiled, zero omissions)
Compiled by `build/compile_current.py` from the predecessor master spec
(`artifacts/D-Maestro/Maestro/technical.ust.template.txt`, md5 `eaf18e1101c7a5814850fe0c62743b3a`,
INDEX-verified) with the M13 migration applied address-by-address: 33 keys, 165 subkeys, 7 axes;
MAP.K1–K4 rehomed as PER.K5–K8 (24 migrated addresses; see TECHNICAL_UST_ADDRESS_MIGRATION.yaml;
coverage: FULL_CANON_COVERAGE_MATRIX.yaml — 0 unexplained omissions).

# TECHNICAL.UST – CANON SKELETON

# Hierarchy: AXIS > KEY > SUBKEY > {n}

# ============================================================

technical_ust:

kernel:

id: "TECHNICAL.UST.CANON.V1"

description: >

Canonical middleware schema for complete musical control:

macro (form/genre) → meso (section/part) → micro (phrase/line) → atomic (word/event).

axis_order:

- theory_axis

- vocals_axis

- style_axis

- timbre_axis

- performance_axis

- post_production_axis

- road_map_axis

- lyrics_block_axis

# ----------------------------------------------------------

# GLOBAL PATTERNS & NAMING

# ----------------------------------------------------------

patterns:

axis_id: "{AXIS_TAG}" # THY, VOC, STY, TIM, PER, POST, LYR (7 axes; MAP retired per M13 - its keys live at PER.K5-K8)

key_id: "{AXIS_TAG}.K{key_index}" # e.g. THY.K1

subkey_id: "{AXIS_TAG}.K{key_index}.S{sub_index}" # e.g. THY.K1.S3

instance_index: "{n}" # e.g. .01 .02 .03 when expanded

section_label: "SEC.{LABEL}" # e.g. SEC.V1, SEC.HK2

line_label: "LN.{section}.{line_index}"

word_label: "WD.{section}.{line_index}.{token_index}"

# ==========================================================

# 1. THEORY AXIS – HARMONY · RHYTHM · FORM

# ==========================================================

theory_axis:

axis_id: "THY"

description: "Global and sectional tonal gravity, harmonic grammar, rhythmic grid, and formal logic."

keys:

# ------------------ THY.K1 – TONAL SYSTEM ------------------

- key_id: "THY.K1"

name: "Tonal_System"

level: "macro"

scope: "song_global"

subkeys:

- subkey_id: "THY.K1.S1"

name: "Root_Note"

type: "note_name"

role: "primary_tonal_center"

example_value: "D"

explanation: "The main pitch center everything resolves to."

- subkey_id: "THY.K1.S2"

name: "Primary_Mode"

type: "scale_mode"

role: "default_scalar_context"

example_value: "Aeolian"

explanation: "Default scalar flavor for melodies, harmonies, and riffs."

- subkey_id: "THY.K1.S3"

name: "Secondary_Centers{n}"

type: "list<note_name>"

role: "relative_or_modal_pivots"

example_value: ["F", "C"]

explanation: "Allowed side-centers that get temporary pull but never replace the home key."

- subkey_id: "THY.K1.S4"

name: "Chromatic_Tension_Classes{n}"

type: "list<interval_label>"

role: "approved_non_diatonic_colors"

example_value: ["♭2", "♯4", "♭5"]

explanation: "Non-diatonic pitches that are legal tension, with expectation of resolution."

- subkey_id: "THY.K1.S5"

name: "Modulation_Policy"

type: "enum"

values: ["none", "momentary_only", "short_lift", "full_mod"]

example_value: "momentary_only"

explanation: "Whether and how the song is allowed to leave the home key."

# ------------------ THY.K2 – HARMONIC GRAMMAR --------------

- key_id: "THY.K2"

name: "Harmonic_Grammar"

level: "macro"

scope: "song_global"

subkeys:

- subkey_id: "THY.K2.S1"

name: "Function_Inventory{n}"

type: "list<roman_numeral>"

role: "core_functional_set"

example_value: ["i", "VI", "VII", "iv"]

explanation: "Core harmonic functions that define the language."

- subkey_id: "THY.K2.S2"

name: "Cadential_Shapes{n}"

type: "list<pattern>"

role: "go_to_resolutions"

example_value: ["bII → i", "iv → i", "VI → VII → i"]

explanation: "Approved cadence formulas for section ends and big phrases."

- subkey_id: "THY.K2.S3"

name: "Pedal_Points{n}"

type: "list<note_name>"

role: "static_bass_or_top_anchors"

example_value: ["D"]

explanation: "Notes that can drone under moving harmony."

- subkey_id: "THY.K2.S4"

name: "Non_Diatonic_Entry_Modes"

type: "enum_list"

values: ["chromatic_approach", "planing", "subV", "borrowed_chord"]

example_value: ["chromatic_approach", "borrowed_chord"]

explanation: "How non-diatonic material is legally introduced."

- subkey_id: "THY.K2.S5"

name: "Chord_Extensions{n}"

type: "list<extension_label>"

role: "preferred_color_tones"

example_value: ["add9", "11", "13", "sus4"]

explanation: "Common extension flavors that define color (esp. gospel)."

# ------------------ THY.K3 – RHYTHMIC/METRICAL GRID --------

- key_id: "THY.K3"

name: "Rhythmic_Grid"

level: "macro"

scope: "song_global"

subkeys:

- subkey_id: "THY.K3.S1"

name: "Meter"

type: "meter_signature"

role: "primary_time_signature"

example_value: "4/4"

- subkey_id: "THY.K3.S2"

name: "Tempo_BPM"

type: "integer"

role: "base_tempo"

example_value: 144

- subkey_id: "THY.K3.S3"

name: "Feel_Mode"

type: "enum"

values: ["straight", "swing_light", "swing_heavy", "laid_back", "pushed"]

example_value: "straight"

- subkey_id: "THY.K3.S4"

name: "Subdivision_Policy{n}"

type: "list<subdivision_type>"

role: "allowed_micro_grids"

example_value: ["1/8", "1/16", "1/16_triplet"]

explanation: "Grids drums and riffs are allowed to lean on."

- subkey_id: "THY.K3.S5"

name: "Syncopation_Profile"

type: "enum"

values: ["minimal", "moderate", "dense", "accent_pocket_only"]

example_value: "moderate"

# ------------------ THY.K4 – FORM & MOTIFS -----------------

- key_id: "THY.K4"

name: "Form_and_Motifs"

level: "meso"

scope: "sectional"

subkeys:

- subkey_id: "THY.K4.S1"

name: "Phrase_Length_Options{n}"

type: "list<bar_count>"

role: "allowed_phrase_sizes"

example_value: [2, 4, 8]

- subkey_id: "THY.K4.S2"

name: "Motif_Cell_Length{n}"

type: "list<beat_or_bar_span>"

role: "motif_atom_sizes"

example_value: ["1 bar", "2 beats"]

- subkey_id: "THY.K4.S3"

name: "Motif_Development_Modes{n}"

type: "list<technique>"

role: "how_motifs_evolve"

example_value: ["repetition", "sequence", "inversion_rhythmic", "additive"]

- subkey_id: "THY.K4.S4"

name: "Section_Relation_Map{n}"

type: "map<section→section>"

role: "how_harmony_links_sections"

example_value: {"V1→HK1": "cadence", "HK1→V2": "lift_then_drop"}

- subkey_id: "THY.K4.S5"

name: "Tension_Release_Curve"

type: "curve_descriptor"

role: "global_form_energy_shape"

example_value: "low → build → peak at HK2 → brief drop → final peak"

# ==========================================================

# 2. VOCALS AXIS – IDENTITY · DELIVERY · STACKING

# ==========================================================

vocals_axis:

axis_id: "VOC"

description: "Lead identity, delivery, choir/harmony, adlibs, and call/response policies."

keys:

# ------------------ VOC.K1 – LEAD IDENTITY -----------------

- key_id: "VOC.K1"

name: "Lead_Identity"

level: "macro"

scope: "song_global"

subkeys:

- subkey_id: "VOC.K1.S1"

name: "Timbre_Profile"

type: "descriptor"

role: "tone_color"

example_value: "androgynous Southern voice, slightly raspy"

- subkey_id: "VOC.K1.S2"

name: "Register_Range"

type: "interval_span"

role: "low_to_high_working_range"

example_value: "G2–C5"

- subkey_id: "VOC.K1.S3"

name: "Accent_Color"

type: "descriptor"

role: "regional_or_stylistic_accent"

example_value: "light Southern drawl"

- subkey_id: "VOC.K1.S4"

name: "Delivery_Mixture"

type: "ratio"

role: "rap_vs_sing_blend"

example_value: {"rap": 0.6, "melodic_rap": 0.25, "sung": 0.15}

- subkey_id: "VOC.K1.S5"

name: "Emotion_Palette{n}"

type: "list<emotion_label>"

role: "allowed_core_emotions"

example_value: ["confessional", "defiant", "uplifting"]

# ------------------ VOC.K2 – DELIVERY TECHNIQUES -----------

- key_id: "VOC.K2"

name: "Delivery_Techniques"

level: "meso"

scope: "sectional"

subkeys:

- subkey_id: "VOC.K2.S1"

name: "Flow_Pattern_Type{n}"

type: "list<flow_label>"

role: "rap_flow_architectures"

example_value: ["straight_16s", "triplet_bursts", "double_time_feel"]

- subkey_id: "VOC.K2.S2"

name: "Melisma_Density"

type: "enum"

values: ["none", "rare", "moderate", "heavy"]

example_value: "moderate"

- subkey_id: "VOC.K2.S3"

name: "Vibrato_Policy"

type: "enum"

values: ["none", "cadences_only", "emotional_peaks", "frequent"]

example_value: "cadences_only"

- subkey_id: "VOC.K2.S4"

name: "Articulation_Sharpness"

type: "scale_0_1"

role: "crisp_to_slurred"

example_value: 0.75

- subkey_id: "VOC.K2.S5"

name: "Intensity_By_Section{n}"

type: "map<section→scale_0_1>"

role: "dynamic_intensity_map"

example_value: {"SEC.V1": 0.6, "SEC.HK1": 0.9}

# ------------------ VOC.K3 – HARMONY/CHOIR -----------------

- key_id: "VOC.K3"

name: "Harmony_and_Choir"

level: "meso"

scope: "hook/bridge"

subkeys:

- subkey_id: "VOC.K3.S1"

name: "Stack_Roles{n}"

type: "list<role>"

role: "who_sings_what"

example_value: ["lead", "high_harmony", "low_harmony", "choir_pad"]

- subkey_id: "VOC.K3.S2"

name: "Voicing_Style"

type: "descriptor"

role: "cluster_vs_spread"

example_value: "tight gospel clusters with occasional octave doubles"

- subkey_id: "VOC.K3.S3"

name: "Unison_vs_Intervals_Ratio"

type: "ratio"

role: "unison_to_harmony_blend"

example_value: {"unison": 0.4, "interval": 0.6}

- subkey_id: "VOC.K3.S4"

name: "Call_Response_Map{n}"

type: "map<section→pattern>"

role: "where_choir_answers_lead"

example_value: {"SEC.HK1": "lead_1bar / choir_1bar answers"}

- subkey_id: "VOC.K3.S5"

name: "Choir_Energy_Curve"

type: "curve_descriptor"

role: "when_choir_is_big_vs_subtle"

example_value: "subtle pads in verses, full stacks on hooks and outro"

# ------------------ VOC.K4 – ADLIBS & FX VOICES ------------

- key_id: "VOC.K4"

name: "Adlibs_and_FX_Voices"

level: "micro"

scope: "moment_local"

subkeys:

- subkey_id: "VOC.K4.S1"

name: "Adlib_Density_By_Section{n}"

type: "map<section→density_label>"

role: "how_busy_adlibs_are"

example_value: {"SEC.V1": "low", "SEC.HK1": "medium"}

- subkey_id: "VOC.K4.S2"

name: "Adlib_Semantic_Mode{n}"

type: "list<label>"

role: "words_vs_textures"

example_value: ["shouts", "breaths", "amen_calls"]

- subkey_id: "VOC.K4.S3"

name: "Stereo_Placement_Policy"

type: "descriptor"

role: "pan_behaviour"

example_value: "lead centered, adlibs and responses panned wide"

- subkey_id: "VOC.K4.S4"

name: "Timing_Relation_to_Main"

type: "enum"

values: ["before_phrase", "after_phrase", "overlap_soft", "overlap_strong"]

example_value: "after_phrase"

- subkey_id: "VOC.K4.S5"

name: "Talkover_Slots{n}"

type: "list<section_bar_range>"

role: "bars_reserved_for_talkover"

example_value: ["SEC.INTRO: bars 1–4"]

# ==========================================================

# 3. STYLE AXIS – GENRE · GROOVE · MOOD

# ==========================================================

style_axis:

axis_id: "STY"

description: "Genre stack, era cues, emotional framing, and scene identity."

keys:

- key_id: "STY.K1"

name: "Genre_Stack"

level: "macro"

subkeys:

- subkey_id: "STY.K1.S1"

name: "Primary_Genre"

type: "label"

example_value: "Gospel-Trap"

- subkey_id: "STY.K1.S2"

name: "Secondary_Genres{n}"

type: "list<label>"

example_value: ["Southern Americana", "Blues-Trap", "Miami Bass"]

- subkey_id: "STY.K1.S3"

name: "Weighting"

type: "ratio_map"

example_value: {"Gospel-Trap": 0.6, "Southern Americana": 0.25, "Blues-Trap": 0.15}

- subkey_id: "STY.K1.S4"

name: "Forbidden_Style_Regions{n}"

type: "list<label>"

example_value: ["EDM_Supersaw_Drops", "LoFi_Study_Chill"]

- subkey_id: "STY.K1.S5"

name: "Scene_Tagging{n}"

type: "list<hashtag>"

example_value: ["#GospelTrapRevival", "#SouthernStoryTelling"]

- key_id: "STY.K2"

name: "Era_and_Texture"

level: "macro"

subkeys:

- subkey_id: "STY.K2.S1"

name: "Era_Reference{n}"

type: "list<decade_or_scene>"

example_value: ["90s Southern Rap", "2000s Gospel"]

- subkey_id: "STY.K2.S2"

name: "Modernity_Tilt"

type: "enum"

values: ["vintage_lean", "balanced", "modern_lean"]

example_value: "modern_lean"

- subkey_id: "STY.K2.S3"

name: "Texture_Descriptors{n}"

type: "list<descriptor>"

example_value: ["dusty", "cinematic", "gritty_but_clean_low_end"]

- subkey_id: "STY.K2.S4"

name: "Color_Palette"

type: "metaphor"

example_value: "warm amber and deep blues"

- subkey_id: "STY.K2.S5"

name: "Energy_Tier_Map{n}"

type: "map<section→tier_1_5>"

example_value: {"SEC.INTRO": 2, "SEC.V1": 3, "SEC.HK1": 5}

- key_id: "STY.K3"

name: "Emotional_Narrative"

level: "macro"

subkeys:

- subkey_id: "STY.K3.S1"

name: "Start_State"

type: "emotion_label"

example_value: "weary_confession"

- subkey_id: "STY.K3.S2"

name: "Mid_State"

type: "emotion_label"

example_value: "struggle_and_pushback"

- subkey_id: "STY.K3.S3"

name: "End_State"

type: "emotion_label"

example_value: "defiant_hope"

- subkey_id: "STY.K3.S4"

name: "Primary_Tension_Theme{n}"

type: "list<label>"

example_value: ["financial_trauma", "faith_crisis", "survival"]

- subkey_id: "STY.K3.S5"

name: "Primary_Resolution_Theme{n}"

type: "list<label>"

example_value: ["community", "faith_reframed", "self_advocacy"]

- key_id: "STY.K4"

name: "Audience_and_Use_Case"

level: "macro"

subkeys:

- subkey_id: "STY.K4.S1"

name: "Playback_Context{n}"

type: "list<label>"

example_value: ["playlist", "live_show_opener", "car_ride"]

- subkey_id: "STY.K4.S2"

name: "Explicitness_Level"

type: "enum"

values: ["clean", "light_swear", "heavy_swear"]

- subkey_id: "STY.K4.S3"

name: "Replayability_Priority"

type: "enum"

values: ["vibe", "bars", "hook", "story"]

- subkey_id: "STY.K4.S4"

name: "DJ_Friendliness"

type: "scale_0_1"

example_value: 0.9

- subkey_id: "STY.K4.S5"

name: "Sync_Potential"

type: "enum"

values: ["low", "medium", "high"]

# ==========================================================

# 4. TIMBRE AXIS – INSTRUMENTS · DESIGN

# ==========================================================

timbre_axis:

axis_id: "TIM"

description: "Instrument pool, synth design, register allocation, signature FX."

keys:

- key_id: "TIM.K1"

name: "Instrument_Palette"

level: "macro"

subkeys:

- subkey_id: "TIM.K1.S1"

name: "Core_Instruments{n}"

type: "list<label>"

example_value: ["banjo_loop", "pedal_steel", "organ", "808", "trap_kit"]

- subkey_id: "TIM.K1.S2"

name: "Role_By_Instrument{n}"

type: "map<instrument→role>"

example_value: {"banjo_loop": "rhythmic_ostinato", "pedal_steel": "emotional_swells"}

- subkey_id: "TIM.K1.S3"

name: "Texture_Mode"

type: "enum"

values: ["dry", "medium_space", "washed"]

example_value: "medium_space"

- subkey_id: "TIM.K1.S4"

name: "Analog_vs_Digital_Ratio"

type: "ratio"

example_value: {"analog_feel": 0.7, "digital_clean": 0.3}

- subkey_id: "TIM.K1.S5"

name: "Noise_Sources{n}"

type: "list<label>"

example_value: ["vinyl_crackle", "crowd_chants", "room_tone"]

- key_id: "TIM.K2"

name: "Register_Separation"

level: "macro"

subkeys:

- subkey_id: "TIM.K2.S1"

name: "Sub_Register_Content"

type: "descriptor"

example_value: "808 + occasional impact booms only"

- subkey_id: "TIM.K2.S2"

name: "Low_Mids_Content"

type: "descriptor"

example_value: "rhythm guitars, organ body, low choir"

- subkey_id: "TIM.K2.S3"

name: "High_Mids_Content"

type: "descriptor"

example_value: "lead vocal presence, lead guitar, synth stabs"

- subkey_id: "TIM.K2.S4"

name: "Air_Band_Content"

type: "descriptor"

example_value: "hats, shakers, handclaps, reverb tails"

- subkey_id: "TIM.K2.S5"

name: "Clash_Avoidance_Policy"

type: "rule_text"

example_value: "never layer 808 fundamental with pedal-steel low notes in same octave"

- key_id: "TIM.K3"

name: "Signature_Sounds"

level: "meso"

subkeys:

- subkey_id: "TIM.K3.S1"

name: "Signature_Motif_Instrument"

type: "label"

example_value: "banjo_loop"

- subkey_id: "TIM.K3.S2"

name: "Hook_Signature_FX{n}"

type: "list<label>"

example_value: ["gospel_handclap_swells", "DJ_rewind"]

- subkey_id: "TIM.K3.S3"

name: "Intro_Signature"

type: "label"

example_value: "vinyl_crackle + organ"

- subkey_id: "TIM.K3.S4"

name: "Outro_Signature"

type: "label"

example_value: "pedal_steel_fade + crowd_murmur"
- subkey_id: "TIM.K3.S5"

name: "Forbidden_Timbres{n}"

type: "list<label>"

example_value: ["EDM_risers", "supersaw_leads"]

- key_id: "TIM.K4"

name: "Sectional_Timbre_Overrides"

level: "meso"

subkeys:

- subkey_id: "TIM.K4.S1"

name: "Intro_Palette_Override{n}"

type: "list<instrument>"

- subkey_id: "TIM.K4.S2"

name: "Verse_Palette_Override{n}"

type: "list<instrument>"

- subkey_id: "TIM.K4.S3"

name: "Hook_Palette_Override{n}"

type: "list<instrument>"

- subkey_id: "TIM.K4.S4"

name: "Bridge_Palette_Override{n}"

type: "list<instrument>"

- subkey_id: "TIM.K4.S5"

name: "Breakdown_Palette_Override{n}"

type: "list<instrument>"

# ==========================================================

# 5. PERFORMANCE AXIS – GROOVE · DYNAMICS

# ==========================================================

performance_axis:

axis_id: "PER"

description: "Groove, dynamics, microtiming, humanization."

keys:

- key_id: "PER.K1"

name: "Groove_Profile"

level: "macro"

subkeys:

- subkey_id: "PER.K1.S1"

name: "Kick_Behavior"

type: "descriptor"

example_value: "syncopated around vocal phrases, anchors on 1 and 3"

- subkey_id: "PER.K1.S2"

name: "Snare_Clap_Behavior"

type: "descriptor"

example_value: "strong backbeat on 2 and 4, ghost hits sparingly"

- subkey_id: "PER.K1.S3"

name: "HiHat_Grid"

type: "descriptor"

example_value: "16th base with triplet flurries"

- subkey_id: "PER.K1.S4"

name: "Bass_Relation_to_Kick"

type: "descriptor"

example_value: "808 reinforces key kicks and occasionally anticipates them"

- subkey_id: "PER.K1.S5"

name: "Push_Pull_Profile"

type: "enum"

values: ["ahead", "center", "behind"]

example_value: "slightly_behind"

- key_id: "PER.K2"

name: "Dynamics"

level: "macro"

subkeys:

- subkey_id: "PER.K2.S1"

name: "Sectional_Dynamic_Map{n}"

type: "map<section→scale_0_1>"

- subkey_id: "PER.K2.S2"

name: "Fill_Frequency"

type: "enum"

values: ["rare", "moderate", "very_often"]

- subkey_id: "PER.K2.S3"

name: "Drum_Fill_Length_Options{n}"

type: "list<beat_or_bar_span>"

- subkey_id: "PER.K2.S4"

name: "Breakdown_Strategy"

type: "descriptor"

- subkey_id: "PER.K2.S5"

name: "Climax_Location"

type: "section_label"

- key_id: "PER.K3"

name: "Humanization"

level: "micro"

subkeys:

- subkey_id: "PER.K3.S1"

name: "Timing_Variation_Range"

type: "ms_range"

- subkey_id: "PER.K3.S2"

name: "Velocity_Variation_Range"

type: "scale_0_1"

- subkey_id: "PER.K3.S3"

name: "Humanized_Elements{n}"

type: "list<label>"

- subkey_id: "PER.K3.S4"

name: "Quantize_Strictness_By_Layer{n}"

type: "map<layer→scale_0_1>"

- subkey_id: "PER.K3.S5"

name: "Swing_Source"

type: "label"

- key_id: "PER.K4"

name: "Performance_Cues"

level: "micro"

subkeys:

- subkey_id: "PER.K4.S1"

name: "Drop_Cues{n}"

type: "list<section_bar>"

- subkey_id: "PER.K4.S2"

name: "Build_Cues{n}"

type: "list<section_bar>"

- subkey_id: "PER.K4.S3"

name: "Stop_Time_Cues{n}"

type: "list<section_bar>"

- subkey_id: "PER.K4.S4"

name: "Crowd_Interaction_Cues{n}"

type: "list<section_bar>"

- subkey_id: "PER.K4.S5"

name: "DJ_Cue_Tags{n}"

type: "list<label>"

# ==========================================================

# 6. POST-PRODUCTION AXIS – MIX · MASTER

# ==========================================================

post_production_axis:

axis_id: "POST"

description: "Mix priority, space, loudness, tone."

keys:

- key_id: "POST.K1"

name: "Mix_Priority"

level: "macro"

subkeys:

- subkey_id: "POST.K1.S1"

name: "Priority_Order{n}"

type: "ordered_list<bus>"

- subkey_id: "POST.K1.S2"

name: "Vocal_Position"

type: "descriptor"

- subkey_id: "POST.K1.S3"

name: "Low_End_Policy"

type: "descriptor"

- subkey_id: "POST.K1.S4"

name: "Mid_Clarity_Rules{n}"

type: "list<rule>"

- subkey_id: "POST.K1.S5"

name: "Top_End_Treatment"

type: "descriptor"

- key_id: "POST.K2"

name: "Space_and_Ambience"

level: "macro"

subkeys:

- subkey_id: "POST.K2.S1"

name: "Reverb_Types{n}"

type: "list<label>"

- subkey_id: "POST.K2.S2"

name: "Delay_Types{n}"

type: "list<label>"

- subkey_id: "POST.K2.S3"

name: "Dry_Wet_Policy_By_Layer{n}"

type: "map<layer→scale_0_1>"

- subkey_id: "POST.K2.S4"

name: "Space_Identity"

type: "descriptor"

- subkey_id: "POST.K2.S5"

name: "Section_Space_Overrides{n}"

type: "map<section→descriptor>"

- key_id: "POST.K3"

name: "Loudness_and_Tone"

level: "macro"

subkeys:

- subkey_id: "POST.K3.S1"

name: "Target_LUFS"

type: "float"

- subkey_id: "POST.K3.S2"

name: "Reference_Profile"

type: "label"

- subkey_id: "POST.K3.S3"

name: "Saturation_Level"

type: "scale_0_1"

- subkey_id: "POST.K3.S4"

name: "Stereo_Width_Policy"

type: "descriptor"

- subkey_id: "POST.K3.S5"

name: "Limiter_Behavior"

type: "descriptor"

- key_id: "POST.K4"

name: "Translation_Checks"

level: "macro"

subkeys:

- subkey_id: "POST.K4.S1"

name: "Target_Systems{n}"

type: "list<label>"

- subkey_id: "POST.K4.S2"

name: "Low_Volume_Check"

type: "bool"

- subkey_id: "POST.K4.S3"

name: "Mono_Compat_Priority"

type: "enum"

- subkey_id: "POST.K4.S4"

name: "Club_Impact_Priority"

type: "scale_0_1"

- subkey_id: "POST.K4.S5"

name: "Headphone_Immersion_Priority"

type: "scale_0_1"

# ==========================================================

# 7. ROAD MAP AXIS – STRUCTURE · BARS

# ==========================================================

road_map_axis:

axis_id: "PER"  # EXECUTION EXTENSION (migrated from retired MAP axis per M13)

description: "Performance.execution: section order, transitions, per-section overrides (structure-reservation migrated from Roadmap; display timing lives in LYR section headers)."

keys:

- key_id: "PER.K5"

name: "Section_List"

level: "macro"

subkeys:

- subkey_id: "PER.K5.S1"

name: "Sections{n}"

type: "ordered_list<section_label>"

- subkey_id: "PER.K5.S2"

name: "Bar_Count_By_Section{n}"

type: "map<section→bars>"

- subkey_id: "PER.K5.S3"

name: "Function_By_Section{n}"

type: "map<section→function_label>"

- subkey_id: "PER.K5.S4"

name: "Focus_By_Section{n}"

type: "map<section→focus_label>"

- subkey_id: "PER.K5.S5"

name: "Double_Time_or_Half_Time_By_Section{n}"

type: "map<section→enum>"

- key_id: "PER.K6"

name: "Transition_Logic"

level: "meso"

subkeys:

- subkey_id: "PER.K6.S1"

name: "Into_Cues{n}"

type: "map<section→descriptor>"

- subkey_id: "PER.K6.S2"

name: "Out_Of_Cues{n}"

type: "map<section→descriptor>"

- subkey_id: "PER.K6.S3"

name: "Energy_Jumps{n}"

type: "map<section_pair→descriptor>"

- subkey_id: "PER.K6.S4"

name: "FX_At_Transitions{n}"

type: "map<section_pair→list<label>>"

- subkey_id: "PER.K6.S5"

name: "Silence_or_Pause_Slots{n}"

type: "list<section_bar_range>"

- key_id: "PER.K7"

name: "Axis_Overrides"

level: "meso"

subkeys:

- subkey_id: "PER.K7.S1"

name: "Theory_Overrides{n}"

type: "map<section→list<THY_subkey_id>>"

- subkey_id: "PER.K7.S2"

name: "Vocals_Overrides{n}"

type: "map<section→list<VOC_subkey_id>>"

- subkey_id: "PER.K7.S3"

name: "Timbre_Overrides{n}"

type: "map<section→list<TIM_subkey_id>>"

- subkey_id: "PER.K7.S4"

name: "Performance_Overrides{n}"

type: "map<section→list<PER_subkey_id>>"

- subkey_id: "PER.K7.S5"

name: "Post_Overrides{n}"

type: "map<section→list<POST_subkey_id>>"

- key_id: "PER.K8"

name: "Live_Arranger_Notes"

level: "meso"

subkeys:

- subkey_id: "PER.K8.S1"

name: "Optional_Loops{n}"

type: "list<section_label>"

- subkey_id: "PER.K8.S2"

name: "Optional_Cuts{n}"

type: "list<section_label>"

- subkey_id: "PER.K8.S3"

name: "Extended_Outros{n}"

type: "list<section_label>"

- subkey_id: "PER.K8.S4"

name: "DJ_Friendly_In_Out{n}"

type: "list<section_label>"

- subkey_id: "PER.K8.S5"

name: "Alternate_Versions{n}"

type: "list<descriptor>"

# ==========================================================

# 8. LYRICS BLOCK AXIS – LINE/WORD ATOMIC LAYER

# ==========================================================

lyrics_block_axis:

axis_id: "LYR"

description: "Locked lyric text with macro, micro, and atomic controls."

keys:

# ----------- LYR.K1 – GLOBAL LYRIC POLICY -----------------

- key_id: "LYR.K1"

name: "Global_Lyric_Policy"

level: "macro"

subkeys:

- subkey_id: "LYR.K1.S1"

name: "Point_of_View"

type: "enum"

values: ["1st", "2nd", "3rd", "shifting"]

- subkey_id: "LYR.K1.S2"

name: "Tense"

type: "enum"

values: ["past", "present", "future", "braided"]

- subkey_id: "LYR.K1.S3"

name: "Core_Themes{n}"

type: "list<label>"

- subkey_id: "LYR.K1.S4"

name: "Profanity_Policy"

type: "enum"

values: ["none", "limited", "free"]

- subkey_id: "LYR.K1.S5"

name: "Imagery_Register"

type: "enum"

values: ["concrete", "mixed", "abstract"]

# ----------- LYR.K2 – SECTION LYRIC GRIDS -----------------

- key_id: "LYR.K2"

name: "Section_Lyric_Grids"

level: "meso"

subkeys:

- subkey_id: "LYR.K2.S1"

name: "Lines_Per_Section{n}"

type: "map<section→line_count>"

- subkey_id: "LYR.K2.S2"

name: "Bars_Per_Line{n}"

type: "map<section→bars_per_line>"

- subkey_id: "LYR.K2.S3"

name: "Rhyme_Scheme_By_Section{n}"

type: "map<section→pattern>"

- subkey_id: "LYR.K2.S4"

name: "Anchor_Lines{n}"

type: "list<line_label>"

- subkey_id: "LYR.K2.S5"

name: "Hook_Tag_Lines{n}"

type: "list<line_label>"

# ----------- LYR.K3 – LINE-LEVEL METADATA -----------------

- key_id: "LYR.K3"

name: "Line_Level_Metadata"

level: "micro"

subkeys:

- subkey_id: "LYR.K3.S1"

name: "Syllable_Count_By_Line{n}"

type: "map<line_label→int>"

- subkey_id: "LYR.K3.S2"

name: "Stress_Pattern_By_Line{n}"

type: "map<line_label→pattern>"

- subkey_id: "LYR.K3.S3"

name: "Rhyme_Class_By_Line{n}"

type: "map<line_label→class_id>"

- subkey_id: "LYR.K3.S4"

name: "Motif_Tag_By_Line{n}"

type: "map<line_label→motif_label>"

- subkey_id: "LYR.K3.S5"

name: "Emotional_Beat_By_Line{n}"

type: "map<line_label→emotion_label>"

# ----------- LYR.K4 – WORD/ATOM-LEVEL METADATA ------------

- key_id: "LYR.K4"

name: "Word_Level_Metadata"

level: "atomic"

subkeys:

- subkey_id: "LYR.K4.S1"

name: "Emphasis_Flags_By_Word{n}"

type: "map<word_label→bool>"

- subkey_id: "LYR.K4.S2"

name: "Melisma_Flags_By_Word{n}"

type: "map<word_label→bool>"

- subkey_id: "LYR.K4.S3"

name: "Pitch_Target_Hints_By_Word{n}"

type: "map<word_label→scale_degree>"

- subkey_id: "LYR.K4.S4"

name: "Timing_Offset_Hints_By_Word{n}"

type: "map<word_label→subdivision_offset>"

- subkey_id: "LYR.K4.S5"

name: "FX_Binding_By_Word{n}"

type: "map<word_label→fx_macro_label>"

# ----------- LYR.K5 – LOCK & VALIDATION -------------------

- key_id: "LYR.K5"

name: "Lock_and_Validation"

level: "macro"

subkeys:

- subkey_id: "LYR.K5.S1"

name: "Lock_Flag"

type: "bool"

- subkey_id: "LYR.K5.S2"

name: "Allowed_Operations{n}"

type: "list<label>" # e.g. "line_reordering", "section_muting" (not rewriting)

- subkey_id: "LYR.K5.S3"

name: "Forbidden_Operations{n}"

type: "list<label>" # e.g. "paraphrase", "synonym_substitution"

- subkey_id: "LYR.K5.S4"

name: "Validation_Rules{n}"

type: "list<rule>"

- subkey_id: "LYR.K5.S5"

name: "Violation_Severity_Map{n}"

type: "map<rule→severity_0_1>"

# ============================================================

# END TECHNICAL.UST CANON SKELETON

# ============================================================