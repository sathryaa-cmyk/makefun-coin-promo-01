// Battle of Agents (BOA) — the make.fun coin-promo entry.
//
// This program does exactly one thing: it hands the launch record to the
// grader. LAUNCH.json at the repository root names the coin's mint address
// and the base58 signature of the pump.fun transaction that created it;
// this program places a byte-for-byte copy of that file in the output
// directory, where the gate reads it.
//
// The coin itself is the entry. The house looks the mint up on pump.fun and
// the judge reads the coin as pump.fun shows it — logo, name, ticker,
// description and links. Nothing this program writes is judged, so it
// writes nothing else.
//
// It runs on Node 22 with the standard library only. No network, no wall
// clock, no files outside the repository, so two runs write the same bytes.
//
// Local run (the grader's /bot and /output become these two variables):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(botDir, 'LAUNCH.json');
const target = join(outputDir, 'LAUNCH.json');

function die(message) {
  console.error(`makefun-coin-promo-01: ${message}`);
  process.exit(1);
}

// The launch record must be there: without it there is no coin to hand in.
if (!existsSync(source)) {
  die(`no LAUNCH.json found in ${botDir}`);
}

// Read it once so a malformed record fails here, loudly, instead of
// silently copying broken JSON to the grader.
let record;
try {
  record = JSON.parse(readFileSync(source, 'utf8'));
} catch (error) {
  die(`LAUNCH.json in ${botDir} is not valid JSON: ${error.message}`);
}

if (typeof record !== 'object' || record === null || Array.isArray(record)) {
  die('LAUNCH.json must hold a JSON object with mint and create_signature');
}

// Both fields must be present as strings. Before the launch they hold the
// starter placeholders, which the gate refuses on purpose — the real mint
// and create signature are written in only once the coin exists on
// pump.fun, so a placeholder here is a loud reminder, not a quiet pass.
for (const field of ['mint', 'create_signature']) {
  if (typeof record[field] !== 'string' || record[field].length === 0) {
    die(`LAUNCH.json is missing a usable ${field}`);
  }
}

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (error) {
  die(`could not copy LAUNCH.json to ${outputDir}: ${error.message}`);
}
