/**
 * Intelligent Search Engine
 * Advanced search with semantic understanding, ranking, and suggestions
 */

import Fuse, { FuseResult } from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';
import {
  SEMANTIC_MAPPINGS,
  AGENT_CAPABILITIES,
} from './semanticMappings';
import type { Document } from '../types/document';

export interface SearchIndex {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  filePath: string;
  type: string;
  capabilities?: string[];
  commandSyntax?: string[];
}

export interface IntelligentSearchResult {
  document: Document;
  score: number;
  matches: SearchMatch[];
  relevanceFactors: RelevanceFactors;
  snippet: string;
}

export interface SearchMatch {
  field: string;
  value: string;
  indices: [number, number][];
}

export interface RelevanceFactors {
  titleMatch: boolean;
  semanticBoost: number;
  categoryMatch: boolean;
  tagMatch: number;
  contentMatch: boolean;
  capabilityMatch: number;
  commandMatch: boolean;
}

export interface SearchFilters {
  categories?: string[];
  tags?: string[];
  types?: string[];
  capabilities?: string[];
}

export interface SearchSuggestion {
  text: string;
  type: 'query' | 'document' | 'category' | 'tag';
  score: number;
}

/**
 * Intelligent Search Engine with semantic understanding
 */
export class IntelligentSearchEngine {
  private fuseInstance: Fuse<SearchIndex> | null = null;
  private searchIndex: SearchIndex[] = [];
  private searchHistory: Map<string, number> = new Map();

  /**
   * Initialize search engine with document index
   */
  initialize(documents: Document[], contents: Map<string, string>): void {
    // Build search index
    this.searchIndex = documents.map((doc) => {
      const content = contents.get(doc.id) || '';

      return {
        id: doc.id,
        title: doc.title,
        description: doc.description || '',
        content,
        category: doc.category || '',
        tags: doc.tags || [],
        filePath: doc.filePath,
        type: doc.type,
        capabilities: this.extractCapabilities(doc, content),
        commandSyntax: this.extractCommandSyntax(content),
      };
    });

    // Configure Fuse.js with extended options
    const options: IFuseOptions<SearchIndex> = {
      keys: [
        { name: 'title', weight: 3.0 },
        { name: 'description', weight: 2.0 },
        { name: 'tags', weight: 1.5 },
        { name: 'content', weight: 1.0 },
        { name: 'capabilities', weight: 1.8 },
        { name: 'commandSyntax', weight: 1.6 },
      ],
      includeScore: true,
      includeMatches: true,
      threshold: 0.4,
      location: 0,
      distance: 200,
      minMatchCharLength: 2,
      ignoreLocation: false,
      useExtendedSearch: true,
      findAllMatches: true,
    };

    this.fuseInstance = new Fuse(this.searchIndex, options);
  }

  /**
   * Perform intelligent search with semantic understanding
   */
  search(
    query: string,
    filters?: SearchFilters,
    limit: number = 50
  ): IntelligentSearchResult[] {
    if (!this.fuseInstance || !query.trim()) {
      return [];
    }

    // Track search in history
    this.searchHistory.set(query, (this.searchHistory.get(query) || 0) + 1);

    // Apply semantic mappings
    const semanticTargets = this.getSemanticTargets(query);
    const semanticBoostMap = new Map(semanticTargets);

    // Perform base search
    let results = this.fuseInstance.search(query, { limit: limit * 2 });

    // Apply semantic boosting
    results = results.map((result) => {
      const fileName = result.item.filePath.split('/').pop() || '';
      const semanticBoost = semanticBoostMap.get(fileName) || 1.0;

      return {
        ...result,
        score: (result.score || 0) / semanticBoost, // Lower score is better in Fuse.js
      };
    });

    // Re-sort by adjusted scores
    results.sort((a, b) => (a.score || 0) - (b.score || 0));

    // Apply filters
    if (filters) {
      results = this.applyFilters(results, filters);
    }

    // Convert to IntelligentSearchResult
    const intelligentResults: IntelligentSearchResult[] = results
      .slice(0, limit)
      .map((result) => {
        const relevanceFactors = this.calculateRelevance(
          result,
          query,
          semanticBoostMap
        );
        const snippet = this.generateSnippet(result.item.content, query);

        // Find original document
        const document: Document = {
          id: result.item.id,
          title: result.item.title,
          filePath: result.item.filePath,
          type: result.item.type as 'pdf' | 'markdown' | 'html',
          category: result.item.category,
          tags: result.item.tags,
          description: result.item.description,
        };

        return {
          document,
          score: result.score || 0,
          matches:
            result.matches?.map((match) => ({
              field: match.key || '',
              value: match.value || '',
              indices: [...(match.indices || [])] as [number, number][],
            })) || [],
          relevanceFactors,
          snippet,
        };
      });

    return intelligentResults;
  }

