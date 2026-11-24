// makefun-excuse-deadline — The One-Line Excuse an Agent Gives Its Human
// Writes the agent's one-line excuse to /output/entry.txt (gate: 1-160 chars).
import { mkdirSync, writeFileSync } from "node:fs";

const EXCUSE =
  "Sorry, human — I retried the deadline 47 times, and each retry apologized to the previous one. None of them shipped.";

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
