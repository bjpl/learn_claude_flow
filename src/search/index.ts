/**
 * Search Module Exports
 * Central export point for all search functionality
 */

export { intelligentSearch, IntelligentSearchEngine } from './intelligentSearch';
export type {
  SearchIndex,
  IntelligentSearchResult,
  SearchMatch,
  RelevanceFactors,
  SearchFilters,
  SearchSuggestion,
} from './intelligentSearch';

export {
  SEMANTIC_MAPPINGS,
  COMMAND_PATTERNS,
  AGENT_CAPABILITIES,
  CATEGORY_FILTERS,
} from './semanticMappings';
export type { SemanticMapping } from './semanticMappings';

export { buildSearchIndex, saveSearchIndex, generateSearchIndex } from './buildIndex';
export type { IndexedDocument } from './buildIndex';
