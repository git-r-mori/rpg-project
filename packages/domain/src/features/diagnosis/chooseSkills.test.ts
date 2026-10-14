import { describe, expect, it } from 'vitest';
import { buildStatRecord } from '../character';
import type { Stats } from '../character';
import {
  TEST_FIGHTER as fighter,
  TEST_SCHOLAR as scholar,
  TEST_SKILLS,
} from '../../testing/fixtures';
import { chooseSkills } from './chooseSkills';

const stats = (overrides: Partial<Stats>) => ({
  ...buildStatRecord(() => 50),
  ...overrides,
});

const ids = (skills: readonly { id: string }[]) => skills.map(({ id }) => id);

describe('chooseSkills', () => {
  it('chooses the three candidates with the highest stats, highest first', () => {
    const result = chooseSkills(
      stats({ strength: 10, vitality: 90, agility: 70, luck: 80 }),
      fighter,
      TEST_SKILLS,
    );
    expect(ids(result)).toEqual(['guard', 'lucky-hit', 'dash']);
  });

  it('keeps the candidate order on a tie', () => {
    expect(ids(chooseSkills(stats({}), fighter, TEST_SKILLS))).toEqual(['slash', 'guard', 'dash']);
  });

  it('can choose several skills tied to the same stat', () => {
    const result = chooseSkills(
      stats({ intelligence: 90, vitality: 10, luck: 10 }),
      scholar,
      TEST_SKILLS,
    );
    expect(ids(result)).toEqual(['spark', 'study', 'guard']);
  });

  it('throws when a candidate skill does not exist', () => {
    const broken = { ...fighter, skillIds: ['slash', 'guard', 'missing-skill'] };
    expect(() => chooseSkills(stats({}), broken, TEST_SKILLS)).toThrow(/missing-skill/);
  });
});
