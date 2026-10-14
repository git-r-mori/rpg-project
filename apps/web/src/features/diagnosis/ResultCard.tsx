import { STAT_LABELS } from '@rpg/domain';
import { Frame } from '../../ui/Frame';
import type { CharacterView } from './characterView';
import { StatBars } from './StatBars';

/** Props for {@link ResultCard}. */
type ResultCardProps = {
  /** The diagnosed character to show. */
  view: CharacterView;
  /** Called when the user wants to take the diagnosis again. */
  onRestart: () => void;
};

/**
 * The diagnosis result: the class name and description, the stat gauges,
 * the learned skills with their effects, and a button to start over.
 */
export function ResultCard({ view, onRestart }: ResultCardProps) {
  const { characterClass, stats, skills } = view;
  return (
    <Frame title="YOUR CHARACTER">
      <p className="text-parchment/70 text-center text-sm">あなたの職業は</p>
      <h1 className="font-display text-gold mt-2 text-center text-4xl">{characterClass.name}</h1>
      <p className="mt-4 text-center leading-relaxed">{characterClass.description}</p>

      <h2 className="font-display text-gold mt-10 mb-4 text-lg">能力値</h2>
      <StatBars stats={stats} />

      <h2 className="font-display text-gold mt-10 mb-4 text-lg">スキル</h2>
      <ul className="grid gap-3">
        {skills.map((skill) => (
          <li key={skill.id} className="border-gold/40 rounded border px-4 py-3">
            <p className="flex items-baseline justify-between gap-2">
              <span className="font-bold">{skill.name}</span>
              <span className="text-parchment/60 text-xs">{STAT_LABELS[skill.stat]}</span>
            </p>
            <p className="text-parchment/80 mt-1 text-sm">{skill.description}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-center">
        <button
          type="button"
          onClick={onRestart}
          className="border-gold text-gold hover:bg-gold hover:text-ink rounded border-2 px-8 py-3 font-bold transition-colors"
        >
          もう一度診断する
        </button>
      </p>
    </Frame>
  );
}
