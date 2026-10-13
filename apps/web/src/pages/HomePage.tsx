import { greet } from '@rpg/domain';
import { Frame } from '../ui/Frame';

/**
 * Page for `/`. Shows the greeting produced by `greet('World')` from `@rpg/domain`,
 * confirming that web can import and run domain code.
 */
export function HomePage() {
  return (
    <Frame title="WELCOME, ADVENTURER">
      <h1 className="font-display text-center text-4xl sm:text-5xl">{greet('World')}</h1>
      <p className="text-parchment/70 mt-6 text-center text-sm">
        このメッセージは <code className="text-gold">@rpg/domain</code> の{' '}
        <code className="text-gold">greet()</code> から生成されています。
      </p>
    </Frame>
  );
}
