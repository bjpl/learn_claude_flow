# Configuration Directory

This directory contains all build and development configuration files for the Learn Claude Flow project.

## Files

### Build Configuration
- `vite.config.ts` - Vite build tool configuration for development and production builds
- `vitest.config.ts` - Vitest test runner configuration
- `tsconfig.json` - TypeScript compiler configuration for build tools
- `tsconfig.node.json` - TypeScript configuration for Node.js scripts

### Legacy Configuration
- `package.json` - Legacy package.json (kept for reference, use root package.json)

## Usage

All configuration files are referenced via `--config config/[filename]` in package.json scripts.

## Maintenance

When updating build configuration:
1. Test locally with `npm run dev`
2. Run type checking with `npm run typecheck`
3. Build and verify with `npm run build`
4. Run tests with `npm test`
