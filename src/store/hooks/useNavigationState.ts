/**
 * Custom hooks for navigation state
 * Provides convenient selectors for navigation and history
 */

import { useAppStore } from '../index';

/**
 * Hook for current view state
 */
export const useCurrentView = () => {
  const currentView = useAppStore((state) => state.currentView);
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);

  return {
    currentView,
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    isOverview: currentView === 'overview',
    isCategory: currentView === 'category',
    isDocument: currentView === 'document',
  };
};

/**
 * Hook for navigation actions
 */
export const useNavigation = () => {
  const navigateToCategory = useAppStore((state) => state.navigateToCategory);
  const navigateToDocument = useAppStore((state) => state.navigateToDocument);
  const navigateToOverview = useAppStore((state) => state.navigateToOverview);

  return {
    navigateToCategory,
    navigateToDocument,
    navigateToOverview,
  };
};

/**
 * Hook for breadcrumbs
 */
export const useBreadcrumbs = () => {
  const breadcrumbs = useAppStore((state) => state.breadcrumbs);
  const setBreadcrumbs = useAppStore((state) => state.setBreadcrumbs);
  const addBreadcrumb = useAppStore((state) => state.addBreadcrumb);

  return {
    breadcrumbs,
    setBreadcrumbs,
    addBreadcrumb,
  };
};

/**
 * Hook for history navigation
 */
export const useHistory = () => {
  const history = useAppStore((state) => state.history);
  const historyIndex = useAppStore((state) => state.historyIndex);
  const goBack = useAppStore((state) => state.goBack);
  const goForward = useAppStore((state) => state.goForward);
  const canGoBack = useAppStore((state) => state.canGoBack);
  const canGoForward = useAppStore((state) => state.canGoForward);
  const clearHistory = useAppStore((state) => state.clearHistory);

  return {
    history,
    historyIndex,
    goBack,
    goForward,
    canGoBack: canGoBack(),
    canGoForward: canGoForward(),
    clearHistory,
  };
};
