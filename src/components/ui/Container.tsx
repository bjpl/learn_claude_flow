import React from 'react';
import { semanticSpacing } from '../../design-system/tokens/spacing';

export interface ContainerProps {
  /** Child elements */
  children: React.ReactNode;
  /** Container size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Center the container */
  centered?: boolean;
  /** Add padding */
  padding?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Container - Responsive container with max-width constraints
 *
 * @example
 * ```tsx
 * <Container size="lg" centered padding>
 *   <Stack gap={8}>
 *     <Heading>Page Title</Heading>
 *     <Text>Content goes here</Text>
 *   </Stack>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  (
    {
      children,
      size = 'lg',
      centered = true,
      padding = true,
      className = '',
      style,
      as: Component = 'div',
    },
    ref
  ) => {
    const maxWidths = {
      xs: semanticSpacing.containerXs,
      sm: semanticSpacing.containerSm,
      md: semanticSpacing.containerMd,
      lg: semanticSpacing.containerLg,
      xl: semanticSpacing.containerXl,
      '2xl': semanticSpacing.container2xl,
      full: '100%',
    };

    const containerStyles: React.CSSProperties = {
      width: '100%',
      maxWidth: maxWidths[size],
      ...style,
    };

    if (centered) {
      containerStyles.marginLeft = 'auto';
      containerStyles.marginRight = 'auto';
    }

    if (padding) {
      containerStyles.paddingLeft = semanticSpacing.pageMarginMobile;
      containerStyles.paddingRight = semanticSpacing.pageMarginMobile;
    }

    return (
      <Component ref={ref as any} className={className} style={containerStyles}>
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
