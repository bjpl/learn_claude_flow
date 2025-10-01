import React, { useEffect, useRef, useState } from 'react';
import type { DocumentationFile } from './DocumentationViewer';
import './DocumentationItem.css';

interface DocumentationItemProps {
  file: DocumentationFile;
  isBookmarked: boolean;
  onBookmarkToggle: (fileId: string) => void;
}

export const DocumentationItem: React.FC<DocumentationItemProps> = ({
  file,
  isBookmarked,
  onBookmarkToggle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Scroll to top when file changes
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [file.id]);

  // Handle copy to clipboard
  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(file.content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Parse markdown-style headers for table of contents
  const headers = file.content
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s*/, '').trim();
      return { level, text, id: text.toLowerCase().replace(/\s+/g, '-') };
    });

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = contentRef.current?.querySelector(`[data-section-id="${id}"]`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Process content to add section IDs
  const processedContent = file.content
    .split('\n')
    .map((line, index) => {
      if (line.startsWith('#')) {
        const text = line.replace(/^#+\s*/, '').trim();
        const id = text.toLowerCase().replace(/\s+/g, '-');
        return `<div data-section-id="${id}" key="${index}">${line}</div>`;
      }
      return line;
    })
    .join('\n');

  return (
    <article className="documentation-item">
      <header className="documentation-item__header">
        <div className="documentation-item__header-content">
          <h2 className="documentation-item__title">{file.name}</h2>
          {file.category && (
            <span className="documentation-item__category">{file.category}</span>
          )}
          {file.lastModified && (
            <time
              className="documentation-item__date"
              dateTime={new Date(file.lastModified).toISOString()}
            >
              Last updated: {new Date(file.lastModified).toLocaleDateString()}
            </time>
          )}
        </div>
        <div className="documentation-item__actions">
          <button
            className={`documentation-item__bookmark ${
              isBookmarked ? 'documentation-item__bookmark--active' : ''
            }`}
            onClick={() => onBookmarkToggle(file.id)}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            type="button"
          >
            <span className="documentation-item__bookmark-icon">
              {isBookmarked ? '★' : '☆'}
            </span>
            <span className="documentation-item__bookmark-text">
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </span>
          </button>
          <button
            className="documentation-item__copy"
            onClick={handleCopyContent}
            aria-label="Copy content to clipboard"
            type="button"
          >
            {copySuccess ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>
      </header>

      {headers.length > 0 && (
        <nav className="documentation-item__toc" aria-label="Table of contents">
          <h3 className="documentation-item__toc-title">Contents</h3>
          <ul className="documentation-item__toc-list">
            {headers.map((header) => (
              <li
                key={header.id}
                className={`documentation-item__toc-item documentation-item__toc-item--level-${header.level}`}
              >
                <button
                  className="documentation-item__toc-link"
                  onClick={() => scrollToSection(header.id)}
                  type="button"
                >
                  {header.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div
        ref={contentRef}
        className="documentation-item__content"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </article>
  );
};
