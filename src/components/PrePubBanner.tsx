import { PREPUB } from '@/lib/prepub';

export function PrePubBanner() {
  if (!PREPUB) return null;
  return (
    <div className="border-b border-amber-300 bg-amber-50/80 text-amber-900">
      <div className="mx-auto max-w-5xl px-4 py-2 text-sm">
        <strong className="font-semibold">Preview notice.</strong>{' '}
        This site includes method notes, datasets, metrics, and code; results and weights are not included.
      </div>
    </div>
  );
}
