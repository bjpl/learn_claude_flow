/**
 * Custom hooks for search state
 * Provides convenient selectors for search functionality
 */

import { useCallback } from 'react';
import { useAppStore } from '../index';

/**
 * Hook for basic search state
 */
export const useSearch = () => {
  const searchQuery = useAppStore((state) => state.searchQuery);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);
  const searchResults = useAppStore((state) => state.searchResults);
  const setSearchResults = useAppStore((state) => state.setSearchResults);
  const isSearching = useAppStore((state) => state.isSearching);
  const setIsSearching = useAppStore((state) => state.setIsSearching);
  const executeSearch = useAppStore((state) => state.executeSearch);
  const clearSearch = useAppStore((state) => state.clearSearch);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    executeSearch,
    clearSearch,
    hasResults: searchResults.length > 0,
    resultsCount: searchResults.length,
  };
};

/**
 * Hook for search filters
 */
export const useSearchFilters = () => {
  const searchFilters = useAppStore((state) => state.searchFilters);
  const setSearchFilters = useAppStore((state) => state.setSearchFilters);
  const resetSearchFilters = useAppStore((state) => state.resetSearchFilters);

  const hasActiveFilters = useCallback(() => {
    return (
      searchFilters.categories.length > 0 ||
      searchFilters.tags.length > 0 ||
      searchFilters.types.length > 0 ||
      !!searchFilters.dateRange
    );
  }, [searchFilters]);

  return {
    searchFilters,
    setSearchFilters,
    resetSearchFilters,
    hasActiveFilters: hasActiveFilters(),
  };
};

/**
 * Hook for search history
 */
export const useSearchHistory = () => {
  const searchHistory = useAppStore((state) => state.searchHistory);
  const addToSearchHistory = useAppStore((state) => state.addToSearchHistory);
  const clearSearchHistory = useAppStore((state) => state.clearSearchHistory);
  const removeFromSearchHistory = useAppStore((state) => state.removeFromSearchHistory);

  return {
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    removeFromSearchHistory,
    hasHistory: searchHistory.length > 0,
  };
};

/**
 * Hook for advanced search
 */
export const useAdvancedSearch = () => {
  const advancedSearchOpen = useAppStore((state) => state.advancedSearchOpen);
  const setAdvancedSearchOpen = useAppStore((state) => state.setAdvancedSearchOpen);
  const searchFilters = useAppStore((state) => state.searchFilters);
  const setSearchFilters = useAppStore((state) => state.setSearchFilters);

  return {
    advancedSearchOpen,
    setAdvancedSearchOpen,
    searchFilters,
    setSearchFilters,
  };
};
