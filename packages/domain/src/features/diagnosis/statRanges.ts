import { buildStatRecord } from '../character';
import type { StatKey } from '../character';
import type { Question } from '../questionnaire';
import type { StatTotals } from './sumEffects';

/** Smallest and largest total each stat can reach over a questionnaire. */
export type StatRanges = { min: StatTotals; max: StatTotals };

/**
 * Computes the range of totals each stat can reach when every question is answered.
 *
 * @param questions - The questionnaire. May be empty, in which case every range is `0` to `0`.
 * @returns Per stat, the sum over questions of the smallest and of the largest option effect.
 * An option that does not list a stat counts as `0` for it.
 */
export function statRanges(questions: readonly Question[]): StatRanges {
  const effectsOf = (question: Question, key: StatKey) =>
    question.options.map(({ effects }) => effects[key] ?? 0);
  return {
    min: buildStatRecord((key) =>
      questions.reduce((sum, q) => sum + Math.min(...effectsOf(q, key)), 0),
    ),
    max: buildStatRecord((key) =>
      questions.reduce((sum, q) => sum + Math.max(...effectsOf(q, key)), 0),
    ),
  };
}
