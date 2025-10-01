# Documentation Viewer - Usage Guide

## Overview

The Documentation Viewer is a comprehensive React-based system for viewing, searching, and managing technical documentation with native PDF support.

## Features

- **PDF Rendering**: Native PDF viewing with zoom, rotation, and pagination
- **Document Management**: Organize documents by categories and tags
- **Search & Filter**: Real-time search with category filtering
- **Metadata Display**: View detailed document information
- **Keyboard Navigation**: Complete keyboard shortcuts for efficient navigation
- **Responsive Design**: Works on desktop and mobile devices

## Installation

### Prerequisites

- Node.js 18+ or npm 9+
- React 18+

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── documentation/
│       ├── DocumentViewer.tsx      # PDF viewer with controls
│       ├── DocumentList.tsx        # Document list with filtering
│       ├── SearchBar.tsx           # Search and category filter
│       └── DocumentMetadata.tsx    # Document info panel
├── types/
│   └── document.ts                 # TypeScript type definitions
├── App.tsx                         # Main application component
├── App.css                         # Application styles
└── main.tsx                        # Application entry point
```

## Usage Examples

### Basic Setup

```typescript
import { DocumentViewer } from './components/documentation/DocumentViewer';
import type { Document } from './types/document';

const document: Document = {
  id: '1',
  title: 'User Guide',
  filePath: '/docs/user-guide.pdf',
  type: 'pdf',
  category: 'Documentation',
  tags: ['guide', 'tutorial'],
  description: 'Complete user guide',
  pageCount: 25
};

function MyApp() {
  return <DocumentViewer document={document} />;
}
```

### With Document List

```typescript
import { DocumentList } from './components/documentation/DocumentList';

const documents: Document[] = [
  // ... your documents
];

function MyApp() {
  const [selected, setSelected] = useState<Document | null>(null);

  return (
    <>
      <DocumentList
        documents={documents}
        onSelectDocument={setSelected}
        selectedDocumentId={selected?.id}
      />
      {selected && <DocumentViewer document={selected} />}
    </>
  );
}
```

### With Search

```typescript
import { SearchBar } from './components/documentation/SearchBar';

function MyApp() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  return (
    <SearchBar
      onSearch={setQuery}
      onCategoryChange={setCategory}
      categories={['Tutorial', 'Reference', 'Guide']}
    />
  );
}
```

### Complete Integration

See `/mnt/c/Users/brand/Development/Project_Workspace/active-development/learn_claude_flow/src/App.tsx` for a complete working example that integrates all components.

## Component APIs

### DocumentViewer

**Props:**
- `document: Document` - Document to display (required)
- `onClose?: () => void` - Callback when viewer is closed

**Features:**
- Zoom controls (+/-/fit)
- Page navigation (arrows, Page Up/Down)
- Rotation (R key)
- Download functionality
- Keyboard shortcuts

### DocumentList

**Props:**
- `documents: Document[]` - Array of documents (required)
- `onSelectDocument: (doc: Document) => void` - Selection callback (required)
- `selectedDocumentId?: string` - Currently selected document ID
- `searchQuery?: string` - Filter by search query
- `categoryFilter?: string` - Filter by category

**Features:**
- Sort by title, date, or size
- Category filtering
- Search integration
- Selection highlighting

### SearchBar

**Props:**
- `onSearch: (query: string) => void` - Search callback (required)
- `onCategoryChange?: (category: string) => void` - Category filter callback
- `categories?: string[]` - Available categories
- `placeholder?: string` - Input placeholder text

**Features:**
- Real-time search with debouncing (300ms)
- Category filtering
- Clear button
- Keyboard shortcut (Ctrl+K/Cmd+K)

### DocumentMetadata

**Props:**
- `document: Document` - Document to display metadata for (required)
- `metadata?: DocumentMetadata` - Additional PDF metadata

**Features:**
- Basic document info
- File statistics
- PDF metadata
- Tags and keywords display

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` / `Cmd+K` | Focus search bar |
| `→` / `Page Down` | Next page |
| `←` / `Page Up` | Previous page |
| `+` | Zoom in |
| `-` | Zoom out |
| `R` | Rotate document |
| `Esc` | Close viewer |

## Styling

The system uses CSS modules with a clean, modern design. Key CSS files:

- `/src/App.css` - Main application styles
- `/src/index.css` - Global styles and PDF.js overrides

### Customization

Override styles by creating custom CSS classes or using CSS variables:

```css
:root {
  --primary-color: #3498db;
  --background-color: #f5f5f5;
  --text-color: #2c3e50;
}
```

## Data Loading

### From File System

```typescript
const documents = await fetch('/api/documents').then(r => r.json());
```

### From Static Data

```typescript
const documents: Document[] = [
  {
    id: '1',
    title: 'Document 1',
    filePath: '/docs/doc1.pdf',
    type: 'pdf'
  }
];
```

### Dynamic Loading

```typescript
const loadDocument = async (id: string): Promise<Document> => {
  const response = await fetch(`/api/documents/${id}`);
  return response.json();
};
```

## PDF Configuration

The system uses `react-pdf` which requires PDF.js worker configuration:

```typescript
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
```

This is already configured in `DocumentViewer.tsx`.

## Performance Tips

1. **Lazy Loading**: Load documents on-demand
2. **Pagination**: Limit document list results
3. **Caching**: Cache loaded PDFs in memory
4. **Debouncing**: Search is debounced at 300ms
5. **Virtual Scrolling**: Consider for large document lists

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Troubleshooting

### PDF Not Loading

1. Check file path is correct
2. Verify CORS settings for PDF files
3. Ensure PDF.js worker is loaded

### Performance Issues

1. Reduce page quality (scale)
2. Limit number of documents shown
3. Implement virtual scrolling
4. Use production build

### Styling Issues

1. Clear browser cache
2. Check CSS specificity
3. Verify imports are correct

## Advanced Features

### Custom Themes

```typescript
const themes = {
  light: { /* ... */ },
  dark: { /* ... */ }
};

<App theme={themes.dark} />
```

### Custom Document Types

Extend the `Document` interface:

```typescript
interface CustomDocument extends Document {
  customField: string;
}
```

### Integration with Backend

```typescript
const api = {
  getDocuments: () => fetch('/api/documents'),
  getDocument: (id: string) => fetch(`/api/documents/${id}`),
  searchDocuments: (query: string) =>
    fetch(`/api/search?q=${query}`)
};
```

## Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## Contributing

See `/docs/architecture/system-design.md` for architectural decisions and patterns.

## Support

For issues and questions:
- Check existing documentation
- Review example implementations
- Check browser console for errors

## License

MIT License - see LICENSE file for details
