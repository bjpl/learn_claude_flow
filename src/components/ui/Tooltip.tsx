import React, { useState, useRef, useEffect } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { textStyles } from '../../design-system/tokens/typography';
import { radius } from '../../design-system/tokens/radius';
import { shadows } from '../../design-system/tokens/shadows';

export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode;
  /** Element that triggers the tooltip */
  children: React.ReactElement;
  /** Placement of tooltip */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (ms) */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Tooltip - Accessible tooltip component
 *
 * @example
 * ```tsx
 * <Tooltip content="Click to edit" placement="top">
 *   <Button>Edit</Button>
 * </Tooltip>
 * ```
 */
export const Tooltip = ({
  content,
  children,
  placement = 'top',
  delay = 200,
  className = '',
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + 8;
          break;
      }

      setTooltipPosition({ top, left });
    }
  }, [isVisible, placement]);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const arrowSize = 6;
  const arrowStyles: React.CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
  };

  switch (placement) {
    case 'top':
      arrowStyles.bottom = -arrowSize;
      arrowStyles.left = '50%';
      arrowStyles.transform = 'translateX(-50%)';
      arrowStyles.borderWidth = `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`;
      arrowStyles.borderColor = `${colors.neutral[800]} transparent transparent transparent`;
      break;
    case 'bottom':
      arrowStyles.top = -arrowSize;
      arrowStyles.left = '50%';
      arrowStyles.transform = 'translateX(-50%)';
      arrowStyles.borderWidth = `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`;
      arrowStyles.borderColor = `transparent transparent ${colors.neutral[800]} transparent`;
      break;
    case 'left':
      arrowStyles.right = -arrowSize;
      arrowStyles.top = '50%';
      arrowStyles.transform = 'translateY(-50%)';
      arrowStyles.borderWidth = `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`;
      arrowStyles.borderColor = `transparent transparent transparent ${colors.neutral[800]}`;
      break;
    case 'right':
      arrowStyles.left = -arrowSize;
      arrowStyles.top = '50%';
      arrowStyles.transform = 'translateY(-50%)';
      arrowStyles.borderWidth = `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`;
      arrowStyles.borderColor = `transparent ${colors.neutral[800]} transparent transparent`;
      break;
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={className}
          role="tooltip"
          style={{
            position: 'fixed',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            maxWidth: '300px',
            padding: `${spacing[2]} ${spacing[3]}`,
            backgroundColor: colors.neutral[800],
            color: colors.base.white,
            fontSize: textStyles.bodySmall.fontSize,
            lineHeight: textStyles.bodySmall.lineHeight,
            borderRadius: radius.base,
            boxShadow: shadows.md,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          {content}
          <div style={arrowStyles} />
        </div>
      )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
