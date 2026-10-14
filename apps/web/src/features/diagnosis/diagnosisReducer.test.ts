import { describe, expect, it } from 'vitest';
import { diagnosisReducer, initialDiagnosisState } from './diagnosisReducer';

const answered = {
  answers: [
    { questionId: 'q1', optionId: 'a' },
    { questionId: 'q2', optionId: 'b' },
  ],
};

describe('diagnosisReducer', () => {
  it('starts with no answers', () => {
    expect(initialDiagnosisState).toEqual({ answers: [] });
  });

  it('appends an answer', () => {
    const next = diagnosisReducer(answered, {
      type: 'answer',
      answer: { questionId: 'q3', optionId: 'c' },
    });
    expect(next.answers).toEqual([...answered.answers, { questionId: 'q3', optionId: 'c' }]);
  });

  it('ignores a second answer to the same question', () => {
    const next = diagnosisReducer(answered, {
      type: 'answer',
      answer: { questionId: 'q2', optionId: 'a' },
    });
    expect(next).toBe(answered);
  });

  it('removes the last answer when going back', () => {
    expect(diagnosisReducer(answered, { type: 'back' }).answers).toEqual([answered.answers[0]]);
  });

  it('keeps the state when going back with no answers', () => {
    expect(diagnosisReducer(initialDiagnosisState, { type: 'back' })).toBe(initialDiagnosisState);
  });

  it('clears every answer on restart', () => {
    expect(diagnosisReducer(answered, { type: 'restart' })).toEqual(initialDiagnosisState);
  });
});
