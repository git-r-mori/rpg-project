import type { Question } from '@rpg/domain';
import { Frame } from '../../ui/Frame';

/** Props for {@link QuestionCard}. */
type QuestionCardProps = {
  /** The question to ask. */
  question: Question;
  /** Zero-based position of the question. */
  index: number;
  /** Number of questions in the questionnaire. */
  total: number;
  /** Called with the id of the option the user picks. */
  onAnswer: (optionId: string) => void;
  /** Called when the user goes back to the previous question. */
  onBack: () => void;
};

/**
 * One questionnaire question: progress, the question text, one button per option,
 * and a back button from the second question on.
 */
export function QuestionCard({ question, index, total, onAnswer, onBack }: QuestionCardProps) {
  return (
    <Frame title={`QUESTION ${index + 1} / ${total}`}>
      <div
        className="bg-ink mb-6 h-2 overflow-hidden rounded-full"
        role="progressbar"
        aria-label="回答の進み具合"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index}
      >
        <div className="bg-gold h-full" style={{ width: `${(index / total) * 100}%` }} />
      </div>
      <h1 className="font-display text-center text-xl leading-relaxed sm:text-2xl">
        {question.text}
      </h1>
      <ul className="mt-8 flex flex-col gap-3">
        {question.options.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              onClick={() => onAnswer(option.id)}
              className="border-gold/60 hover:border-gold hover:bg-gold/10 w-full rounded border-2 px-4 py-3 text-left transition-colors"
            >
              {option.text}
            </button>
          </li>
        ))}
      </ul>
      {index > 0 && (
        <p className="mt-6 text-center">
          <button
            type="button"
            onClick={onBack}
            className="text-parchment/70 hover:text-gold text-sm underline underline-offset-4"
          >
            前の質問に戻る
          </button>
        </p>
      )}
    </Frame>
  );
}
