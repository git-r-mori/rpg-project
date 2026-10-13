import { describe, expect, it } from 'vitest';
import { CharacterClassSchema } from './characterClass';

const validClass = {
  id: 'warrior',
  name: '戦士',
  description: '前線で仲間を守る屈強な戦い手。',
  weights: { strength: 3, vitality: 2 },
  skillIds: ['power-strike', 'iron-wall', 'war-cry'],
};

describe('CharacterClassSchema', () => {
  it('accepts a valid class', () => {
    expect(CharacterClassSchema.safeParse(validClass).success).toBe(true);
  });

  it('rejects a malformed id', () => {
    expect(CharacterClassSchema.safeParse({ ...validClass, id: 'Warrior' }).success).toBe(false);
  });

  it.each(['name', 'description'])('rejects a blank %s', (field) => {
    expect(CharacterClassSchema.safeParse({ ...validClass, [field]: '' }).success).toBe(false);
  });

  it('rejects empty weights', () => {
    expect(CharacterClassSchema.safeParse({ ...validClass, weights: {} }).success).toBe(false);
  });

  it.each([0, -1, 1.5])('rejects the weight %s', (weight) => {
    const weights = { strength: weight };
    expect(CharacterClassSchema.safeParse({ ...validClass, weights }).success).toBe(false);
  });

  it('rejects a weight for an unknown stat', () => {
    const weights = { charisma: 1 };
    expect(CharacterClassSchema.safeParse({ ...validClass, weights }).success).toBe(false);
  });

  it('rejects fewer skills than a character receives', () => {
    const skillIds = ['power-strike', 'iron-wall'];
    expect(CharacterClassSchema.safeParse({ ...validClass, skillIds }).success).toBe(false);
  });

  it('rejects duplicate skill ids', () => {
    const skillIds = ['power-strike', 'iron-wall', 'power-strike'];
    expect(CharacterClassSchema.safeParse({ ...validClass, skillIds }).success).toBe(false);
  });
});
