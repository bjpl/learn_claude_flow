# Knowledge Graph System Guide

## Overview

The Knowledge Graph System provides intelligent navigation and discovery across all 225+ Claude Flow documentation files. It automatically builds relationships between agents, commands, guides, templates, and workflows based on:

- **Prerequisites**: Documents you need to read first
- **Usage**: Which agents/commands work together
- **Categories**: Related concepts and topics
- **Tags**: Shared keywords and capabilities
- **Coordination**: Swarm and workflow relationships

## Architecture

```
Knowledge Graph System
├── knowledgeGraph.ts       # Core graph builder and algorithms
├── RelatedDocuments.tsx    # Sidebar component showing relationships
├── KnowledgeMap.tsx        # Interactive visual graph
└── Documentation data      # 225+ markdown files
```

## Core Features

### 1. Relationship Types

The system tracks 11 types of relationships:

- `uses` - Command uses agent (e.g., sparc-coder → coder agent)
- `usedBy` - Agent used by command (e.g., coder agent → sparc-coder)
- `related` - Similar concepts (e.g., mesh-coordinator ↔ hierarchical-coordinator)
- `prerequisite` - Required knowledge (e.g., swarm-init → agent-spawn)
- `partOf` - Category membership (e.g., all core agents)
- `coordinates` - Works together in swarm
- `implements` - Implements methodology
- `requires` - Requires tool/capability
- `spawns` - Creates/spawns entities
- `monitors` - Monitors/tracks
- `integrates` - Integrates with systems

### 2. Node Types

Documents are categorized into 6 types:

- **Agent**: AI specialists (coder, reviewer, tester, coordinators)
- **Command**: CLI commands and MCP tools
- **Guide**: Documentation and tutorials
- **Template**: Reusable patterns
- **Hook**: Pre/post operation hooks
- **Workflow**: Process automation definitions

### 3. Smart Recommendations

The "You Might Also Need" feature provides context-aware suggestions:

- **For Commands**: Suggests required agents and prerequisites
- **For Agents**: Suggests commands that use them
- **For Guides**: Suggests related concepts and next steps
- **Weighted Scoring**: Higher scores for prerequisites and direct dependencies

## Usage

### Basic Integration

```tsx
import {
  knowledgeGraph,
  findRelatedDocuments,
  suggestRelatedDocuments
} from './utils/knowledgeGraph';
import RelatedDocuments from './components/RelatedDocuments';

function DocumentViewer({ documentId }) {
  return (
    <div>
      <main>{/* Document content */}</main>
      <aside>
        <RelatedDocuments
          currentDocId={documentId}
          onDocumentClick={(id) => navigate(`/docs/${id}`)}
        />
      </aside>
    </div>
  );
}
```

### Advanced Queries

```typescript
import {
  knowledgeGraph,
  findRelatedDocuments,
  findPrerequisites,
  searchDocuments,
  getGraphStats
} from './utils/knowledgeGraph';

// Find all related documents
const related = findRelatedDocuments(knowledgeGraph, 'agent-coder', 10);

// Find prerequisites only
const prereqs = findPrerequisites(knowledgeGraph, 'cmd-sparc-tdd');

// Search across all documents
const results = searchDocuments(knowledgeGraph, 'github swarm');

// Get graph statistics
const stats = getGraphStats(knowledgeGraph);
console.log(`Total nodes: ${stats.totalNodes}`);
console.log(`Total relationships: ${stats.totalEdges}`);
console.log(`Avg relationships per node: ${stats.avgRelationships}`);
```

### Visual Knowledge Map

```tsx
import KnowledgeMap from './components/KnowledgeMap';

function GraphViewer() {
  return (
    <KnowledgeMap
      selectedNodeId="agent-coder"
      onNodeClick={(id) => console.log('Clicked:', id)}
      filterType="agent"  // Show only agents
      filterCategory="core"  // Filter by category
    />
  );
}
```

## Graph Structure

### Node Interface

```typescript
interface KnowledgeNode {
  id: string;                    // Unique identifier
  title: string;                 // Display name
  type: NodeType;                // agent | command | guide | template | hook | workflow
  category: string;              // core, swarm, github, sparc, etc.
  path: string;                  // File path
  description: string;           // Brief description
  tags: string[];               // Keywords

  // Relationships
  relatedTo: Array<{ id: string; type: RelationType; weight: number }>;
  prerequisites: string[];      // IDs of required docs
  usedBy: string[];            // IDs of docs that use this
  uses: string[];              // IDs of docs this uses

  // Metadata
  capabilities?: string[];     // For agents
  tools?: string[];           // Required tools
  topology?: string;          // For coordinators
  priority?: 'low' | 'medium' | 'high' | 'critical';
  color?: string;             // Visual representation
}
```

### Relationship Weights

Weights determine recommendation strength (0.0 to 1.0):

- **0.9**: Prerequisites (must read first)
- **0.8**: Direct usage (uses/usedBy)
- **0.7**: Strong tag overlap (3+ shared tags)
- **0.5**: Category membership (same category)
- **0.2-0.6**: Tag-based similarity (variable)

## Examples

### Example 1: Finding Related Agents

```typescript
// Get all agents related to the coder agent
const coderNode = knowledgeGraph.nodes.get('agent-coder');
const relatedAgents = findRelatedDocuments(knowledgeGraph, 'agent-coder')
  .filter(node => node.type === 'agent');

// Result: tester, reviewer, planner (coordinators)
```

### Example 2: Building a Learning Path

