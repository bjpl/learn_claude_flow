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
 * Load markdown files using Vite's import.meta.glob
 * This loads the actual content at build time
 */
const markdownModules: Record<string, () => Promise<string>> = {};

/**
 * Loads a single document's content
 */
export async function loadDocumentContent(filePath: string): Promise<string> {
  // Convert the filePath to absolute path
  const absolutePath = filePath.startsWith('/')
    ? filePath
    : `/mnt/c/Users/brand/Development/Project_Workspace${filePath}`;

  const loader = markdownModules[absolutePath];

  if (loader) {
    try {
      const content = await loader();
      return content;
    } catch (error) {
      console.error(`Error loading markdown file ${filePath}:`, error);
    }
  }

  // Fallback: return a message indicating the file couldn't be loaded
  return `# Document Not Found

The requested document could not be loaded.

**Path:** \`${filePath}\`

Please ensure the file exists in the .claude directory.
`;
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
