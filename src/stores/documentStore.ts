/**
 * Document Store
 * Zustand store for managing documents
 */

import { create } from 'zustand';

export interface Document {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: 'pdf' | 'markdown' | 'html';
  category?: string;
  tags?: string[];
  totalPages?: number;
  lastModified?: string;
}

interface DocumentStore {
  documents: Document[];
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  removeDocument: (id: string) => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],

  setDocuments: (documents) => set({ documents }),

  addDocument: (document) =>
    set((state) => ({ documents: [...state.documents, document] })),

  updateDocument: (id, updates) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    })),

  removeDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    })),
}));
