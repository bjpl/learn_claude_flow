# React Router Architecture Design
**Learn Claude Flow - Documentation Viewer Application**

**Version:** 1.0.0
**Date:** 2025-09-30
**Status:** Architecture Design Phase
**Author:** Frontend Architect (Routing Specialist)

---

## Executive Summary

This document outlines the comprehensive routing architecture for the Learn Claude Flow documentation viewer application. The design introduces React Router v6 with lazy loading, deep linking, state persistence, and SEO optimization to transform the current single-page navigation into a fully routable multi-view application.

**Key Improvements:**
- URL-based navigation with browser history support
- Deep linking to specific documents and pages
- Code splitting with lazy loading for optimal performance
- State persistence via URL parameters and localStorage
- Breadcrumb navigation with proper hierarchy
- SEO-friendly routes for documentation discovery

---

## 1. Current Architecture Analysis

### 1.1 Current Navigation Structure

**Main Components:**
- `App.tsx` - Entry point with basic state management
- `DocumentationApp.tsx` - Error boundary wrapper
- `DocumentationInterface.tsx` - Main interface (assumed primary view)
- `OverviewDashboard.tsx` - Landing page with category grid
- `SearchableNavigation.tsx` - Sidebar navigation
- `ContentPanel.tsx` - Document viewer area

**Current Navigation Flow:**
```
User Action → State Update → Component Re-render
    ↓
No URL changes
No browser history
No deep linking
No shareable links
```

**Pain Points Identified:**
1. **No URL-based navigation** - Cannot bookmark or share specific documents
2. **No browser history** - Back/forward buttons don't work
3. **State loss on refresh** - Reading progress lost
4. **No deep linking** - Cannot link directly to specific pages
5. **Single bundle** - All code loaded upfront
6. **No SEO** - Search engines cannot index content

### 1.2 Component Hierarchy

```
main.tsx
└── DocumentationApp (Error Boundary)
    └── DocumentationInterface
        ├── Header (Global)
        ├── SearchableNavigation (Sidebar)
        │   ├── DocumentList
        │   ├── SearchBar
        │   └── CategoryExplorer
        └── ContentPanel (Main Content)
            ├── OverviewDashboard (Home)
            ├── DocumentViewer (PDF/Markdown)
            ├── BookmarkPanel
            ├── NotesPanel
            └── AdvancedSearch
```

---

## 2. Routing Architecture Design

### 2.1 URL Structure & Route Hierarchy

**Route Map:**

```typescript
/                                    # Home/Overview Dashboard
/docs                                # All documents list
/docs/:category                      # Category view (e.g., /docs/agents)
/docs/:category/:subcategory         # Subcategory (e.g., /docs/agents/core)
/doc/:documentId                     # Specific document viewer
/doc/:documentId/page/:pageNumber    # Direct page access
/search                              # Global search interface
/search?q=:query                     # Search results
/bookmarks                           # User bookmarks collection
/settings                            # User preferences
/about                               # About/help page
```

**Route Patterns:**

| Route | Component | Purpose | Lazy Load |
|-------|-----------|---------|-----------|
| `/` | `OverviewDashboard` | Landing page, category grid | No |
| `/docs` | `AllDocumentsList` | Complete document listing | Yes |
| `/docs/:category` | `CategoryView` | Filtered by category | Yes |
| `/docs/:category/:subcategory` | `SubcategoryView` | Nested category | Yes |
| `/doc/:documentId` | `DocumentViewer` | Document content viewer | Yes |
| `/doc/:documentId/page/:pageNumber` | `DocumentViewer` | Direct page navigation | Yes |
| `/search` | `SearchInterface` | Advanced search UI | Yes |
| `/search?q=:query` | `SearchResults` | Query results | Yes |
| `/bookmarks` | `BookmarkManager` | User bookmarks | Yes |
| `/settings` | `SettingsPanel` | User preferences | Yes |
| `/about` | `AboutPage` | Help and information | Yes |

### 2.2 Route Configuration (React Router v6)

