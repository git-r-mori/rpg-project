import { Frame } from '../ui/Frame';

/**
 * Page for `/about`. Shows a short description of the app.
 */
export function AboutPage() {
  return (
    <Frame title="ABOUT">
      <p className="text-center leading-relaxed">
        いくつかの質問に答えると、あなただけのRPGキャラクターが生まれる診断アプリです。
        <br />
        現在は開発中です。
      </p>
    </Frame>
  );
}
