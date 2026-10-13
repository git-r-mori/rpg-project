import { describe, expect, it } from 'vitest';
import { CharacterSchema } from './character';
import { STAT_KEYS } from './stats';

const validCharacter = {
  classId: 'warrior',
  stats: Object.fromEntries(STAT_KEYS.map((key) => [key, 50])),
  skillIds: ['power-strike', 'iron-wall', 'war-cry'],
};

describe('CharacterSchema', () => {
  it('accepts a valid character', () => {
    expect(CharacterSchema.safeParse(validCharacter).success).toBe(true);
  });

  it('rejects a malformed class id', () => {
    expect(CharacterSchema.safeParse({ ...validCharacter, classId: '' }).success).toBe(false);
  });

  it('rejects invalid stats', () => {
    const stats = { ...validCharacter.stats, luck: 0 };
    expect(CharacterSchema.safeParse({ ...validCharacter, stats }).success).toBe(false);
  });

  it.each([
    ['two', ['power-strike', 'iron-wall']],
    ['four', ['power-strike', 'iron-wall', 'war-cry', 'heal']],
  ])('rejects %s skills', (_count, skillIds) => {
    expect(CharacterSchema.safeParse({ ...validCharacter, skillIds }).success).toBe(false);
  });

  it('rejects duplicate skill ids', () => {
    const skillIds = ['power-strike', 'power-strike', 'war-cry'];
    expect(CharacterSchema.safeParse({ ...validCharacter, skillIds }).success).toBe(false);
  });
});