```typescript
// src/router/routes.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Eager loaded (critical path)
import { RootLayout } from '@/layouts/RootLayout';
import { OverviewDashboard } from '@/components/OverviewDashboard';

// Lazy loaded (code splitting)
const AllDocumentsList = lazy(() => import('@/views/AllDocumentsList'));
const CategoryView = lazy(() => import('@/views/CategoryView'));
const SubcategoryView = lazy(() => import('@/views/SubcategoryView'));
const DocumentViewer = lazy(() => import('@/components/DocumentViewer'));
const SearchInterface = lazy(() => import('@/views/SearchInterface'));
const SearchResults = lazy(() => import('@/views/SearchResults'));
const BookmarkManager = lazy(() => import('@/components/BookmarkManager'));
const SettingsPanel = lazy(() => import('@/views/SettingsPanel'));
const AboutPage = lazy(() => import('@/views/AboutPage'));

// Route configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <OverviewDashboard />,
      },
      {
        path: 'docs',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading documents..." />}>
            <AllDocumentsList />
          </Suspense>
        ),
      },
      {
        path: 'docs/:category',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading category..." />}>
            <CategoryView />
          </Suspense>
        ),
      },
      {
        path: 'docs/:category/:subcategory',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading subcategory..." />}>
            <SubcategoryView />
          </Suspense>
        ),
      },
      {
        path: 'doc/:documentId',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading document..." />}>
            <DocumentViewer />
          </Suspense>
        ),
        children: [
          {
            path: 'page/:pageNumber',
            element: <DocumentViewer />,
          },
        ],
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading search..." />}>
            <SearchInterface />
          </Suspense>
        ),
      },
      {
        path: 'bookmarks',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading bookmarks..." />}>
            <BookmarkManager />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading settings..." />}>
            <SettingsPanel />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingSpinner message="Loading about..." />}>
            <AboutPage />
          </Suspense>
        ),
      },
    ],
  },
]);

// App entry point
export function AppRouter() {
  return <RouterProvider router={router} />;
}
```

### 2.3 Layout Architecture

```typescript
// src/layouts/RootLayout.tsx
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SearchableNavigation } from '@/components/SearchableNavigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LoadingBar } from '@/components/LoadingBar';

export function RootLayout() {
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Loading indicator for route transitions */}
      {isLoading && <LoadingBar />}

      {/* Global Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar - conditionally rendered */}
        {!location.pathname.includes('/doc/') && (
          <div className="w-80 flex-shrink-0">
            <SearchableNavigation />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Route Content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
```

---

## 3. Code Splitting & Lazy Loading Strategy

### 3.1 Bundle Splitting Architecture

**Critical Path (Eager Loaded):**
- `main.tsx` - Entry point
- `router/routes.tsx` - Route configuration
- `RootLayout.tsx` - Layout shell
- `OverviewDashboard.tsx` - Home page
- `Header.tsx` - Global header
- `LoadingSpinner.tsx` - Loading states
- `ErrorBoundary.tsx` - Error handling

**Lazy Loaded Chunks:**

| Chunk Name | Components | Est. Size | Load Trigger |
|------------|-----------|-----------|--------------|
| `documents-list` | AllDocumentsList, CategoryView | ~30KB | Route: `/docs` |
| `document-viewer` | DocumentViewer, ContentPanel | ~80KB | Route: `/doc/:id` |
| `search` | SearchInterface, SearchResults | ~25KB | Route: `/search` |
| `bookmarks` | BookmarkManager, BookmarkPanel | ~15KB | Route: `/bookmarks` |
| `settings` | SettingsPanel | ~10KB | Route: `/settings` |
| `vendor-pdf` | react-pdf, pdfjs-dist | ~200KB | Import on demand |
| `vendor-search` | fuse.js | ~20KB | Import on search |

**Code Splitting Implementation:**

```typescript
// src/utils/lazyImports.ts
import { lazy } from 'react';

// Document viewing bundle
export const DocumentViewer = lazy(() =>
  import(/* webpackChunkName: "document-viewer" */ '@/components/DocumentViewer')
);

// Search bundle
export const SearchInterface = lazy(() =>
  import(/* webpackChunkName: "search" */ '@/views/SearchInterface')
);

// Vendor bundles
export const loadPdfLibrary = () =>
  import(/* webpackChunkName: "vendor-pdf" */ 'react-pdf');

export const loadSearchLibrary = () =>
  import(/* webpackChunkName: "vendor-search" */ 'fuse.js');
```

### 3.2 Prefetching Strategy

