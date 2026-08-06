import sharp from 'sharp';

const src = 'C:/Users/Lazarna/Desktop/КРИЛЕЯ/КРИЛЕЯ.png';
const out =
  'C:/Users/Lazarna/AppData/Local/Temp/claude/C--Users-Lazarna-Desktop/cd99d328-ad33-4ee3-b97e-c076fe65bbbd/scratchpad';

const centers = [523, 580, 637, 697, 765];
const names = ['natural', 'chisto', 'harmonia', 'avtentichnost', 'ustoichivost'];

for (let i = 0; i < centers.length; i++) {
  const left = centers[i] - 40;
  await sharp(src)
    .extract({ left, top: 213, width: 80, height: 88 })
    .png()
    .toFile(`${out}/v2_icon_${names[i]}.png`);
}
console.log('done');
