# React Documentation Viewer - Component Architecture

## Architecture Overview

This document outlines the component architecture for a modern React documentation viewer application. The architecture follows best practices including component composition, separation of concerns, and efficient state management.

## Technology Stack

- **React 18+** with TypeScript
- **State Management**: Zustand (lightweight, performant)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + CSS Modules
- **Data Fetching**: React Query (TanStack Query)
- **Search**: Fuse.js (fuzzy search)
- **Markdown Rendering**: react-markdown + rehype plugins

## Component Hierarchy

```
DocumentationApp
├── AppProvider (Context/State Management)
├── Header
│   ├── Logo
│   ├── SearchBar
│   │   ├── SearchInput
│   │   └── SearchResults
│   ├── ThemeToggle
│   └── UserMenu
├── MainLayout
│   ├── Navigation
│   │   ├── NavigationTree
│   │   │   ├── NavSection
│   │   │   └── NavItem
│   │   └── NavigationSearch
│   ├── ContentViewer
│   │   ├── ContentHeader
│   │   │   ├── Breadcrumbs
│   │   │   └── TableOfContents
│   │   ├── MarkdownRenderer
│   │   │   ├── CodeBlock
│   │   │   ├── Callout
│   │   │   └── LinkRenderer
│   │   └── ContentFooter
│   │       ├── PreviousNext
│   │       └── LastUpdated
│   └── Sidebar
│       ├── BookmarkManager
│       │   ├── BookmarkList
│       │   └── BookmarkItem
│       └── NotesPanel
│           ├── NotesList
│           └── NoteEditor
└── Footer
    ├── SocialLinks
    └── Copyright
```

## Core Component Specifications

### 1. DocumentationApp (Root Component)

**Purpose**: Application root, routing setup, and global providers

**File**: `src/App.tsx`

```typescript
interface AppProps {}

interface AppState {
  isInitialized: boolean;
  error: Error | null;
}
```

**Features**:
- Global error boundary
- Route configuration
- Provider composition
- Initial data loading

---

### 2. Navigation Component

**Purpose**: Hierarchical documentation navigation with search and filtering

**File**: `src/components/Navigation/Navigation.tsx`

```typescript
interface NavigationProps {
  collapsed?: boolean;
  onToggle?: () => void;
  currentPath: string;
}

interface NavigationSection {
  id: string;
  title: string;
  icon?: string;
  items: NavigationItem[];
  collapsed?: boolean;
}

interface NavigationItem {
  id: string;
  title: string;
  path: string;
  badge?: string;
  children?: NavigationItem[];
  isNew?: boolean;
  isDeprecated?: boolean;
}
```

**State**:
- Expanded/collapsed sections
- Active navigation item
- Search query and results
- Filtered navigation tree

**Features**:
- Collapsible sections
- Keyboard navigation (arrow keys, Enter)
- Search filtering with highlighting
- Active state tracking
- Badge support (NEW, BETA, DEPRECATED)
- Responsive mobile drawer

---

### 3. SearchBar Component

**Purpose**: Global search with autocomplete and keyboard shortcuts

**File**: `src/components/SearchBar/SearchBar.tsx`

```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  shortcut?: string; // e.g., "Cmd+K"
}

interface SearchResult {
  id: string;
  title: string;
  path: string;
  excerpt: string;
  section: string;
  score: number;
  highlights: string[];
}

interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  selectedIndex: number;
  isOpen: boolean;
}
```

**Features**:
- Debounced search (300ms)
- Fuzzy matching
- Keyboard shortcuts (Cmd+K / Ctrl+K)
- Result highlighting
- Recent searches
- Keyboard navigation (↑↓ arrows, Enter, Esc)
- Mobile-optimized input

---

### 4. ContentViewer Component

**Purpose**: Render markdown documentation with enhancements

**File**: `src/components/ContentViewer/ContentViewer.tsx`

```typescript
interface ContentViewerProps {
  documentId: string;
  content: string;
  metadata: DocumentMetadata;
}

interface DocumentMetadata {
  title: string;
  description?: string;
  author?: string;
  lastUpdated: Date;
  tags: string[];
  category: string;
  readingTime: number; // minutes
}

interface ContentState {
  scrollProgress: number;
  activeHeading: string;
  isLoading: boolean;
}
```

