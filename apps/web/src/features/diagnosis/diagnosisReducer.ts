import type { Answer } from '@rpg/domain';

/** Screen state of a diagnosis session. */
export type DiagnosisState = {
  /** Answers given so far, in the order the questions were answered. */
  answers: Answer[];
};

/** Events that change a diagnosis session. */
export type DiagnosisAction =
  { type: 'answer'; answer: Answer } | { type: 'back' } | { type: 'restart' };

/** State of a session before any question is answered. */
export const initialDiagnosisState: DiagnosisState = { answers: [] };

/**
 * Applies a user action to the diagnosis session.
 *
 * @param state - The current session.
 * @param action - `answer` appends an answer, `back` removes the latest one, `restart` clears all.
 * @returns The next session. Returns `state` itself when the action changes nothing, i.e. when
 * the question is already answered or there is no answer to go back from.
 */
export function diagnosisReducer(state: DiagnosisState, action: DiagnosisAction): DiagnosisState {
  switch (action.type) {
    case 'answer':
      if (state.answers.some(({ questionId }) => questionId === action.answer.questionId)) {
        return state;
      }
      return { answers: [...state.answers, action.answer] };
    case 'back':
      return state.answers.length === 0 ? state : { answers: state.answers.slice(0, -1) };
    case 'restart':
      return initialDiagnosisState;
  }
}
