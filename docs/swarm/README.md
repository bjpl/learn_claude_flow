# Swarm Directory

Documentation and artifacts related to swarm coordination, agent orchestration, and distributed task execution.

## Structure

### Coordination
`coordination/` - Swarm coordination plans, task orchestration, and agent communication patterns

### Memory
`memory/` - Shared memory stores, cross-session persistence, and agent state management

### Plans
Swarm coordination plans and execution strategies

## What is Swarm Coordination?

Swarm coordination refers to the orchestration of multiple AI agents working together to accomplish complex tasks. This includes:

- **Agent Spawning** - Creating specialized agents for specific tasks
- **Task Distribution** - Intelligently dividing work among agents
- **Communication** - Enabling agents to share information and coordinate
- **Memory Sharing** - Maintaining shared context across agents
- **Result Aggregation** - Combining outputs from multiple agents

## Key Concepts

### Topologies
- **Hierarchical** - Tree-based command structure
- **Mesh** - Peer-to-peer agent communication
- **Ring** - Circular communication pattern
- **Star** - Centralized coordinator with spoke agents

### Memory Management
- Cross-session persistence
- Shared state and context
- Agent communication logs
- Task execution history

### Coordination Patterns
- Pre-task hooks (preparation)
- Post-task hooks (cleanup)
- Real-time monitoring
- Error recovery

## Usage

Swarm coordination is managed via:
- Claude Flow MCP tools
- Coordination hooks
- Memory stores
- Task orchestration APIs

## Best Practices

1. **Choose appropriate topology** for task complexity
2. **Monitor agent health** and performance
3. **Use memory** for cross-agent coordination
4. **Handle failures gracefully** with recovery mechanisms
5. **Document** swarm strategies for reuse
