import { describe, expect, it } from 'vitest';
import { CharacterSchema } from '../character';
import { TEST_DATA } from '../../testing/fixtures';
import { diagnose } from './diagnose';

const answers = (q1: string, q2: string) => [
  { questionId: 'q1', optionId: q1 },
  { questionId: 'q2', optionId: q2 },
];

describe('diagnose', () => {
  it('builds a strength character from strength answers', () => {
    expect(diagnose(answers('a', 'a'), TEST_DATA)).toEqual({
      classId: 'fighter',
      stats: { strength: 100, intelligence: 1, vitality: 100, agility: 51, dexterity: 51, luck: 1 },
      skillIds: ['slash', 'guard', 'dash'],
    });
  });

  it('builds an intelligence character from intelligence answers', () => {
    const character = diagnose(answers('b', 'b'), TEST_DATA);
    expect(character.classId).toBe('scholar');
    expect(character.skillIds).toEqual(['spark', 'study', 'guard']);
  });

  it('returns the same character for the same answers', () => {
    expect(diagnose(answers('c', 'b'), TEST_DATA)).toEqual(diagnose(answers('c', 'b'), TEST_DATA));
  });

  it('returns a character that satisfies the schema', () => {
    expect(CharacterSchema.safeParse(diagnose(answers('c', 'c'), TEST_DATA)).success).toBe(true);
  });

  it('throws when the answers are incomplete', () => {
    expect(() => diagnose([{ questionId: 'q1', optionId: 'a' }], TEST_DATA)).toThrow();
  });
});
