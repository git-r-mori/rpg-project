import { createBrowserRouter } from 'react-router';
import { AboutPage } from '../pages/AboutPage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Layout } from './Layout';

/**
 * Browser router for the app. Every route renders inside {@link Layout};
 * unknown paths fall through to {@link NotFoundPage}.
 */
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
