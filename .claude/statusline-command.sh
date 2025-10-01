#!/bin/bash

# Claude Code Status Line with Claude-Flow Integration
# Displays model, directory, git branch, and real-time swarm metrics

# Read JSON input from stdin
INPUT=$(cat)
MODEL=$(echo "$INPUT" | jq -r '.model.display_name // "Claude"')
CWD=$(echo "$INPUT" | jq -r '.workspace.current_dir // .cwd')
DIR=$(basename "$CWD")

# Replace claude-code-flow with branded name
if [ "$DIR" = "claude-code-flow" ]; then
  DIR="🌊 Claude Flow"
fi

# Get git branch
BRANCH=$(cd "$CWD" 2>/dev/null && git branch --show-current 2>/dev/null)

# Start building statusline
echo -ne "\033[1m$MODEL\033[0m in \033[36m$DIR\033[0m"
[ -n "$BRANCH" ] && echo -ne " on \033[33m⎇ $BRANCH\033[0m"

# Claude-Flow integration
FLOW_DIR="$CWD/.claude-flow"

if [ -d "$FLOW_DIR" ]; then
  echo -ne " │"

  # Swarm Configuration & Topology
  if [ -f "$FLOW_DIR/swarm-config.json" ]; then
    STRATEGY=$(jq -r '.defaultStrategy // empty' "$FLOW_DIR/swarm-config.json" 2>/dev/null)
    if [ -n "$STRATEGY" ]; then
      case "$STRATEGY" in
        "balanced") TOPO_ICON="⚡mesh" ;;
        "conservative") TOPO_ICON="⚡hier" ;;
        "aggressive") TOPO_ICON="⚡ring" ;;
        *) TOPO_ICON="⚡$STRATEGY" ;;
      esac
      echo -ne " \033[35m$TOPO_ICON\033[0m"

      AGENT_COUNT=$(jq -r '.agentProfiles | length' "$FLOW_DIR/swarm-config.json" 2>/dev/null)
      if [ -n "$AGENT_COUNT" ] && [ "$AGENT_COUNT" != "null" ] && [ "$AGENT_COUNT" -gt 0 ]; then
        echo -ne "  \033[35m🤖 $AGENT_COUNT\033[0m"
      fi
    fi
  fi

  # Real-time System Metrics
  if [ -f "$FLOW_DIR/metrics/system-metrics.json" ]; then
    LATEST=$(jq -r '.[-1]' "$FLOW_DIR/metrics/system-metrics.json" 2>/dev/null)

    if [ -n "$LATEST" ] && [ "$LATEST" != "null" ]; then
      MEM_PERCENT=$(echo "$LATEST" | jq -r '.memoryUsagePercent // 0' | awk '{printf "%.0f", $1}')
      if [ -n "$MEM_PERCENT" ] && [ "$MEM_PERCENT" != "null" ]; then
        if [ "$MEM_PERCENT" -lt 60 ]; then
          MEM_COLOR="\033[32m"
        elif [ "$MEM_PERCENT" -lt 80 ]; then
          MEM_COLOR="\033[33m"
        else
          MEM_COLOR="\033[31m"
        fi
        echo -ne "  ${MEM_COLOR}💾 ${MEM_PERCENT}%\033[0m"
      fi

      CPU_LOAD=$(echo "$LATEST" | jq -r '.cpuLoad // 0' | awk '{printf "%.0f", $1 * 100}')
      if [ -n "$CPU_LOAD" ] && [ "$CPU_LOAD" != "null" ]; then
        if [ "$CPU_LOAD" -lt 50 ]; then
          CPU_COLOR="\033[32m"
        elif [ "$CPU_LOAD" -lt 75 ]; then
          CPU_COLOR="\033[33m"
        else
          CPU_COLOR="\033[31m"
        fi
        echo -ne "  ${CPU_COLOR}⚙ ${CPU_LOAD}%\033[0m"
      fi
    fi
  fi

  # Performance Metrics
  if [ -f "$FLOW_DIR/metrics/task-metrics.json" ]; then
    METRICS=$(jq -r '
      (map(select(.success == true)) | length) as $successful |
      (length) as $total |
      (if $total > 0 then ($successful / $total * 100) else 0 end) as $success_rate |
      (map(.duration // 0) | add / length) as $avg_duration |
      (reverse | reduce .[] as $task (0; if $task.success == true then . + 1 else 0 end)) as $streak |
      { success_rate: $success_rate, avg_duration: $avg_duration, streak: $streak, total: $total } | @json
    ' "$FLOW_DIR/metrics/task-metrics.json" 2>/dev/null)

    if [ -n "$METRICS" ] && [ "$METRICS" != "null" ]; then
      SUCCESS_RATE=$(echo "$METRICS" | jq -r '.success_rate // 0' | awk '{printf "%.0f", $1}')
      TOTAL_TASKS=$(echo "$METRICS" | jq -r '.total // 0')

      if [ -n "$SUCCESS_RATE" ] && [ "$TOTAL_TASKS" -gt 0 ]; then
        if [ "$SUCCESS_RATE" -gt 80 ]; then
          SUCCESS_COLOR="\033[32m"
        elif [ "$SUCCESS_RATE" -ge 60 ]; then
          SUCCESS_COLOR="\033[33m"
        else
          SUCCESS_COLOR="\033[31m"
        fi
        echo -ne "  ${SUCCESS_COLOR}🎯 ${SUCCESS_RATE}%\033[0m"
      fi

      AVG_TIME=$(echo "$METRICS" | jq -r '.avg_duration // 0')
      if [ -n "$AVG_TIME" ] && [ "$TOTAL_TASKS" -gt 0 ]; then
        if [ $(echo "$AVG_TIME < 60" | bc -l 2>/dev/null || echo 0) -eq 1 ]; then
          TIME_STR=$(echo "$AVG_TIME" | awk '{printf "%.1fs", $1}')
        elif [ $(echo "$AVG_TIME < 3600" | bc -l 2>/dev/null || echo 0) -eq 1 ]; then
          TIME_STR=$(echo "$AVG_TIME" | awk '{printf "%.1fm", $1/60}')
        else
          TIME_STR=$(echo "$AVG_TIME" | awk '{printf "%.1fh", $1/3600}')
        fi
        echo -ne "  \033[36m⏱️  $TIME_STR\033[0m"
      fi

      STREAK=$(echo "$METRICS" | jq -r '.streak // 0')
      if [ -n "$STREAK" ] && [ "$STREAK" -gt 0 ]; then
        echo -ne "  \033[91m🔥 $STREAK\033[0m"
      fi
    fi
  fi

  # Active Tasks
  if [ -d "$FLOW_DIR/tasks" ]; then
    TASK_COUNT=$(find "$FLOW_DIR/tasks" -name "*.json" -type f 2>/dev/null | wc -l)
    if [ "$TASK_COUNT" -gt 0 ]; then
      echo -ne "  \033[36m📋 $TASK_COUNT\033[0m"
    fi
  fi
fi

echo
