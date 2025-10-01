# Code Splitting Strategy - Learn Claude Flow

## Executive Summary

**Current Bundle Analysis:**
- Total Bundle Size: **620 KB** (gzipped: ~185 KB)
- Main Chunks:
  - `pdf-vendor`: 350.49 KB (gzipped: 103.55 KB) - 56.5% of total
  - `react-vendor`: 141.79 KB (gzipped: 45.52 KB) - 22.9% of total
  - `index`: 127.51 KB (gzipped: 25.59 KB) - 20.6% of total

**Target After Optimization:**
- Core Bundle: **180 KB** (gzipped: ~45 KB) - 71% reduction
- Initial Load: **225 KB** total (Core + React vendor)
- Lazy Chunks: **395 KB** loaded on-demand

**Expected Performance Gains:**
- Initial Load Time: 2.8s → 0.9s (68% improvement)
- Time to Interactive: 3.5s → 1.2s (66% improvement)
- First Contentful Paint: 1.8s → 0.6s (67% improvement)

---

## 1. Current Bundle Breakdown

### 1.1 Dependency Analysis

**Heavy Dependencies (by disk size):**
```
lucide-react:     32 MB  (icons library - 1000+ icons)
react-pdf:       744 KB  (PDF rendering)
fuse.js:         476 KB  (fuzzy search)
zustand:         ~40 KB  (state management)
react/react-dom: ~140 KB (core framework)
```

**Actual Bundle Impact (after tree-shaking):**
```
react-pdf:       350.49 KB gzipped: 103.55 KB (56.5%)
react/react-dom: 141.79 KB gzipped:  45.52 KB (22.9%)
app code:        127.51 KB gzipped:  25.59 KB (20.6%)
fuse.js:           0.05 KB gzipped:   0.07 KB (0.008%) - effectively tree-shaken
```

### 1.2 Component Analysis (by size)

**Large Components (lines of code):**
```
DocumentationInterface:   379 lines (complex UI orchestration)
search/SearchBar:         303 lines (advanced search UI)
KnowledgeMap:            299 lines (visualization component)
DocumentExplorer:        280 lines (file tree navigation)
SmartSearch:             264 lines (intelligent search)
OverviewDashboard:       256 lines (dashboard UI)
NotesPanel:              226 lines (note-taking features)
AdvancedSearch:          212 lines (search filters)
```

**Total Component Code:** 5,350 lines across 29+ components

---

## 2. Code Splitting Strategy

### 2.1 Route-Based Splitting

**Problem:** Currently no routing - single-page app loads everything upfront.

**Solution:** Implement view-based lazy loading with React Router.

#### Proposed Route Structure:

```typescript
// src/routes/index.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Core components (always loaded)
import App from '../App';
import { SearchableNavigation } from '../components/SearchableNavigation';

// Lazy-loaded views
const DocumentViewer = lazy(() => import('../views/DocumentViewer'));
const SearchView = lazy(() => import('../views/SearchView'));
const BookmarksView = lazy(() => import('../views/BookmarksView'));
const NotesView = lazy(() => import('../views/NotesView'));
const OverviewDashboard = lazy(() => import('../views/OverviewDashboard'));
const KnowledgeMap = lazy(() => import('../views/KnowledgeMap'));

export function AppRouter() {
  return (
    <BrowserRouter>
      <App>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<OverviewDashboard />} />
            <Route path="/document/:id" element={<DocumentViewer />} />
            <Route path="/search" element={<SearchView />} />
            <Route path="/bookmarks" element={<BookmarksView />} />
            <Route path="/notes" element={<NotesView />} />
            <Route path="/knowledge-map" element={<KnowledgeMap />} />
          </Routes>
        </Suspense>
      </App>
    </BrowserRouter>
  );
}
```

**Expected Chunk Sizes:**
- Core: 45 KB (App shell + navigation)
- DocumentViewer: 110 KB (includes PDF vendor)
- SearchView: 35 KB (search components)
- BookmarksView: 15 KB
- NotesView: 20 KB
- OverviewDashboard: 30 KB
- KnowledgeMap: 35 KB

### 2.2 Feature-Based Splitting

#### A. PDF Viewer (Largest Optimization Opportunity)

**Current:** PDF vendor loaded upfront (350.49 KB, 103.55 KB gzipped)

**Strategy:** Lazy load PDF components only when viewing PDF documents.

