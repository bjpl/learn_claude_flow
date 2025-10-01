/**
 * Design System - Token Index
 *
 * Consolidated export of all design tokens.
 * Single source of truth for design system values.
 *
 * Usage:
 * ```typescript
 * import { colors, spacing, typography } from '@/design-system/tokens';
 *
 * const styles = {
 *   color: colors.primary[600],
 *   padding: spacing[4],
 *   fontFamily: typography.fontFamilies.sans,
 * };
 * ```
 */

// Core tokens
export { colors, getColorValue, contrastPairs } from './colors';
export type { ColorScale, PrimaryColor, AccentColor, NeutralColor, SemanticColor } from './colors';

export {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textTransforms,
  textStyles,
} from './typography';
export type {
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TextStyle,
} from './typography';

export {
  spacing,
  semanticSpacing,
  borderRadius,
  borderWidths,
  dimensions,
  breakpoints,
  getSpacing,
} from './spacing';
export type {
  SpacingKey,
  SpacingValue,
  BorderRadiusKey,
  DimensionKey,
  BreakpointKey,
} from './spacing';

export {
  radius,
  semanticRadius,
  getRadius,
  getSemanticRadius,
} from './radius';
export type {
  RadiusKey,
  RadiusValue,
  SemanticRadiusKey,
} from './radius';

export {
  shadows,
  coloredShadows,
  focusRings,
  semanticShadows,
  elevationLevels,
  getShadow,
} from './shadows';
export type {
  ShadowKey,
  ShadowValue,
  SemanticShadowKey,
  FocusRingKey,
  ElevationLevel,
} from './shadows';

export {
  durations,
  easings,
  keyframes,
  animations,
  transitions,
  reducedMotion,
  createAnimation,
  createTransition,
} from './animations';
export type {
  Duration,
  Easing,
  Keyframe,
  Animation,
  Transition,
} from './animations';

export {
  zIndex,
  semanticZIndex,
  zIndexRanges,
  stackingContextRules,
  getZIndex,
  validateZIndex,
  getNextZIndex,
} from './zIndex';
export type {
  ZIndexKey,
  ZIndexValue,
  SemanticZIndexCategory,
} from './zIndex';

/**
 * Complete design system namespace
 */
import * as colorsModule from './colors';
import * as typographyModule from './typography';
import * as spacingModule from './spacing';
import * as radiusModule from './radius';
import * as shadowsModule from './shadows';
import * as animationsModule from './animations';
import * as zIndexModule from './zIndex';

export const designSystem = {
  colors: colorsModule.colors,
  typography: {
    fontFamilies: typographyModule.fontFamilies,
    fontSizes: typographyModule.fontSizes,
    fontWeights: typographyModule.fontWeights,
    lineHeights: typographyModule.lineHeights,
    letterSpacing: typographyModule.letterSpacing,
    textStyles: typographyModule.textStyles,
  },
  spacing: {
    spacing: spacingModule.spacing,
    semanticSpacing: spacingModule.semanticSpacing,
    borderRadius: spacingModule.borderRadius,
    borderWidths: spacingModule.borderWidths,
    dimensions: spacingModule.dimensions,
    breakpoints: spacingModule.breakpoints,
  },
  radius: {
    radius: radiusModule.radius,
    semanticRadius: radiusModule.semanticRadius,
  },
  shadows: {
    shadows: shadowsModule.shadows,
    coloredShadows: shadowsModule.coloredShadows,
    focusRings: shadowsModule.focusRings,
    semanticShadows: shadowsModule.semanticShadows,
    elevationLevels: shadowsModule.elevationLevels,
  },
  animations: {
    durations: animationsModule.durations,
    easings: animationsModule.easings,
    keyframes: animationsModule.keyframes,
    animations: animationsModule.animations,
    transitions: animationsModule.transitions,
    reducedMotion: animationsModule.reducedMotion,
  },
  zIndex: {
    zIndex: zIndexModule.zIndex,
    semanticZIndex: zIndexModule.semanticZIndex,
    zIndexRanges: zIndexModule.zIndexRanges,
  },
} as const;

/**
 * Design token metadata
 */
export const tokenMetadata = {
  version: '1.0.0',
  lastUpdated: '2025-09-30',
  description: 'Consolidated design system tokens for Learn Claude Flow',
  maintainer: 'Design System Team',
  wcagCompliance: 'AAA',
} as const;

export default designSystem;
