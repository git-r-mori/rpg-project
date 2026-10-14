import { Link } from 'react-router';
import { Frame } from '../ui/Frame';

/**
 * Page for `/`. Introduces the diagnosis and links to `/diagnosis` to start it.
 */
export function HomePage() {
  return (
    <Frame title="WELCOME, ADVENTURER">
      <h1 className="font-display text-center text-3xl sm:text-4xl">RPGキャラ診断</h1>
      <p className="text-parchment/80 mt-6 text-center leading-relaxed">
        10 の質問に答えると、あなたにぴったりの職業・能力値・スキルを持つ RPG
        キャラクターが生まれます。
      </p>
      <p className="mt-8 text-center">
        <Link
          to="/diagnosis"
          className="border-gold text-gold hover:bg-gold hover:text-ink inline-block rounded border-2 px-8 py-3 font-bold transition-colors"
        >
          診断を始める
        </Link>
      </p>
    </Frame>
  );
}
