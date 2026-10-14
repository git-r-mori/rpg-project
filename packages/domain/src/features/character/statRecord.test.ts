import { describe, expect, it } from 'vitest';
import { buildStatRecord } from './statRecord';
import { STAT_KEYS } from './stats';

describe('buildStatRecord', () => {
  it('builds a value for every stat key', () => {
    const record = buildStatRecord((key) => key.length);
    expect(Object.keys(record)).toEqual([...STAT_KEYS]);
    expect(record.strength).toBe('strength'.length);
    expect(record.luck).toBe('luck'.length);
  });
});
