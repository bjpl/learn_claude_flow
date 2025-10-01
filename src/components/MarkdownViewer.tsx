/**
 * MarkdownViewer Component
 * Renders markdown content with syntax highlighting and custom styling
 */

import React, { useMemo, useEffect, useRef } from 'react';
import type { TocItem } from '../utils/documentExtractor';
import { generateTableOfContents } from '../utils/documentExtractor';

interface MarkdownViewerProps {
  content: string;
  onTocGenerated?: (toc: TocItem[]) => void;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  onTocGenerated,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate table of contents
  const toc = useMemo(() => generateTableOfContents(content), [content]);

  useEffect(() => {
    onTocGenerated?.(toc);
  }, [toc, onTocGenerated]);

  // Parse and render markdown
  const renderedContent = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div
      ref={containerRef}
      className="prose prose-slate prose-lg max-w-none p-8 prose-headings:font-bold prose-a:text-blue-600 prose-code:text-red-600 prose-code:bg-gray-100 prose-pre:bg-gray-900 prose-pre:text-gray-100"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
};

/**
 * Simple markdown parser
 * In production, use a library like marked or markdown-it
 */
function parseMarkdown(markdown: string): string {
  let html = markdown;

  // Remove frontmatter
  html = html.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Headers with proper IDs for ToC navigation
  html = html.replace(/^### (.*$)/gim, (_match, text) => {
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h3 id="${id}" class="text-xl font-semibold text-gray-900 mt-6 mb-3">${text}</h3>`;
  });
  html = html.replace(/^## (.*$)/gim, (_match, text) => {
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h2 id="${id}" class="text-2xl font-bold text-gray-900 mt-8 mb-4">${text}</h2>`;
  });
  html = html.replace(/^# (.*$)/gim, (_match, text) => {
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h1 id="${id}" class="text-3xl font-bold text-gray-900 mb-6">${text}</h1>`;
  });

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Code blocks (must be processed before inline code)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, (_unusedMatch, lang, code) => {
    return `<pre class="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm"><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/gim, '<code class="bg-gray-100 text-red-600 px-2 py-0.5 rounded font-mono text-sm">$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/gim, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg" />');

  // Unordered lists
  html = html.replace(/^\* (.+)$/gim, '<li class="ml-4">$1</li>');
  html = html.replace(/(<li class="ml-4">.*<\/li>)/s, '<ul class="list-disc list-outside space-y-2 my-4 ml-6">$1</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gim, '<li class="ml-4">$1</li>');
  html = html.replace(/(<li class="ml-4">.*<\/li>)/s, '<ol class="list-decimal list-outside space-y-2 my-4 ml-6">$1</ol>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700">$1</blockquote>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr class="my-8 border-t-2 border-gray-300" />');

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p class="mb-4">');
  html = `<p class="mb-4">${html}</p>`;

  return html;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * TableOfContents Component
 * Displays a clickable table of contents sidebar
 */
interface TableOfContentsProps {
  items: TocItem[];
  onItemClick?: (item: TocItem) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  onItemClick,
}) => {
  if (items.length === 0) {
    return null;
  }

  const getLevelClass = (level: number): string => {
    const levelMap: Record<number, string> = {
      1: 'ml-0 font-medium text-gray-900',
      2: 'ml-4 text-gray-700 text-sm',
      3: 'ml-8 text-gray-600 text-sm',
    };
    return levelMap[level] || levelMap[3];
  };

  return (
    <nav className="bg-gray-50 border-l border-gray-200 p-4 h-full overflow-y-auto scrollbar-thin">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide sticky top-0 bg-gray-50 pb-2 z-10">
        Contents
      </h3>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => onItemClick?.(item)}
              className={`
                text-left w-full px-2 py-1.5 rounded hover:bg-gray-200
                transition-colors duration-150
                ${getLevelClass(item.level)}
              `}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
