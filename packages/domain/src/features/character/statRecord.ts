import { STAT_KEYS } from './stats';
import type { StatKey } from './stats';

/**
 * Builds a record with one value per stat, in {@link STAT_KEYS} order.
 *
 * @param build - Returns the value for the given stat key. Called once per key.
 * @returns A record holding a value for every stat key.
 */
export function buildStatRecord<T>(build: (key: StatKey) => T): Record<StatKey, T> {
  return Object.fromEntries(STAT_KEYS.map((key) => [key, build(key)])) as Record<StatKey, T>;
}
