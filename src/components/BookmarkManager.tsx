import React, { useState } from 'react';
import type { Bookmark, Document } from '../types';

interface BookmarkManagerProps {
  bookmarks: Bookmark[];
  currentDocument: Document | null;
  onAddBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  onDeleteBookmark: (bookmarkId: string) => void;
  onNavigateToBookmark: (bookmark: Bookmark) => void;
}

const BOOKMARK_COLORS = [
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#A855F7' },
];

export const BookmarkManager: React.FC<BookmarkManagerProps> = ({
  bookmarks,
  currentDocument,
  onAddBookmark,
  onDeleteBookmark,
  onNavigateToBookmark,
}) => {
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [newBookmarkTitle, setNewBookmarkTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(BOOKMARK_COLORS[0].value);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddBookmark = () => {
    if (!currentDocument || !newBookmarkTitle.trim()) return;

    onAddBookmark({
      documentId: currentDocument.id,
      pageNumber: currentPage,
      title: newBookmarkTitle.trim(),
      color: selectedColor,
    });

    setNewBookmarkTitle('');
    setIsAddingBookmark(false);
  };

  const filteredBookmarks = currentDocument
    ? bookmarks.filter((b) => b.documentId === currentDocument.id)
    : bookmarks;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Bookmarks</h3>
        {currentDocument && (
          <button
            onClick={() => setIsAddingBookmark(true)}
            className="p-1 rounded hover:bg-gray-100"
            aria-label="Add bookmark"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>

      {/* Add Bookmark Form */}
      {isAddingBookmark && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="space-y-3">
            <input
              type="text"
              value={newBookmarkTitle}
              onChange={(e) => setNewBookmarkTitle(e.target.value)}
              placeholder="Bookmark title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Page Number</label>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value, 10))}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
              <div className="flex space-x-2">
                {BOOKMARK_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.value ? 'border-gray-900' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleAddBookmark}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddingBookmark(false);
                  setNewBookmarkTitle('');
                }}
                className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks List */}
      <div className="flex-1 overflow-auto p-2">
        {filteredBookmarks.length === 0 ? (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">No bookmarks yet</p>
            <p className="text-xs text-gray-500">Add bookmarks to quickly navigate</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="group flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-50"
              >
                <div
                  className="w-1 h-full rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: bookmark.color || '#3B82F6' }}
                />
                <button
                  onClick={() => onNavigateToBookmark(bookmark)}
                  className="flex-1 text-left min-w-0"
                >
                  <p className="text-sm font-medium text-gray-900 truncate">{bookmark.title}</p>
                  <p className="text-xs text-gray-500">
                    {bookmark.pageNumber ? `Page ${bookmark.pageNumber}` : 'Document'} •{' '}
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </p>
                </button>
                <button
                  onClick={() => onDeleteBookmark(bookmark.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 transition-opacity"
                  aria-label="Delete bookmark"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
