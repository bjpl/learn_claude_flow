# System Architecture Design - Interactive Documentation Interface

## Executive Summary

This document presents a comprehensive system architecture for an interactive documentation interface that extracts, organizes, and presents all Claude Flow documentation content through a modern, searchable web application.

**Architecture Date**: September 30, 2025
**System Scope**: Full-stack documentation platform with PDF processing, search, and interactive learning features
**Technology Stack**: React 18 + TypeScript, Node.js, Vite, Zustand, Fuse.js

---

## 1. System Overview

### 1.1 Architecture Goals

1. **Comprehensive Content Integration**: Extract and organize 24 PDF documents (590 pages, 642KB text)
2. **Intelligent Search**: Fuzzy search across all documentation with relationship mapping
3. **Interactive Learning**: Bookmarks, notes, progress tracking, and personalized learning paths
4. **Performance**: Fast load times, responsive UI, efficient caching
5. **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support
6. **Scalability**: Modular architecture supporting future content expansion

### 1.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interface Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Navigation  │  │   Content    │  │   Search     │          │
│  │   Component  │  │   Viewer     │  │   Engine     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Bookmarks   │  │    Notes     │  │   Progress   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Application State Layer                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Zustand Global State Store                  │   │
│  │  • UI State  • Navigation  • Search  • User Data        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Data Processing Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │     PDF      │  │   Content    │  │    Search    │          │
│  │  Extraction  │  │   Indexing   │  │   Indexing   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Persistence Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Content     │  │    User      │  │   Browser    │          │
│  │  Index JSON  │  │    Data      │  │   Storage    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Architecture

### 2.1 Core Component Hierarchy

```
DocumentationApp (Root)
│
├── AppProvider (Global Context & State)
│   ├── ThemeProvider
│   ├── RouterProvider
│   └── ErrorBoundary
│
├── Header
│   ├── Logo
│   ├── GlobalSearchBar
│   │   ├── SearchInput (with keyboard shortcuts)
│   │   ├── SearchSuggestions
│   │   └── SearchResults
│   ├── ThemeToggle
│   ├── ProgressIndicator
│   └── UserMenu
│
├── MainLayout
│   ├── NavigationSidebar
│   │   ├── NavigationTree
│   │   │   ├── NavSection (collapsible)
│   │   │   │   └── NavItem (with badges)
│   │   │   └── NavSearch (filtered navigation)
│   │   ├── QuickLinks
│   │   └── ClusterNavigation (by topic)
│   │
│   ├── ContentArea
│   │   ├── ContentHeader
│   │   │   ├── Breadcrumbs
│   │   │   ├── DocumentMetadata
│   │   │   └── TableOfContents (sticky)
│   │   │
│   │   ├── ContentViewer
│   │   │   ├── MarkdownRenderer
│   │   │   │   ├── CodeBlock (syntax highlighting)
│   │   │   │   ├── Callout (warnings, tips, notes)
│   │   │   │   ├── LinkRenderer (internal/external)
│   │   │   │   └── ImageRenderer (lazy loading)
│   │   │   ├── HighlightManager
│   │   │   └── ScrollProgressTracker
│   │   │
│   │   ├── RelatedDocuments
│   │   │   ├── SameCluster (related by topic)
│   │   │   ├── StrongRelationships (keyword overlap)
│   │   │   └── Recommended (based on progress)
│   │   │
│   │   └── ContentFooter
│   │       ├── PreviousNext (sequential navigation)
│   │       ├── LastUpdated
│   │       └── FeedbackWidget
│   │
│   └── RightSidebar (toggleable)
│       ├── BookmarkManager
│       │   ├── BookmarkList
│       │   │   └── BookmarkItem (draggable)
│       │   ├── FolderManager
│       │   └── BookmarkSearch
│       │
│       └── NotesPanel
│           ├── NotesList
│           │   └── NoteCard
│           ├── NoteEditor (markdown support)
│           └── NoteSearch
│
└── Footer
    ├── SiteMap
    ├── QuickLinks
    └── Copyright
```

### 2.2 Component Communication Patterns

#### Pattern 1: Props Cascade (Parent → Child)
```typescript
<ContentViewer
  documentId={currentDocId}
  content={documentContent}
  metadata={metadata}
  onBookmark={handleBookmark}
  onNote={handleNote}
/>
```

#### Pattern 2: Event Callbacks (Child → Parent)
```typescript
<SearchBar
  onSearch={handleSearch}
  onResultSelect={handleResultSelect}
  onClear={handleClear}
/>
```

#### Pattern 3: Global State (Zustand)
```typescript
// Any component can access/modify global state
const { currentDocument, setCurrentDocument } = useDocStore();
const { addBookmark, bookmarks } = useBookmarkStore();
const { searchQuery, results, search } = useSearchStore();
```

