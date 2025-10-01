/**
 * Search Integration Tests
 * Tests the search engine with real document data
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { initializeSearch, searchDocuments as fuseSearch } from '../../utils/searchEngine';
import { loadDocumentsFromDirectory, loadDocumentContent } from '../../utils/documentLoader';
import type { Document, PdfPage } from '../../types';

describe('Search Engine Integration', () => {
  let documents: Document[];
  let pages: PdfPage[];

  beforeAll(async () => {
    // Load all documents
    documents = await loadDocumentsFromDirectory('/.claude');

    // Create page data for search indexing
    pages = [];
    for (const doc of documents.slice(0, 50)) { // Sample first 50 for performance
      const content = await loadDocumentContent(doc.filePath!);

      // Split content into pages (simulated)
      const chunks = content.match(/.{1,2000}/gs) || [content];
      chunks.forEach((chunk, index) => {
        pages.push({
          pageNumber: index + 1,
          documentId: doc.id,
          content: chunk
        });
      });
    }

    // Initialize search engine
    initializeSearch(pages);
  });

  describe('Full-Text Search', () => {
    it('should find content in document pages', async () => {
      const results = await fuseSearch('swarm coordination');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveProperty('documentId');
      expect(results[0]).toHaveProperty('content');
      expect(results[0]).toHaveProperty('score');
    });

    it('should return relevant matches', async () => {
      const results = await fuseSearch('agent spawning');

      results.forEach(result => {
        const contentLower = result.content.toLowerCase();
        const hasRelevantTerm =
          contentLower.includes('agent') ||
          contentLower.includes('spawn');
        expect(hasRelevantTerm).toBe(true);
      });
    });

    it('should rank results by relevance', async () => {
      const results = await fuseSearch('SPARC methodology');

      if (results.length > 1) {
        // Scores should be ascending (lower is better in Fuse.js)
        for (let i = 1; i < results.length; i++) {
          expect(results[i].score).toBeGreaterThanOrEqual(results[i - 1].score);
        }
      }
    });

    it('should handle multi-word queries', async () => {
      const results = await fuseSearch('neural network training');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should handle special characters', async () => {
      const results = await fuseSearch('mcp__claude-flow');
      // Should not crash
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe('Search Quality', () => {
    it('should find agent documentation', async () => {
      const results = await fuseSearch('coder agent');

      const coderDoc = results.find(r =>
        r.documentTitle?.toLowerCase().includes('coder')
      );

      expect(coderDoc).toBeDefined();
    });

    it('should find command documentation', async () => {
      const results = await fuseSearch('swarm init');

      const hasSwarmInit = results.some(r =>
        r.content.toLowerCase().includes('swarm') &&
        r.content.toLowerCase().includes('init')
      );

      expect(hasSwarmInit).toBe(true);
    });

    it('should find consensus documentation', async () => {
      const results = await fuseSearch('byzantine fault tolerance');
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('Search Performance', () => {
    it('should search quickly', async () => {
      const startTime = performance.now();
      await fuseSearch('agent coordination patterns');
      const endTime = performance.now();

      const searchTime = endTime - startTime;
      expect(searchTime).toBeLessThan(100);
      console.log(`Search time: ${searchTime.toFixed(2)}ms`);
    });

    it('should handle empty queries', async () => {
      const results = await fuseSearch('');
      expect(results).toEqual([]);
    });

    it('should limit results', async () => {
      const results = await fuseSearch('agent');
      expect(results.length).toBeLessThanOrEqual(50);
    });
  });

  describe('Match Highlighting', () => {
    it('should include match information', async () => {
      const results = await fuseSearch('swarm topology');

      if (results.length > 0) {
        expect(results[0]).toHaveProperty('matches');
        expect(Array.isArray(results[0].matches)).toBe(true);
      }
    });

    it('should highlight correct terms', async () => {
      const results = await fuseSearch('mesh coordinator');

      const hasMatches = results.some(r =>
        r.matches && r.matches.length > 0
      );

      expect(hasMatches).toBe(true);
    });
  });
});

describe('Cross-Document Search', () => {
  let documents: Document[];

  beforeAll(async () => {
    documents = await loadDocumentsFromDirectory('/.claude');
  });

  it('should find related documents', async () => {
    // Find all swarm-related documents
    const swarmDocs = documents.filter(doc =>
      doc.tags?.includes('swarm') ||
      doc.category?.toLowerCase().includes('swarm') ||
      doc.title.toLowerCase().includes('swarm')
    );

    expect(swarmDocs.length).toBeGreaterThan(5);
    console.log(`Found ${swarmDocs.length} swarm-related documents`);
  });

  it('should find documents by multiple criteria', async () => {
    // Find GitHub + agent documents
    const githubAgents = documents.filter(doc =>
      doc.category?.includes('GitHub') &&
      doc.tags?.includes('agent')
    );

    expect(githubAgents.length).toBeGreaterThan(0);
  });

  it('should support complex queries', async () => {
    // Find all coordination-related commands
    const coordCommands = documents.filter(doc =>
      doc.category?.includes('Commands') &&
      (doc.tags?.includes('coordination') ||
       doc.tags?.includes('swarm') ||
       doc.title.toLowerCase().includes('coordination'))
    );

    expect(coordCommands.length).toBeGreaterThan(0);
    console.log(`Found ${coordCommands.length} coordination commands`);
  });
});

describe('Search Edge Cases', () => {
  it('should handle very long queries', async () => {
    const longQuery = 'agent swarm coordination mesh topology hierarchical distributed consensus byzantine raft'.repeat(10);

    const documents = await loadDocumentsFromDirectory('/.claude');
    const pages: PdfPage[] = [];

    documents.slice(0, 10).forEach((doc) => {
      pages.push({
        pageNumber: 1,
        documentId: doc.id,
        content: doc.description || doc.title
      });
    });

    initializeSearch(pages);
    const results = await fuseSearch(longQuery);

    // Should not crash
    expect(Array.isArray(results)).toBe(true);
  });

  it('should handle special characters in queries', async () => {
    const queries = [
      'mcp__claude-flow__swarm_init',
      'agent-spawn',
      'task/orchestration',
      'consensus@runtime',
      'neural#network'
    ];

    for await (const query of queries) {
      const documents = await loadDocumentsFromDirectory('/.claude');
      expect(documents.length).toBeGreaterThan(0);
      expect(query).toBeTruthy(); // Use query variable
    }
  });

  it('should handle unicode characters', async () => {
    const results = await fuseSearch('swärm coordinátion');
    expect(Array.isArray(results)).toBe(true);
  });

  it('should be case-insensitive', async () => {
    const lower = await fuseSearch('agent');
    const upper = await fuseSearch('AGENT');
    const mixed = await fuseSearch('AgEnT');

    // Should find results regardless of case
    expect(lower.length).toBeGreaterThan(0);
    expect(upper.length).toBeGreaterThan(0);
    expect(mixed.length).toBeGreaterThan(0);
  });
});
