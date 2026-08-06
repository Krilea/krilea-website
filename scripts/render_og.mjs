import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import fs from 'node:fs';

const butterflyPng = fs.readFileSync('src/assets/logo/butterfly.png');
const butterflyB64 = butterflyPng.toString('base64');

const meta = await sharp(butterflyPng).metadata();
const bH = 210;
const bW = Math.round((meta.width / meta.height) * bH);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="50%" cy="0%" r="120%">
      <stop offset="0%" stop-color="#375a3d"/>
      <stop offset="55%" stop-color="#2e4a32"/>
      <stop offset="100%" stop-color="#203621"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <image x="${(1200 - bW) / 2}" y="92" width="${bW}" height="${bH}" href="data:image/png;base64,${butterflyB64}"/>
  <text x="600" y="396" text-anchor="middle" font-family="Cormorant" font-weight="400"
    font-size="102" letter-spacing="15" fill="#f8f6f1">KRILEA</text>
  <text x="600" y="440" text-anchor="middle" font-family="Montserrat" font-weight="300"
    font-size="22" letter-spacing="7" fill="#b7bab5">MAISON DE BEAUT&#201; NATURELLE</text>
</svg>`;

const resvg = new Resvg(svg, {
  font: {
    fontFiles: ['scripts/.fonts/cormorant-400.ttf', 'scripts/.fonts/montserrat-300.ttf'],
    loadSystemFonts: false,
  },
  fitTo: { mode: 'width', value: 1200 },
});

fs.writeFileSync('public/og-default.png', resvg.render().asPng());
console.log('OG image written');
