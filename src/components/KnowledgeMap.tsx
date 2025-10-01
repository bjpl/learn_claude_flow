import React, { useEffect, useRef, useState } from 'react';
import type { KnowledgeGraph } from '../utils/knowledgeGraph';

type NodeType = 'agent' | 'command' | 'guide' | 'template' | 'hook' | 'workflow';

interface KnowledgeMapProps {
  selectedNodeId?: string;
  onNodeClick?: (nodeId: string) => void;
  filterType?: NodeType;
  filterCategory?: string;
  knowledgeGraph: KnowledgeGraph;
}

interface VisualNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  label: string;
  type: NodeType;
}

export const KnowledgeMap: React.FC<KnowledgeMapProps> = ({
  selectedNodeId,
  onNodeClick,
  filterType,
  filterCategory,
  knowledgeGraph
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<VisualNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  // Initialize nodes from knowledge graph
  useEffect(() => {
    const visualNodes: VisualNode[] = [];
    const nodeArray = Array.from(knowledgeGraph.nodes.values());

    // Filter nodes if needed
    const filteredNodes = nodeArray.filter(node => {
      if (filterType && node.type !== filterType) return false;
      if (filterCategory && node.category !== filterCategory) return false;
      return true;
    });

    // Create visual representation
    filteredNodes.forEach((node, index) => {
      const angle = (index / filteredNodes.length) * Math.PI * 2;
      const radius = Math.min(300, filteredNodes.length * 10);

      // Map node type to visual type
      const visualType: NodeType = node.type === 'concept' ? 'guide' : (node.type as NodeType);

      visualNodes.push({
        id: node.id,
        x: 400 + Math.cos(angle) * radius,
        y: 300 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        radius: node.type === 'agent' ? 12 : node.type === 'command' ? 10 : 8,
        color: getTypeColor(visualType),
        label: node.title,
        type: visualType
      });
    });

    setNodes(visualNodes);
  }, [filterType, filterCategory]);

  // Force-directed layout simulation
  useEffect(() => {
    if (nodes.length === 0) return;

    const interval = setInterval(() => {
      setNodes(prevNodes => {
        const newNodes = [...prevNodes];

        // Apply forces
        newNodes.forEach((node, i) => {
          let fx = 0;
          let fy = 0;

          // Repulsion from other nodes
          newNodes.forEach((other, j) => {
            if (i === j) return;
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 1000 / (dist * dist);
            fx += (dx / dist) * force;
            fy += (dy / dist) * force;
          });

          // Attraction to connected nodes
          const graphNode = knowledgeGraph.nodes.get(node.id);
          if (graphNode && graphNode.relatedIds) {
            graphNode.relatedIds.forEach((relId: string) => {
              const other = newNodes.find(n => n.id === relId);
              if (other) {
                const dx = other.x - node.x;
                const dy = other.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const force = (dist - 100) * 0.01;
                fx += (dx / dist) * force;
                fy += (dy / dist) * force;
              }
            });
          }

          // Center attraction
          const centerX = 400;
          const centerY = 300;
          const dcx = centerX - node.x;
          const dcy = centerY - node.y;
          fx += dcx * 0.0001;
          fy += dcy * 0.0001;

          // Apply damping
          node.vx = (node.vx + fx) * 0.85;
          node.vy = (node.vy + fy) * 0.85;

          // Update position (unless being dragged)
          if (draggedNode !== node.id) {
            node.x += node.vx;
            node.y += node.vy;

            // Keep in bounds
            node.x = Math.max(20, Math.min(780, node.x));
            node.y = Math.max(20, Math.min(580, node.y));
          }
        });

        return newNodes;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [nodes.length, draggedNode]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, 800, 600);

    // Draw edges
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    nodes.forEach(node => {
      const graphNode = knowledgeGraph.nodes.get(node.id);
      if (!graphNode || !graphNode.relatedIds) return;

      graphNode.relatedIds.forEach((relId: string) => {
        const targetNode = nodes.find(n => n.id === relId);
        if (!targetNode) return;

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
    });

    // Draw nodes
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

      // Fill
      ctx.fillStyle = node.color;
      if (selectedNodeId === node.id) {
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 15;
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      // Border
      ctx.strokeStyle = hoveredNode === node.id ? '#1F2937' : '#FFFFFF';
      ctx.lineWidth = hoveredNode === node.id ? 3 : 2;
      ctx.stroke();

      // Label (on hover or selected)
      if (hoveredNode === node.id || selectedNodeId === node.id) {
        ctx.fillStyle = '#1F2937';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(node.label, node.x, node.y - node.radius - 5);
      }
    });
  }, [nodes, hoveredNode, selectedNodeId]);

  // Mouse handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update dragged node position
    if (isDragging && draggedNode) {
      setNodes(prevNodes =>
        prevNodes.map(node =>
          node.id === draggedNode
            ? { ...node, x, y, vx: 0, vy: 0 }
            : node
        )
      );
      return;
    }

    // Check hover
    const hovered = nodes.find(node => {
      const dx = x - node.x;
      const dy = y - node.y;
      return Math.sqrt(dx * dx + dy * dy) <= node.radius;
    });

    setHoveredNode(hovered?.id || null);
  };

  const handleMouseDown = (_e: React.MouseEvent<HTMLCanvasElement>) => {
    if (hoveredNode) {
      setIsDragging(true);
      setDraggedNode(hoveredNode);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNode(null);
  };

  const handleClick = () => {
    if (hoveredNode && onNodeClick) {
      onNodeClick(hoveredNode);
    }
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-white dark:bg-gray-900"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
      />

      {/* Legend */}
      <div className="mt-4 flex gap-4 flex-wrap">
        {(['agent', 'command', 'guide', 'template'] as NodeType[]).map(type => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getTypeColor(type) }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
              {type}s
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

function getTypeColor(type: NodeType): string {
  const colors: Record<NodeType, string> = {
    agent: '#FF6B35',
    command: '#4ECDC4',
    guide: '#95E1D3',
    template: '#F38181',
    hook: '#AA96DA',
    workflow: '#FCBAD3'
  };
  return colors[type] || '#6B7280';
}

export default KnowledgeMap;