#### Pattern 4: Custom Events (Loosely Coupled)
```typescript
// For cross-cutting concerns
window.dispatchEvent(new CustomEvent('document:loaded', {
  detail: { documentId, readingTime }
}));
```

---

## 3. Data Processing Architecture

### 3.1 PDF Content Extraction Pipeline

```
PDFs (24 files) → pdf-parse → Raw Text Extraction
                       │
                       ├─→ Section Detection (heading patterns)
                       ├─→ Code Block Extraction (``` blocks)
                       ├─→ Metadata Parsing (title, author, date)
                       ├─→ Keyword Extraction (technical terms)
                       └─→ Topic Identification (heading analysis)
                              │
                              ▼
                    Content Index Builder
                              │
                              ├─→ Document Records (metadata + sections)
                              ├─→ Topic Index (inverted index)
                              ├─→ Keyword Index (frequency map)
                              └─→ Relationship Graph (keyword overlap)
                                     │
                                     ▼
                          content-index.json (642KB)
```

### 3.2 Content Index Structure

```typescript
interface ContentIndex {
  // Document catalog
  documents: {
    [id: string]: {
      id: string;
      filename: string;
      pageCount: number;
      textLength: number;
      sections: Section[];
      topics: string[];
      keywords: { term: string; count: number }[];
      headings: string[];
      codeBlocks: number;
      urls: string[];
      metadata: {
        title: string;
        category: string;
        difficulty: 'beginner' | 'intermediate' | 'advanced';
        readingTime: number;
        lastUpdated: Date;
      };
    };
  };

  // Topic → Documents mapping (inverted index)
  topicIndex: {
    [topic: string]: string[]; // document IDs
  };

  // Keyword → Documents mapping with frequency
  keywordIndex: {
    [keyword: string]: {
      documentId: string;
      count: number;
    }[];
  };

  // Document relationships (strength = keyword overlap)
  relationships: {
    doc1: string;
    doc2: string;
    strength: number; // 0-30
    commonKeywords: string[];
    commonTopics: string[];
  }[];

  // Document clusters (5 clusters identified)
  clusters: {
    id: string;
    name: string;
    description: string;
    documentIds: string[];
    keyTopics: string[];
  }[];
}
```

### 3.3 Search Index Structure (Fuse.js)

```typescript
interface SearchIndex {
  // Documents for full-text search
  documents: {
    id: string;
    title: string;
    content: string; // full text
    sections: {
      heading: string;
      text: string;
    }[];
    keywords: string[];
    topics: string[];
  }[];

  // Search configuration
  options: {
    keys: [
      { name: 'title', weight: 0.3 },
      { name: 'content', weight: 0.2 },
      { name: 'keywords', weight: 0.3 },
      { name: 'sections.heading', weight: 0.2 }
    ];
    threshold: 0.3; // fuzzy matching threshold
    distance: 100; // max distance for fuzzy match
    minMatchCharLength: 3;
  };
}
```

---

## 4. Navigation System Architecture

### 4.1 Multi-Level Navigation Strategy

#### Level 1: Global Navigation (Header)
- Logo → Home
- Search → Global search across all docs
- Theme Toggle → Light/Dark mode
- User Menu → Preferences, bookmarks, notes

#### Level 2: Cluster Navigation (Left Sidebar)
```
📚 Core Functionality (docs 1-4)
   ├─ Quick Start
   ├─ Basic Commands
   ├─ Configuration
   └─ Command Reference

🚀 Advanced Features (docs 5-8)
   ├─ API Integration
   ├─ Plugin System
   ├─ Extension Development
   └─ Advanced Configuration

⚡ Performance & Training (docs 9-13)
   ├─ Training Pipelines
   ├─ Optimization
   ├─ Type Systems
   └─ Session Management

🔧 Deployment & Operations (docs 14-19)
   ├─ Error Handling
   ├─ Deployment Strategies
   ├─ Docker & Containers
   └─ Monitoring

🛠️ Troubleshooting (docs 20-24)
   ├─ Common Issues
   ├─ FAQ
   ├─ Performance Debugging
   └─ API Reference
```

#### Level 3: Document Navigation (Table of Contents)
- Auto-generated from H1-H6 headings
- Sticky on scroll
- Active heading tracking
- Click to jump to section

#### Level 4: Relationship Navigation (Related Docs)
- Same cluster documents
- Strong relationships (keyword overlap 15+)
- Recommended next (based on progress)

### 4.2 Navigation State Management

```typescript
interface NavigationState {
  // Current location
  currentDocument: string | null;
  currentSection: string | null; // heading ID
  scrollProgress: number; // 0-100%

