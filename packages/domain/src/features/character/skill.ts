import { z } from 'zod';
import { IdSchema } from '../../shared/id';
import { StatKeySchema } from './stats';

/**
 * Schema for a skill a character can learn.
 *
 * `description` is the fixed game effect text; AI-written flavor text is not part of this schema.
 * `stat` is the stat that ranks this skill when skills are chosen for a character.
 */
export const SkillSchema = z.object({
  id: IdSchema,
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  stat: StatKeySchema,
});

/** A skill a character can learn. */
export type Skill = z.infer<typeof SkillSchema>;
