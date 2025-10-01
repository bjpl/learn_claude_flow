import React, { useState } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { textStyles } from '../../design-system/tokens/typography';
import { focusRings } from '../../design-system/tokens/shadows';

export interface RadioProps {
  /** Radio label */
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
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Name attribute (for grouping) */
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
 * Radio - Styled radio button with label support
 *
 * @example
 * ```tsx
 * <Radio
 *   name="choice"
 *   value="option1"
 *   label="Option 1"
 *   checked={selected === 'option1'}
 *   onChange={() => setSelected('option1')}
 * />
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      error = false,
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
      sm: { size: spacing[4], fontSize: textStyles.bodySmall.fontSize, dotSize: '6px' },
      md: { size: spacing[5], fontSize: textStyles.body.fontSize, dotSize: '8px' },
      lg: { size: spacing[6], fontSize: textStyles.bodyLarge.fontSize, dotSize: '10px' },
    };

    const sizeStyles = sizes[size];

    const radioStyles: React.CSSProperties = {
      width: sizeStyles.size,
      height: sizeStyles.size,
      borderRadius: '50%',
      border: `2px solid ${error ? colors.error[500] : colors.ui.border.default}`,
      backgroundColor: colors.base.white,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      appearance: 'none',
      position: 'relative',
      flexShrink: 0,
      outline: 'none',
    };

    if (checked) {
      radioStyles.borderColor = error ? colors.error[500] : colors.primary[500];
    }

    if (disabled) {
      radioStyles.opacity = 0.5;
      radioStyles.backgroundColor = colors.ui.background.secondary;
    }

    if (isFocused && !disabled) {
      radioStyles.boxShadow = error ? focusRings.error : focusRings.default;
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
            ref={ref}
            type="radio"
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
            style={radioStyles}
          />
          {checked && (
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: sizeStyles.dotSize,
                height: sizeStyles.dotSize,
                borderRadius: '50%',
                backgroundColor: disabled ? colors.ui.text.tertiary : colors.primary[500],
                pointerEvents: 'none',
              }}
            />
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

Radio.displayName = 'Radio';

/**
 * RadioGroup - Container for radio buttons
 */
export interface RadioGroupProps {
  children: React.ReactNode;
  /** Group label */
  label?: string;
  /** Group orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Gap between radios */
  gap?: number;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      children,
      label,
      orientation = 'vertical',
      gap = 3,
      className = '',
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel || label}
        className={className}
        style={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          gap: spacing[gap as keyof typeof spacing],
        }}
      >
        {label && (
          <div
            style={{
              fontSize: textStyles.label.fontSize,
              fontWeight: textStyles.label.fontWeight,
              color: colors.ui.text.primary,
              marginBottom: spacing[2],
            }}
          >
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
