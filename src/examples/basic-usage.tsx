/**
 * Basic Usage Examples for Documentation Viewer
 *
 * This file contains simple, copy-paste examples for common use cases
 */

import React, { useState } from 'react';
import { DocumentList } from '../components/documentation/DocumentList';
import { SearchBar } from '../components/documentation/SearchBar';
import type { Document } from '../types/document';

// Note: DocumentViewer component not yet implemented
const DocumentViewer = ({ document, onClose }: any) => (
  <div>
    <h2>{document.title}</h2>
    <p>Document viewer placeholder for: {document.filePath}</p>
    {onClose && <button onClick={onClose}>Close</button>}
  </div>
);

// ========================================
// Example 1: Simple PDF Viewer
// ========================================

export function Example1_SimplePDFViewer() {
  const document: Document = {
    id: '1',
    title: 'User Guide',
    filePath: '/docs/user-guide.pdf',
    type: 'pdf'
  };

  return <DocumentViewer document={document} />;
}

// ========================================
// Example 2: Document List with Selection
// ========================================

export function Example2_DocumentListWithSelection() {
  const documents: Document[] = [
    {
      id: '1',
      title: 'Getting Started',
      filePath: '/docs/getting-started.pdf',
      type: 'pdf',
      category: 'Tutorial',
      description: 'Quick start guide for new users'
    },
    {
      id: '2',
      title: 'API Reference',
      filePath: '/docs/api-reference.pdf',
      type: 'pdf',
      category: 'Reference',
      description: 'Complete API documentation'
    }
  ];

  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '300px' }}>
        <DocumentList
          documents={documents}
          onSelectDocument={setSelectedDoc}
          selectedDocumentId={selectedDoc?.id}
        />
      </aside>
      <main style={{ flex: 1 }}>
        {selectedDoc ? (
          <DocumentViewer
            document={selectedDoc}
            onClose={() => setSelectedDoc(null)}
          />
        ) : (
          <div>Select a document to view</div>
        )}
      </main>
    </div>
  );
}

// ========================================
// Example 3: With Search and Filtering
// ========================================

export function Example3_WithSearchAndFiltering() {
  const documents: Document[] = [
    {
      id: '1',
      title: 'User Guide',
      filePath: '/docs/user-guide.pdf',
      type: 'pdf',
      category: 'Tutorial',
      tags: ['beginner', 'guide']
    },
    {
      id: '2',
      title: 'Advanced Features',
      filePath: '/docs/advanced.pdf',
      type: 'pdf',
      category: 'Tutorial',
      tags: ['advanced', 'features']
    },
    {
      id: '3',
      title: 'API Documentation',
      filePath: '/docs/api.pdf',
      type: 'pdf',
      category: 'Reference',
      tags: ['api', 'reference']
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <SearchBar
          onSearch={setSearchQuery}
          onCategoryChange={setCategoryFilter}
          categories={['Tutorial', 'Reference']}
          placeholder="Search documentation..."
        />
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: '300px', borderRight: '1px solid #ddd' }}>
          <DocumentList
            documents={documents}
            onSelectDocument={setSelectedDoc}
            selectedDocumentId={selectedDoc?.id}
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
          />
        </aside>

        <main style={{ flex: 1 }}>
          {selectedDoc ? (
            <DocumentViewer
              document={selectedDoc}
              onClose={() => setSelectedDoc(null)}
            />
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
              <p>Select a document from the list</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ========================================
// Example 4: Loading Documents from API
// ========================================

export function Example4_LoadFromAPI() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/documents');
      if (!response.ok) throw new Error('Failed to load documents');
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading documents...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DocumentList
      documents={documents}
      onSelectDocument={(doc) => console.log('Selected:', doc)}
    />
  );
}

// ========================================
// Example 5: Custom Document Metadata
// ========================================

export function Example5_CustomMetadata() {
  const document: Document = {
    id: '1',
    title: 'Project Specification',
    filePath: '/docs/spec.pdf',
    type: 'pdf',
    category: 'Specification',
    tags: ['project', 'requirements', 'design'],
    description: 'Complete project specification document',
    author: 'Engineering Team',
    lastModified: new Date('2025-09-30'),
    size: 2500000, // bytes
    pageCount: 45
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <DocumentViewer document={document} />
      </div>
      <aside style={{ width: '300px', padding: '1rem' }}>
        <h3>Document Info</h3>
        <dl>
          <dt>Title:</dt>
          <dd>{document.title}</dd>

          <dt>Author:</dt>
          <dd>{document.author}</dd>

          <dt>Pages:</dt>
          <dd>{document.pageCount}</dd>

          <dt>Size:</dt>
          <dd>{(document.size! / 1024 / 1024).toFixed(2)} MB</dd>

          <dt>Category:</dt>
          <dd>{document.category}</dd>

          <dt>Tags:</dt>
          <dd>{document.tags?.join(', ')}</dd>
        </dl>
      </aside>
    </div>
  );
}

// ========================================
// Example 6: Keyboard Shortcuts Demo
// ========================================

export function Example6_KeyboardShortcuts() {
  const document: Document = {
    id: '1',
    title: 'Keyboard Shortcuts Guide',
    filePath: '/docs/shortcuts.pdf',
    type: 'pdf'
  };

  return (
    <div>
      <div style={{
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        marginBottom: '1rem'
      }}>
        <h3>Available Keyboard Shortcuts:</h3>
        <ul>
          <li><kbd>Ctrl+K</kbd> - Focus search</li>
          <li><kbd>→</kbd> or <kbd>Page Down</kbd> - Next page</li>
          <li><kbd>←</kbd> or <kbd>Page Up</kbd> - Previous page</li>
          <li><kbd>+</kbd> - Zoom in</li>
          <li><kbd>-</kbd> - Zoom out</li>
          <li><kbd>R</kbd> - Rotate document</li>
          <li><kbd>Esc</kbd> - Close viewer</li>
        </ul>
      </div>

      <DocumentViewer document={document} />
    </div>
  );
}

// ========================================
// Helper: Create Sample Documents
// ========================================

export function createSampleDocuments(): Document[] {
  return [
    {
      id: '1',
      title: 'Introduction to React',
      filePath: '/docs/react-intro.pdf',
      type: 'pdf',
      category: 'Tutorial',
      tags: ['react', 'javascript', 'frontend'],
      description: 'Learn React fundamentals',
      author: 'React Team',
      lastModified: new Date('2025-09-28'),
      pageCount: 32
    },
    {
      id: '2',
      title: 'TypeScript Handbook',
      filePath: '/docs/typescript-handbook.pdf',
      type: 'pdf',
      category: 'Reference',
      tags: ['typescript', 'javascript', 'types'],
      description: 'Complete TypeScript reference',
      author: 'TS Contributors',
      lastModified: new Date('2025-09-25'),
      pageCount: 156
    },
    {
      id: '3',
      title: 'Web Accessibility Guide',
      filePath: '/docs/a11y-guide.pdf',
      type: 'pdf',
      category: 'Guide',
      tags: ['accessibility', 'a11y', 'wcag'],
      description: 'Making web content accessible',
      author: 'W3C',
      lastModified: new Date('2025-09-20'),
      pageCount: 64
    }
  ];
}
