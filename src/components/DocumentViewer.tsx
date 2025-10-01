import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { Document as DocumentType, TextHighlight } from '../types';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface DocumentViewerProps {
  document: DocumentType | null;
  currentPage?: number;
  zoom?: number;
  initialPage?: number;
  initialZoom?: number;
  highlights?: TextHighlight[];
  onPageChange: (page: number) => void;
  onZoomChange?: (zoom: number) => void;
  onTextSelect?: (text: string, position: { x: number; y: number }) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  currentPage: currentPageProp,
  zoom: zoomProp,
  initialPage,
  initialZoom,
  highlights: _highlights = [],
  onPageChange,
  onTextSelect,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [internalPage, setInternalPage] = useState<number>(initialPage || currentPageProp || 1);
  const [internalZoom] = useState<number>(initialZoom || zoomProp || 1.0);

  const currentPage = currentPageProp ?? internalPage;
  const zoom = zoomProp ?? internalZoom;

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    setError(error.message);
    setLoading(false);
  }, []);

  const handleTextSelection = useCallback(() => {
    if (!onTextSelect) return;
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      onTextSelect(selection.toString(), { x: rect.left, y: rect.top });
    }
  }, [onTextSelect]);

  const handlePageChangeInternal = useCallback((page: number) => {
    setInternalPage(page);
    onPageChange(page);
  }, [onPageChange]);

  if (!document) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No document selected</h3>
          <p className="mt-1 text-sm text-gray-500">Select a document from the navigation to view</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Viewer Controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChangeInternal(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {numPages}
          </span>
          <button
            onClick={() => handlePageChangeInternal(Math.min(numPages, currentPage + 1))}
            disabled={currentPage >= numPages}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="text-sm font-medium text-gray-900">{document.title}</div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Document Display */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Loading document...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
              <p className="text-sm text-red-800">Error loading document: {error}</p>
            </div>
          )}
          {document.type === 'pdf' && (
            <Document
              file={document.url}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null}
              error={null}
              className="shadow-lg"
            >
              <Page
                pageNumber={currentPage}
                scale={zoom}
                onMouseUp={handleTextSelection}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="border border-gray-300"
              />
            </Document>
          )}
        </div>
      </div>
    </div>
  );
};