**Features**:
- Markdown rendering with syntax highlighting
- Auto-generated table of contents
- Scroll progress indicator
- Active heading tracking
- Copy code button
- Image lazy loading
- Link previews
- Anchor link navigation

---

### 5. BookmarkManager Component

**Purpose**: Save and organize favorite documentation pages

**File**: `src/components/BookmarkManager/BookmarkManager.tsx`

```typescript
interface BookmarkManagerProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

interface Bookmark {
  id: string;
  documentId: string;
  title: string;
  path: string;
  excerpt?: string;
  tags: string[];
  createdAt: Date;
  folderId?: string;
  position?: number; // for ordering
}

interface BookmarkFolder {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  bookmarks: string[]; // bookmark IDs
  createdAt: Date;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  folders: BookmarkFolder[];
  selectedFolder: string | null;
  sortBy: 'date' | 'title' | 'custom';
}
```

**Features**:
- Add/remove bookmarks
- Organize in folders
- Drag-and-drop reordering
- Tag filtering
- Export bookmarks (JSON)
- Import bookmarks
- Keyboard shortcuts

---

### 6. NotesPanel Component

**Purpose**: Add personal notes to documentation pages

**File**: `src/components/NotesPanel/NotesPanel.tsx`

```typescript
interface NotesPanelProps {
  documentId: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

interface Note {
  id: string;
  documentId: string;
  content: string;
  position?: number; // scroll position or heading
  highlightedText?: string;
  color?: 'yellow' | 'green' | 'blue' | 'pink';
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

interface NotesState {
  notes: Note[];
  activeNote: string | null;
  isEditing: boolean;
  filter: {
    documentId?: string;
    tags?: string[];
    searchQuery?: string;
  };
}
```

**Features**:
- Rich text editing (markdown support)
- Attach notes to specific sections
- Text highlighting
- Color coding
- Tag system
- Search notes
- Export notes
- Sync across devices (optional)

---

## State Management Architecture

### Zustand Store Structure

```typescript
// src/store/index.ts
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface DocumentationStore {
  // UI State
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  notesOpen: boolean;
  bookmarksOpen: boolean;

  // Navigation State
  currentDocument: string | null;
  navigationTree: NavigationSection[];

  // Search State
  searchQuery: string;
  searchResults: SearchResult[];
  recentSearches: string[];

  // User Data
  bookmarks: Bookmark[];
  notes: Note[];
  folders: BookmarkFolder[];

  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  toggleNotes: () => void;
  toggleBookmarks: () => void;

  setCurrentDocument: (id: string) => void;
  updateNavigationTree: (tree: NavigationSection[]) => void;

  search: (query: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, updates: Partial<Bookmark>) => void;

  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;

  addFolder: (folder: Omit<BookmarkFolder, 'id' | 'createdAt'>) => void;
  updateFolder: (id: string, updates: Partial<BookmarkFolder>) => void;
  deleteFolder: (id: string) => void;
}

export const useDocumentationStore = create<DocumentationStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        theme: 'system',
        sidebarCollapsed: false,
        notesOpen: false,
        bookmarksOpen: false,
        currentDocument: null,
        navigationTree: [],
        searchQuery: '',
        searchResults: [],
        recentSearches: [],
        bookmarks: [],
        notes: [],
        folders: [],

        // Implementation of actions...
      }),
      {
        name: 'documentation-storage',
        partialize: (state) => ({
          theme: state.theme,
          bookmarks: state.bookmarks,
          notes: state.notes,
          folders: state.folders,
          recentSearches: state.recentSearches,
        }),
      }
    )
  )
);
```

---

## Data Flow Patterns

### 1. Document Loading Flow

```
User navigates → Route change →
  → useDocumentationStore.setCurrentDocument() →
  → React Query fetches document →
  → ContentViewer receives data →
  → Markdown rendered
```

### 2. Search Flow

