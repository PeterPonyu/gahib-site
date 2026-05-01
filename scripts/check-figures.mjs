#!/usr/bin/env node
// Layer 2: figure allowlist enforcer.
// Walks public/figures/ and asserts every file is in the active allowlist.
// Active list = `prepub` when NEXT_PUBLIC_PREPUB === 'true' (default).
// Also enforces a 500 KB per-file size ceiling.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const PREPUB = process.env.NEXT_PUBLIC_PREPUB !== 'false';
const SIZE_MAX = 500 * 1024;

const root = process.cwd();
const figDir = join(root, 'public', 'figures');
const publishPath = join(root, 'content', 'PUBLISH.json');

let publish;
try {
  publish = JSON.parse(readFileSync(publishPath, 'utf8'));
} catch (err) {
  console.error(`check-figures: cannot read ${publishPath}: ${err.message}`);
  process.exit(1);
}

const allowed = new Set(PREPUB ? publish.prepub : [...publish.prepub, ...publish.postpub]);

let entries = [];
try {
  entries = readdirSync(figDir);
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log(`check-figures: ${figDir} does not exist yet (ok if no figures synced).`);
    process.exit(0);
  }
  throw err;
}

let violations = 0;
for (const name of entries) {
  if (name.startsWith('.')) continue;
  const full = join(figDir, name);
  const st = statSync(full);
  if (!st.isFile()) continue;

  if (!allowed.has(name)) {
    console.error(`check-figures: REJECT ${name} — not in active allowlist (mode=${PREPUB ? 'prepub' : 'postpub'})`);
    violations += 1;
    continue;
  }
  if (st.size > SIZE_MAX) {
    console.error(`check-figures: REJECT ${name} — ${st.size} bytes > 500 KB ceiling`);
    violations += 1;
  }
}

if (violations > 0) {
  console.error(`check-figures: ${violations} violation(s); aborting build.`);
  process.exit(1);
}

console.log(`check-figures: OK (mode=${PREPUB ? 'prepub' : 'postpub'}, ${entries.length} files validated)`);
