# Knowledge Graph API Reference

## Core Types

### NodeType

```typescript
type NodeType = 'agent' | 'command' | 'guide' | 'template' | 'hook' | 'workflow';
```

Categorizes documentation into functional types.

### RelationType

```typescript
type RelationType =
  | 'uses'          // Command uses agent
  | 'usedBy'        // Agent used by command
  | 'related'       // Similar concepts
  | 'prerequisite'  // Required knowledge
  | 'partOf'        // Belongs to category
  | 'coordinates'   // Works together in swarm
  | 'implements'    // Implements methodology
  | 'requires'      // Requires tool/capability
  | 'spawns'        // Spawns/creates
  | 'monitors'      // Monitors/tracks
  | 'integrates';   // Integrates with
```

Defines how documents relate to each other.

### KnowledgeNode

```typescript
interface KnowledgeNode {
  id: string;                    // Unique identifier (e.g., "agent-coder")
  title: string;                 // Display name (e.g., "Coder Agent")
  type: NodeType;                // Document type
  category: string;              // Category (e.g., "core", "swarm", "github")
  path: string;                  // File path (e.g., "/.claude/agents/core/coder.md")
  description: string;           // Brief description
  tags: string[];               // Keywords for search and matching

  // Relationships
  relatedTo: Array<{           // All relationships
    id: string;                 // Target node ID
    type: RelationType;         // Relationship type
    weight: number;             // Relationship strength (0.0-1.0)
  }>;
  prerequisites: string[];      // Required reading (node IDs)
  usedBy: string[];            // Documents that use this (node IDs)
  uses: string[];              // Documents this uses (node IDs)

  // Optional Metadata
  capabilities?: string[];     // For agents (e.g., ["code_generation", "refactoring"])
  tools?: string[];           // Required tools (e.g., ["Bash", "Read", "Write"])
  topology?: string;          // For coordinators (e.g., "hierarchical", "mesh")
  priority?: 'low' | 'medium' | 'high' | 'critical';
  color?: string;             // Hex color for visualization
}
```

### KnowledgeGraph

```typescript
interface KnowledgeGraph {
  nodes: Map<string, KnowledgeNode>;  // All nodes indexed by ID
  edges: Map<string, Array<{          // Edges indexed by source node ID
    to: string;                        // Target node ID
    type: RelationType;                // Relationship type
    weight: number;                    // Edge weight
  }>>;
}
```

## Core Functions

### buildKnowledgeGraph

```typescript
function buildKnowledgeGraph(): KnowledgeGraph
```

Builds the complete knowledge graph from all documentation files.

**Returns**: Complete `KnowledgeGraph` instance

**Usage**:
```typescript
import { buildKnowledgeGraph } from './utils/knowledgeGraph';

const graph = buildKnowledgeGraph();
console.log(`Loaded ${graph.nodes.size} documents`);
```

---

### findRelatedDocuments

```typescript
function findRelatedDocuments(
  graph: KnowledgeGraph,
  nodeId: string,
  maxResults: number = 10
): KnowledgeNode[]
```

Finds related documents sorted by relationship weight.

**Parameters**:
- `graph`: The knowledge graph
- `nodeId`: ID of the current document
- `maxResults`: Maximum results to return (default: 10)

**Returns**: Array of related `KnowledgeNode` objects

**Usage**:
```typescript
const related = findRelatedDocuments(knowledgeGraph, 'agent-coder', 5);
related.forEach(doc => {
  console.log(`${doc.title}: ${doc.description}`);
});
```

---

### findPrerequisites

```typescript
function findPrerequisites(
  graph: KnowledgeGraph,
  nodeId: string
): KnowledgeNode[]
```

Finds documents that should be read before the current one.

**Parameters**:
- `graph`: The knowledge graph
- `nodeId`: ID of the current document

**Returns**: Array of prerequisite `KnowledgeNode` objects

**Usage**:
```typescript
const prereqs = findPrerequisites(knowledgeGraph, 'cmd-sparc-tdd');
if (prereqs.length > 0) {
  console.log('Read these first:');
  prereqs.forEach(doc => console.log(`- ${doc.title}`));
}
```

---

### findUsedBy

```typescript
function findUsedBy(
  graph: KnowledgeGraph,
  nodeId: string
): KnowledgeNode[]
```

Finds documents that use or reference the current one.

**Parameters**:
- `graph`: The knowledge graph
- `nodeId`: ID of the current document

