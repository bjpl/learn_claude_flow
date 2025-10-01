# Learn Claude Flow - Directory Structure

Complete directory structure documentation after organization cleanup (October 2025).

## Overview

This project follows a clean, modular architecture with clear separation of concerns. All files are organized into logical directories with no misplaced files in the root.

## Root Directory

```
/
├── .claude/              # Claude Code configuration and agents
├── .claude-flow/         # Claude Flow metrics and data
├── .github/              # GitHub workflows and templates
├── .hive-mind/           # Hive mind coordination data
├── .swarm/               # Swarm memory and coordination
├── .vscode/              # VSCode workspace settings
├── config/               # Build and development configuration
├── dist/                 # Build output (generated)
├── docs/                 # Project documentation
├── docs-viewer/          # Documentation viewer subproject
├── node_modules/         # Dependencies (generated)
├── public/               # Static assets
├── scripts/              # Build and utility scripts
├── src/                  # Source code
├── .env                  # Environment variables (gitignored)
├── .env.example          # Environment template
├── .eslintrc.cjs         # ESLint configuration
├── .gitignore            # Git ignore patterns
├── .mcp.json             # MCP configuration
├── CLAUDE.md             # Claude Code instructions
├── README.md             # Project readme
├── claude-flow           # Claude Flow executable
├── index.html            # Entry HTML file
├── package.json          # NPM dependencies and scripts
├── package-lock.json     # NPM lock file
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig*.json        # TypeScript configuration
```

## Configuration (`/config`)

Build and development configuration files.

```
config/
├── package.json          # Legacy config package.json
├── tsconfig.json         # TypeScript config for tools
├── tsconfig.node.json    # TypeScript config for Node scripts
├── vite.config.ts        # Vite build configuration
├── vitest.config.ts      # Vitest test configuration
└── README.md             # Configuration documentation
```

**Purpose**: Centralizes all build tool configuration for easy management and updates.

## Source Code (`/src`)

All application source code organized by feature and function.

```
src/
├── assets/               # Static assets (images, fonts)
├── components/           # React components
│   ├── accessibility/    # Accessibility features
│   ├── seo/              # SEO components
│   ├── skeletons/        # Loading skeletons
│   └── ui/               # UI component library
├── data/                 # Static data and content
├── design-system/        # Design system tokens and utilities
│   └── tokens/           # Design tokens (colors, spacing, etc.)
├── examples/             # Usage examples and demos
│   ├── accessibility/    # Accessibility examples
│   └── *.tsx             # Component examples
├── hooks/                # Custom React hooks
│   └── routing/          # Routing-specific hooks
├── layouts/              # Layout components
├── router/               # Routing configuration
├── search/               # Search functionality
├── store/                # Redux Toolkit store (main state)
│   ├── hooks/            # Redux hooks
│   └── slices/           # Redux slices
├── stores/               # Zustand stores (specialized state)
├── styles/               # Global styles and CSS
├── tests/                # Test files
│   ├── accessibility/    # Accessibility tests
│   ├── components/       # Component tests
│   ├── documentation/    # Documentation tests
│   ├── e2e/              # End-to-end tests
│   ├── integration/      # Integration tests
│   ├── performance/      # Performance tests
│   ├── unit/             # Unit tests
│   ├── utils/            # Test utilities
│   ├── __tests__/        # Additional test files
│   └── setup.ts          # Test setup and configuration
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   ├── accessibility/    # Accessibility utilities
│   └── documentation/    # Documentation utilities
├── views/                # Page/view components
├── App.css               # App component styles
├── App.tsx               # Main App component
├── index.css             # Global CSS
└── main.tsx              # Application entry point
```

### Key Directories

**`components/`** - Reusable React components organized by feature
- `accessibility/` - ARIA, keyboard navigation, screen reader support
- `seo/` - SEO-optimized components
- `skeletons/` - Loading state components
- `ui/` - Core UI component library

**`store/` vs `stores/`** - Two separate state management systems
- `store/` - Redux Toolkit for complex global state
- `stores/` - Zustand for simpler, specialized state (document store)

**`tests/`** - Comprehensive test suite (consolidated from root)
- All test files organized by test type
- Includes setup and utilities
- Previously scattered across root and src

**`examples/`** - Component examples and demonstrations (consolidated from root)
- Living documentation
- Developer reference
- Testing playground

## Documentation (`/docs`)

Project documentation organized by category.

```
docs/
├── accessibility/        # Accessibility documentation
├── architecture/         # System architecture docs
├── components/           # Component documentation
├── design-system/        # Design system documentation
├── documentation/        # General documentation
├── evaluation/           # Evaluation and assessment docs
├── guides/               # Step-by-step guides
│   └── README.md         # Guides overview
├── implementation/       # Implementation docs
├── migration/            # Migration guides
├── performance/          # Performance documentation
├── planning/             # Project planning docs
│   └── README.md         # Planning overview
├── project/              # Project-wide documentation
│   └── DIRECTORY_STRUCTURE.md  # This file
├── reports/              # Project reports
│   └── README.md         # Reports overview
├── reviews/              # Code and design reviews
├── seo/                  # SEO documentation
├── swarm/                # Swarm coordination docs
│   ├── coordination/     # Coordination plans
│   ├── memory/           # Memory management
│   └── README.md         # Swarm overview
├── testing/              # Testing documentation
├── ux/                   # UX documentation
├── validation/           # Validation documentation
├── README.md             # Documentation index
└── USAGE.md              # Usage instructions
```

### Documentation Organization