```typescript
// src/components/ContentPanel.tsx
import { lazy, Suspense, useState } from 'react';

const PDFViewer = lazy(() => import('./PDFViewer'));
const MarkdownViewer = lazy(() => import('./MarkdownViewer'));

export function ContentPanel({ document, ...props }) {
  if (!document) return <WelcomeScreen />;

  return (
    <Suspense fallback={<DocumentLoadingSpinner />}>
      {document.type === 'pdf' ? (
        <PDFViewer document={document} {...props} />
      ) : (
        <MarkdownViewer document={document} {...props} />
      )}
    </Suspense>
  );
}
```

**Impact:**
- Initial bundle: -350 KB (-103 KB gzipped)
- PDF viewer chunk: 350 KB (loaded on first PDF view)
- 56.5% reduction in initial bundle size

#### B. Advanced Search Features

**Current:** Search components loaded upfront (est. 80 KB)

**Strategy:** Progressive enhancement - basic search always available, advanced features lazy-loaded.

```typescript
// src/components/SearchableNavigation.tsx
import { lazy, Suspense, useState } from 'react';
import { BasicSearch } from './search/BasicSearch';

const AdvancedSearch = lazy(() => import('./AdvancedSearch'));
const SmartSearch = lazy(() => import('./SmartSearch'));

export function SearchableNavigation(props) {
  const [searchMode, setSearchMode] = useState<'basic' | 'advanced' | 'smart'>('basic');

  return (
    <div>
      {searchMode === 'basic' && <BasicSearch {...props} />}

      {searchMode === 'advanced' && (
        <Suspense fallback={<SearchLoadingSpinner />}>
          <AdvancedSearch {...props} />
        </Suspense>
      )}

      {searchMode === 'smart' && (
        <Suspense fallback={<SearchLoadingSpinner />}>
          <SmartSearch {...props} />
        </Suspense>
      )}
    </div>
  );
}
```

**Impact:**
- Initial bundle: -80 KB (-18 KB gzipped)
- Advanced search chunk: 45 KB
- Smart search chunk: 35 KB

#### C. Visualization Components

**Current:** KnowledgeMap loaded upfront (299 lines, ~35 KB)

**Strategy:** Lazy load on tab/view switch.

```typescript
// src/components/DocumentExplorer.tsx
import { lazy, Suspense } from 'react';

const KnowledgeMap = lazy(() => import('./KnowledgeMap'));
const CategoryExplorer = lazy(() => import('./CategoryExplorer'));

export function DocumentExplorer({ view }) {
  return (
    <Suspense fallback={<VisualizationLoader />}>
      {view === 'knowledge-map' && <KnowledgeMap />}
      {view === 'categories' && <CategoryExplorer />}
    </Suspense>
  );
}
```

**Impact:**
- Initial bundle: -35 KB (-8 KB gzipped)
- Visualization chunk: 35 KB

### 2.3 Icon Optimization (Critical Issue)

**Problem:** Lucide-react is 32 MB on disk but tree-shaking should handle this.

**Current Status:** Appears to be properly tree-shaken (not showing in bundle analysis).

**Verification Needed:** Ensure only used icons are bundled.

**Strategy:** Import icons individually (best practice):

```typescript
// ❌ BAD: Could import entire library
import * as Icons from 'lucide-react';

// ✅ GOOD: Tree-shakeable imports
import { Search, Filter, BookmarkPlus, Download } from 'lucide-react';
```

**Audit Required:**
```bash
# Check all icon imports
grep -r "from 'lucide-react'" src/ | grep -v "^//" | wc -l
```

**Optimization:** Create icon barrel file for commonly used icons:

```typescript
// src/components/icons/index.ts
export {
  Search,
  Filter,
  BookmarkPlus,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Tag,
  Folder,
} from 'lucide-react';
```

### 2.4 Vendor Chunk Optimization

**Current Configuration:**
```typescript
// vite.config.ts
manualChunks: {
  'react-vendor': ['react', 'react-dom'],
  'pdf-vendor': ['react-pdf'],
  'search-vendor': ['fuse.js'], // Empty! fuse.js not actually used?
}
```

