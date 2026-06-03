import type { SupportHero } from '@/types/hero';

export const baptiste: SupportHero = {
  id: 'baptiste',
  name: 'Baptiste',
  role: 'support',
  difficulty: 'Medium',
  releaseYear: 2019,
  portrait: '/portraits/baptiste.svg',

  survivability: { health: 250, armor: 0, shield: 0, total: 250 },

  weapon: {
    name: 'Biotic Launcher',
    type: 'hybrid',
    damage: 25,
    fireRate: 3,
    dps: 75,
    magazine: 27,
    reload: 1.5,
  },

  healing: {
    primaryType: 'projectile',
    peakHps: 70,
    notes: 'Primary fire is a 3-round burst of damage; alt-fire lobs healing grenades. Regenerative Burst adds AoE heal-over-time.',
  },

  abilities: [
    {
      name: 'Biotic Launcher',
      kind: 'weapon',
      description: 'Three-round burst rifle (damage). Alternate fire lobs healing projectiles to allies.',
      damage: 25,
      dps: 75,
      dataConfidence: 'confirmed',
    },
    {
      name: 'Healing Grenade',
      kind: 'secondary-fire',
      description: 'Alternate fire that heals allies in a small area on impact.',
      healing: 60,
      healingType: 'projectile',
      dataConfidence: 'approximate',
    },
    {
      name: 'Regenerative Burst',
      kind: 'ability',
      description: 'Heals Baptiste and nearby allies over a few seconds.',
      cooldown: 13,
      hps: 30,
      duration: 5,
      healingType: 'over-time',
      dataConfidence: 'approximate',
    },
    {
      name: 'Immortality Field',
      kind: 'ability',
      description: 'Deploys a device that prevents allies inside its radius from dying.',
      cooldown: 25,
      duration: 8,
      dataConfidence: 'confirmed',
    },
    {
      name: 'Exo Boots',
      kind: 'passive',
      description: 'Hold crouch to charge a powerful vertical jump.',
      dataConfidence: 'confirmed',
    },
    {
      name: 'Amplification Matrix',
      kind: 'ultimate',
      description: 'Projects a matrix that doubles the damage and healing of allied projectiles passing through it.',
      ultCost: 1700,
      duration: 8,
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Amplification Matrix',
    cost: 1700,
    duration: 8,
    effect: 'Doubles damage and healing of allied shots fired through the matrix window.',
  },

  strategies: [
    {
      title: 'Amp Matrix + hitscan/Bastion',
      detail:
        'Amplification Matrix doubles the damage of shots fired through it — coordinate with Soldier, Ashe or Bastion before deploying for a team-wipe window.',
      category: 'damage',
    },
    {
      title: 'Double your healing through the Matrix',
      detail:
        'The Matrix also doubles healing — fire your healing lobs (or an ally Ana grenade) through it to swing a losing fight.',
      category: 'healing',
    },
    {
      title: 'Hold Immortality for lethal moments',
      detail:
        'Don’t burn Immortality Field at fight start. Save it to counter burst ults, and place the device around a corner so enemies can’t shoot it.',
      category: 'utility',
    },
  ],
};
