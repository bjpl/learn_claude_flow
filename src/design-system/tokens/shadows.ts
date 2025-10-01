/**
 * Design System - Shadow Tokens
 *
 * Elevation system using box shadows for depth and hierarchy.
 * Based on Material Design elevation principles.
 */

/**
 * Box Shadows
 * Progressive elevation levels for UI depth
 */
export const shadows = {
  // No shadow
  none: 'none',

  // Extra small - subtle depth (elevation 1)
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',

  // Small - minimal elevation (elevation 2)
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',

  // Base - standard elevation (elevation 4)
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',

  // Medium - raised elements (elevation 6)
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',

  // Large - floating elements (elevation 8)
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',

  // Extra large - modals and overlays (elevation 12)
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // 2XL - maximum elevation (elevation 16)
  '2xl': '0 30px 60px -15px rgba(0, 0, 0, 0.3)',

  // Inner shadow - for inset effects
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

/**
 * Colored Shadows
 * Shadows with brand colors for special effects
 */
export const coloredShadows = {
  // Primary color glow
  primaryGlow: {
    sm: '0 0 10px 0 rgba(14, 165, 233, 0.3)',
    base: '0 0 20px 0 rgba(14, 165, 233, 0.4)',
    lg: '0 0 30px 0 rgba(14, 165, 233, 0.5)',
  },

  // Accent color glow
  accentGlow: {
    sm: '0 0 10px 0 rgba(168, 85, 247, 0.3)',
    base: '0 0 20px 0 rgba(168, 85, 247, 0.4)',
    lg: '0 0 30px 0 rgba(168, 85, 247, 0.5)',
  },

  // Success color glow
  successGlow: {
    sm: '0 0 10px 0 rgba(34, 197, 94, 0.3)',
    base: '0 0 20px 0 rgba(34, 197, 94, 0.4)',
    lg: '0 0 30px 0 rgba(34, 197, 94, 0.5)',
  },

  // Error color glow
  errorGlow: {
    sm: '0 0 10px 0 rgba(239, 68, 68, 0.3)',
    base: '0 0 20px 0 rgba(239, 68, 68, 0.4)',
    lg: '0 0 30px 0 rgba(239, 68, 68, 0.5)',
  },

  // Warning color glow
  warningGlow: {
    sm: '0 0 10px 0 rgba(245, 158, 11, 0.3)',
    base: '0 0 20px 0 rgba(245, 158, 11, 0.4)',
    lg: '0 0 30px 0 rgba(245, 158, 11, 0.5)',
  },
} as const;

/**
 * Focus Rings
 * Consistent focus indicators for accessibility
 */
export const focusRings = {
  // Default focus ring (primary color)
  default: '0 0 0 3px rgba(14, 165, 233, 0.5)',

  // Accessible focus ring (high contrast)
  accessible: '0 0 0 3px rgba(14, 165, 233, 0.8)',

  // Error focus ring
  error: '0 0 0 3px rgba(239, 68, 68, 0.5)',

  // Success focus ring
  success: '0 0 0 3px rgba(34, 197, 94, 0.5)',

  // Warning focus ring
  warning: '0 0 0 3px rgba(245, 158, 11, 0.5)',

  // Accent focus ring
  accent: '0 0 0 3px rgba(168, 85, 247, 0.5)',

  // Dark mode focus ring
  dark: '0 0 0 3px rgba(224, 242, 254, 0.5)',
} as const;

/**
 * Semantic Shadow Mapping
 * Shadows for specific UI components
 */
export const semanticShadows = {
  // Cards
  card: shadows.sm,
  cardHover: shadows.md,
  cardActive: shadows.base,

  // Buttons
  button: shadows.xs,
  buttonHover: shadows.sm,
  buttonActive: shadows.none,

  // Dropdowns and menus
  dropdown: shadows.lg,
  menu: shadows.lg,

  // Modals and dialogs
  modal: shadows.xl,
  dialog: shadows['2xl'],

  // Tooltips and popovers
  tooltip: shadows.md,
  popover: shadows.lg,

  // Navigation
  navbar: shadows.sm,
  sidebar: shadows.base,

  // Input fields
  input: shadows.none,
  inputFocus: focusRings.default,
  inputError: focusRings.error,

  // Images
  imageFrame: shadows.base,
  imageFrameHover: shadows.lg,

  // Floating action button
  fab: shadows.lg,
  fabHover: shadows.xl,
} as const;

/**
 * Elevation Levels
 * Standardized z-index coordinated with shadows
 */
export const elevationLevels = {
  level0: { shadow: shadows.none, zIndex: 0 },
  level1: { shadow: shadows.xs, zIndex: 1 },
  level2: { shadow: shadows.sm, zIndex: 2 },
  level4: { shadow: shadows.base, zIndex: 4 },
  level6: { shadow: shadows.md, zIndex: 6 },
  level8: { shadow: shadows.lg, zIndex: 8 },
  level12: { shadow: shadows.xl, zIndex: 12 },
  level16: { shadow: shadows['2xl'], zIndex: 16 },
} as const;

/**
 * Shadow Utility Types
 */
export type ShadowKey = keyof typeof shadows;
export type ShadowValue = typeof shadows[ShadowKey];
export type SemanticShadowKey = keyof typeof semanticShadows;
export type FocusRingKey = keyof typeof focusRings;
export type ElevationLevel = keyof typeof elevationLevels;

/**
 * Helper function to get shadow value
 */
export const getShadow = (key: ShadowKey): string => shadows[key];

export default {
  shadows,
  coloredShadows,
  focusRings,
  semanticShadows,
  elevationLevels,
};
