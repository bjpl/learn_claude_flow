/**
 * Advanced search engine using Fuse.js
 */

import Fuse from 'fuse.js';
import type { PdfPage, SearchResult } from '../types';
import { useAppStore } from '../store/useAppStore';

let fuseInstance: Fuse<PdfPage> | null = null;

/**
 * Initialize search engine with PDF content
 */
export function initializeSearch(pages: PdfPage[]): void {
  const options = {
    keys: ['content'],
    includeScore: true,
    includeMatches: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    minMatchCharLength: 3,
    ignoreLocation: false,
  };

  fuseInstance = new Fuse(pages, options);
}

/**
 * Perform search across all documents
 */
export async function searchDocuments(
  query: string
): Promise<SearchResult[]> {
  if (!fuseInstance || !query.trim()) {
    return [];
  }

  const results = fuseInstance.search(query, { limit: 50 });
  const { documents } = useAppStore.getState();

  const searchResults: SearchResult[] = [];

  results.forEach((result) => {
    const page = result.item;
    const document = documents.find((doc) => doc.id === page.documentId);

    if (document) {
      searchResults.push({
        documentId: page.documentId,
        documentTitle: document.title,
        pageNumber: page.pageNumber,
        content: page.content,
        matches: result.matches ? [...result.matches] : [],
        score: result.score || 0,
      });
    }
  });

  return searchResults.sort((a, b) => a.score - b.score);
}

/**
 * Get search suggestions based on partial query
 */
export function getSearchSuggestions(
  query: string,
  limit: number = 5
): string[] {
  if (!fuseInstance || query.length < 2) {
    return [];
  }

  const results = fuseInstance.search(query, { limit });
  const suggestions = new Set<string>();

  results.forEach((result) => {
    const content = result.item.content;
    const words = content.split(/\s+/);

    words.forEach((word) => {
      if (word.toLowerCase().startsWith(query.toLowerCase())) {
        suggestions.add(word);
      }
    });
  });

  return Array.from(suggestions).slice(0, limit);
}

export interface HighlightSegment {
  text: string;
  isMatch: boolean;
  key?: string;
}

/**
 * Highlight search matches in content
 * Returns data structure for components to render, not JSX
 */
export function highlightMatches(
  content: string,
  matches: any[]
): HighlightSegment[] {
  if (!matches.length) {
    return [{ text: content, isMatch: false }];
  }

  const segments: HighlightSegment[] = [];
  let lastIndex = 0;

  matches.forEach((match, idx) => {
    if (match.indices) {
      match.indices.forEach((index: [number, number]) => {
        const [start, end] = index;

        if (start > lastIndex) {
          segments.push({
            text: content.substring(lastIndex, start),
            isMatch: false,
          });
        }

        segments.push({
          text: content.substring(start, end + 1),
          isMatch: true,
          key: `match-${idx}-${start}`,
        });

        lastIndex = end + 1;
      });
    }
  });

  if (lastIndex < content.length) {
    segments.push({
      text: content.substring(lastIndex),
      isMatch: false,
    });
  }

  return segments;
}

/**
 * Export search results to JSON
 */
export function exportSearchResults(results: SearchResult[]): string {
  return JSON.stringify(results, null, 2);
}
