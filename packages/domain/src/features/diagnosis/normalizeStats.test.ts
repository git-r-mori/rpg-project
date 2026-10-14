import { describe, expect, it } from 'vitest';
import { buildStatRecord } from '../character';
import { normalizeStats } from './normalizeStats';

const ranges = {
  min: buildStatRecord(() => 0),
  max: buildStatRecord(() => 3),
};

describe('normalizeStats', () => {
  it.each([
    [0, 1],
    [1, 34],
    [2, 67],
    [3, 100],
  ])('maps the total %d in the range 0 to 3 to %d', (total, expected) => {
    const stats = normalizeStats(
      buildStatRecord(() => total),
      ranges,
    );
    expect(stats.strength).toBe(expected);
  });

  it('handles ranges below zero', () => {
    const negativeRanges = { min: buildStatRecord(() => -2), max: buildStatRecord(() => 2) };
    const stats = normalizeStats(
      buildStatRecord(() => -2),
      negativeRanges,
    );
    expect(stats.luck).toBe(1);
  });

  it('returns the middle value when a stat has no range', () => {
    const flat = { min: buildStatRecord(() => 0), max: buildStatRecord(() => 0) };
    expect(
      normalizeStats(
        buildStatRecord(() => 0),
        flat,
      ).agility,
    ).toBe(51);
  });

  it.each([
    [-5, 1],
    [9, 100],
  ])('clamps the out-of-range total %d to %d', (total, expected) => {
    expect(
      normalizeStats(
        buildStatRecord(() => total),
        ranges,
      ).dexterity,
    ).toBe(expected);
  });
});
