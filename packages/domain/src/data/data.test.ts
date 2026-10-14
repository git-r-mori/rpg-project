import { describe, expect, it } from 'vitest';
import {
  CharacterClassSchema,
  SkillSchema,
  SKILLS_PER_CHARACTER,
  STAT_KEYS,
} from '../features/character';
import { QuestionSchema } from '../features/questionnaire';
import type { Question } from '../features/questionnaire';
import { CHARACTER_CLASSES } from './classes';
import { QUESTIONS } from './questions';
import { SKILLS } from './skills';
import { STAT_LABELS } from './statLabels';

const ids = (records: readonly { id: string }[]) => records.map(({ id }) => id);

describe('STAT_LABELS', () => {
  it.each(STAT_KEYS)('has a non-blank label for %s', (key) => {
    expect(STAT_LABELS[key].trim()).not.toBe('');
  });
});

describe('QUESTIONS', () => {
  it('has exactly 10 questions', () => {
    expect(QUESTIONS).toHaveLength(10);
  });

  it.each(QUESTIONS.map((question) => [question.id, question]))(
    'validates question %s',
    (_id, question) => {
      expect(QuestionSchema.safeParse(question).success).toBe(true);
    },
  );

  it('uses distinct question ids', () => {
    expect(new Set(ids(QUESTIONS)).size).toBe(QUESTIONS.length);
  });

  it.each(STAT_KEYS)('raises %s with at least one option', (key) => {
    const questions: readonly Question[] = QUESTIONS;
    const raises = questions.some((question) =>
      question.options.some((option) => (option.effects[key] ?? 0) > 0),
    );
    expect(raises).toBe(true);
  });
});

describe('SKILLS', () => {
  it('is not empty', () => {
    expect(SKILLS.length).toBeGreaterThan(0);
  });

  it.each(SKILLS.map((skill) => [skill.id, skill]))('validates skill %s', (_id, skill) => {
    expect(SkillSchema.safeParse(skill).success).toBe(true);
  });

  it('uses distinct skill ids', () => {
    expect(new Set(ids(SKILLS)).size).toBe(SKILLS.length);
  });

  it('assigns every skill to at least one class', () => {
    const used = new Set(CHARACTER_CLASSES.flatMap(({ skillIds }) => skillIds));
    expect(ids(SKILLS).filter((id) => !used.has(id))).toEqual([]);
  });
});

describe('CHARACTER_CLASSES', () => {
  it('has 6 classes', () => {
    expect(CHARACTER_CLASSES).toHaveLength(6);
  });

  it.each(CHARACTER_CLASSES.map((characterClass) => [characterClass.id, characterClass]))(
    'validates class %s',
    (_id, characterClass) => {
      expect(CharacterClassSchema.safeParse(characterClass).success).toBe(true);
    },
  );

  it('uses distinct class ids', () => {
    expect(new Set(ids(CHARACTER_CLASSES)).size).toBe(CHARACTER_CLASSES.length);
  });

  it('refers only to existing skills', () => {
    const known = new Set(ids(SKILLS));
    const unknown = CHARACTER_CLASSES.flatMap(({ skillIds }) => skillIds).filter(
      (id) => !known.has(id),
    );
    expect(unknown).toEqual([]);
  });

  it('offers more skill candidates than a character receives', () => {
    for (const { skillIds } of CHARACTER_CLASSES) {
      expect(skillIds.length).toBeGreaterThan(SKILLS_PER_CHARACTER);
    }
  });

  it('gives every class the same total weight', () => {
    const totals = CHARACTER_CLASSES.map(({ weights }) =>
      Object.values(weights).reduce((sum, weight) => sum + weight, 0),
    );
    expect(new Set(totals).size).toBe(1);
  });
});
