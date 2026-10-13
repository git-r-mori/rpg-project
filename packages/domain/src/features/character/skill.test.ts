import { describe, expect, it } from 'vitest';
import { SkillSchema } from './skill';

const validSkill = {
  id: 'power-strike',
  name: 'パワーストライク',
  description: '力を込めた一撃で敵を攻撃する。',
  stat: 'strength',
};

describe('SkillSchema', () => {
  it('accepts a valid skill', () => {
    expect(SkillSchema.safeParse(validSkill).success).toBe(true);
  });

  it('rejects a malformed id', () => {
    expect(SkillSchema.safeParse({ ...validSkill, id: 'Power Strike' }).success).toBe(false);
  });

  it.each(['name', 'description'])('rejects a blank %s', (field) => {
    expect(SkillSchema.safeParse({ ...validSkill, [field]: '  ' }).success).toBe(false);
  });

  it('rejects an unknown stat', () => {
    expect(SkillSchema.safeParse({ ...validSkill, stat: 'charisma' }).success).toBe(false);
  });
});