```typescript
// src/router/prefetch.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePrefetch() {
  const location = useLocation();

  useEffect(() => {
    // Prefetch likely next routes based on current location
    if (location.pathname === '/') {
      // On home page, prefetch documents list
      import('@/views/AllDocumentsList');
    }

    if (location.pathname.startsWith('/docs/')) {
      // On category page, prefetch document viewer
      import('@/components/DocumentViewer');
    }

    if (location.pathname.startsWith('/doc/')) {
      // On document page, prefetch search
      import('@/views/SearchInterface');
    }
  }, [location.pathname]);
}
```

---

## 4. State Persistence & Deep Linking

### 4.1 URL State Management

**State in URL Parameters:**

```typescript
// Example URL with state:
// /doc/agents-core-coder?page=5&zoom=1.5&highlight=useCallback&sidebar=open

interface UrlState {
  page?: number;           // Current page number
  zoom?: number;           // Zoom level (0.5 - 3.0)
  highlight?: string;      // Search term to highlight
  sidebar?: 'open' | 'closed';  // Sidebar state
  view?: 'single' | 'double';   // View mode
  theme?: 'light' | 'dark';     // Theme preference
}
```

**URL State Hook:**

```typescript
// src/hooks/useUrlState.ts
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useUrlState<T extends Record<string, any>>() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getState = useCallback(
    (key: string, defaultValue?: any) => {
      const value = searchParams.get(key);
      if (!value) return defaultValue;

      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    },
    [searchParams]
  );

  const setState = useCallback(
    (updates: Partial<T>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, JSON.stringify(value));
        }
      });

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  return { getState, setState };
}
```

### 4.2 localStorage Persistence

**Persisted State:**

```typescript
// src/hooks/usePersistedState.ts
import { useState, useEffect } from 'react';

export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Get from localStorage
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, state]);

  return [state, setState];
}
```

**What to Persist:**

| Data | Storage | Reason |
|------|---------|--------|
| Current page number | URL | Shareable, bookmarkable |
| Zoom level | URL | User preference per document |
| Search query | URL | Shareable search results |
| Sidebar state | URL | UI preference |
| Theme | localStorage | Global preference |
| Bookmarks | localStorage | User data |
| Reading progress | localStorage | User data |
| Recently viewed | localStorage | User history |
| User settings | localStorage | Global preferences |

### 4.3 Deep Linking Implementation

**Document Deep Links:**

```typescript
// Direct link to specific page:
// /doc/agents-core-coder/page/5

// With additional state:
// /doc/agents-core-coder/page/5?highlight=useCallback&zoom=1.2

// Implementation in DocumentViewer:
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

export function DocumentViewer() {
  const { documentId, pageNumber } = useParams<{
    documentId: string;
    pageNumber?: string;
  }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Initialize from URL
  const currentPage = pageNumber ? parseInt(pageNumber, 10) : 1;
  const zoom = searchParams.get('zoom')
    ? parseFloat(searchParams.get('zoom')!)
    : 1.0;
  const highlight = searchParams.get('highlight') || '';

  // Update URL when page changes
  const handlePageChange = (newPage: number) => {
    navigate(`/doc/${documentId}/page/${newPage}${window.location.search}`, {
      replace: true
    });
  };

  // Update URL when zoom changes
  const handleZoomChange = (newZoom: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('zoom', newZoom.toString());
    navigate(`${window.location.pathname}?${params.toString()}`, {
      replace: true
    });
  };

  return (
    <div>
      <PDFViewer
        documentId={documentId}
        page={currentPage}
        zoom={zoom}
        highlight={highlight}
        onPageChange={handlePageChange}
        onZoomChange={handleZoomChange}
      />
    </div>
  );
}
```

**Shareable Links Generation:**

```typescript
// src/utils/shareLink.ts
export function generateShareLink(params: {
  documentId: string;
  page?: number;
  highlight?: string;
  zoom?: number;
}): string {
  const { documentId, page = 1, highlight, zoom } = params;

  const url = new URL(window.location.origin);
  url.pathname = `/doc/${documentId}/page/${page}`;

  if (highlight) url.searchParams.set('highlight', highlight);
  if (zoom && zoom !== 1.0) url.searchParams.set('zoom', zoom.toString());

  return url.toString();
}

// Usage in component:
const shareUrl = generateShareLink({
  documentId: currentDocument.id,
  page: currentPage,
  highlight: searchQuery,
  zoom: zoomLevel
});

// Copy to clipboard
navigator.clipboard.writeText(shareUrl);
```

