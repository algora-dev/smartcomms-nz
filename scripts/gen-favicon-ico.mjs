// Packs PNG frames into a .ico (Vista+ PNG-compressed entries) — browsers accept these.
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = path.join(root, "src/app/icon.png");
const sizes = [48, 32, 16];

const frames = await Promise.all(
  sizes.map(async (s) => {
    const png = await sharp(src).resize(s, s).png().toBuffer();
    return { s, png };
  })
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(frames.length, 4);

const entries = [];
let offset = 6 + frames.length * 16;
for (const { s, png } of frames) {
  const e = Buffer.alloc(16);
  e.writeUInt8(s === 256 ? 0 : s, 0);
  e.writeUInt8(s === 256 ? 0 : s, 1);
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // planes
  e.writeUInt16LE(32, 6); // bpp
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
  entries.push(e);
}

const ico = Buffer.concat([header, ...entries, ...frames.map((f) => f.png)]);
const out = path.join(root, "src/app/favicon.ico");
await sharp(ico); // validate it's a buffer (no-op), then write
const fs = await import("node:fs/promises");
await fs.writeFile(out, ico);
console.log(`favicon.ico written: ${ico.length} bytes (${sizes.join("/")})`);
