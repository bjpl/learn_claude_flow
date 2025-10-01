/**
 * Knowledge Graph Builder
 * Creates relationships and categories for all 224 documents
 */

import type { Document } from '../types';

export interface KnowledgeNode {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  type: 'agent' | 'command' | 'concept' | 'guide';
  tags: string[];
  relatedIds: string[];
  capabilities?: string[];
  usage?: string;
  importance: 'high' | 'medium' | 'low';
}

export interface CategoryInfo {
  name: string;
  icon: string;
  color: string;
  description: string;
  count: number;
  subcategories: SubcategoryInfo[];
}

export interface SubcategoryInfo {
  name: string;
  count: number;
  documents: Document[];
}

export interface KnowledgeGraph {
  nodes: Map<string, KnowledgeNode>;
  categories: Map<string, CategoryInfo>;
  searchIndex: Map<string, string[]>; // term -> document IDs
  frequentlyUsed: string[]; // frequently accessed document IDs
}

/**
 * Agent capabilities mapping
 */
const AGENT_CAPABILITIES: Record<string, string[]> = {
  'coder': ['implementation', 'code-generation', 'refactoring'],
  'reviewer': ['code-review', 'quality-assurance', 'security-audit'],
  'tester': ['unit-testing', 'integration-testing', 'test-automation'],
  'planner': ['task-planning', 'breakdown', 'estimation'],
  'researcher': ['analysis', 'documentation', 'investigation'],
  'byzantine-coordinator': ['consensus', 'fault-tolerance', 'distributed-systems'],
  'raft-manager': ['consensus', 'leader-election', 'log-replication'],
  'pr-manager': ['github', 'pull-requests', 'automation'],
  'code-review-swarm': ['github', 'code-review', 'swarm-intelligence'],
  'sparc-coord': ['methodology', 'coordination', 'workflow'],
  'system-architect': ['architecture', 'system-design', 'scalability'],
};

/**
 * Category definitions with metadata
 */
export const CATEGORY_METADATA: Record<string, Omit<CategoryInfo, 'count' | 'subcategories'>> = {
  'Agents/Core': {
    name: 'Core Agents',
    icon: '🤖',
    color: 'blue',
    description: 'Essential agents for core development tasks',
  },
  'Agents/Consensus': {
    name: 'Consensus Agents',
    icon: '🔄',
    color: 'purple',
    description: 'Distributed consensus and coordination agents',
  },
  'Agents/GitHub': {
    name: 'GitHub Agents',
    icon: '📦',
    color: 'gray',
    description: 'GitHub integration and automation agents',
  },
  'Agents/SPARC': {
    name: 'SPARC Methodology',
    icon: '⚡',
    color: 'yellow',
    description: 'SPARC workflow and methodology agents',
  },
  'Agents/Swarm': {
    name: 'Swarm Coordination',
    icon: '🐝',
    color: 'amber',
    description: 'Multi-agent swarm coordination',
  },
  'Agents/Optimization': {
    name: 'Optimization Agents',
    icon: '⚙️',
    color: 'green',
    description: 'Performance and resource optimization',
  },
  'Commands/Coordination': {
    name: 'Coordination Commands',
    icon: '🎯',
    color: 'indigo',
    description: 'Swarm and agent coordination commands',
  },
  'Commands/Analysis': {
    name: 'Analysis Commands',
    icon: '📊',
    color: 'cyan',
    description: 'Performance and bottleneck analysis',
  },
  'Commands/Memory': {
    name: 'Memory Commands',
    icon: '💾',
    color: 'pink',
    description: 'Memory management and persistence',
  },
  'Commands/GitHub': {
    name: 'GitHub Commands',
    icon: '🔗',
    color: 'slate',
    description: 'GitHub integration commands',
  },
};

/**
 * Build knowledge graph from documents
 */