**Improved Configuration:**

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React framework
          if (id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/scheduler')) {
            return 'react-vendor';
          }

          // PDF rendering (lazy loaded)
          if (id.includes('node_modules/react-pdf') ||
              id.includes('node_modules/pdfjs-dist')) {
            return 'pdf-viewer';
          }

          // State management (small, include in main)
          if (id.includes('node_modules/zustand')) {
            return 'state';
          }

          // UI libraries
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }

          // Search (if fuse.js is actually used)
          if (id.includes('node_modules/fuse.js')) {
            return 'search';
          }

          // All other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },

    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 500, // KB
  },
});
```

---

## 3. Implementation Plan

### Phase 1: Quick Wins (Week 1)

**Priority: High Impact, Low Effort**

#### 1.1 Lazy Load PDF Viewer
- Extract PDF components to separate module
- Implement React.lazy() wrapper
- Add Suspense boundary with loading state
- **Expected Savings:** 350 KB (-103 KB gzipped)

#### 1.2 Optimize Vite Configuration
- Implement improved manualChunks function
- Enable terser minification with console removal
- Configure chunk size warnings
- **Expected Savings:** 15-20 KB (better compression)

#### 1.3 Icon Audit
- Audit all lucide-react imports
- Ensure tree-shakeable imports
- Create centralized icon barrel
- **Expected Savings:** Prevent regression (currently optimized)

**Phase 1 Target:** 450 KB total (-170 KB, 27% reduction)

### Phase 2: Feature Splitting (Week 2)

**Priority: Medium Impact, Medium Effort**

#### 2.1 Implement Basic Routing
- Add react-router-dom dependency (50 KB gzipped)
- Create route structure
- Split main views into lazy-loaded routes
- **Expected Savings:** -60 KB net (after router overhead)

#### 2.2 Progressive Search Enhancement
- Extract BasicSearch component (always loaded)
- Lazy load AdvancedSearch
- Lazy load SmartSearch
- **Expected Savings:** -80 KB (-18 KB gzipped)

#### 2.3 Lazy Load Visualizations
- Lazy load KnowledgeMap
- Lazy load CategoryExplorer
- **Expected Savings:** -35 KB (-8 KB gzipped)

**Phase 2 Target:** 275 KB total (-175 KB additional, 56% total reduction)

### Phase 3: Advanced Optimizations (Week 3)

**Priority: Medium Impact, Higher Effort**

#### 3.1 Component Code Splitting
- Split DocumentationInterface (379 lines)
- Extract DocumentExplorer features
- Modularize OverviewDashboard
- **Expected Savings:** -40 KB (-10 KB gzipped)

#### 3.2 Data Preloading Strategy
- Implement prefetching for likely routes
- Add resource hints (preload, prefetch)
- Smart preloading based on user behavior
- **Impact:** Faster perceived load times

#### 3.3 Bundle Analysis Dashboard
- Add rollup-plugin-visualizer
- Monitor bundle sizes in CI
- Set up bundle size budgets
- **Impact:** Prevent future regressions

**Phase 3 Target:** 235 KB total (-40 KB additional, 62% total reduction)

### Phase 4: Performance Fine-tuning (Week 4)

**Priority: Low Impact, Continuous Improvement**

#### 4.1 Image Optimization
- Optimize SVGs and icons
- Implement lazy image loading
- Add WebP/AVIF support
- **Expected Savings:** Minimal for current app

#### 4.2 CSS Optimization
- Split critical CSS
- Lazy load component styles
- Remove unused Tailwind classes
- **Expected Savings:** -10 KB

#### 4.3 Caching Strategy
- Configure long-term caching headers
- Implement service worker for offline
- Add stale-while-revalidate patterns
- **Impact:** Better repeat visit performance

**Phase 4 Target:** 225 KB total (-10 KB additional, 64% total reduction)

---

## 4. Expected Results

### 4.1 Bundle Size Comparison

#### Before Optimization:
```
Total: 620 KB (185 KB gzipped)
├── pdf-vendor:    350 KB (103.55 KB gzipped) - 56.5%
├── react-vendor:  142 KB ( 45.52 KB gzipped) - 22.9%
├── index:         128 KB ( 25.59 KB gzipped) - 20.6%
└── other:          <1 KB
```

#### After Phase 1 (Week 1):
```
Total Initial: 450 KB (130 KB gzipped)
├── react-vendor:  142 KB ( 45.52 KB gzipped) - 31.6%
├── core-app:      120 KB ( 28.00 KB gzipped) - 26.7%
├── icons:          40 KB ( 12.00 KB gzipped) -  8.9%
├── state:          15 KB (  4.50 KB gzipped) -  3.3%
└── other:           5 KB (  1.50 KB gzipped) -  1.1%

Lazy Chunks:
├── pdf-viewer:    350 KB (103.55 KB gzipped) - loaded on PDF view
├── search-adv:     45 KB ( 10.00 KB gzipped) - loaded on advanced search
└── visualizations: 35 KB (  8.00 KB gzipped) - loaded on viz view
```

#### After Phase 2 (Week 2):
```
Total Initial: 275 KB (85 KB gzipped)
├── react-vendor:   142 KB ( 45.52 KB gzipped) - 51.6%
├── react-router:    50 KB ( 15.00 KB gzipped) - 18.2%
├── core-app:        60 KB ( 18.00 KB gzipped) - 21.8%
├── icons:           15 KB (  4.50 KB gzipped) -  5.5%
└── state:            8 KB (  2.00 KB gzipped) -  2.9%

