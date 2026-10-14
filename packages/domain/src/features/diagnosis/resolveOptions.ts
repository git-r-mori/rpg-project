import type { Answers, Question, QuestionOption } from '../questionnaire';

/**
 * Looks up the option chosen for every question.
 *
 * @param questions - The questionnaire.
 * @param answers - One answer per question, in any order.
 * @returns The chosen options, in question order.
 * @throws {Error} When an answer refers to an unknown question or option, when a question is
 * answered more than once, or when a question is not answered.
 */
export function resolveOptions(questions: readonly Question[], answers: Answers): QuestionOption[] {
  const knownQuestionIds = new Set(questions.map(({ id }) => id));
  const optionIdByQuestion = new Map<string, string>();
  for (const { questionId, optionId } of answers) {
    if (!knownQuestionIds.has(questionId)) {
      throw new Error(`Unknown question: ${questionId}`);
    }
    if (optionIdByQuestion.has(questionId)) {
      throw new Error(`Question answered more than once: ${questionId}`);
    }
    optionIdByQuestion.set(questionId, optionId);
  }

  return questions.map((question) => {
    const optionId = optionIdByQuestion.get(question.id);
    if (optionId === undefined) {
      throw new Error(`Question not answered: ${question.id}`);
    }
    const option = question.options.find(({ id }) => id === optionId);
    if (option === undefined) {
      throw new Error(`Unknown option ${optionId} for question ${question.id}`);
    }
    return option;
  });
}
