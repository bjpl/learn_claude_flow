/**
 * OverviewDashboard Component
 * Main landing page showing all categories with counts and quick access
 */

import React, { useMemo } from 'react';
import {
  BookOpen, TrendingUp, Clock, Star, ArrowRight,
  Search, Zap, Target
} from 'lucide-react';
import type { Document } from '../types';
import type { KnowledgeGraph } from '../utils/knowledgeGraph';

interface OverviewDashboardProps {
  documents: Document[];
  knowledgeGraph: KnowledgeGraph;
  onCategorySelect: (category: string) => void;
  onDocumentSelect: (doc: Document) => void;
  onSearchFocus: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  documents,
  knowledgeGraph,
  onCategorySelect,
  onDocumentSelect,
  onSearchFocus,
}) => {
  console.log('[DASHBOARD] Rendering OverviewDashboard', {
    documentsCount: documents.length,
    categoriesCount: knowledgeGraph.categories.size
  });

  const stats = useMemo(() => ({
    totalDocuments: documents.length,
    totalCategories: knowledgeGraph.categories.size,
    totalAgents: documents.filter(d => d.category?.includes('Agents')).length,
    totalCommands: documents.filter(d => d.category?.includes('Commands')).length,
  }), [documents, knowledgeGraph]);

  const frequentlyUsed = useMemo(() => {
    return knowledgeGraph.frequentlyUsed
      .map(id => documents.find(d => d.id === id))
      .filter((doc): doc is Document => doc !== undefined);
  }, [knowledgeGraph, documents]);

  const categoriesArray = useMemo(() =>
    Array.from(knowledgeGraph.categories.entries())
      .map(([key, info]) => ({ key, ...info }))
      .sort((a, b) => b.count - a.count),
    [knowledgeGraph]
  );

  console.log('[DASHBOARD] Stats calculated:', stats);
  console.log('[DASHBOARD] Frequently used:', frequentlyUsed.length);
  console.log('[DASHBOARD] Categories:', categoriesArray.length);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', hover: 'hover:bg-blue-100' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', hover: 'hover:bg-purple-100' },
      gray: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', hover: 'hover:bg-gray-100' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', hover: 'hover:bg-yellow-100' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', hover: 'hover:bg-amber-100' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', hover: 'hover:bg-green-100' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', hover: 'hover:bg-indigo-100' },
      cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', hover: 'hover:bg-cyan-100' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', hover: 'hover:bg-pink-100' },
      slate: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', hover: 'hover:bg-slate-100' },
    };
    return colors[color] || colors.gray;
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50"
      style={{
        minHeight: '100vh',
        display: 'block',
        position: 'relative',
        overflow: 'auto'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Claude Flow Knowledge Base
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore {stats.totalDocuments} documents across {stats.totalCategories} categories
          </p>

          {/* Quick Search */}
          <button
            onClick={onSearchFocus}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-700 hover:text-gray-900"
          >
            <Search className="w-5 h-5" />
            <span>Search documentation...</span>
            <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-300">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</div>
                <div className="text-sm text-gray-600">Documents</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalAgents}</div>
                <div className="text-sm text-gray-600">Agents</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalCommands}</div>
                <div className="text-sm text-gray-600">Commands</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalCategories}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Used */}
        {frequentlyUsed.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Frequently Used</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {frequentlyUsed.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => onDocumentSelect(doc)}
                  className="text-left bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="font-semibold text-gray-900 mb-1">{doc.title}</div>
                  <div className="text-sm text-gray-600 mb-2">{doc.description}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {doc.category?.split('/')[0]}
                    </span>
                    {doc.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">All Categories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesArray.map(({ key, name, icon, color, description, count, subcategories }) => {
              const colorClasses = getColorClasses(color);

              return (
                <div
                  key={key}
                  className={`bg-white rounded-lg border-2 ${colorClasses.border} p-6 hover:shadow-lg transition-shadow`}
                >
                  <button
                    onClick={() => onCategorySelect(key)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-900">{name}</h3>
                          <p className="text-sm text-gray-600">{count} documents</p>
                        </div>
                      </div>
                      <ArrowRight className={`w-5 h-5 ${colorClasses.text}`} />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{description}</p>

                    {/* Subcategories */}
                    {subcategories.length > 0 && (
                      <div className="space-y-1">
                        {subcategories.map(sub => (
                          <div
                            key={sub.name}
                            className={`flex items-center justify-between px-3 py-2 rounded ${colorClasses.bg} ${colorClasses.hover} transition-colors`}
                          >
                            <span className={`text-sm font-medium ${colorClasses.text}`}>
                              {sub.name}
                            </span>
                            <span className={`text-xs ${colorClasses.text}`}>
                              {sub.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Use Ctrl+K to quickly search across all documentation</li>
                <li>• Click on categories to explore related documents</li>
                <li>• Star frequently used documents for quick access</li>
                <li>• Use tags to filter and discover related content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
