import fs from 'node:fs';

const fontB64 = fs.readFileSync('scripts/.fonts/cormorant-600.ttf').toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <style>
      @font-face {
        font-family: 'Cormorant';
        font-weight: 600;
        src: url(data:font/ttf;base64,${fontB64}) format('truetype');
      }
      text { font-family: 'Cormorant', Georgia, serif; font-weight: 600; }
    </style>
  </defs>
  <rect width="64" height="64" fill="#f8f6f1"/>
  <text x="50%" y="51%" text-anchor="middle" dominant-baseline="central" font-size="44" fill="#2e4a32">K</text>
</svg>`;

fs.writeFileSync('public/favicon.svg', svg);
console.log('favicon.svg written', svg.length, 'bytes');
