import sharp from 'sharp';
import fs from 'node:fs';

const scratch =
  'C:/Users/Lazarna/AppData/Local/Temp/claude/C--Users-Lazarna-Desktop/cd99d328-ad33-4ee3-b97e-c076fe65bbbd/scratchpad';
const outDir = 'src/assets/icons';
fs.mkdirSync(outDir, { recursive: true });

async function keyAndTrim(inputPath, outputPath, threshold = 34, softness = 30) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  function sampleAt(x, y) {
    const i = (y * width + x) * channels;
    return [data[i], data[i + 1], data[i + 2]];
  }
  const corners = [sampleAt(1, 1), sampleAt(width - 2, 1), sampleAt(1, height - 2), sampleAt(width - 2, height - 2)];
  const bg = corners.reduce((acc, c) => [acc[0] + c[0] / 4, acc[1] + c[1] / 4, acc[2] + c[2] / 4], [0, 0, 0]);

  for (let p = 0; p < width * height; p++) {
    const i = p * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const dist = Math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2);
    let alpha;
    if (dist <= threshold) alpha = 0;
    else if (dist >= threshold + softness) alpha = 255;
    else alpha = Math.round(((dist - threshold) / softness) * 255);
    data[i + 3] = alpha;
  }

  const trimmed = await sharp(data, { raw: { width, height, channels } })
    .png()
    .trim({ threshold: 5 })
    .toBuffer();
  await sharp(trimmed).toFile(outputPath);
  const meta = await sharp(trimmed).metadata();
  console.log(outputPath, meta.width, meta.height);
}

const icons = ['natural', 'chisto', 'harmonia', 'avtentichnost', 'ustoichivost'];
for (const name of icons) {
  await keyAndTrim(`${scratch}/v2_icon_${name}.png`, `${outDir}/value-${name}.png`);
}
await keyAndTrim(`${scratch}/ornament_strip2.png`, `${outDir}/ornament.png`, 30, 26);
