// Core types for the Learn Claude Flow application

export interface Document {
  id: string;
  title: string;
  url?: string;
  type: 'pdf' | 'html' | 'markdown';
  category?: string;
  tags?: string[];
  pageCount?: number;
  lastAccessed?: Date;
  filePath?: string;
  description?: string;
  content?: string;
}

export interface PdfPage {
  documentId: string;
  pageNumber: number;
  content: string;
}

export interface SearchResult {
  documentId: string;
  documentTitle: string;
  pageNumber?: number;
  content: string;
  snippet?: string;
  matches: readonly any[];
  score: number;
  relevance?: number;
  highlights?: TextHighlight[];
}

export interface TextHighlight {
  start: number;
  end: number;
  color?: string;
  note?: string;
}

export interface Bookmark {
  id: string;
  documentId: string;
  pageNumber?: number;
  title: string;
  createdAt: number | Date;
  color?: string;
}

export interface Note {
  id: string;
  documentId: string;
  pageNumber?: number;
  content: string;
  position?: { x: number; y: number };
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface NavigationItem {
  id: string;
  label: string;
  documentId?: string;
  pageNumber?: number;
  children?: NavigationItem[];
  icon?: string;
}

export interface ReadingProgress {
  documentId: string;
  currentPage: number;
  totalPages: number;
  lastReadAt: number;
  completed: boolean;
}

export interface ViewerState {
  currentDocument: Document | null;
  currentPage: number;
  zoom: number;
  searchQuery: string;
  searchResults: SearchResult[];
  bookmarks: Bookmark[];
  notes: Note[];
  highlights: Record<string, TextHighlight[]>;
}

export interface AppState {
  documents: Document[];
  currentDocument: Document | null;
  currentPage: number;
  searchQuery: string;
  searchResults: SearchResult[];
  isSearching: boolean;
  bookmarks: Bookmark[];
  readingProgress: Map<string, ReadingProgress>;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  viewMode: 'single' | 'double' | 'scroll';
  zoom: number;

  // Actions
  setCurrentDocument: (doc: Document | null) => void;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: SearchResult[]) => void;
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  updateProgress: (documentId: string, page: number, totalPages: number) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setViewMode: (mode: 'single' | 'double' | 'scroll') => void;
  setZoom: (zoom: number) => void;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  progress?: number;
}

export interface PdfDocument {
  id: string;
  title: string;
  pages: PdfPage[];
  metadata?: Record<string, any>;
  category?: string;
}

export interface ViewerSettings {
  zoom: number;
  theme: 'light' | 'dark';
  viewMode: 'single' | 'double' | 'scroll';
}

export interface Breadcrumb {
  label: string;
  path: string;
  onClick?: () => void;
}
