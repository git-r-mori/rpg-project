import { z } from 'zod';
import { hasNoDuplicates, IdSchema } from '../../shared/id';

/** Schema for the option chosen for one question. */
export const AnswerSchema = z.object({
  questionId: IdSchema,
  optionId: IdSchema,
});

/** The option chosen for one question. */
export type Answer = z.infer<typeof AnswerSchema>;

/**
 * Schema for the answers of one questionnaire session.
 *
 * Rejects more than one answer to the same question. Whether the ids exist in the
 * question data, and whether every question is answered, is checked by the diagnosis logic.
 */
export const AnswersSchema = z
  .array(AnswerSchema)
  .refine(
    (answers) => hasNoDuplicates(answers.map(({ questionId }) => questionId)),
    'Each question can be answered only once.',
  );

/** The answers of one questionnaire session. */
export type Answers = z.infer<typeof AnswersSchema>;
