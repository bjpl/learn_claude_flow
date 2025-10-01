#!/usr/bin/env node
/**
 * Documentation Extraction Script
 * Extracts all markdown files from .claude directory and generates TypeScript manifest
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface DocumentMeta {
  id: string;
  title: string;
  url: string;
  filePath: string;
  type: 'markdown';
  category: string;
  tags: string[];
  description: string;
  content?: string;
}

const CLAUDE_DIR = path.resolve(__dirname, '../.claude');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/documents.ts');

/**
 * Extract title from markdown content
 */
function extractTitle(content: string, filePath: string): string {
  const firstLine = content.split('\n').find(line => line.trim().startsWith('#'));
  if (firstLine) {
    return firstLine.replace(/^#+\s*/, '').trim();
  }

  // Fallback to filename
  const filename = path.basename(filePath, '.md');
  return filename
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Extract description from markdown content
 */
function extractDescription(content: string): string {
  const lines = content.split('\n');

  // Find first paragraph after title
  let foundTitle = false;
  for (const line of lines) {
    if (line.trim().startsWith('#')) {
      foundTitle = true;
      continue;
    }

    if (foundTitle && line.trim() && !line.trim().startsWith('#')) {
      return line.trim().substring(0, 150);
    }
  }

  return 'Claude Flow documentation';
}

/**
 * Generate category from file path
 */
function generateCategory(relativePath: string): string {
  const parts = relativePath.split(path.sep);

  // Remove filename
  parts.pop();

  if (parts.length === 0) return 'General';

  // Capitalize and join parts
  const category = parts
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('/');

  return category;
}

/**
 * Generate tags from file path and category
 */
function generateTags(relativePath: string, category: string): string[] {
  const tags: Set<string> = new Set();

  const filename = path.basename(relativePath, '.md');
  const parts = relativePath.split(path.sep);

  // Add category parts as tags
  parts.slice(0, -1).forEach(part => {
    if (part !== 'agents' && part !== 'commands') {
      tags.add(part);
    }
  });

  // Add type tag
  if (parts[0] === 'agents') tags.add('agent');
  if (parts[0] === 'commands') tags.add('command');

  // Add filename parts as tags
  filename.split('-').forEach(part => tags.add(part));

  return Array.from(tags);
}

/**
 * Generate ID from file path
 */
function generateId(relativePath: string): string {
  return relativePath
    .replace(/\.md$/, '')
    .replace(/\//g, '-')
    .replace(/\\/g, '-')
    .toLowerCase();
}

/**
 * Recursively find all markdown files
 */
function findMarkdownFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath, baseDir));
    } else if (item.endsWith('.md')) {
      const relativePath = path.relative(baseDir, fullPath);
      files.push(relativePath);
    }
  }

  return files;
}

/**
 * Process a markdown file
 */
function processMarkdownFile(filePath: string): DocumentMeta {
  const fullPath = path.join(CLAUDE_DIR, filePath);
  const content = fs.readFileSync(fullPath, 'utf-8');

  const relativePath = filePath.replace(/\\/g, '/');
  const id = generateId(relativePath);
  const title = extractTitle(content, filePath);
  const description = extractDescription(content);
  const category = generateCategory(relativePath);
  const tags = generateTags(relativePath, category);
  const url = `/.claude/${relativePath}`;

  return {
    id,
    title,
    url,
    filePath: url,
    type: 'markdown',
    category,
    tags,
    description,
  };
}

/**
 * Main extraction function
 */
function extractDocumentation() {
  console.log('🔍 Scanning .claude directory...');
  console.log(`   Base path: ${CLAUDE_DIR}`);

  const markdownFiles = findMarkdownFiles(CLAUDE_DIR);
  console.log(`✅ Found ${markdownFiles.length} markdown files\n`);

  console.log('📝 Processing files...');
  const documents: DocumentMeta[] = [];

  for (const file of markdownFiles) {
    try {
      const doc = processMarkdownFile(file);
      documents.push(doc);
      console.log(`   ✓ ${file}`);
    } catch (error) {
      console.error(`   ✗ Error processing ${file}:`, error);
    }
  }

  console.log(`\n✅ Processed ${documents.length} documents`);

  // Group by category for summary
  const categories = new Map<string, number>();
  documents.forEach(doc => {
    const count = categories.get(doc.category) || 0;
    categories.set(doc.category, count + 1);
  });

  console.log('\n📊 Documents by category:');
  Array.from(categories.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count}`);
    });

  // Generate TypeScript file
  console.log('\n📦 Generating documents.ts...');

  const tsContent = `/**
 * Auto-generated documentation manifest
 * Generated on: ${new Date().toISOString()}
 * Total documents: ${documents.length}
 */

import type { Document } from '../types';

export const CLAUDE_DOCUMENTS: Document[] = ${JSON.stringify(documents, null, 2)};

export const DOCUMENT_COUNT = ${documents.length};

export const CATEGORIES = ${JSON.stringify(Array.from(categories.keys()).sort(), null, 2)};

export const DOCUMENTS_BY_CATEGORY = new Map<string, Document[]>(
  ${JSON.stringify(
    Array.from(categories.keys()).map(cat => [
      cat,
      documents.filter(d => d.category === cat)
    ]),
    null,
    2
  )}
);
`;

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf-8');
  console.log(`✅ Generated: ${OUTPUT_FILE}`);

  console.log('\n✨ Documentation extraction complete!');
  console.log(`   Total: ${documents.length} documents`);
  console.log(`   Categories: ${categories.size}`);
}

// Run extraction
try {
  extractDocumentation();
  process.exit(0);
} catch (error) {
  console.error('❌ Extraction failed:', error);
  process.exit(1);
}
