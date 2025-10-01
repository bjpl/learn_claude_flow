import React, { useState } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';
import { spacing } from '../../design-system/tokens/spacing';
import { textStyles } from '../../design-system/tokens/typography';
import { focusRings } from '../../design-system/tokens/shadows';

export interface TextareaProps {
  /** Current value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Number of visible rows */
  rows?: number;
  /** Minimum rows (auto-resize) */
  minRows?: number;
  /** Maximum rows (auto-resize) */
  maxRows?: number;
  /** Auto-resize textarea */
  autoResize?: boolean;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Required field */
  required?: boolean;
  /** Maximum character count */
  maxLength?: number;
  /** Show character count */
  showCount?: boolean;
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
 * Textarea - Multi-line text input component
 *
 * @example
 * ```tsx
 * <Textarea
 *   placeholder="Enter your message..."
 *   rows={4}
 *   value={message}
 *   onChange={setMessage}
 *   maxLength={500}
 *   showCount
 * />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      placeholder,
      rows = 3,
      minRows,
      maxRows,
      autoResize = false,
      error = false,
      disabled = false,
      readOnly = false,
      required = false,
      maxLength,
      showCount = false,
      fullWidth = false,
      name,
      id,
      className = '',
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');

    const currentValue = value !== undefined ? value : internalValue;
    const characterCount = currentValue.length;

    const textareaStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      minHeight: autoResize && minRows ? `${minRows * 1.5}rem` : undefined,
      maxHeight: autoResize && maxRows ? `${maxRows * 1.5}rem` : undefined,
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: textStyles.body.fontSize,
      lineHeight: textStyles.body.lineHeight,
      fontFamily: textStyles.body.fontFamily,
      color: disabled ? colors.ui.text.tertiary : colors.ui.text.primary,
      backgroundColor: disabled || readOnly ? colors.ui.background.secondary : colors.ui.background.primary,
      border: `1px solid ${error ? colors.error[500] : colors.ui.border.default}`,
      borderRadius: radius.base,
      outline: 'none',
      resize: autoResize ? 'none' : 'vertical',
      transition: 'all 0.2s ease',
      cursor: disabled ? 'not-allowed' : 'text',
    };

    if (isFocused && !disabled && !readOnly) {
      textareaStyles.borderColor = error ? colors.error[500] : colors.primary[500];
      textareaStyles.boxShadow = error ? focusRings.error : focusRings.default;
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <div
        className={className}
        style={{
          width: fullWidth ? '100%' : 'auto',
          position: 'relative',
        }}
      >
        <textarea
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          name={name}
          id={id}
          aria-label={ariaLabel}
          aria-invalid={error}
          aria-required={required}
          style={textareaStyles}
        />
        {showCount && maxLength && (
          <div
            style={{
              marginTop: spacing[1],
              fontSize: textStyles.caption.fontSize,
              color: characterCount > maxLength * 0.9 ? colors.warning[600] : colors.ui.text.tertiary,
              textAlign: 'right',
            }}
          >
            {characterCount} / {maxLength}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
