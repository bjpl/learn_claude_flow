import React from 'react';
import { SkeletonBase, SkeletonGroup } from './SkeletonBase';
import './skeleton.css';

interface DocumentSkeletonProps {
  pages?: number;
  showToolbar?: boolean;
  className?: string;
}

export const DocumentSkeleton: React.FC<DocumentSkeletonProps> = ({
  pages = 1,
  showToolbar = true,
  className = '',
}) => {
  return (
    <SkeletonGroup className={`document-skeleton ${className}`}>
      {/* PDF Toolbar Skeleton */}
      {showToolbar && (
        <div className="document-skeleton-toolbar">
          <div className="toolbar-left">
            <SkeletonBase width={40} height={40} variant="rounded" />
            <SkeletonBase width={40} height={40} variant="rounded" />
            <SkeletonBase width={100} height={32} variant="rounded" />
          </div>
          <div className="toolbar-center">
            <SkeletonBase width={150} height={32} variant="rounded" />
          </div>
          <div className="toolbar-right">
            <SkeletonBase width={40} height={40} variant="rounded" />
            <SkeletonBase width={40} height={40} variant="rounded" />
            <SkeletonBase width={80} height={32} variant="rounded" />
          </div>
        </div>
      )}

      {/* PDF Pages Skeleton */}
      <div className="document-skeleton-viewer">
        {Array.from({ length: pages }).map((_, index) => (
          <div key={index} className="document-skeleton-page">
            {/* Page header */}
            <div className="page-header">
              <SkeletonBase width="60%" height={24} variant="text" />
              <SkeletonBase width="40%" height={20} variant="text" />
            </div>

            {/* Page content - simulating paragraphs */}
            <div className="page-content">
              {Array.from({ length: 12 }).map((_, paraIndex) => (
                <div key={paraIndex} className="skeleton-paragraph">
                  <SkeletonBase width="95%" height={16} variant="text" />
                  <SkeletonBase width="100%" height={16} variant="text" />
                  <SkeletonBase width="88%" height={16} variant="text" />
                  <SkeletonBase width="92%" height={16} variant="text" />
                </div>
              ))}
            </div>

            {/* Page footer */}
            <div className="page-footer">
              <SkeletonBase width={60} height={16} variant="text" />
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="document-skeleton-progress">
        <SkeletonBase width="100%" height={4} variant="rectangular" animation="pulse" />
      </div>
    </SkeletonGroup>
  );
};

interface DocumentThumbnailSkeletonProps {
  count?: number;
  className?: string;
}

export const DocumentThumbnailSkeleton: React.FC<DocumentThumbnailSkeletonProps> = ({
  count = 5,
  className = '',
}) => {
  return (
    <SkeletonGroup className={`document-thumbnail-skeleton ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="thumbnail-skeleton-item">
          <SkeletonBase width="100%" height={150} variant="rounded" />
          <SkeletonBase width="80%" height={14} variant="text" />
          <SkeletonBase width="60%" height={12} variant="text" />
        </div>
      ))}
    </SkeletonGroup>
  );
};
