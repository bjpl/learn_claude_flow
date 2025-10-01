# Learn Claude Flow - Integration Documentation

## Project Overview

A React-based learning tool for Claude Flow documentation with integrated PDF viewer, advanced search, and bookmark features.

## Architecture

### Technology Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **PDF Rendering**: react-pdf
- **Search**: Fuse.js
- **Icons**: Lucide React

### Project Structure
```
src/
├── components/         # React components (to be added by other agents)
│   ├── DocumentList.tsx
│   ├── PdfViewer.tsx
│   ├── SearchBar.tsx
│   ├── Sidebar.tsx
│   └── ...
├── store/             # Zustand state management
│   └── useAppStore.ts
├── utils/             # Utility functions
│   ├── pdfExtractor.ts
│   └── searchEngine.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── hooks/             # Custom React hooks (to be added)
├── assets/            # Static assets
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Features Implemented

### 1. State Management (Zustand)
- Centralized app state with persistence
- Document management
- Search state
- Bookmarks and reading progress
- UI preferences (theme, zoom, view mode)

### 2. PDF Processing
- PDF content extraction utilities
- Search indexing
- Text highlighting
- Category filtering

### 3. Search Engine (Fuse.js)
- Fuzzy search across all documents
- Search suggestions
- Match highlighting
- Result ranking

### 4. Error Handling
- ErrorBoundary component for graceful error recovery
- Loading states with progress indicators
- User-friendly error messages

### 5. Performance Optimization
- Code splitting (vendor chunks)
- Lazy loading support
- Optimized build configuration
- Source maps for debugging

## Setup & Installation

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Lint code
npm run lint

# Extract PDF content
npm run extract-pdf
```

## Integration Points

### For UI Developer
- Implement components in `src/components/`:
  - DocumentList.tsx
  - PdfViewer.tsx
  - SearchBar.tsx
  - Sidebar.tsx
  - BookmarkPanel.tsx
- Connect components to Zustand store
- Add responsive layouts

### For Search Developer
- Enhance search engine in `src/utils/searchEngine.ts`
- Add advanced filters
- Implement search analytics

### For PDF Developer
- Complete PDF extraction in `scripts/extractPdfContent.js`
- Implement real pdf-parse integration
- Add page caching

## State Management API

```typescript
// Access store
const { currentDocument, setCurrentDocument } = useAppStore();

// Update document
setCurrentDocument(document);

// Add bookmark
addBookmark({
  documentId: 'doc-1',
  pageNumber: 5,
  title: 'Important section',
  note: 'Remember this'
});

// Update reading progress
updateProgress('doc-1', 10, 50);
```

## Build Configuration

### Vite Config
- React plugin configured
- Path aliases (`@/` -> `src/`)
- PDF worker optimization
- Code splitting for vendors

### TypeScript Config
- Strict mode enabled
- Path mapping configured
- Modern ES2020 target

### Tailwind Config
- Custom color palette
- Extended animations
- Utility classes for PDF viewer

## Deployment

### Production Build
```bash
npm run build
```

Outputs to `dist/` directory with:
- Optimized bundles
- Source maps
- Static assets

### Deployment Options
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting

### Environment Variables
Create `.env` file:
```
VITE_API_URL=your-api-url
VITE_PDF_WORKER_URL=custom-worker-url
```

## Testing Strategy

### Unit Tests (Vitest)
- Component tests
- Utility function tests
- Store tests

### Integration Tests
- PDF loading and rendering
- Search functionality
- Bookmark operations

## Performance Considerations

### Optimizations Implemented
1. **Code Splitting**: Vendor chunks separated
2. **Lazy Loading**: React.lazy for routes
3. **PDF Worker**: Offloaded to Web Worker
4. **State Persistence**: localStorage with Zustand
5. **Memoization**: React.memo for heavy components

### Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle Size: < 500KB (gzipped)

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow ESLint configuration
- Use functional components with hooks
- Implement proper error handling

### Component Guidelines
- Keep components under 300 lines
- Extract complex logic to hooks
- Use TypeScript interfaces
- Add JSDoc comments for complex functions

### State Management
- Use Zustand for global state
- Use local state for UI-only state
- Persist important data
- Clear stale data

## Troubleshooting

### PDF Worker Issues
```typescript
// Ensure worker is configured in main.tsx
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = '...';
```

### Search Not Working
- Run `npm run extract-pdf` to generate content
- Check that JSON files exist in `public/data/pdf-content/`

### Build Errors
- Clear node_modules and reinstall
- Check TypeScript errors: `npm run typecheck`
- Verify all peer dependencies

## Next Steps

1. **UI Developer**: Implement remaining components
2. **Search Developer**: Enhance search with filters
3. **PDF Developer**: Complete extraction script
4. **Tester**: Add comprehensive test coverage
5. **DevOps**: Set up CI/CD pipeline

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [react-pdf Documentation](https://github.com/wojtekmaj/react-pdf)
- [Fuse.js Documentation](https://fusejs.io)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## Support

For issues or questions, please create an issue in the repository.
