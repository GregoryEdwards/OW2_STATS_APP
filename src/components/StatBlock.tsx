import { ReactNode } from 'react';

export interface StatItem {
  label: string;
  value: ReactNode;
}

interface StatBlockProps {
  title: string;
  items: StatItem[];
}

/** Labeled key/value grid used for survivability, weapon and ultimate stats. */
export function StatBlock({ title, items }: StatBlockProps) {
  return (
    <div className="panel p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="stat-label">{item.label}</dt>
            <dd className="mt-0.5 text-lg font-semibold text-white">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
