import { buildStatRecord } from '../character';
import type { StatKey } from '../character';
import type { QuestionOption } from '../questionnaire';

/** Raw point totals per stat, before they are mapped to the stat range. May be negative. */
export type StatTotals = Record<StatKey, number>;

/**
 * Adds up the stat effects of the chosen options.
 *
 * @param options - Chosen options. May be empty.
 * @returns The total per stat. Stats no option affects are `0`.
 */
export function sumEffects(options: readonly QuestionOption[]): StatTotals {
  return buildStatRecord((key) =>
    options.reduce((sum, { effects }) => sum + (effects[key] ?? 0), 0),
  );
}
