// Type declarations for build-time-aliased modules.
// The `@/results-content` import is resolved by next.config.mjs's webpack
// alias to either `app/results/_empty.mdx` (prepub) or `_content.mdx`
// (postpub). TypeScript only needs a stable type for the import.

declare module '@/results-content' {
  import type { ComponentType } from 'react';
  const Content: ComponentType<Record<string, unknown>>;
  export default Content;
}

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}
