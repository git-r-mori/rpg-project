import { describe, expect, it } from 'vitest';
import { greet } from './greet';

describe('greet', () => {
  it('returns a greeting that includes the name', () => {
    expect(greet('World')).toBe('Hello, World!');
  });

  it('trims surrounding whitespace', () => {
    expect(greet('  Hero  ')).toBe('Hello, Hero!');
  });

  it('rejects a name that is empty after trimming', () => {
    expect(() => greet('   ')).toThrow();
  });

  it('accepts a name of exactly 32 characters', () => {
    const name = 'a'.repeat(32);
    expect(greet(name)).toBe(`Hello, ${name}!`);
  });

  it('rejects a name longer than 32 characters', () => {
    expect(() => greet('a'.repeat(33))).toThrow();
  });
});
