/**
 * AdvancedSearch Component
 * Provides advanced search capabilities with filters
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Filter, Tag, Folder } from 'lucide-react';
import type { Document } from '../types';
import {
  searchDocuments,
  getUniqueCategories,
  getUniqueTags,
} from '../utils/documentLoader';

interface AdvancedSearchProps {
  documents: Document[];
  onDocumentSelect: (document: Document) => void;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  documents,
  onDocumentSelect,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Document[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const categories = useMemo(() => getUniqueCategories(documents), [documents]);
  const tags = useMemo(() => getUniqueTags(documents), [documents]);

  // Perform search whenever query or filters change
  useEffect(() => {
    const performSearch = async () => {
      setIsSearching(true);
      const results = await searchDocuments(documents, {
        query,
        categories: selectedCategories.length > 0 ? selectedCategories : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      });
      setSearchResults(results);
      setIsSearching(false);
    };

    const debounce = setTimeout(performSearch, 300);
    return () => clearTimeout(debounce);
  }, [query, selectedCategories, selectedTags, documents]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  const hasFilters = query || selectedCategories.length > 0 || selectedTags.length > 0;

  return (
    <div className="bg-gray-50 border-b border-gray-200 p-4">
      {/* Search Input */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search across all documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Categories */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Folder className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Categories</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`
                  px-3 py-1 rounded-full text-sm transition-colors
                  ${selectedCategories.includes(category)
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 10).map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`
                  px-3 py-1 rounded-full text-sm transition-colors
                  ${selectedTags.includes(tag)
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </button>
        </div>
      )}

      {/* Search Results */}
      {hasFilters && (
        <div className="bg-white rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              Searching...
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Filter className="w-12 h-12 mx-auto mb-2 opacity-50" />
              No documents match your search criteria
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {searchResults.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => onDocumentSelect(doc)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 mb-1">{doc.title}</h3>
                  {doc.description && (
                    <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {doc.category && (
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {doc.category}
                      </span>
                    )}
                    {doc.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
