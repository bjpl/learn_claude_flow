import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { AppRouter } from './router/routes';
import { DocumentationApp } from './components';
import { TestComponent } from './components/TestComponent';
import './index.css';

console.log('[APP] Starting React initialization...');
console.log('[APP] React version:', React.version);

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('[APP] Root element not found!');
  throw new Error('Root element not found');
}

console.log('[APP] Root element found, creating React root...');

// Test mode: Use ?test in URL to test basic rendering
// Router mode: Use ?router in URL to test React Router
const isTestMode = window.location.search.includes('test');
const isRouterMode = window.location.search.includes('router') || !window.location.search.includes('legacy');
console.log('[APP] Test mode:', isTestMode);
console.log('[APP] Router mode:', isRouterMode);

try {
  const root = ReactDOM.createRoot(rootElement);
  console.log('[APP] React root created, rendering app...');

  root.render(
    <React.StrictMode>
      <HelmetProvider>
        {isTestMode ? (
          <TestComponent />
        ) : isRouterMode ? (
          <AppRouter />
        ) : (
          <DocumentationApp />
        )}
      </HelmetProvider>
    </React.StrictMode>
  );

  console.log('[APP] React render called successfully');
} catch (error) {
  console.error('[APP] Error during React initialization:', error);
  throw error;
}
