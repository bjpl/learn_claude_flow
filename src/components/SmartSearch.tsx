/**
 * SmartSearch Component
 * Advanced search with auto-suggestions and semantic understanding
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X, TrendingUp, Clock, Tag } from 'lucide-react';
import type { Document } from '../types';
import type { KnowledgeGraph } from '../utils/knowledgeGraph';
import { smartSearch, getSearchSuggestions } from '../utils/knowledgeGraph';

interface SmartSearchProps {
  documents: Document[];
  knowledgeGraph: KnowledgeGraph;
  onDocumentSelect: (doc: Document) => void;
  onClose?: () => void;
  autoFocus?: boolean;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  documents,
  knowledgeGraph,
  onDocumentSelect,
  onClose,
  autoFocus = false,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Document[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches] = useState<string[]>([
    'coder agent',
    'swarm init',
    'consensus',
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev =>
          Math.min(prev + 1, results.length - 1)
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        onDocumentSelect(results[selectedIndex]);
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results, selectedIndex, onDocumentSelect, onClose]);

  // Update search results
  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = smartSearch(query, knowledgeGraph, documents);
      setResults(searchResults);

      const searchSuggestions = getSearchSuggestions(query, knowledgeGraph);
      setSuggestions(searchSuggestions);

      setSelectedIndex(0);
    } else {
      setResults([]);
      setSuggestions([]);
    }
  }, [query, knowledgeGraph, documents]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    setResults([]);
    setSuggestions([]);
    inputRef.current?.focus();
  }, []);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 text-gray-900 font-semibold">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto p-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search agents, commands, concepts..."
            className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && query.length >= 2 && (
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Suggestions:</span>
            {suggestions.map(suggestion => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Recent Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map(search => (
                <button
                  key={search}
                  onClick={() => handleQueryChange(search)}
                  className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-4 max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
            {results.map((doc, index) => {
              const node = knowledgeGraph.nodes.get(doc.id);
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={doc.id}
                  onClick={() => {
                    onDocumentSelect(doc);
                    onClose?.();
                  }}
                  className={`
                    w-full text-left px-4 py-3 border-b border-gray-100 last:border-b-0
                    transition-colors
                    ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 mb-1">
                        {highlightMatch(doc.title, query)}
                      </div>
                      {doc.description && (
                        <div className="text-sm text-gray-600 mb-2">
                          {highlightMatch(doc.description, query)}
                        </div>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {doc.category?.split('/')[0]}
                        </span>
                        {node?.type && (
                          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                            {node.type}
                          </span>
                        )}
                        {doc.tags?.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="text-xs text-blue-600 font-medium">
                        Press Enter
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {query.length >= 2 && results.length === 0 && (
          <div className="mt-4 text-center py-8 text-gray-500">
            No results found for "{query}"
          </div>
        )}

        {/* Quick Help */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">↑↓</kbd>
            <span>Navigate</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Enter</kbd>
            <span>Select</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Esc</kbd>
            <span>Close</span>
          </div>
          {results.length > 0 && (
            <span>{results.length} results</span>
          )}
        </div>
      </div>
    </div>
  );
};
