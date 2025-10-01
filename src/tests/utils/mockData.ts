export const mockDocument = {
  id: 'test-doc',
  title: 'Test Document',
  path: '/docs/test.md',
  content: '# Test Content',
  type: 'markdown' as const,
};

export const mockBookmark = {
  id: 'bookmark-1',
  documentId: 'test-doc',
  pageNumber: 1,
  title: 'Test Bookmark',
  timestamp: Date.now(),
};

export const mockSearchResult = {
  documentId: 'test-doc',
  title: 'Test Result',
  excerpt: 'This is a test excerpt',
  score: 0.9,
  matches: ['test'],
};

export const mockUIState = {
  sidebarOpen: true,
  sidebarWidth: 320,
  theme: 'light' as const,
  smartSearchOpen: false,
  settingsOpen: false,
  bookmarksPanelOpen: false,
  notesPanelOpen: false,
  compactMode: false,
  showBreadcrumbs: true,
  showTableOfContents: true,
  notifications: [],
};

export const createMockNotification = (overrides = {}) => ({
  id: `notification-${Date.now()}`,
  type: 'info' as const,
  message: 'Test notification',
  timestamp: Date.now(),
  ...overrides,
});
