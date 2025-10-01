import React from 'react';
import { textStyles, type TextStyle } from '../../design-system/tokens/typography';
import { colors } from '../../design-system/tokens/colors';

export interface TextProps {
  /** Text content */
  children: React.ReactNode;
  /** Text style variant */
  variant?: TextStyle;
  /** Text color */
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'link' | 'success' | 'error' | 'warning';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Text transform */
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Number of lines before truncation */
  lineClamp?: number;
  /** Font weight override */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Additional CSS classes */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Text - Typography component with design system integration
 *
 * @example
 * ```tsx
 * <Text variant="h1" color="primary">Heading</Text>
 * <Text variant="body" truncate>Long text that will be truncated...</Text>
 * <Text variant="label" transform="uppercase">Label</Text>
 * ```
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      children,
      variant = 'body',
      color = 'primary',
      align,
      transform,
      truncate = false,
      lineClamp,
      weight,
      className = '',
      style,
      as,
    },
    ref
  ) => {
    // Determine HTML element based on variant
    const defaultElement = {
      displayLarge: 'h1',
      displayMedium: 'h1',
      displaySmall: 'h1',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      body: 'p',
      bodyLarge: 'p',
      bodySmall: 'p',
      label: 'label',
      caption: 'span',
      overline: 'span',
      code: 'code',
      codeBlock: 'pre',
      link: 'a',
      linkUnderline: 'a',
    }[variant] as keyof JSX.IntrinsicElements;

    const Component = as || defaultElement;

    const colorValues = {
      primary: colors.ui.text.primary,
      secondary: colors.ui.text.secondary,
      tertiary: colors.ui.text.tertiary,
      inverse: colors.ui.text.inverse,
      link: colors.ui.text.link,
      success: colors.success[600],
      error: colors.error[600],
      warning: colors.warning[600],
    };

    const textStyle = textStyles[variant];
    const textColor = colorValues[color];

    const textStyles_computed: React.CSSProperties = {
      ...textStyle,
      color: textColor,
      textAlign: align,
      textTransform: transform,
      ...style,
    };

    if (weight) {
      const weights = {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      };
      textStyles_computed.fontWeight = weights[weight];
    }

    if (truncate) {
      textStyles_computed.overflow = 'hidden';
      textStyles_computed.textOverflow = 'ellipsis';
      textStyles_computed.whiteSpace = 'nowrap';
    }

    if (lineClamp) {
      textStyles_computed.display = '-webkit-box';
      textStyles_computed.WebkitLineClamp = lineClamp;
      textStyles_computed.WebkitBoxOrient = 'vertical';
      textStyles_computed.overflow = 'hidden';
    }

    return (
      <Component ref={ref as any} className={className} style={textStyles_computed}>
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

// Convenience components
export const Heading = React.forwardRef<HTMLElement, Omit<TextProps, 'variant'> & { level: 1 | 2 | 3 | 4 | 5 | 6 }>(
  ({ level, ...props }, ref) => {
    const variant = `h${level}` as TextStyle;
    return <Text {...props} variant={variant} ref={ref} />;
  }
);

Heading.displayName = 'Heading';

export const Body = React.forwardRef<HTMLElement, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text {...props} variant="body" ref={ref} />
);

Body.displayName = 'Body';

export const Label = React.forwardRef<HTMLElement, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text {...props} variant="label" ref={ref} />
);

Label.displayName = 'Label';

export const Caption = React.forwardRef<HTMLElement, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text {...props} variant="caption" ref={ref} />
);

Caption.displayName = 'Caption';
