import fs from 'node:fs';
import path from 'node:path';

const roots = ['src'];
const exts = new Set(['.astro', '.md', '.ts']);

const latin = /[A-Za-z]/;
const cyrillic = /[Ѐ-ӿ]/;
// A "word" = a run of letters (either script) possibly incl. combining marks
const wordRe = /[A-Za-zЀ-ӿ]+/g;

// Known intentional Latin-only or mixed tokens to ignore (brand/tech terms, code)
const allowlist = new Set([
  'KRILEA',
  'Astro',
  'MailerLite',
  'Netlify',
  'Cloudflare',
  'Plausible',
  'INCI',
  'GDPR',
]);

let findings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (exts.has(path.extname(entry.name))) scanFile(full);
  }
}

function scanFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    let m;
    wordRe.lastIndex = 0;
    while ((m = wordRe.exec(line))) {
      const word = m[0];
      if (word.length < 3) continue;
      if (latin.test(word) && cyrillic.test(word) && !allowlist.has(word)) {
        findings.push({ file, line: i + 1, word, context: line.trim().slice(0, 100) });
      }
    }
  });
}

for (const root of roots) walk(root);

if (findings.length === 0) {
  console.log('No mixed-script words found.');
} else {
  console.log(`Found ${findings.length} suspicious mixed-script word(s):\n`);
  for (const f of findings) {
    console.log(`${f.file}:${f.line}  "${f.word}"`);
    console.log(`    ${f.context}`);
  }
}
