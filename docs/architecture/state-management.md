# State Management Architecture

## Overview

The Learn Claude Flow application uses **Zustand** for state management with a modular slice-based architecture. This approach eliminates props drilling, provides type-safe state access, and offers persistence for user preferences.

## Architecture Principles

### 1. Slice-Based Organization
State is organized into logical slices, each responsible for a specific domain:
- **Document Slice**: Current document, pages, zoom, view modes
- **UI Slice**: Sidebar, theme, modals, notifications, layout preferences
- **Navigation Slice**: Current view, breadcrumbs, history, routing
- **Search Slice**: Query, results, filters, search history
- **Bookmarks Slice**: Bookmarks, notes, highlights, reading progress

### 2. Single Source of Truth
All application state lives in a single Zustand store, created by combining slices.

### 3. Custom Hooks Pattern
Domain-specific hooks provide convenient access to store slices with computed values.

### 4. Persistence
User preferences and data are automatically persisted to localStorage using Zustand's persist middleware.

## Store Structure

```typescript
// Main store combining all slices
export type AppStore =
  & DocumentState
  & UIState
  & NavigationState
  & SearchState
  & BookmarksState;
```

## Slices

### Document Slice (`documentSlice.ts`)
Manages document viewing state.

**State:**
- `currentDocument`: Currently viewed document
- `currentPage`: Current page number
- `zoom`: Zoom level (0.5 - 3.0)
- `viewMode`: Display mode (single/double/scroll)
- `documentContent`: Loaded document content
- `isLoading`: Loading state

**Actions:**
- `setCurrentDocument(doc)`: Select document
- `setCurrentPage(page)`: Navigate to page
- `zoomIn()`, `zoomOut()`, `resetZoom()`: Zoom controls
- `nextPage()`, `previousPage()`, `goToPage(n)`: Page navigation

### UI Slice (`uiSlice.ts`)
Manages user interface state and preferences.

**State:**
- `sidebarOpen`: Sidebar visibility
- `sidebarWidth`: Sidebar width in pixels
- `theme`: Color theme (light/dark)
- `smartSearchOpen`, `settingsOpen`, etc.: Modal states
- `compactMode`: Compact layout flag
- `showBreadcrumbs`, `showTableOfContents`: Display flags
- `notifications`: Toast notifications array

**Actions:**
- `toggleSidebar()`, `setSidebarOpen(open)`: Sidebar control
- `setTheme(theme)`, `toggleTheme()`: Theme management
- Modal toggles: `setSmartSearchOpen(open)`, etc.
- `addNotification(notif)`, `removeNotification(id)`: Notifications

### Navigation Slice (`navigationSlice.ts`)
Manages navigation state and history.

**State:**
- `currentView`: Current view ('overview' | 'category' | 'document')
- `selectedCategory`: Active category
- `breadcrumbs`: Breadcrumb trail
- `history`: Navigation history stack
- `historyIndex`: Current position in history

**Actions:**
- `navigateToCategory(category)`: Navigate to category view
- `navigateToDocument(docId)`: Navigate to document view
- `navigateToOverview()`: Return to overview
- `goBack()`, `goForward()`: History navigation
- `setBreadcrumbs(crumbs)`, `addBreadcrumb(crumb)`: Breadcrumb management

### Search Slice (`searchSlice.ts`)
Manages search functionality and filters.

**State:**
- `searchQuery`: Current search query
- `searchResults`: Search results array
- `isSearching`: Search in progress flag
- `searchFilters`: Active filters (categories, tags, types, date range, sort)
- `searchHistory`: Recent searches (max 20)
- `advancedSearchOpen`: Advanced search panel state

**Actions:**
- `executeSearch(query)`: Perform search
- `clearSearch()`: Reset search state
- `setSearchFilters(filters)`, `resetSearchFilters()`: Filter management
- `addToSearchHistory(query)`: Save search to history
- `clearSearchHistory()`: Clear search history

