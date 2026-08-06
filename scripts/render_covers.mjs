import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';

const fontFiles = ['scripts/.fonts/playfair-500.ttf', 'scripts/.fonts/montserrat-300.ttf'];

function render(svg, outPath, width) {
  const resvg = new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false },
    fitTo: { mode: 'width', value: width },
  });
  fs.writeFileSync(outPath, resvg.render().asPng());
  console.log('wrote', outPath);
}

// Cover 1 — "Защо косата изтънява и пада": dark, roots + falling motif
const cover1 = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="960" viewBox="0 0 1600 960">
  <defs>
    <radialGradient id="g1" cx="50%" cy="20%" r="100%">
      <stop offset="0%" stop-color="#3c5f41"/>
      <stop offset="60%" stop-color="#2e4a32"/>
      <stop offset="100%" stop-color="#1c2e1d"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="960" fill="url(#g1)"/>
  <g stroke="#a9c3ab" stroke-width="1.4" fill="none" opacity="0.75" stroke-linecap="round">
    <path d="M800 120 C 800 300, 800 300, 800 460"/>
    <path d="M800 220 C 740 200, 700 150, 660 160"/>
    <path d="M800 220 C 860 200, 900 150, 940 160"/>
    <path d="M800 300 C 730 290, 690 330, 650 320"/>
    <path d="M800 300 C 870 290, 910 330, 950 320"/>
    <path d="M800 460 C 700 500, 640 590, 560 650"/>
    <path d="M800 460 C 900 500, 960 590, 1040 650"/>
    <path d="M800 460 C 760 540, 740 640, 700 740"/>
    <path d="M800 460 C 840 540, 860 640, 900 740"/>
    <path d="M800 460 C 800 560, 800 660, 800 780"/>
  </g>
  <g fill="#c9dccb" opacity="0.55">
    <circle cx="1200" cy="230" r="3"/>
    <circle cx="1240" cy="270" r="2.2"/>
    <circle cx="1180" cy="300" r="2.6"/>
    <circle cx="380" cy="700" r="3"/>
    <circle cx="340" cy="740" r="2.2"/>
    <circle cx="420" cy="760" r="2.6"/>
  </g>
</svg>`;

// Cover 2 — "Как да четем съставките": light, herbarium-index feel
const cover2 = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="960" viewBox="0 0 1600 960">
  <rect width="1600" height="960" fill="#f2efe7"/>
  <g stroke="#5ebc4a" stroke-width="1.3" fill="none" opacity="0.8" stroke-linecap="round">
    <path d="M420 200 V 760"/>
    <path d="M420 260 C 360 240, 330 260, 300 230"/>
    <path d="M420 260 C 480 240, 510 260, 540 230"/>
    <path d="M420 380 C 360 360, 330 380, 300 350"/>
    <path d="M420 380 C 480 360, 510 380, 540 350"/>
    <path d="M420 500 C 360 480, 330 500, 300 470"/>
    <path d="M420 500 C 480 480, 510 500, 540 470"/>
    <path d="M420 620 C 360 600, 330 620, 300 590"/>
    <path d="M420 620 C 480 600, 510 620, 540 590"/>
  </g>
  <g stroke="#2e4a32" stroke-width="1" opacity="0.35">
    <line x1="900" y1="300" x2="1260" y2="300"/>
    <line x1="900" y1="360" x2="1220" y2="360"/>
    <line x1="900" y1="420" x2="1260" y2="420"/>
    <line x1="900" y1="480" x2="1180" y2="480"/>
    <line x1="900" y1="540" x2="1240" y2="540"/>
    <line x1="900" y1="600" x2="1200" y2="600"/>
  </g>
  <g fill="#5ebc4a" opacity="0.7">
    <circle cx="875" cy="300" r="4"/>
    <circle cx="875" cy="360" r="4"/>
    <circle cx="875" cy="420" r="4"/>
    <circle cx="875" cy="480" r="4"/>
    <circle cx="875" cy="540" r="4"/>
    <circle cx="875" cy="600" r="4"/>
  </g>
</svg>`;

render(cover1, 'scripts/.fonts/cover-kosopad.png', 1600);
render(cover2, 'scripts/.fonts/cover-sastavki.png', 1600);
