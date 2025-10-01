import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteAnnouncerProps {
  getPageTitle?: (pathname: string) => string;
  announceDelay?: number;
}

/**
 * RouteAnnouncer Component
 *
 * Announces route changes to screen readers for single-page applications.
 * Provides context about the current page after navigation.
 *
 * WCAG 2.1 Success Criteria:
 * - 4.1.3 Status Messages (Level AA)
 * - 2.4.2 Page Titled (Level A)
 */
export const RouteAnnouncer: React.FC<RouteAnnouncerProps> = ({
  getPageTitle,
  announceDelay = 100,
}) => {
  const location = useLocation();
  const announceRef = useRef<HTMLDivElement>(null);
  const previousPathRef = useRef<string>('');

  const defaultGetPageTitle = (pathname: string): string => {
    // Remove leading slash and split by /
    const segments = pathname.replace(/^\//, '').split('/');

    // Capitalize and format
    const formatted = segments
      .filter(Boolean)
      .map(segment =>
        segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      )
      .join(' - ');

    return formatted || 'Home';
  };

  useEffect(() => {
    const currentPath = location.pathname;

    // Only announce if the path has changed
    if (currentPath !== previousPathRef.current) {
      previousPathRef.current = currentPath;

      const pageTitle = getPageTitle
        ? getPageTitle(currentPath)
        : defaultGetPageTitle(currentPath);

      // Delay announcement to ensure DOM updates are complete
      const timeoutId = setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = `Navigated to ${pageTitle}`;

          // Update document title for browser tab
          document.title = `${pageTitle} - Learn Claude Flow`;
        }
      }, announceDelay);

      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, getPageTitle, announceDelay]);

  return (
    <div
      ref={announceRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
};

export default RouteAnnouncer;
