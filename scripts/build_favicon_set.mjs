import sharp from 'sharp';
import fs from 'node:fs';

const fontsDir = 'scripts/.fonts';
const publicDir = 'public';

function buildIco(pngBuffers, sizes, outPath) {
  const n = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * n;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(n, 4); // count

  const dirEntries = [];
  for (let i = 0; i < n; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    dirEntries.push(entry);
    offset += buf.length;
  }

  fs.writeFileSync(outPath, Buffer.concat([header, ...dirEntries, ...pngBuffers]));
}

async function main() {
  const lightSrc = `${fontsDir}/favicon-light-1024.png`;
  const darkSrc = `${fontsDir}/favicon-dark-1024.png`;
  const maskableSrc = `${fontsDir}/icon-maskable-512.png`;

  // favicon.ico (light) — 16/32/48
  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(
    icoSizes.map((s) => sharp(lightSrc).resize(s, s).png().toBuffer()),
  );
  buildIco(icoBuffers, icoSizes, `${publicDir}/favicon.ico`);

  // Standalone PNG favicons for modern <link rel="icon" sizes="..."> and dark-mode variant
  await sharp(lightSrc).resize(32, 32).png().toFile(`${publicDir}/favicon-32x32.png`);
  await sharp(lightSrc).resize(16, 16).png().toFile(`${publicDir}/favicon-16x16.png`);
  await sharp(darkSrc).resize(32, 32).png().toFile(`${publicDir}/favicon-32x32-dark.png`);
  await sharp(darkSrc).resize(16, 16).png().toFile(`${publicDir}/favicon-16x16-dark.png`);

  // apple-touch-icon
  await sharp(lightSrc).resize(180, 180).png().toFile(`${publicDir}/apple-touch-icon.png`);

  // maskable icon (PWA / Android adaptive)
  await sharp(maskableSrc).resize(512, 512).png().toFile(`${publicDir}/icon-512-maskable.png`);
  await sharp(lightSrc).resize(512, 512).png().toFile(`${publicDir}/icon-512.png`);

  console.log('favicon set written to public/');
}

main();
