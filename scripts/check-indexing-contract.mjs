#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const [flag, mode] = process.argv.slice(2);

if (flag !== '--mode' || !['prepub', 'published'].includes(mode) || process.argv.length !== 4) {
  throw new Error('Usage: node scripts/check-indexing-contract.mjs --mode prepub|published');
}

const expected = mode === 'prepub'
  ? { meta: 'noindex, nofollow', robots: 'Disallow: /' }
  : { meta: 'index, follow', robots: 'Allow: /' };

const outputDirectory = join(process.cwd(), 'out');
const indexHtml = readFileSync(join(outputDirectory, 'index.html'), 'utf8');
const robotsTxt = readFileSync(join(outputDirectory, 'robots.txt'), 'utf8');

if (!indexHtml.includes(expected.meta)) {
  throw new Error(`indexing contract failed: out/index.html must contain ${JSON.stringify(expected.meta)} for ${mode}`);
}

if (!robotsTxt.includes(expected.robots)) {
  throw new Error(`indexing contract failed: out/robots.txt must contain ${JSON.stringify(expected.robots)} for ${mode}`);
}

console.log(`indexing contract: OK (${mode})`);
