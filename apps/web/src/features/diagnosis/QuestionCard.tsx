import type { Question } from '@rpg/domain';
import { Link } from 'react-router';
import { Frame } from '../../ui/Frame';
import { emptyOptionSlotCount } from './emptyOptionSlotCount';

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
  /** Called when the user goes back to the previous question. Not called on the first question. */
  onBack: () => void;
};

const OPTION_BOX_CLASS = 'w-full rounded border-2 px-4 py-3 text-left';
const BACK_LINK_CLASS = 'text-parchment/70 hover:text-gold text-sm underline underline-offset-4';
const BACK_LABEL = '前の画面に戻る';

/**
 * One questionnaire question: progress, the question text, one button per option, and a back
 * control. Questions with fewer options are padded with invisible rows so every card has the same
 * height. The back control links to `/` on the first question and returns to the previous question
 * otherwise.
 */
export function QuestionCard({ question, index, total, onAnswer, onBack }: QuestionCardProps) {
  const emptySlots = Array.from({ length: emptyOptionSlotCount(question.options.length) });
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
              className={`${OPTION_BOX_CLASS} border-gold/60 hover:border-gold hover:bg-gold/10 transition-colors`}
            >
              {option.text}
            </button>
          </li>
        ))}
        {emptySlots.map((_, slot) => (
          <li key={`empty-${slot}`} aria-hidden="true" className="invisible">
            <div className={`${OPTION_BOX_CLASS} border-transparent`}>&nbsp;</div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center">
        {index === 0 ? (
          <Link to="/" className={BACK_LINK_CLASS}>
            {BACK_LABEL}
          </Link>
        ) : (
          <button type="button" onClick={onBack} className={BACK_LINK_CLASS}>
            {BACK_LABEL}
          </button>
        )}
      </p>
    </Frame>
  );
}
