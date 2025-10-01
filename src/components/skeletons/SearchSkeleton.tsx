import React from 'react';
import { SkeletonBase, SkeletonGroup } from './SkeletonBase';
import './skeleton.css';

interface SearchSkeletonProps {
  results?: number;
  showFilters?: boolean;
  className?: string;
}

export const SearchSkeleton: React.FC<SearchSkeletonProps> = ({
  results = 5,
  showFilters = true,
  className = '',
}) => {
  return (
    <SkeletonGroup className={`search-skeleton ${className}`}>
      {/* Search Header */}
      <div className="search-skeleton-header">
        <SkeletonBase width="100%" height={48} variant="rounded" />
        <div className="search-meta">
          <SkeletonBase width={200} height={20} variant="text" />
          <SkeletonBase width={150} height={32} variant="rounded" />
        </div>
      </div>

      <div className="search-skeleton-content">
        {/* Filters Sidebar */}
        {showFilters && (
          <aside className="search-skeleton-filters">
            <SkeletonBase width="80%" height={24} variant="text" />

            {/* Filter groups */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="filter-group-skeleton">
                <SkeletonBase width="60%" height={18} variant="text" />
                {Array.from({ length: 4 }).map((_, optIndex) => (
                  <div key={optIndex} className="filter-option-skeleton">
                    <SkeletonBase width={20} height={20} variant="rounded" />
                    <SkeletonBase width="70%" height={16} variant="text" />
                  </div>
                ))}
              </div>
            ))}
          </aside>
        )}

        {/* Results List */}
        <div className="search-skeleton-results">
          {Array.from({ length: results }).map((_, index) => (
            <div key={index} className="search-result-skeleton">
              <div className="result-icon">
                <SkeletonBase width={48} height={48} variant="rounded" />
              </div>
              <div className="result-content">
                <SkeletonBase width="85%" height={20} variant="text" />
                <SkeletonBase width="100%" height={16} variant="text" />
                <SkeletonBase width="95%" height={16} variant="text" />
                <SkeletonBase width="70%" height={16} variant="text" />
                <div className="result-meta">
                  <SkeletonBase width={120} height={14} variant="text" />
                  <SkeletonBase width={80} height={14} variant="text" />
                  <SkeletonBase width={100} height={14} variant="text" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonGroup>
  );
};

interface SearchSuggestionSkeletonProps {
  count?: number;
  className?: string;
}

export const SearchSuggestionSkeleton: React.FC<SearchSuggestionSkeletonProps> = ({
  count = 5,
  className = '',
}) => {
  return (
    <SkeletonGroup className={`search-suggestion-skeleton ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="suggestion-skeleton-item">
          <SkeletonBase width={24} height={24} variant="circular" />
          <SkeletonBase width="80%" height={16} variant="text" />
        </div>
      ))}
    </SkeletonGroup>
  );
};
