import { diagnose } from '@rpg/domain';
import type { DiagnosisData, Question } from '@rpg/domain';
import { toCharacterView } from './characterView';
import type { CharacterView } from './characterView';
import type { DiagnosisState } from './diagnosisReducer';

/** What the diagnosis screen shows next: a question, or the result once all are answered. */
export type DiagnosisProgress =
  | { kind: 'question'; question: Question; index: number; total: number }
  | { kind: 'result'; view: CharacterView };

/**
 * Decides what to show for the current session.
 *
 * @param state - The session. Its answers are assumed to follow the question order.
 * @param data - The game data to diagnose against.
 * @returns The next unanswered question with its zero-based index and the question count,
 * or the diagnosed character when every question is answered.
 * @throws {Error} When the answers do not match the questions or the data is inconsistent.
 */
export function diagnosisProgress(state: DiagnosisState, data: DiagnosisData): DiagnosisProgress {
  const index = state.answers.length;
  const question = data.questions[index];
  if (question !== undefined) {
    return { kind: 'question', question, index, total: data.questions.length };
  }
  return { kind: 'result', view: toCharacterView(diagnose(state.answers, data), data) };
}
