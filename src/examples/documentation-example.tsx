/**
 * Documentation Interface Usage Example
 * Demonstrates how to use the documentation browsing components
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { DocumentationApp } from '../components';

/**
 * Example 1: Standalone Documentation App
 * Use this when you want a dedicated documentation viewer
 */
function StandaloneExample() {
  return <DocumentationApp />;
}

/**
 * Example 2: Custom Integration
 * Integrate documentation with existing app
 */
import {
  DocumentationInterface,
  DocumentExplorer,
  MarkdownViewer,
} from '../components';
import type { Document } from '../types';

function CustomIntegrationExample() {
  const [selectedDoc, setSelectedDoc] = React.useState<Document | null>(null);
  const [documents] = React.useState<Document[]>([
    {
      id: 'doc-1',
      title: 'Getting Started',
      filePath: '/.claude/docs/getting-started.md',
      type: 'markdown',
      category: 'Guides',
      tags: ['beginner', 'tutorial'],
    },
    // Add more documents...
  ]);

  return (
    <div className="h-screen flex">
      {/* Left: Document Explorer */}
      <div className="w-80 border-r">
        <DocumentExplorer
          documents={documents}
          selectedDocument={selectedDoc}
          onDocumentSelect={setSelectedDoc}
        />
      </div>

      {/* Right: Content Viewer */}
      <div className="flex-1 overflow-auto">
        {selectedDoc ? (
          <MarkdownViewer content="# Your markdown content here" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a document to view</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Example 3: Embedded Documentation Panel
 * Add documentation as a panel in your existing app
 */
function EmbeddedPanelExample() {
  const [showDocs, setShowDocs] = React.useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Your main app header */}
      <header className="bg-white border-b p-4">
        <button
          onClick={() => setShowDocs(!showDocs)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {showDocs ? 'Hide' : 'Show'} Documentation
        </button>
      </header>

      <div className="flex-1 flex">
        {/* Your main app content */}
        <main className="flex-1 p-4">
          <h1>Your Main App Content</h1>
        </main>

        {/* Documentation panel */}
        {showDocs && (
          <aside className="w-1/3 border-l">
            <DocumentationInterface />
          </aside>
        )}
      </div>
    </div>
  );
}

/**
 * Example 4: Search-Only Interface
 * Focus on search functionality
 */
import { AdvancedSearch } from '../components';

function SearchOnlyExample() {
  const [documents] = React.useState<Document[]>([]);

  const handleDocumentSelect = (doc: Document) => {
    console.log('Selected:', doc);
    // Handle document selection
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Search Documentation</h1>
      <AdvancedSearch
        documents={documents}
        onDocumentSelect={handleDocumentSelect}
      />
    </div>
  );
}

/**
 * Example 5: With Custom Styling
 * Apply custom theme and styling
 */
function CustomStyledExample() {
  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="h-full max-w-7xl mx-auto p-4">
        <DocumentationApp />
      </div>
    </div>
  );
}

// Mount example
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<StandaloneExample />);

// Export all examples for documentation
export {
  StandaloneExample,
  CustomIntegrationExample,
  EmbeddedPanelExample,
  SearchOnlyExample,
  CustomStyledExample,
};
