import { describe, expect, it } from 'vitest';
import type { SupportHero } from '@/types/hero';
import { buildMetricRanges, normalizeMetric, toRadarData, RADAR_METRICS } from './normalize';

const hero = (id: string, dps: number, ultCost: number): SupportHero => ({
  id,
  name: id,
  role: 'support',
  difficulty: 'Medium',
  releaseYear: 2024,
  portrait: `/portraits/${id}.svg`,
  survivability: { health: 200, armor: 0, shield: 0, total: 200 },
  weapon: { name: 'Gun', type: 'hitscan', damage: dps, fireRate: 1, dps },
  healing: { primaryType: 'beam', peakHps: 50 },
  abilities: [{ name: 'Ult', kind: 'ultimate', description: '', ultCost }],
  ultimate: { name: 'Ult', cost: ultCost, effect: '' },
});

describe('normalizeMetric', () => {
  const range = { min: 0, max: 100 };

  it('maps the best raw value to 100 for higher-is-better metrics', () => {
    expect(normalizeMetric(100, range, 'higher')).toBe(100);
    expect(normalizeMetric(0, range, 'higher')).toBe(0);
    expect(normalizeMetric(50, range, 'higher')).toBe(50);
  });

  it('inverts lower-is-better metrics so the smallest raw scores 100', () => {
    expect(normalizeMetric(0, range, 'lower')).toBe(100);
    expect(normalizeMetric(100, range, 'lower')).toBe(0);
  });

  it('guards a degenerate range (min === max) with a neutral 50', () => {
    expect(normalizeMetric(42, { min: 42, max: 42 }, 'higher')).toBe(50);
  });
});

describe('buildMetricRanges', () => {
  it('computes min/max across the whole roster', () => {
    const roster = [hero('a', 10, 1500), hero('b', 30, 1800), hero('c', 20, 1600)];
    const ranges = buildMetricRanges(roster);
    expect(ranges.dps).toEqual({ min: 10, max: 30 });
    expect(ranges.ultCost).toEqual({ min: 1500, max: 1800 });
  });
});

describe('toRadarData', () => {
  it('returns one row per metric with a value for each selected hero', () => {
    const roster = [hero('a', 10, 1500), hero('b', 30, 1800)];
    const ranges = buildMetricRanges(roster);
    const rows = toRadarData(roster, ranges);

    expect(rows).toHaveLength(RADAR_METRICS.length);
    for (const row of rows) {
      expect(row).toHaveProperty('metric');
      expect(typeof row.a).toBe('number');
      expect(typeof row.b).toBe('number');
    }

    const dpsRow = rows.find((r) => r.metric === 'Damage / sec')!;
    expect(dpsRow.a).toBe(0); // lowest dps in roster
    expect(dpsRow.b).toBe(100); // highest dps in roster
  });
});
