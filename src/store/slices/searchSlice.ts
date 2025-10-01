/**
 * Search State Slice
 * Manages search query, results, filters, and search history
 */

import type { StateCreator } from 'zustand';
import type { SearchResult } from '../../types';

export interface SearchState {
  // Search state
  searchQuery: string;
  searchResults: SearchResult[];
  isSearching: boolean;

  // Filters
  searchFilters: SearchFilters;

  // Search history
  searchHistory: string[];

  // Advanced search
  advancedSearchOpen: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: SearchResult[]) => void;
  setIsSearching: (searching: boolean) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  removeFromSearchHistory: (query: string) => void;
  setAdvancedSearchOpen: (open: boolean) => void;
  executeSearch: (query: string) => void;
  clearSearch: () => void;
}

export interface SearchFilters {
  categories: string[];
  tags: string[];
  types: ('pdf' | 'html' | 'markdown')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy: 'relevance' | 'date' | 'title';
  sortOrder: 'asc' | 'desc';
}

const DEFAULT_FILTERS: SearchFilters = {
  categories: [],
  tags: [],
  types: [],
  sortBy: 'relevance',
  sortOrder: 'desc',
};

export const createSearchSlice: StateCreator<SearchState> = (set, get) => ({
  // Initial state
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  searchFilters: DEFAULT_FILTERS,
  searchHistory: [],
  advancedSearchOpen: false,

  // Basic setters
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setSearchResults: (results) => {
    set({ searchResults: results });
  },

  setIsSearching: (searching) => {
    set({ isSearching: searching });
  },

  // Filters
  setSearchFilters: (filters) => {
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters },
    }));
  },

  resetSearchFilters: () => {
    set({ searchFilters: DEFAULT_FILTERS });
  },

  // Search history
  addToSearchHistory: (query) => {
    if (!query.trim()) return;

    set((state) => {
      // Remove duplicates and add to front
      const filtered = state.searchHistory.filter((q) => q !== query);
      const newHistory = [query, ...filtered].slice(0, 20); // Keep last 20

      return { searchHistory: newHistory };
    });
  },

  clearSearchHistory: () => {
    set({ searchHistory: [] });
  },

  removeFromSearchHistory: (query) => {
    set((state) => ({
      searchHistory: state.searchHistory.filter((q) => q !== query),
    }));
  },

  // Advanced search
  setAdvancedSearchOpen: (open) => {
    set({ advancedSearchOpen: open });
  },

  // Search execution
  executeSearch: (query) => {
    set({
      searchQuery: query,
      isSearching: true,
    });

    get().addToSearchHistory(query);

    // Note: Actual search logic should be implemented in a service/hook
    // This just manages the state
  },

  clearSearch: () => {
    set({
      searchQuery: '',
      searchResults: [],
      isSearching: false,
    });
  },
});
