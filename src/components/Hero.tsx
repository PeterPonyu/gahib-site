import Image from 'next/image';
import Link from 'next/link';
import { SITE_TAGLINE_PREPUB } from '@/lib/prepub';

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50/60 to-white">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-5 md:py-20">
        <div className="md:col-span-3">
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/gahib-site/badges/GAHIB.svg"
              alt=""
              width={48}
              height={48}
              unoptimized
              priority
            />
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
              ZF Lab · Single-cell representation learning
            </span>
          </div>
          <h1 className="mb-5 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            GAHIB
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-700">
            {SITE_TAGLINE_PREPUB}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/method/"
              className="group inline-flex items-center gap-1 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white no-underline shadow-sm transition hover:gap-2 hover:bg-brand-700"
            >
              How it works
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/code/"
              className="group inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 no-underline transition hover:gap-2 hover:border-slate-400"
            >
              View code
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="https://github.com/PeterPonyu/GAHIB"
              rel="noopener"
              className="group inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 no-underline transition hover:gap-2 hover:border-slate-400"
            >
              GitHub
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="md:col-span-2">
          <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <Image
              src="/gahib-site/figures/architecture.png"
              alt="GAHIB architecture diagram"
              width={900}
              height={700}
              className="block h-auto w-full"
              priority
              unoptimized
            />
            <figcaption className="border-t border-slate-200 px-3 py-2 text-xs text-slate-500">
              <span className="font-medium text-slate-700">Architecture.</span>{' '}
              Graph-attention encoder · information bottleneck · Lorentz hyperbolic loss.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
