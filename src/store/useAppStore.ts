import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, Bookmark, ReadingProgress } from '../types';

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      documents: [],
      currentDocument: null,
      currentPage: 1,
      searchQuery: '',
      searchResults: [],
      isSearching: false,
      bookmarks: [],
      readingProgress: new Map(),
      sidebarOpen: true,
      theme: 'light',
      viewMode: 'single',
      zoom: 1,

      // Actions
      setCurrentDocument: (doc) => {
        set({ currentDocument: doc });
        if (doc) {
          const progress = get().readingProgress.get(doc.id);
          set({ currentPage: progress?.currentPage || 1 });
        }
      },

      setCurrentPage: (page) => {
        set({ currentPage: page });
        const { currentDocument } = get();
        if (currentDocument) {
          get().updateProgress(
            currentDocument.id,
            page,
            currentDocument.pageCount || 1
          );
        }
      },

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSearchResults: (results) => set({ searchResults: results }),

      addBookmark: (bookmark) => {
        const newBookmark: Bookmark = {
          ...bookmark,
          id: `bookmark-${Date.now()}`,
          createdAt: Date.now(),
        };
        set((state) => ({
          bookmarks: [...state.bookmarks, newBookmark],
        }));
      },

      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),

      updateProgress: (documentId, page, totalPages) => {
        const progress: ReadingProgress = {
          documentId,
          currentPage: page,
          totalPages,
          lastReadAt: Date.now(),
          completed: page >= totalPages,
        };
        set((state) => {
          const newProgress = new Map(state.readingProgress);
          newProgress.set(documentId, progress);
          return { readingProgress: newProgress };
        });
      },

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setTheme: (theme) => set({ theme }),

      setViewMode: (mode) => set({ viewMode: mode }),

      setZoom: (zoom) => set({ zoom: Math.max(0.5, Math.min(3, zoom)) }),
    }),
    {
      name: 'learn-claude-flow-storage',
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        readingProgress: Array.from(state.readingProgress.entries()),
        theme: state.theme,
        viewMode: state.viewMode,
        zoom: state.zoom,
      }),
    }
  )
);
