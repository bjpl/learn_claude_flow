# Design System Migration Guide

## Overview

This guide explains how to migrate from inline styles and Tailwind classes to the consolidated TypeScript design system tokens.

## What Changed

### Before: Multiple Color Systems
We had conflicting color definitions across multiple files with no single source of truth.

### After: Unified Design Tokens
All design values are now centralized in `/src/design-system/tokens/`:
- `colors.ts` - Complete color palette with WCAG AAA compliance
- `typography.ts` - Font families, sizes, weights, and text styles
- `spacing.ts` - Consistent spacing scale and dimensions
- `shadows.ts` - Elevation system and focus rings
- `animations.ts` - Motion design tokens and transitions
- `zIndex.ts` - Layering system for stacking context

## Migration Steps

### 1. Import Design Tokens

```typescript
// Import specific tokens
import { colors, spacing, typography } from '@/design-system/tokens';

// Or import everything
import * as tokens from '@/design-system/tokens';
```

### 2. Replace Color Values

#### Before:
```typescript
// Inline hardcoded colors
const buttonStyle = {
  backgroundColor: '#0ea5e9',
  color: '#ffffff',
};

// Or Tailwind classes
<button className="bg-blue-500 text-white">Click me</button>
```

#### After:
```typescript
// Using design tokens
import { colors } from '@/design-system/tokens';

const buttonStyle = {
  backgroundColor: colors.primary[500],
  color: colors.base.white,
};

// Tailwind still works but now matches design system
<button className="bg-primary-500 text-white">Click me</button>
```

### 3. Use Typography Tokens

#### Before:
```typescript
const headingStyle = {
  fontSize: '2.25rem',
  fontWeight: '700',
  lineHeight: '2.5rem',
};
```

#### After:
```typescript
import { textStyles } from '@/design-system/tokens';

const headingStyle = textStyles.h1;

// Or individual tokens
import { fontSizes, fontWeights } from '@/design-system/tokens';

const customStyle = {
  fontSize: fontSizes['4xl'].size,
  fontWeight: fontWeights.bold,
  lineHeight: fontSizes['4xl'].lineHeight,
};
```

### 4. Apply Spacing Consistently

#### Before:
```typescript
const cardStyle = {
  padding: '1rem',
  marginBottom: '2rem',
  gap: '0.75rem',
};
```

#### After:
```typescript
import { spacing, semanticSpacing } from '@/design-system/tokens';

const cardStyle = {
  padding: spacing[4],           // 1rem (16px)
  marginBottom: spacing[8],      // 2rem (32px)
  gap: spacing[3],               // 0.75rem (12px)
};

// Or use semantic spacing
const semanticStyle = {
  padding: semanticSpacing.componentPadding,  // 1rem
  gap: semanticSpacing.gap,                   // 1rem
};
```

### 5. Use Shadow Tokens

#### Before:
```typescript
const cardStyle = {
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};
```

#### After:
```typescript
import { shadows, semanticShadows } from '@/design-system/tokens';

const cardStyle = {
  boxShadow: shadows.base,
  // Or use semantic shadow
  boxShadow: semanticShadows.card,
};

// With hover state
const cardHoverStyle = {
  boxShadow: semanticShadows.cardHover,
};
```

### 6. Apply Animations

#### Before:
```typescript
const fadeInStyle = {
  animation: 'fade-in 250ms cubic-bezier(0.4, 0, 0.2, 1)',
};
```

#### After:
```typescript
import { animations, transitions } from '@/design-system/tokens';

const fadeInStyle = {
  animation: animations.fadeIn,
};

const buttonTransition = {
  transition: transitions.button,
};
```

### 7. Manage Z-Index

#### Before:
```typescript
const modalStyle = {
  zIndex: 1050,  // Magic number!
};
```

#### After:
```typescript
import { zIndex, semanticZIndex } from '@/design-system/tokens';

const modalStyle = {
  zIndex: zIndex.modal,
  // Or use semantic z-index
  zIndex: semanticZIndex.overlays.modal,
};
```

## Component Examples

### Complete Button Component

```typescript
import React from 'react';
import {
  colors,
  spacing,
  textStyles,
  shadows,
  transitions,
  borderRadius,
} from '@/design-system/tokens';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'base' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'base',
  children,
}) => {
  const baseStyle = {
    fontFamily: textStyles.body.fontFamily,
    fontWeight: textStyles.label.fontWeight,
    borderRadius: borderRadius.base,
    transition: transitions.button,
    border: 'none',
    cursor: 'pointer',
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary[600],
      color: colors.base.white,
      boxShadow: shadows.sm,
      ':hover': {
        backgroundColor: colors.primary[700],
        boxShadow: shadows.md,
      },
    },
    secondary: {
      backgroundColor: colors.neutral[100],
      color: colors.neutral[900],
      boxShadow: shadows.sm,
      ':hover': {
        backgroundColor: colors.neutral[200],
      },
    },
    danger: {
      backgroundColor: colors.error[600],
      color: colors.base.white,
      boxShadow: shadows.sm,
      ':hover': {
        backgroundColor: colors.error[700],
      },
    },
  };

  const sizeStyles = {
    sm: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: textStyles.bodySmall.fontSize,
    },
    base: {
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: textStyles.body.fontSize,
    },
    lg: {
      padding: `${spacing[4]} ${spacing[8]}`,
      fontSize: textStyles.bodyLarge.fontSize,
    },
  };

  return (
    <button
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
    >
      {children}
    </button>
  );
};
```

