/**
 * CategoryView Component
 * Dedicated page for exploring a specific category
 */

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Folder,
  Grid,
  List,
  SortAsc,
  SortDesc,
  FileText,
  Tag,
  TrendingUp,
  Clock,
  Star,
  CheckCircle,
} from 'lucide-react';
import type { Document } from '../types';
import type { KnowledgeGraph } from '../utils/knowledgeGraph';
import { useEnhancedDocumentStore } from '../stores/enhancedDocumentStore';

interface CategoryViewProps {
  documents: Document[];
  knowledgeGraph: KnowledgeGraph;
  onDocumentSelect: (doc: Document) => void;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'title' | 'recent' | 'popular' | 'difficulty';

export const CategoryView: React.FC<CategoryViewProps> = ({
  documents,
  knowledgeGraph,
  onDocumentSelect,
}) => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [sortAsc, setSortAsc] = useState(true);

  const { analytics, favorites, metadata, isFavorite } = useEnhancedDocumentStore();

  // Get category info
  const categoryInfo = useMemo(() => {
    if (!category) return null;
    const decodedCategory = decodeURIComponent(category);
    return knowledgeGraph.categories.get(decodedCategory);
  }, [category, knowledgeGraph]);

  // Get documents in this category
  const categoryDocuments = useMemo(() => {
    if (!category) return [];
    const decodedCategory = decodeURIComponent(category);
    return documents.filter(doc => doc.category === decodedCategory);
  }, [category, documents]);

  // Sort documents
  const sortedDocuments = useMemo(() => {
    const sorted = [...categoryDocuments];

    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'recent':
        sorted.sort((a, b) => {
          const aAnalytics = analytics.get(a.id);
          const bAnalytics = analytics.get(b.id);
          const aTime = aAnalytics?.lastViewed || '0';
          const bTime = bAnalytics?.lastViewed || '0';
          return bTime.localeCompare(aTime);
        });
        break;

      case 'popular':
        sorted.sort((a, b) => {
          const aViews = analytics.get(a.id)?.viewCount || 0;
          const bViews = analytics.get(b.id)?.viewCount || 0;
          return bViews - aViews;
        });
        break;

      case 'difficulty':
        sorted.sort((a, b) => {
          const aMeta = metadata.get(a.id);
          const bMeta = metadata.get(b.id);
          const levels = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
          const aLevel = levels[aMeta?.difficulty || 'intermediate'];
          const bLevel = levels[bMeta?.difficulty || 'intermediate'];
          return aLevel - bLevel;
        });
        break;
    }

    return sortAsc ? sorted : sorted.reverse();
  }, [categoryDocuments, sortBy, sortAsc, analytics, metadata]);

  // Statistics
  const stats = useMemo(() => {
    const totalDocs = categoryDocuments.length;
    const favoritedDocs = categoryDocuments.filter(doc => isFavorite(doc.id)).length;
    const viewedDocs = categoryDocuments.filter(doc => analytics.get(doc.id)?.viewCount).length;
    const completedDocs = categoryDocuments.filter(doc => analytics.get(doc.id)?.completed).length;

    return { totalDocs, favoritedDocs, viewedDocs, completedDocs };
  }, [categoryDocuments, favorites, analytics, isFavorite]);

  if (!categoryInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h2>
          <p className="text-gray-600 mb-4">The category you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{categoryInfo.icon}</span>
                <h1 className="text-3xl font-bold text-gray-900">{categoryInfo.name}</h1>
              </div>
              <p className="text-gray-600 text-lg mb-4">{categoryInfo.description}</p>

              {/* Statistics */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">{stats.totalDocs}</span>
                  <span className="text-gray-600">documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold">{stats.favoritedDocs}</span>
                  <span className="text-gray-600">favorited</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">{stats.viewedDocs}</span>
                  <span className="text-gray-600">viewed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-semibold">{stats.completedDocs}</span>
                  <span className="text-gray-600">completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* View Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
              >
                <option value="title">Title</option>
                <option value="recent">Recently Viewed</option>
                <option value="popular">Most Popular</option>
                <option value="difficulty">Difficulty</option>
              </select>

              <button
                onClick={() => setSortAsc(!sortAsc)}
                className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
              >
                {sortAsc ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Grid/List */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDocuments.map(doc => {
              const node = knowledgeGraph.nodes.get(doc.id);
              const docAnalytics = analytics.get(doc.id);
              const docMeta = metadata.get(doc.id);
              const isFav = isFavorite(doc.id);

              return (
                <button
                  key={doc.id}
                  onClick={() => onDocumentSelect(doc)}
                  className="bg-white rounded-lg border border-gray-200 p-6 text-left hover:shadow-lg hover:border-blue-300 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <FileText className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                    {isFav && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                    {doc.title}
                  </h3>

                  {doc.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {doc.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {node?.type && (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                        {node.type}
                      </span>
                    )}
                    {docMeta?.difficulty && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        docMeta.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                        docMeta.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                        docMeta.difficulty === 'advanced' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {docMeta.difficulty}
                      </span>
                    )}
                    {docMeta?.readingTime && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {docMeta.readingTime} min
                      </span>
                    )}
                  </div>

                  {docAnalytics && (
                    <div className="text-xs text-gray-500 flex items-center gap-3">
                      <span>{docAnalytics.viewCount} views</span>
                      {docAnalytics.completed && (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Completed
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedDocuments.map(doc => {
              const node = knowledgeGraph.nodes.get(doc.id);
              const docAnalytics = analytics.get(doc.id);
              const docMeta = metadata.get(doc.id);
              const isFav = isFavorite(doc.id);

              return (
                <button
                  key={doc.id}
                  onClick={() => onDocumentSelect(doc)}
                  className="w-full bg-white rounded-lg border border-gray-200 p-4 text-left hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                          {doc.title}
                        </h3>
                        {isFav && <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0" />}
                      </div>

                      {doc.description && (
                        <p className="text-sm text-gray-600 mb-2">
                          {doc.description}
                        </p>
                      )}

                      <div className="flex items-center gap-3 flex-wrap">
                        {node?.type && (
                          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                            {node.type}
                          </span>
                        )}
                        {docMeta?.difficulty && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            docMeta.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                            docMeta.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                            docMeta.difficulty === 'advanced' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {docMeta.difficulty}
                          </span>
                        )}
                        {doc.tags?.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                        {docAnalytics && (
                          <>
                            <span className="text-xs text-gray-500">{docAnalytics.viewCount} views</span>
                            {docAnalytics.completed && (
                              <span className="text-xs text-green-600 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Completed
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