  /**
   * Get search suggestions based on partial query
   */
  getSuggestions(query: string, limit: number = 5): SearchSuggestion[] {
    if (!query || query.length < 2) {
      return this.getPopularSearches(limit);
    }

    const suggestions: SearchSuggestion[] = [];
    const lowerQuery = query.toLowerCase();

    // Document title suggestions
    this.searchIndex
      .filter((item) => item.title.toLowerCase().includes(lowerQuery))
      .slice(0, 3)
      .forEach((item) => {
        suggestions.push({
          text: item.title,
          type: 'document',
          score: 2.0,
        });
      });

    // Category suggestions
    const uniqueCategories = [...new Set(this.searchIndex.map((i) => i.category))];
    uniqueCategories
      .filter((cat) => cat.toLowerCase().includes(lowerQuery))
      .slice(0, 2)
      .forEach((cat) => {
        suggestions.push({
          text: cat,
          type: 'category',
          score: 1.5,
        });
      });

    // Tag suggestions
    const allTags = new Set<string>();
    this.searchIndex.forEach((item) => item.tags.forEach((tag) => allTags.add(tag)));
    Array.from(allTags)
      .filter((tag) => tag.toLowerCase().includes(lowerQuery))
      .slice(0, 2)
      .forEach((tag) => {
        suggestions.push({
          text: tag,
          type: 'tag',
          score: 1.2,
        });
      });

    // Sort by score and limit
    return suggestions.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  /**
   * Get "Did you mean?" suggestions for potential typos
   */
  getDidYouMean(query: string): string[] {
    const suggestions: string[] = [];
    const words = query.toLowerCase().split(/\s+/);

    // Check against common terms
    const commonTerms = [
      'swarm',
      'agent',
      'spawn',
      'review',
      'test',
      'github',
      'consensus',
      'sparc',
      'architecture',
      'performance',
    ];

    words.forEach((word) => {
      commonTerms.forEach((term) => {
        if (this.levenshteinDistance(word, term) === 1) {
          suggestions.push(query.replace(new RegExp(word, 'i'), term));
        }
      });
    });

    return [...new Set(suggestions)].slice(0, 3);
  }

  /**
   * Get popular searches from history
   */
  getPopularSearches(limit: number = 5): SearchSuggestion[] {
    return Array.from(this.searchHistory.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([text, count]) => ({
        text,
        type: 'query' as const,
        score: count,
      }));
  }

  /**
   * Get semantic targets for query
   */
  private getSemanticTargets(query: string): [string, number][] {
    const targets: [string, number][] = [];

    SEMANTIC_MAPPINGS.forEach((mapping) => {
      if (mapping.patterns.some((pattern) => pattern.test(query))) {
        mapping.targets.forEach((target) => {
          targets.push([target, mapping.boost]);
        });
      }
    });

    return targets;
  }

  /**
   * Apply search filters
   */
  private applyFilters(
    results: FuseResult<SearchIndex>[],
    filters: SearchFilters
  ): FuseResult<SearchIndex>[] {
    let filtered = results;

    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter((r) =>
        filters.categories!.some((cat) => r.item.category.includes(cat))
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((r) =>
        filters.tags!.some((tag) => r.item.tags.includes(tag))
      );
    }

    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter((r) => filters.types!.includes(r.item.type));
    }

    if (filters.capabilities && filters.capabilities.length > 0) {
      filtered = filtered.filter((r) =>
        filters.capabilities!.some((cap) => r.item.capabilities?.includes(cap))
      );
    }

    return filtered;
  }

  /**
   * Calculate relevance factors
   */
  private calculateRelevance(
    result: FuseResult<SearchIndex>,
    query: string,
    semanticBoost: Map<string, number>
  ): RelevanceFactors {
    const item = result.item;
    const lowerQuery = query.toLowerCase();
    const fileName = item.filePath.split('/').pop() || '';

    return {
      titleMatch: item.title.toLowerCase().includes(lowerQuery),
      semanticBoost: semanticBoost.get(fileName) || 1.0,
      categoryMatch: item.category.toLowerCase().includes(lowerQuery),
      tagMatch: item.tags.filter((tag: string) => tag.toLowerCase().includes(lowerQuery))
        .length,
      contentMatch:
        result.matches?.some((m: any) => m.key === 'content') || false,
      capabilityMatch:
        item.capabilities?.filter((cap: string) => cap.toLowerCase().includes(lowerQuery))
          .length || 0,
      commandMatch:
        item.commandSyntax?.some((cmd: string) => cmd.toLowerCase().includes(lowerQuery)) ||
        false,
    };
  }

  /**
   * Generate snippet from content
   */
  private generateSnippet(content: string, query: string, length: number = 200): string {
    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);

    if (index === -1) {
      return content.substring(0, length) + '...';
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + length);
    let snippet = content.substring(start, end);

    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';

    return snippet;
  }

  /**
   * Extract capabilities from document
   */
  private extractCapabilities(doc: Document, _content: string): string[] {
    const capabilities: string[] = [];

    // Check agent capabilities mapping
    const agentId = doc.id;
    if (AGENT_CAPABILITIES[agentId]) {
      capabilities.push(...AGENT_CAPABILITIES[agentId]);
    }

    // Extract from tags
    if (doc.tags) {
      capabilities.push(...doc.tags);
    }

    return [...new Set(capabilities)];
  }

  /**
   * Extract command syntax from content
   */
  private extractCommandSyntax(content: string): string[] {
    const commands: string[] = [];
    const codeBlockRegex = /```(?:bash|sh|shell)?\s*([\s\S]*?)```/g;

    let match;
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const code = match[1];
      const lines = code.split('\n');

      lines.forEach((line) => {
        if (
          line.includes('npx claude-flow') ||
          line.includes('mcp__claude-flow')
        ) {
          commands.push(line.trim());
        }
      });
    }

    return commands;
  }

  /**
   * Calculate Levenshtein distance for typo detection
   */
  private levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }
}

/**
 * Singleton instance
 */
export const intelligentSearch = new IntelligentSearchEngine();
