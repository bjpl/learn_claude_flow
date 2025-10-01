#!/usr/bin/env node

/**
 * Build Search Index Script
 * Generates search index at build time
 */

import { generateSearchIndex } from '../src/search/buildIndex.ts';

async function main() {
  console.log('Starting search index generation...');

  try {
    await generateSearchIndex();
    console.log('Search index generation completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to generate search index:', error);
    process.exit(1);
  }
}

main();
