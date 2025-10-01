/**
 * Design System - Border Radius Tokens
 *
 * Consistent border radius scale for rounded corners and shapes.
 * Follows a harmonious progression from sharp to fully rounded.
 */

/**
 * Border Radius Scale
 * Values in pixels, providing a smooth progression
 */
export const radius = {
  /** No rounding - 0px */
  none: '0',

  /** Minimal rounding - 2px */
  xs: '0.125rem',

  /** Small rounding - 4px */
  sm: '0.25rem',

  /** Base rounding - 6px */
  base: '0.375rem',

  /** Medium rounding - 8px */
  md: '0.5rem',

  /** Large rounding - 12px */
  lg: '0.75rem',

  /** Extra large rounding - 16px */
  xl: '1rem',

  /** 2XL rounding - 20px */
  '2xl': '1.25rem',

  /** 3XL rounding - 24px */
  '3xl': '1.5rem',

  /** Fully rounded - 9999px */
  full: '9999px',
} as const;

/**
 * Semantic Border Radius
 * Component-specific radius values
 */
export const semanticRadius = {
  // Interactive elements
  button: radius.md,
  input: radius.base,
  select: radius.base,
  checkbox: radius.sm,
  radio: radius.full,
  switch: radius.full,

  // Containers
  card: radius.lg,
  panel: radius.xl,
  dialog: radius.xl,
  modal: radius.lg,
  drawer: radius.none,

  // Feedback
  toast: radius.md,
  tooltip: radius.sm,
  badge: radius.full,
  alert: radius.md,

  // Navigation
  tab: radius.base,
  pill: radius.full,

  // Media
  avatar: radius.full,
  image: radius.md,
  video: radius.lg,
} as const;

/**
 * Utility Types
 */
export type RadiusKey = keyof typeof radius;
export type RadiusValue = typeof radius[RadiusKey];
export type SemanticRadiusKey = keyof typeof semanticRadius;

/**
 * Helper function to get radius value
 */
export const getRadius = (key: RadiusKey): string => radius[key];

/**
 * Helper to get semantic radius
 */
export const getSemanticRadius = (key: SemanticRadiusKey): string => semanticRadius[key];

export default {
  radius,
  semanticRadius,
  getRadius,
  getSemanticRadius,
};
