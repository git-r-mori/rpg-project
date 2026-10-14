import { MAX_OPTIONS_PER_QUESTION } from '@rpg/domain';

/**
 * Counts the invisible placeholder rows needed so every question card is as tall as one with
 * {@link MAX_OPTIONS_PER_QUESTION} options.
 *
 * @param optionCount - Number of options the question has.
 * @returns `MAX_OPTIONS_PER_QUESTION - optionCount`, or 0 when the question already has that many.
 */
export function emptyOptionSlotCount(optionCount: number): number {
  return Math.max(0, MAX_OPTIONS_PER_QUESTION - optionCount);
}
