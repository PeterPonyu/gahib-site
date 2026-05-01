// Build-time prepub flag, baked into the bundle by Next.js (NEXT_PUBLIC_*).
// Default is `true` — explicit safer than implicit.
export const PREPUB: boolean = process.env.NEXT_PUBLIC_PREPUB !== 'false';

export const SITE_NAME = 'GAHIB' as const;
export const SITE_TAGLINE_PREPUB =
  'A graph-attention variational autoencoder with information bottleneck and Lorentz hyperbolic geometry for single-cell latent representation learning.';
