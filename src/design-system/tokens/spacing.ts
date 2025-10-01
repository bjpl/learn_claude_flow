/**
 * Design System - Spacing Tokens
 *
 * Consolidated spacing system for consistent layout and white space.
 * Based on a 4px base unit for mathematical precision.
 */

/**
 * Base Spacing Scale
 * Multipliers of the 4px base unit (0.25rem)
 */
export const spacing = {
  0: '0',           // 0px
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

/**
 * Semantic Spacing
 * Named spacing values for common use cases
 */
export const semanticSpacing = {
  // Component spacing
  componentPaddingXs: spacing[2],     // 8px
  componentPaddingSm: spacing[3],     // 12px
  componentPadding: spacing[4],       // 16px
  componentPaddingMd: spacing[5],     // 20px
  componentPaddingLg: spacing[6],     // 24px
  componentPaddingXl: spacing[8],     // 32px

  // Gap between elements
  gapXs: spacing[1],      // 4px
  gapSm: spacing[2],      // 8px
  gap: spacing[4],        // 16px
  gapMd: spacing[6],      // 24px
  gapLg: spacing[8],      // 32px
  gapXl: spacing[12],     // 48px

  // Section spacing
  sectionSpacingXs: spacing[8],   // 32px
  sectionSpacingSm: spacing[12],  // 48px
  sectionSpacing: spacing[16],    // 64px
  sectionSpacingMd: spacing[20],  // 80px
  sectionSpacingLg: spacing[24],  // 96px
  sectionSpacingXl: spacing[32],  // 128px

  // Page spacing
  pageMarginMobile: spacing[4],   // 16px
  pageMarginTablet: spacing[6],   // 24px
  pageMarginDesktop: spacing[8],  // 32px

  // Container max widths
  containerXs: spacing[80],   // 320px
  containerSm: spacing[96],   // 384px
  container: '42rem',         // 672px
  containerMd: '48rem',       // 768px
  containerLg: '64rem',       // 1024px
  containerXl: '80rem',       // 1280px
  container2xl: '96rem',      // 1536px

  // Grid gaps
  gridGapXs: spacing[2],   // 8px
  gridGapSm: spacing[4],   // 16px
  gridGap: spacing[6],     // 24px
  gridGapMd: spacing[8],   // 32px
  gridGapLg: spacing[12],  // 48px
} as const;

/**
 * Border Radius
 * For component corners and shapes
 */
export const borderRadius = {
  none: '0',
  xs: '0.125rem',    // 2px
  sm: '0.25rem',     // 4px
  base: '0.5rem',    // 8px
  md: '0.75rem',     // 12px
  lg: '1rem',        // 16px
  xl: '1.5rem',      // 24px
  '2xl': '2rem',     // 32px
  '3xl': '3rem',     // 48px
  full: '9999px',    // Pill shape
} as const;

/**
 * Border Widths
 */
export const borderWidths = {
  0: '0',
  default: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

/**
 * Layout Dimensions
 * Common width and height values
 */
export const dimensions = {
  // Sidebar widths
  sidebarNarrow: '16rem',   // 256px
  sidebar: '20rem',         // 320px
  sidebarWide: '24rem',     // 384px

  // Header heights
  headerMobile: spacing[14],    // 56px
  headerDesktop: spacing[16],   // 64px

  // Content widths
  contentNarrow: '45rem',   // 720px (optimal reading width)
  content: '60rem',         // 960px
  contentWide: '75rem',     // 1200px

  // Icon sizes
  iconXs: spacing[3],    // 12px
  iconSm: spacing[4],    // 16px
  icon: spacing[5],      // 20px
  iconMd: spacing[6],    // 24px
  iconLg: spacing[8],    // 32px
  iconXl: spacing[12],   // 48px

  // Avatar sizes
  avatarXs: spacing[6],   // 24px
  avatarSm: spacing[8],   // 32px
  avatar: spacing[10],    // 40px
  avatarMd: spacing[12],  // 48px
  avatarLg: spacing[16],  // 64px
  avatarXl: spacing[24],  // 96px

  // Button heights
  buttonXs: spacing[6],   // 24px
  buttonSm: spacing[8],   // 32px
  button: spacing[10],    // 40px
  buttonMd: spacing[12],  // 48px
  buttonLg: spacing[14],  // 56px

  // Input heights
  inputSm: spacing[8],    // 32px
  input: spacing[10],     // 40px
  inputMd: spacing[12],   // 48px
  inputLg: spacing[14],   // 56px
} as const;

/**
 * Responsive Breakpoints
 */
export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Spacing Utility Types
 */
export type SpacingKey = keyof typeof spacing;
export type SpacingValue = typeof spacing[SpacingKey];
export type BorderRadiusKey = keyof typeof borderRadius;
export type DimensionKey = keyof typeof dimensions;
export type BreakpointKey = keyof typeof breakpoints;

/**
 * Helper function to get spacing value
 */
export const getSpacing = (key: SpacingKey): string => spacing[key];

export default {
  spacing,
  semanticSpacing,
  borderRadius,
  borderWidths,
  dimensions,
  breakpoints,
};
