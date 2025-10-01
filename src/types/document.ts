/**
 * Core document types for the documentation viewer system
 */

export interface Document {
  id: string;
  title: string;
  filePath: string;
  type: 'pdf' | 'markdown' | 'html';
  category?: string;
  tags?: string[];
  description?: string;
  author?: string;
  lastModified?: Date;
  size?: number;
  pageCount?: number;
}

export interface DocumentMetadata {
  title: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
}

export interface SearchResult {
  document: Document;
  matches: SearchMatch[];
  score: number;
}

export interface SearchMatch {
  pageNumber: number;
  text: string;
  context: string;
  position: {
    top: number;
    left: number;
  };
}

export interface ViewerSettings {
  zoom: number;
  pageMode: 'single' | 'continuous';
  theme: 'light' | 'dark';
  sidebar: 'thumbnails' | 'outline' | 'none';
}
