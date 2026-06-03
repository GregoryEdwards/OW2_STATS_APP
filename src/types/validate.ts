import type { Difficulty, SupportHero } from './hero';

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

const isNonNegativeNumber = (v: unknown): v is number =>
  typeof v === 'number' && Number.isFinite(v) && v >= 0;

const isNonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.length > 0;

/**
 * Runtime guard used by the data-integrity tests. Confirms a candidate object
 * conforms to the SupportHero contract, including cross-field invariants:
 *  - survivability.total equals health + armor + shield
 *  - exactly one ability has kind 'ultimate'
 *  - the ultimate ability's ultCost matches ultimate.cost
 */
export function isValidSupportHero(value: unknown): value is SupportHero {
  if (typeof value !== 'object' || value === null) return false;
  const h = value as Record<string, unknown>;

  if (!isNonEmptyString(h.id) || h.id !== (h.id as string).toLowerCase()) return false;
  if (!isNonEmptyString(h.name)) return false;
  if (h.role !== 'support') return false;
  if (!DIFFICULTIES.includes(h.difficulty as Difficulty)) return false;
  if (!isNonNegativeNumber(h.releaseYear)) return false;
  if (!isNonEmptyString(h.portrait)) return false;

  // Survivability
  const s = h.survivability as Record<string, unknown> | undefined;
  if (!s) return false;
  if (
    !isNonNegativeNumber(s.health) ||
    !isNonNegativeNumber(s.armor) ||
    !isNonNegativeNumber(s.shield) ||
    !isNonNegativeNumber(s.total)
  ) {
    return false;
  }
  if (s.total !== (s.health as number) + (s.armor as number) + (s.shield as number)) return false;

  // Weapon
  const w = h.weapon as Record<string, unknown> | undefined;
  if (!w) return false;
  if (
    !isNonEmptyString(w.name) ||
    !isNonNegativeNumber(w.damage) ||
    !isNonNegativeNumber(w.fireRate) ||
    !isNonNegativeNumber(w.dps)
  ) {
    return false;
  }

  // Healing summary
  const heal = h.healing as Record<string, unknown> | undefined;
  if (!heal || !isNonEmptyString(heal.primaryType) || !isNonNegativeNumber(heal.peakHps)) {
    return false;
  }

  // Abilities
  if (!Array.isArray(h.abilities) || h.abilities.length === 0) return false;
  const ultimates = (h.abilities as Array<Record<string, unknown>>).filter(
    (a) => a.kind === 'ultimate',
  );
  if (ultimates.length !== 1) return false;

  // Ultimate block consistency
  const ult = h.ultimate as Record<string, unknown> | undefined;
  if (!ult || !isNonEmptyString(ult.name) || !isNonNegativeNumber(ult.cost)) return false;
  if (ultimates[0].ultCost !== undefined && ultimates[0].ultCost !== ult.cost) return false;

  return true;
}
