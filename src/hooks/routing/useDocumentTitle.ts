/**
 * Document Title Hook
 * Manages dynamic page titles based on route
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useDocumentTitle(title?: string) {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = 'Learn Claude Flow';

    if (title) {
      document.title = `${title} | ${baseTitle}`;
    } else {
      // Generate from route
      const routeTitle = generateTitleFromRoute(location.pathname);
      document.title = routeTitle ? `${routeTitle} | ${baseTitle}` : baseTitle;
    }
  }, [title, location.pathname]);
}

function generateTitleFromRoute(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);

  if (parts.length === 0) return 'Home';
  if (parts[0] === 'doc') return 'Reading Document';
  if (parts[0] === 'search') return 'Search Results';
  if (parts[0] === 'settings') return 'Settings';

  return '';
}
