import { MAX_OPTIONS_PER_QUESTION, MIN_OPTIONS_PER_QUESTION } from '@rpg/domain';
import { describe, expect, it } from 'vitest';
import { emptyOptionSlotCount } from './emptyOptionSlotCount';

describe('emptyOptionSlotCount', () => {
  it('fills the gap up to the maximum option count', () => {
    expect(emptyOptionSlotCount(MIN_OPTIONS_PER_QUESTION)).toBe(
      MAX_OPTIONS_PER_QUESTION - MIN_OPTIONS_PER_QUESTION,
    );
  });

  it('returns zero when the question has the maximum option count', () => {
    expect(emptyOptionSlotCount(MAX_OPTIONS_PER_QUESTION)).toBe(0);
  });

  it('never returns a negative count', () => {
    expect(emptyOptionSlotCount(MAX_OPTIONS_PER_QUESTION + 1)).toBe(0);
  });
});