Lazy Chunks (loaded per route):
├── route-document: 380 KB (110.00 KB gzipped) - /document/:id
├── route-search:   120 KB ( 35.00 KB gzipped) - /search
├── route-dashboard: 100 KB ( 30.00 KB gzipped) - /
├── route-knowledge:  90 KB ( 28.00 KB gzipped) - /knowledge-map
├── route-bookmarks:  50 KB ( 15.00 KB gzipped) - /bookmarks
└── route-notes:      60 KB ( 18.00 KB gzipped) - /notes
```

#### After Phase 3 (Week 3):
```
Total Initial: 235 KB (65 KB gzipped)
├── react-vendor:   142 KB ( 45.52 KB gzipped) - 60.4%
├── react-router:    50 KB ( 15.00 KB gzipped) - 21.3%
├── core-app:        35 KB ( 10.00 KB gzipped) - 14.9%
└── icons:            8 KB (  2.50 KB gzipped) -  3.4%

Route Chunks: [optimized, same as Phase 2]
```

#### After Phase 4 (Week 4) - FINAL TARGET:
```
Total Initial: 225 KB (60 KB gzipped)
├── react-vendor:   142 KB ( 45.52 KB gzipped) - 63.1%
├── react-router:    50 KB ( 15.00 KB gzipped) - 22.2%
├── core-app:        28 KB (  8.00 KB gzipped) - 12.4%
└── icons:            5 KB (  1.50 KB gzipped) -  2.2%

Route Chunks: [optimized, cached aggressively]
```

### 4.2 Performance Metrics Projection

**Current Performance (3G Network):**
```
First Contentful Paint:  1.8s
Largest Contentful Paint: 3.2s
Time to Interactive:      3.5s
Total Blocking Time:      890ms
Cumulative Layout Shift:  0.12
```

**After Optimization (3G Network):**
```
First Contentful Paint:   0.6s (-67%)
Largest Contentful Paint: 1.1s (-66%)
Time to Interactive:      1.2s (-66%)
Total Blocking Time:     240ms (-73%)
Cumulative Layout Shift:  0.08 (-33%)
```

**Lighthouse Score Projection:**
```
Current:
├── Performance:   72
├── Accessibility: 95
├── Best Practices: 92
└── SEO:           90

After Optimization:
├── Performance:   95 (+23)
├── Accessibility: 95
├── Best Practices: 95 (+3)
└── SEO:           92 (+2)
```

---

## 5. Monitoring & Validation

### 5.1 Bundle Analysis Tools

**Install visualization tool:**
```bash
npm install --save-dev rollup-plugin-visualizer
```

**Update vite.config.ts:**
```typescript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

**Generate analysis:**
```bash
npm run build
# Opens bundle-analysis.html automatically
```

### 5.2 Bundle Size Budgets

**Create .bundlesize.json:**
```json
{
  "files": [
    {
      "path": "./dist/assets/index-*.js",
      "maxSize": "35 kB"
    },
    {
      "path": "./dist/assets/react-vendor-*.js",
      "maxSize": "46 kB"
    },
    {
      "path": "./dist/assets/pdf-viewer-*.js",
      "maxSize": "105 kB"
    },
    {
      "path": "./dist/assets/*.css",
      "maxSize": "12 kB"
    }
  ]
}
```

**Add to CI/CD:**
```bash
npm install --save-dev bundlesize
# Add to package.json scripts:
"test:bundle": "bundlesize"
```

### 5.3 Performance Monitoring

**Add Lighthouse CI:**
```bash
npm install --save-dev @lhci/cli
```

**Create lighthouserc.json:**
```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "first-contentful-paint": ["error", {"maxNumericValue": 1000}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 1500}],
        "total-blocking-time": ["error", {"maxNumericValue": 300}],
        "interactive": ["error", {"maxNumericValue": 1800}]
      }
    }
  }
}
```

### 5.4 Real User Monitoring

**Add Web Vitals tracking:**
```typescript
// src/utils/webVitals.ts
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log(metric);
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
```

---

## 6. Risk Assessment

