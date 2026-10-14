import { DIAGNOSIS_DATA } from '@rpg/domain';
import { describe, expect, it } from 'vitest';
import { toCharacterView } from './characterView';

const stats = {
  strength: 90,
  intelligence: 10,
  vitality: 70,
  agility: 50,
  dexterity: 30,
  luck: 20,
};

describe('toCharacterView', () => {
  it('resolves the class and skills in the order of their ids', () => {
    const view = toCharacterView(
      { classId: 'warrior', stats, skillIds: ['power-strike', 'iron-wall', 'war-cry'] },
      DIAGNOSIS_DATA,
    );
    expect(view.characterClass.name).toBe('戦士');
    expect(view.skills.map(({ id }) => id)).toEqual(['power-strike', 'iron-wall', 'war-cry']);
    expect(view.stats).toBe(stats);
  });

  it('throws when the class does not exist', () => {
    const character = {
      classId: 'ninja',
      stats,
      skillIds: ['power-strike', 'iron-wall', 'war-cry'],
    };
    expect(() => toCharacterView(character, DIAGNOSIS_DATA)).toThrow(/ninja/);
  });

  it('throws when a skill does not exist', () => {
    const character = {
      classId: 'warrior',
      stats,
      skillIds: ['power-strike', 'iron-wall', 'shuriken'],
    };
    expect(() => toCharacterView(character, DIAGNOSIS_DATA)).toThrow(/shuriken/);
  });
});
