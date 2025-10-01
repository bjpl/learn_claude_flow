/**
 * Custom hooks for document state
 * Provides convenient selectors and compound actions
 */

import { useCallback } from 'react';
import { useAppStore } from '../index';
import type { Document } from '../../types';

/**
 * Hook for current document and basic document actions
 */
export const useCurrentDocument = () => {
  const currentDocument = useAppStore((state) => state.currentDocument);
  const setCurrentDocument = useAppStore((state) => state.setCurrentDocument);
  const currentPage = useAppStore((state) => state.currentPage);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);

  return {
    currentDocument,
    setCurrentDocument,
    currentPage,
    setCurrentPage,
  };
};

/**
 * Hook for zoom controls
 */
export const useZoom = () => {
  const zoom = useAppStore((state) => state.zoom);
  const zoomIn = useAppStore((state) => state.zoomIn);
  const zoomOut = useAppStore((state) => state.zoomOut);
  const resetZoom = useAppStore((state) => state.resetZoom);
  const setZoom = useAppStore((state) => state.setZoom);

  return {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
    setZoom,
  };
};

/**
 * Hook for page navigation
 */
export const usePageNavigation = () => {
  const currentPage = useAppStore((state) => state.currentPage);
  const currentDocument = useAppStore((state) => state.currentDocument);
  const nextPage = useAppStore((state) => state.nextPage);
  const previousPage = useAppStore((state) => state.previousPage);
  const goToPage = useAppStore((state) => state.goToPage);

  const totalPages = currentDocument?.pageCount || 1;
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    goToPage,
  };
};

/**
 * Hook for view mode
 */
export const useViewMode = () => {
  const viewMode = useAppStore((state) => state.viewMode);
  const setViewMode = useAppStore((state) => state.setViewMode);

  return {
    viewMode,
    setViewMode,
    isSinglePage: viewMode === 'single',
    isDoublePage: viewMode === 'double',
    isScrollMode: viewMode === 'scroll',
  };
};

/**
 * Hook for document loading state
 */
export const useDocumentLoading = () => {
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const documentContent = useAppStore((state) => state.documentContent);
  const setDocumentContent = useAppStore((state) => state.setDocumentContent);

  return {
    isLoading,
    setIsLoading,
    documentContent,
    setDocumentContent,
  };
};

/**
 * Hook for document selection with progress restoration
 */
export const useDocumentSelection = () => {
  const setCurrentDocument = useAppStore((state) => state.setCurrentDocument);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const getProgress = useAppStore((state) => state.getProgress);
  const updateProgress = useAppStore((state) => state.updateProgress);

  const selectDocument = useCallback((document: Document) => {
    setCurrentDocument(document);

    // Restore reading progress
    const progress = getProgress(document.id);
    if (progress) {
      setCurrentPage(progress.currentPage);
    } else {
      setCurrentPage(1);
    }
  }, [setCurrentDocument, setCurrentPage, getProgress]);

  const selectDocumentAtPage = useCallback((document: Document, page: number) => {
    setCurrentDocument(document);
    setCurrentPage(page);

    // Update progress
    if (document.pageCount) {
      updateProgress(document.id, page, document.pageCount);
    }
  }, [setCurrentDocument, setCurrentPage, updateProgress]);

  return {
    selectDocument,
    selectDocumentAtPage,
  };
};