### Bookmarks Slice (`bookmarksSlice.ts`)
Manages user annotations and reading progress.

**State:**
- `bookmarks`: Bookmarks array
- `notes`: Notes array
- `highlights`: Document highlights map
- `readingProgress`: Reading progress map

**Actions:**
- Bookmarks: `addBookmark()`, `removeBookmark()`, `updateBookmark()`
- Notes: `addNote()`, `updateNote()`, `removeNote()`
- Highlights: `addHighlight()`, `removeHighlight()`, `clearHighlights()`
- Progress: `updateProgress()`, `markAsCompleted()`, `clearProgress()`

## Custom Hooks

### Document Hooks
```typescript
useCurrentDocument()      // Current doc and page
useZoom()                 // Zoom controls
usePageNavigation()       // Page navigation with computed flags
useViewMode()             // View mode with boolean flags
useDocumentLoading()      // Loading state and content
useDocumentSelection()    // Document selection with progress restoration
```

### UI Hooks
```typescript
useSidebar()              // Sidebar state and controls
useTheme()                // Theme with isDark/isLight flags
useModals()               // All modal states
useLayoutPreferences()    // Layout flags (compact, breadcrumbs, TOC)
useNotifications()        // Toast notifications
```

### Navigation Hooks
```typescript
useCurrentView()          // View state with boolean flags
useNavigation()           // Navigation actions
useBreadcrumbs()          // Breadcrumb management
useHistory()              // History navigation with can* flags
```

### Search Hooks
```typescript
useSearch()               // Basic search with computed flags
useSearchFilters()        // Filters with hasActiveFilters flag
useSearchHistory()        // Search history management
useAdvancedSearch()       // Advanced search panel
```

### Bookmarks Hooks
```typescript
useBookmarks(docId?)      // Bookmarks with computed values
useNotes(docId?)          // Notes with counts
useHighlights(docId?)     // Highlights per document
useReadingProgress(docId?) // Progress with percentage
useAnnotations(docId?)    // All annotations combined
```

## Persistence Configuration

### Persisted State
The following state is automatically saved to localStorage:
- **UI Preferences**: `theme`, `sidebarWidth`, `compactMode`, `showBreadcrumbs`, `showTableOfContents`
- **Document Preferences**: `zoom`, `viewMode`
- **User Data**: `bookmarks`, `notes`, `highlights`, `readingProgress`
- **Search**: `searchHistory`, `searchFilters`
- **Navigation**: `history`

### Non-Persisted State
Transient state that resets on page reload:
- Current document and page
- Search query and results
- Modal open states
- Loading states
- Notifications

### Custom Serialization
`readingProgress` Map is serialized to an array for storage and restored on load.

## Usage Examples

### Component Example 1: Document Viewer
```typescript
import { useCurrentDocument, useZoom, usePageNavigation } from '@/store/hooks';

function DocumentViewer() {
  const { currentDocument } = useCurrentDocument();
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();
  const { currentPage, totalPages, nextPage, previousPage, hasNextPage, hasPreviousPage } = usePageNavigation();

  return (
    <div>
      <h1>{currentDocument?.title}</h1>
      <div>Page {currentPage} of {totalPages}</div>
      <button onClick={previousPage} disabled={!hasPreviousPage}>Previous</button>
      <button onClick={nextPage} disabled={!hasNextPage}>Next</button>
      <div>
        <button onClick={zoomOut}>-</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={zoomIn}>+</button>
        <button onClick={resetZoom}>Reset</button>
      </div>
    </div>
  );
}
```

