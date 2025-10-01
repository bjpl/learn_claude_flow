import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { spacing, type SpacingKey } from '../../design-system/tokens/spacing';
import { textStyles } from '../../design-system/tokens/typography';
import { radius } from '../../design-system/tokens/radius';

export interface ListProps {
  /** List items */
  children: React.ReactNode;
  /** List type */
  type?: 'unordered' | 'ordered';
  /** Gap between items */
  gap?: SpacingKey;
  /** Divider between items */
  divider?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

/**
 * List - Styled list component
 *
 * @example
 * ```tsx
 * <List divider>
 *   <ListItem>Item 1</ListItem>
 *   <ListItem>Item 2</ListItem>
 * </List>
 * ```
 */
export const List = React.forwardRef<HTMLElement, ListProps>(
  (
    {
      children,
      type = 'unordered',
      gap = 2,
      divider = false,
      className = '',
      style,
    },
    ref
  ) => {
    const Component = type === 'ordered' ? 'ol' : 'ul';

    const listStyles: React.CSSProperties = {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[gap],
      ...style,
    };

    return (
      <Component ref={ref as any} className={className} style={listStyles}>
        {divider
          ? React.Children.map(children, (child, index) => (
              <>
                {child}
                {index < React.Children.count(children) - 1 && (
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: colors.ui.border.light,
                    }}
                  />
                )}
              </>
            ))
          : children}
      </Component>
    );
  }
);

List.displayName = 'List';

export interface ListItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Leading icon or element */
  leading?: React.ReactNode;
  /** Trailing icon or element */
  trailing?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Selected state */
  selected?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

/**
 * ListItem - Individual list item with interactive capabilities
 */
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      children,
      leading,
      trailing,
      onClick,
      disabled = false,
      selected = false,
      className = '',
      style,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const isInteractive = !!onClick && !disabled;

    const itemStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[3],
      padding: `${spacing[2]} ${spacing[3]}`,
      borderRadius: radius.base,
      backgroundColor: selected
        ? colors.primary[50]
        : isHovered && isInteractive
        ? colors.ui.background.secondary
        : 'transparent',
      cursor: isInteractive ? 'pointer' : 'default',
      transition: 'background-color 0.2s ease',
      color: disabled ? colors.ui.text.tertiary : colors.ui.text.primary,
      ...style,
    };

    const handleClick = () => {
      if (isInteractive) {
        onClick();
      }
    };

    return (
      <li
        ref={ref}
        className={className}
        style={itemStyles}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role={isInteractive ? 'button' : undefined}
        aria-disabled={disabled}
        aria-selected={selected}
      >
        {leading && <div style={{ flexShrink: 0 }}>{leading}</div>}
        <div style={{ flex: 1, ...textStyles.body }}>{children}</div>
        {trailing && <div style={{ flexShrink: 0 }}>{trailing}</div>}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';
