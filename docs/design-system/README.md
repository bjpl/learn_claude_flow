# Learn Claude Flow Design System

## Overview

A comprehensive, TypeScript-based design system providing a single source of truth for all design tokens in the Learn Claude Flow application.

## Features

- **WCAG AAA Compliant**: All color combinations meet accessibility standards
- **Type-Safe**: Full TypeScript support with autocomplete
- **Semantic Tokens**: Meaningful names for common UI patterns
- **Modular Scale**: Mathematically harmonious proportions
- **Helper Functions**: Utilities for programmatic access
- **Well-Documented**: Extensive inline documentation and guides

## Quick Start

```typescript
import { colors, spacing, typography } from '@/design-system/tokens';

const buttonStyle = {
  backgroundColor: colors.primary[600],
  color: colors.base.white,
  padding: spacing[4],
  fontFamily: typography.fontFamilies.sans,
};
```

## Token Categories

### 1. Colors (`colors.ts`)
Complete color palette including:
- Primary & accent brand colors
- Neutral/gray scale
- Semantic colors (success, warning, error, info)
- UI component colors
- Syntax highlighting colors
- Accessible contrast pairs

```typescript
import { colors, contrastPairs } from '@/design-system/tokens';

// Use brand colors
backgroundColor: colors.primary[500]

// Semantic colors
color: colors.success[600]

// Accessible text on light backgrounds
color: contrastPairs.lightBackground.text
```

### 2. Typography (`typography.ts`)
Comprehensive typography system:
- Font families (sans, mono, serif)
- Modular font size scale
- Font weights
- Line heights
- Letter spacing
- Predefined text styles

```typescript
import { textStyles, fontSizes } from '@/design-system/tokens';

// Use predefined text styles
...textStyles.h1

// Or compose custom styles
fontSize: fontSizes['2xl'].size,
lineHeight: fontSizes['2xl'].lineHeight
```

### 3. Spacing (`spacing.ts`)
4px-based spacing system:
- Base spacing scale (0-96)
- Semantic spacing values
- Border radius
- Dimensions (sidebars, headers, icons, etc.)
- Responsive breakpoints

```typescript
import { spacing, semanticSpacing } from '@/design-system/tokens';

// Use spacing scale
padding: spacing[4]  // 1rem (16px)

// Or semantic spacing
gap: semanticSpacing.gap
```

### 4. Shadows (`shadows.ts`)
Elevation system:
- Progressive shadow levels
- Colored shadows & glows
- Focus rings for accessibility
- Semantic shadow mapping
- Elevation levels with z-index

```typescript
import { shadows, semanticShadows, focusRings } from '@/design-system/tokens';

// Standard shadow
boxShadow: shadows.md

// Semantic shadow
boxShadow: semanticShadows.card

// Focus ring
outline: focusRings.default
```

### 5. Animations (`animations.ts`)
Motion design system:
- Animation durations
- Easing functions
- Keyframe animations
- Predefined animations
- Transition presets
- Reduced motion support

```typescript
import { animations, transitions } from '@/design-system/tokens';

// Fade in animation
animation: animations.fadeIn

// Button transition
transition: transitions.button

// Respect reduced motion
'@media (prefers-reduced-motion: reduce)': {
  animation: 'none',
}
```

### 6. Z-Index (`zIndex.ts`)
Layering system:
- Organized z-index scale
- Semantic z-index groups
- Z-index ranges
- Validation helpers

```typescript
import { zIndex, semanticZIndex } from '@/design-system/tokens';

// Standard z-index
zIndex: zIndex.modal

// Semantic grouping
zIndex: semanticZIndex.overlays.modal
```

## Architecture

```
src/design-system/tokens/
├── colors.ts          # Color palette and accessibility
├── typography.ts      # Font families and text styles
├── spacing.ts         # Spacing scale and dimensions
├── shadows.ts         # Elevation and focus states
├── animations.ts      # Motion design
├── zIndex.ts          # Layering system
└── index.ts           # Central export
```

