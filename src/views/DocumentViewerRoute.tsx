/**
 * DocumentViewerRoute Component
 * Route component for viewing documents with URL-based state
 */

import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DocumentViewer } from '../components/DocumentViewer';
import { SearchableNavigation } from '../components/SearchableNavigation';
import { DocumentSEO } from '../components/seo';
import type { Document, NavigationItem } from '../types';

// Mock data - replace with actual data loading
const SAMPLE_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Getting Started Guide',
    url: '/docs/getting-started.pdf',
    type: 'pdf',
    category: 'Documentation',
    tags: ['beginner', 'tutorial'],
  },
];

const SAMPLE_NAVIGATION: NavigationItem[] = [
  {
    id: 'nav-1',
    label: 'Introduction',
    documentId: '1',
    icon: '📖',
  },
];

export default function DocumentViewerRoute() {
  const { documentId, pageNumber } = useParams<{
    documentId: string;
    pageNumber?: string;
  }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Initialize from URL
  const currentPage = pageNumber ? parseInt(pageNumber, 10) : 1;
  const zoom = searchParams.get('zoom')
    ? parseFloat(searchParams.get('zoom')!)
    : 1.0;

  const [documents] = useState<Document[]>(SAMPLE_DOCUMENTS);
  const [navigationItems] = useState<NavigationItem[]>(SAMPLE_NAVIGATION);
  const currentDocument = documents.find(d => d.id === documentId) || null;

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
    setSearchParams(params, { replace: true });
  };

  const handleDocumentSelect = (doc: Document) => {
    navigate(`/doc/${doc.id}`);
  };

  const handleNavigationSelect = (item: NavigationItem) => {
    if (item.documentId) {
      navigate(`/doc/${item.documentId}${item.pageNumber ? `/page/${item.pageNumber}` : ''}`);
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      {currentDocument && (
        <DocumentSEO
          documentTitle={currentDocument.title}
          documentDescription={currentDocument.description || `View ${currentDocument.title} in the Claude Flow documentation`}
          category={currentDocument.category}
          tags={currentDocument.tags}
          pageNumber={currentPage > 1 ? currentPage : undefined}
          documentId={currentDocument.id}
        />
      )}

      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-80 flex-shrink-0 border-r border-gray-200">
          <SearchableNavigation
            documents={documents}
            navigationItems={navigationItems}
            currentDocument={currentDocument}
            onDocumentSelect={handleDocumentSelect}
            onNavigationSelect={handleNavigationSelect}
          />
        </div>

        {/* Document Viewer */}
        <div className="flex-1 min-w-0">
          {currentDocument ? (
            <DocumentViewer
              document={currentDocument}
              initialPage={currentPage}
              initialZoom={zoom}
              onPageChange={handlePageChange}
              onZoomChange={handleZoomChange}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Not Found</h2>
                <p className="text-gray-600 mb-4">The requested document could not be found.</p>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Go Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
