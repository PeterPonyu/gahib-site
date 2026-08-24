#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const expectedForMode = (mode) => mode === 'prepub'
  ? { metadata: ['noindex', 'nofollow', 'nocache'], directive: 'disallow' }
  : { metadata: ['index', 'follow'], directive: 'allow' };

function attributeValue(tag, attribute) {
  const match = tag.match(new RegExp(`\\b${attribute}\\s*=\\s*["']([^"']+)["']`, 'i'));
  return match?.[1];
}

function robotsMetadata(indexHtml) {
  const tags = [...indexHtml.matchAll(/<meta\b[^>]*>/gi)];
  const robotsTags = tags.filter(([tag]) => attributeValue(tag, 'name')?.toLowerCase() === 'robots');

  if (robotsTags.length !== 1) {
    throw new Error(`indexing contract failed: out/index.html must contain exactly one robots meta tag; found ${robotsTags.length}`);
  }

  const content = attributeValue(robotsTags[0][0], 'content');
  if (!content) {
    throw new Error('indexing contract failed: robots meta tag must have content');
  }

  return content.split(',').map((directive) => directive.trim().toLowerCase()).filter(Boolean);
}

function robotsDirectives(robotsTxt) {
  const blocks = [];
  let block;

  for (const line of robotsTxt.split(/\r?\n/)) {
    const [field, ...valueParts] = line.replace(/#.*/, '').split(':');
    if (!field || valueParts.length === 0) continue;

    const normalizedField = field.trim().toLowerCase();
    const value = valueParts.join(':').trim();
    if (normalizedField === 'user-agent') {
      block = { userAgent: value.toLowerCase(), directives: [] };
      blocks.push(block);
    } else if (block && ['allow', 'disallow'].includes(normalizedField)) {
      block.directives.push({ name: normalizedField, value });
    }
  }

  const wildcardBlocks = blocks.filter(({ userAgent }) => userAgent === '*');
  if (wildcardBlocks.length !== 1) {
    throw new Error(`indexing contract failed: out/robots.txt must contain exactly one User-agent: * block; found ${wildcardBlocks.length}`);
  }

  return wildcardBlocks[0].directives;
}

function assertExactSet(actual, expected, artifact) {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  const matches = actual.length === expected.length
    && actualSet.size === expectedSet.size
    && [...expectedSet].every((value) => actualSet.has(value));

  if (!matches) {
    throw new Error(`indexing contract failed: ${artifact} must contain exactly ${expected.join(', ')}`);
  }
}

function validateArtifacts(mode, indexHtml, robotsTxt) {
  const expected = expectedForMode(mode);
  assertExactSet(robotsMetadata(indexHtml), expected.metadata, 'out/index.html robots metadata');

  const directives = robotsDirectives(robotsTxt);
  if (directives.length !== 1 || directives[0].name !== expected.directive || directives[0].value !== '/') {
    throw new Error(`indexing contract failed: out/robots.txt User-agent: * block must contain only ${expected.directive === 'allow' ? 'Allow' : 'Disallow'}: /`);
  }
}

function assertRejects(name, validate) {
  try {
    validate();
  } catch {
    return;
  }
  throw new Error(`self-test failed: ${name} was accepted`);
}

function runSelfTest() {
  const prepubHtml = '<meta name="robots" content="noindex, nofollow, nocache">';
  const publishedHtml = '<meta name="robots" content="index, follow">';
  const prepubRobots = 'User-agent: *\nDisallow: /\n';
  const publishedRobots = 'User-agent: *\nAllow: /\n';

  validateArtifacts('prepub', prepubHtml, prepubRobots);
  validateArtifacts('published', publishedHtml, publishedRobots);
  assertRejects('contradictory HTML in prepub mode', () =>
    validateArtifacts('prepub', `${prepubHtml}${publishedHtml}`, prepubRobots));
  assertRejects('contradictory HTML in published mode', () =>
    validateArtifacts('published', `${publishedHtml}${prepubHtml}`, publishedRobots));
  assertRejects('contradictory robots.txt in prepub mode', () =>
    validateArtifacts('prepub', prepubHtml, `${prepubRobots}Allow: /\n`));
  assertRejects('contradictory robots.txt in published mode', () =>
    validateArtifacts('published', publishedHtml, `${publishedRobots}Disallow: /\n`));

  console.log('indexing contract self-test: OK');
}

if (process.argv[2] === '--self-test' && process.argv.length === 3) {
  runSelfTest();
  process.exit(0);
}

const [flag, mode] = process.argv.slice(2);

if (flag !== '--mode' || !['prepub', 'published'].includes(mode) || process.argv.length !== 4) {
  throw new Error('Usage: node scripts/check-indexing-contract.mjs --mode prepub|published');
}

const outputDirectory = join(process.cwd(), 'out');
const indexHtml = readFileSync(join(outputDirectory, 'index.html'), 'utf8');
const robotsTxt = readFileSync(join(outputDirectory, 'robots.txt'), 'utf8');

validateArtifacts(mode, indexHtml, robotsTxt);

console.log(`indexing contract: OK (${mode})`);