### Component Example 2: Search Interface
```typescript
import { useSearch, useSearchHistory } from '@/store/hooks';

function SearchBar() {
  const { searchQuery, executeSearch, clearSearch, hasResults, resultsCount } = useSearch();
  const { searchHistory, addToSearchHistory } = useSearchHistory();

  const handleSearch = (query: string) => {
    executeSearch(query);
  };

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {hasResults && <div>{resultsCount} results found</div>}
      <button onClick={clearSearch}>Clear</button>

      <div>
        {searchHistory.map(query => (
          <button key={query} onClick={() => handleSearch(query)}>
            {query}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Component Example 3: Bookmarks Panel
```typescript
import { useBookmarks, useReadingProgress } from '@/store/hooks';

function BookmarksPanel() {
  const { bookmarks, addBookmark, removeBookmark, count } = useBookmarks();
  const { progress, percentage, isCompleted } = useReadingProgress('doc-id');

  return (
    <div>
      <h2>Bookmarks ({count})</h2>
      {bookmarks.map(bookmark => (
        <div key={bookmark.id}>
          <span>{bookmark.title}</span>
          <button onClick={() => removeBookmark(bookmark.id)}>Remove</button>
        </div>
      ))}

      {progress && (
        <div>
          Reading Progress: {percentage}%
          {isCompleted && <span>✓ Completed</span>}
        </div>
      )}
    </div>
  );
}
```

### Component Example 4: Theme Switcher
```typescript
import { useTheme } from '@/store/hooks';

function ThemeSwitcher() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
```

## Benefits

### 1. No Props Drilling
State is accessed directly via hooks, eliminating the need to pass props through multiple component levels.

### 2. Type Safety
Full TypeScript support with strict typing for all state and actions.

### 3. Performance
Zustand's minimal re-render approach ensures components only update when their specific state slice changes.

### 4. Developer Experience
- Clear separation of concerns
- Easy to test individual slices
- Simple mental model
- Excellent IDE autocomplete

### 5. Persistence
User preferences automatically saved and restored across sessions.

### 6. Scalability
Easy to add new slices or extend existing ones without affecting other parts of the application.

## File Structure

```
src/store/
├── index.ts                    # Main store combining all slices
├── slices/
│   ├── documentSlice.ts       # Document state
│   ├── uiSlice.ts             # UI preferences
│   ├── navigationSlice.ts     # Navigation and history
│   ├── searchSlice.ts         # Search functionality
│   └── bookmarksSlice.ts      # Annotations and progress
└── hooks/
    ├── index.ts               # Barrel export
    ├── useDocumentState.ts    # Document hooks
    ├── useUIState.ts          # UI hooks
    ├── useNavigationState.ts  # Navigation hooks
    ├── useSearchState.ts      # Search hooks
    └── useBookmarksState.ts   # Bookmarks hooks
```

## Migration from useState

### Before (Props Drilling)
```typescript
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [currentDoc, setCurrentDoc] = useState(null);

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      theme={theme}
      setTheme={setTheme}
    >
      <Viewer
        currentDoc={currentDoc}
        setCurrentDoc={setCurrentDoc}
        theme={theme}
      />
    </Layout>
  );
}
```

### After (Zustand)
```typescript
function App() {
  return (
    <Layout>
      <Viewer />
    </Layout>
  );
}

function Layout({ children }) {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  // Use state directly!
}

function Viewer() {
  const { currentDocument, setCurrentDocument } = useCurrentDocument();
  // Access state without props!
}
```

## Best Practices

1. **Use Custom Hooks**: Always prefer domain hooks over direct store access
2. **Selective State Selection**: Only subscribe to the state you need
3. **Computed Values**: Use hooks for derived state (percentages, flags, etc.)
4. **Action Grouping**: Group related actions in hooks (e.g., `useDocumentSelection`)
5. **Type Everything**: Leverage TypeScript for safety
6. **Persistence**: Only persist user preferences, not transient state

## Future Enhancements

- [ ] Add middleware for logging state changes in development
- [ ] Implement undo/redo functionality using history
- [ ] Add state synchronization across browser tabs
- [ ] Create devtools integration for state debugging
- [ ] Add state migrations for schema changes
