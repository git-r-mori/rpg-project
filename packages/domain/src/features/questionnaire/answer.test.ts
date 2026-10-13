import { describe, expect, it } from 'vitest';
import { AnswerSchema, AnswersSchema } from './answer';

describe('AnswerSchema', () => {
  it('accepts a question id and an option id', () => {
    expect(AnswerSchema.safeParse({ questionId: 'q1', optionId: 'a' }).success).toBe(true);
  });

  it.each([
    ['question', { questionId: 'Q1', optionId: 'a' }],
    ['option', { questionId: 'q1', optionId: '' }],
  ])('rejects a malformed %s id', (_field, answer) => {
    expect(AnswerSchema.safeParse(answer).success).toBe(false);
  });
});

describe('AnswersSchema', () => {
  it('accepts answers to distinct questions', () => {
    const answers = [
      { questionId: 'q1', optionId: 'a' },
      { questionId: 'q2', optionId: 'a' },
    ];
    expect(AnswersSchema.safeParse(answers).success).toBe(true);
  });

  it('rejects two answers to the same question', () => {
    const answers = [
      { questionId: 'q1', optionId: 'a' },
      { questionId: 'q1', optionId: 'b' },
    ];
    expect(AnswersSchema.safeParse(answers).success).toBe(false);
  });
});