```
User types → SearchBar debounces (300ms) →
  → Fuse.js searches in-memory index →
  → Results displayed with highlighting →
  → User selects result →
  → Navigate to document
```

### 3. Bookmark Flow

```
User clicks bookmark icon →
  → useDocumentationStore.addBookmark() →
  → Persisted to localStorage →
  → BookmarkManager updates →
  → Success notification
```

### 4. Notes Flow

```
User adds note →
  → NotesPanel opens editor →
  → User types content →
  → Auto-save (debounced) →
  → useDocumentationStore.addNote() →
  → Persisted to localStorage
```

---

## TypeScript Interface Definitions

### Core Data Models

```typescript
// src/types/index.ts

export interface Document {
  id: string;
  slug: string;
  title: string;
  content: string;
  metadata: DocumentMetadata;
  tableOfContents: TocItem[];
}

export interface DocumentMetadata {
  title: string;
  description?: string;
  author?: string;
  lastUpdated: Date;
  tags: string[];
  category: string;
  readingTime: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  status?: 'stable' | 'beta' | 'deprecated';
}

export interface TocItem {
  id: string;
  title: string;
  level: number; // 1-6 (h1-h6)
  slug: string;
  children?: TocItem[];
}

export interface NavigationSection {
  id: string;
  title: string;
  icon?: string;
  items: NavigationItem[];
  collapsed?: boolean;
  order: number;
}

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  badge?: {
    text: string;
    variant: 'new' | 'beta' | 'deprecated' | 'updated';
  };
  children?: NavigationItem[];
  icon?: string;
  description?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  path: string;
  excerpt: string;
  section: string;
  score: number;
  highlights: string[];
  metadata: DocumentMetadata;
}

export interface Bookmark {
  id: string;
  documentId: string;
  title: string;
  path: string;
  excerpt?: string;
  tags: string[];
  createdAt: Date;
  folderId?: string;
  position: number;
}

export interface BookmarkFolder {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  bookmarkIds: string[];
  createdAt: Date;
  order: number;
}

export interface Note {
  id: string;
  documentId: string;
  content: string;
  position?: {
    type: 'heading' | 'scroll';
    value: string | number;
  };
  highlightedText?: string;
  color?: 'yellow' | 'green' | 'blue' | 'pink' | 'purple';
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  codeTheme: string;
  sidebarPosition: 'left' | 'right';
  showLineNumbers: boolean;
  enableVimMode: boolean;
}
```

---

## Component Communication Patterns

### 1. Parent-to-Child (Props)
```typescript
// Direct props passing
<ContentViewer
  documentId={currentDocId}
  content={documentContent}
  metadata={metadata}
/>
```

### 2. Child-to-Parent (Callbacks)
```typescript
// Event callbacks
<SearchBar
  onSearch={(query) => handleSearch(query)}
  onResultSelect={(result) => navigateToDocument(result.path)}
/>
```

### 3. Sibling Communication (Shared State)
```typescript
// Via Zustand store
const Navigation = () => {
  const currentDocument = useDocumentationStore(s => s.currentDocument);
  // React to changes
};

const ContentViewer = () => {
  const setCurrentDocument = useDocumentationStore(s => s.setCurrentDocument);
  // Update state
};
```

### 4. Global Events (Custom Events)
```typescript
// For loosely coupled components
const emitDocumentChange = (docId: string) => {
  window.dispatchEvent(new CustomEvent('document:change', {
    detail: { documentId: docId }
  }));
};
```

---

## Performance Optimizations

### 1. Code Splitting
```typescript
// Lazy load heavy components
const NotesPanel = lazy(() => import('./components/NotesPanel'));
const BookmarkManager = lazy(() => import('./components/BookmarkManager'));
```

### 2. Memoization
```typescript
// Expensive computations
const filteredNavigation = useMemo(() =>
  filterNavigation(navigationTree, searchQuery),
  [navigationTree, searchQuery]
);

// Component memoization
export const NavigationItem = memo(({ item }: Props) => {
  // ...
}, (prev, next) => prev.item.id === next.item.id);
```

