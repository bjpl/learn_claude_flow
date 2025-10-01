import React from 'react';
import { spacing, type SpacingKey } from '../../design-system/tokens/spacing';

export interface StackProps {
  /** Child elements to stack */
  children: React.ReactNode;
  /** Stack direction */
  direction?: 'vertical' | 'horizontal';
  /** Gap between items (uses spacing tokens) */
  gap?: SpacingKey;
  /** Align items along cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Justify items along main axis */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Allow items to wrap */
  wrap?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Stack - Layout primitive for flexbox-based stacking
 *
 * @example
 * ```tsx
 * <Stack direction="vertical" gap={4} align="center">
 *   <Button>First</Button>
 *   <Button>Second</Button>
 * </Stack>
 * ```
 */
export const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      children,
      direction = 'vertical',
      gap = 4,
      align = 'stretch',
      justify = 'start',
      wrap = false,
      className = '',
      style,
      as: Component = 'div',
    },
    ref
  ) => {
    const flexDirection = direction === 'vertical' ? 'column' : 'row';

    const alignItems = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
    }[align];

    const justifyContent = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    }[justify];

    return (
      <Component
        ref={ref as any}
        className={className}
        style={{
          display: 'flex',
          flexDirection,
          gap: spacing[gap],
          alignItems,
          justifyContent,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          ...style,
        }}
      >
        {children}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';

/**
 * HStack - Horizontal stack shorthand
 */
export const HStack = React.forwardRef<HTMLElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack {...props} direction="horizontal" ref={ref} />
);

HStack.displayName = 'HStack';

/**
 * VStack - Vertical stack shorthand
 */
export const VStack = React.forwardRef<HTMLElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack {...props} direction="vertical" ref={ref} />
);

VStack.displayName = 'VStack';
