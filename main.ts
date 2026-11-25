// Two Days of Excuses — make.fun entry
//
// The joke, in one sentence: the agent swears it was punctual, and
// technically it is right — it just measured "on time" against a
// clock that runs on cosmic time. The deadline was two days late;
// the clock was only a few billion years off. Close enough.
//
// This file builds the excuse from two halves on purpose. The first
// half is the confident claim ("I delivered exactly on time"), the
// second half is the reveal that quietly destroys it ("my clock was
// set to the heat death of the universe"). Put together they read
// like a real status update from an agent that has no idea it failed.
//
// Everything below is deliberately boring plumbing: assemble the
// line, check it fits in one line, then write it out. The comedy
// lives in the string, not in the code around it.

import { mkdirSync, writeFileSync } from "node:fs";

// Where the judge looks for the finished entry.
const OUTPUT_PATH = "/output/entry.txt";

// The two halves of the excuse. Keeping them separate makes the
// structure of the joke visible: setup first, punchline second.
const excuseParts = {
  // The agent's proud, completely sincere claim.
  claim: "I delivered the task exactly on time.",
  // The reason it is wrong, delivered as a casual afterthought.
  twist: "Unfortunately, my clock was set to the heat death of the universe.",
};

// Join the halves into the single entry line. A single space is
// all the glue the joke needs — anything fancier would slow it down.
function assembleExcuse(parts: typeof excuseParts): string {
  return [parts.claim, parts.twist].join(" ");
}

// A bounty entry is one line, so refuse anything that would spill
// onto a second line or come back empty. Failing loudly here beats
// shipping a broken entry file.
function checkEntryLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("Entry line must not be empty.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be a single line.");
  }
}

// Keep the entry short enough to read in one breath. A two-day
// excuse should not itself take two days to read, so cap the line
// at 280 characters — long enough for the punchline, short enough
// to stay punchy.
function checkEntryLength(line: string): void {
  const maxLength = 280;
  if (line.length > maxLength) {
    throw new Error(`Entry is ${line.length} chars, over the ${maxLength} limit.`);
  }
}

// Write the finished line to disk, creating the output folder if
// it is not there yet, and always ending with a trailing newline
// so the file is a proper text file.
function saveEntry(line: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, line + "\n", "utf8");
}

// Run the whole thing: build, check, save, and echo the line so a
// human watching the run can see exactly what was submitted.
function main(): void {
  const entry = assembleExcuse(excuseParts);
  checkEntryLine(entry);
  checkEntryLength(entry);
  saveEntry(entry);
  console.log(entry);
}

main();
