import type { SupportHero } from '@/types/hero';

export const kiriko: SupportHero = {
  id: 'kiriko',
  name: 'Kiriko',
  role: 'support',
  difficulty: 'Hard',
  releaseYear: 2022,
  portrait: '/portraits/kiriko.svg',

  survivability: { health: 225, armor: 0, shield: 0, total: 225 },

  weapon: {
    name: 'Kunai',
    type: 'projectile',
    damage: 45,
    fireRate: 2,
    dps: 90,
    magazine: 15,
    reload: 0.7,
  },

  healing: {
    primaryType: 'projectile',
    peakHps: 65,
    notes: 'Healing Ofuda are homing healing talismans. Kunai deal high single-target burst with a headshot multiplier.',
  },

  abilities: [
    {
      name: 'Kunai',
      kind: 'weapon',
      description: 'Throws kunai that deal high damage and critical headshot damage.',
      damage: 45,
      dataConfidence: 'approximate',
    },
    {
      name: 'Healing Ofuda',
      kind: 'secondary-fire',
      description: 'Sends a volley of homing talismans that heal an ally.',
      healing: 65,
      healingType: 'projectile',
      dataConfidence: 'approximate',
    },
    {
      name: 'Swift Step',
      kind: 'ability',
      description: 'Teleports to a targeted ally, briefly becoming invulnerable.',
      cooldown: 7,
      dataConfidence: 'confirmed',
    },
    {
      name: 'Protection Suzu',
      kind: 'ability',
      description: 'Throws a bell that briefly makes nearby allies invulnerable and cleanses debuffs.',
      cooldown: 14,
      healing: 50,
      healingType: 'burst',
      dataConfidence: 'approximate',
    },
    {
      name: 'Kitsune Rush',
      kind: 'ultimate',
      description: 'Summons a fox spirit that speeds up allies and boosts their attack and cooldown rate.',
      ultCost: 1800,
      duration: 7,
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Kitsune Rush',
    cost: 1800,
    duration: 7,
    effect: 'Creates a path that increases allied movement speed, attack speed and cooldown recovery.',
  },
};
