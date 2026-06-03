import { describe, expect, it } from 'vitest';
import { heroById, heroes } from './index';
import { isValidSupportHero } from '@/types/validate';
import { computeDps } from '@/utils/stats';

describe('hero roster data integrity', () => {
  it('contains exactly 12 support heroes', () => {
    expect(heroes).toHaveLength(12);
  });

  it('has unique, lowercase, slug-style ids', () => {
    const ids = heroes.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toBe(id.toLowerCase());
      expect(id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('builds a heroById map covering every hero', () => {
    expect(Object.keys(heroById)).toHaveLength(heroes.length);
    for (const h of heroes) {
      expect(heroById[h.id]).toBe(h);
    }
  });

  describe.each(heroes.map((h) => [h.name, h] as const))('%s', (_name, hero) => {
    it('passes the runtime schema guard', () => {
      expect(isValidSupportHero(hero)).toBe(true);
    });

    it('has a consistent survivability total', () => {
      const { health, armor, shield, total } = hero.survivability;
      expect(total).toBe(health + armor + shield);
    });

    it('stores a weapon dps equal to damage * fireRate', () => {
      expect(hero.weapon.dps).toBeCloseTo(computeDps(hero.weapon.damage, hero.weapon.fireRate), 2);
    });

    it('has a non-empty portrait path', () => {
      expect(hero.portrait.length).toBeGreaterThan(0);
    });

    it('has exactly one ultimate ability matching the ultimate block', () => {
      const ults = hero.abilities.filter((a) => a.kind === 'ultimate');
      expect(ults).toHaveLength(1);
      expect(ults[0].name).toBe(hero.ultimate.name);
    });

    it('keeps weapon-ability per-second values consistent with the weapon block', () => {
      const weaponAbility = hero.abilities.find((a) => a.kind === 'weapon');
      if (weaponAbility?.dps !== undefined) {
        expect(weaponAbility.dps).toBeCloseTo(hero.weapon.dps, 2);
      }
      if (weaponAbility?.hps !== undefined) {
        expect(weaponAbility.hps).toBeCloseTo(hero.weapon.hps ?? NaN, 2);
      }
    });

    it('has non-negative per-second values on every ability', () => {
      for (const a of hero.abilities) {
        if (a.dps !== undefined) expect(a.dps).toBeGreaterThanOrEqual(0);
        if (a.hps !== undefined) expect(a.hps).toBeGreaterThanOrEqual(0);
      }
      if (hero.weapon.hps !== undefined) expect(hero.weapon.hps).toBeGreaterThanOrEqual(0);
    });
  });
});
