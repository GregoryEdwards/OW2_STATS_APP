import type { Strategy, StrategyCategory } from '@/types/hero';

const CATEGORY_STYLE: Record<StrategyCategory, string> = {
  healing: 'bg-role-support/15 text-role-support',
  damage: 'bg-rose-500/15 text-rose-400',
  utility: 'bg-ow-blue/15 text-ow-blue',
};

/** Renders a hero's curated combos / optimization tips, tagged by category. */
export function StrategyList({ strategies }: { strategies: Strategy[] }) {
  return (
    <ul className="space-y-3">
      {strategies.map((s) => (
        <li key={s.title} className="rounded-lg border border-ow-border bg-ow-dark/40 p-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-medium text-slate-100">{s.title}</h3>
            <span
              className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${CATEGORY_STYLE[s.category]}`}
            >
              {s.category}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">{s.detail}</p>
        </li>
      ))}
    </ul>
  );
}