---

## 5. Navigation Enhancements

### 5.1 Breadcrumb Navigation

```typescript
// src/components/Breadcrumbs.tsx
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();

  const breadcrumbs = generateBreadcrumbs(location.pathname);

  return (
    <nav className="flex items-center gap-2 px-6 py-3 bg-white border-b border-gray-200">
      <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>

      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 font-medium">{crumb.label}</span>
          ) : (
            <Link
              to={crumb.path}
              className="text-gray-600 hover:text-blue-600"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

function generateBreadcrumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];
  let currentPath = '';

  parts.forEach((part, index) => {
    currentPath += `/${part}`;

    let label = part;
    // Decode URL-encoded parts
    label = decodeURIComponent(label);
    // Capitalize and format
    label = label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    breadcrumbs.push({
      label,
      path: currentPath
    });
  });

  return breadcrumbs;
}
```

### 5.2 Navigation Guards & Redirects

```typescript
// src/router/guards.tsx
import { Navigate, useLocation } from 'react-router-dom';

// Redirect old URLs to new format
export function LegacyRedirect() {
  const location = useLocation();

  // Example: redirect old query params to new routes
  const params = new URLSearchParams(location.search);
  const docId = params.get('doc');

  if (docId) {
    return <Navigate to={`/doc/${docId}`} replace />;
  }

  return <Navigate to="/" replace />;
}

// Protect routes (if authentication added later)
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = false; // Check auth state

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
```

### 5.3 Browser History Integration

```typescript
// src/hooks/useNavigationHistory.ts
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function useNavigationHistory() {
  const navigate = useNavigate();
  const location = useLocation();

  // Track navigation history in localStorage
  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem('navigation-history') || '[]'
    );

    history.push({
      pathname: location.pathname,
      search: location.search,
      timestamp: Date.now()
    });

    // Keep last 50 entries
    if (history.length > 50) {
      history.shift();
    }

    localStorage.setItem('navigation-history', JSON.stringify(history));
  }, [location]);

  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  return { goBack, goForward };
}
```

---

## 6. SEO & Metadata

### 6.1 Dynamic Page Titles

```typescript
// src/hooks/useDocumentTitle.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useDocumentTitle(title?: string) {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = 'Learn Claude Flow';

    if (title) {
      document.title = `${title} | ${baseTitle}`;
    } else {
      // Generate from route
      const routeTitle = generateTitleFromRoute(location.pathname);
      document.title = routeTitle ? `${routeTitle} | ${baseTitle}` : baseTitle;
    }
  }, [title, location.pathname]);
}

function generateTitleFromRoute(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);

  if (parts.length === 0) return 'Home';
  if (parts[0] === 'docs') return 'Documentation';
  if (parts[0] === 'doc') return 'Reading Document';
  if (parts[0] === 'search') return 'Search Results';
  if (parts[0] === 'bookmarks') return 'My Bookmarks';

  return '';
}
```

### 6.2 Meta Tags for Social Sharing

```typescript
// src/components/MetaTags.tsx
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function MetaTags({ title, description, image, url }: MetaTagsProps) {
  const defaultTitle = 'Learn Claude Flow';
  const defaultDescription = 'Interactive documentation viewer for Claude Flow';
  const defaultImage = '/og-image.png';

  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const fullUrl = url || window.location.href;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
```

---

## 7. Performance Optimization

### 7.1 Route Prefetching

```typescript
// src/components/PrefetchLink.tsx
import { Link, LinkProps } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export function PrefetchLink({
  to,
  prefetch = 'hover',
  children,
  ...props
}: LinkProps & { prefetch?: 'hover' | 'visible' | 'none' }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (prefetch === 'none') return;

    const link = linkRef.current;
    if (!link) return;

    const handlePrefetch = () => {
      // Dynamically import the component for this route
      // This would be customized based on route-to-component mapping
      prefetchRouteComponent(to as string);
    };

    if (prefetch === 'hover') {
      link.addEventListener('mouseenter', handlePrefetch, { once: true });
      return () => link.removeEventListener('mouseenter', handlePrefetch);
    }

    if (prefetch === 'visible') {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          handlePrefetch();
        }
      });
      observer.observe(link);
      return () => observer.disconnect();
    }
  }, [to, prefetch]);

  return <Link ref={linkRef} to={to} {...props}>{children}</Link>;
}

async function prefetchRouteComponent(path: string) {
  if (path.startsWith('/docs/')) {
    await import('@/views/CategoryView');
  } else if (path.startsWith('/doc/')) {
    await import('@/components/DocumentViewer');
  } else if (path.startsWith('/search')) {
    await import('@/views/SearchInterface');
  }
}
```