  // Navigation history
  history: {
    documentId: string;
    timestamp: Date;
    scrollPosition: number;
  }[];

  // Sidebar state
  sidebarCollapsed: boolean;
  expandedClusters: string[];
  expandedSections: string[];

  // Search state
  navigationSearchQuery: string;
  filteredNavigation: NavigationItem[];
}
```

---

## 5. Search System Architecture

### 5.1 Multi-Tier Search Strategy

```
User Query → Debounced Input (300ms)
                    │
                    ├─→ Tier 1: Title Match (exact/fuzzy)
                    ├─→ Tier 2: Keyword Match (inverted index)
                    ├─→ Tier 3: Content Match (full-text)
                    └─→ Tier 4: Topic Match (topic index)
                           │
                           ▼
                    Fuse.js Fuzzy Search
                           │
                           ├─→ Score Results (0-1)
                           ├─→ Rank by Relevance
                           ├─→ Highlight Matches
                           └─→ Group by Cluster
                                  │
                                  ▼
                           Search Results
                                  │
                                  ├─→ Top Results (5)
                                  ├─→ Grouped Results (by cluster)
                                  ├─→ Related Searches
                                  └─→ Recent Searches
```

### 5.2 Search Result Ranking Algorithm

```typescript
function rankSearchResults(results: SearchResult[]): RankedResult[] {
  return results.map(result => {
    const score = calculateScore(result);
    return { ...result, finalScore: score };
  }).sort((a, b) => b.finalScore - a.finalScore);
}

function calculateScore(result: SearchResult): number {
  const baseScore = result.fuseScore; // 0-1 (lower is better)

  // Boost factors (multiply by these)
  const titleMatch = result.matchedIn === 'title' ? 1.5 : 1.0;
  const exactMatch = result.isExactMatch ? 2.0 : 1.0;
  const recency = getRecencyBoost(result.metadata.lastUpdated);
  const popularity = getPopularityBoost(result.viewCount);

  // Penalty factors
  const deprecatedPenalty = result.metadata.status === 'deprecated' ? 0.5 : 1.0;
  const difficultyPenalty = result.metadata.difficulty === 'advanced' ? 0.9 : 1.0;

  // Final score (lower is better)
  return baseScore / (titleMatch * exactMatch * recency * popularity * deprecatedPenalty * difficultyPenalty);
}
```

### 5.3 Search Features

1. **Autocomplete**: Suggest as user types
2. **Recent Searches**: Show last 10 searches
3. **Search Filters**: By cluster, difficulty, status
4. **Keyboard Navigation**: ↑↓ to navigate, Enter to select, Esc to close
5. **Highlighted Results**: Show matching text snippets
6. **Search Analytics**: Track popular searches

---

## 6. State Management Architecture

### 6.1 Zustand Store Structure

```typescript
// Store organization: Multiple slices for separation of concerns

// UI State Slice
interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  rightSidebarOpen: boolean;
  activePanel: 'bookmarks' | 'notes' | null;

  setTheme: (theme: UIState['theme']) => void;
  toggleSidebar: () => void;
  toggleRightSidebar: () => void;
  setActivePanel: (panel: UIState['activePanel']) => void;
}

// Navigation State Slice
interface NavigationState {
  currentDocument: string | null;
  currentSection: string | null;
  history: DocumentHistory[];
  clusters: Cluster[];
  expandedClusters: string[];

  setCurrentDocument: (id: string) => void;
  setCurrentSection: (id: string) => void;
  goBack: () => void;
  goForward: () => void;
  toggleCluster: (id: string) => void;
}

// Search State Slice
interface SearchState {
  query: string;
  results: SearchResult[];
  recentSearches: string[];
  isSearching: boolean;
  filters: SearchFilters;

  search: (query: string) => void;
  clearSearch: () => void;
  addRecentSearch: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
}

// Bookmark State Slice
interface BookmarkState {
  bookmarks: Bookmark[];
  folders: BookmarkFolder[];
  selectedFolder: string | null;

  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  moveBookmark: (id: string, folderId: string) => void;
  addFolder: (folder: Omit<BookmarkFolder, 'id' | 'createdAt'>) => void;
}

// Note State Slice
interface NoteState {
  notes: Note[];
  activeNote: string | null;
  isEditing: boolean;

  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (id: string | null) => void;
}

// Progress State Slice
interface ProgressState {
  readDocuments: string[];
  completedClusters: string[];
  totalReadingTime: number; // minutes
  achievements: Achievement[];

  markDocumentRead: (id: string, readingTime: number) => void;
  markClusterComplete: (id: string) => void;
  unlockAchievement: (achievement: Achievement) => void;
}

