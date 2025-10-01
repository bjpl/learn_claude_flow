/**
 * QuickAccess Component
 * Floating panel for frequently used documents and quick actions
 */

import React from 'react';
import { Star, Zap, BookOpen, Command } from 'lucide-react';
import type { Document } from '../types';
import type { KnowledgeGraph } from '../utils/knowledgeGraph';

interface QuickAccessProps {
  documents: Document[];
  knowledgeGraph: KnowledgeGraph;
  onDocumentSelect: (doc: Document) => void;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({
  documents,
  knowledgeGraph,
  onDocumentSelect,
}) => {
  const frequentlyUsed = knowledgeGraph.frequentlyUsed
    .map(id => documents.find(d => d.id === id))
    .filter((doc): doc is Document => doc !== undefined)
    .slice(0, 5);

  // Group by type
  const agentDocs = frequentlyUsed.filter(d =>
    knowledgeGraph.nodes.get(d.id)?.type === 'agent'
  );

  const commandDocs = frequentlyUsed.filter(d =>
    knowledgeGraph.nodes.get(d.id)?.type === 'command'
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-yellow-600" />
        <h3 className="font-semibold text-gray-900">Quick Access</h3>
      </div>

      {/* Frequently Used Agents */}
      {agentDocs.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-purple-600" />
            <h4 className="text-sm font-medium text-gray-700">Top Agents</h4>
          </div>
          <div className="space-y-1">
            {agentDocs.map(doc => {
              const node = knowledgeGraph.nodes.get(doc.id);
              return (
                <button
                  key={doc.id}
                  onClick={() => onDocumentSelect(doc)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors group"
                >
                  <div className="font-medium text-gray-900 text-sm group-hover:text-purple-700">
                    {doc.title}
                  </div>
                  {node?.capabilities && node.capabilities.length > 0 && (
                    <div className="text-xs text-gray-600 mt-0.5">
                      {node.capabilities.slice(0, 2).join(', ')}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Frequently Used Commands */}
      {commandDocs.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Command className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-medium text-gray-700">Top Commands</h4>
          </div>
          <div className="space-y-1">
            {commandDocs.map(doc => (
              <button
                key={doc.id}
                onClick={() => onDocumentSelect(doc)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="font-medium text-gray-900 text-sm group-hover:text-blue-700">
                  {doc.title}
                </div>
                {doc.description && (
                  <div className="text-xs text-gray-600 mt-0.5 line-clamp-1">
                    {doc.description}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-gray-600" />
          <h4 className="text-sm font-medium text-gray-700">Quick Links</h4>
        </div>
        <div className="space-y-1 text-sm">
          <a
            href="#getting-started"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Getting Started Guide
          </a>
          <a
            href="#sparc-workflow"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            SPARC Workflow
          </a>
          <a
            href="#best-practices"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Best Practices
          </a>
        </div>
      </div>
    </div>
  );
};
