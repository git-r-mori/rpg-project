import { RouterProvider } from 'react-router';
import { router } from './router';

/**
 * Root component of the web app. Renders the page that matches the current URL.
 */
export function App() {
  return <RouterProvider router={router} />;
}
