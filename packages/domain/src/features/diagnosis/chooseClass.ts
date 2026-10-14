import type { CharacterClass, StatKey, Stats } from '../character';

/**
 * Chooses the class whose weights fit the stats best.
 *
 * @param stats - The character's stats.
 * @param classes - Candidate classes in tie-break priority order. Must not be empty.
 * @returns The class with the highest sum of stat × weight; the earliest one on a tie.
 * @throws {Error} When `classes` is empty.
 */
export function chooseClass(stats: Stats, classes: readonly CharacterClass[]): CharacterClass {
  const score = ({ weights }: CharacterClass) =>
    Object.entries(weights).reduce((sum, [key, weight]) => sum + stats[key as StatKey] * weight, 0);

  let best: CharacterClass | undefined;
  for (const candidate of classes) {
    if (best === undefined || score(candidate) > score(best)) {
      best = candidate;
    }
  }
  if (best === undefined) {
    throw new Error('No classes to choose from.');
  }
  return best;
}
