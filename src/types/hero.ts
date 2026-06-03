/**
 * Core data model for the Overwatch 2 support stats app.
 *
 * A hero's kit is modeled as a flat `abilities[]` array where every numeric
 * field is optional. This lets disparate kits — burst healers (Ana, Kiriko),
 * beam healers (Mercy, Moira), aura healers (Lúcio), and heal-over-time pylons
 * (Illari) — all share one shape. Summary blocks (`weapon`, `healing`,
 * `ultimate`) surface the canonical headline numbers used in comparisons.
 */

export type Role = 'support';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type WeaponType =
  | 'hitscan'
  | 'projectile'
  | 'beam'
  | 'melee'
  | 'healing-projectile'
  | 'healing-beam'
  | 'hybrid';

export type HealingType =
  | 'burst' // discrete heal per cast (Ana grenade, Kiriko)
  | 'beam' // continuous targeted (Mercy staff, Moira primary)
  | 'aura' // area over time (Lúcio, Juno torpedoes)
  | 'projectile' // travel-time heal (Ana rifle, Baptiste)
  | 'over-time' // heal-over-time (Illari pylon, Lifeweaver blossom, Zen orb)
  | 'none';

export type AbilityKind = 'weapon' | 'ability' | 'passive' | 'ultimate' | 'secondary-fire';

export type DataConfidence = 'confirmed' | 'approximate';

/**
 * A single entry in a hero's kit. All numeric fields are optional so that
 * disparate kits fit: a pure-damage ability omits healing; a pure-heal omits
 * damage. `dataConfidence` flags wiki values we are less sure about.
 */
export interface Ability {
  name: string;
  kind: AbilityKind;
  description: string;
  /** Cooldown in seconds. undefined => no cooldown (weapon/passive/ult). */
  cooldown?: number;
  /** Direct/burst damage applied per cast or per shot. */
  damage?: number;
  /** Direct/burst healing applied per cast. */
  healing?: number;
  /** Healing per second for sustained sources (beams, auras, HoTs). */
  hps?: number;
  /** Damage per second for sustained damage sources. */
  dps?: number;
  /** Effect/active duration in seconds (auras, walls, HoTs, ults). */
  duration?: number;
  /** Ult cost in charge points (only meaningful when kind === 'ultimate'). */
  ultCost?: number;
  healingType?: HealingType;
  dataConfidence?: DataConfidence;
}

export interface Survivability {
  health: number;
  armor: number;
  shield: number;
  /** Convenience total = health + armor + shield. */
  total: number;
}

export interface Weapon {
  name: string;
  type: WeaponType;
  /** Damage per shot/tick. */
  damage: number;
  /** Shots (or ticks) per second. Used to derive DPS. */
  fireRate: number;
  /** Derived = damage * fireRate (precomputed for display; verified by tests). */
  dps: number;
  /** Healing per second the weapon outputs on allies, if it heals. */
  hps?: number;
  /** Magazine size; undefined for beam/ammo-less weapons. */
  magazine?: number;
  /** Reload time in seconds. */
  reload?: number;
}

export interface HealingSummary {
  /** Primary healing classification for filtering/legend. */
  primaryType: HealingType;
  /** Best-case sustained single-target HPS this hero can output. */
  peakHps: number;
  /** Short note on how healing works (e.g. "beam, line-of-sight required"). */
  notes?: string;
}

export interface Ultimate {
  name: string;
  /** Charge cost in points. Lower = more frequently available. */
  cost: number;
  effect: string;
  /** Duration in seconds, if applicable. */
  duration?: number;
}

export interface SupportHero {
  /** Slug id, e.g. "ana", "lucio", "wuyang". */
  id: string;
  /** Display name, e.g. "Lúcio". */
  name: string;
  role: Role;
  difficulty: Difficulty;
  releaseYear: number;
  /** Path under /portraits, e.g. "/portraits/ana.svg". */
  portrait: string;

  survivability: Survivability;
  weapon: Weapon;
  healing: HealingSummary;

  /** Full kit. Always includes the ultimate (kind: 'ultimate'). */
  abilities: Ability[];
  ultimate: Ultimate;
}
