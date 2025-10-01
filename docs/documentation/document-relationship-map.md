# Document Relationship Map

## Overview

This document visualizes the relationships between the 24 PDF documentation files based on shared keywords and topics.

## Relationship Strength Key

- **Very Strong (20+)**: Deep topical overlap, likely complementary sections
- **Strong (15-19)**: Significant shared content, related functionality
- **Moderate (10-14)**: Common themes, may reference similar concepts
- **Weak (5-9)**: Some keyword overlap, loosely related

## Top 20 Document Relationships

### Tier 1: Very Strong Relationships (20+)

#### 1. documentation-17.pdf ↔ documentation-22.pdf
**Strength**: 22 | **Category**: Troubleshooting & Performance

**Common Keywords** (12):
- session, performance, json, database, monitoring
- type, api, security, authentication, query
- typescript, node

**Common Topics** (5):
- Troubleshooting, Common Issues, Performance, JSON, Database

**Context**: Both documents focus on operational concerns - troubleshooting issues and optimizing performance. Strong overlap in technical infrastructure topics.

---

#### 2. documentation-3.pdf ↔ documentation-5.pdf
**Strength**: 21 | **Category**: Advanced Features & Configuration

**Common Keywords** (13):
- performance, api, testing, type, security
- schema, database, validation, monitoring
- authentication, model, error, npm

**Common Topics** (4):
- Performance, API, Testing, Type

**Context**: Advanced functionality and configuration settings. These documents likely cover feature implementation and system setup.

---

### Tier 2: Strong Relationships (15-19)

#### 3. documentation-10.pdf ↔ documentation-23.pdf
**Strength**: 19 | **Category**: Training & Performance

**Common Keywords** (9):
- javascript, performance, model, type, json
- deployment, monitoring, security, error

**Common Topics** (5):
- Training Pipeline, JavaScript, Performance, Model, Type

**Context**: Focus on model training and JavaScript implementation details.

---

#### 4. documentation-12.pdf ↔ documentation-22.pdf
**Strength**: 19 | **Category**: Types & Performance

**Common Keywords** (11):
- type, json, javascript, performance, monitoring
- error, session, database, testing, security, authentication

**Common Topics** (4):
- Type, JSON, JavaScript, Performance

**Context**: Technical implementation details and data handling.

---

#### 5. documentation-14.pdf ↔ documentation-15.pdf
**Strength**: 19 | **Category**: Error Handling & Deployment

**Common Keywords** (13):
- error, type, websocket, json, session
- deployment, javascript, docker, api, class
- authentication, http, node

**Common Topics** (3):
- Error, Type, JSON

**Context**: System deployment and error management strategies.

---

#### 6. documentation-2.pdf ↔ documentation-3.pdf
**Strength**: 18 | **Category**: Configuration & Performance

**Common Keywords** (12):
- npm, configuration, validation, performance, type
- security, error, monitoring, testing, api
- model, javascript

**Common Topics** (3):
- Configuration, Performance, Type

**Context**: Setup, configuration, and performance optimization.

---

#### 7. documentation-10.pdf ↔ documentation-22.pdf
**Strength**: 17 | **Category**: JavaScript Performance

**Common Keywords** (11):
- javascript, performance, model, type, api
- typescript, json, monitoring, security
- database, error

**Common Topics** (3):
- JavaScript, Performance, Type

**Context**: JavaScript-specific performance considerations.

---

#### 8. documentation-13.pdf ↔ documentation-15.pdf
**Strength**: 17 | **Category**: JSON & Error Handling

**Common Keywords** (13):
- json, performance, error, session, model
- websocket, type, validation, deployment
- security, api, configuration, javascript

**Common Topics** (2):
- JSON, Error

**Context**: Data format handling and error management.

---

#### 9. documentation-15.pdf ↔ documentation-5.pdf
**Strength**: 17 | **Category**: API & Security

**Common Keywords** (13):
- json, api, type, error, docker
- security, validation, authentication, model
- monitoring, performance, deployment, rest

**Common Topics** (2):
- API, Type

**Context**: API design and security implementation.

---

#### 10. documentation-15.pdf ↔ documentation-8.pdf
**Strength**: 17 | **Category**: API & JSON

**Common Keywords** (11):
- json, api, type, error, security
- validation, model, performance, deployment
- node, configuration

**Common Topics** (3):
- JSON, API, Type

**Context**: API implementation and JSON data handling.

---

### Tier 3: Moderate Relationships (10-14)

#### 11-20. Additional Strong Connections

11. **doc-14 ↔ doc-22** (Strength: 16) - Error handling & monitoring
12. **doc-15 ↔ doc-19** (Strength: 16) - Deployment & configuration
13. **doc-3 ↔ doc-8** (Strength: 16) - API & performance
14. **doc-13 ↔ doc-19** (Strength: 16) - Session & performance
15. **doc-5 ↔ doc-8** (Strength: 16) - API & security
16. **doc-15 ↔ doc-22** (Strength: 16) - Error & performance
17. **doc-5 ↔ doc-19** (Strength: 15) - API & monitoring
18. **doc-14 ↔ doc-19** (Strength: 15) - Deployment & error handling
19. **doc-2 ↔ doc-19** (Strength: 15) - Configuration & monitoring
20. **doc-13 ↔ doc-14** (Strength: 15) - JSON & error handling

