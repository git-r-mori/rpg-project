import { DIAGNOSIS_DATA } from '@rpg/domain';
import { useReducer } from 'react';
import {
  diagnosisProgress,
  diagnosisReducer,
  initialDiagnosisState,
  QuestionCard,
  ResultCard,
} from '../features/diagnosis';

/**
 * Page for `/diagnosis`. Asks the questions one by one, then shows the diagnosed character.
 * Answers live only in this page's state, so reloading starts over.
 */
export function DiagnosisPage() {
  const [state, dispatch] = useReducer(diagnosisReducer, initialDiagnosisState);
  const progress = diagnosisProgress(state, DIAGNOSIS_DATA);

  if (progress.kind === 'result') {
    return <ResultCard view={progress.view} onRestart={() => dispatch({ type: 'restart' })} />;
  }
  const { question } = progress;
  return (
    <QuestionCard
      key={question.id}
      question={question}
      index={progress.index}
      total={progress.total}
      onAnswer={(optionId) =>
        dispatch({ type: 'answer', answer: { questionId: question.id, optionId } })
      }
      onBack={() => dispatch({ type: 'back' })}
    />
  );
}
