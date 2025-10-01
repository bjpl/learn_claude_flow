/**
 * Semantic Search Mappings
 * Maps natural language queries to relevant documentation
 */

export interface SemanticMapping {
  patterns: RegExp[];
  targets: string[];
  boost: number;
  category?: string;
}

/**
 * Semantic search mappings for intelligent query understanding
 */
export const SEMANTIC_MAPPINGS: SemanticMapping[] = [
  // Agent Spawning & Initialization
  {
    patterns: [
      /how\s+to\s+spawn\s+agents?/i,
      /create\s+agents?/i,
      /start\s+agents?/i,
      /initialize\s+agents?/i,
    ],
    targets: ['swarm-init.md', 'agent-spawn.md', 'swarm-spawn.md'],
    boost: 2.0,
    category: 'Coordination',
  },

  // Code Review
  {
    patterns: [
      /code\s+review/i,
      /review\s+code/i,
      /pr\s+review/i,
      /pull\s+request\s+review/i,
    ],
    targets: ['code-review-swarm.md', 'reviewer.md', 'pr-manager.md'],
    boost: 2.0,
    category: 'GitHub',
  },

  // Testing
  {
    patterns: [
      /testing/i,
      /test\s+driven/i,
      /tdd/i,
      /unit\s+tests?/i,
      /integration\s+tests?/i,
    ],
    targets: ['tester.md', 'tdd-london-swarm.md', 'production-validator.md'],
    boost: 2.0,
    category: 'Testing',
  },

  // Swarm Management
  {
    patterns: [
      /swarm\s+management/i,
      /manage\s+swarm/i,
      /swarm\s+status/i,
      /monitor\s+swarm/i,
    ],
    targets: ['swarm-status.md', 'swarm-monitor.md', 'swarm-init.md'],
    boost: 1.8,
    category: 'Coordination',
  },

  // Architecture & Design
  {
    patterns: [
      /architecture/i,
      /system\s+design/i,
      /design\s+patterns?/i,
      /sparc\s+architecture/i,
    ],
    targets: ['architecture.md', 'system-design.md', 'arch-system-design.md'],
    boost: 1.8,
    category: 'Architecture',
  },

  // Performance & Optimization
  {
    patterns: [
      /performance/i,
      /optimization/i,
      /speed\s+up/i,
      /bottleneck/i,
      /token\s+usage/i,
    ],
    targets: [
      'performance-report.md',
      'token-usage.md',
      'bottleneck-detect.md',
      'performance-benchmarker.md',
    ],
    boost: 1.8,
    category: 'Analysis',
  },

  // Memory & State Management
  {
    patterns: [
      /memory/i,
      /state\s+management/i,
      /persistence/i,
      /session\s+memory/i,
    ],
    targets: ['memory-usage.md', 'session-memory.md', 'memory-coordinator.md'],
    boost: 1.7,
    category: 'Memory',
  },

  // GitHub Integration
  {
    patterns: [
      /github\s+integration/i,
      /repo\s+management/i,
      /repository/i,
      /git\s+workflow/i,
    ],
    targets: [
      'github-modes.md',
      'repo-architect.md',
      'workflow-automation.md',
      'sync-coordinator.md',
    ],
    boost: 1.7,
    category: 'GitHub',
  },

  // Consensus & Coordination
  {
    patterns: [
      /consensus/i,
      /byzantine/i,
      /raft/i,
      /distributed\s+coordination/i,
      /fault\s+toleran(ce|t)/i,
    ],
    targets: [
      'byzantine-coordinator.md',
      'raft-manager.md',
      'gossip-coordinator.md',
      'quorum-manager.md',
    ],
    boost: 1.6,
    category: 'Consensus',
  },

  // SPARC Methodology
  {
    patterns: [
      /sparc/i,
      /methodology/i,
      /specification/i,
      /pseudocode/i,
      /refinement/i,
    ],
    targets: [
      'specification.md',
      'pseudocode.md',
      'architecture.md',
      'refinement.md',
      'sparc-modes.md',
    ],
    boost: 1.6,
    category: 'SPARC',
  },

  // Automation
  {
    patterns: [
      /automation/i,
      /auto\s+spawn/i,
      /smart\s+agents?/i,
      /self\s+healing/i,
    ],
    targets: ['auto-agent.md', 'smart-agents.md', 'self-healing.md'],
    boost: 1.5,
    category: 'Automation',
  },

  // CI/CD & DevOps
  {
    patterns: [
      /ci\s*\/?\s*cd/i,
      /continuous\s+integration/i,
      /deployment/i,
      /devops/i,
    ],
    targets: ['ops-cicd-github.md', 'workflow-automation.md'],
    boost: 1.5,
    category: 'DevOps',
  },

  // Documentation
  {
    patterns: [
      /documentation/i,
      /api\s+docs?/i,
      /openapi/i,
      /swagger/i,
    ],
    targets: ['docs-api-openapi.md', 'api-docs'],
    boost: 1.4,
    category: 'Documentation',
  },

  // Issue Tracking
  {
    patterns: [
      /issue\s+tracking/i,
      /bug\s+tracking/i,
      /issue\s+management/i,
      /triage/i,
    ],
    targets: ['issue-tracker.md', 'swarm-issue.md'],
    boost: 1.4,
    category: 'GitHub',
  },

  // Release Management
  {
    patterns: [
      /release/i,
      /versioning/i,
      /changelog/i,
      /release\s+management/i,
    ],
    targets: ['release-manager.md', 'release-swarm.md'],
    boost: 1.4,
    category: 'GitHub',
  },
];

