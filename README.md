# Learn Claude Flow - Documentation Viewer

An interactive React-based learning tool for Claude Flow documentation with integrated PDF viewer, advanced search capabilities, and bookmark features.

## Features

- **PDF Viewing**: High-performance PDF rendering with react-pdf
- **Advanced Search**: Fuzzy search across all documents using Fuse.js
- **Bookmarks**: Save and organize important sections
- **Reading Progress**: Track your progress across documents
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Keyboard Navigation**: Full keyboard support for accessibility

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **react-pdf** - PDF rendering
- **Fuse.js** - Fuzzy search
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Extract PDF content (optional - creates search index)
npm run prepare-docs

# Start development server
npm run dev
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
learn-claude-flow/
├── src/
│   ├── components/       # React components
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ...
│   ├── store/           # Zustand state management
│   │   └── useAppStore.ts
│   ├── utils/           # Utility functions
│   │   ├── pdfExtractor.ts
│   │   └── searchEngine.ts
│   ├── types/           # TypeScript definitions
│   │   └── index.ts
│   ├── hooks/           # Custom React hooks
│   ├── assets/          # Static assets
│   ├── App.tsx          # Main application
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/
│   ├── pdfs/           # PDF documents
│   └── data/           # Extracted PDF content
├── tests/              # Test files
├── scripts/            # Build scripts
├── docs/               # Documentation
└── config files
```

## Usage

### Adding Documents

1. Place PDF files in `public/pdfs/`
2. Run `npm run extract-pdf` to create search index
3. Update document metadata in your application

### Using the Store

```typescript
import { useAppStore } from '@/store/useAppStore';

function MyComponent() {
  const { currentDocument, setCurrentDocument } = useAppStore();

  // Access state and actions
  return <div>{currentDocument?.title}</div>;
}
```

### Search

The search engine uses Fuse.js for fuzzy matching:

```typescript
import { searchDocuments } from '@/utils/searchEngine';

const results = await searchDocuments('query');
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run extract-pdf` - Extract PDF content

### Code Style

- TypeScript for all new files
- Functional components with hooks
- ESLint configuration enforced
- Tailwind CSS for styling

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local`:

```env
VITE_API_URL=http://localhost:3000
VITE_ENABLE_ANALYTICS=false
```

### Tailwind Configuration

Customize theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* custom colors */ }
    }
  }
}
```

## Performance

### Optimizations

- Code splitting for vendor libraries
- Lazy loading for routes
- PDF worker in Web Worker
- State persistence with Zustand
- Optimized bundle size

### Metrics

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle Size: < 500KB (gzipped)

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## Contributing

See [docs/README.md](./docs/README.md) for detailed integration documentation.

## Integration Points

### For Other Agents

- **UI Developer**: Implement components in `src/components/`
- **Search Developer**: Enhance search in `src/utils/searchEngine.ts`
- **PDF Developer**: Complete extraction in `scripts/extractPdfContent.js`
- **Tester**: Add tests in `tests/`

### Coordination

Use Claude Flow hooks for coordination:

```bash
# Before work
npx claude-flow@alpha hooks pre-task --description "task"

# During work
npx claude-flow@alpha hooks post-edit --file "file.ts"

# After work
npx claude-flow@alpha hooks post-task --task-id "task-id"
```

## Troubleshooting

### PDF Worker Issues

Ensure worker is configured in `main.tsx`:

```typescript
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = '...';
```

### Search Not Working

1. Run `npm run extract-pdf`
2. Check `public/data/pdf-content/` for JSON files

### Build Errors

1. Clear cache: `rm -rf node_modules dist`
2. Reinstall: `npm install`
3. Check TypeScript: `npm run typecheck`

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [react-pdf Documentation](https://github.com/wojtekmaj/react-pdf)
- [Fuse.js Documentation](https://fusejs.io)

## License

MIT