// Combined Store
interface DocumentationStore {
  ui: UIState;
  navigation: NavigationState;
  search: SearchState;
  bookmarks: BookmarkState;
  notes: NoteState;
  progress: ProgressState;
}
```

### 6.2 State Persistence Strategy

```typescript
// Persist configuration
const persistConfig = {
  name: 'documentation-storage',
  version: 1,

  // What to persist
  partialize: (state: DocumentationStore) => ({
    ui: {
      theme: state.ui.theme,
      sidebarCollapsed: state.ui.sidebarCollapsed,
    },
    bookmarks: state.bookmarks,
    notes: state.notes,
    progress: state.progress,
    search: {
      recentSearches: state.search.recentSearches,
    },
    navigation: {
      history: state.navigation.history.slice(-20), // last 20
    },
  }),

  // Storage backend
  storage: createJSONStorage(() => localStorage),

  // Migration strategy
  migrate: (persistedState: any, version: number) => {
    if (version === 0) {
      // Migration from v0 to v1
      return migrateV0toV1(persistedState);
    }
    return persistedState;
  },
};
```

---

## 7. Responsive Layout Architecture

### 7.1 Breakpoint Strategy

```typescript
const breakpoints = {
  mobile: '< 640px',    // Small phones
  tablet: '640-1024px',  // Tablets & large phones
  desktop: '> 1024px',   // Laptops & desktops
  wide: '> 1536px',      // Large monitors
};

// Layout adjustments per breakpoint
const layouts = {
  mobile: {
    navigation: 'drawer',        // Slide-in drawer
    rightSidebar: 'bottom-sheet', // Bottom sheet modal
    search: 'full-screen',       // Full-screen overlay
    toc: 'hidden',               // Hidden, access via button
  },

  tablet: {
    navigation: 'collapsible',   // Collapsible sidebar
    rightSidebar: 'overlay',     // Overlay panel
    search: 'modal',             // Modal overlay
    toc: 'collapsible',          // Collapsible panel
  },

  desktop: {
    navigation: 'persistent',    // Always visible
    rightSidebar: 'persistent',  // Always visible
    search: 'inline',            // Inline dropdown
    toc: 'sticky',               // Sticky sidebar
  },
};
```

### 7.2 Mobile-First Layout

```
Mobile (< 640px):
┌─────────────────────┐
│  Header (fixed)     │
│  [☰] [🔍] [👤]     │
├─────────────────────┤
│                     │
│   Content Area      │
│   (full width)      │
│                     │
│                     │
│                     │
└─────────────────────┘
│  Bottom Nav         │
│  [📑] [🔖] [📝]    │
└─────────────────────┘

Tablet (640-1024px):
┌───┬─────────────────┐
│Nav│  Header         │
│   ├─────────────────┤
│[≡]│                 │
│   │   Content       │
│   │                 │
│   │                 │
│   │                 │
└───┴─────────────────┘

Desktop (> 1024px):
┌───┬─────────────┬───┐
│Nav│  Header     │Toc│
├───┼─────────────┼───┤
│   │             │   │
│   │   Content   │🔖 │
│   │             │📝 │
│   │             │   │
└───┴─────────────┴───┘
```

---

## 8. Accessibility Architecture

### 8.1 WCAG 2.1 AA Compliance Strategy

#### Perceivable
- **Alternative Text**: All images have descriptive alt text
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Resizable Text**: Support up to 200% zoom without loss of functionality
- **Responsive Images**: Serve appropriate sizes for different devices

#### Operable
- **Keyboard Navigation**: All functionality available via keyboard
- **Focus Indicators**: Clear, visible focus states (2px outline)
- **Skip Links**: Skip to main content, skip to navigation
- **No Keyboard Traps**: Focus can always move away

#### Understandable
- **Clear Labels**: All form inputs have associated labels
- **Error Messages**: Clear, actionable error messages
- **Consistent Navigation**: Same navigation structure across all pages
- **Predictable Behavior**: UI behaves consistently

#### Robust
- **Semantic HTML**: Proper use of HTML5 elements
- **ARIA Attributes**: ARIA roles, states, and properties where needed
- **Valid Markup**: HTML and CSS validation
- **Browser Compatibility**: Support last 2 versions of major browsers

### 8.2 Keyboard Navigation Map

```typescript
const keyboardShortcuts = {
  // Global shortcuts
  'Cmd/Ctrl + K': 'Open search',
  'Cmd/Ctrl + B': 'Toggle bookmarks',
  'Cmd/Ctrl + N': 'Add note',
  'Cmd/Ctrl + D': 'Toggle dark mode',
  'Cmd/Ctrl + /': 'Show keyboard shortcuts',

  // Navigation shortcuts
  '↑/↓': 'Navigate items',
  '←/→': 'Previous/Next document',
  'Enter': 'Open/Select item',
  'Esc': 'Close modal/Clear search',
  'Tab': 'Next interactive element',
  'Shift + Tab': 'Previous interactive element',

  // Content shortcuts
  'h': 'Go to home',
  'g + s': 'Go to search',
  'g + b': 'Go to bookmarks',
  'g + n': 'Go to notes',

  // TOC navigation
  't': 'Toggle table of contents',
  'j/k': 'Next/Previous section',
};
```

### 8.3 Screen Reader Support

```typescript
// Live region announcements
interface LiveRegionManager {
  announce(message: string, priority: 'polite' | 'assertive'): void;
  announceNavigation(document: string): void;
  announceSearch(resultCount: number): void;
  announceAction(action: string, success: boolean): void;
}

