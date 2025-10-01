import React, { useState } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';
import { spacing } from '../../design-system/tokens/spacing';
import { textStyles } from '../../design-system/tokens/typography';
import { shadows, focusRings } from '../../design-system/tokens/shadows';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Select options */
  options: SelectOption[];
  /** Current value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Name attribute */
  name?: string;
  /** ID attribute */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * Select - Styled select dropdown component
 *
 * @example
 * ```tsx
 * <Select
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *   ]}
 *   value={value}
 *   onChange={setValue}
 *   placeholder="Select an option"
 * />
 * ```
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder,
      size = 'md',
      error = false,
      disabled = false,
      required = false,
      fullWidth = false,
      name,
      id,
      className = '',
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const sizes = {
      sm: {
        height: spacing[8],
        fontSize: textStyles.bodySmall.fontSize,
        padding: `${spacing[1.5]} ${spacing[3]}`,
      },
      md: {
        height: spacing[10],
        fontSize: textStyles.body.fontSize,
        padding: `${spacing[2]} ${spacing[4]}`,
      },
      lg: {
        height: spacing[12],
        fontSize: textStyles.bodyLarge.fontSize,
        padding: `${spacing[3]} ${spacing[5]}`,
      },
    };

    const sizeStyles = sizes[size];

    const selectStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      height: sizeStyles.height,
      padding: sizeStyles.padding,
      paddingRight: spacing[10], // Extra space for dropdown arrow
      fontSize: sizeStyles.fontSize,
      fontFamily: textStyles.body.fontFamily,
      color: disabled ? colors.ui.text.tertiary : colors.ui.text.primary,
      backgroundColor: disabled ? colors.ui.background.secondary : colors.ui.background.primary,
      border: `1px solid ${error ? colors.error[500] : colors.ui.border.default}`,
      borderRadius: radius.base,
      outline: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23525252' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `right ${spacing[3]} center`,
      transition: 'all 0.2s ease',
    };

    if (isFocused && !disabled) {
      selectStyles.borderColor = error ? colors.error[500] : colors.primary[500];
      selectStyles.boxShadow = error ? focusRings.error : focusRings.default;
    }

    if (!disabled && !error) {
      selectStyles[':hover' as any] = {
        borderColor: colors.ui.border.dark,
      };
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <select
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        required={required}
        name={name}
        id={id}
        className={className}
        style={selectStyles}
        aria-label={ariaLabel}
        aria-invalid={error}
        aria-required={required}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';
