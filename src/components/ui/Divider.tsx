import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { spacing, type SpacingKey } from '../../design-system/tokens/spacing';
import { textStyles } from '../../design-system/tokens/typography';

export interface DividerProps {
  /** Divider orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Label text */
  label?: string;
  /** Label alignment */
  labelAlign?: 'left' | 'center' | 'right';
  /** Spacing around divider */
  spacing?: SpacingKey;
  /** Line thickness */
  thickness?: 1 | 2 | 3;
  /** Additional CSS classes */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

/**
 * Divider - Horizontal or vertical divider with optional label
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider label="OR" labelAlign="center" />
 * <Divider orientation="vertical" />
 * ```
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      label,
      labelAlign = 'center',
      spacing: spacingKey = 4,
      thickness = 1,
      className = '',
      style,
    },
    ref
  ) => {
    const spacingValue = spacing[spacingKey];

    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          className={className}
          role="separator"
          aria-orientation="vertical"
          style={{
            width: `${thickness}px`,
            height: '100%',
            backgroundColor: colors.ui.border.light,
            margin: `0 ${spacingValue}`,
            ...style,
          }}
        />
      );
    }

    if (label) {
      const labelPosition = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
      }[labelAlign];

      return (
        <div
          ref={ref}
          className={className}
          role="separator"
          aria-orientation="horizontal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: labelPosition,
            margin: `${spacingValue} 0`,
            ...style,
          }}
        >
          {labelAlign !== 'left' && (
            <div
              style={{
                flex: labelAlign === 'center' ? 1 : 0,
                height: `${thickness}px`,
                backgroundColor: colors.ui.border.light,
                marginRight: spacing[2],
              }}
            />
          )}
          <span
            style={{
              ...textStyles.label,
              color: colors.ui.text.secondary,
              whiteSpace: 'nowrap',
              padding: `0 ${spacing[2]}`,
            }}
          >
            {label}
          </span>
          {labelAlign !== 'right' && (
            <div
              style={{
                flex: labelAlign === 'center' ? 1 : 0,
                height: `${thickness}px`,
                backgroundColor: colors.ui.border.light,
                marginLeft: spacing[2],
              }}
            />
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={className}
        role="separator"
        aria-orientation="horizontal"
        style={{
          height: `${thickness}px`,
          backgroundColor: colors.ui.border.light,
          margin: `${spacingValue} 0`,
          ...style,
        }}
      />
    );
  }
);

Divider.displayName = 'Divider';
