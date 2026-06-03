import { describe, expect, it } from 'vitest';
import type { SupportHero } from '@/types/hero';
import { avgCooldown, computeDps, heroMetrics, minCooldown } from './stats';

const makeHero = (overrides: Partial<SupportHero> = {}): SupportHero => ({
  id: 'test',
  name: 'Test',
  role: 'support',
  difficulty: 'Medium',
  releaseYear: 2024,
  portrait: '/portraits/test.svg',
  survivability: { health: 200, armor: 0, shield: 0, total: 200 },
  weapon: { name: 'Gun', type: 'hitscan', damage: 20, fireRate: 4, dps: 80 },
  healing: { primaryType: 'beam', peakHps: 50 },
  abilities: [
    { name: 'A', kind: 'ability', description: '', cooldown: 6 },
    { name: 'B', kind: 'ability', description: '', cooldown: 12 },
    { name: 'Weapon', kind: 'weapon', description: '', cooldown: 1 },
    { name: 'Passive', kind: 'passive', description: '', cooldown: 99 },
    { name: 'Ult', kind: 'ultimate', description: '', ultCost: 1500 },
  ],
  ultimate: { name: 'Ult', cost: 1500, effect: '' },
  ...overrides,
});

describe('computeDps', () => {
  it('multiplies damage by fire rate', () => {
    expect(computeDps(70, 1.25)).toBe(87.5);
    expect(computeDps(20, 4)).toBe(80);
  });

  it('rounds to two decimals', () => {
    expect(computeDps(13, 5.001)).toBe(65.01);
  });
});

describe('cooldown helpers', () => {
  it('minCooldown ignores weapon, passive and ultimate', () => {
    expect(minCooldown(makeHero())).toBe(6);
  });

  it('avgCooldown averages only non-ultimate abilities', () => {
    expect(avgCooldown(makeHero())).toBe(9);
  });

  it('returns 0 when there are no cooldown abilities', () => {
    const hero = makeHero({
      abilities: [{ name: 'Ult', kind: 'ultimate', description: '', ultCost: 1500 }],
    });
    expect(minCooldown(hero)).toBe(0);
    expect(avgCooldown(hero)).toBe(0);
  });
});

describe('heroMetrics', () => {
  it('flattens a hero into comparable scalars', () => {
    const m = heroMetrics(makeHero());
    expect(m).toMatchObject({
      dps: 80,
      hps: 50,
      effectiveHp: 200,
      ultCost: 1500,
      avgCooldown: 9,
      difficultyScore: 2,
    });
  });
});
