import { useState, useCallback } from 'react';
import { SearchableNavigation } from './components/SearchableNavigation';
import { ContentPanel } from './components/ContentPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import type {
  Document,
  NavigationItem,
  ViewerState,
  Bookmark,
  Note,
} from './types';

// Sample data - replace with actual data loading
const SAMPLE_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Getting Started Guide',
    url: '/docs/getting-started.pdf',
    type: 'pdf',
    category: 'Documentation',
    tags: ['beginner', 'tutorial'],
  },
  {
    id: '2',
    title: 'API Reference',
    url: '/docs/api-reference.pdf',
    type: 'pdf',
    category: 'Documentation',
    tags: ['api', 'reference'],
  },
  {
    id: '3',
    title: 'Best Practices',
    url: '/docs/best-practices.pdf',
    type: 'pdf',
    category: 'Guides',
    tags: ['advanced', 'patterns'],
  },
];

const SAMPLE_NAVIGATION: NavigationItem[] = [
  {
    id: 'nav-1',
    label: 'Introduction',
    documentId: '1',
    icon: '📖',
  },
  {
    id: 'nav-2',
    label: 'Core Concepts',
    icon: '🎯',
    children: [
      { id: 'nav-2-1', label: 'Architecture', documentId: '1', pageNumber: 5 },
      { id: 'nav-2-2', label: 'Components', documentId: '1', pageNumber: 10 },
    ],
  },
  {
    id: 'nav-3',
    label: 'API Documentation',
    documentId: '2',
    icon: '⚙️',
  },
];

function App() {
  // Load documents and navigation (in real app, fetch from API)
  const [documents] = useState<Document[]>(SAMPLE_DOCUMENTS);
  const [navigationItems] = useState<NavigationItem[]>(SAMPLE_NAVIGATION);

  // Persistent state with localStorage
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('learn-claude-flow-bookmarks', []);
  const [notes, setNotes] = useLocalStorage<Note[]>('learn-claude-flow-notes', []);

  // Viewer state
  const [viewerState, setViewerState] = useState<ViewerState>({
    currentDocument: null,
    currentPage: 1,
    zoom: 1.0,
    searchQuery: '',
    searchResults: [],
    bookmarks,
    notes,
    highlights: {},
  });

  // Document selection
  const handleDocumentSelect = useCallback((document: Document) => {
    setViewerState((prev) => ({
      ...prev,
      currentDocument: document,
      currentPage: 1,
    }));
  }, []);

  // Navigation selection
  const handleNavigationSelect = useCallback((item: NavigationItem) => {
    if (item.documentId) {
      const document = documents.find((d) => d.id === item.documentId);
      if (document) {
        setViewerState((prev) => ({
          ...prev,
          currentDocument: document,
          currentPage: item.pageNumber || 1,
        }));
      }
    }
  }, [documents]);

  // Page navigation
  const handlePageChange = useCallback((page: number) => {
    setViewerState((prev) => ({ ...prev, currentPage: page }));
  }, []);

  // Zoom control
  const handleZoomChange = useCallback((zoom: number) => {
    setViewerState((prev) => ({ ...prev, zoom }));
  }, []);

  // Bookmark management
  const handleAddBookmark = useCallback((bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `bookmark-${Date.now()}`,
      createdAt: new Date(),
    };
    setBookmarks((prev) => [...prev, newBookmark]);
    setViewerState((prev) => ({ ...prev, bookmarks: [...prev.bookmarks, newBookmark] }));
  }, [setBookmarks]);

  const handleDeleteBookmark = useCallback((bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
    setViewerState((prev) => ({
      ...prev,
      bookmarks: prev.bookmarks.filter((b) => b.id !== bookmarkId),
    }));
  }, [setBookmarks]);

  const handleNavigateToBookmark = useCallback((bookmark: Bookmark) => {
    const document = documents.find((d) => d.id === bookmark.documentId);
    if (document) {
      setViewerState((prev) => ({
        ...prev,
        currentDocument: document,
        currentPage: bookmark.pageNumber || 1,
      }));
    }
  }, [documents]);

  // Note management
  const handleAddNote = useCallback((note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => [...prev, newNote]);
    setViewerState((prev) => ({ ...prev, notes: [...prev.notes, newNote] }));
  }, [setNotes]);

  const handleUpdateNote = useCallback((noteId: string, content: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId ? { ...n, content, updatedAt: new Date() } : n
      )
    );
    setViewerState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) =>
        n.id === noteId ? { ...n, content, updatedAt: new Date() } : n
      ),
    }));
  }, [setNotes]);

  const handleDeleteNote = useCallback((noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    setViewerState((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== noteId),
    }));
  }, [setNotes]);

  const handleNavigateToNote = useCallback((note: Note) => {
    const document = documents.find((d) => d.id === note.documentId);
    if (document) {
      setViewerState((prev) => ({
        ...prev,
        currentDocument: document,
        currentPage: note.pageNumber || 1,
      }));
    }
  }, [documents]);

  // Text selection handler
  const handleTextSelect = useCallback((text: string, position: { x: number; y: number }) => {
    console.log('Text selected:', text, 'at position:', position);
    // Could show a context menu for highlighting, bookmarking, or note-taking
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900">Learn Claude Flow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="Settings">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar */}
        <div className="w-80 flex-shrink-0">
          <SearchableNavigation
            documents={documents}
            navigationItems={navigationItems}
            currentDocument={viewerState.currentDocument}
            onDocumentSelect={handleDocumentSelect}
            onNavigationSelect={handleNavigationSelect}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <ContentPanel
            viewerState={viewerState}
            onPageChange={handlePageChange}
            onZoomChange={handleZoomChange}
            onAddBookmark={handleAddBookmark}
            onDeleteBookmark={handleDeleteBookmark}
            onNavigateToBookmark={handleNavigateToBookmark}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
            onNavigateToNote={handleNavigateToNote}
            onTextSelect={handleTextSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
