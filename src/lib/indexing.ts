import { PREPUB } from './prepub';

export const INDEXING_MODE: 'noindex_nofollow' | 'index_follow' = PREPUB
  ? 'noindex_nofollow'
  : 'index_follow';

export const ROBOTS_METADATA = PREPUB
  ? { index: false, follow: false, nocache: true }
  : { index: true, follow: true };
