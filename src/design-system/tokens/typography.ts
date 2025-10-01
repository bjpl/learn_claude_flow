/**
 * Design System - Typography Tokens
 *
 * Consolidated typography system for consistent text styling.
 * Follows a modular scale for harmonious proportions.
 */

/**
 * Font Families
 */
export const fontFamilies = {
  sans: [
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ].join(', '),

  mono: [
    'JetBrains Mono',
    'Fira Code',
    'Consolas',
    'Monaco',
    'Courier New',
    'monospace',
  ].join(', '),

  serif: [
    'Georgia',
    'Cambria',
    'Times New Roman',
    'Times',
    'serif',
  ].join(', '),
} as const;

/**
 * Font Sizes
 * Based on a modular scale (1.125 ratio - major second)
 */
export const fontSizes = {
  xs: {
    size: '0.75rem',      // 12px
    lineHeight: '1rem',    // 16px
  },
  sm: {
    size: '0.875rem',     // 14px
    lineHeight: '1.25rem', // 20px
  },
  base: {
    size: '1rem',         // 16px (base)
    lineHeight: '1.5rem',  // 24px
  },
  lg: {
    size: '1.125rem',     // 18px
    lineHeight: '1.75rem', // 28px
  },
  xl: {
    size: '1.25rem',      // 20px
    lineHeight: '1.75rem', // 28px
  },
  '2xl': {
    size: '1.5rem',       // 24px
    lineHeight: '2rem',    // 32px
  },
  '3xl': {
    size: '1.875rem',     // 30px
    lineHeight: '2.25rem', // 36px
  },
  '4xl': {
    size: '2.25rem',      // 36px
    lineHeight: '2.5rem',  // 40px
  },
  '5xl': {
    size: '3rem',         // 48px
    lineHeight: '1',       // Tight for display
  },
  '6xl': {
    size: '3.75rem',      // 60px
    lineHeight: '1',
  },
  '7xl': {
    size: '4.5rem',       // 72px
    lineHeight: '1',
  },
} as const;

/**
 * Font Weights
 */
export const fontWeights = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

/**
 * Line Heights
 * For custom line height adjustments
 */
export const lineHeights = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

/**
 * Letter Spacing
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

/**
 * Text Transforms
 */
export const textTransforms = {
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
  none: 'none',
} as const;

/**
 * Predefined Text Styles
 * Common text style combinations for consistency
 */
export const textStyles = {
  // Display styles (for hero text and major headings)
  displayLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes['7xl'].size,
    lineHeight: fontSizes['7xl'].lineHeight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },
  displayMedium: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes['6xl'].size,
    lineHeight: fontSizes['6xl'].lineHeight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },
  displaySmall: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes['5xl'].size,
    lineHeight: fontSizes['5xl'].lineHeight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },

  // Heading styles
  h1: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes['4xl'].size,
    lineHeight: fontSizes['4xl'].lineHeight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes['3xl'].size,
    lineHeight: fontSizes['3xl'].lineHeight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes['2xl'].size,
    lineHeight: fontSizes['2xl'].lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xl.size,
    lineHeight: fontSizes.xl.lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.lg.size,
    lineHeight: fontSizes.lg.lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base.size,
    lineHeight: fontSizes.base.lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  },

  // Body text styles
  bodyLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.lg.size,
    lineHeight: fontSizes.lg.lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base.size,
    lineHeight: fontSizes.base.lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm.size,
    lineHeight: fontSizes.sm.lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },

  // UI text styles
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm.size,
    lineHeight: fontSizes.sm.lineHeight,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.wide,
  },
  caption: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs.size,
    lineHeight: fontSizes.xs.lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  overline: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs.size,
    lineHeight: fontSizes.xs.lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.widest,
    textTransform: textTransforms.uppercase,
  },

  // Code styles
  code: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSizes.sm.size,
    lineHeight: fontSizes.sm.lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  codeBlock: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSizes.sm.size,
    lineHeight: lineHeights.relaxed,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Link styles
  link: {
    fontFamily: fontFamilies.sans,
    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.normal,
  },
  linkUnderline: {
    fontFamily: fontFamilies.sans,
    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
    textDecoration: 'underline',
  },
} as const;

/**
 * Typography Utility Types
 */
export type FontFamily = keyof typeof fontFamilies;
export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
export type LineHeight = keyof typeof lineHeights;
export type LetterSpacing = keyof typeof letterSpacing;
export type TextStyle = keyof typeof textStyles;

export default {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textTransforms,
  textStyles,
};
