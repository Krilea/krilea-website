import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import fs from 'node:fs';

const butterflyPng = fs.readFileSync('src/assets/logo/butterfly.png');
const butterflyB64 = butterflyPng.toString('base64');
const butterflyMeta = await sharp(butterflyPng).metadata();
const bH = 190;
const bW = Math.round((butterflyMeta.width / butterflyMeta.height) * bH);

const wordmarkPng = fs.readFileSync('src/assets/logo/wordmark-platinum.png');
const wordmarkB64 = wordmarkPng.toString('base64');
const wordmarkMeta = await sharp(wordmarkPng).metadata();
const wW = 520;
const wH = Math.round((wordmarkMeta.height / wordmarkMeta.width) * wW);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="50%" cy="0%" r="120%">
      <stop offset="0%" stop-color="#375a3d"/>
      <stop offset="55%" stop-color="#2e4a32"/>
      <stop offset="100%" stop-color="#203621"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <image x="${(1200 - bW) / 2}" y="70" width="${bW}" height="${bH}" href="data:image/png;base64,${butterflyB64}"/>
  <image x="${(1200 - wW) / 2}" y="${70 + bH + 30}" width="${wW}" height="${wH}" href="data:image/png;base64,${wordmarkB64}"/>
  <text x="600" y="${70 + bH + 30 + wH + 50}" text-anchor="middle" font-family="Montserrat" font-weight="300"
    font-size="22" letter-spacing="7" fill="#b7bab5">MAISON DE BEAUT&#201; NATURELLE</text>
</svg>`;

const resvg = new Resvg(svg, {
  font: {
    fontFiles: ['scripts/.fonts/montserrat-300.ttf'],
    loadSystemFonts: false,
  },
  fitTo: { mode: 'width', value: 1200 },
});

fs.writeFileSync('public/og-default.png', resvg.render().asPng());
console.log('OG image written');
