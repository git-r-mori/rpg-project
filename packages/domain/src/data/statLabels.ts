import type { StatKey } from '../features/character';

/** Japanese display label for each stat. */
export const STAT_LABELS = {
  strength: '力',
  intelligence: '知力',
  vitality: '体力',
  agility: '素早さ',
  dexterity: '器用さ',
  luck: '運',
} as const satisfies Record<StatKey, string>;
