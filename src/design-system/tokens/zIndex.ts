/**
 * Design System - Z-Index Tokens
 *
 * Layering system for managing stacking context and element hierarchy.
 * Prevents z-index conflicts and maintains consistent layering.
 */

/**
 * Z-Index Scale
 * Organized by logical layers in the UI
 */
export const zIndex = {
  // Base layer (default document flow)
  base: 0,
  behind: -1,

  // Content layers (1-99)
  content: 1,
  contentRaised: 10,

  // UI chrome layers (100-999)
  sticky: 100,         // Sticky elements (headers, sidebars)
  fixed: 200,          // Fixed position elements
  overlay: 300,        // Overlays and masks
  dropdown: 400,       // Dropdown menus
  tooltip: 500,        // Tooltips and popovers
  header: 600,         // Site header/navbar
  sidebar: 700,        // Sidebar navigation

  // Modal layers (1000-1999)
  modalBackdrop: 1000, // Modal backdrop/overlay
  modal: 1050,         // Modal dialogs
  drawer: 1100,        // Slide-out drawers
  sheet: 1150,         // Bottom sheets

  // Notification layers (2000-2999)
  toast: 2000,         // Toast notifications
  snackbar: 2100,      // Snackbar messages
  banner: 2200,        // Notification banners

  // Critical layers (3000+)
  criticalPopover: 3000, // Critical popovers
  contextMenu: 3100,   // Context menus
  criticalTooltip: 3200, // Critical tooltips
  loading: 3300,       // Loading overlays

  // Maximum layer (for debugging or absolutely critical elements)
  max: 9999,
} as const;

/**
 * Semantic Z-Index Groups
 * Organized by component type for easier usage
 */
export const semanticZIndex = {
  // Navigation components
  navigation: {
    header: zIndex.header,
    sidebar: zIndex.sidebar,
    footer: zIndex.base,
    breadcrumb: zIndex.base,
    tabs: zIndex.base,
  },

  // Overlay components
  overlays: {
    backdrop: zIndex.modalBackdrop,
    modal: zIndex.modal,
    drawer: zIndex.drawer,
    sheet: zIndex.sheet,
  },

  // Floating components
  floating: {
    dropdown: zIndex.dropdown,
    menu: zIndex.dropdown,
    select: zIndex.dropdown,
    combobox: zIndex.dropdown,
    autocomplete: zIndex.dropdown,
  },

  // Feedback components
  feedback: {
    tooltip: zIndex.tooltip,
    popover: zIndex.criticalPopover,
    toast: zIndex.toast,
    snackbar: zIndex.snackbar,
    alert: zIndex.banner,
    banner: zIndex.banner,
  },

  // Interactive components
  interactive: {
    contextMenu: zIndex.contextMenu,
    dialog: zIndex.modal,
    confirmDialog: zIndex.modal + 1,
  },

  // Loading states
  loading: {
    spinner: zIndex.loading,
    skeleton: zIndex.base,
    progressBar: zIndex.sticky,
  },

  // Sticky elements
  sticky: {
    tableHeader: zIndex.sticky,
    columnHeader: zIndex.sticky,
    stickyNote: zIndex.sticky + 1,
  },
} as const;

/**
 * Z-Index Ranges
 * Defines allowable ranges for different layer types
 */
export const zIndexRanges = {
  content: { min: 0, max: 99 },
  chrome: { min: 100, max: 999 },
  modals: { min: 1000, max: 1999 },
  notifications: { min: 2000, max: 2999 },
  critical: { min: 3000, max: 3999 },
  reserved: { min: 9000, max: 9999 },
} as const;

/**
 * Stacking Context Guidelines
 * Rules for managing stacking contexts
 */
export const stackingContextRules = {
  // Elements that create new stacking contexts
  createsContext: [
    'position: fixed',
    'position: sticky',
    'position: absolute/relative with z-index',
    'opacity < 1',
    'transform',
    'filter',
    'perspective',
    'clip-path',
    'mask',
    'mix-blend-mode',
    'isolation: isolate',
  ],

  // Best practices
  bestPractices: [
    'Use semantic z-index values instead of arbitrary numbers',
    'Never use z-index > 9999',
    'Keep z-index values in designated ranges',
    'Document custom z-index values',
    'Use isolation: isolate to create new stacking contexts',
    'Avoid competing z-index escalation',
  ],
} as const;

/**
 * Z-Index Utility Types
 */
export type ZIndexKey = keyof typeof zIndex;
export type ZIndexValue = typeof zIndex[ZIndexKey];
export type SemanticZIndexCategory = keyof typeof semanticZIndex;

/**
 * Helper function to get z-index value
 */
export const getZIndex = (key: ZIndexKey): number => zIndex[key];

/**
 * Helper to validate z-index is in acceptable range
 */
export const validateZIndex = (value: number): {
  valid: boolean;
  range?: string;
  message: string;
} => {
  if (value < 0 && value !== -1) {
    return {
      valid: false,
      message: 'Z-index should not be negative (except -1 for behind)',
    };
  }

  if (value > 9999) {
    return {
      valid: false,
      message: 'Z-index should not exceed 9999',
    };
  }

  // Check which range it falls into
  for (const [rangeName, range] of Object.entries(zIndexRanges)) {
    if (value >= range.min && value <= range.max) {
      return {
        valid: true,
        range: rangeName,
        message: `Z-index is in ${rangeName} range (${range.min}-${range.max})`,
      };
    }
  }

  return {
    valid: true,
    message: 'Z-index is valid but not in a defined range',
  };
};

/**
 * Helper to get next available z-index in a range
 */
export const getNextZIndex = (
  rangeKey: keyof typeof zIndexRanges,
  increment: number = 1
): number => {
  const range = zIndexRanges[rangeKey];
  return range.min + increment;
};

export default {
  zIndex,
  semanticZIndex,
  zIndexRanges,
  stackingContextRules,
  getZIndex,
  validateZIndex,
  getNextZIndex,
};
