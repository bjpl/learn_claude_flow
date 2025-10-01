import React from 'react';
import './skeleton.css';

interface SkeletonBaseProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
}

export const SkeletonBase: React.FC<SkeletonBaseProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius,
  className = '',
  variant = 'text',
  animation = 'wave',
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'text':
        return {
          width,
          height,
          borderRadius: borderRadius || '4px',
          marginBottom: '0.5rem',
        };
      case 'circular':
        return {
          width,
          height,
          borderRadius: '50%',
        };
      case 'rectangular':
        return {
          width,
          height,
          borderRadius: borderRadius || '0',
        };
      case 'rounded':
        return {
          width,
          height,
          borderRadius: borderRadius || '8px',
        };
      default:
        return { width, height };
    }
  };

  return (
    <div
      className={`skeleton-base skeleton-${animation} ${className}`}
      style={getVariantStyles()}
      aria-busy="true"
      aria-live="polite"
    />
  );
};

interface SkeletonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`skeleton-group ${className}`} role="status" aria-label="Loading content">
      {children}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
