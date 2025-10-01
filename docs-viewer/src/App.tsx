import { useState, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './App.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface DocFile {
  name: string;
  path: string;
  num: number;
}

function App() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [scale, setScale] = useState(1.0);

  // Generate list of documentation PDFs
  const docs: DocFile[] = useMemo(() => {
    const files: DocFile[] = [];
    for (let i = 1; i <= 24; i++) {
      files.push({
        name: `Documentation ${i}`,
        path: `/docs/documentation-${i}.pdf`,
        num: i
      });
    }
    return files;
  }, []);

  // Filter docs based on search
  const filteredDocs = useMemo(() => {
    if (!searchQuery) return docs;
    return docs.filter(doc =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.num.toString().includes(searchQuery)
    );
  }, [docs, searchQuery]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const handleDocSelect = (path: string) => {
    setSelectedDoc(path);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(numPages, prev + 1));
  const zoomIn = () => setScale(prev => Math.min(2.0, prev + 0.1));
  const zoomOut = () => setScale(prev => Math.max(0.5, prev - 0.1));

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Documentation Viewer</h1>
        <p>Quick access to your reference documentation</p>
      </header>

      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="doc-list">
            <h3>Documents ({filteredDocs.length})</h3>
            {filteredDocs.map((doc) => (
              <button
                key={doc.path}
                className={`doc-item ${selectedDoc === doc.path ? 'active' : ''}`}
                onClick={() => handleDocSelect(doc.path)}
              >
                <span className="doc-icon">📄</span>
                <span className="doc-name">{doc.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {!selectedDoc ? (
            <div className="empty-state">
              <div className="empty-icon">📖</div>
              <h2>Select a document to view</h2>
              <p>Choose any document from the sidebar to get started</p>
            </div>
          ) : (
            <>
              {/* Toolbar */}
              <div className="toolbar">
                <div className="toolbar-group">
                  <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
                    ← Previous
                  </button>
                  <span className="page-info">
                    Page {pageNumber} of {numPages}
                  </span>
                  <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                    Next →
                  </button>
                </div>

                <div className="toolbar-group">
                  <button onClick={zoomOut} disabled={scale <= 0.5}>
                    🔍−
                  </button>
                  <span className="zoom-info">{Math.round(scale * 100)}%</span>
                  <button onClick={zoomIn} disabled={scale >= 2.0}>
                    🔍+
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="pdf-container">
                <Document
                  file={selectedDoc}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={(error) => console.error('Error loading PDF:', error)}
                  loading={<div className="loading">Loading PDF...</div>}
                  error={<div className="error">Failed to load PDF. Make sure the file exists.</div>}
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </Document>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
