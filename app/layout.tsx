import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PrePubBanner } from '@/components/PrePubBanner';
import { PREPUB } from '@/lib/prepub';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/gahib-site';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1d4ed8',
};

// OG/JSON-LD lockdown (Layer 6):
// Pre-pub: pin og:image to architecture.png; og:title/description use project
// name only (NOT the paper title); no ScholarlyArticle JSON-LD.
// Post-pub: switch to paper-derived metadata in a single review-gated PR.
export const metadata: Metadata = {
  metadataBase: new URL('https://peterponyu.github.io'),
  title: PREPUB ? 'GAHIB' : 'GAHIB — graph-attention VAE with hyperbolic geometry',
  description: PREPUB
    ? 'GAHIB project page (pre-publication preview).'
    : 'A graph-attention variational autoencoder with information bottleneck and Lorentz hyperbolic geometry for single-cell latent representation learning.',
  applicationName: 'GAHIB',
  authors: [{ name: 'Zeyu Fu' }],
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon.ico`, sizes: 'any' },
      { url: `${BASE_PATH}/favicon.svg`, type: 'image/svg+xml' },
    ],
    shortcut: [`${BASE_PATH}/favicon.ico`],
  },
  robots: PREPUB
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
  openGraph: {
    title: PREPUB ? 'GAHIB' : 'GAHIB — graph-attention VAE with hyperbolic geometry',
    description: PREPUB
      ? 'GAHIB project page (pre-publication preview).'
      : 'Single-cell graph-attention VAE with information bottleneck and Lorentz hyperbolic geometry.',
    url: `${BASE_PATH}/`,
    siteName: 'GAHIB',
    type: 'website',
    images: [
      {
        url: `${BASE_PATH}/figures/architecture.png`,
        width: 1200,
        height: 800,
        alt: 'GAHIB architecture diagram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PREPUB ? 'GAHIB' : 'GAHIB — graph-attention VAE with hyperbolic geometry',
    description: PREPUB ? 'Pre-publication preview.' : 'Single-cell representation learning.',
    images: [`${BASE_PATH}/figures/architecture.png`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <PrePubBanner />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
