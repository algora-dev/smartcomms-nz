// Generates favicon assets: white SmartComms logo on a black rounded square.
// Source: public/brand/scnz-logo-mono.png (black bars on white)
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const mono = path.join(root, "public/brand/scnz-logo-mono.png");

// 1. Build a white logo with alpha from the mono mark (bars opaque, rest transparent)
// Manual raw RGBA build: negate makes bars white (alpha 255) and background black (alpha 0)
const { width, height } = await sharp(mono).metadata();
const luma = await sharp(mono).negate().grayscale().raw().toBuffer();
const rgba = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  rgba[i * 4] = 255;
  rgba[i * 4 + 1] = 255;
  rgba[i * 4 + 2] = 255;
  rgba[i * 4 + 3] = luma[i];
}
const logoBuf = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();

// 2. Trim to the tight mark
const trimmed = await sharp(logoBuf).trim({ threshold: 12 }).png().toBuffer();
const t = await sharp(trimmed).metadata();

// 3. Compose onto black rounded squares, logo at 88% of canvas (as large as possible)
async function make(size, out) {
  const radius = Math.round(size * 0.18); // rounded-corner square
  const inner = Math.round(size * 0.88);
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#0B0E14"/></svg>`
  );
  await sharp(bg)
    .composite([
      {
        input: await sharp(trimmed)
          .resize(inner, inner, { fit: "inside" })
          .png()
          .toBuffer(),
        gravity: "center",
      },
    ])
    .png()
    .toFile(path.join(root, "src/app", out));
  console.log(`${out}: ${size}x${size}, logo ${inner}px (src ${t.width}x${t.height})`);
}

await make(512, "icon.png");
await make(180, "apple-icon.png");
