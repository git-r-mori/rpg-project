import { STAT_KEYS, STAT_LABELS, STAT_MAX } from '@rpg/domain';
import type { Stats } from '@rpg/domain';

/** Props for {@link StatBars}. */
type StatBarsProps = {
  /** The stats to show. */
  stats: Stats;
};

/**
 * A list of every stat with its Japanese label, value, and a gauge filled in proportion to the value.
 */
export function StatBars({ stats }: StatBarsProps) {
  return (
    <dl className="grid gap-3">
      {STAT_KEYS.map((key) => (
        <div key={key} className="grid grid-cols-[4.5rem_1fr_2.5rem] items-center gap-3">
          <dt className="text-sm">{STAT_LABELS[key]}</dt>
          <dd className="bg-ink h-3 overflow-hidden rounded-full" aria-hidden="true">
            <div
              className="bg-gold h-full"
              style={{ width: `${(stats[key] / STAT_MAX) * 100}%` }}
            />
          </dd>
          <dd className="text-right font-mono tabular-nums">{stats[key]}</dd>
        </div>
      ))}
    </dl>
  );
}
