import React, { useMemo } from 'react';
import type { DocumentationFile } from './DocumentationViewer';
import './BookmarkPanel.css';

interface BookmarkPanelProps {
  files: DocumentationFile[];
  onFileSelect: (file: DocumentationFile) => void;
  onBookmarkToggle: (fileId: string) => void;
  selectedFileId?: string;
  className?: string;
}

export const BookmarkPanel: React.FC<BookmarkPanelProps> = ({
  files,
  onFileSelect,
  onBookmarkToggle,
  selectedFileId,
  className = '',
}) => {
  // Group bookmarked files by category
  const groupedFiles = useMemo(() => {
    const groups: Record<string, DocumentationFile[]> = {};

    files.forEach((file) => {
      const category = file.category || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(file);
    });

    // Sort files within each category by name
    Object.keys(groups).forEach((category) => {
      groups[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    return groups;
  }, [files]);

  const categories = Object.keys(groupedFiles).sort();

  const handleKeyDown = (e: React.KeyboardEvent, file: DocumentationFile) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onFileSelect(file);
    }
  };

  const handleRemoveBookmark = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    onBookmarkToggle(fileId);
  };

  const handleClearAll = () => {
    if (window.confirm('Remove all bookmarks?')) {
      files.forEach((file) => onBookmarkToggle(file.id));
    }
  };

  if (files.length === 0) {
    return (
      <div className={`bookmark-panel bookmark-panel--empty ${className}`}>
        <div className="bookmark-panel__empty-state">
          <span className="bookmark-panel__empty-icon" aria-hidden="true">
            ☆
          </span>
          <h3 className="bookmark-panel__empty-title">No Bookmarks Yet</h3>
          <p className="bookmark-panel__empty-text">
            Bookmark important documentation files for quick access
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bookmark-panel ${className}`}>
      <div className="bookmark-panel__header">
        <h2 className="bookmark-panel__title">
          <span className="bookmark-panel__title-icon" aria-hidden="true">
            ★
          </span>
          Bookmarks ({files.length})
        </h2>
        {files.length > 0 && (
          <button
            className="bookmark-panel__clear"
            onClick={handleClearAll}
            type="button"
            aria-label="Clear all bookmarks"
          >
            Clear All
          </button>
        )}
      </div>

      <nav className="bookmark-panel__content" aria-label="Bookmarked documentation">
        {categories.map((category) => (
          <div key={category} className="bookmark-panel__category">
            <h3 className="bookmark-panel__category-title">{category}</h3>
            <ul className="bookmark-panel__items" role="list">
              {groupedFiles[category].map((file) => {
                const isSelected = file.id === selectedFileId;

                return (
                  <li
                    key={file.id}
                    className={`bookmark-panel__item ${
                      isSelected ? 'bookmark-panel__item--selected' : ''
                    }`}
                  >
                    <button
                      className="bookmark-panel__button"
                      onClick={() => onFileSelect(file)}
                      onKeyDown={(e) => handleKeyDown(e, file)}
                      aria-current={isSelected ? 'page' : undefined}
                      type="button"
                    >
                      <span className="bookmark-panel__item-icon" aria-hidden="true">
                        ★
                      </span>
                      <div className="bookmark-panel__item-content">
                        <span className="bookmark-panel__item-name">{file.name}</span>
                        {file.lastModified && (
                          <span className="bookmark-panel__item-date">
                            {new Date(file.lastModified).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </button>
                    <button
                      className="bookmark-panel__remove"
                      onClick={(e) => handleRemoveBookmark(e, file.id)}
                      aria-label="Remove bookmark"
                      type="button"
                    >
                      ×
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};