## Integration with Tailwind

The design system complements Tailwind CSS. All token values are already configured in `tailwind.config.js`:

```javascript
// Tailwind automatically uses design system values
<button className="bg-primary-600 text-white p-4">
  Button using design tokens
</button>
```

## TypeScript Support

All tokens are fully typed:

```typescript
import type { ColorScale, SpacingKey, TextStyle } from '@/design-system/tokens';

// TypeScript will validate and autocomplete
const scale: ColorScale = '500';
const padding: SpacingKey = 4;
const style: TextStyle = 'h1';
```

## Helper Functions

### Color Helpers
```typescript
import { getColorValue } from '@/design-system/tokens';

const color = getColorValue('primary', '600');
```

### Spacing Helpers
```typescript
import { getSpacing } from '@/design-system/tokens';

const padding = getSpacing(4); // '1rem'
```

### Z-Index Helpers
```typescript
import { validateZIndex, getNextZIndex } from '@/design-system/tokens';

const validation = validateZIndex(1050);
const nextZIndex = getNextZIndex('modals', 100);
```

### Animation Helpers
```typescript
import { createAnimation, createTransition } from '@/design-system/tokens';

const customAnimation = createAnimation('fadeIn', 'slow', 'smooth');
const customTransition = createTransition('opacity', 'base', 'smooth');
```

## Accessibility

### WCAG AAA Compliance
All color combinations meet or exceed WCAG AAA standards (7:1 contrast for normal text):

```typescript
import { colors, contrastPairs } from '@/design-system/tokens';

// Guaranteed accessible text on light backgrounds
const style = {
  backgroundColor: colors.base.white,
  color: contrastPairs.lightBackground.text, // 21:1 contrast
};
```

### Focus Indicators
High-contrast focus rings for keyboard navigation:

```typescript
import { focusRings } from '@/design-system/tokens';

const inputStyle = {
  ':focus': {
    outline: focusRings.accessible, // High contrast
  },
};
```

### Reduced Motion
Respect user preferences for reduced motion:

```typescript
import { animations, reducedMotion } from '@/design-system/tokens';

const style = {
  animation: animations.fadeIn,
  '@media (prefers-reduced-motion: reduce)': {
    animation: reducedMotion.none,
  },
};
```

## Migration Guide

See [Migration Guide](./migration-guide.md) for detailed instructions on migrating existing components to use the design system.

## Best Practices

1. **Always Use Tokens**: Never hardcode design values
2. **Prefer Semantic Values**: Use semantic tokens when available
3. **Maintain Type Safety**: Import TypeScript types for validation
4. **Document Deviations**: Comment when you must use custom values
5. **Test Accessibility**: Verify WCAG compliance for color combinations
6. **Respect Motion Preferences**: Always support reduced motion

## Examples

### Complete Button Component

See [Migration Guide](./migration-guide.md#complete-button-component) for a full example of building a button component with design tokens.

### Card Component

See [Migration Guide](./migration-guide.md#card-component) for a card component example.

## File Sizes

All token files are optimized for tree-shaking:
- `colors.ts`: ~8KB
- `typography.ts`: ~6KB
- `spacing.ts`: ~5KB
- `shadows.ts`: ~4KB
- `animations.ts`: ~7KB
- `zIndex.ts`: ~4KB
- `index.ts`: ~2KB

**Total**: ~36KB of design tokens (pre-gzip)

## Version

- **Version**: 1.0.0
- **Last Updated**: 2025-09-30
- **WCAG Compliance**: AAA
- **TypeScript**: Full support

## Support

For questions or contributions:
1. Review this documentation
2. Check the [Migration Guide](./migration-guide.md)
3. Examine token files for detailed inline documentation
4. Contact the design system team

## License

Part of the Learn Claude Flow project.