// Example usage
const announcer = useLiveRegionManager();

// Navigation announcement
announcer.announceNavigation('Navigated to Quick Start Guide');

// Search announcement
announcer.announceSearch(42); // "Found 42 results"

// Action announcement
announcer.announceAction('Bookmark added', true); // "Success: Bookmark added"
```

---

## 9. Performance Optimization Architecture

### 9.1 Loading Performance Strategy

```
Initial Load:
1. Load minimal HTML shell (< 5KB)
2. Load critical CSS inline (< 14KB)
3. Load React runtime (chunk: ~40KB gzipped)
4. Load main app bundle (chunk: ~60KB gzipped)
5. Lazy load route components (on demand)
6. Prefetch likely next routes (on hover)

Target Metrics:
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
```

### 9.2 Code Splitting Strategy

```typescript
// Route-based splitting
const Home = lazy(() => import('./pages/Home'));
const DocumentViewer = lazy(() => import('./pages/DocumentViewer'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const Notes = lazy(() => import('./pages/Notes'));

// Component-based splitting (heavy components)
const NotesPanel = lazy(() => import('./components/NotesPanel'));
const BookmarkManager = lazy(() => import('./components/BookmarkManager'));
const MarkdownEditor = lazy(() => import('./components/MarkdownEditor'));

// Preload strategy
function preloadComponent(component: () => Promise<any>) {
  const promise = component();
  return () => promise;
}

// Preload on hover
<Link
  to="/bookmarks"
  onMouseEnter={() => preloadComponent(() => import('./pages/Bookmarks'))}
>
  Bookmarks
</Link>
```

### 9.3 Rendering Performance

```typescript
// Memoization strategy
const MemoizedNavigationTree = memo(NavigationTree, (prev, next) => {
  return prev.items === next.items && prev.selectedId === next.selectedId;
});

// Virtual scrolling for long lists
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={navigationItems.length}
  itemSize={40}
  width="100%"
>
  {({ index, style }) => (
    <NavigationItem style={style} item={items[index]} />
  )}
</FixedSizeList>

// Debouncing expensive operations
const debouncedSearch = useMemo(
  () => debounce((query: string) => performSearch(query), 300),
  []
);

// Throttling scroll handlers
const handleScroll = useThrottle((e: Event) => {
  updateScrollProgress(e);
  updateActiveHeading(e);
}, 100);
```

### 9.4 Caching Strategy

```typescript
// Browser caching (service worker)
const cacheStrategy = {
  // Static assets: cache-first
  static: {
    strategy: 'CacheFirst',
    cacheName: 'static-v1',
    expiration: { maxAgeSeconds: 30 * 24 * 60 * 60 }, // 30 days
  },

  // Content index: network-first with fallback
  content: {
    strategy: 'NetworkFirst',
    cacheName: 'content-v1',
    expiration: { maxAgeSeconds: 24 * 60 * 60 }, // 1 day
  },

  // Images: cache-first with size limit
  images: {
    strategy: 'CacheFirst',
    cacheName: 'images-v1',
    expiration: {
      maxEntries: 50,
      maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
    },
  },
};

// In-memory caching (React Query)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
```

---

## 10. Data Extraction & Integration Strategy

### 10.1 PDF Processing Pipeline

```bash
# Phase 1: Extract raw content
npm run extract-pdf

Input:  24 PDF files (590 pages)
Output: content-index.json (642KB)

Process:
1. Loop through all PDF files
2. Extract text with pdf-parse
3. Detect document structure:
   - Headings (## patterns)
   - Code blocks (``` delimiters)
   - Lists (- or * patterns)
   - URLs (http/https patterns)
4. Extract metadata:
   - Title (first H1)
   - Reading time (word count / 200 WPM)
   - Keywords (technical term extraction)
   - Topics (heading analysis)
5. Build relationships:
   - Keyword overlap between docs
   - Topic similarity
   - Cross-references
6. Generate indexes:
   - Topic → Documents (inverted index)
   - Keyword → Documents (with frequency)
   - Document → Related docs (by strength)
```

### 10.2 Content Organization Schema

```typescript
interface ExtractedContent {
  documents: Map<string, DocumentRecord>;
  clusters: Cluster[];
  relationships: RelationshipGraph;
  indexes: {
    topicIndex: Map<string, string[]>;
    keywordIndex: Map<string, KeywordOccurrence[]>;
  };
}

interface DocumentRecord {
  id: string;
  filename: string;
  cluster: string;
  sections: Section[];
  metadata: {
    title: string;
    pageCount: number;
    readingTime: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topics: string[];
    keywords: string[];
  };
}

interface Section {
  id: string;
  heading: string;
  level: number; // 1-6
  content: string;
  codeBlocks: CodeBlock[];
  links: Link[];
}

interface Cluster {
  id: string;
  name: string;
  description: string;
  documentIds: string[];
  keyTopics: string[];
  icon: string;
  color: string;
}
```

### 10.3 Search Index Generation

```typescript
// Build Fuse.js search index
function buildSearchIndex(documents: DocumentRecord[]): SearchIndex {
  const searchDocs = documents.map(doc => ({
    id: doc.id,
    title: doc.metadata.title,
    content: doc.sections.map(s => s.content).join(' '),
    sections: doc.sections.map(s => ({
      heading: s.heading,
      text: s.content,
    })),
    keywords: doc.metadata.keywords,
    topics: doc.metadata.topics,
    cluster: doc.cluster,
  }));

  return new Fuse(searchDocs, {
    keys: [
      { name: 'title', weight: 0.3 },
      { name: 'keywords', weight: 0.3 },
      { name: 'sections.heading', weight: 0.2 },
      { name: 'content', weight: 0.2 },
    ],
    threshold: 0.3,
    distance: 100,
    minMatchCharLength: 3,
    includeScore: true,
    includeMatches: true,
  });
}
```

---

## 11. Architecture Decision Records (ADRs)

### ADR-001: Choose Zustand over Redux for State Management

**Status**: Accepted
**Date**: 2025-09-30

**Context**: Need lightweight, performant state management for documentation app.

**Decision**: Use Zustand instead of Redux.

**Rationale**:
- **Bundle Size**: Zustand ~1KB vs Redux ~12KB
- **API Simplicity**: Less boilerplate, more intuitive
- **TypeScript Support**: Better out-of-the-box TypeScript support
- **Performance**: Minimal re-renders, efficient selector system
- **Learning Curve**: Easier for team to adopt

**Consequences**:
- ✅ Faster development
- ✅ Smaller bundle size
- ✅ Better developer experience
- ⚠️ Smaller ecosystem than Redux
- ⚠️ Less middleware options

---

### ADR-002: Use Client-Side Search (Fuse.js) over Server-Side

**Status**: Accepted
**Date**: 2025-09-30

**Context**: Need fast, responsive search across documentation.

**Decision**: Implement client-side fuzzy search with Fuse.js.

**Rationale**:
- **Performance**: No network latency, instant results
- **Offline Support**: Works without internet connection
- **Simplicity**: No backend infrastructure needed
- **Cost**: Zero hosting costs for search
- **User Experience**: Faster, more responsive

**Consequences**:
- ✅ Instant search results
- ✅ Works offline
- ✅ No server costs
- ⚠️ Initial load includes search index (~100KB)
- ⚠️ Limited to smaller datasets (< 10MB content)

---

### ADR-003: Use Vite over Create React App

**Status**: Accepted
**Date**: 2025-09-30

**Context**: Need fast development build tool.

**Decision**: Use Vite for development and production builds.

**Rationale**:
- **Development Speed**: Instant HMR, fast cold starts
- **Build Performance**: 10-100x faster than webpack
- **Modern Features**: Native ESM, better tree-shaking
- **Developer Experience**: Better error messages, faster debugging
- **Future-Proof**: Built for modern web standards

**Consequences**:
- ✅ Faster development iteration
- ✅ Faster production builds
- ✅ Better developer experience
- ⚠️ Less mature ecosystem than webpack
- ⚠️ Some plugins may not be compatible

---

### ADR-004: Hybrid Styling (Tailwind CSS + CSS Modules)

**Status**: Accepted
**Date**: 2025-09-30

**Context**: Need efficient, maintainable styling approach.

**Decision**: Use Tailwind CSS for utilities, CSS Modules for complex components.

**Rationale**:
- **Rapid Development**: Tailwind for quick prototyping
- **Maintainability**: CSS Modules for complex component styles
- **Performance**: PurgeCSS removes unused Tailwind classes
- **Scoping**: CSS Modules prevent style conflicts
- **Flexibility**: Best of both worlds

**Consequences**:
- ✅ Fast styling development
- ✅ Scoped component styles
- ✅ Small production CSS bundle
- ⚠️ Two styling paradigms to learn
- ⚠️ Potential for inconsistent usage

---

## 12. Integration Points

### 12.1 External Integrations

```typescript
// Content source: Local JSON file
import contentIndex from './docs/content-index.json';

// Search engine: Fuse.js (bundled)
import Fuse from 'fuse.js';

// Markdown rendering: react-markdown
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

// Code syntax highlighting: highlight.js
import 'highlight.js/styles/github-dark.css';

// State persistence: localStorage
const storage = window.localStorage;

// Analytics (optional): Plausible or Google Analytics
// Privacy-focused, no PII tracking
```

### 12.2 Future Extension Points

1. **Backend API** (if needed for advanced features):
   - User accounts and sync
   - Collaborative notes
   - Usage analytics
   - Content recommendations

2. **CMS Integration** (if documentation becomes dynamic):
   - Headless CMS (Strapi, Contentful)
   - Automatic content updates
   - Version control

3. **AI Features** (future enhancement):
   - AI-powered search suggestions
   - Personalized learning paths
   - Automated summarization
   - Question answering

---

## 13. Deployment Architecture

### 13.1 Build & Deploy Pipeline

```
Development → Build → Deploy → Production

┌──────────────┐
│ Development  │
│ - npm run dev│
│ - Vite HMR   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Build        │
│ - npm run    │
│   build      │
│ - TypeScript │
│   compile    │
│ - Vite       │
│   optimize   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Deploy       │
│ - GitHub     │
│   Pages      │
│ - Netlify    │
│ - Vercel     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Production   │
│ - CDN        │
│ - HTTPS      │
│ - Caching    │
└──────────────┘
```

### 13.2 Recommended Hosting: GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 14. Monitoring & Analytics Architecture

### 14.1 Performance Monitoring

```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    id: metric.id,
  });

  // Send to analytics endpoint (if available)
  navigator.sendBeacon('/analytics', body);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 14.2 User Analytics (Privacy-Focused)

```typescript
interface AnalyticsEvent {
  // Document interactions
  'document:view': { documentId: string; readingTime: number };
  'document:complete': { documentId: string; completionRate: number };

  // Search interactions
  'search:query': { query: string; resultCount: number };
  'search:result_click': { query: string; documentId: string; position: number };

  // Bookmark interactions
  'bookmark:add': { documentId: string };
  'bookmark:remove': { documentId: string };

  // Note interactions
  'note:create': { documentId: string; wordCount: number };
  'note:edit': { noteId: string };

  // Navigation patterns
  'navigation:cluster': { clusterId: string };
  'navigation:related': { fromDoc: string; toDoc: string };
}
```

---

## 15. Security Architecture

### 15.1 Security Considerations

```typescript
// Content Security Policy
const CSP = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'"], // Vite requires inline scripts
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'"],
  'connect-src': ["'self'"],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
};

// XSS Prevention
// - Sanitize user input (notes content)
// - Use React's built-in escaping
// - Validate data from localStorage

// Data Privacy
// - All data stored locally (no server)
// - No PII tracking
// - Optional anonymous analytics
// - User can export/delete all data
```

---

## 16. Testing Architecture

### 16.1 Testing Strategy

```
Unit Tests (Vitest)
├─ Components
│  ├─ Navigation.test.tsx
│  ├─ SearchBar.test.tsx
│  ├─ ContentViewer.test.tsx
│  └─ ... (50+ component tests)
│
├─ Hooks
│  ├─ useSearch.test.ts
│  ├─ useBookmarks.test.ts
│  └─ ... (15+ hook tests)
│
├─ Utils
│  ├─ search.test.ts
│  ├─ markdown.test.ts
│  └─ ... (10+ utility tests)
│
└─ Store
   ├─ uiSlice.test.ts
   ├─ navigationSlice.test.ts
   └─ ... (6+ store tests)

Integration Tests (React Testing Library)
├─ User Flows
│  ├─ DocumentNavigation.test.tsx
│  ├─ SearchFlow.test.tsx
│  ├─ BookmarkFlow.test.tsx
│  └─ NoteFlow.test.tsx
│
└─ Feature Tests
   ├─ NavigationFeature.test.tsx
   ├─ SearchFeature.test.tsx
   └─ ... (8+ feature tests)

E2E Tests (Playwright)
├─ Critical Paths
│  ├─ search-and-navigate.spec.ts
│  ├─ bookmark-workflow.spec.ts
│  └─ note-taking.spec.ts
│
└─ Accessibility
   ├─ keyboard-navigation.spec.ts
   └─ screen-reader.spec.ts

Target Coverage: 80%+ overall, 90%+ for critical paths
```

---

## 17. Memory Store Coordination

```bash
# Store architecture decisions
npx claude-flow@alpha hooks post-edit \
  --file "docs/system-architecture-design.md" \
  --memory-key "swarm/architecture/system-design"

# Store component hierarchy
npx claude-flow@alpha hooks post-edit \
  --file "docs/system-architecture-design.md" \
  --memory-key "swarm/architecture/component-hierarchy"

# Store data processing pipeline
npx claude-flow@alpha hooks post-edit \
  --file "docs/system-architecture-design.md" \
  --memory-key "swarm/architecture/data-pipeline"

# Store state management architecture
npx claude-flow@alpha hooks post-edit \
  --file "docs/system-architecture-design.md" \
  --memory-key "swarm/architecture/state-management"

# Store search architecture
npx claude-flow@alpha hooks post-edit \
  --file "docs/system-architecture-design.md" \
  --memory-key "swarm/architecture/search-system"

# Store navigation architecture
npx claude-flow@alpha hooks post-edit \
  --file "docs/system-architecture-design.md" \
  --memory-key "swarm/architecture/navigation-system"

# Notify completion
npx claude-flow@alpha hooks notify \
  --message "System architecture design complete: Component hierarchy, data pipeline, state management, search system, navigation system, and 4 ADRs documented"
```

---

## 18. Next Steps for Implementation

### Phase 1: Foundation (Week 1)
1. **Coder Agent**: Setup Vite + React + TypeScript project
2. **Coder Agent**: Implement basic layout (Header, Sidebar, Content area)
3. **Coder Agent**: Setup Zustand store with persistence
4. **Coder Agent**: Implement theme system

### Phase 2: Content Integration (Week 2)
1. **Coder Agent**: Build PDF extraction script
2. **Coder Agent**: Generate content index and search index
3. **Coder Agent**: Implement content viewer with markdown rendering
4. **Coder Agent**: Build navigation tree from clusters

### Phase 3: Search & Discovery (Week 3)
1. **Coder Agent**: Implement global search with Fuse.js
2. **Coder Agent**: Build search results UI with highlighting
3. **Coder Agent**: Implement related documents feature
4. **Coder Agent**: Add keyboard shortcuts

### Phase 4: User Features (Week 4)
1. **Coder Agent**: Build bookmark manager
2. **Coder Agent**: Implement notes panel
3. **Coder Agent**: Add progress tracking
4. **Coder Agent**: Build export/import functionality

### Phase 5: Polish (Week 5)
1. **Tester Agent**: Write comprehensive test suite
2. **Reviewer Agent**: Code review and refactoring
3. **Coder Agent**: Accessibility improvements
4. **Coder Agent**: Performance optimizations

---

## 19. Success Metrics

### Technical Metrics
- **Performance**:
  - FCP < 1.5s
  - LCP < 2.5s
  - TTI < 3.5s
  - CLS < 0.1

- **Quality**:
  - Test coverage > 80%
  - TypeScript strict mode
  - Zero ESLint errors
  - Lighthouse score > 95

### User Experience Metrics
- **Usability**:
  - Average time to find document < 10s
  - Search result relevance > 90%
  - Mobile usability score > 95

- **Engagement**:
  - Average session duration > 5 minutes
  - Documents read per session > 2
  - Bookmark usage rate > 30%

### Accessibility Metrics
- **WCAG Compliance**:
  - Level AA compliance 100%
  - Keyboard navigation 100% functional
  - Screen reader compatible
  - Color contrast ratio > 4.5:1

---

## 20. Conclusion

This architecture provides a comprehensive blueprint for building a modern, interactive documentation interface that:

1. **Extracts and organizes** 24 PDF documents into a structured, searchable format
2. **Provides intuitive navigation** through clusters, topics, and relationships
3. **Enables powerful search** with fuzzy matching and intelligent ranking
4. **Supports learning** through bookmarks, notes, and progress tracking
5. **Ensures accessibility** with keyboard navigation and screen reader support
6. **Delivers performance** with code splitting, caching, and optimization
7. **Scales maintainably** with modular architecture and clear separation of concerns

The architecture is ready for implementation by the coder agent, with clear specifications, decision rationale, and integration points documented.

---

**Document Status**: ✅ Complete
**Version**: 1.0.0
**Last Updated**: 2025-09-30
**Author**: System Architecture Designer Agent
**Next Agent**: Coder Agent (for implementation)
