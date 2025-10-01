/**
 * DocumentationApp Component
 * Alternative app entry point focused on documentation browsing
 */

import React, { useState, useEffect } from 'react';
import { DocumentationInterface } from './DocumentationInterface';
import { ErrorBoundary } from './ErrorBoundary';

console.log('[APP] DocumentationApp component loaded');

export const DocumentationApp: React.FC = () => {
  console.log('[APP] DocumentationApp rendering...');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('[APP] DocumentationApp mounted');
    setMounted(true);
  }, []);

  console.log('[APP] Mounted state:', mounted);

  return (
    <ErrorBoundary
      fallback={
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-lg p-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Failed to Load Application
            </h1>
            <p className="text-gray-600 mb-6">
              There was an error loading the documentation interface.
              Please check the browser console for details.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      }
    >
      <DocumentationInterface />
    </ErrorBoundary>
  );
};
