/**
 * Breadcrumbs Component
 * Displays navigation breadcrumbs for current document location
 */

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
  onNavigate?: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {/* Home */}
        <li>
          <button
            onClick={() => onNavigate?.('/')}
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </button>
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.path} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              {isLast ? (
                <span className="font-medium text-gray-900">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate?.(item.path)}
                  className="text-gray-500 hover:text-gray-700 transition-colors hover:underline"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
