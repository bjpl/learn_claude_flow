/**
 * Comprehensive QA Test Suite
 * Verifies all 224+ documents are properly loaded, indexed, and searchable
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { loadDocumentsFromDirectory, loadDocumentContent, searchDocuments, SearchOptions } from '../../utils/documentLoader';
import type { Document } from '../../types';

describe('Document Loading QA', () => {
  let documents: Document[];

  beforeAll(async () => {
    documents = await loadDocumentsFromDirectory('/.claude');
  });

  describe('Document Count Verification', () => {
    it('should load all 224+ markdown documents', () => {
      expect(documents.length).toBeGreaterThanOrEqual(224);
      console.log(`Total documents loaded: ${documents.length}`);
    });

    it('should not contain mock data', () => {
      const mockIndicators = documents.filter(doc =>
        doc.description?.includes('mock') ||
        doc.title?.includes('Mock')
      );
      expect(mockIndicators.length).toBe(0);
    });

    it('should have real file paths', () => {
      documents.forEach(doc => {
        expect(doc.filePath).toBeTruthy();
        expect(doc.filePath).toMatch(/\.md$/);
      });
    });
  });

  describe('Document Structure Validation', () => {
    it('should have proper titles for all documents', () => {
      const missingTitles = documents.filter(doc => !doc.title || doc.title === 'Untitled');
      expect(missingTitles.length).toBe(0);
    });

    it('should have valid categories assigned', () => {
      documents.forEach(doc => {
        expect(doc.category).toBeTruthy();
        expect(doc.category).not.toBe('Uncategorized');
      });
    });

    it('should have at least one tag per document', () => {
      documents.forEach(doc => {
        expect(doc.tags).toBeDefined();
        expect(doc.tags!.length).toBeGreaterThan(0);
      });
    });

    it('should have unique IDs', () => {
      const ids = documents.map(doc => doc.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(documents.length);
    });

    it('should have valid URLs', () => {
      documents.forEach(doc => {
        expect(doc.url).toBeTruthy();
        expect(doc.url).toMatch(/^\/\.claude/);
      });
    });
  });

  describe('Category Distribution', () => {
    it('should have Agents category', () => {
      const agentDocs = documents.filter(doc => doc.category?.includes('Agents'));
      expect(agentDocs.length).toBeGreaterThan(0);
      console.log(`Agents documents: ${agentDocs.length}`);
    });

    it('should have Commands category', () => {
      const commandDocs = documents.filter(doc => doc.category?.includes('Commands'));
      expect(commandDocs.length).toBeGreaterThan(0);
      console.log(`Commands documents: ${commandDocs.length}`);
    });

    it('should have multiple subcategories', () => {
      const categories = new Set(documents.map(doc => doc.category));
      expect(categories.size).toBeGreaterThan(10);
      console.log(`Total unique categories: ${categories.size}`);
      console.log('Categories:', Array.from(categories).sort());
    });
  });

  describe('Content Loading', () => {
    it('should load actual markdown content', async () => {
      const sampleDoc = documents[0];
      const content = await loadDocumentContent(sampleDoc.filePath!);

      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(100);
      expect(content).not.toContain('mock content');
      expect(content).toMatch(/^#/); // Should start with markdown header
    });

    it('should load content for core agents', async () => {
      const coreAgents = ['coder', 'reviewer', 'tester', 'planner', 'researcher'];

      for (const agentName of coreAgents) {
        const doc = documents.find(d => d.id.includes(agentName));
        expect(doc).toBeDefined();

        if (doc) {
          const content = await loadDocumentContent(doc.filePath!);
          expect(content.length).toBeGreaterThan(200);
          expect(content).toContain('#'); // Has headers
        }
      }
    });

    it('should handle missing files gracefully', async () => {
      const content = await loadDocumentContent('/nonexistent/file.md');
      expect(content).toContain('Document Not Found');
    });
  });
});

describe('Search Functionality QA', () => {
  let documents: Document[];

  beforeAll(async () => {
    documents = await loadDocumentsFromDirectory('/.claude');
  });

  describe('Basic Search', () => {
    it('should find documents by title', async () => {
      const options: SearchOptions = {
        query: 'coder',
        limit: 10
      };

      const results = await searchDocuments(documents, options);
      expect(results.length).toBeGreaterThan(0);

      const hasCoderInTitle = results.some(doc =>
        doc.title.toLowerCase().includes('coder')
      );
      expect(hasCoderInTitle).toBe(true);
    });

    it('should find documents by description', async () => {
      const options: SearchOptions = {
        query: 'implementation',
        limit: 10
      };

      const results = await searchDocuments(documents, options);
      expect(results.length).toBeGreaterThan(0);
    });

    it('should find documents by tags', async () => {
      const options: SearchOptions = {
        query: 'swarm',
        limit: 10
      };

      const results = await searchDocuments(documents, options);
      expect(results.length).toBeGreaterThan(0);

      console.log(`Found ${results.length} documents with 'swarm' tag`);
    });

    it('should be case-insensitive', async () => {
      const lowerResults = await searchDocuments(documents, {
        query: 'github',
        limit: 20
      });

      const upperResults = await searchDocuments(documents, {
        query: 'GITHUB',
        limit: 20
      });

      expect(lowerResults.length).toBe(upperResults.length);
    });
  });

  describe('Filtered Search', () => {
    it('should filter by category', async () => {
      const options: SearchOptions = {
        query: 'agent',
        categories: ['Agents/Core'],
        limit: 10
      };

      const results = await searchDocuments(documents, options);
      expect(results.length).toBeGreaterThan(0);

      results.forEach(doc => {
        expect(doc.category).toBe('Agents/Core');
      });
    });

    it('should filter by multiple categories', async () => {
      const options: SearchOptions = {
        query: '',
        categories: ['Agents/Core', 'Agents/GitHub'],
        limit: 20
      };

      const results = await searchDocuments(documents, options);
      expect(results.length).toBeGreaterThan(0);

      results.forEach(doc => {
        const matchesCategory =
          doc.category === 'Agents/Core' ||
          doc.category === 'Agents/GitHub';
        expect(matchesCategory).toBe(true);
      });
    });

    it('should filter by tags', async () => {
      const options: SearchOptions = {
        query: '',
        tags: ['agent'],
        limit: 50
      };

      const results = await searchDocuments(documents, options);
      expect(results.length).toBeGreaterThan(0);

      results.forEach(doc => {
        expect(doc.tags).toContain('agent');
      });
    });

    it('should combine query, category, and tag filters', async () => {
      const options: SearchOptions = {
        query: 'coordination',
        categories: ['Commands'],
        tags: ['swarm'],
        limit: 10
      };

      const results = await searchDocuments(documents, options);

      results.forEach(doc => {
        expect(doc.category?.includes('Commands')).toBe(true);
        expect(doc.tags).toContain('swarm');
      });
    });
  });

  describe('Search Relevance', () => {
    it('should return most relevant results first', async () => {
      const options: SearchOptions = {
        query: 'swarm initialization',
        limit: 5
      };

      const results = await searchDocuments(documents, options);
      expect(results.length).toBeGreaterThan(0);

      // First result should be most relevant
      const firstResult = results[0];
      const titleRelevance =
        firstResult.title.toLowerCase().includes('swarm') ||
        firstResult.title.toLowerCase().includes('init');

      expect(titleRelevance).toBe(true);
    });

    it('should limit results correctly', async () => {
      const options: SearchOptions = {
        query: 'agent',
        limit: 5
      };

      const results = await searchDocuments(documents, options);
      expect(results.length).toBeLessThanOrEqual(5);
    });

    it('should handle empty queries', async () => {
      const options: SearchOptions = {
        query: '',
        limit: 10
      };

      const results = await searchDocuments(documents, options);
      expect(results.length).toBeLessThanOrEqual(10);
    });

    it('should handle queries with no results', async () => {
      const options: SearchOptions = {
        query: 'xyznonexistentterm123',
        limit: 10
      };

      const results = await searchDocuments(documents, options);
      expect(results.length).toBe(0);
    });
  });
});

describe('Navigation & Structure QA', () => {
  let documents: Document[];

  beforeAll(async () => {
    documents = await loadDocumentsFromDirectory('/.claude');
  });

  describe('Hierarchical Structure', () => {
    it('should maintain parent-child relationships', () => {
      const categories = documents.map(doc => doc.category!);
      const uniqueCategories = Array.from(new Set(categories));

      // Check for hierarchical structure (e.g., "Agents/Core")
      const hierarchical = uniqueCategories.filter(cat => cat.includes('/'));
      expect(hierarchical.length).toBeGreaterThan(0);
    });

    it('should group related documents', () => {
      // All core agents should be in same category
      const coreAgents = documents.filter(doc =>
        ['coder', 'reviewer', 'tester', 'planner', 'researcher']
          .some(name => doc.id.includes(name))
      );

      const categories = new Set(coreAgents.map(doc => doc.category));
      expect(categories.size).toBeLessThanOrEqual(2); // Should be grouped together
    });
  });

  describe('Cross-References', () => {
    it('should have tags for cross-referencing', () => {
      const allTags = documents.flatMap(doc => doc.tags || []);
      const uniqueTags = new Set(allTags);

      expect(uniqueTags.size).toBeGreaterThan(20);
      console.log(`Total unique tags: ${uniqueTags.size}`);
    });

    it('should have common tags across related documents', () => {
      const swarmDocs = documents.filter(doc =>
        doc.tags?.includes('swarm')
      );

      expect(swarmDocs.length).toBeGreaterThan(5);
      console.log(`Documents with 'swarm' tag: ${swarmDocs.length}`);
    });
  });
});

describe('Performance QA', () => {
  it('should load documents in under 3 seconds', async () => {
    const startTime = performance.now();
    const documents = await loadDocumentsFromDirectory('/.claude');
    const endTime = performance.now();

    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(3000);
    console.log(`Load time: ${loadTime.toFixed(2)}ms`);
  });

  it('should search documents in under 200ms', async () => {
    const documents = await loadDocumentsFromDirectory('/.claude');

    const startTime = performance.now();
    await searchDocuments(documents, {
      query: 'agent coordination',
      limit: 20
    });
    const endTime = performance.now();

    const searchTime = endTime - startTime;
    expect(searchTime).toBeLessThan(200);
    console.log(`Search time: ${searchTime.toFixed(2)}ms`);
  });

  it('should handle multiple concurrent searches', async () => {
    const documents = await loadDocumentsFromDirectory('/.claude');

    const searches = [
      searchDocuments(documents, { query: 'swarm', limit: 10 }),
      searchDocuments(documents, { query: 'github', limit: 10 }),
      searchDocuments(documents, { query: 'sparc', limit: 10 }),
      searchDocuments(documents, { query: 'consensus', limit: 10 }),
      searchDocuments(documents, { query: 'neural', limit: 10 })
    ];

    const startTime = performance.now();
    const results = await Promise.all(searches);
    const endTime = performance.now();

    const totalTime = endTime - startTime;
    expect(totalTime).toBeLessThan(500);
    expect(results.length).toBe(5);
    console.log(`Concurrent search time: ${totalTime.toFixed(2)}ms`);
  });
});

describe('Data Integrity QA', () => {
  let documents: Document[];

  beforeAll(async () => {
    documents = await loadDocumentsFromDirectory('/.claude');
  });

  describe('Required Fields', () => {
    it('should have all required fields', () => {
      documents.forEach(doc => {
        expect(doc.id).toBeTruthy();
        expect(doc.title).toBeTruthy();
        expect(doc.url).toBeTruthy();
        expect(doc.filePath).toBeTruthy();
        expect(doc.type).toBe('markdown');
        expect(doc.category).toBeTruthy();
        expect(doc.tags).toBeDefined();
      });
    });

    it('should not have null or undefined critical fields', () => {
      documents.forEach(doc => {
        expect(doc.id).not.toBeNull();
        expect(doc.id).not.toBeUndefined();
        expect(doc.title).not.toBeNull();
        expect(doc.title).not.toBeUndefined();
      });
    });
  });

  describe('Data Consistency', () => {
    it('should have consistent file path formats', () => {
      documents.forEach(doc => {
        expect(doc.filePath).toMatch(/^\/\.claude\/.+\.md$/);
      });
    });

    it('should have consistent URL formats', () => {
      documents.forEach(doc => {
        expect(doc.url).toMatch(/^\/\.claude\/.+\.md$/);
      });
    });

    it('should have valid tag arrays', () => {
      documents.forEach(doc => {
        expect(Array.isArray(doc.tags)).toBe(true);
        doc.tags!.forEach(tag => {
          expect(typeof tag).toBe('string');
          expect(tag.length).toBeGreaterThan(0);
        });
      });
    });
  });
});
