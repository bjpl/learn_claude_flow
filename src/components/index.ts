/**
 * Component Exports
 * Central export point for all components
 */

// Legacy exports
export { DocumentationViewer } from './DocumentationViewer';
export { DocumentationList } from './DocumentationList';
export { DocumentationItem } from './DocumentationItem';
export type { DocumentationFile } from './DocumentationViewer';

// Main Interface Components
export { DocumentationInterface } from './DocumentationInterface';
export { DocumentationApp } from './DocumentationApp';
export { OverviewDashboard } from './OverviewDashboard';

// Navigation Components
export { CategoryExplorer } from './CategoryExplorer';
export { DocumentExplorer } from './DocumentExplorer';
export { SearchableNavigation } from './SearchableNavigation';
export { Breadcrumbs } from './Breadcrumbs';

// Search Components
export { SmartSearch } from './SmartSearch';
export { AdvancedSearch } from './AdvancedSearch';
export { SearchBar } from './SearchBar';

// Document Viewing
export { MarkdownViewer, TableOfContents } from './MarkdownViewer';
export { DocumentViewer } from './DocumentViewer';
export { LazyDocumentViewer } from './LazyDocumentViewer';
export { ContentPanel } from './ContentPanel';

// Related Content
export { RelatedDocuments } from './RelatedDocuments';
export { QuickAccess } from './QuickAccess';

// User Features
export { BookmarkPanel } from './BookmarkPanel';
export { BookmarkManager } from './BookmarkManager';
export { NotesPanel } from './NotesPanel';

// Utility Components
export { ErrorBoundary } from './ErrorBoundary';
export { LoadingSpinner } from './LoadingSpinner';