### 3. Virtual Scrolling
```typescript
// For long lists (navigation, bookmarks)
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={40}
>
  {({ index, style }) => (
    <NavigationItem style={style} item={items[index]} />
  )}
</FixedSizeList>
```

### 4. Debouncing & Throttling
```typescript
// Search debouncing
const debouncedSearch = useMemo(
  () => debounce((query: string) => performSearch(query), 300),
  []
);

// Scroll throttling
const handleScroll = useThrottle((e: Event) => {
  updateScrollProgress(e);
}, 100);
```

---

## Accessibility Considerations

### 1. Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **↑/↓**: Navigate navigation items and search results
- **Enter**: Select item / open link
- **Esc**: Close modals / clear search
- **Cmd/Ctrl + K**: Open search
- **Cmd/Ctrl + B**: Toggle bookmarks
- **Cmd/Ctrl + N**: Add note

### 2. ARIA Attributes
```typescript
<nav aria-label="Documentation navigation">
  <ul role="tree">
    <li role="treeitem" aria-expanded={isExpanded}>
      {/* Navigation item */}
    </li>
  </ul>
</nav>

<button
  aria-label="Add bookmark"
  aria-pressed={isBookmarked}
>
  {/* Button content */}
</button>
```

### 3. Screen Reader Support
- Meaningful alt text for images
- Skip navigation links
- Live regions for dynamic content
- Descriptive link text

### 4. Focus Management
```typescript
// Trap focus in modals
useFocusTrap(modalRef, isOpen);

// Restore focus after modal close
const previousFocus = useRef<HTMLElement>();

useEffect(() => {
  if (isOpen) {
    previousFocus.current = document.activeElement as HTMLElement;
  } else {
    previousFocus.current?.focus();
  }
}, [isOpen]);
```

---

## Testing Strategy

### 1. Component Tests
```typescript
// Navigation.test.tsx
describe('Navigation', () => {
  it('renders navigation tree', () => {
    render(<Navigation navigationTree={mockTree} />);
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
  });

  it('filters navigation on search', () => {
    const { getByPlaceholderText } = render(<Navigation />);
    fireEvent.change(getByPlaceholderText('Search'), {
      target: { value: 'hooks' }
    });
    expect(screen.getByText('React Hooks')).toBeInTheDocument();
  });
});
```

### 2. Integration Tests
```typescript
// DocumentationFlow.test.tsx
it('navigates through documentation', async () => {
  render(<App />);

  // Click navigation item
  fireEvent.click(screen.getByText('Introduction'));

  // Wait for content to load
  await waitFor(() =>
    expect(screen.getByRole('article')).toBeInTheDocument()
  );

  // Verify content is displayed
  expect(screen.getByText(/Welcome to/)).toBeInTheDocument();
});
```

### 3. E2E Tests (Playwright)
```typescript
// e2e/documentation.spec.ts
test('user can search and bookmark documentation', async ({ page }) => {
  await page.goto('/');

  // Search
  await page.keyboard.press('Meta+K');
  await page.fill('[placeholder="Search"]', 'useState');
  await page.click('text=React Hooks: useState');

  // Bookmark
  await page.click('[aria-label="Add bookmark"]');
  await expect(page.locator('.bookmark-added')).toBeVisible();
});
```

---

## File Structure

