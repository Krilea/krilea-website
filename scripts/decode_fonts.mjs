import { decompress } from 'wawoff2';
import fs from 'node:fs';

const files = [
  ['node_modules/@fontsource/cormorant/files/cormorant-latin-600-normal.woff2', 'scripts/.fonts/cormorant-600.ttf'],
  ['node_modules/@fontsource/cormorant/files/cormorant-latin-500-normal.woff2', 'scripts/.fonts/cormorant-500.ttf'],
  ['node_modules/@fontsource/cormorant/files/cormorant-latin-400-normal.woff2', 'scripts/.fonts/cormorant-400.ttf'],
  ['node_modules/@fontsource/montserrat/files/montserrat-latin-300-normal.woff2', 'scripts/.fonts/montserrat-300.ttf'],
  ['node_modules/@fontsource/montserrat/files/montserrat-latin-500-normal.woff2', 'scripts/.fonts/montserrat-500.ttf'],
];

fs.mkdirSync('scripts/.fonts', { recursive: true });

for (const [src, dest] of files) {
  const woff2 = fs.readFileSync(src);
  const ttf = await decompress(woff2);
  fs.writeFileSync(dest, Buffer.from(ttf));
  console.log('decoded', dest, ttf.byteLength, 'bytes');
}
