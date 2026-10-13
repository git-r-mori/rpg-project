import { z } from 'zod';
import { hasNoDuplicates, IdSchema } from '../../shared/id';
import { StatsSchema } from './stats';

/** Number of skills every diagnosed character receives. */
export const SKILLS_PER_CHARACTER = 3;

/**
 * Schema for a diagnosed character: its class, stats, and skills.
 *
 * The class and skills are stored as ids so a character stays valid when their names or texts change.
 * Requires exactly {@link SKILLS_PER_CHARACTER} distinct skill ids.
 */
export const CharacterSchema = z.object({
  classId: IdSchema,
  stats: StatsSchema,
  skillIds: z
    .array(IdSchema)
    .length(SKILLS_PER_CHARACTER)
    .refine(hasNoDuplicates, 'Skill ids must be unique.'),
});

/** A diagnosed character. */
export type Character = z.infer<typeof CharacterSchema>;
