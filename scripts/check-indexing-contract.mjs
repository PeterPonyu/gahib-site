#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const expectedForMode = (mode) => mode === 'prepub'
  ? { metadata: ['noindex', 'nofollow', 'nocache'], directive: 'disallow', sitemapVisible: false }
  : { metadata: ['index', 'follow'], directive: 'allow', sitemapVisible: true };

const canonicalUrl = 'https://peterponyu.github.io/gahib-site/';

function tagEnd(indexHtml, start) {
  let quote;

  for (let index = start + 1; index < indexHtml.length; index += 1) {
    const character = indexHtml[index];
    if (quote) {
      if (character === quote) quote = undefined;
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === '>') {
      return index;
    }
  }

  return -1;
}

function parseTag(indexHtml, start) {
  const end = tagEnd(indexHtml, start);
  if (end === -1) return undefined;

  const source = indexHtml.slice(start, end + 1);
  const match = source.match(/^<\s*(\/?)\s*([a-z][\w:-]*)(?=\s|\/?>)/i);
  if (!match) return { end, source };

  const [, closing, rawName] = match;
  const attributeSource = source.slice(match[0].length, source.endsWith('/>') ? -2 : -1);
  const attributes = new Map();
  const duplicateAttributes = new Set();
  const attributePattern = /\s+([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+)))?/g;

  for (const attributeMatch of attributeSource.matchAll(attributePattern)) {
    const name = attributeMatch[1].toLowerCase();
    if (attributes.has(name)) duplicateAttributes.add(name);
    attributes.set(name, attributeMatch[2] ?? attributeMatch[3] ?? attributeMatch[4] ?? '');
  }

  return {
    end,
    source,
    name: rawName.toLowerCase(),
    closing: Boolean(closing),
    attributes,
    duplicateAttributes,
  };
}

function attributeValue(tag, attribute) {
  const normalizedAttribute = attribute.toLowerCase();
  if (tag.duplicateAttributes.has(normalizedAttribute)) return undefined;
  return tag.attributes.get(normalizedAttribute);
}

function liveHeadTags(indexHtml) {
  const tags = [];
  const rawTextElements = new Set(['script', 'style', 'noscript', 'title', 'textarea', 'xmp', 'iframe', 'noembed', 'noframes']);
  let cursor = 0;
  let inHead = false;
  let templateDepth = 0;
  let rawTextElement;

  while (cursor < indexHtml.length) {
    if (rawTextElement) {
      const closingTag = new RegExp(`<\\s*/\\s*${rawTextElement}(?=\\s|>)[^>]*>`, 'ig');
      closingTag.lastIndex = cursor;
      const match = closingTag.exec(indexHtml);
      if (!match) break;
      cursor = match.index + match[0].length;
      rawTextElement = undefined;
      continue;
    }

    const start = indexHtml.indexOf('<', cursor);
    if (start === -1) break;
    if (indexHtml.startsWith('<!--', start)) {
      const commentEnd = indexHtml.indexOf('-->', start + 4);
      cursor = commentEnd === -1 ? indexHtml.length : commentEnd + 3;
      continue;
    }

    const tag = parseTag(indexHtml, start);
    if (!tag) break;
    cursor = tag.end + 1;
    if (!tag.name) continue;

    if (tag.closing) {
      if (tag.name === 'template' && templateDepth > 0) templateDepth -= 1;
      if (tag.name === 'head' && templateDepth === 0) inHead = false;
      continue;
    }

    if (rawTextElements.has(tag.name)) {
      rawTextElement = tag.name;
      continue;
    }
    if (tag.name === 'template') {
      templateDepth += 1;
      continue;
    }
    if (tag.name === 'head' && templateDepth === 0) {
      inHead = true;
      continue;
    }
    if (tag.name === 'body' && templateDepth === 0) {
      inHead = false;
      continue;
    }
    if (inHead && templateDepth === 0) tags.push(tag);
  }

  return tags;
}

