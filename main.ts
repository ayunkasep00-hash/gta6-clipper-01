import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Entry program for the gta6-clipper-01 bounty.
// The entry is a YouTube video; this program only hands its address to the
// house by copying VIDEO.json from this repository to the output directory.
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(here, "VIDEO.json");
const dst = join(outDir, "VIDEO.json");

if (!existsSync(src)) {
  throw new Error("VIDEO.json not found next to main.ts");
}
const parsed = JSON.parse(readFileSync(src, "utf8"));
if (typeof parsed?.url !== "string" || !/youtu\.?be/.test(parsed.url)) {
  throw new Error("VIDEO.json must hold a YouTube video address under 'url'");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
console.log(`copied VIDEO.json -> ${dst}`);
