import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {TECHNICAL_REGISTRY} from '../lib/technical-registry.js';

test('checked-in Technical UST canon and generated registry stay aligned',()=>{const s=fs.readFileSync(new URL('../contracts/01_TECHNICAL_UST_CANON.md',import.meta.url),'utf8');const ids=[...s.matchAll(/subkey_id: "([A-Z]+\.K\d+\.S\d+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,165);assert.deepEqual(new Set(ids),new Set(TECHNICAL_REGISTRY.map(x=>x.id)))});
test('checked-in Creative UST canon is current v5-c shell, not legacy shell',()=>{const s=fs.readFileSync(new URL('../contracts/03_CREATIVE_UST_CANONICAL.md',import.meta.url),'utf8');for(const h of ['[Theory]','[Voices]','[Style]','[Timbre]','[Performance]','[Post-Production]','▸ LYRICS BLOCK'])assert.ok(s.includes(h));assert.match(s,/Forbidden legacy constructs/);assert.match(s,/\[CREW_TAGS\]/);assert.match(s,/\[Road-Map\]/)});
test('ordinary UI is one-click generation with no plan JSON or client API key field',()=>{const s=fs.readFileSync(new URL('../pages/index.js',import.meta.url),'utf8');assert.match(s,/\/api\/generate/);assert.match(s,/Generate Suno prompts/);assert.equal(s.includes('Plan JSON'),false);assert.equal(s.includes('Cues JSON'),false);assert.equal(s.includes('OPENAI_API_KEY'),false)});
