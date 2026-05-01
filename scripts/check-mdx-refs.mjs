#!/usr/bin/env node
// Layer 3: MDX reference scanner.
// Walks app/**/*.{mdx,tsx} and asserts every figure reference (markdown image
// or <img/Image src=>) points at a path in the active allowlist.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const PREPUB = process.env.NEXT_PUBLIC_PREPUB !== 'false';
const root = process.cwd();
const appDir = join(root, 'app');
const componentsDir = join(root, 'src', 'components');
const publishPath = join(root, 'content', 'PUBLISH.json');

const publish = JSON.parse(readFileSync(publishPath, 'utf8'));
const allowed = new Set(PREPUB ? publish.prepub : [...publish.prepub, ...publish.postpub]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const refRegex = /(?:!\[[^\]]*\]\(([^)]+)\))|(?:src=["']([^"']+)["'])/g;
let violations = 0;

for (const startDir of [appDir, componentsDir]) {
  let files;
  try { files = [...walk(startDir)]; } catch { continue; }
  for (const file of files) {
    const ext = extname(file);
    if (!['.mdx', '.tsx', '.ts', '.jsx', '.js'].includes(ext)) continue;
    const src = readFileSync(file, 'utf8');
    let m;
    while ((m = refRegex.exec(src)) !== null) {
      const ref = m[1] || m[2];
      if (!ref) continue;
      // Only validate refs inside /figures/
      const figMatch = ref.match(/\/figures\/([^?#"']+)/);
      if (!figMatch) continue;
      const filename = figMatch[1].split('/').pop();
      if (!allowed.has(filename)) {
        console.error(`check-mdx-refs: REJECT ${file} references /figures/${filename} (not in ${PREPUB ? 'prepub' : 'postpub'} allowlist)`);
        violations += 1;
      }
    }
  }
}

if (violations > 0) {
  console.error(`check-mdx-refs: ${violations} violation(s); aborting build.`);
  process.exit(1);
}

console.log(`check-mdx-refs: OK (mode=${PREPUB ? 'prepub' : 'postpub'})`);
