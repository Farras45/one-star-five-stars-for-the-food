import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-star alien review of Earth that still admits the food was excellent.
// Three beats, each carrying a concrete specific:
//   1. the grievance — humans charge for air (an alien's bafflement);
//   2. the escalation — nine hours breathing their traffic;
//   3. the punch — the dumplings justify the invasion (food wins the last beat).
const BEATS: string[] = [
  "One star: the humans made me pay for air",
  "breathe their traffic for nine hours",
  "and then served me dumplings worth the invasion.",
];

// One sentence: exactly one full stop, at the end. Joining the beats with
// commas keeps the whole review a single sentence.
const LINE = BEATS.join(", ");

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim() !== text) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const stops = text.split("").filter((ch) => ch === ".").length;
  if (stops !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
  if (!/one star/i.test(text) || !/dumplings/i.test(text)) {
    throw new Error("entry must hold both the one star and the food");
  }
}

validateEntry(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
