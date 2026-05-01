import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createMDX from '@next/mdx';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeKatex],
  },
});

const PREPUB = process.env.NEXT_PUBLIC_PREPUB !== 'false';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/gahib-site';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  webpack(config) {
    // Build-time prepub gating: alias @/results-content to either the embargoed
    // _content.mdx (post-pub) or the empty placeholder (pre-pub). This makes
    // tree-shaking deterministic — pre-pub builds NEVER bundle _content.mdx.
    config.resolve.alias['@/results-content'] = PREPUB
      ? path.resolve(__dirname, 'app/results/_empty.mdx')
      : path.resolve(__dirname, 'app/results/_content.mdx');
    return config;
  },
};

export default withMDX(nextConfig);
