import { z } from 'zod';

/**
 * Keys of every character stat, in display order.
 *
 * This list is the single source of truth: stat schemas and types derive from it,
 * so adding a stat here makes every exhaustive record of stats fail to typecheck until updated.
 */
export const STAT_KEYS = [
  'strength',
  'intelligence',
  'vitality',
  'agility',
  'dexterity',
  'luck',
] as const;

/** Smallest value a stat can take. */
export const STAT_MIN = 1;

/** Largest value a stat can take. */
export const STAT_MAX = 100;

/** Schema for one of the {@link STAT_KEYS}. */
export const StatKeySchema = z.enum(STAT_KEYS);

/** A key identifying one character stat. */
export type StatKey = z.infer<typeof StatKeySchema>;

/** Schema for a stat value: an integer from {@link STAT_MIN} to {@link STAT_MAX}. */
export const StatValueSchema = z.number().int().min(STAT_MIN).max(STAT_MAX);

/** Schema for a full set of stats. Requires every stat key and rejects unknown keys. */
export const StatsSchema = z.record(StatKeySchema, StatValueSchema);

/** A value for every character stat. */
export type Stats = z.infer<typeof StatsSchema>;
