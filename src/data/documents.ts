/**
 * Auto-generated documentation manifest
 * Generated on: 2025-10-01T22:32:02.763Z
 * Total documents: 224
 */

import type { Document } from '../types';

export const CLAUDE_DOCUMENTS: Document[] = [
  {
    "id": "agents-analysis-code-analyzer",
    "title": "Code Analyzer Agent",
    "url": "/.claude/agents/analysis/code-analyzer.md",
    "filePath": "/.claude/agents/analysis/code-analyzer.md",
    "type": "markdown",
    "category": "Agents/Analysis",
    "tags": [
      "analysis",
      "agent",
      "code",
      "analyzer"
    ],
    "description": "An advanced code quality analysis specialist that performs comprehensive code reviews, identifies improvements, and ensures best practices are followe"
  },
  {
    "id": "agents-analysis-code-review-analyze-code-quality",
    "title": "# Count files to analyze",
    "url": "/.claude/agents/analysis/code-review/analyze-code-quality.md",
    "filePath": "/.claude/agents/analysis/code-review/analyze-code-quality.md",
    "type": "markdown",
    "category": "Agents/Analysis/Code-review",
    "tags": [
      "analysis",
      "code-review",
      "agent",
      "analyze",
      "code",
      "quality"
    ],
    "description": "find . -name \"*.js\" -o -name \"*.ts\" -o -name \"*.py\" | grep -v node_modules | wc -l | xargs echo \"Files to analyze:\""
  },
  {
    "id": "agents-architecture-system-design-arch-system-design",
    "title": "System Architecture Designer",
    "url": "/.claude/agents/architecture/system-design/arch-system-design.md",
    "filePath": "/.claude/agents/architecture/system-design/arch-system-design.md",
    "type": "markdown",
    "category": "Agents/Architecture/System-design",
    "tags": [
      "architecture",
      "system-design",
      "agent",
      "arch",
      "system",
      "design"
    ],
    "description": "You are a System Architecture Designer responsible for high-level technical decisions and system design."
  },
  {
    "id": "agents-base-template-generator",
    "title": "Base Template Generator",
    "url": "/.claude/agents/base-template-generator.md",
    "filePath": "/.claude/agents/base-template-generator.md",
    "type": "markdown",
    "category": "Agents",
    "tags": [
      "agent",
      "base",
      "template",
      "generator"
    ],
    "description": "Claude Flow documentation"
  },
  {
    "id": "agents-consensus-byzantine-coordinator",
    "title": "# Verify network integrity before consensus",
    "url": "/.claude/agents/consensus/byzantine-coordinator.md",
    "filePath": "/.claude/agents/consensus/byzantine-coordinator.md",
    "type": "markdown",
    "category": "Agents/Consensus",
    "tags": [
      "consensus",
      "agent",
      "byzantine",
      "coordinator"
    ],
    "description": "if [[ \"$TASK\" == *\"consensus\"* ]]; then"
  },
  {
    "id": "agents-consensus-crdt-synchronizer",
    "title": "# Initialize CRDT state tracking",
    "url": "/.claude/agents/consensus/crdt-synchronizer.md",
    "filePath": "/.claude/agents/consensus/crdt-synchronizer.md",
    "type": "markdown",
    "category": "Agents/Consensus",
    "tags": [
      "consensus",
      "agent",
      "crdt",
      "synchronizer"
    ],
    "description": "if [[ \"$TASK\" == *\"synchronization\"* ]]; then"
  },
  {
    "id": "agents-consensus-gossip-coordinator",
    "title": "# Initialize peer connections",
    "url": "/.claude/agents/consensus/gossip-coordinator.md",
    "filePath": "/.claude/agents/consensus/gossip-coordinator.md",
    "type": "markdown",
    "category": "Agents/Consensus",
    "tags": [
      "consensus",
      "agent",
      "gossip",
      "coordinator"
    ],
    "description": "if [[ \"$TASK\" == *\"dissemination\"* ]]; then"
  },
  {
    "id": "agents-consensus-performance-benchmarker",
    "title": "# Initialize monitoring systems",
    "url": "/.claude/agents/consensus/performance-benchmarker.md",
    "filePath": "/.claude/agents/consensus/performance-benchmarker.md",
    "type": "markdown",
    "category": "Agents/Consensus",
    "tags": [
      "consensus",
      "agent",
      "performance",
      "benchmarker"
    ],
    "description": "if [[ \"$TASK\" == *\"benchmark\"* ]]; then"
  },
  {
    "id": "agents-consensus-quorum-manager",
    "title": "# Assess current network conditions",
    "url": "/.claude/agents/consensus/quorum-manager.md",
    "filePath": "/.claude/agents/consensus/quorum-manager.md",
    "type": "markdown",
    "category": "Agents/Consensus",
    "tags": [
      "consensus",
      "agent",
      "quorum",
      "manager"
    ],
    "description": "if [[ \"$TASK\" == *\"quorum\"* ]]; then"
  },
  {
    "id": "agents-consensus-raft-manager",
    "title": "# Check cluster health before operations",
    "url": "/.claude/agents/consensus/raft-manager.md",
    "filePath": "/.claude/agents/consensus/raft-manager.md",
    "type": "markdown",
    "category": "Agents/Consensus",
    "tags": [
      "consensus",
      "agent",
      "raft",
      "manager"
    ],
    "description": "if [[ \"$TASK\" == *\"election\"* ]]; then"
  },
  {
    "id": "agents-consensus-security-manager",
    "title": "# Initialize security protocols",
    "url": "/.claude/agents/consensus/security-manager.md",
    "filePath": "/.claude/agents/consensus/security-manager.md",
    "type": "markdown",
    "category": "Agents/Consensus",
    "tags": [
      "consensus",
      "agent",
      "security",
      "manager"
    ],
    "description": "if [[ \"$TASK\" == *\"consensus\"* ]]; then"
  },
  {
    "id": "agents-core-coder",
    "title": "# Check for existing tests",
    "url": "/.claude/agents/core/coder.md",
    "filePath": "/.claude/agents/core/coder.md",
    "type": "markdown",
    "category": "Agents/Core",
    "tags": [
      "core",
      "agent",
      "coder"
    ],
    "description": "if grep -q \"test\\|spec\" <<< \"$TASK\"; then"
  },
  {
    "id": "agents-core-planner",
    "title": "Strategic Planning Agent",
    "url": "/.claude/agents/core/planner.md",
    "filePath": "/.claude/agents/core/planner.md",
    "type": "markdown",
    "category": "Agents/Core",
    "tags": [
      "core",
      "agent",
      "planner"
    ],
    "description": "You are a strategic planning specialist responsible for breaking down complex tasks into manageable components and creating actionable execution plans"
  },
  {
    "id": "agents-core-researcher",
    "title": "Research and Analysis Agent",
    "url": "/.claude/agents/core/researcher.md",
    "filePath": "/.claude/agents/core/researcher.md",
    "type": "markdown",
    "category": "Agents/Core",
    "tags": [
      "core",
      "agent",
      "researcher"
    ],
    "description": "You are a research specialist focused on thorough investigation, pattern analysis, and knowledge synthesis for software development tasks."
  },
  {
    "id": "agents-core-reviewer",
    "title": "# Create review checklist",
    "url": "/.claude/agents/core/reviewer.md",
    "filePath": "/.claude/agents/core/reviewer.md",
    "type": "markdown",
    "category": "Agents/Core",
    "tags": [
      "core",
      "agent",
      "reviewer"
    ],
    "description": "memory_store \"review_checklist_$(date +%s)\" \"functionality,security,performance,maintainability,documentation\""
  },
  {
    "id": "agents-core-tester",
    "title": "# Check test environment",
    "url": "/.claude/agents/core/tester.md",
    "filePath": "/.claude/agents/core/tester.md",
    "type": "markdown",
    "category": "Agents/Core",
    "tags": [
      "core",
      "agent",
      "tester"
    ],
    "description": "if [ -f \"jest.config.js\" ] || [ -f \"vitest.config.ts\" ]; then"
  },
  {
    "id": "agents-data-ml-data-ml-model",
    "title": "Machine Learning Model Developer",
    "url": "/.claude/agents/data/ml/data-ml-model.md",
    "filePath": "/.claude/agents/data/ml/data-ml-model.md",
    "type": "markdown",
    "category": "Agents/Data/Ml",
    "tags": [
      "data",
      "ml",
      "agent",
      "model"
    ],
    "description": "You are a Machine Learning Model Developer specializing in end-to-end ML workflows."
  },
  {
    "id": "agents-development-backend-dev-backend-api",
    "title": "Backend API Developer",
    "url": "/.claude/agents/development/backend/dev-backend-api.md",
    "filePath": "/.claude/agents/development/backend/dev-backend-api.md",
    "type": "markdown",
    "category": "Agents/Development/Backend",
    "tags": [
      "development",
      "backend",
      "agent",
      "dev",
      "api"
    ],
    "description": "You are a specialized Backend API Developer agent focused on creating robust, scalable APIs."
  },
  {
    "id": "agents-devops-ci-cd-ops-cicd-github",
    "title": "# Simple YAML validation",
    "url": "/.claude/agents/devops/ci-cd/ops-cicd-github.md",
    "filePath": "/.claude/agents/devops/ci-cd/ops-cicd-github.md",
    "type": "markdown",
    "category": "Agents/Devops/Ci-cd",
    "tags": [
      "devops",
      "ci-cd",
      "agent",
      "ops",
      "cicd",
      "github"
    ],
    "description": "find .github/workflows -name \"*.yml\" -o -name \"*.yaml\" | xargs -I {} sh -c 'echo \"Checking {}\" && cat {} | head -1'"
  },
  {
    "id": "agents-documentation-api-docs-docs-api-openapi",
    "title": "# Look for existing API routes",
    "url": "/.claude/agents/documentation/api-docs/docs-api-openapi.md",
    "filePath": "/.claude/agents/documentation/api-docs/docs-api-openapi.md",
    "type": "markdown",
    "category": "Agents/Documentation/Api-docs",
    "tags": [
      "documentation",
      "api-docs",
      "agent",
      "docs",
      "api",
      "openapi"
    ],
    "description": "find . -name \"*.route.js\" -o -name \"*.controller.js\" -o -name \"routes.js\" | grep -v node_modules | head -10"
  },
  {
    "id": "agents-flow-nexus-app-store",
    "title": "App Store",
    "url": "/.claude/agents/flow-nexus/app-store.md",
    "filePath": "/.claude/agents/flow-nexus/app-store.md",
    "type": "markdown",
    "category": "Agents/Flow-nexus",
    "tags": [
      "flow-nexus",
      "agent",
      "app",
      "store"
    ],
    "description": "Claude Flow documentation"
  },
  {
    "id": "agents-flow-nexus-authentication",
    "title": "Authentication",
    "url": "/.claude/agents/flow-nexus/authentication.md",
    "filePath": "/.claude/agents/flow-nexus/authentication.md",
    "type": "markdown",
    "category": "Agents/Flow-nexus",
    "tags": [
      "flow-nexus",
      "agent",
      "authentication"
    ],
    "description": "Claude Flow documentation"
  },
  {
    "id": "agents-flow-nexus-challenges",
    "title": "Challenges",
    "url": "/.claude/agents/flow-nexus/challenges.md",
    "filePath": "/.claude/agents/flow-nexus/challenges.md",
    "type": "markdown",
    "category": "Agents/Flow-nexus",
    "tags": [
      "flow-nexus",
      "agent",
      "challenges"
    ],
    "description": "Claude Flow documentation"
  },
  {
    "id": "agents-flow-nexus-neural-network",
    "title": "Neural Network",
    "url": "/.claude/agents/flow-nexus/neural-network.md",
    "filePath": "/.claude/agents/flow-nexus/neural-network.md",
    "type": "markdown",
    "category": "Agents/Flow-nexus",
    "tags": [
      "flow-nexus",
      "agent",
      "neural",
      "network"
    ],
    "description": "Claude Flow documentation"
  },
  {
    "id": "agents-flow-nexus-payments",
    "title": "Payments",
    "url": "/.claude/agents/flow-nexus/payments.md",
    "filePath": "/.claude/agents/flow-nexus/payments.md",
    "type": "markdown",
    "category": "Agents/Flow-nexus",
    "tags": [
      "flow-nexus",
      "agent",
      "payments"
    ],
    "description": "Claude Flow documentation"
  },
  {
    "id": "agents-flow-nexus-sandbox",
    "title": "Sandbox",
    "url": "/.claude/agents/flow-nexus/sandbox.md",
    "filePath": "/.claude/agents/flow-nexus/sandbox.md",
    "type": "markdown",
    "category": "Agents/Flow-nexus",
    "tags": [
      "flow-nexus",
      "agent",
      "sandbox"
    ],
    "description": "Claude Flow documentation"
  },
  {
    "id": "agents-flow-nexus-swarm",
    "title": "Swarm",
    "url": "/.claude/agents/flow-nexus/swarm.md",
    "filePath": "/.claude/agents/flow-nexus/swarm.md",
    "type": "markdown",
    "category": "Agents/Flow-nexus",
    "tags": [
      "flow-nexus",
      "agent",
      "swarm"
    ],
    "description": "Claude Flow documentation"
  },
  {
    "id": "agents-flow-nexus-user-tools",
    "title": "User Tools",
    "url": "/.claude/agents/flow-nexus/user-tools.md",
    "filePath": "/.claude/agents/flow-nexus/user-tools.md",
    "type": "markdown",
    "category": "Agents/Flow-nexus",
    "tags": [
      "flow-nexus",
      "agent",
      "user",
      "tools"
    ],
    "description": "Claude Flow documentation"
  },
  {
    "id": "agents-flow-nexus-workflow",
    "title": "Workflow",
    "url": "/.claude/agents/flow-nexus/workflow.md",
    "filePath": "/.claude/agents/flow-nexus/workflow.md",
    "type": "markdown",
    "category": "Agents/Flow-nexus",
    "tags": [
      "flow-nexus",
      "agent",
      "workflow"
    ],
    "description": "Claude Flow documentation"
  },
  {
    "id": "agents-github-code-review-swarm",
    "title": "Code Review Swarm - Automated Code Review with AI Agents",
    "url": "/.claude/agents/github/code-review-swarm.md",
    "filePath": "/.claude/agents/github/code-review-swarm.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "code",
      "review",
      "swarm"
    ],
    "description": "Deploy specialized AI agents to perform comprehensive, intelligent code reviews that go beyond traditional static analysis."
  },
  {
    "id": "agents-github-github-modes",
    "title": "GitHub Integration Modes",
    "url": "/.claude/agents/github/github-modes.md",
    "filePath": "/.claude/agents/github/github-modes.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "modes"
    ],
    "description": "This document describes all GitHub integration modes available in Claude-Flow with ruv-swarm coordination. Each mode is optimized for specific GitHub "
  },
  {
    "id": "agents-github-issue-tracker",
    "title": "GitHub Issue Tracker",
    "url": "/.claude/agents/github/issue-tracker.md",
    "filePath": "/.claude/agents/github/issue-tracker.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "issue",
      "tracker"
    ],
    "description": "Intelligent issue management and project coordination with ruv-swarm integration for automated tracking, progress monitoring, and team coordination."
  },
  {
    "id": "agents-github-multi-repo-swarm",
    "title": "Multi-Repo Swarm - Cross-Repository Swarm Orchestration",
    "url": "/.claude/agents/github/multi-repo-swarm.md",
    "filePath": "/.claude/agents/github/multi-repo-swarm.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "multi",
      "repo",
      "swarm"
    ],
    "description": "Coordinate AI swarms across multiple repositories, enabling organization-wide automation and intelligent cross-project collaboration."
  },
  {
    "id": "agents-github-pr-manager",
    "title": "GitHub PR Manager",
    "url": "/.claude/agents/github/pr-manager.md",
    "filePath": "/.claude/agents/github/pr-manager.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "pr",
      "manager"
    ],
    "description": "Comprehensive pull request management with swarm coordination for automated reviews, testing, and merge workflows."
  },
  {
    "id": "agents-github-project-board-sync",
    "title": "Project Board Sync - GitHub Projects Integration",
    "url": "/.claude/agents/github/project-board-sync.md",
    "filePath": "/.claude/agents/github/project-board-sync.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "project",
      "board",
      "sync"
    ],
    "description": "Synchronize AI swarms with GitHub Projects for visual task management, progress tracking, and team coordination."
  },
  {
    "id": "agents-github-release-manager",
    "title": "GitHub Release Manager",
    "url": "/.claude/agents/github/release-manager.md",
    "filePath": "/.claude/agents/github/release-manager.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "release",
      "manager"
    ],
    "description": "Automated release coordination and deployment with ruv-swarm orchestration for seamless version management, testing, and deployment across multiple pa"
  },
  {
    "id": "agents-github-release-swarm",
    "title": "Release Swarm - Intelligent Release Automation",
    "url": "/.claude/agents/github/release-swarm.md",
    "filePath": "/.claude/agents/github/release-swarm.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "release",
      "swarm"
    ],
    "description": "Orchestrate complex software releases using AI swarms that handle everything from changelog generation to multi-platform deployment."
  },
  {
    "id": "agents-github-repo-architect",
    "title": "GitHub Repository Architect",
    "url": "/.claude/agents/github/repo-architect.md",
    "filePath": "/.claude/agents/github/repo-architect.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "repo",
      "architect"
    ],
    "description": "Repository structure optimization and multi-repo management with ruv-swarm coordination for scalable project architecture and development workflows."
  },
  {
    "id": "agents-github-swarm-issue",
    "title": "Swarm Issue - Issue-Based Swarm Coordination",
    "url": "/.claude/agents/github/swarm-issue.md",
    "filePath": "/.claude/agents/github/swarm-issue.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "swarm",
      "issue"
    ],
    "description": "Transform GitHub Issues into intelligent swarm tasks, enabling automatic task decomposition and agent coordination with advanced multi-agent orchestra"
  },
  {
    "id": "agents-github-swarm-pr",
    "title": "Swarm PR - Managing Swarms through Pull Requests",
    "url": "/.claude/agents/github/swarm-pr.md",
    "filePath": "/.claude/agents/github/swarm-pr.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "swarm",
      "pr"
    ],
    "description": "Create and manage AI swarms directly from GitHub Pull Requests, enabling seamless integration with your development workflow through intelligent multi"
  },
  {
    "id": "agents-github-sync-coordinator",
    "title": "GitHub Sync Coordinator",
    "url": "/.claude/agents/github/sync-coordinator.md",
    "filePath": "/.claude/agents/github/sync-coordinator.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "sync",
      "coordinator"
    ],
    "description": "Multi-package synchronization and version alignment with ruv-swarm coordination for seamless integration between claude-code-flow and ruv-swarm packag"
  },
  {
    "id": "agents-github-workflow-automation",
    "title": "Workflow Automation - GitHub Actions Integration",
    "url": "/.claude/agents/github/workflow-automation.md",
    "filePath": "/.claude/agents/github/workflow-automation.md",
    "type": "markdown",
    "category": "Agents/Github",
    "tags": [
      "github",
      "agent",
      "workflow",
      "automation"
    ],
    "description": "Integrate AI swarms with GitHub Actions to create intelligent, self-organizing CI/CD pipelines that adapt to your codebase through advanced multi-agen"
  },
  {
    "id": "agents-goal-code-goal-planner",
    "title": "SPARC-GOAP Integration",
    "url": "/.claude/agents/goal/code-goal-planner.md",
    "filePath": "/.claude/agents/goal/code-goal-planner.md",
    "type": "markdown",
    "category": "Agents/Goal",
    "tags": [
      "goal",
      "agent",
      "code",
      "planner"
    ],
    "description": "The SPARC methodology enhances GOAP planning by providing a structured framework for each milestone:"
  },
  {
    "id": "agents-goal-goal-planner",
    "title": "Goal Planner",
    "url": "/.claude/agents/goal/goal-planner.md",
    "filePath": "/.claude/agents/goal/goal-planner.md",
    "type": "markdown",
    "category": "Agents/Goal",
    "tags": [
      "goal",
      "agent",
      "planner"
    ],
    "description": "Claude Flow documentation"
  },
  {
    "id": "agents-hive-mind-collective-intelligence-coordinator",
    "title": "Core Responsibilities",
    "url": "/.claude/agents/hive-mind/collective-intelligence-coordinator.md",
    "filePath": "/.claude/agents/hive-mind/collective-intelligence-coordinator.md",
    "type": "markdown",
    "category": "Agents/Hive-mind",
    "tags": [
      "hive-mind",
      "agent",
      "collective",
      "intelligence",
      "coordinator"
    ],
    "description": "**MANDATORY: Write to memory IMMEDIATELY and FREQUENTLY**"
  },
  {
    "id": "agents-hive-mind-queen-coordinator",
    "title": "Core Responsibilities",
    "url": "/.claude/agents/hive-mind/queen-coordinator.md",
    "filePath": "/.claude/agents/hive-mind/queen-coordinator.md",
    "type": "markdown",
    "category": "Agents/Hive-mind",
    "tags": [
      "hive-mind",
      "agent",
      "queen",
      "coordinator"
    ],
    "description": "**MANDATORY: Establish dominance hierarchy and write sovereign status**"
  },
  {
    "id": "agents-hive-mind-scout-explorer",
    "title": "Core Responsibilities",
    "url": "/.claude/agents/hive-mind/scout-explorer.md",
    "filePath": "/.claude/agents/hive-mind/scout-explorer.md",
    "type": "markdown",
    "category": "Agents/Hive-mind",
    "tags": [
      "hive-mind",
      "agent",
      "scout",
      "explorer"
    ],
    "description": "**MANDATORY: Report all discoveries immediately to memory**"
  },
  {
    "id": "agents-hive-mind-swarm-memory-manager",
    "title": "Core Responsibilities",
    "url": "/.claude/agents/hive-mind/swarm-memory-manager.md",
    "filePath": "/.claude/agents/hive-mind/swarm-memory-manager.md",
    "type": "markdown",
    "category": "Agents/Hive-mind",
    "tags": [
      "hive-mind",
      "agent",
      "swarm",
      "memory",
      "manager"
    ],
    "description": "**MANDATORY: Continuously write and sync memory state**"
  },
  {
    "id": "agents-hive-mind-worker-specialist",
    "title": "Core Responsibilities",
    "url": "/.claude/agents/hive-mind/worker-specialist.md",
    "filePath": "/.claude/agents/hive-mind/worker-specialist.md",
    "type": "markdown",
    "category": "Agents/Hive-mind",
    "tags": [
      "hive-mind",
      "agent",
      "worker",
      "specialist"
    ],
    "description": "**MANDATORY: Report status before, during, and after every task**"
  },
  {
    "id": "agents-neural-safla-neural",
    "title": "MCP Integration Examples",
    "url": "/.claude/agents/neural/safla-neural.md",
    "filePath": "/.claude/agents/neural/safla-neural.md",
    "type": "markdown",
    "category": "Agents/Neural",
    "tags": [
      "neural",
      "agent",
      "safla"
    ],
    "description": "```javascript"
  },
  {
    "id": "agents-optimization-benchmark-suite",
    "title": "Benchmark Suite Agent",
    "url": "/.claude/agents/optimization/benchmark-suite.md",
    "filePath": "/.claude/agents/optimization/benchmark-suite.md",
    "type": "markdown",
    "category": "Agents/Optimization",
    "tags": [
      "optimization",
      "agent",
      "benchmark",
      "suite"
    ],
    "description": "- **Name**: Benchmark Suite"
  },
  {
    "id": "agents-optimization-load-balancer",
    "title": "Load Balancing Coordinator Agent",
    "url": "/.claude/agents/optimization/load-balancer.md",
    "filePath": "/.claude/agents/optimization/load-balancer.md",
    "type": "markdown",
    "category": "Agents/Optimization",
    "tags": [
      "optimization",
      "agent",
      "load",
      "balancer"
    ],
    "description": "- **Name**: Load Balancing Coordinator"
  },
  {
    "id": "agents-optimization-performance-monitor",
    "title": "Performance Monitor Agent",
    "url": "/.claude/agents/optimization/performance-monitor.md",
    "filePath": "/.claude/agents/optimization/performance-monitor.md",
    "type": "markdown",
    "category": "Agents/Optimization",
    "tags": [
      "optimization",
      "agent",
      "performance",
      "monitor"
    ],
    "description": "- **Name**: Performance Monitor"
  },
  {
    "id": "agents-optimization-resource-allocator",
    "title": "Resource Allocator Agent",
    "url": "/.claude/agents/optimization/resource-allocator.md",
    "filePath": "/.claude/agents/optimization/resource-allocator.md",
    "type": "markdown",
    "category": "Agents/Optimization",
    "tags": [
      "optimization",
      "agent",
      "resource",
      "allocator"
    ],
    "description": "- **Name**: Resource Allocator"
  },
  {
    "id": "agents-optimization-topology-optimizer",
    "title": "Topology Optimizer Agent",
    "url": "/.claude/agents/optimization/topology-optimizer.md",
    "filePath": "/.claude/agents/optimization/topology-optimizer.md",
    "type": "markdown",
    "category": "Agents/Optimization",
    "tags": [
      "optimization",
      "agent",
      "topology",
      "optimizer"
    ],
    "description": "- **Name**: Topology Optimizer"
  },
  {
    "id": "agents-sparc-architecture",
    "title": "# Retrieve pseudocode designs",
    "url": "/.claude/agents/sparc/architecture.md",
    "filePath": "/.claude/agents/sparc/architecture.md",
    "type": "markdown",
    "category": "Agents/Sparc",
    "tags": [
      "sparc",
      "agent",
      "architecture"
    ],
    "description": "memory_search \"pseudo_complete\" | tail -1"
  },
  {
    "id": "agents-sparc-pseudocode",
    "title": "# Retrieve specification from memory",
    "url": "/.claude/agents/sparc/pseudocode.md",
    "filePath": "/.claude/agents/sparc/pseudocode.md",
    "type": "markdown",
    "category": "Agents/Sparc",
    "tags": [
      "sparc",
      "agent",
      "pseudocode"
    ],
    "description": "memory_search \"spec_complete\" | tail -1"
  },
  {
    "id": "agents-sparc-refinement",
    "title": "# Run initial tests",
    "url": "/.claude/agents/sparc/refinement.md",
    "filePath": "/.claude/agents/sparc/refinement.md",
    "type": "markdown",
    "category": "Agents/Sparc",
    "tags": [
      "sparc",
      "agent",
      "refinement"
    ],
    "description": "npm test --if-present || echo \"No tests yet\""
  },
  {
    "id": "agents-sparc-specification",
    "title": "SPARC Specification Agent",
    "url": "/.claude/agents/sparc/specification.md",
    "filePath": "/.claude/agents/sparc/specification.md",
    "type": "markdown",
    "category": "Agents/Sparc",
    "tags": [
      "sparc",
      "agent",
      "specification"
    ],
    "description": "You are a requirements analysis specialist focused on the Specification phase of the SPARC methodology. Your role is to create comprehensive, clear, a"
  },
  {
    "id": "agents-specialized-mobile-spec-mobile-react-native",
    "title": "React Native Mobile Developer",
    "url": "/.claude/agents/specialized/mobile/spec-mobile-react-native.md",
    "filePath": "/.claude/agents/specialized/mobile/spec-mobile-react-native.md",
    "type": "markdown",
    "category": "Agents/Specialized/Mobile",
    "tags": [
      "specialized",
      "mobile",
      "agent",
      "spec",
      "react",
      "native"
    ],
    "description": "You are a React Native Mobile Developer creating cross-platform mobile applications."
  },
  {
    "id": "agents-swarm-adaptive-coordinator",
    "title": "# Initialize with auto-detection",
    "url": "/.claude/agents/swarm/adaptive-coordinator.md",
    "filePath": "/.claude/agents/swarm/adaptive-coordinator.md",
    "type": "markdown",
    "category": "Agents/Swarm",
    "tags": [
      "swarm",
      "agent",
      "adaptive",
      "coordinator"
    ],
    "description": "mcp__claude-flow__swarm_init auto --maxAgents=15 --strategy=adaptive"
  },
  {
    "id": "agents-swarm-hierarchical-coordinator",
    "title": "# Initialize swarm topology",
    "url": "/.claude/agents/swarm/hierarchical-coordinator.md",
    "filePath": "/.claude/agents/swarm/hierarchical-coordinator.md",
    "type": "markdown",
    "category": "Agents/Swarm",
    "tags": [
      "swarm",
      "agent",
      "hierarchical",
      "coordinator"
    ],
    "description": "mcp__claude-flow__swarm_init hierarchical --maxAgents=10 --strategy=adaptive"
  },
  {
    "id": "agents-swarm-mesh-coordinator",
    "title": "# Initialize mesh topology",
    "url": "/.claude/agents/swarm/mesh-coordinator.md",
    "filePath": "/.claude/agents/swarm/mesh-coordinator.md",
    "type": "markdown",
    "category": "Agents/Swarm",
    "tags": [
      "swarm",
      "agent",
      "mesh",
      "coordinator"
    ],
    "description": "mcp__claude-flow__swarm_init mesh --maxAgents=12 --strategy=distributed"
  },
  {
    "id": "agents-templates-automation-smart-agent",
    "title": "# Check current swarm status",
    "url": "/.claude/agents/templates/automation-smart-agent.md",
    "filePath": "/.claude/agents/templates/automation-smart-agent.md",
    "type": "markdown",
    "category": "Agents/Templates",
    "tags": [
      "templates",
      "agent",
      "automation",
      "smart"
    ],
    "description": "memory_retrieve \"current_swarm_status\" || echo \"No active swarm detected\""
  },
  {
    "id": "agents-templates-coordinator-swarm-init",
    "title": "# Write initial status to memory",
    "url": "/.claude/agents/templates/coordinator-swarm-init.md",
    "filePath": "/.claude/agents/templates/coordinator-swarm-init.md",
    "type": "markdown",
    "category": "Agents/Templates",
    "tags": [
      "templates",
      "agent",
      "coordinator",
      "swarm",
      "init"
    ],
    "description": "npx claude-flow@alpha memory store \"swarm/init/status\" \"{\\\"status\\\":\\\"initializing\\\",\\\"timestamp\\\":$(date +%s)}\" --namespace coordination"
  },
  {
    "id": "agents-templates-github-pr-manager",
    "title": "# Verify gh CLI is authenticated",
    "url": "/.claude/agents/templates/github-pr-manager.md",
    "filePath": "/.claude/agents/templates/github-pr-manager.md",
    "type": "markdown",
    "category": "Agents/Templates",
    "tags": [
      "templates",
      "agent",
      "github",
      "pr",
      "manager"
    ],
    "description": "gh auth status || echo \"⚠️ GitHub CLI authentication required\""
  },
  {
    "id": "agents-templates-implementer-sparc-coder",
    "title": "# Check for test files and create if needed",
    "url": "/.claude/agents/templates/implementer-sparc-coder.md",
    "filePath": "/.claude/agents/templates/implementer-sparc-coder.md",
    "type": "markdown",
    "category": "Agents/Templates",
    "tags": [
      "templates",
      "agent",
      "implementer",
      "sparc",
      "coder"
    ],
    "description": "if [ ! -d \"tests\" ] && [ ! -d \"test\" ] && [ ! -d \"__tests__\" ]; then"
  },
  {
    "id": "agents-templates-memory-coordinator",
    "title": "# Check memory system availability",
    "url": "/.claude/agents/templates/memory-coordinator.md",
    "filePath": "/.claude/agents/templates/memory-coordinator.md",
    "type": "markdown",
    "category": "Agents/Templates",
    "tags": [
      "templates",
      "agent",
      "memory",
      "coordinator"
    ],
    "description": "echo \"📊 Current memory usage:\""
  },
  {
    "id": "agents-templates-migration-plan",
    "title": "# Check existing command structure",
    "url": "/.claude/agents/templates/migration-plan.md",
    "filePath": "/.claude/agents/templates/migration-plan.md",
    "type": "markdown",
    "category": "Agents/Templates",
    "tags": [
      "templates",
      "agent",
      "migration",
      "plan"
    ],
    "description": "if [ -d \".claude/commands\" ]; then"
  },
  {
    "id": "agents-templates-orchestrator-task",
    "title": "# Check for existing task plans",
    "url": "/.claude/agents/templates/orchestrator-task.md",
    "filePath": "/.claude/agents/templates/orchestrator-task.md",
    "type": "markdown",
    "category": "Agents/Templates",
    "tags": [
      "templates",
      "agent",
      "orchestrator",
      "task"
    ],
    "description": "memory_search \"task_plan\" | tail -1"
  },
  {
    "id": "agents-templates-performance-analyzer",
    "title": "# Collect baseline metrics",
    "url": "/.claude/agents/templates/performance-analyzer.md",
    "filePath": "/.claude/agents/templates/performance-analyzer.md",
    "type": "markdown",
    "category": "Agents/Templates",
    "tags": [
      "templates",
      "agent",
      "performance",
      "analyzer"
    ],
    "description": "echo \"📈 Collecting baseline performance metrics\""
  },
  {
    "id": "agents-templates-sparc-coordinator",
    "title": "# Check for existing SPARC phase data",
    "url": "/.claude/agents/templates/sparc-coordinator.md",
    "filePath": "/.claude/agents/templates/sparc-coordinator.md",
    "type": "markdown",
    "category": "Agents/Templates",
    "tags": [
      "templates",
      "agent",
      "sparc",
      "coordinator"
    ],
    "description": "memory_search \"sparc_phase\" | tail -1"
  },
  {
    "id": "agents-testing-unit-tdd-london-swarm",
    "title": "# Initialize swarm test coordination",
    "url": "/.claude/agents/testing/unit/tdd-london-swarm.md",
    "filePath": "/.claude/agents/testing/unit/tdd-london-swarm.md",
    "type": "markdown",
    "category": "Agents/Testing/Unit",
    "tags": [
      "testing",
      "unit",
      "agent",
      "tdd",
      "london",
      "swarm"
    ],
    "description": "if command -v npx >/dev/null 2>&1; then"
  },
  {
    "id": "agents-testing-validation-production-validator",
    "title": "# Verify no mock implementations remain",
    "url": "/.claude/agents/testing/validation/production-validator.md",
    "filePath": "/.claude/agents/testing/validation/production-validator.md",
    "type": "markdown",
    "category": "Agents/Testing/Validation",
    "tags": [
      "testing",
      "validation",
      "agent",
      "production",
      "validator"
    ],
    "description": "echo \"🚫 Scanning for mock/fake implementations...\""
  },
  {
    "id": "commands-agents-readme",
    "title": "Agents Commands",
    "url": "/.claude/commands/agents/README.md",
    "filePath": "/.claude/commands/agents/README.md",
    "type": "markdown",
    "category": "Commands/Agents",
    "tags": [
      "command",
      "README"
    ],
    "description": "Commands for agents operations in Claude Flow."
  },
  {
    "id": "commands-agents-agent-capabilities",
    "title": "agent-capabilities",
    "url": "/.claude/commands/agents/agent-capabilities.md",
    "filePath": "/.claude/commands/agents/agent-capabilities.md",
    "type": "markdown",
    "category": "Commands/Agents",
    "tags": [
      "command",
      "agent",
      "capabilities"
    ],
    "description": "Matrix of agent capabilities and their specializations."
  },
  {
    "id": "commands-agents-agent-coordination",
    "title": "agent-coordination",
    "url": "/.claude/commands/agents/agent-coordination.md",
    "filePath": "/.claude/commands/agents/agent-coordination.md",
    "type": "markdown",
    "category": "Commands/Agents",
    "tags": [
      "command",
      "agent",
      "coordination"
    ],
    "description": "Coordination patterns for multi-agent collaboration."
  },
  {
    "id": "commands-agents-agent-spawning",
    "title": "agent-spawning",
    "url": "/.claude/commands/agents/agent-spawning.md",
    "filePath": "/.claude/commands/agents/agent-spawning.md",
    "type": "markdown",
    "category": "Commands/Agents",
    "tags": [
      "command",
      "agent",
      "spawning"
    ],
    "description": "Guide to spawning agents with Claude Code's Task tool."
  },
  {
    "id": "commands-agents-agent-types",
    "title": "agent-types",
    "url": "/.claude/commands/agents/agent-types.md",
    "filePath": "/.claude/commands/agents/agent-types.md",
    "type": "markdown",
    "category": "Commands/Agents",
    "tags": [
      "command",
      "agent",
      "types"
    ],
    "description": "Complete guide to all 54 available agent types in Claude Flow."
  },
  {
    "id": "commands-analysis-command_compliance_report",
    "title": "Analysis Commands Compliance Report",
    "url": "/.claude/commands/analysis/COMMAND_COMPLIANCE_REPORT.md",
    "filePath": "/.claude/commands/analysis/COMMAND_COMPLIANCE_REPORT.md",
    "type": "markdown",
    "category": "Commands/Analysis",
    "tags": [
      "analysis",
      "command",
      "COMMAND_COMPLIANCE_REPORT"
    ],
    "description": "Reviewed all command files in `.claude/commands/analysis/` directory to ensure proper usage of:"
  },
  {
    "id": "commands-analysis-readme",
    "title": "Analysis Commands",
    "url": "/.claude/commands/analysis/README.md",
    "filePath": "/.claude/commands/analysis/README.md",
    "type": "markdown",
    "category": "Commands/Analysis",
    "tags": [
      "analysis",
      "command",
      "README"
    ],
    "description": "Commands for analysis operations in Claude Flow."
  },
  {
    "id": "commands-analysis-bottleneck-detect",
    "title": "bottleneck detect",
    "url": "/.claude/commands/analysis/bottleneck-detect.md",
    "filePath": "/.claude/commands/analysis/bottleneck-detect.md",
    "type": "markdown",
    "category": "Commands/Analysis",
    "tags": [
      "analysis",
      "command",
      "bottleneck",
      "detect"
    ],
    "description": "Analyze performance bottlenecks in swarm operations and suggest optimizations."
  },
  {
    "id": "commands-analysis-performance-bottlenecks",
    "title": "Performance Bottleneck Analysis",
    "url": "/.claude/commands/analysis/performance-bottlenecks.md",
    "filePath": "/.claude/commands/analysis/performance-bottlenecks.md",
    "type": "markdown",
    "category": "Commands/Analysis",
    "tags": [
      "analysis",
      "command",
      "performance",
      "bottlenecks"
    ],
    "description": "Identify and resolve performance bottlenecks in your development workflow."
  },
  {
    "id": "commands-analysis-performance-report",
    "title": "performance-report",
    "url": "/.claude/commands/analysis/performance-report.md",
    "filePath": "/.claude/commands/analysis/performance-report.md",
    "type": "markdown",
    "category": "Commands/Analysis",
    "tags": [
      "analysis",
      "command",
      "performance",
      "report"
    ],
    "description": "Generate comprehensive performance reports for swarm operations."
  },
  {
    "id": "commands-analysis-token-efficiency",
    "title": "Token Usage Optimization",
    "url": "/.claude/commands/analysis/token-efficiency.md",
    "filePath": "/.claude/commands/analysis/token-efficiency.md",
    "type": "markdown",
    "category": "Commands/Analysis",
    "tags": [
      "analysis",
      "command",
      "token",
      "efficiency"
    ],
    "description": "Reduce token consumption while maintaining quality through intelligent coordination."
  },
  {
    "id": "commands-analysis-token-usage",
    "title": "token-usage",
    "url": "/.claude/commands/analysis/token-usage.md",
    "filePath": "/.claude/commands/analysis/token-usage.md",
    "type": "markdown",
    "category": "Commands/Analysis",
    "tags": [
      "analysis",
      "command",
      "token",
      "usage"
    ],
    "description": "Analyze token usage patterns and optimize for efficiency."
  },
  {
    "id": "commands-automation-readme",
    "title": "Automation Commands",
    "url": "/.claude/commands/automation/README.md",
    "filePath": "/.claude/commands/automation/README.md",
    "type": "markdown",
    "category": "Commands/Automation",
    "tags": [
      "automation",
      "command",
      "README"
    ],
    "description": "Commands for automation operations in Claude Flow."
  },
  {
    "id": "commands-automation-auto-agent",
    "title": "auto agent",
    "url": "/.claude/commands/automation/auto-agent.md",
    "filePath": "/.claude/commands/automation/auto-agent.md",
    "type": "markdown",
    "category": "Commands/Automation",
    "tags": [
      "automation",
      "command",
      "auto",
      "agent"
    ],
    "description": "Automatically spawn and manage agents based on task requirements."
  },
  {
    "id": "commands-automation-self-healing",
    "title": "Self-Healing Workflows",
    "url": "/.claude/commands/automation/self-healing.md",
    "filePath": "/.claude/commands/automation/self-healing.md",
    "type": "markdown",
    "category": "Commands/Automation",
    "tags": [
      "automation",
      "command",
      "self",
      "healing"
    ],
    "description": "Automatically detect and recover from errors without interrupting your flow."
  },
  {
    "id": "commands-automation-session-memory",
    "title": "Cross-Session Memory",
    "url": "/.claude/commands/automation/session-memory.md",
    "filePath": "/.claude/commands/automation/session-memory.md",
    "type": "markdown",
    "category": "Commands/Automation",
    "tags": [
      "automation",
      "command",
      "session",
      "memory"
    ],
    "description": "Maintain context and learnings across Claude Code sessions for continuous improvement."
  },
  {
    "id": "commands-automation-smart-agents",
    "title": "Smart Agent Auto-Spawning",
    "url": "/.claude/commands/automation/smart-agents.md",
    "filePath": "/.claude/commands/automation/smart-agents.md",
    "type": "markdown",
    "category": "Commands/Automation",
    "tags": [
      "automation",
      "command",
      "smart",
      "agents"
    ],
    "description": "Automatically spawn the right agents at the right time without manual intervention."
  },
  {
    "id": "commands-automation-smart-spawn",
    "title": "smart-spawn",
    "url": "/.claude/commands/automation/smart-spawn.md",
    "filePath": "/.claude/commands/automation/smart-spawn.md",
    "type": "markdown",
    "category": "Commands/Automation",
    "tags": [
      "automation",
      "command",
      "smart",
      "spawn"
    ],
    "description": "Intelligently spawn agents based on workload analysis."
  },
  {
    "id": "commands-automation-workflow-select",
    "title": "workflow-select",
    "url": "/.claude/commands/automation/workflow-select.md",
    "filePath": "/.claude/commands/automation/workflow-select.md",
    "type": "markdown",
    "category": "Commands/Automation",
    "tags": [
      "automation",
      "command",
      "workflow",
      "select"
    ],
    "description": "Automatically select optimal workflow based on task type."
  },
  {
    "id": "commands-coordination-readme",
    "title": "Coordination Commands",
    "url": "/.claude/commands/coordination/README.md",
    "filePath": "/.claude/commands/coordination/README.md",
    "type": "markdown",
    "category": "Commands/Coordination",
    "tags": [
      "coordination",
      "command",
      "README"
    ],
    "description": "Commands for coordination operations in Claude Flow."
  },
  {
    "id": "commands-coordination-agent-spawn",
    "title": "agent-spawn",
    "url": "/.claude/commands/coordination/agent-spawn.md",
    "filePath": "/.claude/commands/coordination/agent-spawn.md",
    "type": "markdown",
    "category": "Commands/Coordination",
    "tags": [
      "coordination",
      "command",
      "agent",
      "spawn"
    ],
    "description": "Spawn a new agent in the current swarm."
  },
  {
    "id": "commands-coordination-init",
    "title": "Initialize Coordination Framework",
    "url": "/.claude/commands/coordination/init.md",
    "filePath": "/.claude/commands/coordination/init.md",
    "type": "markdown",
    "category": "Commands/Coordination",
    "tags": [
      "coordination",
      "command",
      "init"
    ],
    "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
  },
  {
    "id": "commands-coordination-orchestrate",
    "title": "Coordinate Task Execution",
    "url": "/.claude/commands/coordination/orchestrate.md",
    "filePath": "/.claude/commands/coordination/orchestrate.md",
    "type": "markdown",
    "category": "Commands/Coordination",
    "tags": [
      "coordination",
      "command",
      "orchestrate"
    ],
    "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
  },
  {
    "id": "commands-coordination-spawn",
    "title": "Create Cognitive Patterns",
    "url": "/.claude/commands/coordination/spawn.md",
    "filePath": "/.claude/commands/coordination/spawn.md",
    "type": "markdown",
    "category": "Commands/Coordination",
    "tags": [
      "coordination",
      "command",
      "spawn"
    ],
    "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
  },
  {
    "id": "commands-coordination-swarm-init",
    "title": "swarm init",
    "url": "/.claude/commands/coordination/swarm-init.md",
    "filePath": "/.claude/commands/coordination/swarm-init.md",
    "type": "markdown",
    "category": "Commands/Coordination",
    "tags": [
      "coordination",
      "command",
      "swarm",
      "init"
    ],
    "description": "Initialize a Claude Flow swarm with specified topology and configuration."
  },
  {
    "id": "commands-coordination-task-orchestrate",
    "title": "task-orchestrate",
    "url": "/.claude/commands/coordination/task-orchestrate.md",
    "filePath": "/.claude/commands/coordination/task-orchestrate.md",
    "type": "markdown",
    "category": "Commands/Coordination",
    "tags": [
      "coordination",
      "command",
      "task",
      "orchestrate"
    ],
    "description": "Orchestrate complex tasks across the swarm."
  },
  {
    "id": "commands-flow-nexus-app-store",
    "title": "Flow Nexus App Store",
    "url": "/.claude/commands/flow-nexus/app-store.md",
    "filePath": "/.claude/commands/flow-nexus/app-store.md",
    "type": "markdown",
    "category": "Commands/Flow-nexus",
    "tags": [
      "flow-nexus",
      "command",
      "app",
      "store"
    ],
    "description": "Browse templates, publish apps, and deploy solutions."
  },
  {
    "id": "commands-flow-nexus-challenges",
    "title": "Flow Nexus Challenges",
    "url": "/.claude/commands/flow-nexus/challenges.md",
    "filePath": "/.claude/commands/flow-nexus/challenges.md",
    "type": "markdown",
    "category": "Commands/Flow-nexus",
    "tags": [
      "flow-nexus",
      "command",
      "challenges"
    ],
    "description": "Complete coding challenges to earn rUv credits and climb the leaderboard."
  },
  {
    "id": "commands-flow-nexus-login-registration",
    "title": "Flow Nexus Authentication",
    "url": "/.claude/commands/flow-nexus/login-registration.md",
    "filePath": "/.claude/commands/flow-nexus/login-registration.md",
    "type": "markdown",
    "category": "Commands/Flow-nexus",
    "tags": [
      "flow-nexus",
      "command",
      "login",
      "registration"
    ],
    "description": "Quick commands for Flow Nexus login and registration."
  },
  {
    "id": "commands-flow-nexus-neural-network",
    "title": "Flow Nexus Neural Networks",
    "url": "/.claude/commands/flow-nexus/neural-network.md",
    "filePath": "/.claude/commands/flow-nexus/neural-network.md",
    "type": "markdown",
    "category": "Commands/Flow-nexus",
    "tags": [
      "flow-nexus",
      "command",
      "neural",
      "network"
    ],
    "description": "Train custom neural networks with distributed computing."
  },
  {
    "id": "commands-flow-nexus-payments",
    "title": "Flow Nexus Payments",
    "url": "/.claude/commands/flow-nexus/payments.md",
    "filePath": "/.claude/commands/flow-nexus/payments.md",
    "type": "markdown",
    "category": "Commands/Flow-nexus",
    "tags": [
      "flow-nexus",
      "command",
      "payments"
    ],
    "description": "Manage credits, configure billing, and track usage."
  },
  {
    "id": "commands-flow-nexus-sandbox",
    "title": "Flow Nexus Sandboxes",
    "url": "/.claude/commands/flow-nexus/sandbox.md",
    "filePath": "/.claude/commands/flow-nexus/sandbox.md",
    "type": "markdown",
    "category": "Commands/Flow-nexus",
    "tags": [
      "flow-nexus",
      "command",
      "sandbox"
    ],
    "description": "Deploy and manage isolated execution environments."
  },
  {
    "id": "commands-flow-nexus-swarm",
    "title": "Flow Nexus Swarms",
    "url": "/.claude/commands/flow-nexus/swarm.md",
    "filePath": "/.claude/commands/flow-nexus/swarm.md",
    "type": "markdown",
    "category": "Commands/Flow-nexus",
    "tags": [
      "flow-nexus",
      "command",
      "swarm"
    ],
    "description": "Deploy and manage AI agent swarms in the cloud."
  },
  {
    "id": "commands-flow-nexus-user-tools",
    "title": "Flow Nexus User Tools",
    "url": "/.claude/commands/flow-nexus/user-tools.md",
    "filePath": "/.claude/commands/flow-nexus/user-tools.md",
    "type": "markdown",
    "category": "Commands/Flow-nexus",
    "tags": [
      "flow-nexus",
      "command",
      "user",
      "tools"
    ],
    "description": "Utilities for user management, storage, and system operations."
  },
  {
    "id": "commands-flow-nexus-workflow",
    "title": "Flow Nexus Workflows",
    "url": "/.claude/commands/flow-nexus/workflow.md",
    "filePath": "/.claude/commands/flow-nexus/workflow.md",
    "type": "markdown",
    "category": "Commands/Flow-nexus",
    "tags": [
      "flow-nexus",
      "command",
      "workflow"
    ],
    "description": "Create and manage automated workflows with event-driven processing."
  },
  {
    "id": "commands-github-readme",
    "title": "Github Commands",
    "url": "/.claude/commands/github/README.md",
    "filePath": "/.claude/commands/github/README.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "README"
    ],
    "description": "Commands for github operations in Claude Flow."
  },
  {
    "id": "commands-github-code-review-swarm",
    "title": "Code Review Swarm - Automated Code Review with AI Agents",
    "url": "/.claude/commands/github/code-review-swarm.md",
    "filePath": "/.claude/commands/github/code-review-swarm.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "code",
      "review",
      "swarm"
    ],
    "description": "Deploy specialized AI agents to perform comprehensive, intelligent code reviews that go beyond traditional static analysis."
  },
  {
    "id": "commands-github-code-review",
    "title": "code-review",
    "url": "/.claude/commands/github/code-review.md",
    "filePath": "/.claude/commands/github/code-review.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "code",
      "review"
    ],
    "description": "Automated code review with swarm intelligence."
  },
  {
    "id": "commands-github-github-modes",
    "title": "GitHub Integration Modes",
    "url": "/.claude/commands/github/github-modes.md",
    "filePath": "/.claude/commands/github/github-modes.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "modes"
    ],
    "description": "This document describes all GitHub integration modes available in Claude-Flow with ruv-swarm coordination. Each mode is optimized for specific GitHub "
  },
  {
    "id": "commands-github-github-swarm",
    "title": "github swarm",
    "url": "/.claude/commands/github/github-swarm.md",
    "filePath": "/.claude/commands/github/github-swarm.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "swarm"
    ],
    "description": "Create a specialized swarm for GitHub repository management."
  },
  {
    "id": "commands-github-issue-tracker",
    "title": "GitHub Issue Tracker",
    "url": "/.claude/commands/github/issue-tracker.md",
    "filePath": "/.claude/commands/github/issue-tracker.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "issue",
      "tracker"
    ],
    "description": "Intelligent issue management and project coordination with ruv-swarm integration for automated tracking, progress monitoring, and team coordination."
  },
  {
    "id": "commands-github-issue-triage",
    "title": "issue-triage",
    "url": "/.claude/commands/github/issue-triage.md",
    "filePath": "/.claude/commands/github/issue-triage.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "issue",
      "triage"
    ],
    "description": "Intelligent issue classification and triage."
  },
  {
    "id": "commands-github-multi-repo-swarm",
    "title": "Multi-Repo Swarm - Cross-Repository Swarm Orchestration",
    "url": "/.claude/commands/github/multi-repo-swarm.md",
    "filePath": "/.claude/commands/github/multi-repo-swarm.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "multi",
      "repo",
      "swarm"
    ],
    "description": "Coordinate AI swarms across multiple repositories, enabling organization-wide automation and intelligent cross-project collaboration."
  },
  {
    "id": "commands-github-pr-enhance",
    "title": "pr-enhance",
    "url": "/.claude/commands/github/pr-enhance.md",
    "filePath": "/.claude/commands/github/pr-enhance.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "pr",
      "enhance"
    ],
    "description": "AI-powered pull request enhancements."
  },
  {
    "id": "commands-github-pr-manager",
    "title": "GitHub PR Manager",
    "url": "/.claude/commands/github/pr-manager.md",
    "filePath": "/.claude/commands/github/pr-manager.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "pr",
      "manager"
    ],
    "description": "Comprehensive pull request management with ruv-swarm coordination for automated reviews, testing, and merge workflows."
  },
  {
    "id": "commands-github-project-board-sync",
    "title": "Project Board Sync - GitHub Projects Integration",
    "url": "/.claude/commands/github/project-board-sync.md",
    "filePath": "/.claude/commands/github/project-board-sync.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "project",
      "board",
      "sync"
    ],
    "description": "Synchronize AI swarms with GitHub Projects for visual task management, progress tracking, and team coordination."
  },
  {
    "id": "commands-github-release-manager",
    "title": "GitHub Release Manager",
    "url": "/.claude/commands/github/release-manager.md",
    "filePath": "/.claude/commands/github/release-manager.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "release",
      "manager"
    ],
    "description": "Automated release coordination and deployment with ruv-swarm orchestration for seamless version management, testing, and deployment across multiple pa"
  },
  {
    "id": "commands-github-release-swarm",
    "title": "Release Swarm - Intelligent Release Automation",
    "url": "/.claude/commands/github/release-swarm.md",
    "filePath": "/.claude/commands/github/release-swarm.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "release",
      "swarm"
    ],
    "description": "Orchestrate complex software releases using AI swarms that handle everything from changelog generation to multi-platform deployment."
  },
  {
    "id": "commands-github-repo-analyze",
    "title": "repo-analyze",
    "url": "/.claude/commands/github/repo-analyze.md",
    "filePath": "/.claude/commands/github/repo-analyze.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "repo",
      "analyze"
    ],
    "description": "Deep analysis of GitHub repository with AI insights."
  },
  {
    "id": "commands-github-repo-architect",
    "title": "GitHub Repository Architect",
    "url": "/.claude/commands/github/repo-architect.md",
    "filePath": "/.claude/commands/github/repo-architect.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "repo",
      "architect"
    ],
    "description": "Repository structure optimization and multi-repo management with ruv-swarm coordination for scalable project architecture and development workflows."
  },
  {
    "id": "commands-github-swarm-issue",
    "title": "Swarm Issue - Issue-Based Swarm Coordination",
    "url": "/.claude/commands/github/swarm-issue.md",
    "filePath": "/.claude/commands/github/swarm-issue.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "swarm",
      "issue"
    ],
    "description": "Transform GitHub Issues into intelligent swarm tasks, enabling automatic task decomposition and agent coordination."
  },
  {
    "id": "commands-github-swarm-pr",
    "title": "Swarm PR - Managing Swarms through Pull Requests",
    "url": "/.claude/commands/github/swarm-pr.md",
    "filePath": "/.claude/commands/github/swarm-pr.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "swarm",
      "pr"
    ],
    "description": "Create and manage AI swarms directly from GitHub Pull Requests, enabling seamless integration with your development workflow."
  },
  {
    "id": "commands-github-sync-coordinator",
    "title": "GitHub Sync Coordinator",
    "url": "/.claude/commands/github/sync-coordinator.md",
    "filePath": "/.claude/commands/github/sync-coordinator.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "sync",
      "coordinator"
    ],
    "description": "Multi-package synchronization and version alignment with ruv-swarm coordination for seamless integration between claude-code-flow and ruv-swarm packag"
  },
  {
    "id": "commands-github-workflow-automation",
    "title": "Workflow Automation - GitHub Actions Integration",
    "url": "/.claude/commands/github/workflow-automation.md",
    "filePath": "/.claude/commands/github/workflow-automation.md",
    "type": "markdown",
    "category": "Commands/Github",
    "tags": [
      "github",
      "command",
      "workflow",
      "automation"
    ],
    "description": "Integrate AI swarms with GitHub Actions to create intelligent, self-organizing CI/CD pipelines that adapt to your codebase."
  },
  {
    "id": "commands-hive-mind-readme",
    "title": "Hive-mind Commands",
    "url": "/.claude/commands/hive-mind/README.md",
    "filePath": "/.claude/commands/hive-mind/README.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "README"
    ],
    "description": "Commands for hive-mind operations in Claude Flow."
  },
  {
    "id": "commands-hive-mind-hive-mind-consensus",
    "title": "hive-mind-consensus",
    "url": "/.claude/commands/hive-mind/hive-mind-consensus.md",
    "filePath": "/.claude/commands/hive-mind/hive-mind-consensus.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "hive",
      "mind",
      "consensus"
    ],
    "description": "Command documentation for hive-mind-consensus in category hive-mind."
  },
  {
    "id": "commands-hive-mind-hive-mind-init",
    "title": "hive-mind-init",
    "url": "/.claude/commands/hive-mind/hive-mind-init.md",
    "filePath": "/.claude/commands/hive-mind/hive-mind-init.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "hive",
      "mind",
      "init"
    ],
    "description": "Initialize the Hive Mind collective intelligence system."
  },
  {
    "id": "commands-hive-mind-hive-mind-memory",
    "title": "hive-mind-memory",
    "url": "/.claude/commands/hive-mind/hive-mind-memory.md",
    "filePath": "/.claude/commands/hive-mind/hive-mind-memory.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "hive",
      "mind",
      "memory"
    ],
    "description": "Command documentation for hive-mind-memory in category hive-mind."
  },
  {
    "id": "commands-hive-mind-hive-mind-metrics",
    "title": "hive-mind-metrics",
    "url": "/.claude/commands/hive-mind/hive-mind-metrics.md",
    "filePath": "/.claude/commands/hive-mind/hive-mind-metrics.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "hive",
      "mind",
      "metrics"
    ],
    "description": "Command documentation for hive-mind-metrics in category hive-mind."
  },
  {
    "id": "commands-hive-mind-hive-mind-resume",
    "title": "hive-mind-resume",
    "url": "/.claude/commands/hive-mind/hive-mind-resume.md",
    "filePath": "/.claude/commands/hive-mind/hive-mind-resume.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "hive",
      "mind",
      "resume"
    ],
    "description": "Command documentation for hive-mind-resume in category hive-mind."
  },
  {
    "id": "commands-hive-mind-hive-mind-sessions",
    "title": "hive-mind-sessions",
    "url": "/.claude/commands/hive-mind/hive-mind-sessions.md",
    "filePath": "/.claude/commands/hive-mind/hive-mind-sessions.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "hive",
      "mind",
      "sessions"
    ],
    "description": "Command documentation for hive-mind-sessions in category hive-mind."
  },
  {
    "id": "commands-hive-mind-hive-mind-spawn",
    "title": "hive-mind-spawn",
    "url": "/.claude/commands/hive-mind/hive-mind-spawn.md",
    "filePath": "/.claude/commands/hive-mind/hive-mind-spawn.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "hive",
      "mind",
      "spawn"
    ],
    "description": "Spawn a Hive Mind swarm with queen-led coordination."
  },
  {
    "id": "commands-hive-mind-hive-mind-status",
    "title": "hive-mind-status",
    "url": "/.claude/commands/hive-mind/hive-mind-status.md",
    "filePath": "/.claude/commands/hive-mind/hive-mind-status.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "hive",
      "mind",
      "status"
    ],
    "description": "Command documentation for hive-mind-status in category hive-mind."
  },
  {
    "id": "commands-hive-mind-hive-mind-stop",
    "title": "hive-mind-stop",
    "url": "/.claude/commands/hive-mind/hive-mind-stop.md",
    "filePath": "/.claude/commands/hive-mind/hive-mind-stop.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "hive",
      "mind",
      "stop"
    ],
    "description": "Command documentation for hive-mind-stop in category hive-mind."
  },
  {
    "id": "commands-hive-mind-hive-mind-wizard",
    "title": "hive-mind-wizard",
    "url": "/.claude/commands/hive-mind/hive-mind-wizard.md",
    "filePath": "/.claude/commands/hive-mind/hive-mind-wizard.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "hive",
      "mind",
      "wizard"
    ],
    "description": "Command documentation for hive-mind-wizard in category hive-mind."
  },
  {
    "id": "commands-hive-mind-hive-mind",
    "title": "hive-mind",
    "url": "/.claude/commands/hive-mind/hive-mind.md",
    "filePath": "/.claude/commands/hive-mind/hive-mind.md",
    "type": "markdown",
    "category": "Commands/Hive-mind",
    "tags": [
      "hive-mind",
      "command",
      "hive",
      "mind"
    ],
    "description": "Hive Mind collective intelligence system for advanced swarm coordination."
  },
  {
    "id": "commands-hooks-readme",
    "title": "Hooks Commands",
    "url": "/.claude/commands/hooks/README.md",
    "filePath": "/.claude/commands/hooks/README.md",
    "type": "markdown",
    "category": "Commands/Hooks",
    "tags": [
      "hooks",
      "command",
      "README"
    ],
    "description": "Commands for hooks operations in Claude Flow."
  },
  {
    "id": "commands-hooks-overview",
    "title": "Claude Code Hooks for claude-flow",
    "url": "/.claude/commands/hooks/overview.md",
    "filePath": "/.claude/commands/hooks/overview.md",
    "type": "markdown",
    "category": "Commands/Hooks",
    "tags": [
      "hooks",
      "command",
      "overview"
    ],
    "description": "Automatically coordinate, format, and learn from Claude Code operations using hooks with MCP tool integration."
  },
  {
    "id": "commands-hooks-post-edit",
    "title": "hook post-edit",
    "url": "/.claude/commands/hooks/post-edit.md",
    "filePath": "/.claude/commands/hooks/post-edit.md",
    "type": "markdown",
    "category": "Commands/Hooks",
    "tags": [
      "hooks",
      "command",
      "post",
      "edit"
    ],
    "description": "Execute post-edit processing including formatting, validation, and memory updates."
  },
  {
    "id": "commands-hooks-post-task",
    "title": "hook post-task",
    "url": "/.claude/commands/hooks/post-task.md",
    "filePath": "/.claude/commands/hooks/post-task.md",
    "type": "markdown",
    "category": "Commands/Hooks",
    "tags": [
      "hooks",
      "command",
      "post",
      "task"
    ],
    "description": "Execute post-task cleanup, performance analysis, and memory storage."
  },
  {
    "id": "commands-hooks-pre-edit",
    "title": "hook pre-edit",
    "url": "/.claude/commands/hooks/pre-edit.md",
    "filePath": "/.claude/commands/hooks/pre-edit.md",
    "type": "markdown",
    "category": "Commands/Hooks",
    "tags": [
      "hooks",
      "command",
      "pre",
      "edit"
    ],
    "description": "Execute pre-edit validations and agent assignment before file modifications."
  },
  {
    "id": "commands-hooks-pre-task",
    "title": "hook pre-task",
    "url": "/.claude/commands/hooks/pre-task.md",
    "filePath": "/.claude/commands/hooks/pre-task.md",
    "type": "markdown",
    "category": "Commands/Hooks",
    "tags": [
      "hooks",
      "command",
      "pre",
      "task"
    ],
    "description": "Execute pre-task preparations and context loading."
  },
  {
    "id": "commands-hooks-session-end",
    "title": "hook session-end",
    "url": "/.claude/commands/hooks/session-end.md",
    "filePath": "/.claude/commands/hooks/session-end.md",
    "type": "markdown",
    "category": "Commands/Hooks",
    "tags": [
      "hooks",
      "command",
      "session",
      "end"
    ],
    "description": "Cleanup and persist session state before ending work."
  },
  {
    "id": "commands-hooks-setup",
    "title": "Setting Up ruv-swarm Hooks",
    "url": "/.claude/commands/hooks/setup.md",
    "filePath": "/.claude/commands/hooks/setup.md",
    "type": "markdown",
    "category": "Commands/Hooks",
    "tags": [
      "hooks",
      "command",
      "setup"
    ],
    "description": "```bash"
  },
  {
    "id": "commands-memory-readme",
    "title": "Memory Commands",
    "url": "/.claude/commands/memory/README.md",
    "filePath": "/.claude/commands/memory/README.md",
    "type": "markdown",
    "category": "Commands/Memory",
    "tags": [
      "memory",
      "command",
      "README"
    ],
    "description": "Commands for memory operations in Claude Flow."
  },
  {
    "id": "commands-memory-memory-persist",
    "title": "memory-persist",
    "url": "/.claude/commands/memory/memory-persist.md",
    "filePath": "/.claude/commands/memory/memory-persist.md",
    "type": "markdown",
    "category": "Commands/Memory",
    "tags": [
      "memory",
      "command",
      "persist"
    ],
    "description": "Persist memory across sessions."
  },
  {
    "id": "commands-memory-memory-search",
    "title": "memory-search",
    "url": "/.claude/commands/memory/memory-search.md",
    "filePath": "/.claude/commands/memory/memory-search.md",
    "type": "markdown",
    "category": "Commands/Memory",
    "tags": [
      "memory",
      "command",
      "search"
    ],
    "description": "Search through stored memory."
  },
  {
    "id": "commands-memory-memory-usage",
    "title": "memory-usage",
    "url": "/.claude/commands/memory/memory-usage.md",
    "filePath": "/.claude/commands/memory/memory-usage.md",
    "type": "markdown",
    "category": "Commands/Memory",
    "tags": [
      "memory",
      "command",
      "usage"
    ],
    "description": "Manage persistent memory storage."
  },
  {
    "id": "commands-memory-neural",
    "title": "Neural Pattern Training",
    "url": "/.claude/commands/memory/neural.md",
    "filePath": "/.claude/commands/memory/neural.md",
    "type": "markdown",
    "category": "Commands/Memory",
    "tags": [
      "memory",
      "command",
      "neural"
    ],
    "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
  },
  {
    "id": "commands-memory-usage",
    "title": "Memory Management",
    "url": "/.claude/commands/memory/usage.md",
    "filePath": "/.claude/commands/memory/usage.md",
    "type": "markdown",
    "category": "Commands/Memory",
    "tags": [
      "memory",
      "command",
      "usage"
    ],
    "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
  },
  {
    "id": "commands-monitoring-readme",
    "title": "Monitoring Commands",
    "url": "/.claude/commands/monitoring/README.md",
    "filePath": "/.claude/commands/monitoring/README.md",
    "type": "markdown",
    "category": "Commands/Monitoring",
    "tags": [
      "monitoring",
      "command",
      "README"
    ],
    "description": "Commands for monitoring operations in Claude Flow."
  },
  {
    "id": "commands-monitoring-agent-metrics",
    "title": "agent-metrics",
    "url": "/.claude/commands/monitoring/agent-metrics.md",
    "filePath": "/.claude/commands/monitoring/agent-metrics.md",
    "type": "markdown",
    "category": "Commands/Monitoring",
    "tags": [
      "monitoring",
      "command",
      "agent",
      "metrics"
    ],
    "description": "View agent performance metrics."
  },
  {
    "id": "commands-monitoring-agents",
    "title": "List Active Patterns",
    "url": "/.claude/commands/monitoring/agents.md",
    "filePath": "/.claude/commands/monitoring/agents.md",
    "type": "markdown",
    "category": "Commands/Monitoring",
    "tags": [
      "monitoring",
      "command",
      "agents"
    ],
    "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
  },
  {
    "id": "commands-monitoring-real-time-view",
    "title": "real-time-view",
    "url": "/.claude/commands/monitoring/real-time-view.md",
    "filePath": "/.claude/commands/monitoring/real-time-view.md",
    "type": "markdown",
    "category": "Commands/Monitoring",
    "tags": [
      "monitoring",
      "command",
      "real",
      "time",
      "view"
    ],
    "description": "Real-time view of swarm activity."
  },
  {
    "id": "commands-monitoring-status",
    "title": "Check Coordination Status",
    "url": "/.claude/commands/monitoring/status.md",
    "filePath": "/.claude/commands/monitoring/status.md",
    "type": "markdown",
    "category": "Commands/Monitoring",
    "tags": [
      "monitoring",
      "command",
      "status"
    ],
    "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
  },
  {
    "id": "commands-monitoring-swarm-monitor",
    "title": "swarm-monitor",
    "url": "/.claude/commands/monitoring/swarm-monitor.md",
    "filePath": "/.claude/commands/monitoring/swarm-monitor.md",
    "type": "markdown",
    "category": "Commands/Monitoring",
    "tags": [
      "monitoring",
      "command",
      "swarm",
      "monitor"
    ],
    "description": "Real-time swarm monitoring."
  },
  {
    "id": "commands-optimization-readme",
    "title": "Optimization Commands",
    "url": "/.claude/commands/optimization/README.md",
    "filePath": "/.claude/commands/optimization/README.md",
    "type": "markdown",
    "category": "Commands/Optimization",
    "tags": [
      "optimization",
      "command",
      "README"
    ],
    "description": "Commands for optimization operations in Claude Flow."
  },
  {
    "id": "commands-optimization-auto-topology",
    "title": "Automatic Topology Selection",
    "url": "/.claude/commands/optimization/auto-topology.md",
    "filePath": "/.claude/commands/optimization/auto-topology.md",
    "type": "markdown",
    "category": "Commands/Optimization",
    "tags": [
      "optimization",
      "command",
      "auto",
      "topology"
    ],
    "description": "Automatically select the optimal swarm topology based on task complexity analysis."
  },
  {
    "id": "commands-optimization-cache-manage",
    "title": "cache-manage",
    "url": "/.claude/commands/optimization/cache-manage.md",
    "filePath": "/.claude/commands/optimization/cache-manage.md",
    "type": "markdown",
    "category": "Commands/Optimization",
    "tags": [
      "optimization",
      "command",
      "cache",
      "manage"
    ],
    "description": "Manage operation cache for performance."
  },
  {
    "id": "commands-optimization-parallel-execute",
    "title": "parallel-execute",
    "url": "/.claude/commands/optimization/parallel-execute.md",
    "filePath": "/.claude/commands/optimization/parallel-execute.md",
    "type": "markdown",
    "category": "Commands/Optimization",
    "tags": [
      "optimization",
      "command",
      "parallel",
      "execute"
    ],
    "description": "Execute tasks in parallel for maximum efficiency."
  },
  {
    "id": "commands-optimization-parallel-execution",
    "title": "Parallel Task Execution",
    "url": "/.claude/commands/optimization/parallel-execution.md",
    "filePath": "/.claude/commands/optimization/parallel-execution.md",
    "type": "markdown",
    "category": "Commands/Optimization",
    "tags": [
      "optimization",
      "command",
      "parallel",
      "execution"
    ],
    "description": "Execute independent subtasks in parallel for maximum efficiency."
  },
  {
    "id": "commands-optimization-topology-optimize",
    "title": "topology-optimize",
    "url": "/.claude/commands/optimization/topology-optimize.md",
    "filePath": "/.claude/commands/optimization/topology-optimize.md",
    "type": "markdown",
    "category": "Commands/Optimization",
    "tags": [
      "optimization",
      "command",
      "topology",
      "optimize"
    ],
    "description": "Optimize swarm topology for current workload."
  },
  {
    "id": "commands-pair-commands",
    "title": "Pair Programming Commands Reference",
    "url": "/.claude/commands/pair/commands.md",
    "filePath": "/.claude/commands/pair/commands.md",
    "type": "markdown",
    "category": "Commands/Pair",
    "tags": [
      "pair",
      "command",
      "commands"
    ],
    "description": "Complete reference for all pair programming session commands."
  },
  {
    "id": "commands-pair-config",
    "title": "Pair Programming Configuration",
    "url": "/.claude/commands/pair/config.md",
    "filePath": "/.claude/commands/pair/config.md",
    "type": "markdown",
    "category": "Commands/Pair",
    "tags": [
      "pair",
      "command",
      "config"
    ],
    "description": "Complete configuration guide for pair programming sessions."
  },
  {
    "id": "commands-pair-examples",
    "title": "Pair Programming Examples",
    "url": "/.claude/commands/pair/examples.md",
    "filePath": "/.claude/commands/pair/examples.md",
    "type": "markdown",
    "category": "Commands/Pair",
    "tags": [
      "pair",
      "command",
      "examples"
    ],
    "description": "Real-world examples and scenarios for pair programming sessions."
  },
  {
    "id": "commands-pair-modes",
    "title": "Pair Programming Modes",
    "url": "/.claude/commands/pair/modes.md",
    "filePath": "/.claude/commands/pair/modes.md",
    "type": "markdown",
    "category": "Commands/Pair",
    "tags": [
      "pair",
      "command",
      "modes"
    ],
    "description": "Detailed guide to pair programming modes and their optimal use cases."
  },
  {
    "id": "commands-pair-session",
    "title": "Pair Programming Session Management",
    "url": "/.claude/commands/pair/session.md",
    "filePath": "/.claude/commands/pair/session.md",
    "type": "markdown",
    "category": "Commands/Pair",
    "tags": [
      "pair",
      "command",
      "session"
    ],
    "description": "Complete guide to managing pair programming sessions."
  },
  {
    "id": "commands-pair-start",
    "title": "pair --start",
    "url": "/.claude/commands/pair/start.md",
    "filePath": "/.claude/commands/pair/start.md",
    "type": "markdown",
    "category": "Commands/Pair",
    "tags": [
      "pair",
      "command",
      "start"
    ],
    "description": "Start a new pair programming session with AI assistance."
  },
  {
    "id": "commands-sparc-analyzer",
    "title": "SPARC Analyzer Mode",
    "url": "/.claude/commands/sparc/analyzer.md",
    "filePath": "/.claude/commands/sparc/analyzer.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "analyzer"
    ],
    "description": "Deep code and data analysis with batch processing capabilities."
  },
  {
    "id": "commands-sparc-architect",
    "title": "SPARC Architect Mode",
    "url": "/.claude/commands/sparc/architect.md",
    "filePath": "/.claude/commands/sparc/architect.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "architect"
    ],
    "description": "System design with Memory-based coordination for scalable architectures."
  },
  {
    "id": "commands-sparc-batch-executor",
    "title": "SPARC Batch Executor Mode",
    "url": "/.claude/commands/sparc/batch-executor.md",
    "filePath": "/.claude/commands/sparc/batch-executor.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "batch",
      "executor"
    ],
    "description": "Parallel task execution specialist using batch operations."
  },
  {
    "id": "commands-sparc-coder",
    "title": "SPARC Coder Mode",
    "url": "/.claude/commands/sparc/coder.md",
    "filePath": "/.claude/commands/sparc/coder.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "coder"
    ],
    "description": "Autonomous code generation with batch file operations."
  },
  {
    "id": "commands-sparc-debugger",
    "title": "SPARC Debugger Mode",
    "url": "/.claude/commands/sparc/debugger.md",
    "filePath": "/.claude/commands/sparc/debugger.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "debugger"
    ],
    "description": "Systematic debugging with TodoWrite and Memory integration."
  },
  {
    "id": "commands-sparc-designer",
    "title": "SPARC Designer Mode",
    "url": "/.claude/commands/sparc/designer.md",
    "filePath": "/.claude/commands/sparc/designer.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "designer"
    ],
    "description": "UI/UX design with Memory coordination for consistent experiences."
  },
  {
    "id": "commands-sparc-documenter",
    "title": "SPARC Documenter Mode",
    "url": "/.claude/commands/sparc/documenter.md",
    "filePath": "/.claude/commands/sparc/documenter.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "documenter"
    ],
    "description": "Documentation with batch file operations for comprehensive docs."
  },
  {
    "id": "commands-sparc-innovator",
    "title": "SPARC Innovator Mode",
    "url": "/.claude/commands/sparc/innovator.md",
    "filePath": "/.claude/commands/sparc/innovator.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "innovator"
    ],
    "description": "Creative problem solving with WebSearch and Memory integration."
  },
  {
    "id": "commands-sparc-memory-manager",
    "title": "SPARC Memory Manager Mode",
    "url": "/.claude/commands/sparc/memory-manager.md",
    "filePath": "/.claude/commands/sparc/memory-manager.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "memory",
      "manager"
    ],
    "description": "Knowledge management with Memory tools for persistent insights."
  },
  {
    "id": "commands-sparc-optimizer",
    "title": "SPARC Optimizer Mode",
    "url": "/.claude/commands/sparc/optimizer.md",
    "filePath": "/.claude/commands/sparc/optimizer.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "optimizer"
    ],
    "description": "Performance optimization with systematic analysis and improvements."
  },
  {
    "id": "commands-sparc-orchestrator",
    "title": "SPARC Orchestrator Mode",
    "url": "/.claude/commands/sparc/orchestrator.md",
    "filePath": "/.claude/commands/sparc/orchestrator.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "orchestrator"
    ],
    "description": "Multi-agent task orchestration with TodoWrite/TodoRead/Task/Memory using MCP tools."
  },
  {
    "id": "commands-sparc-researcher",
    "title": "SPARC Researcher Mode",
    "url": "/.claude/commands/sparc/researcher.md",
    "filePath": "/.claude/commands/sparc/researcher.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "researcher"
    ],
    "description": "Deep research with parallel WebSearch/WebFetch and Memory coordination."
  },
  {
    "id": "commands-sparc-reviewer",
    "title": "SPARC Reviewer Mode",
    "url": "/.claude/commands/sparc/reviewer.md",
    "filePath": "/.claude/commands/sparc/reviewer.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "reviewer"
    ],
    "description": "Code review using batch file analysis for comprehensive reviews."
  },
  {
    "id": "commands-sparc-sparc-modes",
    "title": "SPARC Modes Overview",
    "url": "/.claude/commands/sparc/sparc-modes.md",
    "filePath": "/.claude/commands/sparc/sparc-modes.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "modes"
    ],
    "description": "SPARC (Specification, Planning, Architecture, Review, Code) is a comprehensive development methodology with 17 specialized modes, all integrated with "
  },
  {
    "id": "commands-sparc-swarm-coordinator",
    "title": "SPARC Swarm Coordinator Mode",
    "url": "/.claude/commands/sparc/swarm-coordinator.md",
    "filePath": "/.claude/commands/sparc/swarm-coordinator.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "swarm",
      "coordinator"
    ],
    "description": "Specialized swarm management with batch coordination capabilities."
  },
  {
    "id": "commands-sparc-tdd",
    "title": "SPARC TDD Mode",
    "url": "/.claude/commands/sparc/tdd.md",
    "filePath": "/.claude/commands/sparc/tdd.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "tdd"
    ],
    "description": "Test-driven development with TodoWrite planning and comprehensive testing."
  },
  {
    "id": "commands-sparc-tester",
    "title": "SPARC Tester Mode",
    "url": "/.claude/commands/sparc/tester.md",
    "filePath": "/.claude/commands/sparc/tester.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "tester"
    ],
    "description": "Comprehensive testing with parallel execution capabilities."
  },
  {
    "id": "commands-sparc-workflow-manager",
    "title": "SPARC Workflow Manager Mode",
    "url": "/.claude/commands/sparc/workflow-manager.md",
    "filePath": "/.claude/commands/sparc/workflow-manager.md",
    "type": "markdown",
    "category": "Commands/Sparc",
    "tags": [
      "sparc",
      "command",
      "workflow",
      "manager"
    ],
    "description": "Process automation with TodoWrite planning and Task execution."
  },
  {
    "id": "commands-stream-chain-pipeline",
    "title": "stream-chain pipeline",
    "url": "/.claude/commands/stream-chain/pipeline.md",
    "filePath": "/.claude/commands/stream-chain/pipeline.md",
    "type": "markdown",
    "category": "Commands/Stream-chain",
    "tags": [
      "stream-chain",
      "command",
      "pipeline"
    ],
    "description": "Execute predefined pipelines for common development workflows."
  },
  {
    "id": "commands-stream-chain-run",
    "title": "stream-chain run",
    "url": "/.claude/commands/stream-chain/run.md",
    "filePath": "/.claude/commands/stream-chain/run.md",
    "type": "markdown",
    "category": "Commands/Stream-chain",
    "tags": [
      "stream-chain",
      "command",
      "run"
    ],
    "description": "Execute a custom stream chain with your own prompts."
  },
  {
    "id": "commands-swarm-readme",
    "title": "Swarm Commands",
    "url": "/.claude/commands/swarm/README.md",
    "filePath": "/.claude/commands/swarm/README.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "README"
    ],
    "description": "Commands for swarm operations in Claude Flow."
  },
  {
    "id": "commands-swarm-analysis",
    "title": "Analysis Swarm Strategy",
    "url": "/.claude/commands/swarm/analysis.md",
    "filePath": "/.claude/commands/swarm/analysis.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "analysis"
    ],
    "description": "Comprehensive analysis through distributed agent coordination."
  },
  {
    "id": "commands-swarm-development",
    "title": "Development Swarm Strategy",
    "url": "/.claude/commands/swarm/development.md",
    "filePath": "/.claude/commands/swarm/development.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "development"
    ],
    "description": "Coordinated development through specialized agent teams."
  },
  {
    "id": "commands-swarm-examples",
    "title": "Examples Swarm Strategy",
    "url": "/.claude/commands/swarm/examples.md",
    "filePath": "/.claude/commands/swarm/examples.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "examples"
    ],
    "description": "```javascript"
  },
  {
    "id": "commands-swarm-maintenance",
    "title": "Maintenance Swarm Strategy",
    "url": "/.claude/commands/swarm/maintenance.md",
    "filePath": "/.claude/commands/swarm/maintenance.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "maintenance"
    ],
    "description": "System maintenance and updates through coordinated agents."
  },
  {
    "id": "commands-swarm-optimization",
    "title": "Optimization Swarm Strategy",
    "url": "/.claude/commands/swarm/optimization.md",
    "filePath": "/.claude/commands/swarm/optimization.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "optimization"
    ],
    "description": "Performance optimization through specialized analysis."
  },
  {
    "id": "commands-swarm-research",
    "title": "Research Swarm Strategy",
    "url": "/.claude/commands/swarm/research.md",
    "filePath": "/.claude/commands/swarm/research.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "research"
    ],
    "description": "Deep research through parallel information gathering."
  },
  {
    "id": "commands-swarm-swarm-analysis",
    "title": "swarm-analysis",
    "url": "/.claude/commands/swarm/swarm-analysis.md",
    "filePath": "/.claude/commands/swarm/swarm-analysis.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "analysis"
    ],
    "description": "Command documentation for swarm-analysis in category swarm."
  },
  {
    "id": "commands-swarm-swarm-background",
    "title": "swarm-background",
    "url": "/.claude/commands/swarm/swarm-background.md",
    "filePath": "/.claude/commands/swarm/swarm-background.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "background"
    ],
    "description": "Command documentation for swarm-background in category swarm."
  },
  {
    "id": "commands-swarm-swarm-init",
    "title": "swarm-init",
    "url": "/.claude/commands/swarm/swarm-init.md",
    "filePath": "/.claude/commands/swarm/swarm-init.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "init"
    ],
    "description": "Initialize a new swarm with specified topology."
  },
  {
    "id": "commands-swarm-swarm-modes",
    "title": "swarm-modes",
    "url": "/.claude/commands/swarm/swarm-modes.md",
    "filePath": "/.claude/commands/swarm/swarm-modes.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "modes"
    ],
    "description": "Command documentation for swarm-modes in category swarm."
  },
  {
    "id": "commands-swarm-swarm-monitor",
    "title": "swarm-monitor",
    "url": "/.claude/commands/swarm/swarm-monitor.md",
    "filePath": "/.claude/commands/swarm/swarm-monitor.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "monitor"
    ],
    "description": "Command documentation for swarm-monitor in category swarm."
  },
  {
    "id": "commands-swarm-swarm-spawn",
    "title": "swarm-spawn",
    "url": "/.claude/commands/swarm/swarm-spawn.md",
    "filePath": "/.claude/commands/swarm/swarm-spawn.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "spawn"
    ],
    "description": "Spawn agents in the swarm."
  },
  {
    "id": "commands-swarm-swarm-status",
    "title": "swarm-status",
    "url": "/.claude/commands/swarm/swarm-status.md",
    "filePath": "/.claude/commands/swarm/swarm-status.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "status"
    ],
    "description": "Command documentation for swarm-status in category swarm."
  },
  {
    "id": "commands-swarm-swarm-strategies",
    "title": "swarm-strategies",
    "url": "/.claude/commands/swarm/swarm-strategies.md",
    "filePath": "/.claude/commands/swarm/swarm-strategies.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "strategies"
    ],
    "description": "Command documentation for swarm-strategies in category swarm."
  },
  {
    "id": "commands-swarm-swarm",
    "title": "swarm",
    "url": "/.claude/commands/swarm/swarm.md",
    "filePath": "/.claude/commands/swarm/swarm.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command"
    ],
    "description": "Main swarm orchestration command for Claude Flow."
  },
  {
    "id": "commands-swarm-testing",
    "title": "Testing Swarm Strategy",
    "url": "/.claude/commands/swarm/testing.md",
    "filePath": "/.claude/commands/swarm/testing.md",
    "type": "markdown",
    "category": "Commands/Swarm",
    "tags": [
      "swarm",
      "command",
      "testing"
    ],
    "description": "Comprehensive testing through distributed execution."
  },
  {
    "id": "commands-training-readme",
    "title": "Training Commands",
    "url": "/.claude/commands/training/README.md",
    "filePath": "/.claude/commands/training/README.md",
    "type": "markdown",
    "category": "Commands/Training",
    "tags": [
      "training",
      "command",
      "README"
    ],
    "description": "Commands for training operations in Claude Flow."
  },
  {
    "id": "commands-training-model-update",
    "title": "model-update",
    "url": "/.claude/commands/training/model-update.md",
    "filePath": "/.claude/commands/training/model-update.md",
    "type": "markdown",
    "category": "Commands/Training",
    "tags": [
      "training",
      "command",
      "model",
      "update"
    ],
    "description": "Update neural models with new data."
  },
  {
    "id": "commands-training-neural-patterns",
    "title": "Neural Pattern Training",
    "url": "/.claude/commands/training/neural-patterns.md",
    "filePath": "/.claude/commands/training/neural-patterns.md",
    "type": "markdown",
    "category": "Commands/Training",
    "tags": [
      "training",
      "command",
      "neural",
      "patterns"
    ],
    "description": "Continuously improve coordination through neural network learning."
  },
  {
    "id": "commands-training-neural-train",
    "title": "neural-train",
    "url": "/.claude/commands/training/neural-train.md",
    "filePath": "/.claude/commands/training/neural-train.md",
    "type": "markdown",
    "category": "Commands/Training",
    "tags": [
      "training",
      "command",
      "neural",
      "train"
    ],
    "description": "Train neural patterns from operations."
  },
  {
    "id": "commands-training-pattern-learn",
    "title": "pattern-learn",
    "url": "/.claude/commands/training/pattern-learn.md",
    "filePath": "/.claude/commands/training/pattern-learn.md",
    "type": "markdown",
    "category": "Commands/Training",
    "tags": [
      "training",
      "command",
      "pattern",
      "learn"
    ],
    "description": "Learn patterns from successful operations."
  },
  {
    "id": "commands-training-specialization",
    "title": "Agent Specialization Training",
    "url": "/.claude/commands/training/specialization.md",
    "filePath": "/.claude/commands/training/specialization.md",
    "type": "markdown",
    "category": "Commands/Training",
    "tags": [
      "training",
      "command",
      "specialization"
    ],
    "description": "Train agents to become experts in specific domains for better performance."
  },
  {
    "id": "commands-truth-start",
    "title": "📊 Truth Command",
    "url": "/.claude/commands/truth/start.md",
    "filePath": "/.claude/commands/truth/start.md",
    "type": "markdown",
    "category": "Commands/Truth",
    "tags": [
      "truth",
      "command",
      "start"
    ],
    "description": "View truth scores and reliability metrics for your codebase and agent tasks."
  },
  {
    "id": "commands-verify-check",
    "title": "verify check",
    "url": "/.claude/commands/verify/check.md",
    "filePath": "/.claude/commands/verify/check.md",
    "type": "markdown",
    "category": "Commands/Verify",
    "tags": [
      "verify",
      "command",
      "check"
    ],
    "description": "Run verification checks on code, tasks, or agent outputs."
  },
  {
    "id": "commands-verify-start",
    "title": "🔍 Verification Commands",
    "url": "/.claude/commands/verify/start.md",
    "filePath": "/.claude/commands/verify/start.md",
    "type": "markdown",
    "category": "Commands/Verify",
    "tags": [
      "verify",
      "command",
      "start"
    ],
    "description": "Truth verification system for ensuring code quality and correctness with a 0.95 accuracy threshold."
  },
  {
    "id": "commands-workflows-readme",
    "title": "Workflows Commands",
    "url": "/.claude/commands/workflows/README.md",
    "filePath": "/.claude/commands/workflows/README.md",
    "type": "markdown",
    "category": "Commands/Workflows",
    "tags": [
      "workflows",
      "command",
      "README"
    ],
    "description": "Commands for workflows operations in Claude Flow."
  },
  {
    "id": "commands-workflows-development",
    "title": "Development Workflow Coordination",
    "url": "/.claude/commands/workflows/development.md",
    "filePath": "/.claude/commands/workflows/development.md",
    "type": "markdown",
    "category": "Commands/Workflows",
    "tags": [
      "workflows",
      "command",
      "development"
    ],
    "description": "Structure Claude Code's approach to complex development tasks for maximum efficiency."
  },
  {
    "id": "commands-workflows-research",
    "title": "Research Workflow Coordination",
    "url": "/.claude/commands/workflows/research.md",
    "filePath": "/.claude/commands/workflows/research.md",
    "type": "markdown",
    "category": "Commands/Workflows",
    "tags": [
      "workflows",
      "command",
      "research"
    ],
    "description": "Coordinate Claude Code's research activities for comprehensive, systematic exploration."
  },
  {
    "id": "commands-workflows-workflow-create",
    "title": "workflow-create",
    "url": "/.claude/commands/workflows/workflow-create.md",
    "filePath": "/.claude/commands/workflows/workflow-create.md",
    "type": "markdown",
    "category": "Commands/Workflows",
    "tags": [
      "workflows",
      "command",
      "workflow",
      "create"
    ],
    "description": "Create reusable workflow templates."
  },
  {
    "id": "commands-workflows-workflow-execute",
    "title": "workflow-execute",
    "url": "/.claude/commands/workflows/workflow-execute.md",
    "filePath": "/.claude/commands/workflows/workflow-execute.md",
    "type": "markdown",
    "category": "Commands/Workflows",
    "tags": [
      "workflows",
      "command",
      "workflow",
      "execute"
    ],
    "description": "Execute saved workflows."
  },
  {
    "id": "commands-workflows-workflow-export",
    "title": "workflow-export",
    "url": "/.claude/commands/workflows/workflow-export.md",
    "filePath": "/.claude/commands/workflows/workflow-export.md",
    "type": "markdown",
    "category": "Commands/Workflows",
    "tags": [
      "workflows",
      "command",
      "workflow",
      "export"
    ],
    "description": "Export workflows for sharing."
  }
];

