import React, { useMemo } from 'react';
import type { DocumentationFile } from './DocumentationViewer';
import './DocumentationList.css';

interface DocumentationListProps {
  files: DocumentationFile[];
  onFileSelect: (file: DocumentationFile) => void;
  selectedFileId?: string;
  bookmarks?: Set<string>;
  onBookmarkToggle?: (fileId: string) => void;
}

export const DocumentationList: React.FC<DocumentationListProps> = ({
  files,
  onFileSelect,
  selectedFileId,
  bookmarks = new Set(),
  onBookmarkToggle,
}) => {
  // Group files by category
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

  const handleBookmarkClick = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    onBookmarkToggle?.(fileId);
  };

  if (files.length === 0) {
    return (
      <div className="documentation-list documentation-list--empty">
        <p>No documentation files found</p>
      </div>
    );
  }

  return (
    <nav className="documentation-list" aria-label="Documentation navigation">
      {categories.map((category) => (
        <div key={category} className="documentation-list__category">
          <h3 className="documentation-list__category-title">{category}</h3>
          <ul className="documentation-list__items" role="list">
            {groupedFiles[category].map((file) => {
              const isSelected = file.id === selectedFileId;
              const isBookmarked = bookmarks.has(file.id);

              return (
                <li
                  key={file.id}
                  className={`documentation-list__item ${
                    isSelected ? 'documentation-list__item--selected' : ''
                  }`}
                >
                  <button
                    className="documentation-list__button"
                    onClick={() => onFileSelect(file)}
                    onKeyDown={(e) => handleKeyDown(e, file)}
                    aria-current={isSelected ? 'page' : undefined}
                    type="button"
                  >
                    <span className="documentation-list__item-name">{file.name}</span>
                    {file.lastModified && (
                      <span className="documentation-list__item-date">
                        {new Date(file.lastModified).toLocaleDateString()}
                      </span>
                    )}
                  </button>
                  {onBookmarkToggle && (
                    <button
                      className={`documentation-list__bookmark ${
                        isBookmarked ? 'documentation-list__bookmark--active' : ''
                      }`}
                      onClick={(e) => handleBookmarkClick(e, file.id)}
                      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                      type="button"
                    >
                      <span className="documentation-list__bookmark-icon">
                        {isBookmarked ? '★' : '☆'}
                      </span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
};
