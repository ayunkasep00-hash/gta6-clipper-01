import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Entry program for the gta6-clipper-01 bounty.
// The entry is a YouTube video; this program only hands its address to the
// house by copying VIDEO.json from this repository to the output directory.
// v3 clip (38s vertical Short): official Rockstar Games GTA 6 Trailer 2 —
// robbery arc 74.5-99.5s + "Say Vice City, baby!" 123.5-128.5s; zero
// KreekCraft content (v1 unlock + v2 shark cuts used his Day 1 stream).
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
