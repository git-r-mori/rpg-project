import { describe, expect, it } from 'vitest';
import { hasNoDuplicates, IdSchema } from './id';

describe('IdSchema', () => {
  it.each(['warrior', 'fire-ball', 'q1', 'a-1-b'])('accepts the kebab-case id %s', (id) => {
    expect(IdSchema.safeParse(id).success).toBe(true);
  });

  it.each(['', 'Warrior', '1st', 'fire_ball', '-fire', 'fire-', 'fire--ball', 'ファイア'])(
    'rejects the malformed id %j',
    (id) => {
      expect(IdSchema.safeParse(id).success).toBe(false);
    },
  );
});

describe('hasNoDuplicates', () => {
  it('returns true for an empty list', () => {
    expect(hasNoDuplicates([])).toBe(true);
  });

  it('returns true when every value is distinct', () => {
    expect(hasNoDuplicates(['a', 'b', 'c'])).toBe(true);
  });

  it('returns false when a value appears twice', () => {
    expect(hasNoDuplicates(['a', 'b', 'a'])).toBe(false);
  });
});
