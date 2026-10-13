import { z } from 'zod';
import { hasNoDuplicates, IdSchema } from '../../shared/id';
import { SKILLS_PER_CHARACTER } from './character';
import { StatKeySchema } from './stats';

/**
 * Schema for a character class.
 *
 * `weights` scores how well a set of stats fits the class: each listed stat's value is multiplied
 * by its positive integer weight, and the class with the highest total is chosen.
 * Requires at least one weight. Stats that are not listed do not count.
 *
 * `skillIds` lists the skills the class can grant, in tie-break priority order.
 * Requires at least {@link SKILLS_PER_CHARACTER} distinct ids.
 */
export const CharacterClassSchema = z.object({
  id: IdSchema,
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  weights: z
    .partialRecord(StatKeySchema, z.number().int().positive())
    .refine((weights) => Object.keys(weights).length > 0, 'At least one weight is required.'),
  skillIds: z
    .array(IdSchema)
    .min(SKILLS_PER_CHARACTER)
    .refine(hasNoDuplicates, 'Skill ids must be unique.'),
});

/** A character class. */
export type CharacterClass = z.infer<typeof CharacterClassSchema>;