function robotsMetadata(indexHtml) {
  const robotsTags = liveHeadTags(indexHtml)
    .filter((tag) => tag.name === 'meta')
    .filter((tag) => attributeValue(tag, 'name')?.toLowerCase() === 'robots');

  if (robotsTags.length !== 1) {
    throw new Error(`indexing contract failed: out/index.html must contain exactly one robots meta tag; found ${robotsTags.length}`);
  }

  const content = attributeValue(robotsTags[0], 'content');
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

  const policyBlocks = blocks.filter(({ directives }) => directives.length > 0);
  if (policyBlocks.length !== 1 || policyBlocks[0] !== wildcardBlocks[0]) {
    throw new Error('indexing contract failed: out/robots.txt may contain Allow/Disallow rules only in its User-agent: * block');
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

function validateSitemap(mode, sitemapXml) {
  const expected = expectedForMode(mode);
  if (typeof sitemapXml !== 'string' || !sitemapXml.includes('<?xml') || !sitemapXml.includes('<urlset')) {
    throw new Error('indexing contract failed: out/sitemap.xml must be a valid XML sitemap document');
  }

  const canonicalVisible = sitemapXml.includes(canonicalUrl);
  if (canonicalVisible !== expected.sitemapVisible) {
    throw new Error(`indexing contract failed: out/sitemap.xml must ${expected.sitemapVisible ? 'include' : 'exclude'} ${canonicalUrl}`);
  }
}

function validateArtifacts(mode, indexHtml, robotsTxt, sitemapXml) {
  const expected = expectedForMode(mode);
  assertExactSet(robotsMetadata(indexHtml), expected.metadata, 'out/index.html robots metadata');

  const directives = robotsDirectives(robotsTxt);
  if (directives.length !== 1 || directives[0].name !== expected.directive || directives[0].value !== '/') {
    throw new Error(`indexing contract failed: out/robots.txt User-agent: * block must contain only ${expected.directive === 'allow' ? 'Allow' : 'Disallow'}: /`);
  }

  validateSitemap(mode, sitemapXml);
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
  const prepubMeta = '<meta name="robots" content="noindex, nofollow, nocache">';
  const publishedMeta = '<meta name="robots" content="index, follow">';
  const htmlDocument = (head) => `<html><head>${head}</head><body></body></html>`;
  const prepubHtml = htmlDocument(prepubMeta);
  const publishedHtml = htmlDocument(publishedMeta);
  const prepubRobots = 'User-agent: *\nDisallow: /\n';
  const publishedRobots = 'User-agent: *\nAllow: /\n';
  const emptySitemap = '<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>';
  const publishedSitemap = `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${canonicalUrl}</loc></url></urlset>`;

  validateArtifacts('prepub', prepubHtml, prepubRobots, emptySitemap);
  validateArtifacts('published', publishedHtml, publishedRobots, publishedSitemap);
  assertRejects('contradictory HTML in prepub mode', () =>
    validateArtifacts('prepub', htmlDocument(`${prepubMeta}${publishedMeta}`), prepubRobots, emptySitemap));
  assertRejects('contradictory HTML in published mode', () =>
    validateArtifacts('published', htmlDocument(`${publishedMeta}${prepubMeta}`), publishedRobots, publishedSitemap));
  assertRejects('comment-only robots metadata', () =>
    validateArtifacts('prepub', htmlDocument(`<!-- ${prepubMeta} -->`), prepubRobots, emptySitemap));
  assertRejects('raw-text robots metadata', () =>
    validateArtifacts('prepub', htmlDocument(`<script>${prepubMeta}</script>`), prepubRobots, emptySitemap));
  assertRejects('nested template robots metadata', () =>
    validateArtifacts('prepub', htmlDocument(`<template><template></template>${prepubMeta}</template>`), prepubRobots, emptySitemap));
  assertRejects('comment transition robots metadata', () =>
    validateArtifacts('prepub', htmlDocument(` \n<!-- harmless > ${prepubMeta} -->`), prepubRobots, emptySitemap));
  assertRejects('data-name robots metadata', () =>
    validateArtifacts('prepub', htmlDocument('<meta data-name="robots" content="noindex, nofollow, nocache">'), prepubRobots, emptySitemap));
  assertRejects('meta-data custom element', () =>
    validateArtifacts('prepub', htmlDocument('<meta-data name="robots" content="noindex, nofollow, nocache">'), prepubRobots, emptySitemap));
  assertRejects('robots metadata after implicit head closure', () =>
    validateArtifacts('prepub', `<html><head><body>${prepubMeta}</body></html>`, prepubRobots, emptySitemap));
  assertRejects('contradictory robots.txt in prepub mode', () =>
    validateArtifacts('prepub', prepubHtml, `${prepubRobots}Allow: /\n`, emptySitemap));
  assertRejects('contradictory robots.txt in published mode', () =>
    validateArtifacts('published', publishedHtml, `${publishedRobots}Disallow: /\n`, publishedSitemap));
  assertRejects('specific-agent published override in prepub mode', () =>
    validateArtifacts('prepub', prepubHtml, `${prepubRobots}User-agent: Googlebot\nAllow: /\n`, emptySitemap));
  assertRejects('specific-agent prepub override in published mode', () =>
    validateArtifacts('published', publishedHtml, `${publishedRobots}User-agent: Googlebot\nDisallow: /\n`, publishedSitemap));
  assertRejects('missing sitemap artifact', () => validateArtifacts('prepub', prepubHtml, prepubRobots));
  assertRejects('published sitemap hidden canonical', () => validateArtifacts('published', publishedHtml, publishedRobots, emptySitemap));
  assertRejects('prepub sitemap exposed canonical', () => validateArtifacts('prepub', prepubHtml, prepubRobots, publishedSitemap));

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
const sitemapXml = readFileSync(join(outputDirectory, 'sitemap.xml'), 'utf8');

validateArtifacts(mode, indexHtml, robotsTxt, sitemapXml);

console.log(`indexing contract: OK (${mode})`);