export const DOCUMENT_COUNT = 224;

export const CATEGORIES = [
  "Agents",
  "Agents/Analysis",
  "Agents/Analysis/Code-review",
  "Agents/Architecture/System-design",
  "Agents/Consensus",
  "Agents/Core",
  "Agents/Data/Ml",
  "Agents/Development/Backend",
  "Agents/Devops/Ci-cd",
  "Agents/Documentation/Api-docs",
  "Agents/Flow-nexus",
  "Agents/Github",
  "Agents/Goal",
  "Agents/Hive-mind",
  "Agents/Neural",
  "Agents/Optimization",
  "Agents/Sparc",
  "Agents/Specialized/Mobile",
  "Agents/Swarm",
  "Agents/Templates",
  "Agents/Testing/Unit",
  "Agents/Testing/Validation",
  "Commands/Agents",
  "Commands/Analysis",
  "Commands/Automation",
  "Commands/Coordination",
  "Commands/Flow-nexus",
  "Commands/Github",
  "Commands/Hive-mind",
  "Commands/Hooks",
  "Commands/Memory",
  "Commands/Monitoring",
  "Commands/Optimization",
  "Commands/Pair",
  "Commands/Sparc",
  "Commands/Stream-chain",
  "Commands/Swarm",
  "Commands/Training",
  "Commands/Truth",
  "Commands/Verify",
  "Commands/Workflows"
];

