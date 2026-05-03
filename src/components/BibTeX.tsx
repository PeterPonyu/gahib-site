'use client';

import { useState } from 'react';

type BibTeXProps = {
  entry: string;
};

export function BibTeX({ entry }: BibTeXProps) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(entry);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — user can still select text
    }
  };
  return (
    <div className="my-4 max-w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
        <span className="font-medium">BibTeX</span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex min-h-11 items-center rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          aria-label="Copy BibTeX to clipboard"
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="max-h-96 overflow-auto p-4 text-[0.75rem] leading-relaxed text-slate-800 sm:text-xs">
        <code className="block whitespace-pre-wrap break-words sm:whitespace-pre">{entry}</code>
      </pre>
    </div>
  );
}

export default BibTeX;
