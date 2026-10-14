import { describe, expect, it } from 'vitest';
import { TEST_QUESTIONS } from '../../testing/fixtures';
import { statRanges } from './statRanges';

describe('statRanges', () => {
  it('sums the smallest and largest effect of each question per stat', () => {
    expect(statRanges(TEST_QUESTIONS)).toEqual({
      min: { strength: -1, intelligence: 0, vitality: 0, agility: 0, dexterity: 0, luck: 0 },
      max: { strength: 3, intelligence: 3, vitality: 1, agility: 0, dexterity: 0, luck: 1 },
    });
  });

  it('returns zero ranges when there are no questions', () => {
    const zero = { strength: 0, intelligence: 0, vitality: 0, agility: 0, dexterity: 0, luck: 0 };
    expect(statRanges([])).toEqual({ min: zero, max: zero });
  });
});
