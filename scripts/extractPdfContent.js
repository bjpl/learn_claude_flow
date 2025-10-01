#!/usr/bin/env node

/**
 * PDF Content Extraction Script
 * Extracts text content from PDFs and creates searchable JSON files
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_DIR = path.join(__dirname, '..', 'public', 'pdfs');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data', 'pdf-content');

/**
 * Extract content from PDF files (placeholder - requires pdf-parse)
 */
async function extractPdfContent() {
  try {
    console.log('Starting PDF extraction...');

    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Check if PDF directory exists
    try {
      await fs.access(PDF_DIR);
    } catch {
      console.log(`PDF directory not found: ${PDF_DIR}`);
      console.log('Creating placeholder data...');
      await createPlaceholderData();
      return;
    }

    // Get all PDF files
    const files = await fs.readdir(PDF_DIR);
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));

    console.log(`Found ${pdfFiles.length} PDF files`);

    if (pdfFiles.length === 0) {
      console.log('No PDF files found. Creating placeholder data...');
      await createPlaceholderData();
      return;
    }

    // Extract content from each PDF
    // NOTE: Actual PDF extraction would use pdf-parse library here
    for (const file of pdfFiles) {
      const documentId = path.basename(file, '.pdf');
      console.log(`Processing: ${file}`);

      // Placeholder: In real implementation, use pdf-parse to extract text
      const pages = [
        {
          pageNumber: 1,
          content: 'Placeholder content for page 1',
          documentId,
        },
      ];

      const outputPath = path.join(OUTPUT_DIR, `${documentId}.json`);
      await fs.writeFile(outputPath, JSON.stringify(pages, null, 2));
      console.log(`  ✓ Extracted to: ${outputPath}`);
    }

    console.log('\n✅ PDF extraction complete!');
  } catch (error) {
    console.error('Error extracting PDF content:', error);
    process.exit(1);
  }
}

/**
 * Create placeholder data for development
 */
async function createPlaceholderData() {
  const placeholderDocs = [
    {
      id: 'claude-flow-guide',
      title: 'Claude Flow Complete Guide',
      pages: [
        {
          pageNumber: 1,
          content: 'Claude Flow is a powerful orchestration system for AI agents...',
          documentId: 'claude-flow-guide',
        },
      ],
    },
  ];

  for (const doc of placeholderDocs) {
    const outputPath = path.join(OUTPUT_DIR, `${doc.id}.json`);
    await fs.writeFile(outputPath, JSON.stringify(doc.pages, null, 2));
    console.log(`Created placeholder: ${outputPath}`);
  }
}

// Run extraction
extractPdfContent();
