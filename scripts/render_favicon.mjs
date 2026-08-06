import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import fs from 'node:fs';

const fontFiles = ['scripts/.fonts/cormorant-600.ttf'];

function svgK({ bg, fg, size = 1024, scale = 0.7, dy = 0 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${bg}"/>
    <text x="50%" y="${50 + dy}%" text-anchor="middle" dominant-baseline="central"
      font-family="Cormorant" font-weight="600" font-size="${size * scale}" fill="${fg}">K</text>
  </svg>`;
}

function render(svg, outPath, width) {
  const resvg = new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Cormorant' },
    fitTo: { mode: 'width', value: width },
  });
  const png = resvg.render().asPng();
  fs.writeFileSync(outPath, png);
}

fs.mkdirSync('public', { recursive: true });

// Light (default) favicon — cream bg, forest K
render(svgK({ bg: '#f8f6f1', fg: '#2e4a32', scale: 0.74, dy: 1 }), 'scripts/.fonts/favicon-light-1024.png', 1024);
// Dark-mode favicon — forest bg, cream K
render(svgK({ bg: '#2e4a32', fg: '#f8f6f1', scale: 0.74, dy: 1 }), 'scripts/.fonts/favicon-dark-1024.png', 1024);
// Maskable icon — extra safe-zone padding (adaptive-icon masks crop ~20% radius from edges)
render(svgK({ bg: '#2e4a32', fg: '#f8f6f1', scale: 0.5, dy: 1 }), 'scripts/.fonts/icon-maskable-512.png', 512);

console.log('rendered favicon sources');
