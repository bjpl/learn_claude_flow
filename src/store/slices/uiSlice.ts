/**
 * UI State Slice
 * Manages sidebar, theme, settings, modals, and UI preferences
 */

import type { StateCreator } from 'zustand';

export interface UIState {
  // Sidebar state
  sidebarOpen: boolean;
  sidebarWidth: number;

  // Theme
  theme: 'light' | 'dark';

  // Modals and overlays
  smartSearchOpen: boolean;
  settingsOpen: boolean;
  bookmarksPanelOpen: boolean;
  notesPanelOpen: boolean;

  // Layout preferences
  compactMode: boolean;
  showBreadcrumbs: boolean;
  showTableOfContents: boolean;

  // Notifications
  notifications: Notification[];

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarWidth: (width: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setSmartSearchOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setBookmarksPanelOpen: (open: boolean) => void;
  setNotesPanelOpen: (open: boolean) => void;
  setCompactMode: (compact: boolean) => void;
  setShowBreadcrumbs: (show: boolean) => void;
  setShowTableOfContents: (show: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: number;
  duration?: number;
}

export const createUISlice: StateCreator<UIState> = (set, get) => ({
  // Initial state
  sidebarOpen: true,
  sidebarWidth: 320,
  theme: 'light',
  smartSearchOpen: false,
  settingsOpen: false,
  bookmarksPanelOpen: false,
  notesPanelOpen: false,
  compactMode: false,
  showBreadcrumbs: true,
  showTableOfContents: true,
  notifications: [],

  // Sidebar actions
  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open });
  },

  setSidebarWidth: (width) => {
    set({ sidebarWidth: Math.max(200, Math.min(500, width)) });
  },

  // Theme actions
  setTheme: (theme) => {
    set({ theme });
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },

  toggleTheme: () => {
    const { theme } = get();
    const newTheme = theme === 'light' ? 'dark' : 'light';
    get().setTheme(newTheme);
  },

  // Modal actions
  setSmartSearchOpen: (open) => {
    set({ smartSearchOpen: open });
  },

  setSettingsOpen: (open) => {
    set({ settingsOpen: open });
  },

  setBookmarksPanelOpen: (open) => {
    set({ bookmarksPanelOpen: open });
  },

  setNotesPanelOpen: (open) => {
    set({ notesPanelOpen: open });
  },

  // Layout preferences
  setCompactMode: (compact) => {
    set({ compactMode: compact });
  },

  setShowBreadcrumbs: (show) => {
    set({ showBreadcrumbs: show });
  },

  setShowTableOfContents: (show) => {
    set({ showTableOfContents: show });
  },

  // Notifications
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove after duration
    if (notification.duration) {
      setTimeout(() => {
        get().removeNotification(newNotification.id);
      }, notification.duration);
    }
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },
});
