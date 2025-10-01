import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { dimensions } from '../../design-system/tokens/spacing';
import { textStyles } from '../../design-system/tokens/typography';

export interface AvatarProps {
  /** Avatar image source */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Initials to display if no image */
  initials?: string;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Shape variant */
  shape?: 'circle' | 'square';
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Avatar - User avatar component with status indicators
 *
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" alt="John Doe" size="lg" status="online" />
 * <Avatar initials="JD" size="md" />
 * ```
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      initials,
      size = 'md',
      shape = 'circle',
      status,
      className = '',
    },
    ref
  ) => {
    const sizes = {
      xs: { size: dimensions.avatarXs, fontSize: textStyles.caption.fontSize },
      sm: { size: dimensions.avatarSm, fontSize: textStyles.bodySmall.fontSize },
      md: { size: dimensions.avatar, fontSize: textStyles.body.fontSize },
      lg: { size: dimensions.avatarLg, fontSize: textStyles.bodyLarge.fontSize },
      xl: { size: dimensions.avatarXl, fontSize: textStyles.h4.fontSize },
    };

    const statusColors = {
      online: colors.success[500],
      offline: colors.neutral[400],
      away: colors.warning[500],
      busy: colors.error[500],
    };

    const sizeStyles = sizes[size];
    const borderRadius = shape === 'circle' ? '50%' : '8px';

    const avatarStyles: React.CSSProperties = {
      width: sizeStyles.size,
      height: sizeStyles.size,
      borderRadius,
      backgroundColor: colors.primary[100],
      color: colors.primary[700],
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: sizeStyles.fontSize,
      fontWeight: textStyles.label.fontWeight,
      overflow: 'hidden',
      flexShrink: 0,
      position: 'relative',
    };

    const statusSize = size === 'xs' || size === 'sm' ? '8px' : '12px';

    return (
      <div ref={ref} className={className} style={avatarStyles}>
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <span>{initials || '?'}</span>
        )}
        {status && (
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: statusSize,
              height: statusSize,
              borderRadius: '50%',
              backgroundColor: statusColors[status],
              border: `2px solid ${colors.base.white}`,
            }}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

/**
 * AvatarGroup - Group of overlapping avatars
 */
export interface AvatarGroupProps {
  children: React.ReactNode;
  /** Maximum avatars to show */
  max?: number;
  /** Size of avatars */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
}

export const AvatarGroup = ({
  children,
  max = 3,
  size = 'md',
  className = '',
}: AvatarGroupProps) => {
  const childArray = React.Children.toArray(children);
  const visibleChildren = max ? childArray.slice(0, max) : childArray;
  const remainingCount = childArray.length - visibleChildren.length;

  const sizes = {
    xs: dimensions.avatarXs,
    sm: dimensions.avatarSm,
    md: dimensions.avatar,
    lg: dimensions.avatarLg,
    xl: dimensions.avatarXl,
  };

  const avatarSize = sizes[size];

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          style={{
            marginLeft: index > 0 ? `calc(-${avatarSize} / 3)` : 0,
            zIndex: visibleChildren.length - index,
          }}
        >
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <Avatar
          initials={`+${remainingCount}`}
          size={size}
          style={{ marginLeft: `calc(-${avatarSize} / 3)` }}
        />
      )}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