/**
 * Command syntax patterns for detection
 */
export const COMMAND_PATTERNS: Record<string, RegExp[]> = {
  'swarm-init': [
    /npx\s+claude-flow.*swarm\s+init/i,
    /mcp__claude-flow__swarm_init/i,
  ],
  'agent-spawn': [
    /npx\s+claude-flow.*agent\s+spawn/i,
    /mcp__claude-flow__agent_spawn/i,
  ],
  'task-orchestrate': [
    /npx\s+claude-flow.*task\s+orchestrate/i,
    /mcp__claude-flow__task_orchestrate/i,
  ],
  'memory-usage': [
    /npx\s+claude-flow.*memory\s+usage/i,
    /mcp__claude-flow__memory_usage/i,
  ],
  'performance-report': [
    /npx\s+claude-flow.*performance\s+report/i,
    /mcp__claude-flow__performance_report/i,
  ],
};

/**
 * Agent capability mappings
 */
export const AGENT_CAPABILITIES: Record<string, string[]> = {
  coder: ['implementation', 'coding', 'development', 'programming'],
  reviewer: ['code review', 'quality assurance', 'validation', 'inspection'],
  tester: ['testing', 'test-driven', 'tdd', 'unit tests', 'integration tests'],
  planner: ['planning', 'task breakdown', 'organization', 'strategy'],
  researcher: ['research', 'analysis', 'investigation', 'exploration'],
  'performance-benchmarker': [
    'performance',
    'benchmarking',
    'optimization',
    'profiling',
  ],
  'byzantine-coordinator': [
    'consensus',
    'byzantine',
    'fault-tolerance',
    'distributed',
  ],
  'raft-manager': ['consensus', 'raft', 'leader election', 'replication'],
  'pr-manager': ['pull requests', 'github', 'pr management', 'reviews'],
  'code-review-swarm': ['code review', 'swarm', 'collaborative review'],
  'issue-tracker': ['issues', 'bug tracking', 'triage', 'project management'],
};

/**
 * Category-based filtering
 */
export const CATEGORY_FILTERS = {
  agents: ['Agents/Core', 'Agents/Consensus', 'Agents/GitHub', 'Agents/SPARC'],
  commands: [
    'Commands/Coordination',
    'Commands/Memory',
    'Commands/Analysis',
    'Commands/GitHub',
  ],
  guides: ['Guides', 'Documentation'],
  sparc: ['Agents/SPARC', 'SPARC'],
  github: ['Agents/GitHub', 'Commands/GitHub'],
  consensus: ['Agents/Consensus'],
  optimization: ['Commands/Analysis', 'Commands/Optimization'],
};
