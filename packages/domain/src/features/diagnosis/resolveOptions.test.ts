import { describe, expect, it } from 'vitest';
import { TEST_QUESTIONS } from '../../testing/fixtures';
import { resolveOptions } from './resolveOptions';

describe('resolveOptions', () => {
  it('returns the chosen options in question order', () => {
    const options = resolveOptions(TEST_QUESTIONS, [
      { questionId: 'q2', optionId: 'c' },
      { questionId: 'q1', optionId: 'b' },
    ]);
    expect(options).toEqual([TEST_QUESTIONS[0]?.options[1], TEST_QUESTIONS[1]?.options[2]]);
  });

  it('throws when a question is not answered', () => {
    expect(() => resolveOptions(TEST_QUESTIONS, [{ questionId: 'q1', optionId: 'a' }])).toThrow(
      /q2/,
    );
  });

  it('throws when an answer refers to an unknown question', () => {
    const answers = [
      { questionId: 'q1', optionId: 'a' },
      { questionId: 'q2', optionId: 'a' },
      { questionId: 'q9', optionId: 'a' },
    ];
    expect(() => resolveOptions(TEST_QUESTIONS, answers)).toThrow(/q9/);
  });

  it('throws when an answer refers to an unknown option', () => {
    const answers = [
      { questionId: 'q1', optionId: 'z' },
      { questionId: 'q2', optionId: 'a' },
    ];
    expect(() => resolveOptions(TEST_QUESTIONS, answers)).toThrow(/z/);
  });

  it('throws when a question is answered twice', () => {
    const answers = [
      { questionId: 'q1', optionId: 'a' },
      { questionId: 'q1', optionId: 'b' },
      { questionId: 'q2', optionId: 'a' },
    ];
    expect(() => resolveOptions(TEST_QUESTIONS, answers)).toThrow(/q1/);
  });
});
