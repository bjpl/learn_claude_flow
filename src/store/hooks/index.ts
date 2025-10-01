/**
 * Custom hooks barrel export
 * Provides convenient access to all store hooks
 */

// Document hooks
export {
  useCurrentDocument,
  useZoom,
  usePageNavigation,
  useViewMode,
  useDocumentLoading,
  useDocumentSelection,
} from './useDocumentState';

// UI hooks
export {
  useSidebar,
  useTheme,
  useModals,
  useLayoutPreferences,
  useNotifications,
} from './useUIState';

// Navigation hooks
export {
  useCurrentView,
  useNavigation,
  useBreadcrumbs,
  useHistory,
} from './useNavigationState';

// Search hooks
export {
  useSearch,
  useSearchFilters,
  useSearchHistory,
  useAdvancedSearch,
} from './useSearchState';

// Bookmarks and annotations hooks
export {
  useBookmarks,
  useNotes,
  useHighlights,
  useReadingProgress,
  useAnnotations,
} from './useBookmarksState';
