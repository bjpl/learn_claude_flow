/**
 * SearchRoute Component
 * Search interface with URL-based query state
 */

import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { SearchSEO } from '../components/seo';
import type { Document } from '../types';

// Mock search data
const SAMPLE_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Getting Started Guide',
    url: '/docs/getting-started.pdf',
    type: 'pdf',
    category: 'Documentation',
    tags: ['beginner', 'tutorial'],
    description: 'Introduction to Claude Flow'
  },
];

export default function SearchRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<Document[]>([]);

  // Update search results when query changes
  useEffect(() => {
    if (query) {
      // Perform search (mock implementation)
      const filtered = SAMPLE_DOCUMENTS.filter(doc =>
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.description?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchParams({});
    setResults([]);
  };

  const handleDocumentClick = (doc: Document) => {
    navigate(`/doc/${doc.id}`);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SearchSEO query={query} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Documentation</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for documents, topics, or keywords..."
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      {query && (
        <div>
          <div className="mb-4 text-gray-600">
            Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </div>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => handleDocumentClick(doc)}
                  className="w-full text-left bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-gray-600 mb-3">{doc.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {doc.category}
                    </span>
                    {doc.tags?.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-2">No results found</p>
              <p className="text-sm text-gray-500">Try different keywords or check your spelling</p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!query && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Start Searching</h2>
          <p className="text-gray-600">
            Enter keywords to search across all documentation
          </p>
        </div>
      )}
      </div>
    </>
  );
}
