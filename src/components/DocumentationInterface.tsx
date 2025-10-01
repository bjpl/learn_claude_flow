/**
 * DocumentationInterface Component
 * Main interface combining explorer, viewer, and navigation with knowledge graph
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X, BookOpen, Search as SearchIcon, Home, Layout } from 'lucide-react';
import { OverviewDashboard } from './OverviewDashboard';
import { SmartSearch } from './SmartSearch';
import { CategoryExplorer } from './CategoryExplorer';
import { RelatedDocuments } from './RelatedDocuments';
import { MarkdownViewer, TableOfContents } from './MarkdownViewer';
import { Breadcrumbs } from './Breadcrumbs';
import type { Document, Breadcrumb } from '../types';
import type { TocItem } from '../utils/documentExtractor';
import { loadDocumentsFromDirectory, loadDocumentContent } from '../utils/documentLoader';
import { buildKnowledgeGraph } from '../utils/knowledgeGraph';
import type { KnowledgeGraph } from '../utils/knowledgeGraph';

type View = 'overview' | 'category' | 'document';

export const DocumentationInterface: React.FC = () => {
  console.log('[APP] DocumentationInterface component rendering...');

  const [documents, setDocuments] = useState<Document[]>([]);
  const [knowledgeGraph, setKnowledgeGraph] = useState<KnowledgeGraph | null>(null);
  const [currentView, setCurrentView] = useState<View>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [documentContent, setDocumentContent] = useState<string>('');
  const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [smartSearchOpen, setSmartSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load documents and build knowledge graph on mount
  useEffect(() => {
    console.log('[APP] useEffect triggered - loading documents...');

    const loadData = async () => {
      try {
        const docs = await loadDocumentsFromDirectory('/.claude');
        console.log('[APP] Documents loaded:', docs.length);

        if (docs.length === 0) {
          console.warn('[APP] No documents found! Using empty graph.');
          setDocuments([]);
          setKnowledgeGraph({
            nodes: new Map(),
            categories: new Map(),
            searchIndex: new Map(),
            frequentlyUsed: []
          });
          return;
        }

        console.log('[APP] Building knowledge graph...');
        const startTime = performance.now();
        const graph = buildKnowledgeGraph(docs);
        const endTime = performance.now();
        console.log('[APP] Knowledge graph built in', (endTime - startTime).toFixed(2), 'ms');
        console.log('[APP] Graph stats:', {
          nodes: graph.nodes.size,
          categories: graph.categories.size,
          searchTerms: graph.searchIndex.size
        });

        console.log('[APP] Setting documents state...');
        setDocuments(docs);
        console.log('[APP] Setting knowledge graph state...');
        setKnowledgeGraph(graph);
        console.log('[APP] State updates called successfully');

      } catch (error) {
        console.error('[APP] Error in loadData:', error);
        setDocuments([]);
        setKnowledgeGraph({
          nodes: new Map(),
          categories: new Map(),
          searchIndex: new Map(),
          frequentlyUsed: []
        });
      }
    };

    loadData();
  }, []);

  // Load document content when selected
  useEffect(() => {
    if (selectedDocument?.filePath) {
      setIsLoading(true);
      loadDocumentContent(selectedDocument.filePath)
        .then(setDocumentContent)
        .finally(() => setIsLoading(false));
    }
  }, [selectedDocument]);

  // Keyboard shortcut for search (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSmartSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDocumentSelect = useCallback((doc: Document) => {
    setSelectedDocument(doc);
    setCurrentView('document');
    setSmartSearchOpen(false);
    setSelectedCategory(doc.category || null);
  }, []);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentView('category');
    setSelectedDocument(null);
  }, []);

  const handleHomeClick = useCallback(() => {
    setCurrentView('overview');
    setSelectedCategory(null);
    setSelectedDocument(null);
  }, []);

  const handleSearchFocus = useCallback(() => {
    setSmartSearchOpen(true);
  }, []);

  const handleTocClick = useCallback((item: TocItem) => {
    const element = document.getElementById(item.id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const breadcrumbs = useMemo(() => {
    const items: Breadcrumb[] = [
      { label: 'Home', path: '/', onClick: handleHomeClick },
    ];

    if (selectedCategory) {
      const parts = selectedCategory.split('/');
      items.push({ label: parts[0], path: `/category/${parts[0]}`, onClick: () => handleCategorySelect(selectedCategory) });
      if (parts[1]) {
        items.push({ label: parts[1], path: `/category/${selectedCategory}` });
      }
    }

    if (selectedDocument) {
      items.push({ label: selectedDocument.title, path: `/doc/${selectedDocument.id}` });
    }

    return items;
  }, [selectedCategory, selectedDocument, handleHomeClick, handleCategorySelect]);

  console.log('[APP] Render check:', {
    knowledgeGraph: !!knowledgeGraph,
    documents: documents.length,
    currentView,
    hasData: documents.length > 0 && knowledgeGraph && knowledgeGraph.nodes.size > 0
  });

  if (!knowledgeGraph) {
    console.log('[APP] Still loading - no knowledge graph yet');
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading knowledge base...</p>
          <p className="text-xs text-gray-500 mt-2">{documents.length} documents loaded</p>
        </div>
      </div>
    );
  }

  console.log('[APP] Knowledge graph exists, rendering main interface');

  // Emergency fallback: render even if empty
  const hasData = documents.length > 0 && knowledgeGraph.nodes.size > 0;

  console.log('[APP] About to render main UI, hasData:', hasData, 'currentView:', currentView);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={handleHomeClick}
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
            >
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Claude Flow</h1>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSmartSearchOpen(!smartSearchOpen)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${smartSearchOpen ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}
              `}
              aria-label="Smart search"
            >
              <SearchIcon className="w-5 h-5" />
              <span className="hidden md:inline text-sm">Search</span>
              <kbd className="hidden md:inline px-2 py-1 text-xs bg-gray-200 rounded border border-gray-300">
                Ctrl+K
              </kbd>
            </button>

            <button
              onClick={handleHomeClick}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
              aria-label="Home"
            >
              <Home className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg text-gray-600"
              aria-label="Toggle sidebar"
            >
              <Layout className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Smart Search Modal */}
      {smartSearchOpen && (
        <SmartSearch
          documents={documents}
          knowledgeGraph={knowledgeGraph}
          onDocumentSelect={handleDocumentSelect}
          onClose={() => setSmartSearchOpen(false)}
          autoFocus
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar - Category Explorer (only for category/document views) */}
        {currentView !== 'overview' && (
          <aside
            className={`
              ${sidebarOpen ? 'block' : 'hidden'}
              w-80 flex-shrink-0
              lg:block
              border-r border-gray-200
            `}
          >
            <CategoryExplorer
              documents={documents}
              knowledgeGraph={knowledgeGraph}
              selectedDocument={selectedDocument}
              onDocumentSelect={handleDocumentSelect}
              selectedCategory={selectedCategory || undefined}
            />
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Breadcrumbs */}
          {currentView !== 'overview' && breadcrumbs.length > 1 && (
            <div className="bg-white border-b border-gray-200 px-6 py-3">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {currentView === 'overview' && (
              hasData ? (
                <OverviewDashboard
                  documents={documents}
                  knowledgeGraph={knowledgeGraph}
                  onCategorySelect={handleCategorySelect}
                  onDocumentSelect={handleDocumentSelect}
                  onSearchFocus={handleSearchFocus}
                />
              ) : (
                <div className="max-w-4xl mx-auto px-6 py-8">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Documentation Found</h2>
                    <p className="text-gray-600 mb-4">
                      The documentation directory appears to be empty.
                    </p>
                    <p className="text-sm text-gray-500">
                      Expected documents in: <code className="bg-gray-100 px-2 py-1 rounded">/.claude</code>
                    </p>
                  </div>
                </div>
              )
            )}

            {currentView === 'category' && !selectedDocument && (
              <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedCategory}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Select a document from the sidebar to get started.
                  </p>
                </div>
              </div>
            )}

            {currentView === 'document' && selectedDocument && (
              <div className="bg-white">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full py-20">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading document...</p>
                    </div>
                  </div>
                ) : (
                  <MarkdownViewer
                    content={documentContent}
                    onTocGenerated={setTableOfContents}
                  />
                )}
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar - Related Documents or TOC */}
        {currentView === 'document' && selectedDocument && (
          <aside className="hidden lg:block w-80 flex-shrink-0">
            {tableOfContents.length > 0 ? (
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto border-b border-gray-200">
                  <TableOfContents
                    items={tableOfContents}
                    onItemClick={handleTocClick}
                  />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <RelatedDocuments
                    currentDocument={selectedDocument}
                    knowledgeGraph={knowledgeGraph}
                    documents={documents}
                    onDocumentSelect={handleDocumentSelect}
                  />
                </div>
              </div>
            ) : (
              <RelatedDocuments
                currentDocument={selectedDocument}
                knowledgeGraph={knowledgeGraph}
                documents={documents}
                onDocumentSelect={handleDocumentSelect}
              />
            )}
          </aside>
        )}
      </div>
    </div>
  );
};
