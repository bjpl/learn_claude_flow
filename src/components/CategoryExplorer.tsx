/**
 * CategoryExplorer Component
 * Hierarchical navigation through categories and subcategories
 */

import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, Tag } from 'lucide-react';
import type { Document } from '../types';
import type { KnowledgeGraph } from '../utils/knowledgeGraph';

interface CategoryExplorerProps {
  documents: Document[];
  knowledgeGraph: KnowledgeGraph;
  selectedDocument: Document | null;
  onDocumentSelect: (doc: Document) => void;
  selectedCategory?: string;
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({
  knowledgeGraph,
  selectedDocument,
  onDocumentSelect,
  selectedCategory,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(selectedCategory ? [selectedCategory] : [])
  );
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set());

  const categories = useMemo(() =>
    Array.from(knowledgeGraph.categories.entries())
      .map(([key, info]) => ({ key, ...info }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    [knowledgeGraph]
  );

  const toggleCategory = (key: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSubcategory = (key: string) => {
    const newExpanded = new Set(expandedSubcategories);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedSubcategories(newExpanded);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { text: string; bg: string; hover: string }> = {
      blue: { text: 'text-blue-700', bg: 'bg-blue-50', hover: 'hover:bg-blue-100' },
      purple: { text: 'text-purple-700', bg: 'bg-purple-50', hover: 'hover:bg-purple-100' },
      gray: { text: 'text-gray-700', bg: 'bg-gray-50', hover: 'hover:bg-gray-100' },
      yellow: { text: 'text-yellow-700', bg: 'bg-yellow-50', hover: 'hover:bg-yellow-100' },
      amber: { text: 'text-amber-700', bg: 'bg-amber-50', hover: 'hover:bg-amber-100' },
      green: { text: 'text-green-700', bg: 'bg-green-50', hover: 'hover:bg-green-100' },
      indigo: { text: 'text-indigo-700', bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100' },
      cyan: { text: 'text-cyan-700', bg: 'bg-cyan-50', hover: 'hover:bg-cyan-100' },
      pink: { text: 'text-pink-700', bg: 'bg-pink-50', hover: 'hover:bg-pink-100' },
      slate: { text: 'text-slate-700', bg: 'bg-slate-50', hover: 'hover:bg-slate-100' },
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="p-4">
        {categories.map(({ key, name, icon, color, count, subcategories }) => {
          const isExpanded = expandedCategories.has(key);
          const colorClasses = getColorClasses(color);

          return (
            <div key={key} className="mb-2">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(key)}
                className={`
                  w-full flex items-center gap-2 px-3 py-2 rounded-lg
                  ${colorClasses.bg} ${colorClasses.hover}
                  transition-colors
                `}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                )}
                <span className="text-xl">{icon}</span>
                <div className="flex-1 text-left">
                  <div className={`font-semibold ${colorClasses.text}`}>{name}</div>
                  <div className="text-xs text-gray-600">{count} documents</div>
                </div>
              </button>

              {/* Subcategories */}
              {isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {subcategories.map(sub => {
                    const subKey = `${key}/${sub.name}`;
                    const isSubExpanded = expandedSubcategories.has(subKey);

                    return (
                      <div key={subKey}>
                        {/* Subcategory Header */}
                        <button
                          onClick={() => toggleSubcategory(subKey)}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {isSubExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                          <Folder className="w-4 h-4 text-gray-500" />
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900 text-sm">{sub.name}</div>
                            <div className="text-xs text-gray-500">{sub.count} docs</div>
                          </div>
                        </button>

                        {/* Documents */}
                        {isSubExpanded && (
                          <div className="ml-6 mt-1 space-y-1">
                            {sub.documents.map(doc => {
                              const isSelected = selectedDocument?.id === doc.id;

                              return (
                                <button
                                  key={doc.id}
                                  onClick={() => onDocumentSelect(doc)}
                                  className={`
                                    w-full flex items-start gap-2 px-3 py-2 rounded-lg
                                    transition-all text-left
                                    ${isSelected
                                      ? 'bg-blue-100 text-blue-900'
                                      : 'hover:bg-gray-50 text-gray-700'
                                    }
                                  `}
                                >
                                  <FileText className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                                  <div className="flex-1 min-w-0">
                                    <div className={`text-sm font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                                      {doc.title}
                                    </div>
                                    {doc.description && (
                                      <div className={`text-xs mt-0.5 line-clamp-2 ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                                        {doc.description}
                                      </div>
                                    )}
                                    {doc.tags && doc.tags.length > 0 && (
                                      <div className="flex items-center gap-1 mt-1 flex-wrap">
                                        {doc.tags.slice(0, 3).map(tag => (
                                          <span
                                            key={tag}
                                            className={`
                                              text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5
                                              ${isSelected
                                                ? 'bg-blue-200 text-blue-800'
                                                : 'bg-gray-100 text-gray-600'
                                              }
                                            `}
                                          >
                                            <Tag className="w-2.5 h-2.5" />
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
