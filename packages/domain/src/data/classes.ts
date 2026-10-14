import type { CharacterClass } from '../features/character';

/**
 * Character classes a diagnosis can choose, in tie-break priority order.
 *
 * Every class has the same total weight (5) so that no class wins just by having larger weights.
 */
export const CHARACTER_CLASSES = [
  {
    id: 'warrior',
    name: '戦士',
    description: '鍛えた肉体と武器で前線に立ち、仲間を守る戦い手。',
    weights: { strength: 3, vitality: 2 },
    skillIds: ['power-strike', 'iron-wall', 'whirlwind-slash', 'war-cry'],
  },
  {
    id: 'mage',
    name: '魔法使い',
    description: '知識と魔力を武器に、強力な魔法を操る術者。',
    weights: { intelligence: 5 },
    skillIds: ['fireball', 'blizzard', 'mana-shield', 'quick-cast'],
  },
  {
    id: 'cleric',
    name: '僧侶',
    description: '祈りの力で仲間を癒やし、守り支える聖職者。',
    weights: { vitality: 3, intelligence: 2 },
    skillIds: ['heal', 'holy-light', 'sanctuary', 'blessing'],
  },
  {
    id: 'thief',
    name: '盗賊',
    description: '素早い身のこなしと幸運で、どんな窮地もすり抜ける。',
    weights: { agility: 3, luck: 2 },
    skillIds: ['steal', 'backstab', 'smoke-bomb', 'lockpick'],
  },
  {
    id: 'hunter',
    name: '狩人',
    description: '鋭い目と確かな腕で、遠くの獲物も逃さない射手。',
    weights: { dexterity: 3, agility: 2 },
    skillIds: ['aimed-shot', 'arrow-rain', 'snare-trap', 'beast-call'],
  },
  {
    id: 'jester',
    name: '遊び人',
    description: '何事も運任せ。それでもなぜか上手くいく強運の持ち主。',
    weights: { luck: 5 },
    skillIds: ['lucky-dice', 'juggling', 'odd-dance', 'all-in'],
  },
] satisfies CharacterClass[];
