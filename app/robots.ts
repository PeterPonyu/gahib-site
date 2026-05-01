import type { MetadataRoute } from 'next';
import { PREPUB } from '@/lib/prepub';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/gahib-site';

export default function robots(): MetadataRoute.Robots {
  if (PREPUB) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://peterponyu.github.io${BASE_PATH}/sitemap.xml`,
  };
}