### Card Component

```typescript
import React from 'react';
import {
  colors,
  spacing,
  shadows,
  borderRadius,
  semanticShadows,
} from '@/design-system/tokens';

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: colors.ui.background.primary,
        padding: spacing[6],
        borderRadius: borderRadius.lg,
        boxShadow: semanticShadows.card,
        border: `1px solid ${colors.ui.border.light}`,
      }}
    >
      {children}
    </div>
  );
};
```

## Best Practices

### 1. Always Use Tokens
Never hardcode design values. Always reference tokens:

```typescript
// ❌ Don't
const style = { color: '#0ea5e9' };

// ✅ Do
import { colors } from '@/design-system/tokens';
const style = { color: colors.primary[500] };
```

### 2. Use Semantic Values When Available
Prefer semantic tokens over raw values:

```typescript
// ✅ Good
boxShadow: semanticShadows.card

// ⚠️ Acceptable but less semantic
boxShadow: shadows.sm
```

### 3. Maintain WCAG Compliance
Use provided contrast pairs for accessibility:

```typescript
import { colors, contrastPairs } from '@/design-system/tokens';

const style = {
  backgroundColor: colors.primary[600],
  color: contrastPairs.primaryBackground.text, // Ensures AAA compliance
};
```

### 4. Respect Reduced Motion
For animations, always respect user preferences:

```typescript
import { animations, reducedMotion } from '@/design-system/tokens';

const style = {
  animation: animations.fadeIn,
  '@media (prefers-reduced-motion: reduce)': {
    animation: reducedMotion.none,
  },
};
```

### 5. Document Custom Values
If you must deviate from design tokens, document why:

```typescript
// Custom z-index for special case (above modal but below loading)
// Reason: Tutorial overlay needs to appear over modal but allow interaction
const tutorialOverlayZIndex = 1075; // Between modal (1050) and drawer (1100)
```

## Tailwind Integration

The design tokens complement Tailwind CSS. Your `tailwind.config.js` already extends Tailwind with these values:

```javascript
// Tailwind classes automatically use design system colors
<div className="bg-primary-500 text-white">
  Uses design system primary-500 color
</div>
```

## Type Safety

All tokens are fully typed for TypeScript autocomplete:

```typescript
import { colors } from '@/design-system/tokens';
import type { ColorScale, SpacingKey } from '@/design-system/tokens';

// TypeScript will autocomplete and validate
const primaryColor: ColorScale = '500';
const padding: SpacingKey = 4;
```

## Helper Functions

### Color Utilities

```typescript
import { getColorValue } from '@/design-system/tokens';

// Get any color value programmatically
const color = getColorValue('primary', '600');
```

### Spacing Utilities

```typescript
import { getSpacing } from '@/design-system/tokens';

// Get spacing value
const padding = getSpacing(4); // '1rem'
```

### Z-Index Utilities

```typescript
import { validateZIndex, getNextZIndex } from '@/design-system/tokens';

// Validate z-index is in acceptable range
const validation = validateZIndex(1050);
console.log(validation.message); // "Z-index is in modals range (1000-1999)"

// Get next available z-index in a range
const nextModal = getNextZIndex('modals', 100); // 1100
```

## Troubleshooting

### Colors Don't Match Tailwind
Ensure your `tailwind.config.js` extends the theme correctly. The colors should be defined in the `extend` section.

### TypeScript Errors
Make sure to import types when needed:

```typescript
import type { ColorScale } from '@/design-system/tokens';
```

### CSS-in-JS vs Tailwind
You can mix both approaches:
- Use Tailwind for utility-first styling
- Use tokens for custom components and dynamic styles

## Migration Checklist

- [ ] Import design tokens in your component
- [ ] Replace hardcoded colors with `colors` tokens
- [ ] Replace font values with `typography` tokens
- [ ] Replace spacing values with `spacing` tokens
- [ ] Replace shadows with `shadows` tokens
- [ ] Replace z-index values with `zIndex` tokens
- [ ] Use `animations` and `transitions` for motion
- [ ] Test for WCAG AAA compliance
- [ ] Test with reduced motion preferences
- [ ] Update component documentation

## Support

For questions or issues with the design system:
1. Check this migration guide
2. Review the individual token files for detailed documentation
3. Consult the team design system documentation

## Version History

- **v1.0.0** (2025-09-30): Initial consolidated design system release
  - Unified color palette
  - Complete typography system
  - Spacing and layout tokens
  - Shadow and elevation system
  - Animation and motion tokens
  - Z-index layering system
