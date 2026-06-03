import type { SupportHero } from '@/types/hero';

/**
 * Wuyang is a newer support hero; ability numbers are best-known approximations
 * and flagged accordingly until confirmed against a stable patch.
 */
export const wuyang: SupportHero = {
  id: 'wuyang',
  name: 'Wuyang',
  role: 'support',
  difficulty: 'Medium',
  releaseYear: 2025,
  portrait: '/portraits/wuyang.svg',

  survivability: { health: 250, armor: 0, shield: 0, total: 250 },

  weapon: {
    name: 'Water Gauntlet',
    type: 'projectile',
    damage: 14,
    fireRate: 5,
    dps: 70,
    magazine: 60,
    reload: 1.3,
  },

  healing: {
    primaryType: 'beam',
    peakHps: 70,
    notes: 'Channels water currents to heal allies and damage enemies. Numbers are approximate pending a stable patch.',
  },

  abilities: [
    {
      name: 'Water Gauntlet',
      kind: 'weapon',
      description: 'Streams water that heals allies and damages enemies it is aimed at.',
      damage: 14,
      healing: 14,
      healingType: 'beam',
      dataConfidence: 'approximate',
    },
    {
      name: 'Riptide',
      kind: 'ability',
      description: 'Releases a wave that heals allies and pushes enemies.',
      cooldown: 10,
      healing: 90,
      healingType: 'burst',
      dataConfidence: 'approximate',
    },
    {
      name: 'Surging Current',
      kind: 'ability',
      description: 'Dash along a water current, repositioning quickly.',
      cooldown: 7,
      dataConfidence: 'approximate',
    },
    {
      name: 'Tidal Wave',
      kind: 'ultimate',
      description: 'Summons a great wave that heals allies and sweeps enemies away.',
      ultCost: 1700,
      duration: 6,
      hps: 80,
      healingType: 'aura',
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Tidal Wave',
    cost: 1700,
    duration: 6,
    effect: 'A massive wave that heals allies in its path and knocks back enemies.',
  },
};
