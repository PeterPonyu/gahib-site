import Image from 'next/image';
import Link from 'next/link';
import { SITE_TAGLINE_PREPUB } from '@/lib/prepub';

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50/60 to-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-5 md:gap-10 md:py-16">
        <div className="md:col-span-3 md:py-2">
          <h1 className="mb-4 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            GAHIB
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-slate-700">
            {SITE_TAGLINE_PREPUB}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/method/"
              className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white no-underline shadow-sm transition hover:bg-brand-700"
            >
              How it works
            </Link>
            <Link
              href="/code/"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 no-underline transition hover:border-slate-400"
            >
              View code
            </Link>
            <Link
              href="/cite/"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 no-underline transition hover:border-slate-400"
            >
              Cite
            </Link>
          </div>
        </div>
        <div className="md:col-span-2">
          <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <Image
              src="/figures/architecture.png"
              alt="GAHIB architecture diagram"
              width={900}
              height={700}
              className="block h-auto w-full"
              priority
            />
            <figcaption className="border-t border-slate-200 px-3 py-2 text-xs text-slate-500">
              Architecture: graph-attention encoder · information bottleneck · Lorentz hyperbolic loss.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