```
src/
├── components/
│   ├── Navigation/
│   │   ├── Navigation.tsx
│   │   ├── NavigationTree.tsx
│   │   ├── NavSection.tsx
│   │   ├── NavItem.tsx
│   │   ├── Navigation.module.css
│   │   └── index.ts
│   ├── SearchBar/
│   │   ├── SearchBar.tsx
│   │   ├── SearchInput.tsx
│   │   ├── SearchResults.tsx
│   │   ├── SearchBar.module.css
│   │   └── index.ts
│   ├── ContentViewer/
│   │   ├── ContentViewer.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── ContentViewer.module.css
│   │   └── index.ts
│   ├── BookmarkManager/
│   │   ├── BookmarkManager.tsx
│   │   ├── BookmarkList.tsx
│   │   ├── BookmarkItem.tsx
│   │   ├── FolderManager.tsx
│   │   ├── BookmarkManager.module.css
│   │   └── index.ts
│   └── NotesPanel/
│       ├── NotesPanel.tsx
│       ├── NotesList.tsx
│       ├── NoteEditor.tsx
│       ├── NotesPanel.module.css
│       └── index.ts
├── store/
│   ├── index.ts
│   ├── slices/
│   │   ├── uiSlice.ts
│   │   ├── navigationSlice.ts
│   │   ├── bookmarksSlice.ts
│   │   └── notesSlice.ts
│   └── hooks.ts
├── hooks/
│   ├── useKeyboardShortcuts.ts
│   ├── useDebounce.ts
│   ├── useThrottle.ts
│   ├── useFocusTrap.ts
│   └── useLocalStorage.ts
├── utils/
│   ├── search.ts
│   ├── markdown.ts
│   ├── storage.ts
│   └── keyboard.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

---

## Implementation Phases

### Phase 1: Core Structure (Week 1)
- [ ] Project setup with Vite + React + TypeScript
- [ ] Basic routing with React Router
- [ ] Zustand store setup
- [ ] Layout components (Header, Sidebar, Footer)
- [ ] Theme system (light/dark)

### Phase 2: Navigation & Content (Week 2)
- [ ] Navigation component with tree structure
- [ ] ContentViewer with markdown rendering
- [ ] Table of contents generation
- [ ] Breadcrumbs navigation
- [ ] Responsive design

### Phase 3: Search Functionality (Week 3)
- [ ] SearchBar component
- [ ] Fuse.js integration
- [ ] Search indexing
- [ ] Keyboard shortcuts
- [ ] Recent searches

### Phase 4: User Features (Week 4)
- [ ] BookmarkManager
- [ ] NotesPanel
- [ ] Folder organization
- [ ] Export/import functionality
- [ ] Local storage persistence

### Phase 5: Polish & Testing (Week 5)
- [ ] Accessibility improvements
- [ ] Performance optimizations
- [ ] Comprehensive testing
- [ ] Documentation
- [ ] Bug fixes

---

## Architecture Decisions

### Decision 1: Zustand vs Redux
**Choice**: Zustand

**Rationale**:
- Simpler API with less boilerplate
- Better TypeScript support out of the box
- Smaller bundle size (~1KB vs ~12KB)
- Easier to integrate with React Query
- Sufficient for app complexity

### Decision 2: React Query for Data Fetching
**Choice**: TanStack Query (React Query)

**Rationale**:
- Built-in caching and invalidation
- Automatic background refetching
- Optimistic updates support
- Server state separation from client state
- Better developer experience

### Decision 3: Tailwind CSS + CSS Modules
**Choice**: Hybrid approach

**Rationale**:
- Tailwind for rapid prototyping and utilities
- CSS Modules for complex component styles
- Scoped styles prevent conflicts
- Better maintainability

### Decision 4: Client-Side Search (Fuse.js)
**Choice**: In-memory fuzzy search

**Rationale**:
- Fast search without server roundtrips
- Works offline
- Good user experience
- Suitable for medium-sized documentation
- Can upgrade to server-side if needed

---

## Memory Store Keys

Store architecture decisions in memory for coordination:

```bash
# Store core decisions
npx claude-flow@alpha hooks post-edit \
  --file "docs/component-architecture.md" \
  --memory-key "swarm/architecture/decisions"

# Store component structure
npx claude-flow@alpha hooks post-edit \
  --file "docs/component-architecture.md" \
  --memory-key "swarm/architecture/components"

# Store state management
npx claude-flow@alpha hooks post-edit \
  --file "docs/component-architecture.md" \
  --memory-key "swarm/architecture/state-management"
```

---

## Next Steps

1. **Coder Agent**: Implement components based on this architecture
2. **Tester Agent**: Create test suites for each component
3. **Reviewer Agent**: Review implementation for best practices
4. **Documentation Agent**: Generate API documentation

---

## References

- [React Documentation](https://react.dev)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Fuse.js](https://fusejs.io/)
- [React Router v6](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Document Version**: 1.0.0
**Last Updated**: 2025-09-30
**Author**: React Architecture Designer Agent
**Status**: ✅ Complete
