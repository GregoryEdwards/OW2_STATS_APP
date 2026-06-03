import type { SupportHero } from '@/types/hero';

export const moira: SupportHero = {
  id: 'moira',
  name: 'Moira',
  role: 'support',
  difficulty: 'Easy',
  releaseYear: 2017,
  portrait: '/portraits/moira.svg',

  survivability: { health: 250, armor: 0, shield: 0, total: 250 },

  weapon: {
    name: 'Biotic Grasp',
    type: 'beam',
    damage: 50,
    fireRate: 1,
    dps: 50,
    hps: 70,
  },

  healing: {
    primaryType: 'beam',
    peakHps: 70,
    notes: 'Right-hand spray heals allies using a regenerating biotic energy resource; left-hand beam damages enemies and refills it.',
  },

  abilities: [
    {
      name: 'Biotic Grasp',
      kind: 'weapon',
      description: 'Primary fire heals allies in a short-range cone (uses biotic energy). Secondary fire is a lock-on damage beam that restores energy.',
      damage: 50,
      dps: 50,
      hps: 70,
      healingType: 'beam',
      dataConfidence: 'approximate',
    },
    {
      name: 'Biotic Orb',
      kind: 'ability',
      description: 'Launches a bouncing orb set to either heal allies or damage enemies it passes through.',
      cooldown: 8,
      healing: 200,
      damage: 200,
      healingType: 'over-time',
      dataConfidence: 'approximate',
    },
    {
      name: 'Fade',
      kind: 'ability',
      description: 'Quickly teleport a short distance while becoming briefly invulnerable.',
      cooldown: 6,
      dataConfidence: 'confirmed',
    },
    {
      name: 'Coalescence',
      kind: 'ultimate',
      description: 'Fires a long beam that heals allies and damages enemies it passes through.',
      ultCost: 1530,
      duration: 8,
      hps: 140,
      damage: 70,
      healingType: 'beam',
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Coalescence',
    cost: 1530,
    duration: 8,
    effect: 'Channels a piercing beam that simultaneously heals allies and damages enemies along its length.',
  },

  strategies: [
    {
      title: 'Orb before Coalescence',
      detail:
        'Throw a Biotic Orb (heal or damage) right before ulting — it adds free value alongside the Coalescence beam.',
      category: 'damage',
    },
    {
      title: 'Damage to fuel healing',
      detail:
        'Use the damage orb and lock-on beam to refill Biotic Energy — dealing damage is what lets you keep healing.',
      category: 'healing',
    },
    {
      title: 'Bounce orbs, Fade defensively',
      detail:
        'Launch orbs in enclosed spaces so they linger on a target. Save Fade to dodge hooks/flashbangs, and jump as you exit Fade for extra distance.',
      category: 'utility',
    },
  ],
};
