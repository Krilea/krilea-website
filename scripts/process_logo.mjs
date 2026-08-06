import sharp from 'sharp';
import fs from 'node:fs';

const src = 'C:/Users/Lazarna/Desktop/КРИЛЕЯ/КРИЛЕЯ.png';
const outDir = 'C:/Users/Lazarna/Desktop/krilea-website/src/assets/logo';
const previewDir =
  'C:/Users/Lazarna/AppData/Local/Temp/claude/C--Users-Lazarna-Desktop/cd99d328-ad33-4ee3-b97e-c076fe65bbbd/scratchpad';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Rough crop around the largest, cleanest butterfly illustration on the brand board
const crop = { left: 20, top: 0, width: 450, height: 255 };

const { data, info } = await sharp(src)
  .extract(crop)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

// Sample background color from the four corners (paper/cream tone)
function sampleAt(x, y) {
  const i = (y * width + x) * channels;
  return [data[i], data[i + 1], data[i + 2]];
}
const corners = [sampleAt(2, 2), sampleAt(width - 3, 2), sampleAt(2, height - 3), sampleAt(width - 3, height - 3)];
const bg = corners.reduce(
  (acc, c) => [acc[0] + c[0] / 4, acc[1] + c[1] / 4, acc[2] + c[2] / 4],
  [0, 0, 0],
);

const threshold = 34; // below this distance from bg -> fully transparent
const softness = 30; // feather range above threshold

for (let p = 0; p < width * height; p++) {
  const i = p * channels;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const dist = Math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2);
  let alpha;
  if (dist <= threshold) {
    alpha = 0;
  } else if (dist >= threshold + softness) {
    alpha = 255;
  } else {
    alpha = Math.round(((dist - threshold) / softness) * 255);
  }
  data[i + 3] = alpha;
}

const keyed = sharp(data, { raw: { width, height, channels } });

// Trim fully-transparent borders tightly, then export
const trimmed = await keyed.png().trim({ threshold: 5 }).toBuffer();

await sharp(trimmed).toFile(`${outDir}/butterfly.png`);
await sharp(trimmed).resize({ width: 500 }).toFile(`${previewDir}/butterfly_preview.png`);

const finalMeta = await sharp(trimmed).metadata();
console.log('final size', finalMeta.width, finalMeta.height);
