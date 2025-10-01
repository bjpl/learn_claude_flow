import React from 'react';
import { spacing, type SpacingKey } from '../../design-system/tokens/spacing';

export interface GridProps {
  /** Child elements */
  children: React.ReactNode;
  /** Number of columns */
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  /** Gap between items */
  gap?: SpacingKey;
  /** Column gap (overrides gap) */
  columnGap?: SpacingKey;
  /** Row gap (overrides gap) */
  rowGap?: SpacingKey;
  /** Auto-fit columns with min width */
  autoFit?: string;
  /** Auto-fill columns with min width */
  autoFill?: string;
  /** Additional CSS classes */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Grid - Layout primitive for CSS Grid
 *
 * @example
 * ```tsx
 * <Grid columns={3} gap={4}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 *
 * // Responsive columns
 * <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
 *   {items.map(item => <Card key={item.id}>{item.content}</Card>)}
 * </Grid>
 *
 * // Auto-fit with minimum width
 * <Grid autoFit="200px" gap={4}>
 *   {items.map(item => <Card key={item.id}>{item.content}</Card>)}
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLElement, GridProps>(
  (
    {
      children,
      columns = 1,
      gap = 4,
      columnGap,
      rowGap,
      autoFit,
      autoFill,
      className = '',
      style,
      as: Component = 'div',
    },
    ref
  ) => {
    let gridTemplateColumns: string;

    if (autoFit) {
      gridTemplateColumns = `repeat(auto-fit, minmax(${autoFit}, 1fr))`;
    } else if (autoFill) {
      gridTemplateColumns = `repeat(auto-fill, minmax(${autoFill}, 1fr))`;
    } else if (typeof columns === 'number') {
      gridTemplateColumns = `repeat(${columns}, 1fr)`;
    } else {
      // Responsive columns - use CSS custom properties
      gridTemplateColumns = 'repeat(var(--grid-columns), 1fr)';
    }

    const gridStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns,
      gap: spacing[gap],
      ...style,
    };

    if (columnGap) {
      gridStyles.columnGap = spacing[columnGap];
    }

    if (rowGap) {
      gridStyles.rowGap = spacing[rowGap];
    }

    // Handle responsive columns with CSS variables
    if (typeof columns === 'object') {
      const responsiveVars: Record<string, number> = {
        '--grid-columns': columns.xs || 1,
      };

      const ElementComponent = Component as React.ElementType;
      return (
        <ElementComponent
          ref={ref}
          className={className}
          style={{ ...gridStyles, ...responsiveVars } as React.CSSProperties}
        >
          <style>{`
            @media (min-width: 640px) { ${Component} { --grid-columns: ${columns.sm || columns.xs || 1}; } }
            @media (min-width: 768px) { ${Component} { --grid-columns: ${columns.md || columns.sm || columns.xs || 1}; } }
            @media (min-width: 1024px) { ${Component} { --grid-columns: ${columns.lg || columns.md || columns.sm || columns.xs || 1}; } }
            @media (min-width: 1280px) { ${Component} { --grid-columns: ${columns.xl || columns.lg || columns.md || columns.sm || columns.xs || 1}; } }
          `}</style>
          {children}
        </ElementComponent>
      );
    }

    const ElementComponent = Component as React.ElementType;
    return (
      <ElementComponent ref={ref} className={className} style={gridStyles}>
        {children}
      </ElementComponent>
    );
  }
);

Grid.displayName = 'Grid';
