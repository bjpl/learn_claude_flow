/**
 * Design System - Animation Tokens
 *
 * Motion design system for consistent, accessible animations.
 * Respects user's reduced motion preferences.
 */

/**
 * Animation Durations
 * Based on Material Design motion guidelines
 */
export const durations = {
  // Instant - for immediate feedback
  instant: '0ms',

  // Fast - for small state changes
  fast: '150ms',

  // Base - standard animations
  base: '250ms',

  // Moderate - medium animations
  moderate: '350ms',

  // Slow - large transitions
  slow: '500ms',

  // Slower - complex animations
  slower: '750ms',

  // Slowest - page transitions
  slowest: '1000ms',
} as const;

/**
 * Easing Functions
 * Cubic-bezier timing functions for natural motion
 */
export const easings = {
  // Linear - constant speed
  linear: 'linear',

  // Standard easing (most common)
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',

  // Custom cubic-bezier functions
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',        // Smooth acceleration and deceleration
  snappy: 'cubic-bezier(0.4, 0, 0.6, 1)',        // Quick acceleration
  bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bounce effect

  // Material Design standard
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

/**
 * CSS Keyframe Animations
 */
export const keyframes = {
  // Fade animations
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeOut: {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },

  // Slide animations
  slideInRight: {
    '0%': { transform: 'translateX(100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  slideInLeft: {
    '0%': { transform: 'translateX(-100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  slideInUp: {
    '0%': { transform: 'translateY(100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideInDown: {
    '0%': { transform: 'translateY(-100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideUp: {
    '0%': { transform: 'translateY(20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },

  // Scale animations
  scaleIn: {
    '0%': { transform: 'scale(0.95)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
  scaleOut: {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '100%': { transform: 'scale(0.95)', opacity: '0' },
  },
  zoomIn: {
    '0%': { transform: 'scale(0)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
  zoomOut: {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '100%': { transform: 'scale(0)', opacity: '0' },
  },

  // Rotation animations
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  spinReverse: {
    '0%': { transform: 'rotate(360deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },

  // Pulse/heartbeat animations
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },
  heartbeat: {
    '0%, 100%': { transform: 'scale(1)' },
    '14%': { transform: 'scale(1.1)' },
    '28%': { transform: 'scale(1)' },
    '42%': { transform: 'scale(1.1)' },
    '56%': { transform: 'scale(1)' },
  },

  // Bounce animations
  bounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-25%)' },
  },
  bounceIn: {
    '0%': { transform: 'scale(0.3)', opacity: '0' },
    '50%': { transform: 'scale(1.05)' },
    '70%': { transform: 'scale(0.9)' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },

  // Shake/wiggle animations
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
  },
  wiggle: {
    '0%, 100%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(-5deg)' },
    '75%': { transform: 'rotate(5deg)' },
  },

  // Shimmer/skeleton loading
  shimmer: {
    '0%': { backgroundPosition: '-1000px 0' },
    '100%': { backgroundPosition: '1000px 0' },
  },
  skeletonLoading: {
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
  },

  // Progress animations
  progressIndeterminate: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
} as const;

/**
 * Predefined Animations
 * Ready-to-use animation combinations
 */
export const animations = {
  // Fade animations
  fadeIn: `fade-in ${durations.base} ${easings.smooth}`,
  fadeOut: `fade-out ${durations.base} ${easings.smooth}`,

  // Slide animations
  slideInRight: `slide-in-right ${durations.moderate} ${easings.smooth}`,
  slideInLeft: `slide-in-left ${durations.moderate} ${easings.smooth}`,
  slideInUp: `slide-in-up ${durations.moderate} ${easings.smooth}`,
  slideInDown: `slide-in-down ${durations.moderate} ${easings.smooth}`,
  slideUp: `slide-up ${durations.base} ${easings.smooth}`,

  // Scale animations
  scaleIn: `scale-in ${durations.fast} ${easings.smooth}`,
  scaleOut: `scale-out ${durations.fast} ${easings.smooth}`,
  zoomIn: `zoom-in ${durations.moderate} ${easings.smooth}`,
  zoomOut: `zoom-out ${durations.moderate} ${easings.smooth}`,

  // Rotation animations
  spin: `spin ${durations.slowest} ${easings.linear} infinite`,
  spinSlow: `spin ${durations.slower} ${easings.linear} infinite`,

  // Pulse animations
  pulse: `pulse ${durations.slow} ${easings.smooth} infinite`,
  heartbeat: `heartbeat 1.5s ${easings.smooth} infinite`,

  // Bounce animations
  bounce: `bounce ${durations.slowest} ${easings.smooth} infinite`,
  bounceIn: `bounce-in ${durations.moderate} ${easings.bouncy}`,

  // Shake/wiggle
  shake: `shake ${durations.slow} ${easings.smooth}`,
  wiggle: `wiggle ${durations.slow} ${easings.smooth}`,

  // Loading animations
  skeleton: `skeleton-loading 1.5s ${easings.linear} infinite`,
  shimmer: `shimmer 2s ${easings.linear} infinite`,
  progressIndeterminate: `progress-indeterminate 1.5s ${easings.smooth} infinite`,
} as const;

/**
 * Transition Presets
 * Common transition configurations
 */
export const transitions = {
  // Default transition
  default: `all ${durations.base} ${easings.smooth}`,

  // Property-specific transitions
  color: `color ${durations.fast} ${easings.smooth}`,
  backgroundColor: `background-color ${durations.fast} ${easings.smooth}`,
  borderColor: `border-color ${durations.fast} ${easings.smooth}`,
  opacity: `opacity ${durations.base} ${easings.smooth}`,
  transform: `transform ${durations.base} ${easings.smooth}`,
  boxShadow: `box-shadow ${durations.base} ${easings.smooth}`,

  // Multiple properties
  colors: `color ${durations.fast} ${easings.smooth}, background-color ${durations.fast} ${easings.smooth}, border-color ${durations.fast} ${easings.smooth}`,
  appearance: `color ${durations.fast} ${easings.smooth}, background-color ${durations.fast} ${easings.smooth}, border-color ${durations.fast} ${easings.smooth}, opacity ${durations.base} ${easings.smooth}`,
  transformAndOpacity: `transform ${durations.base} ${easings.smooth}, opacity ${durations.base} ${easings.smooth}`,

  // Interactive elements
  button: `background-color ${durations.fast} ${easings.smooth}, transform ${durations.fast} ${easings.smooth}, box-shadow ${durations.fast} ${easings.smooth}`,
  input: `border-color ${durations.fast} ${easings.smooth}, box-shadow ${durations.fast} ${easings.smooth}`,
  link: `color ${durations.fast} ${easings.smooth}, text-decoration-color ${durations.fast} ${easings.smooth}`,
} as const;

/**
 * Reduced Motion Preferences
 * Respects user's motion preferences
 */
export const reducedMotion = {
  // Disable all animations
  none: 'none !important',

  // Minimal animations (instant transitions)
  minimal: `all ${durations.instant} ${easings.linear}`,
} as const;

/**
 * Animation Utility Types
 */
export type Duration = keyof typeof durations;
export type Easing = keyof typeof easings;
export type Keyframe = keyof typeof keyframes;
export type Animation = keyof typeof animations;
export type Transition = keyof typeof transitions;

/**
 * Helper to create custom animation
 */
export const createAnimation = (
  name: Keyframe,
  duration: Duration = 'base',
  easing: Easing = 'smooth',
  iterationCount: number | 'infinite' = 1
): string => {
  return `${name} ${durations[duration]} ${easings[easing]} ${iterationCount}`;
};

/**
 * Helper to create custom transition
 */
export const createTransition = (
  property: string,
  duration: Duration = 'base',
  easing: Easing = 'smooth'
): string => {
  return `${property} ${durations[duration]} ${easings[easing]}`;
};

export default {
  durations,
  easings,
  keyframes,
  animations,
  transitions,
  reducedMotion,
  createAnimation,
  createTransition,
};
