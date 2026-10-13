import { Link, Outlet } from 'react-router';

/**
 * Shared page shell: a header with links to the home and about pages,
 * and a centered main area where the matched child route is rendered.
 */
export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-gold/40 border-b px-4 py-3">
        <nav className="mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/" className="font-display text-gold text-lg tracking-widest">
            RPGキャラ診断
          </Link>
          <Link to="/about" className="hover:text-gold text-sm underline-offset-4 hover:underline">
            このアプリについて
          </Link>
        </nav>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 items-center justify-center p-4">
        <Outlet />
      </main>
    </div>
  );
}
