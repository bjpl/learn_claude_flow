import React, { useState } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';
import { spacing } from '../../design-system/tokens/spacing';
import { textStyles } from '../../design-system/tokens/typography';
import { focusRings } from '../../design-system/tokens/shadows';

export interface CheckboxProps {
  /** Checkbox label */
  label?: React.ReactNode;
  /** Checked state */
  checked?: boolean;
  /** Default checked (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
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
 * Checkbox - Styled checkbox with label support
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="Accept terms and conditions"
 *   checked={accepted}
 *   onChange={setAccepted}
 * />
 *
 * <Checkbox
 *   label="Enable notifications"
 *   indeterminate={someSelected}
 * />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      error = false,
      indeterminate = false,
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
      sm: { size: spacing[4], fontSize: textStyles.bodySmall.fontSize },
      md: { size: spacing[5], fontSize: textStyles.body.fontSize },
      lg: { size: spacing[6], fontSize: textStyles.bodyLarge.fontSize },
    };

    const sizeStyles = sizes[size];

    // Use internal ref to set indeterminate property
    const internalRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => internalRef.current!);

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const checkboxStyles: React.CSSProperties = {
      width: sizeStyles.size,
      height: sizeStyles.size,
      borderRadius: radius.sm,
      border: `2px solid ${error ? colors.error[500] : colors.ui.border.default}`,
      backgroundColor: checked || indeterminate ? colors.primary[500] : colors.base.white,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      appearance: 'none',
      position: 'relative',
      flexShrink: 0,
      outline: 'none',
    };

    if (disabled) {
      checkboxStyles.opacity = 0.5;
      checkboxStyles.backgroundColor = colors.ui.background.secondary;
    }

    if (isFocused && !disabled) {
      checkboxStyles.boxShadow = error ? focusRings.error : focusRings.default;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <label
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: spacing[2],
          cursor: disabled ? 'not-allowed' : 'pointer',
          userSelect: 'none',
        }}
      >
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <input
            ref={internalRef}
            type="checkbox"
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
            aria-invalid={error}
            aria-required={required}
            style={checkboxStyles}
          />
          {(checked || indeterminate) && (
            <svg
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                width: `calc(${sizeStyles.size} - 4px)`,
                height: `calc(${sizeStyles.size} - 4px)`,
              }}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {indeterminate ? (
                <rect x="2" y="5" width="8" height="2" fill="white" />
              ) : (
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          )}
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

Checkbox.displayName = 'Checkbox';
