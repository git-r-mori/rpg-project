import { describe, expect, it } from 'vitest';
import { QuestionOptionSchema, QuestionSchema } from './question';

const option = (id: string) => ({ id, text: `選択肢 ${id}`, effects: { strength: 2 } });

const validQuestion = {
  id: 'q1',
  text: '森で道に迷ったら、まず何をする？',
  options: [option('a'), option('b'), option('c')],
};

describe('QuestionOptionSchema', () => {
  it('accepts an option that changes several stats', () => {
    const effects = { strength: 2, intelligence: -1 };
    expect(QuestionOptionSchema.safeParse({ ...option('a'), effects }).success).toBe(true);
  });

  it('accepts an option without effects', () => {
    expect(QuestionOptionSchema.safeParse({ ...option('a'), effects: {} }).success).toBe(true);
  });

  it('rejects a blank text', () => {
    expect(QuestionOptionSchema.safeParse({ ...option('a'), text: ' ' }).success).toBe(false);
  });

  it('rejects an effect on an unknown stat', () => {
    const effects = { charisma: 1 };
    expect(QuestionOptionSchema.safeParse({ ...option('a'), effects }).success).toBe(false);
  });

  it('rejects a non-integer effect', () => {
    const effects = { strength: 0.5 };
    expect(QuestionOptionSchema.safeParse({ ...option('a'), effects }).success).toBe(false);
  });
});

describe('QuestionSchema', () => {
  it.each([3, 4])('accepts %d options', (count) => {
    const options = ['a', 'b', 'c', 'd'].slice(0, count).map(option);
    expect(QuestionSchema.safeParse({ ...validQuestion, options }).success).toBe(true);
  });

  it.each([2, 5])('rejects %d options', (count) => {
    const options = ['a', 'b', 'c', 'd', 'e'].slice(0, count).map(option);
    expect(QuestionSchema.safeParse({ ...validQuestion, options }).success).toBe(false);
  });

  it('rejects duplicate option ids', () => {
    const options = [option('a'), option('b'), option('a')];
    expect(QuestionSchema.safeParse({ ...validQuestion, options }).success).toBe(false);
  });

  it('rejects a blank text', () => {
    expect(QuestionSchema.safeParse({ ...validQuestion, text: '' }).success).toBe(false);
  });

  it('rejects a malformed id', () => {
    expect(QuestionSchema.safeParse({ ...validQuestion, id: 'Q 1' }).success).toBe(false);
  });
});
