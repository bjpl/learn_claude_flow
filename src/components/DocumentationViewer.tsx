import React, { useState, useEffect, useCallback } from 'react';
import { DocumentationList } from './DocumentationList';
import { DocumentationItem } from './DocumentationItem';
import { SearchBar } from './SearchBar';
import { BookmarkPanel } from './BookmarkPanel';
import './DocumentationViewer.css';

export interface DocumentationFile {
  id: string;
  path: string;
  name: string;
  content: string;
  category?: string;
  lastModified?: Date;
}

interface DocumentationViewerProps {
  files?: DocumentationFile[];
  onFileSelect?: (file: DocumentationFile) => void;
  className?: string;
}

export const DocumentationViewer: React.FC<DocumentationViewerProps> = ({
  files = [],
  onFileSelect,
  className = '',
}) => {
  const [selectedFile, setSelectedFile] = useState<DocumentationFile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<DocumentationFile[]>(files);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update filtered files when search query or files change
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFiles(files);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = files.filter(
      (file) =>
        file.name.toLowerCase().includes(query) ||
        file.content.toLowerCase().includes(query) ||
        file.category?.toLowerCase().includes(query)
    );
    setFilteredFiles(filtered);
  }, [searchQuery, files]);

  // Handle file selection
  const handleFileSelect = useCallback(
    (file: DocumentationFile) => {
      setIsLoading(true);
      setError(null);

      try {
        setSelectedFile(file);
        onFileSelect?.(file);
      } catch (err) {
        setError('Failed to load documentation file');
        console.error('Error loading file:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [onFileSelect]
  );

  // Handle bookmark toggle
  const handleBookmarkToggle = useCallback((fileId: string) => {
    setBookmarks((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(fileId)) {
        newBookmarks.delete(fileId);
      } else {
        newBookmarks.add(fileId);
      }
      // Persist to localStorage
      localStorage.setItem('documentation-bookmarks', JSON.stringify([...newBookmarks]));
      return newBookmarks;
    });
  }, []);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('documentation-bookmarks');
      if (saved) {
        setBookmarks(new Set(JSON.parse(saved)));
      }
    } catch (err) {
      console.error('Failed to load bookmarks:', err);
    }
  }, []);

  // Get bookmarked files
  const bookmarkedFiles = files.filter((file) => bookmarks.has(file.id));

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle clear search
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return (
    <div className={`documentation-viewer ${className}`}>
      <div className="documentation-viewer__header">
        <h1 className="documentation-viewer__title">Documentation</h1>
        <button
          className="documentation-viewer__bookmark-toggle"
          onClick={() => setShowBookmarks(!showBookmarks)}
          aria-label="Toggle bookmarks"
        >
          {showBookmarks ? 'Hide' : 'Show'} Bookmarks ({bookmarks.size})
        </button>
      </div>

      <div className="documentation-viewer__search">
        <SearchBar
          onSearch={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search documentation..."
          initialValue={searchQuery}
        />
      </div>

      {error && (
        <div className="documentation-viewer__error" role="alert">
          {error}
        </div>
      )}

      <div className="documentation-viewer__content">
        <aside className="documentation-viewer__sidebar">
          {showBookmarks ? (
            <BookmarkPanel
              files={bookmarkedFiles}
              onFileSelect={handleFileSelect}
              onBookmarkToggle={handleBookmarkToggle}
              selectedFileId={selectedFile?.id}
            />
          ) : (
            <DocumentationList
              files={filteredFiles}
              onFileSelect={handleFileSelect}
              selectedFileId={selectedFile?.id}
              bookmarks={bookmarks}
              onBookmarkToggle={handleBookmarkToggle}
            />
          )}
        </aside>

        <main className="documentation-viewer__main">
          {isLoading ? (
            <div className="documentation-viewer__loading">
              <div className="spinner" aria-label="Loading..." />
              <p>Loading documentation...</p>
            </div>
          ) : selectedFile ? (
            <DocumentationItem
              file={selectedFile}
              isBookmarked={bookmarks.has(selectedFile.id)}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ) : (
            <div className="documentation-viewer__placeholder">
              <p>Select a documentation file to view</p>
              {files.length === 0 && <p className="text-muted">No documentation files available</p>}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
