/**
 * Bookmarks and Notes State Slice
 * Manages bookmarks, notes, highlights, and reading progress
 */

import type { StateCreator } from 'zustand';
import type { Bookmark, Note, ReadingProgress, TextHighlight } from '../../types';

export interface BookmarksState {
  // Bookmarks
  bookmarks: Bookmark[];

  // Notes
  notes: Note[];

  // Highlights
  highlights: Record<string, TextHighlight[]>;

  // Reading progress
  readingProgress: Map<string, ReadingProgress>;

  // Actions - Bookmarks
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, updates: Partial<Bookmark>) => void;
  getBookmarksForDocument: (documentId: string) => Bookmark[];
  clearBookmarks: () => void;

  // Actions - Notes
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, content: string) => void;
  removeNote: (id: string) => void;
  getNotesForDocument: (documentId: string) => Note[];
  clearNotes: () => void;

  // Actions - Highlights
  addHighlight: (documentId: string, highlight: TextHighlight) => void;
  removeHighlight: (documentId: string, start: number, end: number) => void;
  getHighlightsForDocument: (documentId: string) => TextHighlight[];
  clearHighlights: (documentId: string) => void;

  // Actions - Progress
  updateProgress: (documentId: string, page: number, totalPages: number) => void;
  getProgress: (documentId: string) => ReadingProgress | undefined;
  clearProgress: (documentId: string) => void;
  markAsCompleted: (documentId: string) => void;
}

export const createBookmarksSlice: StateCreator<BookmarksState> = (set, get) => ({
  // Initial state
  bookmarks: [],
  notes: [],
  highlights: {},
  readingProgress: new Map(),

  // Bookmarks actions
  addBookmark: (bookmark) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `bookmark-${Date.now()}-${Math.random()}`,
      createdAt: Date.now(),
    };

    set((state) => ({
      bookmarks: [...state.bookmarks, newBookmark],
    }));
  },

  removeBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    }));
  },

  updateBookmark: (id, updates) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    }));
  },

  getBookmarksForDocument: (documentId) => {
    return get().bookmarks.filter((b) => b.documentId === documentId);
  },

  clearBookmarks: () => {
    set({ bookmarks: [] });
  },

  // Notes actions
  addNote: (note) => {
    const now = new Date();
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}-${Math.random()}`,
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({
      notes: [...state.notes, newNote],
    }));
  },

  updateNote: (id, content) => {
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id
          ? { ...n, content, updatedAt: new Date() }
          : n
      ),
    }));
  },

  removeNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    }));
  },

  getNotesForDocument: (documentId) => {
    return get().notes.filter((n) => n.documentId === documentId);
  },

  clearNotes: () => {
    set({ notes: [] });
  },

  // Highlights actions
  addHighlight: (documentId, highlight) => {
    set((state) => {
      const docHighlights = state.highlights[documentId] || [];
      return {
        highlights: {
          ...state.highlights,
          [documentId]: [...docHighlights, highlight],
        },
      };
    });
  },

  removeHighlight: (documentId, start, end) => {
    set((state) => {
      const docHighlights = state.highlights[documentId] || [];
      return {
        highlights: {
          ...state.highlights,
          [documentId]: docHighlights.filter(
            (h) => !(h.start === start && h.end === end)
          ),
        },
      };
    });
  },

  getHighlightsForDocument: (documentId) => {
    return get().highlights[documentId] || [];
  },

  clearHighlights: (documentId) => {
    set((state) => {
      const newHighlights = { ...state.highlights };
      delete newHighlights[documentId];
      return { highlights: newHighlights };
    });
  },

  // Progress actions
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

  getProgress: (documentId) => {
    return get().readingProgress.get(documentId);
  },

  clearProgress: (documentId) => {
    set((state) => {
      const newProgress = new Map(state.readingProgress);
      newProgress.delete(documentId);
      return { readingProgress: newProgress };
    });
  },

  markAsCompleted: (documentId) => {
    const progress = get().getProgress(documentId);
    if (progress) {
      get().updateProgress(documentId, progress.totalPages, progress.totalPages);
    }
  },
});