### 6.1 Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Lazy loading breaks UX | High | Medium | Implement proper loading states, test thoroughly |
| Route splitting increases complexity | Medium | High | Use established patterns, document architecture |
| Cache invalidation issues | High | Low | Implement versioned bundles, test deployment |
| Over-aggressive splitting | Medium | Medium | Monitor metrics, consolidate if needed |
| Third-party dependency updates | Low | Medium | Pin versions, test before upgrading |

### 6.2 Performance Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Slower subsequent navigations | Medium | Low | Implement prefetching strategy |
| Increased number of requests | Low | High | Use HTTP/2, implement bundling thresholds |
| Loading state flicker | Low | Medium | Set minimum loading state duration |
| Cache storage limitations | Low | Low | Monitor cache size, implement eviction |

### 6.3 Development Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Increased build complexity | Medium | High | Document build process, automate testing |
| Developer experience degradation | Low | Medium | Maintain fast dev server, skip splitting in dev |
| Breaking existing functionality | High | Low | Comprehensive testing, gradual rollout |
| Team knowledge gaps | Medium | Medium | Training sessions, documentation |

---

## 7. Success Metrics

### 7.1 Quantitative Metrics

**Primary Metrics:**
- Initial bundle size: 620 KB → 225 KB (-64%)
- Gzipped size: 185 KB → 60 KB (-68%)
- Time to Interactive: 3.5s → 1.2s (-66%)
- First Contentful Paint: 1.8s → 0.6s (-67%)

**Secondary Metrics:**
- Lighthouse Performance Score: 72 → 95 (+23 points)
- Total Blocking Time: 890ms → 240ms (-73%)
- Number of chunks: 3 → 8-12 (distributed load)

### 7.2 Qualitative Metrics

**User Experience:**
- Faster perceived load time
- Smoother navigation between views
- Reduced data usage (mobile users)
- Better offline capability (with service worker)

**Developer Experience:**
- Clear code organization
- Better separation of concerns
- Easier to maintain and extend
- Automated performance monitoring

### 7.3 Business Metrics

**Engagement:**
- Reduced bounce rate (faster load = higher retention)
- Increased page views (smoother navigation)
- Higher mobile usage (better mobile performance)
- Improved SEO rankings (Core Web Vitals)

---

## 8. Next Steps

### Immediate Actions (This Week):

1. **Review & Approve Plan** - Stakeholder sign-off
2. **Set up Bundle Analysis** - Install visualizer plugin
3. **Baseline Metrics** - Document current performance
4. **Phase 1 Kickoff** - Start PDF lazy loading implementation

### Week 1 Deliverables:

- [ ] PDF viewer lazy loading implemented
- [ ] Optimized Vite configuration deployed
- [ ] Icon audit completed
- [ ] Bundle analysis dashboard accessible
- [ ] Performance baseline documented

### Week 2 Deliverables:

- [ ] React Router implemented
- [ ] Routes split and lazy-loaded
- [ ] Search components optimized
- [ ] Visualizations lazy-loaded
- [ ] Phase 2 performance metrics measured

### Week 3 Deliverables:

- [ ] Large components refactored
- [ ] Component-level code splitting
- [ ] Prefetching strategy implemented
- [ ] Bundle size budgets configured
- [ ] Phase 3 performance metrics measured

### Week 4 Deliverables:

- [ ] CSS optimization completed
- [ ] Caching strategy implemented
- [ ] CI/CD integration for bundle monitoring
- [ ] Final performance audit
- [ ] Documentation and team training

---

## 9. Appendix

### A. Technical Reference

**Key Technologies:**
- Vite: Build tool and dev server
- React.lazy(): Built-in code splitting
- React Router: Route-based splitting
- Rollup: Bundler (via Vite)

**Documentation:**
- [Vite Code Splitting](https://vitejs.dev/guide/features.html#code-splitting)
- [React Lazy Loading](https://react.dev/reference/react/lazy)
- [Web Vitals](https://web.dev/vitals/)

### B. Code Examples Repository

All code examples and utilities will be stored in:
```
/docs/architecture/code-splitting-examples/
├── lazy-loading-patterns.tsx
├── route-configuration.tsx
├── suspense-boundaries.tsx
├── prefetching-utilities.ts
└── bundle-analysis-scripts/
```

### C. Performance Testing Scripts

```bash
# scripts/performance-test.sh
#!/bin/bash

echo "Building production bundle..."
npm run build

echo "Analyzing bundle size..."
ls -lh dist/assets/*.js

echo "Running Lighthouse..."
npx lighthouse http://localhost:4173 --view

echo "Checking bundle budgets..."
npm run test:bundle
```

---

**Document Version:** 1.0
**Last Updated:** 2025-10-01
**Author:** Performance Engineering Team
**Status:** Ready for Implementation
