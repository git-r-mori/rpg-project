import { describe, expect, it } from 'vitest';
import { buildStatRecord } from '../character';
import type { Stats } from '../character';
import { TEST_CLASSES } from '../../testing/fixtures';
import { chooseClass } from './chooseClass';

const stats = (overrides: Partial<Stats>) => ({
  ...buildStatRecord(() => 50),
  ...overrides,
});

describe('chooseClass', () => {
  it('chooses the class with the highest weighted total', () => {
    expect(chooseClass(stats({ strength: 30, intelligence: 80 }), TEST_CLASSES).id).toBe('scholar');
    expect(chooseClass(stats({ strength: 80, intelligence: 30 }), TEST_CLASSES).id).toBe('fighter');
  });

  it('chooses the earlier class on a tie', () => {
    expect(chooseClass(stats({ strength: 60, intelligence: 60 }), TEST_CLASSES).id).toBe('fighter');
  });

  it('ignores stats without a weight', () => {
    const result = chooseClass(stats({ strength: 40, intelligence: 41, luck: 100 }), TEST_CLASSES);
    expect(result.id).toBe('scholar');
  });

  it('throws when there are no classes', () => {
    expect(() => chooseClass(stats({}), [])).toThrow();
  });
});
