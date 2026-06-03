import type { Ability, Difficulty, SupportHero } from '@/types/hero';

/** Round to 2 decimal places to avoid floating point noise in display/tests. */
export const round2 = (n: number): number => Math.round(n * 100) / 100;

/** Weapon DPS = damage per shot * shots per second. */
export const computeDps = (damage: number, fireRate: number): number => round2(damage * fireRate);

/** Abilities that contribute a "real" cooldown (exclude weapon, passive, ultimate). */
const cooldownAbilities = (h: SupportHero): Ability[] =>
  h.abilities.filter(
    (a) => a.kind === 'ability' && typeof a.cooldown === 'number' && a.cooldown > 0,
  );

/** Lowest cooldown among non-ultimate abilities. Returns 0 if none. */
export const minCooldown = (h: SupportHero): number => {
  const cds = cooldownAbilities(h).map((a) => a.cooldown as number);
  return cds.length ? Math.min(...cds) : 0;
};

/** Average cooldown among non-ultimate abilities. Returns 0 if none. */
export const avgCooldown = (h: SupportHero): number => {
  const cds = cooldownAbilities(h).map((a) => a.cooldown as number);
  if (!cds.length) return 0;
  return round2(cds.reduce((sum, c) => sum + c, 0) / cds.length);
};

const DIFFICULTY_SCORE: Record<Difficulty, number> = { Easy: 1, Medium: 2, Hard: 3 };

export interface HeroMetrics {
  /** Weapon damage per second. */
  dps: number;
  /** Peak single-target healing per second. */
  hps: number;
  /** Effective health = health + armor + shield. */
  effectiveHp: number;
  /** Ultimate charge cost (lower = more available). */
  ultCost: number;
  /** Average non-ultimate ability cooldown (lower = more available). */
  avgCooldown: number;
  /** Easy=1, Medium=2, Hard=3. */
  difficultyScore: number;
}

/** Flatten a hero into the comparable scalar metrics used by charts. */
export const heroMetrics = (h: SupportHero): HeroMetrics => ({
  dps: h.weapon.dps,
  hps: h.healing.peakHps,
  effectiveHp: h.survivability.total,
  ultCost: h.ultimate.cost,
  avgCooldown: avgCooldown(h),
  difficultyScore: DIFFICULTY_SCORE[h.difficulty],
});

/** Human-readable labels for each metric, used in selectors and legends. */
export const METRIC_LABELS: Record<keyof HeroMetrics, string> = {
  dps: 'Damage / sec',
  hps: 'Healing / sec',
  effectiveHp: 'Effective HP',
  ultCost: 'Ult cost',
  avgCooldown: 'Avg cooldown',
  difficultyScore: 'Difficulty',
};

/** Units appended to raw values in tables/bar charts. */
export const METRIC_UNITS: Partial<Record<keyof HeroMetrics, string>> = {
  avgCooldown: 's',
};
