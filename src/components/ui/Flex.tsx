import React from 'react';
import { spacing, type SpacingKey } from '../../design-system/tokens/spacing';

export interface FlexProps {
  /** Child elements */
  children: React.ReactNode;
  /** Flex direction */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /** Gap between items */
  gap?: SpacingKey;
  /** Align items */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Flex wrap */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Flex grow */
  grow?: number;
  /** Flex shrink */
  shrink?: number;
  /** Flex basis */
  basis?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Flex - Advanced flexbox layout primitive
 *
 * @example
 * ```tsx
 * <Flex justify="between" align="center" gap={4}>
 *   <Text>Left content</Text>
 *   <Button>Right action</Button>
 * </Flex>
 * ```
 */
export const Flex = React.forwardRef<HTMLElement, FlexProps>(
  (
    {
      children,
      direction = 'row',
      gap,
      align = 'stretch',
      justify = 'start',
      wrap = 'nowrap',
      grow,
      shrink,
      basis,
      className = '',
      style,
      as: Component = 'div',
    },
    ref
  ) => {
    const alignItems = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
      baseline: 'baseline',
    }[align];

    const justifyContent = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    }[justify];

    const flexStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      alignItems,
      justifyContent,
      flexWrap: wrap,
      ...style,
    };

    if (gap !== undefined) {
      flexStyles.gap = spacing[gap];
    }

    if (grow !== undefined) {
      flexStyles.flexGrow = grow;
    }

    if (shrink !== undefined) {
      flexStyles.flexShrink = shrink;
    }

    if (basis !== undefined) {
      flexStyles.flexBasis = basis;
    }

    return (
      <Component ref={ref as any} className={className} style={flexStyles}>
        {children}
      </Component>
    );
  }
);

Flex.displayName = 'Flex';

/**
 * FlexItem - Individual flex item with control
 */
export interface FlexItemProps {
  children: React.ReactNode;
  grow?: number;
  shrink?: number;
  basis?: string | number;
  order?: number;
  alignSelf?: 'auto' | 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  className?: string;
  style?: React.CSSProperties;
}

export const FlexItem = React.forwardRef<HTMLDivElement, FlexItemProps>(
  (
    { children, grow, shrink, basis, order, alignSelf, className = '', style },
    ref
  ) => {
    const alignSelfValue = alignSelf
      ? {
          auto: 'auto',
          start: 'flex-start',
          center: 'center',
          end: 'flex-end',
          stretch: 'stretch',
          baseline: 'baseline',
        }[alignSelf]
      : undefined;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          flexGrow: grow,
          flexShrink: shrink,
          flexBasis: basis,
          order,
          alignSelf: alignSelfValue,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

FlexItem.displayName = 'FlexItem';
