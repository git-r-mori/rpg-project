import { z } from 'zod';
import { hasNoDuplicates, IdSchema } from '../../shared/id';
import { StatKeySchema } from '../character';

/** Fewest options a question can have. */
export const MIN_OPTIONS_PER_QUESTION = 3;

/** Most options a question can have. */
export const MAX_OPTIONS_PER_QUESTION = 4;

/**
 * Schema for one answer choice of a question.
 *
 * `effects` maps stats to the integer points added (or subtracted, when negative) when this
 * option is chosen. Unlisted stats are unchanged, and an empty map is allowed.
 */
export const QuestionOptionSchema = z.object({
  id: IdSchema,
  text: z.string().trim().min(1),
  effects: z.partialRecord(StatKeySchema, z.number().int()),
});

/** One answer choice of a question. */
export type QuestionOption = z.infer<typeof QuestionOptionSchema>;

/**
 * Schema for a questionnaire question.
 *
 * Requires {@link MIN_OPTIONS_PER_QUESTION} to {@link MAX_OPTIONS_PER_QUESTION} options with
 * distinct ids. Option ids only need to be unique within their question.
 */
export const QuestionSchema = z.object({
  id: IdSchema,
  text: z.string().trim().min(1),
  options: z
    .array(QuestionOptionSchema)
    .min(MIN_OPTIONS_PER_QUESTION)
    .max(MAX_OPTIONS_PER_QUESTION)
    .refine(
      (options) => hasNoDuplicates(options.map(({ id }) => id)),
      'Option ids must be unique.',
    ),
});

/** A questionnaire question. */
export type Question = z.infer<typeof QuestionSchema>;
