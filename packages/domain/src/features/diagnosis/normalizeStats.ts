import { buildStatRecord, STAT_MAX, STAT_MIN } from '../character';
import type { Stats } from '../character';
import type { StatRanges } from './statRanges';
import type { StatTotals } from './sumEffects';

/**
 * Maps raw stat totals linearly onto the stat range and rounds them.
 *
 * @param totals - Raw totals per stat. Totals outside their range are clamped to it.
 * @param ranges - Smallest and largest reachable total per stat.
 * @returns Integer stats from `STAT_MIN` (range minimum) to `STAT_MAX` (range maximum).
 * A stat whose range is empty gets the rounded middle of the stat range.
 */
export function normalizeStats(totals: StatTotals, ranges: StatRanges): Stats {
  return buildStatRecord((key) => {
    const min = ranges.min[key];
    const max = ranges.max[key];
    if (max <= min) {
      return Math.round((STAT_MIN + STAT_MAX) / 2);
    }
    const ratio = Math.min(Math.max((totals[key] - min) / (max - min), 0), 1);
    return Math.round(STAT_MIN + ratio * (STAT_MAX - STAT_MIN));
  });
}
