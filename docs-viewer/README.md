# 📚 Documentation Viewer

A beautiful, clean React app for viewing and navigating your PDF documentation files.

## Features

✨ **Beautiful Interface** - Modern, clean design with gradient header
🔍 **Quick Search** - Filter documents by name or number
📄 **PDF Viewing** - Full PDF support with page navigation
🔎 **Zoom Controls** - Zoom in/out for better readability
📱 **Responsive** - Works on desktop and mobile
⌨️ **Keyboard Shortcuts** - Navigate efficiently

## Setup

### 1. Install Dependencies

```bash
cd docs-viewer
npm install
```

### 2. Copy PDF Files

Copy your PDF files to the `public/docs` directory:

```bash
mkdir -p public/docs
cp "C:\Users\brand\Downloads\ilovepdf_split\*.pdf" public/docs/
```

Or manually copy the 24 PDF files (`documentation-1.pdf` through `documentation-24.pdf`) to `docs-viewer/public/docs/`.

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3001`

## Usage

### Navigation
- Click any document in the sidebar to view it
- Use **Previous** and **Next** buttons to navigate pages
- Use **zoom controls** (🔍− and 🔍+) to adjust size

### Search
- Type in the search box to filter documents
- Search by document name or number

### Keyboard Shortcuts
- `Arrow Left` / `Arrow Right` - Navigate pages
- `+` / `-` - Zoom in/out
- `Esc` - Clear selection

## Project Structure

```
docs-viewer/
├── public/
│   └── docs/              # Place PDF files here
├── src/
│   ├── App.tsx            # Main application
│   ├── App.css            # Styling
│   └── main.tsx           # Entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **react-pdf** - PDF viewing
- **CSS3** - Modern styling

## Customization

### Change Color Theme

Edit `src/App.css` and modify the gradient:

```css
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Modify Document List

Edit `src/App.tsx` to change how documents are loaded:

```typescript
const docs: DocFile[] = useMemo(() => {
  // Customize this array
}, []);
```

## Troubleshooting

**PDFs not loading?**
- Ensure PDFs are in `public/docs/` directory
- Check browser console for errors
- Verify PDF filenames match the pattern

**Blank page?**
- Open browser console (F12)
- Check for errors
- Ensure dependencies installed correctly

## Support

For issues or questions, check:
- React PDF: https://github.com/wojtekmaj/react-pdf
- Vite: https://vitejs.dev
