// Makes the colour logo background transparent (white -> alpha) and trims it.
// Source: public/brand/scnz-logo-colour.png (dark/coloured bars on white, no alpha)
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = path.join(root, "public/brand/scnz-logo-colour.png");

const { width, height } = await sharp(src).metadata();
const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  const r = data[i * info.channels];
  const g = data[i * info.channels + 1];
  const b = data[i * info.channels + 2];
  out[i * 4] = r;
  out[i * 4 + 1] = g;
  out[i * 4 + 2] = b;
  // alpha: dark pixels opaque, white pixels transparent
  const whiteness = Math.min(r, g, b); // 255 for pure white, low for dark bars
  out[i * 4 + 3] = 255 - whiteness;
}

const trimmed = await sharp(out, { raw: { width, height, channels: 4 } })
  .trim({ threshold: 12 })
  .png()
  .toFile(path.join(root, "public/brand/scnz-logo-colour-trans.png"));

console.log(`scnz-logo-colour-trans.png: ${trimmed.width}x${trimmed.height} (from ${width}x${height})`);
