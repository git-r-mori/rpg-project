import { DIAGNOSIS_DATA } from '@rpg/domain';
import { describe, expect, it } from 'vitest';
import { diagnosisProgress } from './diagnosisProgress';

const { questions } = DIAGNOSIS_DATA;

const firstOptionAnswers = (count: number) =>
  questions.slice(0, count).map((question) => ({
    questionId: question.id,
    optionId: question.options[0]?.id ?? '',
  }));

describe('diagnosisProgress', () => {
  it('shows the first question when nothing is answered', () => {
    expect(diagnosisProgress({ answers: [] }, DIAGNOSIS_DATA)).toEqual({
      kind: 'question',
      question: questions[0],
      index: 0,
      total: questions.length,
    });
  });

  it('shows the next unanswered question', () => {
    const progress = diagnosisProgress({ answers: firstOptionAnswers(3) }, DIAGNOSIS_DATA);
    expect(progress).toMatchObject({ kind: 'question', question: questions[3], index: 3 });
  });

  it('shows the diagnosed character once every question is answered', () => {
    const progress = diagnosisProgress(
      { answers: firstOptionAnswers(questions.length) },
      DIAGNOSIS_DATA,
    );
    expect(progress.kind).toBe('result');
    if (progress.kind === 'result') {
      expect(progress.view.skills).toHaveLength(3);
    }
  });
});
