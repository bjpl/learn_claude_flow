import React from 'react';
import { SkeletonBase, SkeletonGroup } from './SkeletonBase';
import './skeleton.css';

interface NavigationSkeletonProps {
  items?: number;
  showHeader?: boolean;
  showSubItems?: boolean;
  className?: string;
}

export const NavigationSkeleton: React.FC<NavigationSkeletonProps> = ({
  items = 8,
  showHeader = true,
  showSubItems = true,
  className = '',
}) => {
  return (
    <SkeletonGroup className={`navigation-skeleton ${className}`}>
      {/* Navigation Header */}
      {showHeader && (
        <div className="nav-skeleton-header">
          <SkeletonBase width={48} height={48} variant="circular" />
          <SkeletonBase width="60%" height={20} variant="text" />
        </div>
      )}

      {/* Search Bar */}
      <div className="nav-skeleton-search">
        <SkeletonBase width="100%" height={40} variant="rounded" />
      </div>

      {/* Navigation Items */}
      <nav className="nav-skeleton-items">
        {Array.from({ length: items }).map((_, index) => (
          <div key={index} className="nav-item-skeleton">
            <div className="nav-item-main">
              <SkeletonBase width={24} height={24} variant="rounded" />
              <SkeletonBase width="70%" height={18} variant="text" />
              {showSubItems && index % 3 === 0 && (
                <SkeletonBase width={20} height={20} variant="rounded" />
              )}
            </div>

            {/* Sub-items for expanded sections */}
            {showSubItems && index % 3 === 0 && (
              <div className="nav-subitems-skeleton">
                {Array.from({ length: 3 }).map((_, subIndex) => (
                  <div key={subIndex} className="nav-subitem-skeleton">
                    <SkeletonBase width={16} height={16} variant="circular" />
                    <SkeletonBase width="60%" height={16} variant="text" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Navigation Footer */}
      <div className="nav-skeleton-footer">
        <div className="nav-footer-item">
          <SkeletonBase width={32} height={32} variant="circular" />
          <SkeletonBase width="50%" height={16} variant="text" />
        </div>
        <div className="nav-footer-item">
          <SkeletonBase width={32} height={32} variant="circular" />
          <SkeletonBase width="50%" height={16} variant="text" />
        </div>
      </div>
    </SkeletonGroup>
  );
};

interface BreadcrumbSkeletonProps {
  items?: number;
  className?: string;
}

export const BreadcrumbSkeleton: React.FC<BreadcrumbSkeletonProps> = ({
  items = 3,
  className = '',
}) => {
  return (
    <SkeletonGroup className={`breadcrumb-skeleton ${className}`}>
      <div className="breadcrumb-items">
        {Array.from({ length: items }).map((_, index) => (
          <React.Fragment key={index}>
            <SkeletonBase width={80} height={16} variant="text" />
            {index < items - 1 && (
              <SkeletonBase width={12} height={12} variant="text" />
            )}
          </React.Fragment>
        ))}
      </div>
    </SkeletonGroup>
  );
};
