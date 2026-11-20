import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// Entry: a 38-second vertical Short cut from Rockstar's official GTA 6
// Trailer 2 (robbery arc 74.5-99.5s + "Say Vice City, baby!" 123.5-128.5s).
// Zero KreekCraft content.
const here: string = path.dirname(fileURLToPath(import.meta.url));
const videoPath: string = path.join(here, "VIDEO.json");
const raw: string = fs.readFileSync(videoPath, "utf8");
const data: { url?: unknown } = JSON.parse(raw);
const url: unknown = data.url;

if (typeof url !== "string" || !/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url)) {
  throw new Error("VIDEO.json url must be a YouTube address");
}

const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(videoPath, path.join(outDir, "VIDEO.json"));
console.log(`Wrote VIDEO.json to ${outDir} (${url})`);
