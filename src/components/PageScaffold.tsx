import Link from 'next/link';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  summary: ReactNode;
  children?: ReactNode;
};

type Fact = {
  label: string;
  value: string;
  detail: string;
};

type NextStep = {
  href: string;
  label: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, summary, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_#dbeafe_0,_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_80%)]">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-brand-700">
          {eyebrow}
        </p>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_18rem] md:items-end">
          <div>
            <h1 className="text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
              {title}
            </h1>
            <div className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">
              {summary}
            </div>
          </div>
          {children && (
            <div className="rounded-xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function PageBody({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-5xl px-4 py-10">{children}</div>;
}

export function FactStrip({ facts }: { facts: Fact[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((fact) => (
        <div key={fact.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-600">{fact.label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{fact.value}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{fact.detail}</p>
        </div>
      ))}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: ReactNode }) {
  return (
    <div className="mb-5 max-w-3xl">
      {eyebrow && (
        <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      {description && <div className="mt-2 text-sm leading-relaxed text-slate-600">{description}</div>}
    </div>
  );
}

export function NextSteps({ items }: { items: NextStep[] }) {
  return (
    <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-5">
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
        Continue
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-lg border border-slate-200 bg-white p-4 no-underline transition hover:border-brand-400 hover:shadow-sm"
          >
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
              {item.label}
            </span>
            <h3 className="mt-2 text-base font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            <span className="mt-3 inline-flex text-sm font-medium text-brand-700 transition group-hover:translate-x-1">
              Open route {'->'}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function EmbargoNote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
      {children}
    </div>
  );
}
