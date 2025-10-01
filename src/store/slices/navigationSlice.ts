/**
 * Navigation State Slice
 * Manages breadcrumbs, history, current view, and navigation state
 */

import type { StateCreator } from 'zustand';
import type { Breadcrumb } from '../../types';

export type View = 'overview' | 'category' | 'document';

export interface NavigationState {
  // Current view state
  currentView: View;
  selectedCategory: string | null;

  // Breadcrumbs
  breadcrumbs: Breadcrumb[];

  // History
  history: HistoryEntry[];
  historyIndex: number;

  // Actions
  setCurrentView: (view: View) => void;
  setSelectedCategory: (category: string | null) => void;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  addBreadcrumb: (breadcrumb: Breadcrumb) => void;
  navigateToCategory: (category: string) => void;
  navigateToDocument: (documentId: string) => void;
  navigateToOverview: () => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
  addToHistory: (entry: Omit<HistoryEntry, 'timestamp'>) => void;
  clearHistory: () => void;
}

interface HistoryEntry {
  view: View;
  documentId?: string;
  category?: string;
  page?: number;
  timestamp: number;
}

export const createNavigationSlice: StateCreator<NavigationState> = (set, get) => ({
  // Initial state
  currentView: 'overview',
  selectedCategory: null,
  breadcrumbs: [],
  history: [],
  historyIndex: -1,

  // View management
  setCurrentView: (view) => {
    set({ currentView: view });
    get().addToHistory({ view });
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },

  // Breadcrumbs management
  setBreadcrumbs: (breadcrumbs) => {
    set({ breadcrumbs });
  },

  addBreadcrumb: (breadcrumb) => {
    set((state) => ({
      breadcrumbs: [...state.breadcrumbs, breadcrumb],
    }));
  },

  // Navigation actions
  navigateToCategory: (category) => {
    set({
      currentView: 'category',
      selectedCategory: category,
    });
    get().addToHistory({ view: 'category', category });
  },

  navigateToDocument: (documentId) => {
    set({
      currentView: 'document',
    });
    get().addToHistory({ view: 'document', documentId });
  },

  navigateToOverview: () => {
    set({
      currentView: 'overview',
      selectedCategory: null,
    });
    get().addToHistory({ view: 'overview' });
  },

  // History navigation
  goBack: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const entry = history[newIndex];

      set({
        historyIndex: newIndex,
        currentView: entry.view,
        selectedCategory: entry.category || null,
      });
    }
  },

  goForward: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const entry = history[newIndex];

      set({
        historyIndex: newIndex,
        currentView: entry.view,
        selectedCategory: entry.category || null,
      });
    }
  },

  canGoBack: () => {
    const { historyIndex } = get();
    return historyIndex > 0;
  },

  canGoForward: () => {
    const { history, historyIndex } = get();
    return historyIndex < history.length - 1;
  },

  addToHistory: (entry) => {
    const { history, historyIndex } = get();

    // Remove any forward history when adding new entry
    const newHistory = history.slice(0, historyIndex + 1);

    const newEntry: HistoryEntry = {
      ...entry,
      timestamp: Date.now(),
    };

    set({
      history: [...newHistory, newEntry],
      historyIndex: newHistory.length,
    });

    // Limit history to 50 entries
    if (newHistory.length > 50) {
      set({
        history: newHistory.slice(-50),
        historyIndex: 49,
      });
    }
  },

  clearHistory: () => {
    set({
      history: [],
      historyIndex: -1,
    });
  },
});
