import { describe, expect, it } from 'vitest';
import type { CharacterClass } from '../features/character';
import { diagnose } from '../features/diagnosis';
import type { Answers, Question } from '../features/questionnaire';
import { CHARACTER_CLASSES } from './classes';
import { QUESTIONS } from './questions';
import { SKILLS } from './skills';

const questions: readonly Question[] = QUESTIONS;
const classes: readonly CharacterClass[] = CHARACTER_CLASSES;

/** Picks, for every question, the first option that adds the most to the class's weighted score. */
function answersFavoring({ weights }: CharacterClass): Answers {
  const score = (effects: Question['options'][number]['effects']) =>
    Object.entries(weights).reduce(
      (sum, [key, weight]) => sum + weight * (effects[key as keyof typeof effects] ?? 0),
      0,
    );
  return questions.map((question) => {
    const best = question.options.reduce((top, option) =>
      score(option.effects) > score(top.effects) ? option : top,
    );
    return { questionId: question.id, optionId: best.id };
  });
}

describe('class reachability', () => {
  it.each(classes.map((characterClass) => [characterClass.id, characterClass]))(
    'diagnoses %s from the answers that favor it',
    (id, characterClass) => {
      const character = diagnose(answersFavoring(characterClass), {
        questions,
        classes,
        skills: SKILLS,
      });
      expect(character.classId).toBe(id);
    },
  );
});
