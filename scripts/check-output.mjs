#!/usr/bin/env node
// Layer 5: post-build artifact scan.
// Greps the static export at out/ for:
//   (a) nested paragraph markup in HTML (catches MDX JSX wrappers like <p><p>...)
//   (b) any postpub filename when in prepub mode (catches webpack-alias regressions)
//   (c) the literal string `_content` in chunk filenames (catches MDX-import leaks)
//   (d) any embargoed_substring in any HTML/JS/JSON file
// Run after `next build` (postbuild hook) AND in CI as separate step.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const PREPUB = process.env.NEXT_PUBLIC_PREPUB !== 'false';
const root = process.cwd();
const outDir = join(root, 'out');
const publishPath = join(root, 'content', 'PUBLISH.json');
const paragraphTagPattern = /<\/?p(?:\s[^>]*)?>/gi;

const publish = JSON.parse(readFileSync(publishPath, 'utf8'));

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let outFiles;
try { outFiles = [...walk(outDir)]; } catch (err) {
  if (err.code === 'ENOENT') {
    console.error(`check-output: ${outDir} does not exist; skipping (run after \`next build\`).`);
    process.exit(0);
  }
  throw err;
}

let violations = 0;

function findNestedParagraph(content) {
  paragraphTagPattern.lastIndex = 0;
  let openParagraphIndex = -1;

  for (const match of content.matchAll(paragraphTagPattern)) {
    const tag = match[0];
    const index = match.index ?? 0;

    if (tag.startsWith('</')) {
      openParagraphIndex = -1;
      continue;
    }

    if (openParagraphIndex !== -1) {
      return content.slice(openParagraphIndex, Math.min(index + tag.length + 80, content.length));
    }

    openParagraphIndex = index;
  }

  return null;
}

for (const f of outFiles) {
  if (!f.endsWith('.html')) continue;
  const rel = f.slice(outDir.length + 1);

  const content = readFileSync(f, 'utf8');
  const nestedParagraph = findNestedParagraph(content);
  if (!nestedParagraph) continue;

  console.error(`check-output: REJECT ${rel} — contains nested paragraph markup ${JSON.stringify(nestedParagraph)}`);
  violations += 1;
}

// (b) and (c): chunk filename checks
for (const f of outFiles) {
  const rel = f.slice(outDir.length + 1);
  if (PREPUB) {
    for (const postpubName of publish.postpub) {
      const stem = postpubName.replace(/\.[^.]+$/, '');
      if (rel.includes(stem)) {
        console.error(`check-output: REJECT ${rel} — references postpub asset stem "${stem}" while PREPUB=true`);
        violations += 1;
      }
    }
    if (rel.includes('_content')) {
      console.error(`check-output: REJECT ${rel} — chunk filename contains "_content" while PREPUB=true (webpack-alias regression?)`);
      violations += 1;
    }
  }
}

// (d): substring grep for HTML/JS/JSON contents
const textExt = new Set(['.html', '.js', '.mjs', '.cjs', '.json', '.txt', '.xml', '.svg']);
if (PREPUB) {
  for (const f of outFiles) {
    const ext = f.match(/\.[^.]+$/)?.[0] ?? '';
    if (!textExt.has(ext)) continue;
    const content = readFileSync(f, 'utf8');
    for (const sub of publish.embargoed_substrings) {
      if (content.includes(sub)) {
        const rel = f.slice(outDir.length + 1);
        console.error(`check-output: REJECT ${rel} — contains embargoed substring "${sub}" while PREPUB=true`);
        violations += 1;
        break;
      }
    }
  }
}

if (violations > 0) {
  console.error(`check-output: ${violations} violation(s); build artifact is unsafe to deploy.`);
  process.exit(1);
}

console.log(`check-output: OK (mode=${PREPUB ? 'prepub' : 'postpub'}, ${outFiles.length} files scanned)`);
