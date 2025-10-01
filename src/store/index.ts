/**
 * Main Zustand Store
 * Combines all slices with persist middleware
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createDocumentSlice, type DocumentState } from './slices/documentSlice';
import { createUISlice, type UIState } from './slices/uiSlice';
import { createNavigationSlice, type NavigationState } from './slices/navigationSlice';
import { createSearchSlice, type SearchState } from './slices/searchSlice';
import { createBookmarksSlice, type BookmarksState } from './slices/bookmarksSlice';

// Combined store type
export type AppStore = DocumentState & UIState & NavigationState & SearchState & BookmarksState;

// Create the store with all slices
export const useAppStore = create<AppStore>()(
  persist(
    (...args) => ({
      ...createDocumentSlice(...args),
      ...createUISlice(...args),
      ...createNavigationSlice(...args),
      ...createSearchSlice(...args),
      ...createBookmarksSlice(...args),
    }),
    {
      name: 'learn-claude-flow-storage',
      storage: createJSONStorage(() => localStorage),

      // Partition: only persist specific parts of the store
      partialize: (state) => ({
        // UI preferences
        theme: state.theme,
        sidebarWidth: state.sidebarWidth,
        compactMode: state.compactMode,
        showBreadcrumbs: state.showBreadcrumbs,
        showTableOfContents: state.showTableOfContents,

        // Document preferences
        zoom: state.zoom,
        viewMode: state.viewMode,

        // User data
        bookmarks: state.bookmarks,
        notes: state.notes,
        highlights: state.highlights,
        readingProgress: Array.from(state.readingProgress.entries()),

        // Search history
        searchHistory: state.searchHistory,
        searchFilters: state.searchFilters,

        // Navigation history
        history: state.history,
      }),

      // Custom deserializer for Map types
      merge: (persistedState, currentState) => {
        const merged = { ...currentState, ...(persistedState as Partial<AppStore>) } as AppStore;

        // Restore Map from persisted array
        if (persistedState && typeof persistedState === 'object' && 'readingProgress' in persistedState) {
          const progressArray = (persistedState as any).readingProgress;
          if (Array.isArray(progressArray)) {
            merged.readingProgress = new Map(progressArray);
          }
        }

        return merged;
      },
    }
  )
);

// Export slice types for convenience
export type {
  DocumentState,
  UIState,
  NavigationState,
  SearchState,
  BookmarksState,
};
