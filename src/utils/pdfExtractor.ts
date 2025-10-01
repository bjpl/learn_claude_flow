/**
 * PDF Content Extraction Utility
 * Converts PDFs to searchable JSON format
 */

import type { PdfDocument, PdfPage } from '../types';

// This will be populated by the build script
export const EXTRACTED_CONTENT: Record<string, PdfPage[]> = {};

/**
 * Load extracted PDF content for a document
 */
export async function loadPdfContent(documentId: string): Promise<PdfPage[]> {
  try {
    // In production, this would load from pre-extracted JSON files
    const response = await fetch(`/data/pdf-content/${documentId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load content for ${documentId}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading PDF content:', error);
    return [];
  }
}

/**
 * Extract text content from a PDF page (client-side fallback)
 */
export async function extractPageText(
  pdf: any,
  pageNumber: number
): Promise<string> {
  try {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    return textContent.items.map((item: any) => item.str).join(' ');
  } catch (error) {
    console.error(`Error extracting text from page ${pageNumber}:`, error);
    return '';
  }
}

/**
 * Build search index from extracted content
 */
export function buildSearchIndex(documents: PdfDocument[]): PdfPage[] {
  const allPages: PdfPage[] = [];

  documents.forEach((doc) => {
    const content = EXTRACTED_CONTENT[doc.id];
    if (content) {
      allPages.push(...content);
    }
  });

  return allPages;
}

/**
 * Highlight search terms in text
 */
export function highlightText(
  text: string,
  searchTerm: string,
  contextLength: number = 100
): string {
  if (!searchTerm) return text;

  const regex = new RegExp(searchTerm, 'gi');
  const match = regex.exec(text);

  if (!match) return text;

  const start = Math.max(0, match.index - contextLength);
  const end = Math.min(text.length, match.index + searchTerm.length + contextLength);

  let snippet = text.substring(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet.replace(regex, '<mark class="bg-yellow-300">$&</mark>');
}

/**
 * Get document categories for filtering
 */
export function getDocumentCategories(documents: PdfDocument[]): string[] {
  const categories = new Set<string>();
  documents.forEach((doc) => {
    if ('category' in doc && doc.category) {
      categories.add(doc.category as string);
    }
  });
  return Array.from(categories).sort();
}
