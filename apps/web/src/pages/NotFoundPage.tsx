import { Link } from 'react-router';
import { Frame } from '../ui/Frame';

/**
 * Fallback page for unknown paths. Shows a not-found message and a link back to `/`.
 */
export function NotFoundPage() {
  return (
    <Frame title="404">
      <p className="text-center">この先は霧に包まれていて進めないようだ。</p>
      <p className="mt-4 text-center">
        <Link to="/" className="text-gold underline underline-offset-4">
          はじまりの地へ戻る
        </Link>
      </p>
    </Frame>
  );
}
