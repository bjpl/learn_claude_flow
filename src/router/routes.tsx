/**
 * React Router v6 Configuration
 * Route definitions with lazy loading and Suspense boundaries
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Eager loaded (critical path)
import { RootLayout } from '../layouts/RootLayout';
import { DocumentationApp } from '../components/DocumentationApp';

// Lazy loaded (code splitting)
const DocumentViewerRoute = lazy(() => import('../views/DocumentViewerRoute'));
const SearchRoute = lazy(() => import('../views/SearchRoute'));
const SettingsRoute = lazy(() => import('../views/SettingsRoute'));

// Route configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary><div>Error loading page</div></ErrorBoundary>,
    children: [
      {
        index: true,
        element: <DocumentationApp />,
      },
      {
        path: 'doc/:documentId',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading document..." />}>
            <DocumentViewerRoute />
          </Suspense>
        ),
      },
      {
        path: 'doc/:documentId/page/:pageNumber',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading document..." />}>
            <DocumentViewerRoute />
          </Suspense>
        ),
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading search..." />}>
            <SearchRoute />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading settings..." />}>
            <SettingsRoute />
          </Suspense>
        ),
      },
    ],
  },
], {
  basename: '/learn_claude_flow'
});

// App entry point
export function AppRouter() {
  return <RouterProvider router={router} />;
}
