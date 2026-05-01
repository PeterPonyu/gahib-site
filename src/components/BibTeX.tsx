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
    <div className="my-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
        <span className="font-medium">BibTeX</span>
        <button
          type="button"
          onClick={onCopy}
          className="rounded border border-slate-300 bg-white px-2 py-0.5 text-xs hover:bg-slate-100"
          aria-label="Copy BibTeX to clipboard"
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-800">
        <code>{entry}</code>
      </pre>
    </div>
  );
}

export default BibTeX;
