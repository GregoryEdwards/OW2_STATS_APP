import type { SupportHero } from '@/types/hero';

/**
 * Wuyang is a newer water-based support; ability numbers are best-known
 * approximations and flagged accordingly until confirmed against a stable patch.
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
    name: 'Xuanwu Staff',
    type: 'projectile',
    damage: 14,
    fireRate: 5,
    dps: 70,
    magazine: 60,
    reload: 1.3,
  },

  healing: {
    primaryType: 'over-time',
    peakHps: 70,
    notes: 'Xuanwu Staff fires curveable water orbs for damage; Restorative Stream places a passive healing stream on an ally. Numbers are approximate pending a stable patch.',
  },

  abilities: [
    {
      name: 'Xuanwu Staff',
      kind: 'weapon',
      description: 'Fires water orbs that can be steered mid-flight to curve around cover; empowered orbs deal splash damage and knockback.',
      damage: 14,
      dps: 70,
      dataConfidence: 'approximate',
    },
    {
      name: 'Restorative Stream',
      kind: 'secondary-fire',
      description: 'Places a passive healing stream on an ally that heals them without needing to hold the beam on them.',
      hps: 70,
      healingType: 'over-time',
      dataConfidence: 'approximate',
    },
    {
      name: 'Guardian Wave',
      kind: 'ability',
      description: 'Sends a wave that damages and knocks back enemies, heals allies, and boosts their healing received by 50% for 3s.',
      cooldown: 12,
      damage: 40,
      healing: 60,
      duration: 3,
      healingType: 'burst',
      dataConfidence: 'approximate',
    },
    {
      name: 'Rushing Torrent',
      kind: 'ability',
      description: 'Surf on a water current for greatly increased movement speed and jump height to reposition or escape.',
      cooldown: 7,
      dataConfidence: 'approximate',
    },
    {
      name: 'Tidal Blast',
      kind: 'ultimate',
      description: 'Encases Wuyang or an ally in a water shield that detonates after a short delay, knocking down nearby enemies and massively healing the protected ally.',
      ultCost: 1700,
      healing: 300,
      healingType: 'burst',
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Tidal Blast',
    cost: 1700,
    effect: 'Shields Wuyang or an ally, then detonates to knock down surrounding enemies and burst-heal the protected target — can cancel enemy ultimates.',
  },

  strategies: [
    {
      title: 'Place Restorative Stream and leave it',
      detail:
        'Drop the passive healing stream on an ally and move on — spread heals around the team while you weave in damage instead of hard-pocketing.',
      category: 'healing',
    },
    {
      title: 'Damage to boost your healing',
      detail:
        'Landing water-orb damage powers up your stream healing (Balance perk). Curve orbs around cover to hit targets you can’t see directly.',
      category: 'damage',
    },
    {
      title: 'Tidal Blast saves and cancels',
      detail:
        'The ult’s shield + knockdown can cancel enemy ultimates and save a key ally — pair the knockdown with divers like Tracer, Sombra or Junker Queen.',
      category: 'utility',
    },
  ],
};
