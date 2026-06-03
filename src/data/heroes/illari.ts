import type { SupportHero } from '@/types/hero';

export const illari: SupportHero = {
  id: 'illari',
  name: 'Illari',
  role: 'support',
  difficulty: 'Medium',
  releaseYear: 2023,
  portrait: '/portraits/illari.svg',

  survivability: { health: 250, armor: 0, shield: 0, total: 250 },

  weapon: {
    name: 'Solar Rifle',
    type: 'hitscan',
    damage: 65,
    fireRate: 1.3,
    dps: 84.5,
    hps: 78,
    magazine: 16,
    reload: 1.4,
  },

  healing: {
    primaryType: 'over-time',
    peakHps: 78,
    notes: 'Solar Rifle alt-fire is a charged healing beam (~78/s). Healing Pylon auto-heals nearby allies for 30/s.',
  },

  abilities: [
    {
      name: 'Solar Rifle',
      kind: 'weapon',
      description: 'Primary fire is a charged damaging shot. Alternate fire heals allies with a beam.',
      damage: 65,
      dps: 84.5,
      hps: 78,
      healingType: 'beam',
      dataConfidence: 'approximate',
    },
    {
      name: 'Healing Pylon',
      kind: 'ability',
      description: 'Deploys a pylon that automatically heals nearby allies until destroyed or redeployed.',
      cooldown: 7,
      hps: 30,
      healingType: 'over-time',
      dataConfidence: 'confirmed',
    },
    {
      name: 'Outburst',
      kind: 'ability',
      description: 'Launches Illari in her movement direction and knocks back nearby enemies.',
      cooldown: 9,
      dataConfidence: 'approximate',
    },
    {
      name: 'Captive Sun',
      kind: 'ultimate',
      description: 'Fires an explosive ball of energy that damages, slows and marks enemies; marked enemies explode when taking further damage.',
      ultCost: 1700,
      damage: 120,
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Captive Sun',
    cost: 1700,
    effect: 'Damages and slows enemies in an area, marking them to explode when they take additional damage.',
  },
};
