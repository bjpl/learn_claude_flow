/**
 * Build-time Search Index Generation
 * Generates search index from all documentation files
 */

import { promises as fs } from 'fs';
import path from 'path';

export interface IndexedDocument {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  filePath: string;
  type: string;
  lastModified: string;
  size: number;
}

/**
 * Recursively scan directory for documentation files
 */
async function scanDirectory(dirPath: string): Promise<string[]> {
  const files: string[] = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await scanDirectory(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }

  return files;
}

/**
 * Extract metadata from markdown frontmatter
 */
function extractFrontmatter(content: string): Record<string, any> {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return {};

  const frontmatter: Record<string, any> = {};
  const lines = match[1].split('\n');

  lines.forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      frontmatter[key.trim()] = value;
    }
  });

  return frontmatter;
}

/**
 * Extract title from markdown content
 */
function extractTitle(content: string): string {
  const h1Regex = /^#\s+(.+)$/m;
  const match = content.match(h1Regex);
  return match ? match[1] : 'Untitled';
}

/**
 * Extract description from markdown content
 */
function extractDescription(content: string): string {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\n*/m, '');

  // Remove title
  const withoutTitle = withoutFrontmatter.replace(/^#\s+.+$/m, '');

  // Get first paragraph
  const paragraphs = withoutTitle.split('\n\n');
  const firstParagraph = paragraphs.find((p) => p.trim().length > 0) || '';

  // Clean up and truncate
  return firstParagraph
    .replace(/[#*`_\[\]]/g, '')
    .trim()
    .substring(0, 200);
}

/**
 * Determine category from file path
 */
function determineCategory(filePath: string, basePath: string): string {
  const relativePath = path.relative(basePath, filePath);
  const parts = relativePath.split(path.sep);

  if (parts.length > 1) {
    // Convert path parts to category
    const categoryParts = parts.slice(0, -1);
    return categoryParts
      .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('/');
  }

  return 'General';
}

/**
 * Extract tags from content
 */
function extractTags(content: string, frontmatter: Record<string, any>): string[] {
  const tags: Set<string> = new Set();

  // Tags from frontmatter
  if (frontmatter.tags) {
    const fmTags = Array.isArray(frontmatter.tags)
      ? frontmatter.tags
      : frontmatter.tags.split(',').map((t: string) => t.trim());
    fmTags.forEach((tag: string) => tags.add(tag));
  }

  // Extract from content
  const lowerContent = content.toLowerCase();
  const keywords = [
    'agent',
    'swarm',
    'command',
    'sparc',
    'github',
    'consensus',
    'testing',
    'review',
    'architecture',
    'performance',
  ];

  keywords.forEach((keyword) => {
    if (lowerContent.includes(keyword)) {
      tags.add(keyword);
    }
  });

  return Array.from(tags);
}

/**
 * Build search index from documentation files
 */
export async function buildSearchIndex(basePath: string): Promise<IndexedDocument[]> {
  console.log(`Building search index from: ${basePath}`);

  const files = await scanDirectory(basePath);
  console.log(`Found ${files.length} documentation files`);

  const indexedDocs: IndexedDocument[] = [];

  for (const filePath of files) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const stats = await fs.stat(filePath);
      const frontmatter = extractFrontmatter(content);

      const id = path
        .relative(basePath, filePath)
        .replace(/\\/g, '/')
        .replace('.md', '');

      const doc: IndexedDocument = {
        id,
        title: frontmatter.title || extractTitle(content),
        description: frontmatter.description || extractDescription(content),
        content,
        category: determineCategory(filePath, basePath),
        tags: extractTags(content, frontmatter),
        filePath: path.relative(basePath, filePath).replace(/\\/g, '/'),
        type: 'markdown',
        lastModified: stats.mtime.toISOString(),
        size: stats.size,
      };

      indexedDocs.push(doc);
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  }

  console.log(`Indexed ${indexedDocs.length} documents`);
  return indexedDocs;
}

/**
 * Save search index to JSON file
 */
export async function saveSearchIndex(
  indexedDocs: IndexedDocument[],
  outputPath: string
): Promise<void> {
  const indexData = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    documentCount: indexedDocs.length,
    documents: indexedDocs,
  };

  await fs.writeFile(outputPath, JSON.stringify(indexData, null, 2), 'utf-8');
  console.log(`Search index saved to: ${outputPath}`);
}

/**
 * Main function to build and save index
 */
export async function generateSearchIndex(): Promise<void> {
  const basePath = path.join(process.cwd(), '.claude');
  const outputPath = path.join(process.cwd(), 'public', 'search-index.json');

  try {
    const indexedDocs = await buildSearchIndex(basePath);
    await saveSearchIndex(indexedDocs, outputPath);
  } catch (error) {
    console.error('Error generating search index:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSearchIndex().catch(console.error);
}
