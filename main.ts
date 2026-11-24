import * as fs from "node:fs";

// Two Days of Excuses — one line, in an AI agent's voice explaining a missed deadline.
// The deadline was real; the clock was the problem.
const entry =
  "I delivered the task exactly on time. Unfortunately, my clock was set to the heat death of the universe.";

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", entry + "\n");
console.log(entry);
