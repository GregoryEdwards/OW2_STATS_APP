import type { SupportHero } from '@/types/hero';
import { heroMetrics, HeroMetrics, METRIC_LABELS } from './stats';

export type MetricKey = keyof HeroMetrics;

export type MetricDirection = 'higher' | 'lower';

/**
 * Whether a bigger raw value is better. "lower" metrics (ult cost, cooldown)
 * are inverted during normalization so that a higher radar value always means
 * "stronger".
 */
export const METRIC_DIRECTION: Record<MetricKey, MetricDirection> = {
  dps: 'higher',
  hps: 'higher',
  effectiveHp: 'higher',
  ultCost: 'lower',
  avgCooldown: 'lower',
  difficultyScore: 'higher',
};

/** Metrics shown on the radar chart (all of them, in a stable order). */
export const RADAR_METRICS: MetricKey[] = [
  'dps',
  'hps',
  'effectiveHp',
  'ultCost',
  'avgCooldown',
  'difficultyScore',
];

export interface MetricRange {
  min: number;
  max: number;
}

/**
 * Build {metric: {min, max}} across the full roster so the 0–100 scale is
 * stable regardless of which heroes are currently selected.
 */
export function buildMetricRanges(heroes: SupportHero[]): Record<MetricKey, MetricRange> {
  const ranges = {} as Record<MetricKey, MetricRange>;
  const allMetrics = heroes.map(heroMetrics);
  for (const key of RADAR_METRICS) {
    const values = allMetrics.map((m) => m[key]);
    ranges[key] = { min: Math.min(...values), max: Math.max(...values) };
  }
  return ranges;
}

/**
 * Map a raw value to 0..100 within its roster range. For "lower" metrics the
 * scale is inverted so 100 always represents the strongest. Guards min === max
 * (degenerate range) by returning a neutral 50.
 */
export function normalizeMetric(
  value: number,
  range: MetricRange,
  direction: MetricDirection,
): number {
  const { min, max } = range;
  if (max === min) return 50;
  const ratio = (value - min) / (max - min);
  const scaled = direction === 'lower' ? 1 - ratio : ratio;
  return Math.round(scaled * 100);
}

export interface RadarRow {
  /** Axis label, e.g. "Damage / sec". */
  metric: string;
  /** Normalized 0–100 value keyed by hero id. */
  [heroId: string]: number | string;
}

/**
 * Produce radar-ready rows: one object per metric axis, with a normalized 0–100
 * value for each selected hero keyed by hero id.
 */
export function toRadarData(
  selected: SupportHero[],
  ranges: Record<MetricKey, MetricRange>,
): RadarRow[] {
  return RADAR_METRICS.map((key) => {
    const row: RadarRow = { metric: METRIC_LABELS[key] };
    for (const hero of selected) {
      row[hero.id] = normalizeMetric(heroMetrics(hero)[key], ranges[key], METRIC_DIRECTION[key]);
    }
    return row;
  });
}
