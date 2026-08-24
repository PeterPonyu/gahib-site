import type { MetadataRoute } from 'next';
import { INDEXING_MODE } from '@/lib/indexing';

const CANONICAL_URL = 'https://peterponyu.github.io/gahib-site/';

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXING_MODE === 'index_follow' ? [{ url: CANONICAL_URL }] : [];
}
