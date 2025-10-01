import React, { useState } from 'react';
import type { Note, Document } from '../types';

interface NotesPanelProps {
  notes: Note[];
  currentDocument: Document | null;
  onAddNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
  onNavigateToNote: (note: Note) => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({
  notes,
  currentDocument,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onNavigateToNote,
}) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleAddNote = () => {
    if (!currentDocument || !newNoteContent.trim()) return;

    onAddNote({
      documentId: currentDocument.id,
      content: newNoteContent.trim(),
      tags: selectedTags,
    });

    setNewNoteContent('');
    setSelectedTags([]);
    setIsAddingNote(false);
  };

  const handleUpdateNote = (noteId: string) => {
    if (!editContent.trim()) return;
    onUpdateNote(noteId, editContent.trim());
    setEditingNoteId(null);
    setEditContent('');
  };

  const startEditing = (note: Note) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  const filteredNotes = currentDocument
    ? notes.filter((n) => n.documentId === currentDocument.id)
    : notes;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Notes</h3>
        {currentDocument && (
          <button
            onClick={() => setIsAddingNote(true)}
            className="p-1 rounded hover:bg-gray-100"
            aria-label="Add note"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>

      {/* Add Note Form */}
      {isAddingNote && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="space-y-3">
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Write your note..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddNote}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Add Note
              </button>
              <button
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNoteContent('');
                  setSelectedTags([]);
                }}
                className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="flex-1 overflow-auto p-2">
        {filteredNotes.length === 0 ? (
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">No notes yet</p>
            <p className="text-xs text-gray-500">Add notes to remember important details</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotes.map((note) => (
              <div key={note.id} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                {editingNoteId === note.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateNote(note.id)}
                        className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingNoteId(null);
                          setEditContent('');
                        }}
                        className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-xs font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-2">
                      <button
                        onClick={() => onNavigateToNote(note)}
                        className="flex-1 text-left text-sm text-gray-800 hover:text-blue-600"
                      >
                        {note.content}
                      </button>
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={() => startEditing(note)}
                          className="p-1 rounded hover:bg-gray-100"
                          aria-label="Edit note"
                        >
                          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteNote(note.id)}
                          className="p-1 rounded hover:bg-gray-100"
                          aria-label="Delete note"
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
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {note.pageNumber ? `Page ${note.pageNumber}` : 'Document'} •{' '}
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </span>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex space-x-1">
                          {note.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
