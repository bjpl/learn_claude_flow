import React, { useState } from 'react';
import { LazyDocumentViewer } from './LazyDocumentViewer';
import { BookmarkManager } from './BookmarkManager';
import { NotesPanel } from './NotesPanel';
import type { ViewerState, Bookmark, Note } from '../types';

interface ContentPanelProps {
  viewerState: ViewerState;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: number) => void;
  onAddBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  onDeleteBookmark: (bookmarkId: string) => void;
  onNavigateToBookmark: (bookmark: Bookmark) => void;
  onAddNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
  onNavigateToNote: (note: Note) => void;
  onTextSelect: (text: string, position: { x: number; y: number }) => void;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({
  viewerState,
  onPageChange,
  onAddBookmark,
  onDeleteBookmark,
  onNavigateToBookmark,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onNavigateToNote,
  onTextSelect,
}) => {
  const [rightPanelTab, setRightPanelTab] = useState<'bookmarks' | 'notes'>('bookmarks');

  const currentHighlights = viewerState.currentDocument
    ? viewerState.highlights[viewerState.currentDocument.id] || []
    : [];

  return (
    <div className="flex h-full">
      {/* Main Viewer */}
      <div className="flex-1 min-w-0">
        <LazyDocumentViewer
          document={viewerState.currentDocument}
          currentPage={viewerState.currentPage}
          zoom={viewerState.zoom}
          highlights={currentHighlights}
          onPageChange={onPageChange}
          onTextSelect={onTextSelect}
        />
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setRightPanelTab('bookmarks')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              rightPanelTab === 'bookmarks'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Bookmarks
          </button>
          <button
            onClick={() => setRightPanelTab('notes')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              rightPanelTab === 'notes'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Notes
          </button>
        </div>

        {/* Panel Content */}
        <div className="flex-1 min-h-0">
          {rightPanelTab === 'bookmarks' ? (
            <BookmarkManager
              bookmarks={viewerState.bookmarks}
              currentDocument={viewerState.currentDocument}
              onAddBookmark={onAddBookmark}
              onDeleteBookmark={onDeleteBookmark}
              onNavigateToBookmark={onNavigateToBookmark}
            />
          ) : (
            <NotesPanel
              notes={viewerState.notes}
              currentDocument={viewerState.currentDocument}
              onAddNote={onAddNote}
              onUpdateNote={onUpdateNote}
              onDeleteNote={onDeleteNote}
              onNavigateToNote={onNavigateToNote}
            />
          )}
        </div>
      </div>
    </div>
  );
};
