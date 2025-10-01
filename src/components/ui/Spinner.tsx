import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';

export interface SpinnerProps {
  /** Spinner size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Spinner color */
  color?: 'primary' | 'accent' | 'neutral' | 'white';
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * Spinner - Loading spinner component
 *
 * @example
 * ```tsx
 * <Spinner size="lg" color="primary" />
 * ```
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      color = 'primary',
      className = '',
      'aria-label': ariaLabel = 'Loading',
    },
    ref
  ) => {
    const sizes = {
      sm: spacing[4],
      md: spacing[6],
      lg: spacing[8],
      xl: spacing[12],
    };

    const colors_map = {
      primary: colors.primary[500],
      accent: colors.accent[500],
      neutral: colors.neutral[500],
      white: colors.base.white,
    };

    const spinnerSize = sizes[size];
    const spinnerColor = colors_map[color];

    return (
      <div
        ref={ref}
        className={className}
        role="status"
        aria-label={ariaLabel}
        style={{
          display: 'inline-block',
          width: spinnerSize,
          height: spinnerSize,
          border: `2px solid ${spinnerColor}33`,
          borderTop: `2px solid ${spinnerColor}`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      >
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
