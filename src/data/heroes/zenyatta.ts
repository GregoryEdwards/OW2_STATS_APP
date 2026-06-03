import type { SupportHero } from '@/types/hero';

export const zenyatta: SupportHero = {
  id: 'zenyatta',
  name: 'Zenyatta',
  role: 'support',
  difficulty: 'Hard',
  releaseYear: 2016,
  portrait: '/portraits/zenyatta.svg',

  survivability: { health: 75, armor: 0, shield: 175, total: 250 },

  weapon: {
    name: 'Orb of Destruction',
    type: 'projectile',
    damage: 48,
    fireRate: 1.25,
    dps: 60,
    magazine: 25,
    reload: 0,
  },

  healing: {
    primaryType: 'over-time',
    peakHps: 30,
    notes: 'Orb of Harmony attaches to an ally for continuous healing. Orb of Discord amplifies damage taken by a marked enemy.',
  },

  abilities: [
    {
      name: 'Orb of Destruction',
      kind: 'weapon',
      description: 'Fires orbs of energy. Hold to charge and release a volley of several orbs.',
      damage: 48,
      dps: 60,
      dataConfidence: 'approximate',
    },
    {
      name: 'Orb of Harmony',
      kind: 'ability',
      description: 'Attaches a healing orb to an ally, healing them over time while in line of sight.',
      hps: 30,
      healingType: 'over-time',
      dataConfidence: 'approximate',
    },
    {
      name: 'Orb of Discord',
      kind: 'ability',
      description: 'Marks an enemy, increasing the damage they take from all sources.',
      dataConfidence: 'confirmed',
    },
    {
      name: 'Snap Kick',
      kind: 'passive',
      description: 'Zenyatta’s melee strikes knock enemies back.',
      damage: 45,
      dataConfidence: 'approximate',
    },
    {
      name: 'Transcendence',
      kind: 'ultimate',
      description: 'Become invulnerable and move faster while pouring out powerful area healing to nearby allies.',
      ultCost: 1600,
      duration: 6,
      hps: 300,
      healingType: 'aura',
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Transcendence',
    cost: 1600,
    duration: 6,
    effect: 'Zenyatta becomes invulnerable and massively heals all nearby allies for the duration.',
  },
};
