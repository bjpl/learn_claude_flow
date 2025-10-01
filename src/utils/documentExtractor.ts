/**
 * Documentation Content Extraction Utility
 * Scans and extracts all markdown documentation from .claude directory
 */

import type { Document } from '../types';

export interface DocumentNode {
  id: string;
  title: string;
  filePath: string;
  type: 'file' | 'directory';
  category: string;
  tags: string[];
  children?: DocumentNode[];
  level: number;
  parentId?: string;
}

export interface DocumentMetadata {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  author?: string;
  lastModified?: Date;
}

/**
 * Parses markdown frontmatter and extracts metadata
 */
export function parseMarkdownMetadata(content: string): DocumentMetadata {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    // Extract title from first H1
    const titleMatch = content.match(/^#\s+(.+)$/m);
    return {
      title: titleMatch ? titleMatch[1] : 'Untitled',
    };
  }

  const frontmatter = match[1];
  const metadata: DocumentMetadata = {
    title: 'Untitled',
  };

  // Parse YAML-like frontmatter
  const lines = frontmatter.split('\n');
  lines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();

    if (key && value) {
      const trimmedKey = key.trim();
      if (trimmedKey === 'title') {
        metadata.title = value.replace(/['"]/g, '');
      } else if (trimmedKey === 'description') {
        metadata.description = value.replace(/['"]/g, '');
      } else if (trimmedKey === 'category') {
        metadata.category = value.replace(/['"]/g, '');
      } else if (trimmedKey === 'tags') {
        metadata.tags = value.replace(/[\[\]'"]/g, '').split(',').map(t => t.trim());
      } else if (trimmedKey === 'author') {
        metadata.author = value.replace(/['"]/g, '');
      }
    }
  });

  return metadata;
}

/**
 * Extracts category from file path
 */
export function extractCategoryFromPath(filePath: string): string {
  const parts = filePath.split('/');
  const claudeIndex = parts.findIndex(p => p === '.claude');

  if (claudeIndex === -1) return 'General';

  const afterClaude = parts.slice(claudeIndex + 1);

  if (afterClaude[0] === 'agents') {
    return afterClaude[1] ? `Agents/${afterClaude[1]}` : 'Agents';
  } else if (afterClaude[0] === 'commands') {
    return afterClaude[1] ? `Commands/${afterClaude[1]}` : 'Commands';
  }

  return afterClaude[0] || 'General';
}

/**
 * Creates a hierarchical structure from flat file paths
 */
export function buildDocumentTree(documents: Document[]): DocumentNode[] {
  const nodeMap = new Map<string, DocumentNode>();
  const rootNodes: DocumentNode[] = [];

  // Create all nodes
  documents.forEach(doc => {
    if (!doc.filePath) {
      console.warn('Document missing filePath:', doc.id);
      return;
    }
    const parts = doc.filePath.split('/').filter(Boolean);
    const claudeIndex = parts.findIndex(p => p === '.claude');

    if (claudeIndex === -1) return;

    const relevantParts = parts.slice(claudeIndex);

    relevantParts.forEach((part, index) => {
      const pathSoFar = relevantParts.slice(0, index + 1).join('/');

      if (!nodeMap.has(pathSoFar)) {
        const isFile = index === relevantParts.length - 1;
        const node: DocumentNode = {
          id: pathSoFar,
          title: isFile ? doc.title : part,
          filePath: (isFile && doc.filePath) ? doc.filePath : '',
          type: isFile ? 'file' : 'directory',
          category: doc.category || 'General',
          tags: doc.tags || [],
          level: index,
          children: [],
        };

        if (index > 0) {
          const parentPath = relevantParts.slice(0, index).join('/');
          node.parentId = parentPath;
          const parent = nodeMap.get(parentPath);
          if (parent && parent.children) {
            parent.children.push(node);
          }
        }

        nodeMap.set(pathSoFar, node);

        if (index === 0) {
          rootNodes.push(node);
        }
      }
    });
  });

  return rootNodes;
}

/**
 * Flattens document tree for search indexing
 */
export function flattenDocumentTree(nodes: DocumentNode[]): DocumentNode[] {
  const result: DocumentNode[] = [];

  function traverse(node: DocumentNode) {
    result.push(node);
    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  nodes.forEach(traverse);
  return result;
}

/**
 * Extracts searchable content from markdown
 */
export function extractSearchableContent(markdown: string): string {
  // Remove frontmatter
  let content = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Remove code blocks but keep inline code
  content = content.replace(/```[\s\S]*?```/g, '');

  // Remove images
  content = content.replace(/!\[.*?\]\(.*?\)/g, '');

  // Remove links but keep text
  content = content.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // Remove HTML tags
  content = content.replace(/<[^>]+>/g, '');

  // Normalize whitespace
  content = content.replace(/\s+/g, ' ').trim();

  return content;
}

/**
 * Generates a table of contents from markdown headers
 */
export interface TocItem {
  level: number;
  title: string;
  id: string;
}

export function generateTableOfContents(markdown: string): TocItem[] {
  const lines = markdown.split('\n');
  const toc: TocItem[] = [];

  lines.forEach(line => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title.toLowerCase().replace(/[^\w]+/g, '-');

      toc.push({ level, title, id });
    }
  });

  return toc;
}

/**
 * Creates navigation breadcrumbs from file path
 */
export interface Breadcrumb {
  label: string;
  path: string;
}

export function createBreadcrumbs(filePath: string): Breadcrumb[] {
  const parts = filePath.split('/').filter(Boolean);
  const claudeIndex = parts.findIndex(p => p === '.claude');

  if (claudeIndex === -1) return [];

  const relevantParts = parts.slice(claudeIndex + 1);
  const breadcrumbs: Breadcrumb[] = [];

  relevantParts.forEach((part, index) => {
    const label = part
      .replace(/-/g, ' ')
      .replace(/\.md$/, '')
      .replace(/\b\w/g, c => c.toUpperCase());

    const path = relevantParts.slice(0, index + 1).join('/');
    breadcrumbs.push({ label, path });
  });

  return breadcrumbs;
}