### 7.2 Route Transition Performance

```typescript
// src/components/LoadingBar.tsx
import { useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function LoadingBar() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (navigation.state === 'loading') {
      setProgress(30);

      const timer = setTimeout(() => setProgress(70), 200);
      return () => clearTimeout(timer);
    } else {
      setProgress(100);

      const timer = setTimeout(() => setProgress(0), 300);
      return () => clearTimeout(timer);
    }
  }, [navigation.state]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-blue-200 z-50">
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

---

## 8. Migration Strategy

### 8.1 Phased Implementation Plan

**Phase 1: Foundation (Week 1)**
- Install react-router-dom v6
- Create basic route structure
- Implement RootLayout
- Add breadcrumb navigation
- Update main.tsx with router

**Phase 2: Core Routes (Week 2)**
- Implement home route (OverviewDashboard)
- Create document viewer route with params
- Add category/subcategory routes
- Implement URL state management

**Phase 3: Advanced Features (Week 3)**
- Add lazy loading to all routes
- Implement prefetching strategy
- Create deep linking system
- Add state persistence

**Phase 4: Optimization (Week 4)**
- Optimize bundle splitting
- Add loading transitions
- Implement SEO meta tags
- Performance testing & tuning

### 8.2 Backward Compatibility

```typescript
// Support old hash-based routing during transition
if (window.location.hash) {
  const hash = window.location.hash.slice(1);
  const newPath = convertHashToPath(hash);
  window.history.replaceState(null, '', newPath);
}

function convertHashToPath(hash: string): string {
  // Convert old hash routes to new paths
  if (hash.startsWith('/doc/')) return hash;
  if (hash === '/') return '/';
  return `/${hash}`;
}
```

### 8.3 Testing Strategy

**Route Testing:**
```typescript
// tests/routes.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { router } from '@/router/routes';

describe('Routing', () => {
  test('renders home page at /', () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Claude Flow Knowledge Base')).toBeInTheDocument();
  });

  test('navigates to document viewer', () => {
    render(
      <MemoryRouter initialEntries={['/doc/test-doc/page/1']}>
        <DocumentViewer />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading document/i)).toBeInTheDocument();
  });
});
```

---

## 9. Component Mapping

### 9.1 Route to Component Map

| Route Pattern | Component | Props from Route | State Sources |
|--------------|-----------|------------------|---------------|
| `/` | `OverviewDashboard` | - | documents, knowledgeGraph |
| `/docs` | `AllDocumentsList` | - | documents, filters |
| `/docs/:category` | `CategoryView` | `category` | documents, category metadata |
| `/doc/:documentId` | `DocumentViewer` | `documentId` | document, page, zoom |
| `/doc/:documentId/page/:pageNumber` | `DocumentViewer` | `documentId, pageNumber` | document, zoom, highlights |
| `/search` | `SearchInterface` | `query` (URL param) | searchResults, filters |
| `/bookmarks` | `BookmarkManager` | - | bookmarks, notes |
| `/settings` | `SettingsPanel` | - | userSettings |

### 9.2 New Components Required

**Views (to be created):**

```typescript
// src/views/AllDocumentsList.tsx
export function AllDocumentsList() {
  const documents = useDocuments();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1>All Documents</h1>
      <DocumentGrid
        documents={documents}
        onSelect={(doc) => navigate(`/doc/${doc.id}`)}
      />
    </div>
  );
}

// src/views/CategoryView.tsx
export function CategoryView() {
  const { category } = useParams();
  const documents = useDocumentsByCategory(category);

  return (
    <div className="p-6">
      <CategoryHeader category={category} />
      <DocumentList documents={documents} />
    </div>
  );
}

