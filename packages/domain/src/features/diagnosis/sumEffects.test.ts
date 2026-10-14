import { describe, expect, it } from 'vitest';
import type { StatKey } from '../character';
import { sumEffects } from './sumEffects';

const option = (effects: Partial<Record<StatKey, number>>) => ({ id: 'a', text: 'A', effects });

describe('sumEffects', () => {
  it('returns zero for every stat when there are no options', () => {
    expect(sumEffects([])).toEqual({
      strength: 0,
      intelligence: 0,
      vitality: 0,
      agility: 0,
      dexterity: 0,
      luck: 0,
    });
  });

  it('adds effects per stat, including negative ones', () => {
    const totals = sumEffects([
      option({ strength: 2, luck: 1 }),
      option({ strength: -1, agility: 3 }),
    ]);
    expect(totals).toEqual({
      strength: 1,
      intelligence: 0,
      vitality: 0,
      agility: 3,
      dexterity: 0,
      luck: 1,
    });
  });
});
