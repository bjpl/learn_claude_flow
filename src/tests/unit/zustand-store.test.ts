import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppStore } from '@/store';

describe('Zustand Store', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.setTheme('light');
      result.current.setSidebarOpen(true);
      result.current.clearNotifications();
    });
  });

  describe('UI State', () => {
    it('should toggle sidebar', () => {
      const { result } = renderHook(() => useAppStore());

      expect(result.current.sidebarOpen).toBe(true);

      act(() => {
        result.current.toggleSidebar();
      });

      expect(result.current.sidebarOpen).toBe(false);
    });

    it('should set theme', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
    });

    it('should toggle theme', () => {
      const { result } = renderHook(() => useAppStore());

      expect(result.current.theme).toBe('light');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('dark');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
    });

    it('should add notification', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        result.current.addNotification({
          type: 'success',
          message: 'Test notification',
        });
      });

      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0].message).toBe('Test notification');
    });

    it('should remove notification', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        result.current.addNotification({
          type: 'success',
          message: 'Notification 1',
        });
        result.current.addNotification({
          type: 'error',
          message: 'Notification 2',
        });
      });

      expect(result.current.notifications).toHaveLength(2);

      const firstId = result.current.notifications[0].id;

      act(() => {
        result.current.removeNotification(firstId);
      });

      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0].message).toBe('Notification 2');
    });

    it('should clear all notifications', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        result.current.addNotification({ type: 'success', message: 'Test 1' });
        result.current.addNotification({ type: 'info', message: 'Test 2' });
      });

      expect(result.current.notifications).toHaveLength(2);

      act(() => {
        result.current.clearNotifications();
      });

      expect(result.current.notifications).toHaveLength(0);
    });

    it('should set sidebar width with constraints', () => {
      const { result } = renderHook(() => useAppStore());

      // Minimum width
      act(() => {
        result.current.setSidebarWidth(100);
      });
      expect(result.current.sidebarWidth).toBe(200);

      // Maximum width
      act(() => {
        result.current.setSidebarWidth(600);
      });
      expect(result.current.sidebarWidth).toBe(500);

      // Valid width
      act(() => {
        result.current.setSidebarWidth(350);
      });
      expect(result.current.sidebarWidth).toBe(350);
    });

    it('should toggle modals', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        result.current.setSmartSearchOpen(true);
      });
      expect(result.current.smartSearchOpen).toBe(true);

      act(() => {
        result.current.setSettingsOpen(true);
      });
      expect(result.current.settingsOpen).toBe(true);

      act(() => {
        result.current.setBookmarksPanelOpen(true);
      });
      expect(result.current.bookmarksPanelOpen).toBe(true);
    });

    it('should update layout preferences', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        result.current.setCompactMode(true);
      });
      expect(result.current.compactMode).toBe(true);

      act(() => {
        result.current.setShowBreadcrumbs(false);
      });
      expect(result.current.showBreadcrumbs).toBe(false);

      act(() => {
        result.current.setShowTableOfContents(false);
      });
      expect(result.current.showTableOfContents).toBe(false);
    });
  });

  describe('Performance', () => {
    it('should handle multiple rapid state updates', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        for (let i = 0; i < 100; i++) {
          result.current.toggleSidebar();
        }
      });

      // Should be closed (started true, toggled even times)
      expect(result.current.sidebarOpen).toBe(true);
    });

    it('should handle batch notifications', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.addNotification({
            type: 'info',
            message: `Notification ${i}`,
          });
        }
      });

      expect(result.current.notifications).toHaveLength(10);
    });
  });
});
