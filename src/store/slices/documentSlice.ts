/**
 * Document State Slice
 * Manages current document, page navigation, zoom, and view modes
 */

import type { StateCreator } from 'zustand';
import type { Document } from '../../types';

export interface DocumentState {
  // State
  currentDocument: Document | null;
  currentPage: number;
  zoom: number;
  viewMode: 'single' | 'double' | 'scroll';
  documentContent: string;
  isLoading: boolean;

  // Actions
  setCurrentDocument: (doc: Document | null) => void;
  setCurrentPage: (page: number) => void;
  setZoom: (zoom: number) => void;
  setViewMode: (mode: 'single' | 'double' | 'scroll') => void;
  setDocumentContent: (content: string) => void;
  setIsLoading: (loading: boolean) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
}

export const createDocumentSlice: StateCreator<DocumentState> = (set, get) => ({
  // Initial state
  currentDocument: null,
  currentPage: 1,
  zoom: 1.0,
  viewMode: 'single',
  documentContent: '',
  isLoading: false,

  // Basic setters
  setCurrentDocument: (doc) => {
    set({
      currentDocument: doc,
      currentPage: 1,
      documentContent: '',
    });
  },

  setCurrentPage: (page) => {
    const { currentDocument } = get();
    const maxPage = currentDocument?.pageCount || 1;
    set({ currentPage: Math.max(1, Math.min(page, maxPage)) });
  },

  setZoom: (zoom) => {
    set({ zoom: Math.max(0.5, Math.min(3, zoom)) });
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
  },

  setDocumentContent: (content) => {
    set({ documentContent: content });
  },

  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },

  // Zoom controls
  zoomIn: () => {
    const { zoom } = get();
    set({ zoom: Math.min(3, zoom + 0.1) });
  },

  zoomOut: () => {
    const { zoom } = get();
    set({ zoom: Math.max(0.5, zoom - 0.1) });
  },

  resetZoom: () => {
    set({ zoom: 1.0 });
  },

  // Page navigation
  nextPage: () => {
    const { currentPage, currentDocument } = get();
    const maxPage = currentDocument?.pageCount || 1;
    if (currentPage < maxPage) {
      set({ currentPage: currentPage + 1 });
    }
  },

  previousPage: () => {
    const { currentPage } = get();
    if (currentPage > 1) {
      set({ currentPage: currentPage - 1 });
    }
  },

  goToPage: (page) => {
    const { currentDocument } = get();
    const maxPage = currentDocument?.pageCount || 1;
    set({ currentPage: Math.max(1, Math.min(page, maxPage)) });
  },
});
