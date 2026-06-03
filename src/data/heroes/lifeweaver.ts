import type { SupportHero } from '@/types/hero';

export const lifeweaver: SupportHero = {
  id: 'lifeweaver',
  name: 'Lifeweaver',
  role: 'support',
  difficulty: 'Hard',
  releaseYear: 2023,
  portrait: '/portraits/lifeweaver.svg',

  survivability: { health: 250, armor: 0, shield: 0, total: 250 },

  weapon: {
    name: 'Healing Blossom',
    type: 'healing-projectile',
    damage: 0,
    fireRate: 0,
    dps: 0,
    hps: 70,
    magazine: 0,
    reload: 0,
  },

  healing: {
    primaryType: 'over-time',
    peakHps: 70,
    notes: 'Charges Healing Blossom for a big burst heal, or rapid-fires Thorn Volley for damage. Tree of Life provides massive area healing.',
  },

  abilities: [
    {
      name: 'Healing Blossom',
      kind: 'weapon',
      description: 'Charge and release a healing burst onto an ally. Charges fully in about one second.',
      healing: 70,
      hps: 70,
      healingType: 'over-time',
      dataConfidence: 'approximate',
    },
    {
      name: 'Thorn Volley',
      kind: 'secondary-fire',
      description: 'Fires a rapid volley of damaging thorns.',
      damage: 9,
      dps: 120,
      dataConfidence: 'approximate',
    },
    {
      name: 'Life Grip',
      kind: 'ability',
      description: 'Pulls a targeted ally to your location, saving them from danger.',
      cooldown: 19,
      dataConfidence: 'confirmed',
    },
    {
      name: 'Petal Platform',
      kind: 'ability',
      description: 'Deploys a platform that rises when stepped on, granting elevation.',
      cooldown: 13,
      dataConfidence: 'approximate',
    },
    {
      name: 'Rejuvenating Dash',
      kind: 'ability',
      description: 'Quickly dash in your movement direction, healing yourself.',
      cooldown: 5,
      healing: 25,
      dataConfidence: 'approximate',
    },
    {
      name: 'Tree of Life',
      kind: 'ultimate',
      description: 'Plants a large tree that heals all nearby allies in a wide radius.',
      ultCost: 1800,
      duration: 12,
      hps: 75,
      healingType: 'over-time',
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Tree of Life',
    cost: 1800,
    duration: 12,
    effect: 'Spawns a tree that pulses healing and grants an initial burst heal to nearby allies.',
  },
};
