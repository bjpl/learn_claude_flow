import React, { useState } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { textStyles } from '../../design-system/tokens/typography';
import { focusRings } from '../../design-system/tokens/shadows';

export interface SwitchProps {
  /** Switch label */
  label?: React.ReactNode;
  /** Checked state */
  checked?: boolean;
  /** Default checked (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Name attribute */
  name?: string;
  /** Value attribute */
  value?: string;
  /** Required field */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * Switch - Toggle switch component
 *
 * @example
 * ```tsx
 * <Switch
 *   label="Enable notifications"
 *   checked={enabled}
 *   onChange={setEnabled}
 * />
 * ```
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      size = 'md',
      name,
      value,
      required = false,
      className = '',
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const sizes = {
      sm: {
        width: spacing[9],
        height: spacing[5],
        thumbSize: spacing[4],
        fontSize: textStyles.bodySmall.fontSize,
      },
      md: {
        width: spacing[11],
        height: spacing[6],
        thumbSize: spacing[5],
        fontSize: textStyles.body.fontSize,
      },
      lg: {
        width: spacing[14],
        height: spacing[8],
        thumbSize: spacing[7],
        fontSize: textStyles.bodyLarge.fontSize,
      },
    };

    const sizeStyles = sizes[size];

    const trackStyles: React.CSSProperties = {
      width: sizeStyles.width,
      height: sizeStyles.height,
      borderRadius: '9999px',
      backgroundColor: checked ? colors.primary[500] : colors.neutral[300],
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative',
      flexShrink: 0,
    };

    if (disabled) {
      trackStyles.opacity = 0.5;
      trackStyles.backgroundColor = colors.neutral[200];
    }

    if (isFocused && !disabled) {
      trackStyles.boxShadow = focusRings.default;
    }

    const thumbStyles: React.CSSProperties = {
      width: sizeStyles.thumbSize,
      height: sizeStyles.thumbSize,
      borderRadius: '50%',
      backgroundColor: colors.base.white,
      position: 'absolute',
      top: '50%',
      left: checked
        ? `calc(100% - ${sizeStyles.thumbSize} - 2px)`
        : '2px',
      transform: 'translateY(-50%)',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <label
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: spacing[3],
          cursor: disabled ? 'not-allowed' : 'pointer',
          userSelect: 'none',
        }}
      >
        <div style={{ position: 'relative' }}>
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            name={name}
            value={value}
            required={required}
            aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
            aria-checked={checked}
            aria-required={required}
            style={{
              position: 'absolute',
              opacity: 0,
              width: 0,
              height: 0,
            }}
          />
          <div style={trackStyles}>
            <div style={thumbStyles} />
          </div>
        </div>
        {label && (
          <span
            style={{
              fontSize: sizeStyles.fontSize,
              color: disabled ? colors.ui.text.tertiary : colors.ui.text.primary,
            }}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