**Before Cleanup**: 41 loose markdown files in `/docs` root
**After Cleanup**: Files organized into 10+ subdirectories by category

Key improvements:
- Reports in `/docs/reports/`
- Guides in `/docs/guides/`
- Planning in `/docs/planning/`
- Swarm docs in `/docs/swarm/`
- Each category has explanatory README.md

## Scripts (`/scripts`)

Build, extraction, and utility scripts.

```
scripts/
├── extractDocumentation.ts  # Documentation extraction
├── extractPdfContent.js     # PDF content extraction
└── [other utility scripts]
```

## Public Assets (`/public`)

Static assets served directly.

```
public/
└── [static assets]
```

## GitHub Configuration (`.github/`)

CI/CD workflows and GitHub templates.

```
.github/
└── workflows/
    └── deploy.yml       # Deployment workflow
```

## Claude Configuration (`.claude/`)

Claude Code agent definitions and commands.

```
.claude/
├── agents/              # Agent role definitions
│   ├── analysis/
│   ├── architecture/
│   ├── consensus/
│   ├── core/
│   ├── data/
│   ├── development/
│   ├── devops/
│   ├── documentation/
│   ├── flow-nexus/
│   ├── github/
│   ├── goal/
│   ├── hive-mind/
│   ├── neural/
│   ├── optimization/
│   ├── sparc/
│   ├── specialized/
│   ├── swarm/
│   ├── templates/
│   └── testing/
├── commands/            # Available slash commands
└── [other config files]
```

## Major Changes from Reorganization

### Files Removed
- ✅ `test-render.html` (temporary debug file)
- ✅ `/tests/` directory (consolidated into `/src/tests/`)
- ✅ `/examples/` directory (consolidated into `/src/examples/`)

### Files Moved
- ✅ `vite.config.ts` → `/config/vite.config.ts`
- ✅ `vitest.config.ts` → `/config/vitest.config.ts`
- ✅ `/coordination/` → `/docs/swarm/coordination/`
- ✅ `/memory/` → `/docs/swarm/memory/`
- ✅ 41 loose docs → organized into `/docs/` subdirectories

### Files Added
- ✅ `/config/README.md`
- ✅ `/src/examples/README.md`
- ✅ `/docs/reports/README.md`
- ✅ `/docs/guides/README.md`
- ✅ `/docs/planning/README.md`
- ✅ `/docs/swarm/README.md`
- ✅ `/docs/project/DIRECTORY_STRUCTURE.md` (this file)

### Configuration Updated
- ✅ `package.json` - Updated all scripts to reference `/config/` files
- ✅ All Vite/Vitest commands now use `--config config/[file].ts`

## File Organization Rules

### Root Directory Rules
1. **Minimal files in root** - Only essential config and entry files
2. **No source files** - All `.ts`, `.tsx` files belong in `/src`
3. **No test files** - All tests belong in `/src/tests`
4. **No docs** - Documentation belongs in `/docs`

### Source Directory Rules
1. **Components by feature** - Group related components together
2. **Separate state systems** - Redux (`store/`) vs Zustand (`stores/`)
3. **Tests alongside code** - `/src/tests/` mirrors `/src/` structure
4. **Examples separate** - Examples in `/src/examples/`, not mixed with code

### Documentation Rules
1. **Categorize by type** - reports, guides, planning, implementation
2. **Include README.md** - Every major directory has overview
3. **Archive old docs** - Move outdated docs to archive subdirectories
4. **Link related docs** - Use relative links between documentation

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `ComponentName.tsx`)
- **Utilities**: camelCase (e.g., `utilityFunction.ts`)
- **Tests**: match source with `.test.ts` or `.test.tsx`
- **Types**: PascalCase (e.g., `TypeDefinition.ts`)
- **Config**: kebab-case (e.g., `vite-config.ts`)

### Directories
- **Source dirs**: camelCase (e.g., `components/`)
- **Doc dirs**: kebab-case (e.g., `design-system/`)
- **Feature dirs**: descriptive names (e.g., `accessibility/`)

## Maintenance

### Adding New Files
1. **Determine category** - source, docs, config, scripts?
2. **Find appropriate directory** - follow structure above
3. **Create subdirectory** if new category needed
4. **Add README.md** for new categories
5. **Update this document** if structure changes significantly

### Periodic Cleanup
- **Weekly**: Remove build artifacts and temp files
- **Monthly**: Review for misplaced files
- **Quarterly**: Archive old documentation
- **Yearly**: Major structure review and refactor

## Benefits of This Structure

1. **Easy Navigation** - Logical organization makes files easy to find
2. **Clear Ownership** - Each directory has specific purpose
3. **Scalability** - Structure supports growth without becoming messy
4. **Onboarding** - New developers can quickly understand layout
5. **Maintenance** - Clean structure is easier to maintain
6. **Documentation** - README files explain each directory's purpose
7. **CI/CD** - Predictable structure simplifies automation

## Future Improvements

Potential enhancements:
- Consider monorepo structure if project grows significantly
- Separate API layer into `/api` directory
- Create `/shared` for code shared across subprojects
- Add `/templates` for code generation templates
- Consider feature-based organization within `/src` for large features

## Related Documentation

- [Project README](/README.md) - Project overview and setup
- [Configuration Guide](/config/README.md) - Build configuration
- [Testing Guide](/docs/guides/TESTING_GUIDE.md) - Testing strategy
- [Contributing Guidelines](/CONTRIBUTING.md) - How to contribute

---

**Last Updated**: October 1, 2025
**Maintained By**: Project Organization Specialist
**Review Frequency**: Quarterly