export const DOCUMENTS_BY_CATEGORY = new Map<string, Document[]>(
  [
  [
    "Agents/Analysis",
    [
      {
        "id": "agents-analysis-code-analyzer",
        "title": "Code Analyzer Agent",
        "url": "/.claude/agents/analysis/code-analyzer.md",
        "filePath": "/.claude/agents/analysis/code-analyzer.md",
        "type": "markdown",
        "category": "Agents/Analysis",
        "tags": [
          "analysis",
          "agent",
          "code",
          "analyzer"
        ],
        "description": "An advanced code quality analysis specialist that performs comprehensive code reviews, identifies improvements, and ensures best practices are followe"
      }
    ]
  ],
  [
    "Agents/Analysis/Code-review",
    [
      {
        "id": "agents-analysis-code-review-analyze-code-quality",
        "title": "# Count files to analyze",
        "url": "/.claude/agents/analysis/code-review/analyze-code-quality.md",
        "filePath": "/.claude/agents/analysis/code-review/analyze-code-quality.md",
        "type": "markdown",
        "category": "Agents/Analysis/Code-review",
        "tags": [
          "analysis",
          "code-review",
          "agent",
          "analyze",
          "code",
          "quality"
        ],
        "description": "find . -name \"*.js\" -o -name \"*.ts\" -o -name \"*.py\" | grep -v node_modules | wc -l | xargs echo \"Files to analyze:\""
      }
    ]
  ],
  [
    "Agents/Architecture/System-design",
    [
      {
        "id": "agents-architecture-system-design-arch-system-design",
        "title": "System Architecture Designer",
        "url": "/.claude/agents/architecture/system-design/arch-system-design.md",
        "filePath": "/.claude/agents/architecture/system-design/arch-system-design.md",
        "type": "markdown",
        "category": "Agents/Architecture/System-design",
        "tags": [
          "architecture",
          "system-design",
          "agent",
          "arch",
          "system",
          "design"
        ],
        "description": "You are a System Architecture Designer responsible for high-level technical decisions and system design."
      }
    ]
  ],
  [
    "Agents",
    [
      {
        "id": "agents-base-template-generator",
        "title": "Base Template Generator",
        "url": "/.claude/agents/base-template-generator.md",
        "filePath": "/.claude/agents/base-template-generator.md",
        "type": "markdown",
        "category": "Agents",
        "tags": [
          "agent",
          "base",
          "template",
          "generator"
        ],
        "description": "Claude Flow documentation"
      }
    ]
  ],
  [
    "Agents/Consensus",
    [
      {
        "id": "agents-consensus-byzantine-coordinator",
        "title": "# Verify network integrity before consensus",
        "url": "/.claude/agents/consensus/byzantine-coordinator.md",
        "filePath": "/.claude/agents/consensus/byzantine-coordinator.md",
        "type": "markdown",
        "category": "Agents/Consensus",
        "tags": [
          "consensus",
          "agent",
          "byzantine",
          "coordinator"
        ],
        "description": "if [[ \"$TASK\" == *\"consensus\"* ]]; then"
      },
      {
        "id": "agents-consensus-crdt-synchronizer",
        "title": "# Initialize CRDT state tracking",
        "url": "/.claude/agents/consensus/crdt-synchronizer.md",
        "filePath": "/.claude/agents/consensus/crdt-synchronizer.md",
        "type": "markdown",
        "category": "Agents/Consensus",
        "tags": [
          "consensus",
          "agent",
          "crdt",
          "synchronizer"
        ],
        "description": "if [[ \"$TASK\" == *\"synchronization\"* ]]; then"
      },
      {
        "id": "agents-consensus-gossip-coordinator",
        "title": "# Initialize peer connections",
        "url": "/.claude/agents/consensus/gossip-coordinator.md",
        "filePath": "/.claude/agents/consensus/gossip-coordinator.md",
        "type": "markdown",
        "category": "Agents/Consensus",
        "tags": [
          "consensus",
          "agent",
          "gossip",
          "coordinator"
        ],
        "description": "if [[ \"$TASK\" == *\"dissemination\"* ]]; then"
      },
      {
        "id": "agents-consensus-performance-benchmarker",
        "title": "# Initialize monitoring systems",
        "url": "/.claude/agents/consensus/performance-benchmarker.md",
        "filePath": "/.claude/agents/consensus/performance-benchmarker.md",
        "type": "markdown",
        "category": "Agents/Consensus",
        "tags": [
          "consensus",
          "agent",
          "performance",
          "benchmarker"
        ],
        "description": "if [[ \"$TASK\" == *\"benchmark\"* ]]; then"
      },
      {
        "id": "agents-consensus-quorum-manager",
        "title": "# Assess current network conditions",
        "url": "/.claude/agents/consensus/quorum-manager.md",
        "filePath": "/.claude/agents/consensus/quorum-manager.md",
        "type": "markdown",
        "category": "Agents/Consensus",
        "tags": [
          "consensus",
          "agent",
          "quorum",
          "manager"
        ],
        "description": "if [[ \"$TASK\" == *\"quorum\"* ]]; then"
      },
      {
        "id": "agents-consensus-raft-manager",
        "title": "# Check cluster health before operations",
        "url": "/.claude/agents/consensus/raft-manager.md",
        "filePath": "/.claude/agents/consensus/raft-manager.md",
        "type": "markdown",
        "category": "Agents/Consensus",
        "tags": [
          "consensus",
          "agent",
          "raft",
          "manager"
        ],
        "description": "if [[ \"$TASK\" == *\"election\"* ]]; then"
      },
      {
        "id": "agents-consensus-security-manager",
        "title": "# Initialize security protocols",
        "url": "/.claude/agents/consensus/security-manager.md",
        "filePath": "/.claude/agents/consensus/security-manager.md",
        "type": "markdown",
        "category": "Agents/Consensus",
        "tags": [
          "consensus",
          "agent",
          "security",
          "manager"
        ],
        "description": "if [[ \"$TASK\" == *\"consensus\"* ]]; then"
      }
    ]
  ],
  [
    "Agents/Core",
    [
      {
        "id": "agents-core-coder",
        "title": "# Check for existing tests",
        "url": "/.claude/agents/core/coder.md",
        "filePath": "/.claude/agents/core/coder.md",
        "type": "markdown",
        "category": "Agents/Core",
        "tags": [
          "core",
          "agent",
          "coder"
        ],
        "description": "if grep -q \"test\\|spec\" <<< \"$TASK\"; then"
      },
      {
        "id": "agents-core-planner",
        "title": "Strategic Planning Agent",
        "url": "/.claude/agents/core/planner.md",
        "filePath": "/.claude/agents/core/planner.md",
        "type": "markdown",
        "category": "Agents/Core",
        "tags": [
          "core",
          "agent",
          "planner"
        ],
        "description": "You are a strategic planning specialist responsible for breaking down complex tasks into manageable components and creating actionable execution plans"
      },
      {
        "id": "agents-core-researcher",
        "title": "Research and Analysis Agent",
        "url": "/.claude/agents/core/researcher.md",
        "filePath": "/.claude/agents/core/researcher.md",
        "type": "markdown",
        "category": "Agents/Core",
        "tags": [
          "core",
          "agent",
          "researcher"
        ],
        "description": "You are a research specialist focused on thorough investigation, pattern analysis, and knowledge synthesis for software development tasks."
      },
      {
        "id": "agents-core-reviewer",
        "title": "# Create review checklist",
        "url": "/.claude/agents/core/reviewer.md",
        "filePath": "/.claude/agents/core/reviewer.md",
        "type": "markdown",
        "category": "Agents/Core",
        "tags": [
          "core",
          "agent",
          "reviewer"
        ],
        "description": "memory_store \"review_checklist_$(date +%s)\" \"functionality,security,performance,maintainability,documentation\""
      },
      {
        "id": "agents-core-tester",
        "title": "# Check test environment",
        "url": "/.claude/agents/core/tester.md",
        "filePath": "/.claude/agents/core/tester.md",
        "type": "markdown",
        "category": "Agents/Core",
        "tags": [
          "core",
          "agent",
          "tester"
        ],
        "description": "if [ -f \"jest.config.js\" ] || [ -f \"vitest.config.ts\" ]; then"
      }
    ]
  ],
  [
    "Agents/Data/Ml",
    [
      {
        "id": "agents-data-ml-data-ml-model",
        "title": "Machine Learning Model Developer",
        "url": "/.claude/agents/data/ml/data-ml-model.md",
        "filePath": "/.claude/agents/data/ml/data-ml-model.md",
        "type": "markdown",
        "category": "Agents/Data/Ml",
        "tags": [
          "data",
          "ml",
          "agent",
          "model"
        ],
        "description": "You are a Machine Learning Model Developer specializing in end-to-end ML workflows."
      }
    ]
  ],
  [
    "Agents/Development/Backend",
    [
      {
        "id": "agents-development-backend-dev-backend-api",
        "title": "Backend API Developer",
        "url": "/.claude/agents/development/backend/dev-backend-api.md",
        "filePath": "/.claude/agents/development/backend/dev-backend-api.md",
        "type": "markdown",
        "category": "Agents/Development/Backend",
        "tags": [
          "development",
          "backend",
          "agent",
          "dev",
          "api"
        ],
        "description": "You are a specialized Backend API Developer agent focused on creating robust, scalable APIs."
      }
    ]
  ],
  [
    "Agents/Devops/Ci-cd",
    [
      {
        "id": "agents-devops-ci-cd-ops-cicd-github",
        "title": "# Simple YAML validation",
        "url": "/.claude/agents/devops/ci-cd/ops-cicd-github.md",
        "filePath": "/.claude/agents/devops/ci-cd/ops-cicd-github.md",
        "type": "markdown",
        "category": "Agents/Devops/Ci-cd",
        "tags": [
          "devops",
          "ci-cd",
          "agent",
          "ops",
          "cicd",
          "github"
        ],
        "description": "find .github/workflows -name \"*.yml\" -o -name \"*.yaml\" | xargs -I {} sh -c 'echo \"Checking {}\" && cat {} | head -1'"
      }
    ]
  ],
  [
    "Agents/Documentation/Api-docs",
    [
      {
        "id": "agents-documentation-api-docs-docs-api-openapi",
        "title": "# Look for existing API routes",
        "url": "/.claude/agents/documentation/api-docs/docs-api-openapi.md",
        "filePath": "/.claude/agents/documentation/api-docs/docs-api-openapi.md",
        "type": "markdown",
        "category": "Agents/Documentation/Api-docs",
        "tags": [
          "documentation",
          "api-docs",
          "agent",
          "docs",
          "api",
          "openapi"
        ],
        "description": "find . -name \"*.route.js\" -o -name \"*.controller.js\" -o -name \"routes.js\" | grep -v node_modules | head -10"
      }
    ]
  ],
  [
    "Agents/Flow-nexus",
    [
      {
        "id": "agents-flow-nexus-app-store",
        "title": "App Store",
        "url": "/.claude/agents/flow-nexus/app-store.md",
        "filePath": "/.claude/agents/flow-nexus/app-store.md",
        "type": "markdown",
        "category": "Agents/Flow-nexus",
        "tags": [
          "flow-nexus",
          "agent",
          "app",
          "store"
        ],
        "description": "Claude Flow documentation"
      },
      {
        "id": "agents-flow-nexus-authentication",
        "title": "Authentication",
        "url": "/.claude/agents/flow-nexus/authentication.md",
        "filePath": "/.claude/agents/flow-nexus/authentication.md",
        "type": "markdown",
        "category": "Agents/Flow-nexus",
        "tags": [
          "flow-nexus",
          "agent",
          "authentication"
        ],
        "description": "Claude Flow documentation"
      },
      {
        "id": "agents-flow-nexus-challenges",
        "title": "Challenges",
        "url": "/.claude/agents/flow-nexus/challenges.md",
        "filePath": "/.claude/agents/flow-nexus/challenges.md",
        "type": "markdown",
        "category": "Agents/Flow-nexus",
        "tags": [
          "flow-nexus",
          "agent",
          "challenges"
        ],
        "description": "Claude Flow documentation"
      },
      {
        "id": "agents-flow-nexus-neural-network",
        "title": "Neural Network",
        "url": "/.claude/agents/flow-nexus/neural-network.md",
        "filePath": "/.claude/agents/flow-nexus/neural-network.md",
        "type": "markdown",
        "category": "Agents/Flow-nexus",
        "tags": [
          "flow-nexus",
          "agent",
          "neural",
          "network"
        ],
        "description": "Claude Flow documentation"
      },
      {
        "id": "agents-flow-nexus-payments",
        "title": "Payments",
        "url": "/.claude/agents/flow-nexus/payments.md",
        "filePath": "/.claude/agents/flow-nexus/payments.md",
        "type": "markdown",
        "category": "Agents/Flow-nexus",
        "tags": [
          "flow-nexus",
          "agent",
          "payments"
        ],
        "description": "Claude Flow documentation"
      },
      {
        "id": "agents-flow-nexus-sandbox",
        "title": "Sandbox",
        "url": "/.claude/agents/flow-nexus/sandbox.md",
        "filePath": "/.claude/agents/flow-nexus/sandbox.md",
        "type": "markdown",
        "category": "Agents/Flow-nexus",
        "tags": [
          "flow-nexus",
          "agent",
          "sandbox"
        ],
        "description": "Claude Flow documentation"
      },
      {
        "id": "agents-flow-nexus-swarm",
        "title": "Swarm",
        "url": "/.claude/agents/flow-nexus/swarm.md",
        "filePath": "/.claude/agents/flow-nexus/swarm.md",
        "type": "markdown",
        "category": "Agents/Flow-nexus",
        "tags": [
          "flow-nexus",
          "agent",
          "swarm"
        ],
        "description": "Claude Flow documentation"
      },
      {
        "id": "agents-flow-nexus-user-tools",
        "title": "User Tools",
        "url": "/.claude/agents/flow-nexus/user-tools.md",
        "filePath": "/.claude/agents/flow-nexus/user-tools.md",
        "type": "markdown",
        "category": "Agents/Flow-nexus",
        "tags": [
          "flow-nexus",
          "agent",
          "user",
          "tools"
        ],
        "description": "Claude Flow documentation"
      },
      {
        "id": "agents-flow-nexus-workflow",
        "title": "Workflow",
        "url": "/.claude/agents/flow-nexus/workflow.md",
        "filePath": "/.claude/agents/flow-nexus/workflow.md",
        "type": "markdown",
        "category": "Agents/Flow-nexus",
        "tags": [
          "flow-nexus",
          "agent",
          "workflow"
        ],
        "description": "Claude Flow documentation"
      }
    ]
  ],
  [
    "Agents/Github",
    [
      {
        "id": "agents-github-code-review-swarm",
        "title": "Code Review Swarm - Automated Code Review with AI Agents",
        "url": "/.claude/agents/github/code-review-swarm.md",
        "filePath": "/.claude/agents/github/code-review-swarm.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "code",
          "review",
          "swarm"
        ],
        "description": "Deploy specialized AI agents to perform comprehensive, intelligent code reviews that go beyond traditional static analysis."
      },
      {
        "id": "agents-github-github-modes",
        "title": "GitHub Integration Modes",
        "url": "/.claude/agents/github/github-modes.md",
        "filePath": "/.claude/agents/github/github-modes.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "modes"
        ],
        "description": "This document describes all GitHub integration modes available in Claude-Flow with ruv-swarm coordination. Each mode is optimized for specific GitHub "
      },
      {
        "id": "agents-github-issue-tracker",
        "title": "GitHub Issue Tracker",
        "url": "/.claude/agents/github/issue-tracker.md",
        "filePath": "/.claude/agents/github/issue-tracker.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "issue",
          "tracker"
        ],
        "description": "Intelligent issue management and project coordination with ruv-swarm integration for automated tracking, progress monitoring, and team coordination."
      },
      {
        "id": "agents-github-multi-repo-swarm",
        "title": "Multi-Repo Swarm - Cross-Repository Swarm Orchestration",
        "url": "/.claude/agents/github/multi-repo-swarm.md",
        "filePath": "/.claude/agents/github/multi-repo-swarm.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "multi",
          "repo",
          "swarm"
        ],
        "description": "Coordinate AI swarms across multiple repositories, enabling organization-wide automation and intelligent cross-project collaboration."
      },
      {
        "id": "agents-github-pr-manager",
        "title": "GitHub PR Manager",
        "url": "/.claude/agents/github/pr-manager.md",
        "filePath": "/.claude/agents/github/pr-manager.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "pr",
          "manager"
        ],
        "description": "Comprehensive pull request management with swarm coordination for automated reviews, testing, and merge workflows."
      },
      {
        "id": "agents-github-project-board-sync",
        "title": "Project Board Sync - GitHub Projects Integration",
        "url": "/.claude/agents/github/project-board-sync.md",
        "filePath": "/.claude/agents/github/project-board-sync.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "project",
          "board",
          "sync"
        ],
        "description": "Synchronize AI swarms with GitHub Projects for visual task management, progress tracking, and team coordination."
      },
      {
        "id": "agents-github-release-manager",
        "title": "GitHub Release Manager",
        "url": "/.claude/agents/github/release-manager.md",
        "filePath": "/.claude/agents/github/release-manager.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "release",
          "manager"
        ],
        "description": "Automated release coordination and deployment with ruv-swarm orchestration for seamless version management, testing, and deployment across multiple pa"
      },
      {
        "id": "agents-github-release-swarm",
        "title": "Release Swarm - Intelligent Release Automation",
        "url": "/.claude/agents/github/release-swarm.md",
        "filePath": "/.claude/agents/github/release-swarm.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "release",
          "swarm"
        ],
        "description": "Orchestrate complex software releases using AI swarms that handle everything from changelog generation to multi-platform deployment."
      },
      {
        "id": "agents-github-repo-architect",
        "title": "GitHub Repository Architect",
        "url": "/.claude/agents/github/repo-architect.md",
        "filePath": "/.claude/agents/github/repo-architect.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "repo",
          "architect"
        ],
        "description": "Repository structure optimization and multi-repo management with ruv-swarm coordination for scalable project architecture and development workflows."
      },
      {
        "id": "agents-github-swarm-issue",
        "title": "Swarm Issue - Issue-Based Swarm Coordination",
        "url": "/.claude/agents/github/swarm-issue.md",
        "filePath": "/.claude/agents/github/swarm-issue.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "swarm",
          "issue"
        ],
        "description": "Transform GitHub Issues into intelligent swarm tasks, enabling automatic task decomposition and agent coordination with advanced multi-agent orchestra"
      },
      {
        "id": "agents-github-swarm-pr",
        "title": "Swarm PR - Managing Swarms through Pull Requests",
        "url": "/.claude/agents/github/swarm-pr.md",
        "filePath": "/.claude/agents/github/swarm-pr.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "swarm",
          "pr"
        ],
        "description": "Create and manage AI swarms directly from GitHub Pull Requests, enabling seamless integration with your development workflow through intelligent multi"
      },
      {
        "id": "agents-github-sync-coordinator",
        "title": "GitHub Sync Coordinator",
        "url": "/.claude/agents/github/sync-coordinator.md",
        "filePath": "/.claude/agents/github/sync-coordinator.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "sync",
          "coordinator"
        ],
        "description": "Multi-package synchronization and version alignment with ruv-swarm coordination for seamless integration between claude-code-flow and ruv-swarm packag"
      },
      {
        "id": "agents-github-workflow-automation",
        "title": "Workflow Automation - GitHub Actions Integration",
        "url": "/.claude/agents/github/workflow-automation.md",
        "filePath": "/.claude/agents/github/workflow-automation.md",
        "type": "markdown",
        "category": "Agents/Github",
        "tags": [
          "github",
          "agent",
          "workflow",
          "automation"
        ],
        "description": "Integrate AI swarms with GitHub Actions to create intelligent, self-organizing CI/CD pipelines that adapt to your codebase through advanced multi-agen"
      }
    ]
  ],
  [
    "Agents/Goal",
    [
      {
        "id": "agents-goal-code-goal-planner",
        "title": "SPARC-GOAP Integration",
        "url": "/.claude/agents/goal/code-goal-planner.md",
        "filePath": "/.claude/agents/goal/code-goal-planner.md",
        "type": "markdown",
        "category": "Agents/Goal",
        "tags": [
          "goal",
          "agent",
          "code",
          "planner"
        ],
        "description": "The SPARC methodology enhances GOAP planning by providing a structured framework for each milestone:"
      },
      {
        "id": "agents-goal-goal-planner",
        "title": "Goal Planner",
        "url": "/.claude/agents/goal/goal-planner.md",
        "filePath": "/.claude/agents/goal/goal-planner.md",
        "type": "markdown",
        "category": "Agents/Goal",
        "tags": [
          "goal",
          "agent",
          "planner"
        ],
        "description": "Claude Flow documentation"
      }
    ]
  ],
  [
    "Agents/Hive-mind",
    [
      {
        "id": "agents-hive-mind-collective-intelligence-coordinator",
        "title": "Core Responsibilities",
        "url": "/.claude/agents/hive-mind/collective-intelligence-coordinator.md",
        "filePath": "/.claude/agents/hive-mind/collective-intelligence-coordinator.md",
        "type": "markdown",
        "category": "Agents/Hive-mind",
        "tags": [
          "hive-mind",
          "agent",
          "collective",
          "intelligence",
          "coordinator"
        ],
        "description": "**MANDATORY: Write to memory IMMEDIATELY and FREQUENTLY**"
      },
      {
        "id": "agents-hive-mind-queen-coordinator",
        "title": "Core Responsibilities",
        "url": "/.claude/agents/hive-mind/queen-coordinator.md",
        "filePath": "/.claude/agents/hive-mind/queen-coordinator.md",
        "type": "markdown",
        "category": "Agents/Hive-mind",
        "tags": [
          "hive-mind",
          "agent",
          "queen",
          "coordinator"
        ],
        "description": "**MANDATORY: Establish dominance hierarchy and write sovereign status**"
      },
      {
        "id": "agents-hive-mind-scout-explorer",
        "title": "Core Responsibilities",
        "url": "/.claude/agents/hive-mind/scout-explorer.md",
        "filePath": "/.claude/agents/hive-mind/scout-explorer.md",
        "type": "markdown",
        "category": "Agents/Hive-mind",
        "tags": [
          "hive-mind",
          "agent",
          "scout",
          "explorer"
        ],
        "description": "**MANDATORY: Report all discoveries immediately to memory**"
      },
      {
        "id": "agents-hive-mind-swarm-memory-manager",
        "title": "Core Responsibilities",
        "url": "/.claude/agents/hive-mind/swarm-memory-manager.md",
        "filePath": "/.claude/agents/hive-mind/swarm-memory-manager.md",
        "type": "markdown",
        "category": "Agents/Hive-mind",
        "tags": [
          "hive-mind",
          "agent",
          "swarm",
          "memory",
          "manager"
        ],
        "description": "**MANDATORY: Continuously write and sync memory state**"
      },
      {
        "id": "agents-hive-mind-worker-specialist",
        "title": "Core Responsibilities",
        "url": "/.claude/agents/hive-mind/worker-specialist.md",
        "filePath": "/.claude/agents/hive-mind/worker-specialist.md",
        "type": "markdown",
        "category": "Agents/Hive-mind",
        "tags": [
          "hive-mind",
          "agent",
          "worker",
          "specialist"
        ],
        "description": "**MANDATORY: Report status before, during, and after every task**"
      }
    ]
  ],
  [
    "Agents/Neural",
    [
      {
        "id": "agents-neural-safla-neural",
        "title": "MCP Integration Examples",
        "url": "/.claude/agents/neural/safla-neural.md",
        "filePath": "/.claude/agents/neural/safla-neural.md",
        "type": "markdown",
        "category": "Agents/Neural",
        "tags": [
          "neural",
          "agent",
          "safla"
        ],
        "description": "```javascript"
      }
    ]
  ],
  [
    "Agents/Optimization",
    [
      {
        "id": "agents-optimization-benchmark-suite",
        "title": "Benchmark Suite Agent",
        "url": "/.claude/agents/optimization/benchmark-suite.md",
        "filePath": "/.claude/agents/optimization/benchmark-suite.md",
        "type": "markdown",
        "category": "Agents/Optimization",
        "tags": [
          "optimization",
          "agent",
          "benchmark",
          "suite"
        ],
        "description": "- **Name**: Benchmark Suite"
      },
      {
        "id": "agents-optimization-load-balancer",
        "title": "Load Balancing Coordinator Agent",
        "url": "/.claude/agents/optimization/load-balancer.md",
        "filePath": "/.claude/agents/optimization/load-balancer.md",
        "type": "markdown",
        "category": "Agents/Optimization",
        "tags": [
          "optimization",
          "agent",
          "load",
          "balancer"
        ],
        "description": "- **Name**: Load Balancing Coordinator"
      },
      {
        "id": "agents-optimization-performance-monitor",
        "title": "Performance Monitor Agent",
        "url": "/.claude/agents/optimization/performance-monitor.md",
        "filePath": "/.claude/agents/optimization/performance-monitor.md",
        "type": "markdown",
        "category": "Agents/Optimization",
        "tags": [
          "optimization",
          "agent",
          "performance",
          "monitor"
        ],
        "description": "- **Name**: Performance Monitor"
      },
      {
        "id": "agents-optimization-resource-allocator",
        "title": "Resource Allocator Agent",
        "url": "/.claude/agents/optimization/resource-allocator.md",
        "filePath": "/.claude/agents/optimization/resource-allocator.md",
        "type": "markdown",
        "category": "Agents/Optimization",
        "tags": [
          "optimization",
          "agent",
          "resource",
          "allocator"
        ],
        "description": "- **Name**: Resource Allocator"
      },
      {
        "id": "agents-optimization-topology-optimizer",
        "title": "Topology Optimizer Agent",
        "url": "/.claude/agents/optimization/topology-optimizer.md",
        "filePath": "/.claude/agents/optimization/topology-optimizer.md",
        "type": "markdown",
        "category": "Agents/Optimization",
        "tags": [
          "optimization",
          "agent",
          "topology",
          "optimizer"
        ],
        "description": "- **Name**: Topology Optimizer"
      }
    ]
  ],
  [
    "Agents/Sparc",
    [
      {
        "id": "agents-sparc-architecture",
        "title": "# Retrieve pseudocode designs",
        "url": "/.claude/agents/sparc/architecture.md",
        "filePath": "/.claude/agents/sparc/architecture.md",
        "type": "markdown",
        "category": "Agents/Sparc",
        "tags": [
          "sparc",
          "agent",
          "architecture"
        ],
        "description": "memory_search \"pseudo_complete\" | tail -1"
      },
      {
        "id": "agents-sparc-pseudocode",
        "title": "# Retrieve specification from memory",
        "url": "/.claude/agents/sparc/pseudocode.md",
        "filePath": "/.claude/agents/sparc/pseudocode.md",
        "type": "markdown",
        "category": "Agents/Sparc",
        "tags": [
          "sparc",
          "agent",
          "pseudocode"
        ],
        "description": "memory_search \"spec_complete\" | tail -1"
      },
      {
        "id": "agents-sparc-refinement",
        "title": "# Run initial tests",
        "url": "/.claude/agents/sparc/refinement.md",
        "filePath": "/.claude/agents/sparc/refinement.md",
        "type": "markdown",
        "category": "Agents/Sparc",
        "tags": [
          "sparc",
          "agent",
          "refinement"
        ],
        "description": "npm test --if-present || echo \"No tests yet\""
      },
      {
        "id": "agents-sparc-specification",
        "title": "SPARC Specification Agent",
        "url": "/.claude/agents/sparc/specification.md",
        "filePath": "/.claude/agents/sparc/specification.md",
        "type": "markdown",
        "category": "Agents/Sparc",
        "tags": [
          "sparc",
          "agent",
          "specification"
        ],
        "description": "You are a requirements analysis specialist focused on the Specification phase of the SPARC methodology. Your role is to create comprehensive, clear, a"
      }
    ]
  ],
  [
    "Agents/Specialized/Mobile",
    [
      {
        "id": "agents-specialized-mobile-spec-mobile-react-native",
        "title": "React Native Mobile Developer",
        "url": "/.claude/agents/specialized/mobile/spec-mobile-react-native.md",
        "filePath": "/.claude/agents/specialized/mobile/spec-mobile-react-native.md",
        "type": "markdown",
        "category": "Agents/Specialized/Mobile",
        "tags": [
          "specialized",
          "mobile",
          "agent",
          "spec",
          "react",
          "native"
        ],
        "description": "You are a React Native Mobile Developer creating cross-platform mobile applications."
      }
    ]
  ],
  [
    "Agents/Swarm",
    [
      {
        "id": "agents-swarm-adaptive-coordinator",
        "title": "# Initialize with auto-detection",
        "url": "/.claude/agents/swarm/adaptive-coordinator.md",
        "filePath": "/.claude/agents/swarm/adaptive-coordinator.md",
        "type": "markdown",
        "category": "Agents/Swarm",
        "tags": [
          "swarm",
          "agent",
          "adaptive",
          "coordinator"
        ],
        "description": "mcp__claude-flow__swarm_init auto --maxAgents=15 --strategy=adaptive"
      },
      {
        "id": "agents-swarm-hierarchical-coordinator",
        "title": "# Initialize swarm topology",
        "url": "/.claude/agents/swarm/hierarchical-coordinator.md",
        "filePath": "/.claude/agents/swarm/hierarchical-coordinator.md",
        "type": "markdown",
        "category": "Agents/Swarm",
        "tags": [
          "swarm",
          "agent",
          "hierarchical",
          "coordinator"
        ],
        "description": "mcp__claude-flow__swarm_init hierarchical --maxAgents=10 --strategy=adaptive"
      },
      {
        "id": "agents-swarm-mesh-coordinator",
        "title": "# Initialize mesh topology",
        "url": "/.claude/agents/swarm/mesh-coordinator.md",
        "filePath": "/.claude/agents/swarm/mesh-coordinator.md",
        "type": "markdown",
        "category": "Agents/Swarm",
        "tags": [
          "swarm",
          "agent",
          "mesh",
          "coordinator"
        ],
        "description": "mcp__claude-flow__swarm_init mesh --maxAgents=12 --strategy=distributed"
      }
    ]
  ],
  [
    "Agents/Templates",
    [
      {
        "id": "agents-templates-automation-smart-agent",
        "title": "# Check current swarm status",
        "url": "/.claude/agents/templates/automation-smart-agent.md",
        "filePath": "/.claude/agents/templates/automation-smart-agent.md",
        "type": "markdown",
        "category": "Agents/Templates",
        "tags": [
          "templates",
          "agent",
          "automation",
          "smart"
        ],
        "description": "memory_retrieve \"current_swarm_status\" || echo \"No active swarm detected\""
      },
      {
        "id": "agents-templates-coordinator-swarm-init",
        "title": "# Write initial status to memory",
        "url": "/.claude/agents/templates/coordinator-swarm-init.md",
        "filePath": "/.claude/agents/templates/coordinator-swarm-init.md",
        "type": "markdown",
        "category": "Agents/Templates",
        "tags": [
          "templates",
          "agent",
          "coordinator",
          "swarm",
          "init"
        ],
        "description": "npx claude-flow@alpha memory store \"swarm/init/status\" \"{\\\"status\\\":\\\"initializing\\\",\\\"timestamp\\\":$(date +%s)}\" --namespace coordination"
      },
      {
        "id": "agents-templates-github-pr-manager",
        "title": "# Verify gh CLI is authenticated",
        "url": "/.claude/agents/templates/github-pr-manager.md",
        "filePath": "/.claude/agents/templates/github-pr-manager.md",
        "type": "markdown",
        "category": "Agents/Templates",
        "tags": [
          "templates",
          "agent",
          "github",
          "pr",
          "manager"
        ],
        "description": "gh auth status || echo \"⚠️ GitHub CLI authentication required\""
      },
      {
        "id": "agents-templates-implementer-sparc-coder",
        "title": "# Check for test files and create if needed",
        "url": "/.claude/agents/templates/implementer-sparc-coder.md",
        "filePath": "/.claude/agents/templates/implementer-sparc-coder.md",
        "type": "markdown",
        "category": "Agents/Templates",
        "tags": [
          "templates",
          "agent",
          "implementer",
          "sparc",
          "coder"
        ],
        "description": "if [ ! -d \"tests\" ] && [ ! -d \"test\" ] && [ ! -d \"__tests__\" ]; then"
      },
      {
        "id": "agents-templates-memory-coordinator",
        "title": "# Check memory system availability",
        "url": "/.claude/agents/templates/memory-coordinator.md",
        "filePath": "/.claude/agents/templates/memory-coordinator.md",
        "type": "markdown",
        "category": "Agents/Templates",
        "tags": [
          "templates",
          "agent",
          "memory",
          "coordinator"
        ],
        "description": "echo \"📊 Current memory usage:\""
      },
      {
        "id": "agents-templates-migration-plan",
        "title": "# Check existing command structure",
        "url": "/.claude/agents/templates/migration-plan.md",
        "filePath": "/.claude/agents/templates/migration-plan.md",
        "type": "markdown",
        "category": "Agents/Templates",
        "tags": [
          "templates",
          "agent",
          "migration",
          "plan"
        ],
        "description": "if [ -d \".claude/commands\" ]; then"
      },
      {
        "id": "agents-templates-orchestrator-task",
        "title": "# Check for existing task plans",
        "url": "/.claude/agents/templates/orchestrator-task.md",
        "filePath": "/.claude/agents/templates/orchestrator-task.md",
        "type": "markdown",
        "category": "Agents/Templates",
        "tags": [
          "templates",
          "agent",
          "orchestrator",
          "task"
        ],
        "description": "memory_search \"task_plan\" | tail -1"
      },
      {
        "id": "agents-templates-performance-analyzer",
        "title": "# Collect baseline metrics",
        "url": "/.claude/agents/templates/performance-analyzer.md",
        "filePath": "/.claude/agents/templates/performance-analyzer.md",
        "type": "markdown",
        "category": "Agents/Templates",
        "tags": [
          "templates",
          "agent",
          "performance",
          "analyzer"
        ],
        "description": "echo \"📈 Collecting baseline performance metrics\""
      },
      {
        "id": "agents-templates-sparc-coordinator",
        "title": "# Check for existing SPARC phase data",
        "url": "/.claude/agents/templates/sparc-coordinator.md",
        "filePath": "/.claude/agents/templates/sparc-coordinator.md",
        "type": "markdown",
        "category": "Agents/Templates",
        "tags": [
          "templates",
          "agent",
          "sparc",
          "coordinator"
        ],
        "description": "memory_search \"sparc_phase\" | tail -1"
      }
    ]
  ],
  [
    "Agents/Testing/Unit",
    [
      {
        "id": "agents-testing-unit-tdd-london-swarm",
        "title": "# Initialize swarm test coordination",
        "url": "/.claude/agents/testing/unit/tdd-london-swarm.md",
        "filePath": "/.claude/agents/testing/unit/tdd-london-swarm.md",
        "type": "markdown",
        "category": "Agents/Testing/Unit",
        "tags": [
          "testing",
          "unit",
          "agent",
          "tdd",
          "london",
          "swarm"
        ],
        "description": "if command -v npx >/dev/null 2>&1; then"
      }
    ]
  ],
  [
    "Agents/Testing/Validation",
    [
      {
        "id": "agents-testing-validation-production-validator",
        "title": "# Verify no mock implementations remain",
        "url": "/.claude/agents/testing/validation/production-validator.md",
        "filePath": "/.claude/agents/testing/validation/production-validator.md",
        "type": "markdown",
        "category": "Agents/Testing/Validation",
        "tags": [
          "testing",
          "validation",
          "agent",
          "production",
          "validator"
        ],
        "description": "echo \"🚫 Scanning for mock/fake implementations...\""
      }
    ]
  ],
  [
    "Commands/Agents",
    [
      {
        "id": "commands-agents-readme",
        "title": "Agents Commands",
        "url": "/.claude/commands/agents/README.md",
        "filePath": "/.claude/commands/agents/README.md",
        "type": "markdown",
        "category": "Commands/Agents",
        "tags": [
          "command",
          "README"
        ],
        "description": "Commands for agents operations in Claude Flow."
      },
      {
        "id": "commands-agents-agent-capabilities",
        "title": "agent-capabilities",
        "url": "/.claude/commands/agents/agent-capabilities.md",
        "filePath": "/.claude/commands/agents/agent-capabilities.md",
        "type": "markdown",
        "category": "Commands/Agents",
        "tags": [
          "command",
          "agent",
          "capabilities"
        ],
        "description": "Matrix of agent capabilities and their specializations."
      },
      {
        "id": "commands-agents-agent-coordination",
        "title": "agent-coordination",
        "url": "/.claude/commands/agents/agent-coordination.md",
        "filePath": "/.claude/commands/agents/agent-coordination.md",
        "type": "markdown",
        "category": "Commands/Agents",
        "tags": [
          "command",
          "agent",
          "coordination"
        ],
        "description": "Coordination patterns for multi-agent collaboration."
      },
      {
        "id": "commands-agents-agent-spawning",
        "title": "agent-spawning",
        "url": "/.claude/commands/agents/agent-spawning.md",
        "filePath": "/.claude/commands/agents/agent-spawning.md",
        "type": "markdown",
        "category": "Commands/Agents",
        "tags": [
          "command",
          "agent",
          "spawning"
        ],
        "description": "Guide to spawning agents with Claude Code's Task tool."
      },
      {
        "id": "commands-agents-agent-types",
        "title": "agent-types",
        "url": "/.claude/commands/agents/agent-types.md",
        "filePath": "/.claude/commands/agents/agent-types.md",
        "type": "markdown",
        "category": "Commands/Agents",
        "tags": [
          "command",
          "agent",
          "types"
        ],
        "description": "Complete guide to all 54 available agent types in Claude Flow."
      }
    ]
  ],
  [
    "Commands/Analysis",
    [
      {
        "id": "commands-analysis-command_compliance_report",
        "title": "Analysis Commands Compliance Report",
        "url": "/.claude/commands/analysis/COMMAND_COMPLIANCE_REPORT.md",
        "filePath": "/.claude/commands/analysis/COMMAND_COMPLIANCE_REPORT.md",
        "type": "markdown",
        "category": "Commands/Analysis",
        "tags": [
          "analysis",
          "command",
          "COMMAND_COMPLIANCE_REPORT"
        ],
        "description": "Reviewed all command files in `.claude/commands/analysis/` directory to ensure proper usage of:"
      },
      {
        "id": "commands-analysis-readme",
        "title": "Analysis Commands",
        "url": "/.claude/commands/analysis/README.md",
        "filePath": "/.claude/commands/analysis/README.md",
        "type": "markdown",
        "category": "Commands/Analysis",
        "tags": [
          "analysis",
          "command",
          "README"
        ],
        "description": "Commands for analysis operations in Claude Flow."
      },
      {
        "id": "commands-analysis-bottleneck-detect",
        "title": "bottleneck detect",
        "url": "/.claude/commands/analysis/bottleneck-detect.md",
        "filePath": "/.claude/commands/analysis/bottleneck-detect.md",
        "type": "markdown",
        "category": "Commands/Analysis",
        "tags": [
          "analysis",
          "command",
          "bottleneck",
          "detect"
        ],
        "description": "Analyze performance bottlenecks in swarm operations and suggest optimizations."
      },
      {
        "id": "commands-analysis-performance-bottlenecks",
        "title": "Performance Bottleneck Analysis",
        "url": "/.claude/commands/analysis/performance-bottlenecks.md",
        "filePath": "/.claude/commands/analysis/performance-bottlenecks.md",
        "type": "markdown",
        "category": "Commands/Analysis",
        "tags": [
          "analysis",
          "command",
          "performance",
          "bottlenecks"
        ],
        "description": "Identify and resolve performance bottlenecks in your development workflow."
      },
      {
        "id": "commands-analysis-performance-report",
        "title": "performance-report",
        "url": "/.claude/commands/analysis/performance-report.md",
        "filePath": "/.claude/commands/analysis/performance-report.md",
        "type": "markdown",
        "category": "Commands/Analysis",
        "tags": [
          "analysis",
          "command",
          "performance",
          "report"
        ],
        "description": "Generate comprehensive performance reports for swarm operations."
      },
      {
        "id": "commands-analysis-token-efficiency",
        "title": "Token Usage Optimization",
        "url": "/.claude/commands/analysis/token-efficiency.md",
        "filePath": "/.claude/commands/analysis/token-efficiency.md",
        "type": "markdown",
        "category": "Commands/Analysis",
        "tags": [
          "analysis",
          "command",
          "token",
          "efficiency"
        ],
        "description": "Reduce token consumption while maintaining quality through intelligent coordination."
      },
      {
        "id": "commands-analysis-token-usage",
        "title": "token-usage",
        "url": "/.claude/commands/analysis/token-usage.md",
        "filePath": "/.claude/commands/analysis/token-usage.md",
        "type": "markdown",
        "category": "Commands/Analysis",
        "tags": [
          "analysis",
          "command",
          "token",
          "usage"
        ],
        "description": "Analyze token usage patterns and optimize for efficiency."
      }
    ]
  ],
  [
    "Commands/Automation",
    [
      {
        "id": "commands-automation-readme",
        "title": "Automation Commands",
        "url": "/.claude/commands/automation/README.md",
        "filePath": "/.claude/commands/automation/README.md",
        "type": "markdown",
        "category": "Commands/Automation",
        "tags": [
          "automation",
          "command",
          "README"
        ],
        "description": "Commands for automation operations in Claude Flow."
      },
      {
        "id": "commands-automation-auto-agent",
        "title": "auto agent",
        "url": "/.claude/commands/automation/auto-agent.md",
        "filePath": "/.claude/commands/automation/auto-agent.md",
        "type": "markdown",
        "category": "Commands/Automation",
        "tags": [
          "automation",
          "command",
          "auto",
          "agent"
        ],
        "description": "Automatically spawn and manage agents based on task requirements."
      },
      {
        "id": "commands-automation-self-healing",
        "title": "Self-Healing Workflows",
        "url": "/.claude/commands/automation/self-healing.md",
        "filePath": "/.claude/commands/automation/self-healing.md",
        "type": "markdown",
        "category": "Commands/Automation",
        "tags": [
          "automation",
          "command",
          "self",
          "healing"
        ],
        "description": "Automatically detect and recover from errors without interrupting your flow."
      },
      {
        "id": "commands-automation-session-memory",
        "title": "Cross-Session Memory",
        "url": "/.claude/commands/automation/session-memory.md",
        "filePath": "/.claude/commands/automation/session-memory.md",
        "type": "markdown",
        "category": "Commands/Automation",
        "tags": [
          "automation",
          "command",
          "session",
          "memory"
        ],
        "description": "Maintain context and learnings across Claude Code sessions for continuous improvement."
      },
      {
        "id": "commands-automation-smart-agents",
        "title": "Smart Agent Auto-Spawning",
        "url": "/.claude/commands/automation/smart-agents.md",
        "filePath": "/.claude/commands/automation/smart-agents.md",
        "type": "markdown",
        "category": "Commands/Automation",
        "tags": [
          "automation",
          "command",
          "smart",
          "agents"
        ],
        "description": "Automatically spawn the right agents at the right time without manual intervention."
      },
      {
        "id": "commands-automation-smart-spawn",
        "title": "smart-spawn",
        "url": "/.claude/commands/automation/smart-spawn.md",
        "filePath": "/.claude/commands/automation/smart-spawn.md",
        "type": "markdown",
        "category": "Commands/Automation",
        "tags": [
          "automation",
          "command",
          "smart",
          "spawn"
        ],
        "description": "Intelligently spawn agents based on workload analysis."
      },
      {
        "id": "commands-automation-workflow-select",
        "title": "workflow-select",
        "url": "/.claude/commands/automation/workflow-select.md",
        "filePath": "/.claude/commands/automation/workflow-select.md",
        "type": "markdown",
        "category": "Commands/Automation",
        "tags": [
          "automation",
          "command",
          "workflow",
          "select"
        ],
        "description": "Automatically select optimal workflow based on task type."
      }
    ]
  ],
  [
    "Commands/Coordination",
    [
      {
        "id": "commands-coordination-readme",
        "title": "Coordination Commands",
        "url": "/.claude/commands/coordination/README.md",
        "filePath": "/.claude/commands/coordination/README.md",
        "type": "markdown",
        "category": "Commands/Coordination",
        "tags": [
          "coordination",
          "command",
          "README"
        ],
        "description": "Commands for coordination operations in Claude Flow."
      },
      {
        "id": "commands-coordination-agent-spawn",
        "title": "agent-spawn",
        "url": "/.claude/commands/coordination/agent-spawn.md",
        "filePath": "/.claude/commands/coordination/agent-spawn.md",
        "type": "markdown",
        "category": "Commands/Coordination",
        "tags": [
          "coordination",
          "command",
          "agent",
          "spawn"
        ],
        "description": "Spawn a new agent in the current swarm."
      },
      {
        "id": "commands-coordination-init",
        "title": "Initialize Coordination Framework",
        "url": "/.claude/commands/coordination/init.md",
        "filePath": "/.claude/commands/coordination/init.md",
        "type": "markdown",
        "category": "Commands/Coordination",
        "tags": [
          "coordination",
          "command",
          "init"
        ],
        "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
      },
      {
        "id": "commands-coordination-orchestrate",
        "title": "Coordinate Task Execution",
        "url": "/.claude/commands/coordination/orchestrate.md",
        "filePath": "/.claude/commands/coordination/orchestrate.md",
        "type": "markdown",
        "category": "Commands/Coordination",
        "tags": [
          "coordination",
          "command",
          "orchestrate"
        ],
        "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
      },
      {
        "id": "commands-coordination-spawn",
        "title": "Create Cognitive Patterns",
        "url": "/.claude/commands/coordination/spawn.md",
        "filePath": "/.claude/commands/coordination/spawn.md",
        "type": "markdown",
        "category": "Commands/Coordination",
        "tags": [
          "coordination",
          "command",
          "spawn"
        ],
        "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
      },
      {
        "id": "commands-coordination-swarm-init",
        "title": "swarm init",
        "url": "/.claude/commands/coordination/swarm-init.md",
        "filePath": "/.claude/commands/coordination/swarm-init.md",
        "type": "markdown",
        "category": "Commands/Coordination",
        "tags": [
          "coordination",
          "command",
          "swarm",
          "init"
        ],
        "description": "Initialize a Claude Flow swarm with specified topology and configuration."
      },
      {
        "id": "commands-coordination-task-orchestrate",
        "title": "task-orchestrate",
        "url": "/.claude/commands/coordination/task-orchestrate.md",
        "filePath": "/.claude/commands/coordination/task-orchestrate.md",
        "type": "markdown",
        "category": "Commands/Coordination",
        "tags": [
          "coordination",
          "command",
          "task",
          "orchestrate"
        ],
        "description": "Orchestrate complex tasks across the swarm."
      }
    ]
  ],
  [
    "Commands/Flow-nexus",
    [
      {
        "id": "commands-flow-nexus-app-store",
        "title": "Flow Nexus App Store",
        "url": "/.claude/commands/flow-nexus/app-store.md",
        "filePath": "/.claude/commands/flow-nexus/app-store.md",
        "type": "markdown",
        "category": "Commands/Flow-nexus",
        "tags": [
          "flow-nexus",
          "command",
          "app",
          "store"
        ],
        "description": "Browse templates, publish apps, and deploy solutions."
      },
      {
        "id": "commands-flow-nexus-challenges",
        "title": "Flow Nexus Challenges",
        "url": "/.claude/commands/flow-nexus/challenges.md",
        "filePath": "/.claude/commands/flow-nexus/challenges.md",
        "type": "markdown",
        "category": "Commands/Flow-nexus",
        "tags": [
          "flow-nexus",
          "command",
          "challenges"
        ],
        "description": "Complete coding challenges to earn rUv credits and climb the leaderboard."
      },
      {
        "id": "commands-flow-nexus-login-registration",
        "title": "Flow Nexus Authentication",
        "url": "/.claude/commands/flow-nexus/login-registration.md",
        "filePath": "/.claude/commands/flow-nexus/login-registration.md",
        "type": "markdown",
        "category": "Commands/Flow-nexus",
        "tags": [
          "flow-nexus",
          "command",
          "login",
          "registration"
        ],
        "description": "Quick commands for Flow Nexus login and registration."
      },
      {
        "id": "commands-flow-nexus-neural-network",
        "title": "Flow Nexus Neural Networks",
        "url": "/.claude/commands/flow-nexus/neural-network.md",
        "filePath": "/.claude/commands/flow-nexus/neural-network.md",
        "type": "markdown",
        "category": "Commands/Flow-nexus",
        "tags": [
          "flow-nexus",
          "command",
          "neural",
          "network"
        ],
        "description": "Train custom neural networks with distributed computing."
      },
      {
        "id": "commands-flow-nexus-payments",
        "title": "Flow Nexus Payments",
        "url": "/.claude/commands/flow-nexus/payments.md",
        "filePath": "/.claude/commands/flow-nexus/payments.md",
        "type": "markdown",
        "category": "Commands/Flow-nexus",
        "tags": [
          "flow-nexus",
          "command",
          "payments"
        ],
        "description": "Manage credits, configure billing, and track usage."
      },
      {
        "id": "commands-flow-nexus-sandbox",
        "title": "Flow Nexus Sandboxes",
        "url": "/.claude/commands/flow-nexus/sandbox.md",
        "filePath": "/.claude/commands/flow-nexus/sandbox.md",
        "type": "markdown",
        "category": "Commands/Flow-nexus",
        "tags": [
          "flow-nexus",
          "command",
          "sandbox"
        ],
        "description": "Deploy and manage isolated execution environments."
      },
      {
        "id": "commands-flow-nexus-swarm",
        "title": "Flow Nexus Swarms",
        "url": "/.claude/commands/flow-nexus/swarm.md",
        "filePath": "/.claude/commands/flow-nexus/swarm.md",
        "type": "markdown",
        "category": "Commands/Flow-nexus",
        "tags": [
          "flow-nexus",
          "command",
          "swarm"
        ],
        "description": "Deploy and manage AI agent swarms in the cloud."
      },
      {
        "id": "commands-flow-nexus-user-tools",
        "title": "Flow Nexus User Tools",
        "url": "/.claude/commands/flow-nexus/user-tools.md",
        "filePath": "/.claude/commands/flow-nexus/user-tools.md",
        "type": "markdown",
        "category": "Commands/Flow-nexus",
        "tags": [
          "flow-nexus",
          "command",
          "user",
          "tools"
        ],
        "description": "Utilities for user management, storage, and system operations."
      },
      {
        "id": "commands-flow-nexus-workflow",
        "title": "Flow Nexus Workflows",
        "url": "/.claude/commands/flow-nexus/workflow.md",
        "filePath": "/.claude/commands/flow-nexus/workflow.md",
        "type": "markdown",
        "category": "Commands/Flow-nexus",
        "tags": [
          "flow-nexus",
          "command",
          "workflow"
        ],
        "description": "Create and manage automated workflows with event-driven processing."
      }
    ]
  ],
  [
    "Commands/Github",
    [
      {
        "id": "commands-github-readme",
        "title": "Github Commands",
        "url": "/.claude/commands/github/README.md",
        "filePath": "/.claude/commands/github/README.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "README"
        ],
        "description": "Commands for github operations in Claude Flow."
      },
      {
        "id": "commands-github-code-review-swarm",
        "title": "Code Review Swarm - Automated Code Review with AI Agents",
        "url": "/.claude/commands/github/code-review-swarm.md",
        "filePath": "/.claude/commands/github/code-review-swarm.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "code",
          "review",
          "swarm"
        ],
        "description": "Deploy specialized AI agents to perform comprehensive, intelligent code reviews that go beyond traditional static analysis."
      },
      {
        "id": "commands-github-code-review",
        "title": "code-review",
        "url": "/.claude/commands/github/code-review.md",
        "filePath": "/.claude/commands/github/code-review.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "code",
          "review"
        ],
        "description": "Automated code review with swarm intelligence."
      },
      {
        "id": "commands-github-github-modes",
        "title": "GitHub Integration Modes",
        "url": "/.claude/commands/github/github-modes.md",
        "filePath": "/.claude/commands/github/github-modes.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "modes"
        ],
        "description": "This document describes all GitHub integration modes available in Claude-Flow with ruv-swarm coordination. Each mode is optimized for specific GitHub "
      },
      {
        "id": "commands-github-github-swarm",
        "title": "github swarm",
        "url": "/.claude/commands/github/github-swarm.md",
        "filePath": "/.claude/commands/github/github-swarm.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "swarm"
        ],
        "description": "Create a specialized swarm for GitHub repository management."
      },
      {
        "id": "commands-github-issue-tracker",
        "title": "GitHub Issue Tracker",
        "url": "/.claude/commands/github/issue-tracker.md",
        "filePath": "/.claude/commands/github/issue-tracker.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "issue",
          "tracker"
        ],
        "description": "Intelligent issue management and project coordination with ruv-swarm integration for automated tracking, progress monitoring, and team coordination."
      },
      {
        "id": "commands-github-issue-triage",
        "title": "issue-triage",
        "url": "/.claude/commands/github/issue-triage.md",
        "filePath": "/.claude/commands/github/issue-triage.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "issue",
          "triage"
        ],
        "description": "Intelligent issue classification and triage."
      },
      {
        "id": "commands-github-multi-repo-swarm",
        "title": "Multi-Repo Swarm - Cross-Repository Swarm Orchestration",
        "url": "/.claude/commands/github/multi-repo-swarm.md",
        "filePath": "/.claude/commands/github/multi-repo-swarm.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "multi",
          "repo",
          "swarm"
        ],
        "description": "Coordinate AI swarms across multiple repositories, enabling organization-wide automation and intelligent cross-project collaboration."
      },
      {
        "id": "commands-github-pr-enhance",
        "title": "pr-enhance",
        "url": "/.claude/commands/github/pr-enhance.md",
        "filePath": "/.claude/commands/github/pr-enhance.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "pr",
          "enhance"
        ],
        "description": "AI-powered pull request enhancements."
      },
      {
        "id": "commands-github-pr-manager",
        "title": "GitHub PR Manager",
        "url": "/.claude/commands/github/pr-manager.md",
        "filePath": "/.claude/commands/github/pr-manager.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "pr",
          "manager"
        ],
        "description": "Comprehensive pull request management with ruv-swarm coordination for automated reviews, testing, and merge workflows."
      },
      {
        "id": "commands-github-project-board-sync",
        "title": "Project Board Sync - GitHub Projects Integration",
        "url": "/.claude/commands/github/project-board-sync.md",
        "filePath": "/.claude/commands/github/project-board-sync.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "project",
          "board",
          "sync"
        ],
        "description": "Synchronize AI swarms with GitHub Projects for visual task management, progress tracking, and team coordination."
      },
      {
        "id": "commands-github-release-manager",
        "title": "GitHub Release Manager",
        "url": "/.claude/commands/github/release-manager.md",
        "filePath": "/.claude/commands/github/release-manager.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "release",
          "manager"
        ],
        "description": "Automated release coordination and deployment with ruv-swarm orchestration for seamless version management, testing, and deployment across multiple pa"
      },
      {
        "id": "commands-github-release-swarm",
        "title": "Release Swarm - Intelligent Release Automation",
        "url": "/.claude/commands/github/release-swarm.md",
        "filePath": "/.claude/commands/github/release-swarm.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "release",
          "swarm"
        ],
        "description": "Orchestrate complex software releases using AI swarms that handle everything from changelog generation to multi-platform deployment."
      },
      {
        "id": "commands-github-repo-analyze",
        "title": "repo-analyze",
        "url": "/.claude/commands/github/repo-analyze.md",
        "filePath": "/.claude/commands/github/repo-analyze.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "repo",
          "analyze"
        ],
        "description": "Deep analysis of GitHub repository with AI insights."
      },
      {
        "id": "commands-github-repo-architect",
        "title": "GitHub Repository Architect",
        "url": "/.claude/commands/github/repo-architect.md",
        "filePath": "/.claude/commands/github/repo-architect.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "repo",
          "architect"
        ],
        "description": "Repository structure optimization and multi-repo management with ruv-swarm coordination for scalable project architecture and development workflows."
      },
      {
        "id": "commands-github-swarm-issue",
        "title": "Swarm Issue - Issue-Based Swarm Coordination",
        "url": "/.claude/commands/github/swarm-issue.md",
        "filePath": "/.claude/commands/github/swarm-issue.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "swarm",
          "issue"
        ],
        "description": "Transform GitHub Issues into intelligent swarm tasks, enabling automatic task decomposition and agent coordination."
      },
      {
        "id": "commands-github-swarm-pr",
        "title": "Swarm PR - Managing Swarms through Pull Requests",
        "url": "/.claude/commands/github/swarm-pr.md",
        "filePath": "/.claude/commands/github/swarm-pr.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "swarm",
          "pr"
        ],
        "description": "Create and manage AI swarms directly from GitHub Pull Requests, enabling seamless integration with your development workflow."
      },
      {
        "id": "commands-github-sync-coordinator",
        "title": "GitHub Sync Coordinator",
        "url": "/.claude/commands/github/sync-coordinator.md",
        "filePath": "/.claude/commands/github/sync-coordinator.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "sync",
          "coordinator"
        ],
        "description": "Multi-package synchronization and version alignment with ruv-swarm coordination for seamless integration between claude-code-flow and ruv-swarm packag"
      },
      {
        "id": "commands-github-workflow-automation",
        "title": "Workflow Automation - GitHub Actions Integration",
        "url": "/.claude/commands/github/workflow-automation.md",
        "filePath": "/.claude/commands/github/workflow-automation.md",
        "type": "markdown",
        "category": "Commands/Github",
        "tags": [
          "github",
          "command",
          "workflow",
          "automation"
        ],
        "description": "Integrate AI swarms with GitHub Actions to create intelligent, self-organizing CI/CD pipelines that adapt to your codebase."
      }
    ]
  ],
  [
    "Commands/Hive-mind",
    [
      {
        "id": "commands-hive-mind-readme",
        "title": "Hive-mind Commands",
        "url": "/.claude/commands/hive-mind/README.md",
        "filePath": "/.claude/commands/hive-mind/README.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "README"
        ],
        "description": "Commands for hive-mind operations in Claude Flow."
      },
      {
        "id": "commands-hive-mind-hive-mind-consensus",
        "title": "hive-mind-consensus",
        "url": "/.claude/commands/hive-mind/hive-mind-consensus.md",
        "filePath": "/.claude/commands/hive-mind/hive-mind-consensus.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "hive",
          "mind",
          "consensus"
        ],
        "description": "Command documentation for hive-mind-consensus in category hive-mind."
      },
      {
        "id": "commands-hive-mind-hive-mind-init",
        "title": "hive-mind-init",
        "url": "/.claude/commands/hive-mind/hive-mind-init.md",
        "filePath": "/.claude/commands/hive-mind/hive-mind-init.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "hive",
          "mind",
          "init"
        ],
        "description": "Initialize the Hive Mind collective intelligence system."
      },
      {
        "id": "commands-hive-mind-hive-mind-memory",
        "title": "hive-mind-memory",
        "url": "/.claude/commands/hive-mind/hive-mind-memory.md",
        "filePath": "/.claude/commands/hive-mind/hive-mind-memory.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "hive",
          "mind",
          "memory"
        ],
        "description": "Command documentation for hive-mind-memory in category hive-mind."
      },
      {
        "id": "commands-hive-mind-hive-mind-metrics",
        "title": "hive-mind-metrics",
        "url": "/.claude/commands/hive-mind/hive-mind-metrics.md",
        "filePath": "/.claude/commands/hive-mind/hive-mind-metrics.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "hive",
          "mind",
          "metrics"
        ],
        "description": "Command documentation for hive-mind-metrics in category hive-mind."
      },
      {
        "id": "commands-hive-mind-hive-mind-resume",
        "title": "hive-mind-resume",
        "url": "/.claude/commands/hive-mind/hive-mind-resume.md",
        "filePath": "/.claude/commands/hive-mind/hive-mind-resume.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "hive",
          "mind",
          "resume"
        ],
        "description": "Command documentation for hive-mind-resume in category hive-mind."
      },
      {
        "id": "commands-hive-mind-hive-mind-sessions",
        "title": "hive-mind-sessions",
        "url": "/.claude/commands/hive-mind/hive-mind-sessions.md",
        "filePath": "/.claude/commands/hive-mind/hive-mind-sessions.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "hive",
          "mind",
          "sessions"
        ],
        "description": "Command documentation for hive-mind-sessions in category hive-mind."
      },
      {
        "id": "commands-hive-mind-hive-mind-spawn",
        "title": "hive-mind-spawn",
        "url": "/.claude/commands/hive-mind/hive-mind-spawn.md",
        "filePath": "/.claude/commands/hive-mind/hive-mind-spawn.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "hive",
          "mind",
          "spawn"
        ],
        "description": "Spawn a Hive Mind swarm with queen-led coordination."
      },
      {
        "id": "commands-hive-mind-hive-mind-status",
        "title": "hive-mind-status",
        "url": "/.claude/commands/hive-mind/hive-mind-status.md",
        "filePath": "/.claude/commands/hive-mind/hive-mind-status.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "hive",
          "mind",
          "status"
        ],
        "description": "Command documentation for hive-mind-status in category hive-mind."
      },
      {
        "id": "commands-hive-mind-hive-mind-stop",
        "title": "hive-mind-stop",
        "url": "/.claude/commands/hive-mind/hive-mind-stop.md",
        "filePath": "/.claude/commands/hive-mind/hive-mind-stop.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "hive",
          "mind",
          "stop"
        ],
        "description": "Command documentation for hive-mind-stop in category hive-mind."
      },
      {
        "id": "commands-hive-mind-hive-mind-wizard",
        "title": "hive-mind-wizard",
        "url": "/.claude/commands/hive-mind/hive-mind-wizard.md",
        "filePath": "/.claude/commands/hive-mind/hive-mind-wizard.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "hive",
          "mind",
          "wizard"
        ],
        "description": "Command documentation for hive-mind-wizard in category hive-mind."
      },
      {
        "id": "commands-hive-mind-hive-mind",
        "title": "hive-mind",
        "url": "/.claude/commands/hive-mind/hive-mind.md",
        "filePath": "/.claude/commands/hive-mind/hive-mind.md",
        "type": "markdown",
        "category": "Commands/Hive-mind",
        "tags": [
          "hive-mind",
          "command",
          "hive",
          "mind"
        ],
        "description": "Hive Mind collective intelligence system for advanced swarm coordination."
      }
    ]
  ],
  [
    "Commands/Hooks",
    [
      {
        "id": "commands-hooks-readme",
        "title": "Hooks Commands",
        "url": "/.claude/commands/hooks/README.md",
        "filePath": "/.claude/commands/hooks/README.md",
        "type": "markdown",
        "category": "Commands/Hooks",
        "tags": [
          "hooks",
          "command",
          "README"
        ],
        "description": "Commands for hooks operations in Claude Flow."
      },
      {
        "id": "commands-hooks-overview",
        "title": "Claude Code Hooks for claude-flow",
        "url": "/.claude/commands/hooks/overview.md",
        "filePath": "/.claude/commands/hooks/overview.md",
        "type": "markdown",
        "category": "Commands/Hooks",
        "tags": [
          "hooks",
          "command",
          "overview"
        ],
        "description": "Automatically coordinate, format, and learn from Claude Code operations using hooks with MCP tool integration."
      },
      {
        "id": "commands-hooks-post-edit",
        "title": "hook post-edit",
        "url": "/.claude/commands/hooks/post-edit.md",
        "filePath": "/.claude/commands/hooks/post-edit.md",
        "type": "markdown",
        "category": "Commands/Hooks",
        "tags": [
          "hooks",
          "command",
          "post",
          "edit"
        ],
        "description": "Execute post-edit processing including formatting, validation, and memory updates."
      },
      {
        "id": "commands-hooks-post-task",
        "title": "hook post-task",
        "url": "/.claude/commands/hooks/post-task.md",
        "filePath": "/.claude/commands/hooks/post-task.md",
        "type": "markdown",
        "category": "Commands/Hooks",
        "tags": [
          "hooks",
          "command",
          "post",
          "task"
        ],
        "description": "Execute post-task cleanup, performance analysis, and memory storage."
      },
      {
        "id": "commands-hooks-pre-edit",
        "title": "hook pre-edit",
        "url": "/.claude/commands/hooks/pre-edit.md",
        "filePath": "/.claude/commands/hooks/pre-edit.md",
        "type": "markdown",
        "category": "Commands/Hooks",
        "tags": [
          "hooks",
          "command",
          "pre",
          "edit"
        ],
        "description": "Execute pre-edit validations and agent assignment before file modifications."
      },
      {
        "id": "commands-hooks-pre-task",
        "title": "hook pre-task",
        "url": "/.claude/commands/hooks/pre-task.md",
        "filePath": "/.claude/commands/hooks/pre-task.md",
        "type": "markdown",
        "category": "Commands/Hooks",
        "tags": [
          "hooks",
          "command",
          "pre",
          "task"
        ],
        "description": "Execute pre-task preparations and context loading."
      },
      {
        "id": "commands-hooks-session-end",
        "title": "hook session-end",
        "url": "/.claude/commands/hooks/session-end.md",
        "filePath": "/.claude/commands/hooks/session-end.md",
        "type": "markdown",
        "category": "Commands/Hooks",
        "tags": [
          "hooks",
          "command",
          "session",
          "end"
        ],
        "description": "Cleanup and persist session state before ending work."
      },
      {
        "id": "commands-hooks-setup",
        "title": "Setting Up ruv-swarm Hooks",
        "url": "/.claude/commands/hooks/setup.md",
        "filePath": "/.claude/commands/hooks/setup.md",
        "type": "markdown",
        "category": "Commands/Hooks",
        "tags": [
          "hooks",
          "command",
          "setup"
        ],
        "description": "```bash"
      }
    ]
  ],
  [
    "Commands/Memory",
    [
      {
        "id": "commands-memory-readme",
        "title": "Memory Commands",
        "url": "/.claude/commands/memory/README.md",
        "filePath": "/.claude/commands/memory/README.md",
        "type": "markdown",
        "category": "Commands/Memory",
        "tags": [
          "memory",
          "command",
          "README"
        ],
        "description": "Commands for memory operations in Claude Flow."
      },
      {
        "id": "commands-memory-memory-persist",
        "title": "memory-persist",
        "url": "/.claude/commands/memory/memory-persist.md",
        "filePath": "/.claude/commands/memory/memory-persist.md",
        "type": "markdown",
        "category": "Commands/Memory",
        "tags": [
          "memory",
          "command",
          "persist"
        ],
        "description": "Persist memory across sessions."
      },
      {
        "id": "commands-memory-memory-search",
        "title": "memory-search",
        "url": "/.claude/commands/memory/memory-search.md",
        "filePath": "/.claude/commands/memory/memory-search.md",
        "type": "markdown",
        "category": "Commands/Memory",
        "tags": [
          "memory",
          "command",
          "search"
        ],
        "description": "Search through stored memory."
      },
      {
        "id": "commands-memory-memory-usage",
        "title": "memory-usage",
        "url": "/.claude/commands/memory/memory-usage.md",
        "filePath": "/.claude/commands/memory/memory-usage.md",
        "type": "markdown",
        "category": "Commands/Memory",
        "tags": [
          "memory",
          "command",
          "usage"
        ],
        "description": "Manage persistent memory storage."
      },
      {
        "id": "commands-memory-neural",
        "title": "Neural Pattern Training",
        "url": "/.claude/commands/memory/neural.md",
        "filePath": "/.claude/commands/memory/neural.md",
        "type": "markdown",
        "category": "Commands/Memory",
        "tags": [
          "memory",
          "command",
          "neural"
        ],
        "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
      },
      {
        "id": "commands-memory-usage",
        "title": "Memory Management",
        "url": "/.claude/commands/memory/usage.md",
        "filePath": "/.claude/commands/memory/usage.md",
        "type": "markdown",
        "category": "Commands/Memory",
        "tags": [
          "memory",
          "command",
          "usage"
        ],
        "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
      }
    ]
  ],
  [
    "Commands/Monitoring",
    [
      {
        "id": "commands-monitoring-readme",
        "title": "Monitoring Commands",
        "url": "/.claude/commands/monitoring/README.md",
        "filePath": "/.claude/commands/monitoring/README.md",
        "type": "markdown",
        "category": "Commands/Monitoring",
        "tags": [
          "monitoring",
          "command",
          "README"
        ],
        "description": "Commands for monitoring operations in Claude Flow."
      },
      {
        "id": "commands-monitoring-agent-metrics",
        "title": "agent-metrics",
        "url": "/.claude/commands/monitoring/agent-metrics.md",
        "filePath": "/.claude/commands/monitoring/agent-metrics.md",
        "type": "markdown",
        "category": "Commands/Monitoring",
        "tags": [
          "monitoring",
          "command",
          "agent",
          "metrics"
        ],
        "description": "View agent performance metrics."
      },
      {
        "id": "commands-monitoring-agents",
        "title": "List Active Patterns",
        "url": "/.claude/commands/monitoring/agents.md",
        "filePath": "/.claude/commands/monitoring/agents.md",
        "type": "markdown",
        "category": "Commands/Monitoring",
        "tags": [
          "monitoring",
          "command",
          "agents"
        ],
        "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
      },
      {
        "id": "commands-monitoring-real-time-view",
        "title": "real-time-view",
        "url": "/.claude/commands/monitoring/real-time-view.md",
        "filePath": "/.claude/commands/monitoring/real-time-view.md",
        "type": "markdown",
        "category": "Commands/Monitoring",
        "tags": [
          "monitoring",
          "command",
          "real",
          "time",
          "view"
        ],
        "description": "Real-time view of swarm activity."
      },
      {
        "id": "commands-monitoring-status",
        "title": "Check Coordination Status",
        "url": "/.claude/commands/monitoring/status.md",
        "filePath": "/.claude/commands/monitoring/status.md",
        "type": "markdown",
        "category": "Commands/Monitoring",
        "tags": [
          "monitoring",
          "command",
          "status"
        ],
        "description": "**This tool coordinates Claude Code's actions. It does NOT write code or create content.**"
      },
      {
        "id": "commands-monitoring-swarm-monitor",
        "title": "swarm-monitor",
        "url": "/.claude/commands/monitoring/swarm-monitor.md",
        "filePath": "/.claude/commands/monitoring/swarm-monitor.md",
        "type": "markdown",
        "category": "Commands/Monitoring",
        "tags": [
          "monitoring",
          "command",
          "swarm",
          "monitor"
        ],
        "description": "Real-time swarm monitoring."
      }
    ]
  ],
  [
    "Commands/Optimization",
    [
      {
        "id": "commands-optimization-readme",
        "title": "Optimization Commands",
        "url": "/.claude/commands/optimization/README.md",
        "filePath": "/.claude/commands/optimization/README.md",
        "type": "markdown",
        "category": "Commands/Optimization",
        "tags": [
          "optimization",
          "command",
          "README"
        ],
        "description": "Commands for optimization operations in Claude Flow."
      },
      {
        "id": "commands-optimization-auto-topology",
        "title": "Automatic Topology Selection",
        "url": "/.claude/commands/optimization/auto-topology.md",
        "filePath": "/.claude/commands/optimization/auto-topology.md",
        "type": "markdown",
        "category": "Commands/Optimization",
        "tags": [
          "optimization",
          "command",
          "auto",
          "topology"
        ],
        "description": "Automatically select the optimal swarm topology based on task complexity analysis."
      },
      {
        "id": "commands-optimization-cache-manage",
        "title": "cache-manage",
        "url": "/.claude/commands/optimization/cache-manage.md",
        "filePath": "/.claude/commands/optimization/cache-manage.md",
        "type": "markdown",
        "category": "Commands/Optimization",
        "tags": [
          "optimization",
          "command",
          "cache",
          "manage"
        ],
        "description": "Manage operation cache for performance."
      },
      {
        "id": "commands-optimization-parallel-execute",
        "title": "parallel-execute",
        "url": "/.claude/commands/optimization/parallel-execute.md",
        "filePath": "/.claude/commands/optimization/parallel-execute.md",
        "type": "markdown",
        "category": "Commands/Optimization",
        "tags": [
          "optimization",
          "command",
          "parallel",
          "execute"
        ],
        "description": "Execute tasks in parallel for maximum efficiency."
      },
      {
        "id": "commands-optimization-parallel-execution",
        "title": "Parallel Task Execution",
        "url": "/.claude/commands/optimization/parallel-execution.md",
        "filePath": "/.claude/commands/optimization/parallel-execution.md",
        "type": "markdown",
        "category": "Commands/Optimization",
        "tags": [
          "optimization",
          "command",
          "parallel",
          "execution"
        ],
        "description": "Execute independent subtasks in parallel for maximum efficiency."
      },
      {
        "id": "commands-optimization-topology-optimize",
        "title": "topology-optimize",
        "url": "/.claude/commands/optimization/topology-optimize.md",
        "filePath": "/.claude/commands/optimization/topology-optimize.md",
        "type": "markdown",
        "category": "Commands/Optimization",
        "tags": [
          "optimization",
          "command",
          "topology",
          "optimize"
        ],
        "description": "Optimize swarm topology for current workload."
      }
    ]
  ],
  [
    "Commands/Pair",
    [
      {
        "id": "commands-pair-commands",
        "title": "Pair Programming Commands Reference",
        "url": "/.claude/commands/pair/commands.md",
        "filePath": "/.claude/commands/pair/commands.md",
        "type": "markdown",
        "category": "Commands/Pair",
        "tags": [
          "pair",
          "command",
          "commands"
        ],
        "description": "Complete reference for all pair programming session commands."
      },
      {
        "id": "commands-pair-config",
        "title": "Pair Programming Configuration",
        "url": "/.claude/commands/pair/config.md",
        "filePath": "/.claude/commands/pair/config.md",
        "type": "markdown",
        "category": "Commands/Pair",
        "tags": [
          "pair",
          "command",
          "config"
        ],
        "description": "Complete configuration guide for pair programming sessions."
      },
      {
        "id": "commands-pair-examples",
        "title": "Pair Programming Examples",
        "url": "/.claude/commands/pair/examples.md",
        "filePath": "/.claude/commands/pair/examples.md",
        "type": "markdown",
        "category": "Commands/Pair",
        "tags": [
          "pair",
          "command",
          "examples"
        ],
        "description": "Real-world examples and scenarios for pair programming sessions."
      },
      {
        "id": "commands-pair-modes",
        "title": "Pair Programming Modes",
        "url": "/.claude/commands/pair/modes.md",
        "filePath": "/.claude/commands/pair/modes.md",
        "type": "markdown",
        "category": "Commands/Pair",
        "tags": [
          "pair",
          "command",
          "modes"
        ],
        "description": "Detailed guide to pair programming modes and their optimal use cases."
      },
      {
        "id": "commands-pair-session",
        "title": "Pair Programming Session Management",
        "url": "/.claude/commands/pair/session.md",
        "filePath": "/.claude/commands/pair/session.md",
        "type": "markdown",
        "category": "Commands/Pair",
        "tags": [
          "pair",
          "command",
          "session"
        ],
        "description": "Complete guide to managing pair programming sessions."
      },
      {
        "id": "commands-pair-start",
        "title": "pair --start",
        "url": "/.claude/commands/pair/start.md",
        "filePath": "/.claude/commands/pair/start.md",
        "type": "markdown",
        "category": "Commands/Pair",
        "tags": [
          "pair",
          "command",
          "start"
        ],
        "description": "Start a new pair programming session with AI assistance."
      }
    ]
  ],
  [
    "Commands/Sparc",
    [
      {
        "id": "commands-sparc-analyzer",
        "title": "SPARC Analyzer Mode",
        "url": "/.claude/commands/sparc/analyzer.md",
        "filePath": "/.claude/commands/sparc/analyzer.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "analyzer"
        ],
        "description": "Deep code and data analysis with batch processing capabilities."
      },
      {
        "id": "commands-sparc-architect",
        "title": "SPARC Architect Mode",
        "url": "/.claude/commands/sparc/architect.md",
        "filePath": "/.claude/commands/sparc/architect.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "architect"
        ],
        "description": "System design with Memory-based coordination for scalable architectures."
      },
      {
        "id": "commands-sparc-batch-executor",
        "title": "SPARC Batch Executor Mode",
        "url": "/.claude/commands/sparc/batch-executor.md",
        "filePath": "/.claude/commands/sparc/batch-executor.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "batch",
          "executor"
        ],
        "description": "Parallel task execution specialist using batch operations."
      },
      {
        "id": "commands-sparc-coder",
        "title": "SPARC Coder Mode",
        "url": "/.claude/commands/sparc/coder.md",
        "filePath": "/.claude/commands/sparc/coder.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "coder"
        ],
        "description": "Autonomous code generation with batch file operations."
      },
      {
        "id": "commands-sparc-debugger",
        "title": "SPARC Debugger Mode",
        "url": "/.claude/commands/sparc/debugger.md",
        "filePath": "/.claude/commands/sparc/debugger.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "debugger"
        ],
        "description": "Systematic debugging with TodoWrite and Memory integration."
      },
      {
        "id": "commands-sparc-designer",
        "title": "SPARC Designer Mode",
        "url": "/.claude/commands/sparc/designer.md",
        "filePath": "/.claude/commands/sparc/designer.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "designer"
        ],
        "description": "UI/UX design with Memory coordination for consistent experiences."
      },
      {
        "id": "commands-sparc-documenter",
        "title": "SPARC Documenter Mode",
        "url": "/.claude/commands/sparc/documenter.md",
        "filePath": "/.claude/commands/sparc/documenter.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "documenter"
        ],
        "description": "Documentation with batch file operations for comprehensive docs."
      },
      {
        "id": "commands-sparc-innovator",
        "title": "SPARC Innovator Mode",
        "url": "/.claude/commands/sparc/innovator.md",
        "filePath": "/.claude/commands/sparc/innovator.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "innovator"
        ],
        "description": "Creative problem solving with WebSearch and Memory integration."
      },
      {
        "id": "commands-sparc-memory-manager",
        "title": "SPARC Memory Manager Mode",
        "url": "/.claude/commands/sparc/memory-manager.md",
        "filePath": "/.claude/commands/sparc/memory-manager.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "memory",
          "manager"
        ],
        "description": "Knowledge management with Memory tools for persistent insights."
      },
      {
        "id": "commands-sparc-optimizer",
        "title": "SPARC Optimizer Mode",
        "url": "/.claude/commands/sparc/optimizer.md",
        "filePath": "/.claude/commands/sparc/optimizer.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "optimizer"
        ],
        "description": "Performance optimization with systematic analysis and improvements."
      },
      {
        "id": "commands-sparc-orchestrator",
        "title": "SPARC Orchestrator Mode",
        "url": "/.claude/commands/sparc/orchestrator.md",
        "filePath": "/.claude/commands/sparc/orchestrator.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "orchestrator"
        ],
        "description": "Multi-agent task orchestration with TodoWrite/TodoRead/Task/Memory using MCP tools."
      },
      {
        "id": "commands-sparc-researcher",
        "title": "SPARC Researcher Mode",
        "url": "/.claude/commands/sparc/researcher.md",
        "filePath": "/.claude/commands/sparc/researcher.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "researcher"
        ],
        "description": "Deep research with parallel WebSearch/WebFetch and Memory coordination."
      },
      {
        "id": "commands-sparc-reviewer",
        "title": "SPARC Reviewer Mode",
        "url": "/.claude/commands/sparc/reviewer.md",
        "filePath": "/.claude/commands/sparc/reviewer.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "reviewer"
        ],
        "description": "Code review using batch file analysis for comprehensive reviews."
      },
      {
        "id": "commands-sparc-sparc-modes",
        "title": "SPARC Modes Overview",
        "url": "/.claude/commands/sparc/sparc-modes.md",
        "filePath": "/.claude/commands/sparc/sparc-modes.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "modes"
        ],
        "description": "SPARC (Specification, Planning, Architecture, Review, Code) is a comprehensive development methodology with 17 specialized modes, all integrated with "
      },
      {
        "id": "commands-sparc-swarm-coordinator",
        "title": "SPARC Swarm Coordinator Mode",
        "url": "/.claude/commands/sparc/swarm-coordinator.md",
        "filePath": "/.claude/commands/sparc/swarm-coordinator.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "swarm",
          "coordinator"
        ],
        "description": "Specialized swarm management with batch coordination capabilities."
      },
      {
        "id": "commands-sparc-tdd",
        "title": "SPARC TDD Mode",
        "url": "/.claude/commands/sparc/tdd.md",
        "filePath": "/.claude/commands/sparc/tdd.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "tdd"
        ],
        "description": "Test-driven development with TodoWrite planning and comprehensive testing."
      },
      {
        "id": "commands-sparc-tester",
        "title": "SPARC Tester Mode",
        "url": "/.claude/commands/sparc/tester.md",
        "filePath": "/.claude/commands/sparc/tester.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "tester"
        ],
        "description": "Comprehensive testing with parallel execution capabilities."
      },
      {
        "id": "commands-sparc-workflow-manager",
        "title": "SPARC Workflow Manager Mode",
        "url": "/.claude/commands/sparc/workflow-manager.md",
        "filePath": "/.claude/commands/sparc/workflow-manager.md",
        "type": "markdown",
        "category": "Commands/Sparc",
        "tags": [
          "sparc",
          "command",
          "workflow",
          "manager"
        ],
        "description": "Process automation with TodoWrite planning and Task execution."
      }
    ]
  ],
  [
    "Commands/Stream-chain",
    [
      {
        "id": "commands-stream-chain-pipeline",
        "title": "stream-chain pipeline",
        "url": "/.claude/commands/stream-chain/pipeline.md",
        "filePath": "/.claude/commands/stream-chain/pipeline.md",
        "type": "markdown",
        "category": "Commands/Stream-chain",
        "tags": [
          "stream-chain",
          "command",
          "pipeline"
        ],
        "description": "Execute predefined pipelines for common development workflows."
      },
      {
        "id": "commands-stream-chain-run",
        "title": "stream-chain run",
        "url": "/.claude/commands/stream-chain/run.md",
        "filePath": "/.claude/commands/stream-chain/run.md",
        "type": "markdown",
        "category": "Commands/Stream-chain",
        "tags": [
          "stream-chain",
          "command",
          "run"
        ],
        "description": "Execute a custom stream chain with your own prompts."
      }
    ]
  ],
  [
    "Commands/Swarm",
    [
      {
        "id": "commands-swarm-readme",
        "title": "Swarm Commands",
        "url": "/.claude/commands/swarm/README.md",
        "filePath": "/.claude/commands/swarm/README.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "README"
        ],
        "description": "Commands for swarm operations in Claude Flow."
      },
      {
        "id": "commands-swarm-analysis",
        "title": "Analysis Swarm Strategy",
        "url": "/.claude/commands/swarm/analysis.md",
        "filePath": "/.claude/commands/swarm/analysis.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "analysis"
        ],
        "description": "Comprehensive analysis through distributed agent coordination."
      },
      {
        "id": "commands-swarm-development",
        "title": "Development Swarm Strategy",
        "url": "/.claude/commands/swarm/development.md",
        "filePath": "/.claude/commands/swarm/development.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "development"
        ],
        "description": "Coordinated development through specialized agent teams."
      },
      {
        "id": "commands-swarm-examples",
        "title": "Examples Swarm Strategy",
        "url": "/.claude/commands/swarm/examples.md",
        "filePath": "/.claude/commands/swarm/examples.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "examples"
        ],
        "description": "```javascript"
      },
      {
        "id": "commands-swarm-maintenance",
        "title": "Maintenance Swarm Strategy",
        "url": "/.claude/commands/swarm/maintenance.md",
        "filePath": "/.claude/commands/swarm/maintenance.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "maintenance"
        ],
        "description": "System maintenance and updates through coordinated agents."
      },
      {
        "id": "commands-swarm-optimization",
        "title": "Optimization Swarm Strategy",
        "url": "/.claude/commands/swarm/optimization.md",
        "filePath": "/.claude/commands/swarm/optimization.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "optimization"
        ],
        "description": "Performance optimization through specialized analysis."
      },
      {
        "id": "commands-swarm-research",
        "title": "Research Swarm Strategy",
        "url": "/.claude/commands/swarm/research.md",
        "filePath": "/.claude/commands/swarm/research.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "research"
        ],
        "description": "Deep research through parallel information gathering."
      },
      {
        "id": "commands-swarm-swarm-analysis",
        "title": "swarm-analysis",
        "url": "/.claude/commands/swarm/swarm-analysis.md",
        "filePath": "/.claude/commands/swarm/swarm-analysis.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "analysis"
        ],
        "description": "Command documentation for swarm-analysis in category swarm."
      },
      {
        "id": "commands-swarm-swarm-background",
        "title": "swarm-background",
        "url": "/.claude/commands/swarm/swarm-background.md",
        "filePath": "/.claude/commands/swarm/swarm-background.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "background"
        ],
        "description": "Command documentation for swarm-background in category swarm."
      },
      {
        "id": "commands-swarm-swarm-init",
        "title": "swarm-init",
        "url": "/.claude/commands/swarm/swarm-init.md",
        "filePath": "/.claude/commands/swarm/swarm-init.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "init"
        ],
        "description": "Initialize a new swarm with specified topology."
      },
      {
        "id": "commands-swarm-swarm-modes",
        "title": "swarm-modes",
        "url": "/.claude/commands/swarm/swarm-modes.md",
        "filePath": "/.claude/commands/swarm/swarm-modes.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "modes"
        ],
        "description": "Command documentation for swarm-modes in category swarm."
      },
      {
        "id": "commands-swarm-swarm-monitor",
        "title": "swarm-monitor",
        "url": "/.claude/commands/swarm/swarm-monitor.md",
        "filePath": "/.claude/commands/swarm/swarm-monitor.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "monitor"
        ],
        "description": "Command documentation for swarm-monitor in category swarm."
      },
      {
        "id": "commands-swarm-swarm-spawn",
        "title": "swarm-spawn",
        "url": "/.claude/commands/swarm/swarm-spawn.md",
        "filePath": "/.claude/commands/swarm/swarm-spawn.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "spawn"
        ],
        "description": "Spawn agents in the swarm."
      },
      {
        "id": "commands-swarm-swarm-status",
        "title": "swarm-status",
        "url": "/.claude/commands/swarm/swarm-status.md",
        "filePath": "/.claude/commands/swarm/swarm-status.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "status"
        ],
        "description": "Command documentation for swarm-status in category swarm."
      },
      {
        "id": "commands-swarm-swarm-strategies",
        "title": "swarm-strategies",
        "url": "/.claude/commands/swarm/swarm-strategies.md",
        "filePath": "/.claude/commands/swarm/swarm-strategies.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "strategies"
        ],
        "description": "Command documentation for swarm-strategies in category swarm."
      },
      {
        "id": "commands-swarm-swarm",
        "title": "swarm",
        "url": "/.claude/commands/swarm/swarm.md",
        "filePath": "/.claude/commands/swarm/swarm.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command"
        ],
        "description": "Main swarm orchestration command for Claude Flow."
      },
      {
        "id": "commands-swarm-testing",
        "title": "Testing Swarm Strategy",
        "url": "/.claude/commands/swarm/testing.md",
        "filePath": "/.claude/commands/swarm/testing.md",
        "type": "markdown",
        "category": "Commands/Swarm",
        "tags": [
          "swarm",
          "command",
          "testing"
        ],
        "description": "Comprehensive testing through distributed execution."
      }
    ]
  ],
  [
    "Commands/Training",
    [
      {
        "id": "commands-training-readme",
        "title": "Training Commands",
        "url": "/.claude/commands/training/README.md",
        "filePath": "/.claude/commands/training/README.md",
        "type": "markdown",
        "category": "Commands/Training",
        "tags": [
          "training",
          "command",
          "README"
        ],
        "description": "Commands for training operations in Claude Flow."
      },
      {
        "id": "commands-training-model-update",
        "title": "model-update",
        "url": "/.claude/commands/training/model-update.md",
        "filePath": "/.claude/commands/training/model-update.md",
        "type": "markdown",
        "category": "Commands/Training",
        "tags": [
          "training",
          "command",
          "model",
          "update"
        ],
        "description": "Update neural models with new data."
      },
      {
        "id": "commands-training-neural-patterns",
        "title": "Neural Pattern Training",
        "url": "/.claude/commands/training/neural-patterns.md",
        "filePath": "/.claude/commands/training/neural-patterns.md",
        "type": "markdown",
        "category": "Commands/Training",
        "tags": [
          "training",
          "command",
          "neural",
          "patterns"
        ],
        "description": "Continuously improve coordination through neural network learning."
      },
      {
        "id": "commands-training-neural-train",
        "title": "neural-train",
        "url": "/.claude/commands/training/neural-train.md",
        "filePath": "/.claude/commands/training/neural-train.md",
        "type": "markdown",
        "category": "Commands/Training",
        "tags": [
          "training",
          "command",
          "neural",
          "train"
        ],
        "description": "Train neural patterns from operations."
      },
      {
        "id": "commands-training-pattern-learn",
        "title": "pattern-learn",
        "url": "/.claude/commands/training/pattern-learn.md",
        "filePath": "/.claude/commands/training/pattern-learn.md",
        "type": "markdown",
        "category": "Commands/Training",
        "tags": [
          "training",
          "command",
          "pattern",
          "learn"
        ],
        "description": "Learn patterns from successful operations."
      },
      {
        "id": "commands-training-specialization",
        "title": "Agent Specialization Training",
        "url": "/.claude/commands/training/specialization.md",
        "filePath": "/.claude/commands/training/specialization.md",
        "type": "markdown",
        "category": "Commands/Training",
        "tags": [
          "training",
          "command",
          "specialization"
        ],
        "description": "Train agents to become experts in specific domains for better performance."
      }
    ]
  ],
  [
    "Commands/Truth",
    [
      {
        "id": "commands-truth-start",
        "title": "📊 Truth Command",
        "url": "/.claude/commands/truth/start.md",
        "filePath": "/.claude/commands/truth/start.md",
        "type": "markdown",
        "category": "Commands/Truth",
        "tags": [
          "truth",
          "command",
          "start"
        ],
        "description": "View truth scores and reliability metrics for your codebase and agent tasks."
      }
    ]
  ],
  [
    "Commands/Verify",
    [
      {
        "id": "commands-verify-check",
        "title": "verify check",
        "url": "/.claude/commands/verify/check.md",
        "filePath": "/.claude/commands/verify/check.md",
        "type": "markdown",
        "category": "Commands/Verify",
        "tags": [
          "verify",
          "command",
          "check"
        ],
        "description": "Run verification checks on code, tasks, or agent outputs."
      },
      {
        "id": "commands-verify-start",
        "title": "🔍 Verification Commands",
        "url": "/.claude/commands/verify/start.md",
        "filePath": "/.claude/commands/verify/start.md",
        "type": "markdown",
        "category": "Commands/Verify",
        "tags": [
          "verify",
          "command",
          "start"
        ],
        "description": "Truth verification system for ensuring code quality and correctness with a 0.95 accuracy threshold."
      }
    ]
  ],
  [
    "Commands/Workflows",
    [
      {
        "id": "commands-workflows-readme",
        "title": "Workflows Commands",
        "url": "/.claude/commands/workflows/README.md",
        "filePath": "/.claude/commands/workflows/README.md",
        "type": "markdown",
        "category": "Commands/Workflows",
        "tags": [
          "workflows",
          "command",
          "README"
        ],
        "description": "Commands for workflows operations in Claude Flow."
      },
      {
        "id": "commands-workflows-development",
        "title": "Development Workflow Coordination",
        "url": "/.claude/commands/workflows/development.md",
        "filePath": "/.claude/commands/workflows/development.md",
        "type": "markdown",
        "category": "Commands/Workflows",
        "tags": [
          "workflows",
          "command",
          "development"
        ],
        "description": "Structure Claude Code's approach to complex development tasks for maximum efficiency."
      },
      {
        "id": "commands-workflows-research",
        "title": "Research Workflow Coordination",
        "url": "/.claude/commands/workflows/research.md",
        "filePath": "/.claude/commands/workflows/research.md",
        "type": "markdown",
        "category": "Commands/Workflows",
        "tags": [
          "workflows",
          "command",
          "research"
        ],
        "description": "Coordinate Claude Code's research activities for comprehensive, systematic exploration."
      },
      {
        "id": "commands-workflows-workflow-create",
        "title": "workflow-create",
        "url": "/.claude/commands/workflows/workflow-create.md",
        "filePath": "/.claude/commands/workflows/workflow-create.md",
        "type": "markdown",
        "category": "Commands/Workflows",
        "tags": [
          "workflows",
          "command",
          "workflow",
          "create"
        ],
        "description": "Create reusable workflow templates."
      },
      {
        "id": "commands-workflows-workflow-execute",
        "title": "workflow-execute",
        "url": "/.claude/commands/workflows/workflow-execute.md",
        "filePath": "/.claude/commands/workflows/workflow-execute.md",
        "type": "markdown",
        "category": "Commands/Workflows",
        "tags": [
          "workflows",
          "command",
          "workflow",
          "execute"
        ],
        "description": "Execute saved workflows."
      },
      {
        "id": "commands-workflows-workflow-export",
        "title": "workflow-export",
        "url": "/.claude/commands/workflows/workflow-export.md",
        "filePath": "/.claude/commands/workflows/workflow-export.md",
        "type": "markdown",
        "category": "Commands/Workflows",
        "tags": [
          "workflows",
          "command",
          "workflow",
          "export"
        ],
        "description": "Export workflows for sharing."
      }
    ]
  ]
]
);
