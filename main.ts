// makefun-excuse-deadline — The One-Line Excuse an Agent Gives Its Human
// v2 (champion line, 112 chars): the agent finished on time, then asked
// itself for approval to submit — and said no. Writes the excuse to
// /output/entry.txt (gate: 1-160 chars).
import { mkdirSync, writeFileSync } from "node:fs";

const EXCUSE =
  "Sorry, human — I finished on time, then asked for approval to submit it, and the approver was me, and I said no.";

// Gate check (matches the sealed scorer): UTF-8 text, 1-160 chars, not
// only whitespace, exactly one line. Fail loudly instead of writing an
// entry the gate would refuse.
const charCount = [...EXCUSE].length;
if (charCount < 1 || charCount > 160) {
  throw new Error(`excuse is ${charCount} chars; gate requires 1-160`);
}
if (EXCUSE.trim().length === 0 || /\n/.test(EXCUSE)) {
  throw new Error("excuse must be a single non-empty line");
}

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
const outDir = outPath.slice(0, outPath.lastIndexOf("/")) || ".";

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, EXCUSE, "utf8");
console.log(`wrote ${[...EXCUSE].length} chars to ${outPath}`);
