import { describe, expect, it } from 'vitest';
import { STAT_KEYS, StatKeySchema, StatsSchema, StatValueSchema } from './stats';

const validStats = Object.fromEntries(STAT_KEYS.map((key) => [key, 50]));

describe('StatKeySchema', () => {
  it.each(STAT_KEYS)('accepts the stat key %s', (key) => {
    expect(StatKeySchema.safeParse(key).success).toBe(true);
  });

  it('rejects an unknown stat key', () => {
    expect(StatKeySchema.safeParse('charisma').success).toBe(false);
  });
});

describe('StatValueSchema', () => {
  it.each([1, 50, 100])('accepts %d', (value) => {
    expect(StatValueSchema.safeParse(value).success).toBe(true);
  });

  it.each([0, 101, 50.5, -1])('rejects %s', (value) => {
    expect(StatValueSchema.safeParse(value).success).toBe(false);
  });
});

describe('StatsSchema', () => {
  it('accepts a value for every stat key', () => {
    expect(StatsSchema.safeParse(validStats).success).toBe(true);
  });

  it('rejects stats missing a key', () => {
    const withoutLuck = { ...validStats };
    delete withoutLuck.luck;
    expect(StatsSchema.safeParse(withoutLuck).success).toBe(false);
  });

  it('rejects an unknown key', () => {
    expect(StatsSchema.safeParse({ ...validStats, charisma: 50 }).success).toBe(false);
  });

  it('rejects a value out of range', () => {
    expect(StatsSchema.safeParse({ ...validStats, strength: 101 }).success).toBe(false);
  });
});
