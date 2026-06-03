import type { DataConfidence } from '@/types/hero';

/** Small badge that flags ability values curated as approximate. */
export function DataConfidenceBadge({ confidence }: { confidence?: DataConfidence }) {
  if (confidence !== 'approximate') return null;
  return (
    <span
      className="ml-1 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-400"
      title="Approximate value — may vary by patch"
    >
      approx
    </span>
  );
}
