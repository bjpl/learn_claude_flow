import React, { useState, useRef, useEffect } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { textStyles } from '../../design-system/tokens/typography';
import { radius } from '../../design-system/tokens/radius';
import { shadows } from '../../design-system/tokens/shadows';

export interface MenuProps {
  /** Menu trigger element */
  trigger: React.ReactNode;
  /** Menu items */
  children: React.ReactNode;
  /** Placement of menu */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Close on item click */
  closeOnClick?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Menu - Dropdown menu with compound component pattern
 *
 * @example
 * ```tsx
 * <Menu trigger={<Button>Options</Button>}>
 *   <MenuItem onClick={() => console.log('Edit')}>Edit</MenuItem>
 *   <MenuItem onClick={() => console.log('Delete')} destructive>Delete</MenuItem>
 *   <MenuDivider />
 *   <MenuItem onClick={() => console.log('Archive')}>Archive</MenuItem>
 * </Menu>
 * ```
 */
export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      trigger,
      children,
      placement = 'bottom-start',
      closeOnClick = true,
      className = '',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          triggerRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    const placementStyles = {
      'bottom-start': { top: '100%', left: 0, marginTop: spacing[1] },
      'bottom-end': { top: '100%', right: 0, marginTop: spacing[1] },
      'top-start': { bottom: '100%', left: 0, marginBottom: spacing[1] },
      'top-end': { bottom: '100%', right: 0, marginBottom: spacing[1] },
    };

    const handleItemClick = () => {
      if (closeOnClick) {
        setIsOpen(false);
      }
    };

    return (
      <div ref={ref} className={className} style={{ position: 'relative', display: 'inline-block' }}>
        <div
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: 'pointer' }}
        >
          {trigger}
        </div>
        {isOpen && (
          <div
            ref={menuRef}
            style={{
              position: 'absolute',
              ...placementStyles[placement],
              minWidth: '200px',
              backgroundColor: colors.ui.background.primary,
              border: `1px solid ${colors.ui.border.light}`,
              borderRadius: radius.md,
              boxShadow: shadows.lg,
              padding: spacing[1],
              zIndex: 1000,
            }}
          >
            <MenuContext.Provider value={{ onItemClick: handleItemClick }}>
              {children}
            </MenuContext.Provider>
          </div>
        )}
      </div>
    );
  }
);

Menu.displayName = 'Menu';

const MenuContext = React.createContext<{ onItemClick: () => void }>({
  onItemClick: () => {},
});

export interface MenuItemProps {
  /** Item label */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Leading icon */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Destructive action styling */
  destructive?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * MenuItem - Individual menu item
 */
export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      children,
      onClick,
      icon,
      disabled = false,
      destructive = false,
      className = '',
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const { onItemClick } = React.useContext(MenuContext);

    const handleClick = () => {
      if (!disabled && onClick) {
        onClick();
        onItemClick();
      }
    };

    const itemColor = destructive
      ? colors.error[600]
      : disabled
      ? colors.ui.text.tertiary
      : colors.ui.text.primary;

    return (
      <div
        ref={ref}
        className={className}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="menuitem"
        aria-disabled={disabled}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          padding: `${spacing[2]} ${spacing[3]}`,
          borderRadius: radius.base,
          backgroundColor: isHovered && !disabled ? colors.ui.background.secondary : 'transparent',
          color: itemColor,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s ease',
          fontSize: textStyles.body.fontSize,
        }}
      >
        {icon && <div style={{ flexShrink: 0, width: spacing[5] }}>{icon}</div>}
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    );
  }
);

MenuItem.displayName = 'MenuItem';

/**
 * MenuDivider - Divider between menu sections
 */
export const MenuDivider = () => (
  <div
    style={{
      height: '1px',
      backgroundColor: colors.ui.border.light,
      margin: `${spacing[1]} 0`,
    }}
  />
);

MenuDivider.displayName = 'MenuDivider';

/**
 * MenuLabel - Section label in menu
 */
export interface MenuLabelProps {
  children: React.ReactNode;
}

export const MenuLabel = ({ children }: MenuLabelProps) => (
  <div
    style={{
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: textStyles.caption.fontSize,
      fontWeight: textStyles.label.fontWeight,
      color: colors.ui.text.tertiary,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }}
  >
    {children}
  </div>
);

MenuLabel.displayName = 'MenuLabel';