export function buildKnowledgeGraph(documents: Document[]): KnowledgeGraph {
  console.log('[KG] Building knowledge graph from', documents.length, 'documents');

  const nodes = new Map<string, KnowledgeNode>();
  const categories = new Map<string, CategoryInfo>();
  const searchIndex = new Map<string, string[]>();

  if (!documents || documents.length === 0) {
    console.warn('[KG] No documents provided, returning empty graph');
    return { nodes, categories, searchIndex, frequentlyUsed: [] };
  }

  // Build nodes
  documents.forEach((doc, index) => {
    try {
      if (!doc || !doc.id || !doc.title) {
        console.warn('[KG] Skipping invalid document at index', index, doc);
        return;
      }

      const pathParts = (doc.filePath || '').split('/');
      const type = pathParts[2] === 'agents' ? 'agent' as const :
                   pathParts[2] === 'commands' ? 'command' as const : 'guide' as const;

      const category = doc.category || 'Uncategorized';
      const subcategory = category.split('/')[1] || 'General';

      const node: KnowledgeNode = {
        id: doc.id,
        title: doc.title,
        category,
        subcategory,
        type,
        tags: doc.tags || [],
        relatedIds: [], // Calculate later to avoid deep recursion
        capabilities: type === 'agent' ? AGENT_CAPABILITIES[doc.id] || [] : undefined,
        importance: determineImportance(doc),
      };

      nodes.set(doc.id, node);

      // Build search index
      indexDocument(doc, searchIndex);
    } catch (error) {
      console.error('[KG] Error processing document at index', index, error, doc);
    }
  });

  // Now calculate related documents (after all nodes exist)
  documents.forEach(doc => {
    try {
      const node = nodes.get(doc.id);
      if (node) {
        node.relatedIds = findRelatedDocuments(doc, documents);
      }
    } catch (error) {
      console.error('[KG] Error finding related documents for', doc.id, error);
    }
  });

  // Build category hierarchy
  documents.forEach(doc => {
    try {
      if (!doc || !doc.id) return;

      const category = doc.category || 'Uncategorized';

      if (!categories.has(category)) {
        const metadata = CATEGORY_METADATA[category] || {
          name: category,
          icon: '📄',
          color: 'gray',
          description: '',
        };

        categories.set(category, {
          ...metadata,
          count: 0,
          subcategories: [],
        });
      }

      const categoryInfo = categories.get(category)!;
      categoryInfo.count++;

      // Add to subcategory
      const subcategoryName = category.split('/')[1] || 'General';
      let subcategory = categoryInfo.subcategories.find(s => s.name === subcategoryName);

      if (!subcategory) {
        subcategory = {
          name: subcategoryName,
          count: 0,
          documents: [],
        };
        categoryInfo.subcategories.push(subcategory);
      }

      subcategory.count++;
      subcategory.documents.push(doc);
    } catch (error) {
      console.error('[KG] Error building category for', doc?.id, error);
    }
  });

  console.log('[KG] Graph built successfully:', {
    nodes: nodes.size,
    categories: categories.size,
    searchTerms: searchIndex.size
  });

  // Determine frequently used based on category and type
  const frequentlyUsed = documents
    .filter(doc => {
      const node = nodes.get(doc.id);
      return node?.importance === 'high';
    })
    .map(doc => doc.id)
    .slice(0, 10);

  return {
    nodes,
    categories,
    searchIndex,
    frequentlyUsed,
  };
}

/**
 * Find related documents based on tags, category, and content
 */
function findRelatedDocuments(doc: Document, allDocs: Document[]): string[] {
  const related: { id: string; score: number }[] = [];

  allDocs.forEach(other => {
    if (other.id === doc.id) return;

    let score = 0;

    // Same category: +3 points
    if (other.category === doc.category) score += 3;

    // Shared tags: +2 points per tag
    const sharedTags = (doc.tags || []).filter(tag =>
      (other.tags || []).includes(tag)
    );
    score += sharedTags.length * 2;

    // Related in file path hierarchy: +1 point
    if (doc.filePath && other.filePath && arePathsRelated(doc.filePath, other.filePath)) score += 1;

    if (score > 0) {
      related.push({ id: other.id, score });
    }
  });

  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(r => r.id);
}

/**
 * Check if two file paths are related in hierarchy
 */
function arePathsRelated(path1: string, path2: string): boolean {
  const parts1 = path1.split('/').slice(0, -1);
  const parts2 = path2.split('/').slice(0, -1);

  return parts1.some((part, idx) => parts2[idx] === part && idx >= 2);
}

/**
 * Index document for search
 */
function indexDocument(doc: Document, index: Map<string, string[]>): void {
  const terms = new Set<string>();

  // Add title words
  doc.title.toLowerCase().split(/\s+/).forEach(word => {
    if (word.length > 2) terms.add(word);
  });

  // Add tags
  (doc.tags || []).forEach(tag => terms.add(tag.toLowerCase()));

  // Add category parts
  const categoryParts = (doc.category || '').split('/');
  categoryParts.forEach(part => terms.add(part.toLowerCase()));

  // Add to index
  terms.forEach(term => {
    if (!index.has(term)) {
      index.set(term, []);
    }
    index.get(term)!.push(doc.id);
  });
}

/**
 * Determine document importance based on category and type
 */
function determineImportance(doc: Document): 'high' | 'medium' | 'low' {
  // Core agents and coordination commands are high priority
  if (doc.category?.includes('Core') ||
      doc.category?.includes('Coordination') ||
      doc.tags?.includes('core')) {
    return 'high';
  }

  // Specialized agents and advanced commands are medium
  if (doc.category?.includes('Consensus') ||
      doc.category?.includes('GitHub') ||
      doc.category?.includes('SPARC')) {
    return 'medium';
  }

  return 'low';
}

/**
 * Smart search with semantic understanding
 */
export function smartSearch(
  query: string,
  graph: KnowledgeGraph,
  documents: Document[]
): Document[] {
  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  const scores = new Map<string, number>();

  terms.forEach(term => {
    // Exact matches
    const exactMatches = graph.searchIndex.get(term) || [];
    exactMatches.forEach(id => {
      scores.set(id, (scores.get(id) || 0) + 3);
    });

    // Partial matches
    graph.searchIndex.forEach((docIds, indexTerm) => {
      if (indexTerm.includes(term) || term.includes(indexTerm)) {
        docIds.forEach(id => {
          scores.set(id, (scores.get(id) || 0) + 1);
        });
      }
    });
  });

  // Sort by score and return documents
  return Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => documents.find(d => d.id === id))
    .filter((doc): doc is Document => doc !== undefined)
    .slice(0, 20);
}

/**
 * Get search suggestions
 */
export function getSearchSuggestions(
  query: string,
  graph: KnowledgeGraph
): string[] {
  const suggestions = new Set<string>();
  const lowerQuery = query.toLowerCase();

  graph.searchIndex.forEach((_, term) => {
    if (term.startsWith(lowerQuery)) {
      suggestions.add(term);
    }
  });

  return Array.from(suggestions).slice(0, 10);
}
