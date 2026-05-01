import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="mb-2 text-3xl font-semibold text-slate-900">404</h1>
      <p className="mb-6 text-slate-700">This page does not exist.</p>
      <Link href="/">Return home</Link>
    </section>
  );
}