**Returns**: Array of `KnowledgeNode` objects that reference this one

**Usage**:
```typescript
const usedBy = findUsedBy(knowledgeGraph, 'agent-coder');
console.log(`The coder agent is used by ${usedBy.length} commands`);
```

---

### suggestRelatedDocuments

```typescript
function suggestRelatedDocuments(
  graph: KnowledgeGraph,
  nodeId: string,
  context?: { userRole?: string; taskType?: string }
): KnowledgeNode[]
```

Provides intelligent "You might also need" suggestions based on context.

**Parameters**:
- `graph`: The knowledge graph
- `nodeId`: ID of the current document
- `context`: Optional context for personalization
  - `userRole`: User expertise level
  - `taskType`: Current task type

**Returns**: Array of suggested `KnowledgeNode` objects (max 8)

**Scoring Algorithm**:
- Prerequisites: +2.0
- Related documents: +weight
- Uses/UsedBy (contextual): +1.5
- Same category: +0.5

**Usage**:
```typescript
const suggestions = suggestRelatedDocuments(
  knowledgeGraph,
  'cmd-swarm-init',
  { userRole: 'beginner', taskType: 'coordination' }
);

suggestions.forEach(doc => {
  console.log(`💡 ${doc.title} (${doc.type})`);
});
```

---

### searchDocuments

```typescript
function searchDocuments(
  graph: KnowledgeGraph,
  query: string
): KnowledgeNode[]
```

Full-text search across all documents.

**Parameters**:
- `graph`: The knowledge graph
- `query`: Search query string

**Returns**: Array of matching `KnowledgeNode` objects sorted by relevance

**Scoring**:
- Title match: +3.0
- Tag match: +2.0
- Description match: +1.5
- Category match: +1.0

**Usage**:
```typescript
const results = searchDocuments(knowledgeGraph, 'github swarm');
console.log(`Found ${results.length} results for "github swarm"`);

results.forEach((doc, i) => {
  console.log(`${i + 1}. ${doc.title} (${doc.type})`);
});
```

---

### getNodesByType

```typescript
function getNodesByType(
  graph: KnowledgeGraph,
  type: NodeType
): KnowledgeNode[]
```

Filters documents by type.

**Parameters**:
- `graph`: The knowledge graph
- `type`: Document type to filter

**Returns**: Array of `KnowledgeNode` objects of the specified type

**Usage**:
```typescript
const agents = getNodesByType(knowledgeGraph, 'agent');
const commands = getNodesByType(knowledgeGraph, 'command');

console.log(`Total agents: ${agents.length}`);
console.log(`Total commands: ${commands.length}`);
```

---

### getNodesByCategory

```typescript
function getNodesByCategory(
  graph: KnowledgeGraph,
  category: string
): KnowledgeNode[]
```

Filters documents by category.

**Parameters**:
- `graph`: The knowledge graph
- `category`: Category name (e.g., "core", "swarm", "github")

**Returns**: Array of `KnowledgeNode` objects in the specified category

**Usage**:
```typescript
const coreAgents = getNodesByCategory(knowledgeGraph, 'core');
const githubTools = getNodesByCategory(knowledgeGraph, 'github');

console.log('Core agents:', coreAgents.map(a => a.title).join(', '));
```

---

### getGraphStats

```typescript
function getGraphStats(graph: KnowledgeGraph): {
  totalNodes: number;
  totalEdges: number;
  nodesByType: Record<NodeType, number>;
  nodesByCategory: Record<string, number>;
  avgRelationships: number;
}
```

Computes statistics about the knowledge graph.

**Parameters**:
- `graph`: The knowledge graph

**Returns**: Statistics object

**Usage**:
```typescript
const stats = getGraphStats(knowledgeGraph);

console.log(`
Knowledge Graph Statistics:
- Total Documents: ${stats.totalNodes}
- Total Relationships: ${stats.totalEdges}
- Avg Relationships/Doc: ${stats.avgRelationships.toFixed(2)}

By Type:
${Object.entries(stats.nodesByType)
  .map(([type, count]) => `  - ${type}: ${count}`)
  .join('\n')}

By Category:
${Object.entries(stats.nodesByCategory)
  .map(([cat, count]) => `  - ${cat}: ${count}`)
  .join('\n')}
`);
```

## Singleton Instance

### knowledgeGraph

```typescript
export const knowledgeGraph: KnowledgeGraph
```