---

## Document Clusters

Based on relationship analysis, documents naturally cluster into these groups:

### Cluster 1: Core Functionality (docs 1-4)
**Focus**: Basic commands, core features, getting started
- documentation-1.pdf: Quick start & basic commands
- documentation-2.pdf: Configuration & setup
- documentation-3.pdf: Advanced features
- documentation-4.pdf: Command reference

**Key Topics**: Commands, API, configuration, basic usage

---

### Cluster 2: Advanced Features (docs 5-8)
**Focus**: Advanced configuration, plugins, extensibility
- documentation-5.pdf: API integration
- documentation-6.pdf: Plugin system
- documentation-7.pdf: Advanced configuration
- documentation-8.pdf: Extension development

**Key Topics**: API, plugins, security, validation

---

### Cluster 3: Performance & Training (docs 9-13)
**Focus**: Model training, optimization, performance tuning
- documentation-9.pdf: Performance basics
- documentation-10.pdf: Training pipelines
- documentation-11.pdf: Optimization strategies
- documentation-12.pdf: Type systems
- documentation-13.pdf: Session management

**Key Topics**: Performance, model, training, optimization

---

### Cluster 4: Deployment & Operations (docs 14-19)
**Focus**: Production deployment, error handling, monitoring
- documentation-14.pdf: Error handling
- documentation-15.pdf: Deployment strategies
- documentation-16.pdf: Docker & containers
- documentation-17.pdf: Troubleshooting
- documentation-18.pdf: Monitoring setup
- documentation-19.pdf: Production operations

**Key Topics**: Deployment, error, monitoring, docker, websocket

---

### Cluster 5: Troubleshooting & Reference (docs 20-24)
**Focus**: Problem solving, FAQs, API reference
- documentation-20.pdf: Common issues
- documentation-21.pdf: FAQ
- documentation-22.pdf: Advanced troubleshooting
- documentation-23.pdf: Performance debugging
- documentation-24.pdf: API reference

**Key Topics**: Troubleshooting, debugging, reference, FAQ

---

## Relationship Network Visualization

```
[Core Functionality]
    ├─ doc-1 ──────┐
    ├─ doc-2 ──────┼─── Strong ────┐
    ├─ doc-3 ──────┤              │
    └─ doc-4       │              │
                   │              ▼
[Advanced Features]│        [Performance]
    ├─ doc-5 ──────┤         ├─ doc-9
    ├─ doc-6       │         ├─ doc-10 ────┐
    ├─ doc-7       │         ├─ doc-11     │
    └─ doc-8 ──────┘         ├─ doc-12     │ Very Strong
                             └─ doc-13     │
                                           │
[Deployment]                               │
    ├─ doc-14 ─────────┐                  │
    ├─ doc-15 ─────────┼─── Strong ───────┤
    ├─ doc-16          │                  │
    ├─ doc-17 ─────────┤                  │
    ├─ doc-18          │                  │
    └─ doc-19 ─────────┘                  │
                                           │
[Troubleshooting]                          │
    ├─ doc-20                             │
    ├─ doc-21                             │
    ├─ doc-22 ────────────────────────────┘
    ├─ doc-23 ────┘
    └─ doc-24
```

---

## Cross-Cluster Connections

### Primary Bridges (connecting different clusters)

1. **doc-3 ↔ doc-5** (21) - Bridges Core → Advanced Features
2. **doc-10 ↔ doc-23** (19) - Bridges Performance → Troubleshooting
3. **doc-15 ↔ doc-5** (17) - Bridges Deployment → Advanced Features
4. **doc-17 ↔ doc-22** (22) - Bridges Deployment → Troubleshooting

These documents serve as "hub" documents that connect different functional areas.

---

## Usage Recommendations

### For New Users
Start with **Cluster 1** (docs 1-4) for core functionality, then move to specific areas based on needs.

### For Advanced Users
Focus on **Cluster 2** (docs 5-8) for extensibility and **Cluster 3** (docs 9-13) for performance.

### For Operations Teams
Prioritize **Cluster 4** (docs 14-19) for deployment and **Cluster 5** (docs 20-24) for troubleshooting.

### For Developers
Study strong relationships to understand:
- How features interact (high keyword overlap)
- Configuration dependencies (shared topics)
- Integration points (bridge documents)

---

## Methodology

Relationships were calculated based on:

1. **Common Keywords**: Technical terms appearing in both documents
2. **Common Topics**: Shared subject areas from heading analysis
3. **Strength Score**: `(common_keywords + common_topics × 2)`

Higher scores indicate stronger topical alignment and potential dependencies.

---

## Files Reference

- **Content Index**: `docs/content-index.json` (complete relationship data)
- **Summary**: `docs/content-analysis-summary.md` (overview)
- **Metadata**: `docs/analysis-metadata.json` (statistics)
- **This Document**: `docs/document-relationship-map.md` (visualization)

---

**Generated**: 2025-09-30 | **Total Relationships**: 276 | **Documents**: 24
