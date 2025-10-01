import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import type { NavigationItem, Document } from '../types';

interface SearchableNavigationProps {
  documents: Document[];
  navigationItems: NavigationItem[];
  currentDocument: Document | null;
  onDocumentSelect: (document: Document) => void;
  onNavigationSelect: (item: NavigationItem) => void;
}

export const SearchableNavigation: React.FC<SearchableNavigationProps> = ({
  documents,
  navigationItems,
  currentDocument,
  onDocumentSelect,
  onNavigationSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'documents' | 'navigation'>('documents');

  // Fuzzy search configuration
  const fuse = useMemo(
    () =>
      new Fuse(documents, {
        keys: ['title', 'tags', 'category'],
        threshold: 0.3,
        includeScore: true,
      }),
    [documents]
  );

  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documents;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, documents, fuse]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            }
            onNavigationSelect(item);
          }}
          className={`w-full text-left px-3 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors ${
            level > 0 ? 'ml-' + level * 4 : ''
          }`}
        >
          {hasChildren && (
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {item.icon && <span className="text-lg">{item.icon}</span>}
          <span className="text-sm flex-1">{item.label}</span>
        </button>
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {item.children!.map((child) => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Documentation</h2>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('documents')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'documents'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveTab('navigation')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'navigation'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Navigation
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-2">
        {activeTab === 'documents' ? (
          <div className="space-y-1">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">No documents found</p>
              </div>
            ) : (
              filteredDocuments.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => onDocumentSelect(doc)}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                    currentDocument?.id === doc.id ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <svg
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.title}</p>
                      {doc.category && (
                        <p className="text-xs text-gray-500 truncate">{doc.category}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {navigationItems.map((item) => renderNavigationItem(item))}
          </div>
        )}
      </div>
    </div>
  );
};
