/**
 * RelatedDocuments Component
 * Shows related documents with cross-references
 */

import React from 'react';
import { Link2, ChevronRight, Tag } from 'lucide-react';
import type { Document } from '../types';
import type { KnowledgeGraph } from '../utils/knowledgeGraph';

interface RelatedDocumentsProps {
  currentDocument: Document;
  knowledgeGraph: KnowledgeGraph;
  documents: Document[];
  onDocumentSelect: (doc: Document) => void;
}

export const RelatedDocuments: React.FC<RelatedDocumentsProps> = ({
  currentDocument,
  knowledgeGraph,
  documents,
  onDocumentSelect,
}) => {
  const currentNode = knowledgeGraph.nodes.get(currentDocument.id);

  if (!currentNode) return null;

  const relatedDocs = currentNode.relatedIds
    .map(id => documents.find(d => d.id === id))
    .filter((doc): doc is Document => doc !== undefined);

  const sameCategoryDocs = documents
    .filter(doc =>
      doc.category === currentDocument.category &&
      doc.id !== currentDocument.id &&
      !currentNode.relatedIds.includes(doc.id)
    )
    .slice(0, 3);

  const sameTagDocs = documents
    .filter(doc => {
      const sharedTags = (doc.tags || []).filter(tag =>
        (currentDocument.tags || []).includes(tag)
      );
      return sharedTags.length > 0 &&
             doc.id !== currentDocument.id &&
             !currentNode.relatedIds.includes(doc.id);
    })
    .slice(0, 3);

  return (
    <div className="h-full overflow-y-auto bg-gray-50 border-l border-gray-200">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Link2 className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Related Content</h3>
        </div>

        {/* Current Document Info */}
        <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-xs font-medium text-blue-600 mb-1">Current Document</div>
          <div className="font-semibold text-gray-900 text-sm mb-2">{currentDocument.title}</div>
          {currentNode.capabilities && currentNode.capabilities.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs text-gray-600">Capabilities:</div>
              <div className="flex flex-wrap gap-1">
                {currentNode.capabilities.map(cap => (
                  <span key={cap} className="text-xs px-2 py-1 bg-white rounded border border-blue-200 text-blue-700">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Direct Related Documents */}
        {relatedDocs.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Directly Related
            </h4>
            <div className="space-y-2">
              {relatedDocs.map(doc => {
                const node = knowledgeGraph.nodes.get(doc.id);
                return (
                  <button
                    key={doc.id}
                    onClick={() => onDocumentSelect(doc)}
                    className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm mb-1 group-hover:text-blue-600">
                          {doc.title}
                        </div>
                        {doc.description && (
                          <div className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {doc.description}
                          </div>
                        )}
                        <div className="flex items-center gap-1 flex-wrap">
                          {node?.type && (
                            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded">
                              {node.type}
                            </span>
                          )}
                          {doc.tags?.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 group-hover:text-blue-600" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Same Category */}
        {sameCategoryDocs.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Same Category
            </h4>
            <div className="space-y-2">
              {sameCategoryDocs.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => onDocumentSelect(doc)}
                  className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm mb-1 group-hover:text-gray-700">
                        {doc.title}
                      </div>
                      {doc.description && (
                        <div className="text-xs text-gray-600 line-clamp-1">
                          {doc.description}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Similar Tags */}
        {sameTagDocs.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Similar Topics
            </h4>
            <div className="space-y-2">
              {sameTagDocs.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => onDocumentSelect(doc)}
                  className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm mb-1 group-hover:text-gray-700">
                        {doc.title}
                      </div>
                      <div className="flex items-center gap-1 flex-wrap mt-1">
                        {doc.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Related Content */}
        {relatedDocs.length === 0 && sameCategoryDocs.length === 0 && sameTagDocs.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No related documents found
          </div>
        )}
      </div>
    </div>
  );
};
