/**
 * DocumentExplorer Component
 * Main interface for browsing and navigating documentation
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen, Search } from 'lucide-react';
import type { Document } from '../types';
import type { DocumentNode } from '../utils/documentExtractor';
import { buildDocumentTree } from '../utils/documentExtractor';

interface DocumentExplorerProps {
  documents: Document[];
  selectedDocument: Document | null;
  onDocumentSelect: (document: Document) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const DocumentExplorer: React.FC<DocumentExplorerProps> = ({
  documents,
  selectedDocument,
  onDocumentSelect,
  searchQuery = '',
  onSearchChange,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Build document tree
  const documentTree = useMemo(() => buildDocumentTree(documents), [documents]);

  // Filter tree based on search
  const filteredTree = useMemo(() => {
    if (!localSearch) return documentTree;

    const lowerQuery = localSearch.toLowerCase();

    function filterNode(node: DocumentNode): DocumentNode | null {
      const matchesSearch = node.title.toLowerCase().includes(lowerQuery) ||
        node.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

      const filteredChildren = node.children
        ?.map(filterNode)
        .filter((n): n is DocumentNode => n !== null) || [];

      if (matchesSearch || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren,
        };
      }

      return null;
    }

    return documentTree
      .map(filterNode)
      .filter((n): n is DocumentNode => n !== null);
  }, [documentTree, localSearch]);

  // Auto-expand nodes when searching
  useEffect(() => {
    if (localSearch) {
      const allNodeIds = new Set<string>();

      function collectIds(node: DocumentNode) {
        allNodeIds.add(node.id);
        node.children?.forEach(collectIds);
      }

      filteredTree.forEach(collectIds);
      setExpandedNodes(allNodeIds);
    }
  }, [localSearch, filteredTree]);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearchChange?.(value);
  };

  const handleDocumentClick = (node: DocumentNode) => {
    if (node.type === 'file') {
      const doc = documents.find(d => d.filePath === node.filePath);
      if (doc) {
        onDocumentSelect(doc);
      }
    } else {
      toggleNode(node.id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={localSearch}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Document Tree */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
        {filteredTree.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No documents found</p>
          </div>
        ) : (
          <DocumentTreeView
            nodes={filteredTree}
            expandedNodes={expandedNodes}
            selectedDocument={selectedDocument}
            onNodeClick={handleDocumentClick}
          />
        )}
      </div>

      {/* Stats Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <span>{documents.length} documents</span>
          {localSearch && (
            <span>{filteredTree.length} results</span>
          )}
        </div>
      </div>
    </div>
  );
};

interface DocumentTreeViewProps {
  nodes: DocumentNode[];
  expandedNodes: Set<string>;
  selectedDocument: Document | null;
  onNodeClick: (node: DocumentNode) => void;
  level?: number;
}

const DocumentTreeView: React.FC<DocumentTreeViewProps> = ({
  nodes,
  expandedNodes,
  selectedDocument,
  onNodeClick,
  level = 0,
}) => {
  return (
    <div className="space-y-1">
      {nodes.map(node => (
        <DocumentTreeNode
          key={node.id}
          node={node}
          isExpanded={expandedNodes.has(node.id)}
          isSelected={selectedDocument?.filePath === node.filePath}
          onNodeClick={onNodeClick}
          level={level}
        >
          {node.children && node.children.length > 0 && expandedNodes.has(node.id) && (
            <DocumentTreeView
              nodes={node.children}
              expandedNodes={expandedNodes}
              selectedDocument={selectedDocument}
              onNodeClick={onNodeClick}
              level={level + 1}
            />
          )}
        </DocumentTreeNode>
      ))}
    </div>
  );
};

interface DocumentTreeNodeProps {
  node: DocumentNode;
  isExpanded: boolean;
  isSelected: boolean;
  onNodeClick: (node: DocumentNode) => void;
  level: number;
  children?: React.ReactNode;
}

const DocumentTreeNode: React.FC<DocumentTreeNodeProps> = ({
  node,
  isExpanded,
  isSelected,
  onNodeClick,
  level,
  children,
}) => {
  const hasChildren = node.children && node.children.length > 0;

  // Use predefined Tailwind classes instead of dynamic construction
  const getPaddingClass = (lvl: number): string => {
    const paddingMap: Record<number, string> = {
      0: 'pl-3',
      1: 'pl-6',
      2: 'pl-9',
      3: 'pl-12',
      4: 'pl-16',
      5: 'pl-20',
    };
    return paddingMap[lvl] || paddingMap[5];
  };

  return (
    <div>
      <button
        onClick={() => onNodeClick(node)}
        className={`
          w-full flex items-center gap-2 py-2 rounded-lg text-left
          transition-colors duration-150
          ${getPaddingClass(level)}
          ${isSelected
            ? 'bg-blue-100 text-blue-900 font-medium'
            : 'hover:bg-gray-100 text-gray-700'
          }
        `}
      >
        {/* Expand/Collapse Icon */}
        {hasChildren && (
          <span className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
        {!hasChildren && <span className="w-4" />}

        {/* File/Folder Icon */}
        <span className="flex-shrink-0">
          {node.type === 'directory' ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-500" />
            ) : (
              <Folder className="w-4 h-4 text-blue-500" />
            )
          ) : (
            <FileText className="w-4 h-4 text-gray-500" />
          )}
        </span>

        {/* Title */}
        <span className="flex-1 truncate text-sm">
          {node.title}
        </span>

        {/* Tags */}
        {node.tags.length > 0 && node.type === 'file' && (
          <span className="flex-shrink-0 text-xs text-gray-500">
            {node.tags[0]}
          </span>
        )}
      </button>

      {children}
    </div>
  );
};
