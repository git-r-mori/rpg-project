import { z } from 'zod';

/**
 * Schema for an identifier that links data records, e.g. a question, class, or skill id.
 *
 * Accepts lowercase kebab-case that starts with a letter, such as `"power-strike"` or `"q1"`.
 */
export const IdSchema = z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/);

/**
 * Checks that no value appears more than once.
 *
 * @param values - Values to inspect. May be empty.
 * @returns `true` when every value is distinct, including for an empty list.
 */
export function hasNoDuplicates(values: readonly string[]): boolean {
  return new Set(values).size === values.length;
}
