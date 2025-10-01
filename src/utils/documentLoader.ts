/**
 * Document Loader
 * Loads and processes documentation files using Vite's import.meta.glob
 */

import type { Document } from '../types';
import { CLAUDE_DOCUMENTS } from '../data/documents';

/**
 * Load all documents from the auto-generated manifest
 * This uses build-time extraction from the .claude directory
 */
export async function loadDocumentsFromDirectory(_basePath: string): Promise<Document[]> {
  console.log('[LOADER] Loading CLAUDE_DOCUMENTS...');

  try {
    if (!CLAUDE_DOCUMENTS || !Array.isArray(CLAUDE_DOCUMENTS)) {
      console.error('[LOADER] CLAUDE_DOCUMENTS is invalid:', CLAUDE_DOCUMENTS);
      throw new Error('CLAUDE_DOCUMENTS is not properly initialized');
    }

    console.log('[LOADER] Successfully loaded', CLAUDE_DOCUMENTS.length, 'documents');
    return CLAUDE_DOCUMENTS;
  } catch (error) {
    console.error('[LOADER] Error loading documents:', error);
    throw error;
  }
}

/**
 * Loads a single document's content by fetching from the public directory
 */
export async function loadDocumentContent(filePath: string): Promise<string> {
  try {
    console.log('[LOADER] Loading document content from:', filePath);

    // Build the URL for the public file
    // filePath is already in format: /.claude/agents/...
    // Use the base path from vite config
    const basePath = '/learn_claude_flow/';
    const url = basePath + filePath.substring(1); // Remove leading /

    console.log('[LOADER] Fetching from URL:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();
    console.log('[LOADER] Successfully loaded document, length:', content.length);

    return content;
  } catch (error) {
    console.error(`[LOADER] Error loading markdown file ${filePath}:`, error);

    return `# Document Not Found

The requested document could not be loaded.

**Path:** \`${filePath}\`
**Error:** ${error instanceof Error ? error.message : 'Unknown error'}

Please ensure the file exists in the .claude directory and is accessible from the public folder.
`;
  }
}

/**
 * Searches documents by query
 */
export interface SearchOptions {
  query: string;
  categories?: string[];
  tags?: string[];
  limit?: number;
}

export async function searchDocuments(
  documents: Document[],
  options: SearchOptions
): Promise<Document[]> {
  const { query, categories, tags, limit = 50 } = options;

  let results = documents;

  // Filter by query
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(doc =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.description?.toLowerCase().includes(lowerQuery) ||
      doc.category?.toLowerCase().includes(lowerQuery) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Filter by categories
  if (categories && categories.length > 0) {
    results = results.filter(doc =>
      categories.some(cat => doc.category?.includes(cat))
    );
  }

  // Filter by tags
  if (tags && tags.length > 0) {
    results = results.filter(doc =>
      tags.some(tag => doc.tags?.includes(tag))
    );
  }

  return results.slice(0, limit);
}

/**
 * Groups documents by category
 */
export function groupDocumentsByCategory(documents: Document[]): Map<string, Document[]> {
  const groups = new Map<string, Document[]>();

  documents.forEach(doc => {
    const category = doc.category || 'Uncategorized';
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)?.push(doc);
  });

  return groups;
}

/**
 * Gets unique categories from documents
 */
export function getUniqueCategories(documents: Document[]): string[] {
  const categories = new Set<string>();
  documents.forEach(doc => {
    if (doc.category) {
      categories.add(doc.category);
    }
  });
  return Array.from(categories).sort();
}

/**
 * Gets unique tags from documents
 */
export function getUniqueTags(documents: Document[]): string[] {
  const tags = new Set<string>();
  documents.forEach(doc => {
    doc.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}