Pre-built singleton instance of the knowledge graph.

**Usage**:
```typescript
import { knowledgeGraph, findRelatedDocuments } from './utils/knowledgeGraph';

// Use directly without building
const related = findRelatedDocuments(knowledgeGraph, 'agent-coder');
```

## React Components

### RelatedDocuments

```tsx
interface RelatedDocumentsProps {
  currentDocId: string;
  onDocumentClick?: (docId: string) => void;
}

function RelatedDocuments(props: RelatedDocumentsProps): JSX.Element
```

Displays related documents sidebar with sections for:
- Prerequisites
- You Might Also Need
- Related Documents
- Used By

**Usage**:
```tsx
<RelatedDocuments
  currentDocId="agent-coder"
  onDocumentClick={(id) => navigate(`/docs/${id}`)}
/>
```

---

### KnowledgeMap

```tsx
interface KnowledgeMapProps {
  selectedNodeId?: string;
  onNodeClick?: (nodeId: string) => void;
  filterType?: NodeType;
  filterCategory?: string;
}

function KnowledgeMap(props: KnowledgeMapProps): JSX.Element
```

Interactive force-directed graph visualization.

**Features**:
- Force-directed layout
- Node dragging
- Hover tooltips
- Click navigation
- Type/category filtering

**Usage**:
```tsx
<KnowledgeMap
  selectedNodeId="agent-coder"
  onNodeClick={(id) => setCurrentDoc(id)}
  filterType="agent"
  filterCategory="core"
/>
```

## Advanced Examples

### Building a Learning Path

```typescript
function buildLearningPath(targetId: string): KnowledgeNode[] {
  const path: KnowledgeNode[] = [];
  const visited = new Set<string>();

  function traverse(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    // Add prerequisites first
    const prereqs = findPrerequisites(knowledgeGraph, nodeId);
    prereqs.forEach(p => traverse(p.id));

    // Add current node
    const node = knowledgeGraph.nodes.get(nodeId);
    if (node) path.push(node);
  }

  traverse(targetId);
  return path;
}

// Usage
const path = buildLearningPath('cmd-sparc-tdd');
console.log('Learning path:');
path.forEach((node, i) => {
  console.log(`${i + 1}. ${node.title}`);
});
```

### Finding Shortest Path

```typescript
function findShortestPath(
  startId: string,
  endId: string
): KnowledgeNode[] | null {
  const queue: string[][] = [[startId]];
  const visited = new Set<string>([startId]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    if (current === endId) {
      return path.map(id => knowledgeGraph.nodes.get(id)!);
    }

    const node = knowledgeGraph.nodes.get(current);
    if (!node) continue;

    for (const rel of node.relatedTo) {
      if (!visited.has(rel.id)) {
        visited.add(rel.id);
        queue.push([...path, rel.id]);
      }
    }
  }

  return null; // No path found
}

// Usage
const path = findShortestPath('agent-coder', 'cmd-github-pr-manager');
if (path) {
  console.log('Shortest path:', path.map(n => n.title).join(' → '));
}
```

### Custom Recommendation Engine

```typescript
function getPersonalizedRecommendations(
  nodeId: string,
  userProfile: {
    expertiseLevel: 'beginner' | 'intermediate' | 'advanced';
    interests: string[];
    completedDocs: Set<string>;
  }
): KnowledgeNode[] {
  let suggestions = suggestRelatedDocuments(knowledgeGraph, nodeId);

  // Filter out completed docs
  suggestions = suggestions.filter(s => !userProfile.completedDocs.has(s.id));

  // Boost docs matching user interests
  suggestions = suggestions.map(doc => ({
    doc,
    score: doc.tags.filter(tag => userProfile.interests.includes(tag)).length
  }))
  .sort((a, b) => b.score - a.score)
  .map(({ doc }) => doc);

  // Filter by expertise level
  if (userProfile.expertiseLevel === 'beginner') {
    suggestions = suggestions.filter(s => s.priority !== 'critical');
  }

  return suggestions.slice(0, 5);
}
```

## Performance Notes

- **Graph Building**: O(n²) complexity, ~10ms for 225 nodes
- **Search**: O(n) linear scan, ~2ms for 225 nodes
- **Related Lookup**: O(1) using pre-built edges
- **Memory**: ~1-2MB for complete graph

---

**Version**: 1.0.0
**Last Updated**: 2025-09-30