// src/views/SearchInterface.tsx
export function SearchInterface() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="p-6">
      <SearchBar initialQuery={query} />
      <SearchResults query={query} />
    </div>
  );
}
```

---

## 10. Implementation Checklist

### 10.1 Dependencies

```json
{
  "dependencies": {
    "react-router-dom": "^6.20.0",
    "react-helmet-async": "^2.0.4"
  }
}
```

### 10.2 File Structure

```
src/
├── router/
│   ├── routes.tsx              # Route configuration
│   ├── guards.tsx              # Navigation guards
│   └── prefetch.ts            # Prefetch utilities
├── layouts/
│   └── RootLayout.tsx         # Main layout wrapper
├── views/                     # Route-specific views
│   ├── AllDocumentsList.tsx
│   ├── CategoryView.tsx
│   ├── SubcategoryView.tsx
│   ├── SearchInterface.tsx
│   ├── SearchResults.tsx
│   ├── SettingsPanel.tsx
│   └── AboutPage.tsx
├── hooks/
│   ├── useUrlState.ts         # URL state management
│   ├── usePersistedState.ts   # localStorage persistence
│   ├── useDocumentTitle.ts    # Dynamic titles
│   └── useNavigationHistory.ts # History tracking
└── utils/
    └── shareLink.ts           # Link generation
```

### 10.3 Configuration Updates

**vite.config.ts:**
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-pdf': ['react-pdf', 'pdfjs-dist'],
          'vendor-search': ['fuse.js'],
        }
      }
    }
  }
});
```

---

## 11. Success Metrics

### 11.1 Performance Targets

| Metric | Target | Current | Improvement |
|--------|--------|---------|-------------|
| Initial Bundle Size | < 150KB | ~500KB | -70% |
| Time to Interactive | < 2s | ~4s | -50% |
| Route Transition | < 200ms | N/A | New feature |
| Code Coverage | > 80% | 0% | New tests |

### 11.2 User Experience Improvements

- Browser back/forward works correctly
- Shareable links to specific pages
- Bookmarkable document states
- Faster initial page load
- Progressive loading of features
- Better SEO for documentation

---

## 12. Future Enhancements

### 12.1 Advanced Features

1. **Offline Support**
   - Service worker integration
   - Cache routes and documents
   - Offline indicator

2. **Progressive Web App**
   - Install prompt
   - App manifest
   - Home screen icon

3. **Advanced Navigation**
   - Keyboard shortcuts (Cmd+K for search)
   - Quick switcher modal
   - Recent documents panel

4. **Analytics Integration**
   - Track popular routes
   - Navigation flow analysis
   - User journey mapping

### 12.2 A/B Testing Opportunities

- Different route structures
- Navigation patterns
- Loading states
- Breadcrumb styles

---

## 13. Rollback Plan

If issues arise during migration:

1. **Immediate Rollback:**
   ```bash
   git revert <commit-hash>
   npm run build
   npm run deploy
   ```

2. **Feature Flag:**
   ```typescript
   const USE_ROUTER = import.meta.env.VITE_USE_ROUTER === 'true';

   return USE_ROUTER ? <AppRouter /> : <LegacyApp />;
   ```

3. **Gradual Rollout:**
   - Enable for 10% of users
   - Monitor error rates
   - Increase to 50%, then 100%

---

## 14. Documentation Requirements

### 14.1 Developer Documentation

- Route configuration guide
- Adding new routes
- State management patterns
- Testing routes
- Performance optimization

### 14.2 User Documentation

- How to share links
- Keyboard shortcuts
- Navigation tips
- Bookmarking documents

---

## Conclusion

This routing architecture provides a comprehensive foundation for transforming the Learn Claude Flow documentation viewer into a fully routable, performant, and SEO-friendly web application. The design prioritizes:

1. **Developer Experience** - Clear patterns, easy to extend
2. **User Experience** - Fast, intuitive, shareable
3. **Performance** - Code splitting, lazy loading, prefetching
4. **Maintainability** - Modular structure, well-tested
5. **Scalability** - Ready for growth and new features

**Next Steps:**
1. Review and approve architecture
2. Install dependencies
3. Begin Phase 1 implementation
4. Coordinate with UI and State Management agents

---

**Document Status:** Ready for Implementation
**Approval Required:** Technical Lead, Product Owner
**Estimated Implementation:** 4 weeks
**Dependencies:** None (can proceed independently)
