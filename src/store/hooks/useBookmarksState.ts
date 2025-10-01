/**
 * Custom hooks for bookmarks and notes state
 * Provides convenient selectors for annotations and progress
 */

import { useMemo } from 'react';
import { useAppStore } from '../index';

/**
 * Hook for bookmarks
 */
export const useBookmarks = (documentId?: string) => {
  const bookmarks = useAppStore((state) => state.bookmarks);
  const addBookmark = useAppStore((state) => state.addBookmark);
  const removeBookmark = useAppStore((state) => state.removeBookmark);
  const updateBookmark = useAppStore((state) => state.updateBookmark);
  const clearBookmarks = useAppStore((state) => state.clearBookmarks);

  const documentBookmarks = useMemo(() => {
    if (!documentId) return bookmarks;
    return bookmarks.filter((b) => b.documentId === documentId);
  }, [bookmarks, documentId]);

  return {
    bookmarks: documentBookmarks,
    allBookmarks: bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark,
    clearBookmarks,
    count: documentBookmarks.length,
    hasBookmarks: documentBookmarks.length > 0,
  };
};

/**
 * Hook for notes
 */
export const useNotes = (documentId?: string) => {
  const notes = useAppStore((state) => state.notes);
  const addNote = useAppStore((state) => state.addNote);
  const updateNote = useAppStore((state) => state.updateNote);
  const removeNote = useAppStore((state) => state.removeNote);
  const clearNotes = useAppStore((state) => state.clearNotes);

  const documentNotes = useMemo(() => {
    if (!documentId) return notes;
    return notes.filter((n) => n.documentId === documentId);
  }, [notes, documentId]);

  return {
    notes: documentNotes,
    allNotes: notes,
    addNote,
    updateNote,
    removeNote,
    clearNotes,
    count: documentNotes.length,
    hasNotes: documentNotes.length > 0,
  };
};

/**
 * Hook for highlights
 */
export const useHighlights = (documentId?: string) => {
  const highlights = useAppStore((state) => state.highlights);
  const addHighlight = useAppStore((state) => state.addHighlight);
  const removeHighlight = useAppStore((state) => state.removeHighlight);
  const clearHighlights = useAppStore((state) => state.clearHighlights);

  const documentHighlights = useMemo(() => {
    if (!documentId) return [];
    return highlights[documentId] || [];
  }, [highlights, documentId]);

  return {
    highlights: documentHighlights,
    allHighlights: highlights,
    addHighlight,
    removeHighlight,
    clearHighlights,
    count: documentHighlights.length,
    hasHighlights: documentHighlights.length > 0,
  };
};

/**
 * Hook for reading progress
 */
export const useReadingProgress = (documentId?: string) => {
  const readingProgress = useAppStore((state) => state.readingProgress);
  const updateProgress = useAppStore((state) => state.updateProgress);
  const getProgress = useAppStore((state) => state.getProgress);
  const clearProgress = useAppStore((state) => state.clearProgress);
  const markAsCompleted = useAppStore((state) => state.markAsCompleted);

  const currentProgress = useMemo(() => {
    if (!documentId) return undefined;
    return readingProgress.get(documentId);
  }, [readingProgress, documentId]);

  const progressPercentage = useMemo(() => {
    if (!currentProgress) return 0;
    return Math.round((currentProgress.currentPage / currentProgress.totalPages) * 100);
  }, [currentProgress]);

  return {
    progress: currentProgress,
    allProgress: readingProgress,
    updateProgress,
    getProgress,
    clearProgress,
    markAsCompleted,
    percentage: progressPercentage,
    isCompleted: currentProgress?.completed || false,
  };
};

/**
 * Hook for all annotations (bookmarks + notes + highlights)
 */
export const useAnnotations = (documentId?: string) => {
  const { bookmarks, count: bookmarksCount } = useBookmarks(documentId);
  const { notes, count: notesCount } = useNotes(documentId);
  const { highlights, count: highlightsCount } = useHighlights(documentId);

  const totalCount = bookmarksCount + notesCount + highlightsCount;

  return {
    bookmarks,
    notes,
    highlights,
    totalCount,
    hasAnnotations: totalCount > 0,
    counts: {
      bookmarks: bookmarksCount,
      notes: notesCount,
      highlights: highlightsCount,
    },
  };
};