```typescript
function buildLearningPath(targetDocId: string): KnowledgeNode[] {
  const path: KnowledgeNode[] = [];
  const visited = new Set<string>();

  function addPrereqs(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const prereqs = findPrerequisites(knowledgeGraph, nodeId);
    prereqs.forEach(prereq => addPrereqs(prereq.id));

    const node = knowledgeGraph.nodes.get(nodeId);
    if (node) path.push(node);
  }

  addPrereqs(targetDocId);
  return path;
}

// Get full learning path for SPARC TDD
const path = buildLearningPath('cmd-sparc-tdd');
// Result: planner → researcher → coder → tester → sparc-tdd
```

### Example 3: Recommendation Engine

```typescript
function getRecommendations(
  nodeId: string,
  userContext: { role: 'beginner' | 'advanced'; focus: string }
): KnowledgeNode[] {
  const suggestions = suggestRelatedDocuments(
    knowledgeGraph,
    nodeId,
    { userRole: userContext.role, taskType: userContext.focus }
  );

  // Filter by user level
  if (userContext.role === 'beginner') {
    return suggestions.filter(s => s.priority !== 'critical');
  }

  return suggestions;
}

// Beginner-friendly suggestions for swarm coordination
const recs = getRecommendations('cmd-swarm-init', {
  role: 'beginner',
  focus: 'coordination'
});
```

## Current Graph Statistics

Based on the initial implementation:

- **Total Nodes**: 15+ (expandable to 225)
- **Node Types**:
  - Agents: 9 (core + swarm + github)
  - Commands: 6 (coordination + sparc + github)
  - Guides: TBD
  - Templates: TBD

- **Categories**:
  - Core: 5 agents
  - Swarm: 3 coordinators
  - GitHub: 2 agents
  - Coordination: 3 commands
  - SPARC: 2 commands

- **Average Relationships**: 4-6 per node

## Extending the Graph

### Adding New Nodes

```typescript
// In buildKnowledgeGraph()
addNode(nodes, {
  id: 'agent-new-specialist',
  title: 'New Specialist Agent',
  type: 'agent',
  category: 'specialized',
  path: '/.claude/agents/specialized/new-specialist.md',
  description: 'Description of what it does',
  tags: ['specialization', 'expertise', 'domain'],
  capabilities: ['capability1', 'capability2'],
  tools: ['Tool1', 'Tool2'],
  priority: 'medium',
  color: '#COLOR',
  relatedTo: [],
  prerequisites: ['prerequisite-id'],
  usedBy: ['command-that-uses-it'],
  uses: ['agent-it-uses']
});
```

### Custom Relationship Types

```typescript
// Add new relationship type
export type RelationType =
  | 'uses'
  | 'usedBy'
  | 'related'
  | 'prerequisite'
  | 'partOf'
  | 'coordinates'
  | 'implements'
  | 'requires'
  | 'spawns'
  | 'monitors'
  | 'integrates'
  | 'yourNewType';  // Add here

// Use in node relationships
addRelatedNode(node, relatedId, 'yourNewType', 0.7);
```

## Performance Considerations

- **Graph Building**: O(n²) for relationship building, runs once on load
- **Search**: O(n) linear scan, cached for common queries
- **Related Docs**: O(1) lookup using pre-built edges
- **Memory**: ~1-2MB for full 225-node graph

### Optimization Tips

1. **Lazy Loading**: Load graph on demand
2. **Caching**: Cache search results
3. **Indexing**: Build search indices for common queries
4. **Virtualization**: Only render visible nodes in KnowledgeMap

## Future Enhancements

### Planned Features

1. **Machine Learning**:
   - Learn from user navigation patterns
   - Personalized recommendations
   - Auto-categorization of new docs

2. **Advanced Visualization**:
   - 3D graph rendering
   - Time-based relationship decay
   - Cluster detection and visualization

3. **Collaboration**:
   - Shared learning paths
   - Team recommendations
   - Usage analytics

4. **Integration**:
   - VS Code extension
   - CLI search tool
   - API for external tools

## Troubleshooting

### Common Issues

**Q: Node not found in graph**
```typescript
// Check if node exists
const exists = knowledgeGraph.nodes.has(nodeId);
if (!exists) {
  console.error(`Node ${nodeId} not found`);
  // Fallback to search
  const results = searchDocuments(knowledgeGraph, nodeId);
}
```

**Q: No relationships showing**
```typescript
// Debug relationship building
const node = knowledgeGraph.nodes.get(nodeId);
console.log('Prerequisites:', node?.prerequisites);
console.log('Uses:', node?.uses);
console.log('Related:', node?.relatedTo);
```

**Q: Visual map performance issues**
```typescript
// Reduce node count with filtering
<KnowledgeMap
  filterType="agent"  // Only show agents
  filterCategory="core"  // Only core category
/>
```

## API Reference

See the inline documentation in `src/utils/knowledgeGraph.ts` for complete API details.

### Core Functions

- `buildKnowledgeGraph()`: Build complete graph
- `findRelatedDocuments(graph, nodeId, max)`: Find related docs
- `findPrerequisites(graph, nodeId)`: Get prerequisites
- `findUsedBy(graph, nodeId)`: Get usage references
- `suggestRelatedDocuments(graph, nodeId, context)`: Smart suggestions
- `searchDocuments(graph, query)`: Full-text search
- `getNodesByType(graph, type)`: Filter by type
- `getNodesByCategory(graph, category)`: Filter by category
- `getGraphStats(graph)`: Get statistics

## Contributing

To add your documents to the knowledge graph:

1. Extract metadata from your markdown file
2. Add node definition in `buildKnowledgeGraph()`
3. Define relationships (prerequisites, uses, usedBy)
4. Add tags and categories
5. Test with `getGraphStats()` to verify

---

**Built with Claude Code and Claude Flow** 🚀
