import type { Character, CharacterClass, Skill } from '../character';
import type { Answers, Question } from '../questionnaire';
import { chooseClass } from './chooseClass';
import { chooseSkills } from './chooseSkills';
import { normalizeStats } from './normalizeStats';
import { resolveOptions } from './resolveOptions';
import { statRanges } from './statRanges';
import { sumEffects } from './sumEffects';

/** Game data a diagnosis runs against. */
export type DiagnosisData = {
  /** The questionnaire. Every question must be answered. */
  questions: readonly Question[];
  /** Candidate classes in tie-break priority order. */
  classes: readonly CharacterClass[];
  /** Every skill the classes refer to. */
  skills: readonly Skill[];
};

/**
 * Diagnoses a character from questionnaire answers. The same input always yields the same character.
 *
 * @param answers - Exactly one answer per question in `data.questions`, in any order.
 * @param data - The questions, classes, and skills to diagnose against.
 * @returns The character's class id, stats from 1 to 100, and skill ids.
 * @throws {Error} When the answers do not match the questions, when there are no classes,
 * or when a class refers to an unknown skill.
 */
export function diagnose(answers: Answers, data: DiagnosisData): Character {
  const totals = sumEffects(resolveOptions(data.questions, answers));
  const stats = normalizeStats(totals, statRanges(data.questions));
  const characterClass = chooseClass(stats, data.classes);
  const skills = chooseSkills(stats, characterClass, data.skills);
  return {
    classId: characterClass.id,
    stats,
    skillIds: skills.map(({ id }) => id),
  };
}
