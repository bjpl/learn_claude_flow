/**
 * Navigation and UI Integration Tests
 * Tests breadcrumbs, links, and document relationships
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { loadDocumentsFromDirectory } from '../../utils/documentLoader';
import {
  createBreadcrumbs,
  buildDocumentTree,
  flattenDocumentTree,
  extractCategoryFromPath,
  generateTableOfContents
} from '../../utils/documentExtractor';
import type { Document } from '../../types';

describe('Navigation System QA', () => {
  let documents: Document[];

  beforeAll(async () => {
    documents = await loadDocumentsFromDirectory('/.claude');
  });

  describe('Breadcrumb Generation', () => {
    it('should generate breadcrumbs for agent files', () => {
      const breadcrumbs = createBreadcrumbs('/.claude/agents/core/coder.md');

      expect(breadcrumbs.length).toBeGreaterThan(0);
      expect(breadcrumbs[0].label).toBe('Agents');
      expect(breadcrumbs[1].label).toBe('Core');
      expect(breadcrumbs[2].label).toBe('Coder');
    });

    it('should generate breadcrumbs for command files', () => {
      const breadcrumbs = createBreadcrumbs('/.claude/commands/coordination/swarm-init.md');

      expect(breadcrumbs.length).toBe(3);
      expect(breadcrumbs[0].label).toBe('Commands');
      expect(breadcrumbs[1].label).toBe('Coordination');
      expect(breadcrumbs[2].label).toBe('Swarm Init');
    });

    it('should handle nested paths', () => {
      const breadcrumbs = createBreadcrumbs('/.claude/agents/github/code-review-swarm.md');

      expect(breadcrumbs.length).toBeGreaterThan(2);
      breadcrumbs.forEach(crumb => {
        expect(crumb.label).toBeTruthy();
        expect(crumb.path).toBeTruthy();
      });
    });

    it('should create valid paths', () => {
      const breadcrumbs = createBreadcrumbs('/.claude/commands/swarm/swarm-init.md');

      breadcrumbs.forEach((crumb, index) => {
        expect(crumb.path).toMatch(/^[a-z-/]+$/);
        if (index > 0) {
          // Each path should build on the previous
          expect(crumb.path.length).toBeGreaterThan(breadcrumbs[index - 1].path.length);
        }
      });
    });
  });

  describe('Document Tree Structure', () => {
    it('should build hierarchical tree', () => {
      const tree = buildDocumentTree(documents);

      expect(tree.length).toBeGreaterThan(0);
      console.log(`Root nodes: ${tree.length}`);
    });

    it('should have directory nodes with children', () => {
      const tree = buildDocumentTree(documents);

      const directoriesWithChildren = tree.filter(node =>
        node.type === 'directory' &&
        node.children &&
        node.children.length > 0
      );

      expect(directoriesWithChildren.length).toBeGreaterThan(0);
    });

    it('should have file nodes as leaves', () => {
      const tree = buildDocumentTree(documents);
      const flattened = flattenDocumentTree(tree);

      const fileNodes = flattened.filter(node => node.type === 'file');

      fileNodes.forEach(node => {
        expect(node.filePath).toBeTruthy();
        expect(node.filePath).toMatch(/\.md$/);
      });
    });

    it('should maintain parent-child relationships', () => {
      const tree = buildDocumentTree(documents);
      const flattened = flattenDocumentTree(tree);

      flattened.forEach(node => {
        if (node.parentId) {
          const parent = flattened.find(n => n.id === node.parentId);
          expect(parent).toBeDefined();
          expect(parent!.children).toBeDefined();
        }
      });
    });

    it('should assign correct levels', () => {
      const tree = buildDocumentTree(documents);
      const flattened = flattenDocumentTree(tree);

      flattened.forEach(node => {
        expect(node.level).toBeGreaterThanOrEqual(0);
        if (node.parentId) {
          const parent = flattened.find(n => n.id === node.parentId);
          if (parent) {
            expect(node.level).toBe(parent.level + 1);
          }
        }
      });
    });
  });

  describe('Category Extraction', () => {
    it('should extract agent categories', () => {
      const category = extractCategoryFromPath('/.claude/agents/core/coder.md');
      expect(category).toBe('Agents/core');
    });

    it('should extract command categories', () => {
      const category = extractCategoryFromPath('/.claude/commands/coordination/swarm-init.md');
      expect(category).toBe('Commands/coordination');
    });

    it('should handle root level files', () => {
      const category = extractCategoryFromPath('/.claude/README.md');
      expect(category).toBeTruthy();
    });

    it('should handle deep nesting', () => {
      const category = extractCategoryFromPath('/.claude/agents/analysis/code-review/analyze-code-quality.md');
      expect(category).toContain('Agents');
    });
  });

  describe('Table of Contents', () => {
    it('should generate TOC from markdown headers', () => {
      const markdown = `# Main Title
## Section 1
### Subsection 1.1
## Section 2
### Subsection 2.1
### Subsection 2.2`;

      const toc = generateTableOfContents(markdown);

      expect(toc.length).toBe(6);
      expect(toc[0].level).toBe(1);
      expect(toc[1].level).toBe(2);
      expect(toc[2].level).toBe(3);
    });

    it('should create valid IDs', () => {
      const markdown = `# Main Title
## Section With Spaces
### Sub-Section With Dashes`;

      const toc = generateTableOfContents(markdown);

      toc.forEach(item => {
        expect(item.id).toMatch(/^[a-z0-9-]+$/);
        expect(item.id).not.toContain(' ');
      });
    });

    it('should preserve title text', () => {
      const markdown = `# Main Title
## Important Section`;

      const toc = generateTableOfContents(markdown);

      expect(toc[0].title).toBe('Main Title');
      expect(toc[1].title).toBe('Important Section');
    });
  });

  describe('Document Relationships', () => {
    it('should find related documents by category', () => {
      const coreAgents = documents.filter(doc =>
        doc.category === 'Agents/Core'
      );

      expect(coreAgents.length).toBeGreaterThanOrEqual(5);
    });

    it('should find related documents by tags', () => {
      const swarmDocs = documents.filter(doc =>
        doc.tags?.includes('swarm')
      );

      expect(swarmDocs.length).toBeGreaterThan(0);
    });

    it('should have bidirectional relationships', () => {
      // Documents with common tags should be relatable
      const githubDocs = documents.filter(doc =>
        doc.tags?.includes('github')
      );

      githubDocs.forEach(doc => {
        const related = documents.filter(other =>
          other.id !== doc.id &&
          other.tags?.some(tag => doc.tags?.includes(tag))
        );

        expect(related.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('Link Validation', () => {
  let documents: Document[];

  beforeAll(async () => {
    documents = await loadDocumentsFromDirectory('/.claude');
  });

  it('should have consistent link structure', () => {
    documents.forEach(doc => {
      expect(doc.url).toBe(doc.filePath);
    });
  });

  it('should generate valid document IDs for links', () => {
    documents.forEach(doc => {
      expect(doc.id).toMatch(/^[a-z0-9-]+$/);
      expect(doc.id).not.toContain(' ');
      expect(doc.id).not.toContain('/');
    });
  });

  it('should have resolvable file paths', () => {
    documents.forEach(doc => {
      expect(doc.filePath).toMatch(/^\/\.claude\/.+\.md$/);
    });
  });
});

describe('Navigation Performance', () => {
  it('should build tree quickly', async () => {
    const documents = await loadDocumentsFromDirectory('/.claude');

    const startTime = performance.now();
    buildDocumentTree(documents);
    const endTime = performance.now();

    const buildTime = endTime - startTime;
    expect(buildTime).toBeLessThan(100);
    console.log(`Tree build time: ${buildTime.toFixed(2)}ms`);
  });

  it('should flatten tree quickly', async () => {
    const documents = await loadDocumentsFromDirectory('/.claude');
    const tree = buildDocumentTree(documents);

    const startTime = performance.now();
    const flattened = flattenDocumentTree(tree);
    const endTime = performance.now();

    const flattenTime = endTime - startTime;
    expect(flattenTime).toBeLessThan(50);
    expect(flattened.length).toBeGreaterThan(0);
  });

  it('should generate breadcrumbs quickly', () => {
    const startTime = performance.now();

    for (let i = 0; i < 100; i++) {
      createBreadcrumbs('/.claude/agents/core/coder.md');
    }

    const endTime = performance.now();
    const avgTime = (endTime - startTime) / 100;

    expect(avgTime).toBeLessThan(1);
    console.log(`Avg breadcrumb generation: ${avgTime.toFixed(3)}ms`);
  });
});
