/** Distinct, high-contrast series colors for charts (assigned by selection order). */
export const SERIES_COLORS = ['#f99e1a', '#218ffe', '#43c59e', '#e85d75'];

export const seriesColor = (index: number): string =>
  SERIES_COLORS[index % SERIES_COLORS.length];

/** Deterministic accent color for a hero id, used by portraits/placeholders. */
export function heroAccent(id: string): string {
  const palette = ['#f99e1a', '#218ffe', '#43c59e', '#e85d75', '#a78bfa', '#38bdf8'];
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return palette[hash % palette.length];
}
