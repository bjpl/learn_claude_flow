/**
 * Custom hooks for UI state
 * Provides convenient selectors for UI controls
 */

import { useAppStore } from '../index';

/**
 * Hook for sidebar state
 */
export const useSidebar = () => {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
  const sidebarWidth = useAppStore((state) => state.sidebarWidth);
  const setSidebarWidth = useAppStore((state) => state.setSidebarWidth);

  return {
    sidebarOpen,
    toggleSidebar,
    setSidebarOpen,
    sidebarWidth,
    setSidebarWidth,
  };
};

/**
 * Hook for theme state
 */
export const useTheme = () => {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
};

/**
 * Hook for modals state
 */
export const useModals = () => {
  const smartSearchOpen = useAppStore((state) => state.smartSearchOpen);
  const setSmartSearchOpen = useAppStore((state) => state.setSmartSearchOpen);
  const settingsOpen = useAppStore((state) => state.settingsOpen);
  const setSettingsOpen = useAppStore((state) => state.setSettingsOpen);
  const bookmarksPanelOpen = useAppStore((state) => state.bookmarksPanelOpen);
  const setBookmarksPanelOpen = useAppStore((state) => state.setBookmarksPanelOpen);
  const notesPanelOpen = useAppStore((state) => state.notesPanelOpen);
  const setNotesPanelOpen = useAppStore((state) => state.setNotesPanelOpen);

  return {
    smartSearchOpen,
    setSmartSearchOpen,
    settingsOpen,
    setSettingsOpen,
    bookmarksPanelOpen,
    setBookmarksPanelOpen,
    notesPanelOpen,
    setNotesPanelOpen,
  };
};

/**
 * Hook for layout preferences
 */
export const useLayoutPreferences = () => {
  const compactMode = useAppStore((state) => state.compactMode);
  const setCompactMode = useAppStore((state) => state.setCompactMode);
  const showBreadcrumbs = useAppStore((state) => state.showBreadcrumbs);
  const setShowBreadcrumbs = useAppStore((state) => state.setShowBreadcrumbs);
  const showTableOfContents = useAppStore((state) => state.showTableOfContents);
  const setShowTableOfContents = useAppStore((state) => state.setShowTableOfContents);

  return {
    compactMode,
    setCompactMode,
    showBreadcrumbs,
    setShowBreadcrumbs,
    showTableOfContents,
    setShowTableOfContents,
  };
};

/**
 * Hook for notifications
 */
export const useNotifications = () => {
  const notifications = useAppStore((state) => state.notifications);
  const addNotification = useAppStore((state) => state.addNotification);
  const removeNotification = useAppStore((state) => state.removeNotification);
  const clearNotifications = useAppStore((state) => state.clearNotifications);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };
};
