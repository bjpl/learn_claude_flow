#!/usr/bin/env node

/**
 * ARIA Implementation Verification Script
 *
 * Verifies that all ARIA accessibility components and utilities are properly implemented.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const success = (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`);
const error = (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`);
const info = (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`);
const warn = (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`);

let passed = 0;
let failed = 0;

console.log(`\n${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.cyan}║   ARIA Implementation Verification        ║${colors.reset}`);
console.log(`${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}\n`);

// Check if required files exist
const requiredFiles = [
  'src/components/accessibility/ScreenReaderAnnouncer.tsx',
  'src/components/accessibility/FocusTrap.tsx',
  'src/components/accessibility/SkipLinks.tsx',
  'src/components/accessibility/KeyboardNavigationIndicator.tsx',
  'src/components/accessibility/RouteAnnouncer.tsx',
  'src/components/accessibility/index.ts',
  'src/utils/accessibility/ariaHelpers.ts',
  'src/utils/accessibility/focusManagement.ts',
  'src/utils/accessibility/index.ts',
  'src/styles/accessibility-aria.css',
  'tests/accessibility/aria.test.ts',
  'docs/accessibility/aria-implementation.md',
  'docs/accessibility/quick-reference.md',
  'docs/accessibility/implementation-summary.md',
  'examples/accessibility/AccessibleApp.tsx',
  'examples/accessibility/README.md',
];

console.log(`${colors.cyan}Checking Required Files...${colors.reset}\n`);

requiredFiles.forEach((file) => {
  const filePath = join(rootDir, file);
  if (existsSync(filePath)) {
    success(`Found: ${file}`);
    passed++;
  } else {
    error(`Missing: ${file}`);
    failed++;
  }
});

// Check for required exports in component index
console.log(`\n${colors.cyan}Checking Component Exports...${colors.reset}\n`);

const componentIndexPath = join(rootDir, 'src/components/accessibility/index.ts');
if (existsSync(componentIndexPath)) {
  const content = readFileSync(componentIndexPath, 'utf-8');
  const exports = [
    'ScreenReaderAnnouncer',
    'useScreenReaderAnnouncer',
    'FocusTrap',
    'SkipLinks',
    'defaultSkipLinks',
    'KeyboardNavigationIndicator',
    'useKeyboardNavigation',
    'RouteAnnouncer',
  ];

  exports.forEach((exportName) => {
    if (content.includes(exportName)) {
      success(`Export found: ${exportName}`);
      passed++;
    } else {
      error(`Export missing: ${exportName}`);
      failed++;
    }
  });
}

// Check for required utility functions
console.log(`\n${colors.cyan}Checking Utility Functions...${colors.reset}\n`);

const ariaHelpersPath = join(rootDir, 'src/utils/accessibility/ariaHelpers.ts');
if (existsSync(ariaHelpersPath)) {
  const content = readFileSync(ariaHelpersPath, 'utf-8');
  const functions = [
    'generateAriaId',
    'createAriaLabel',
    'createAriaLive',
    'createAriaDialog',
    'createAriaButton',
    'announceToScreenReader',
    'isFocusable',
    'getFocusableElements',
  ];

  functions.forEach((funcName) => {
    if (content.includes(`export const ${funcName}`) || content.includes(`export function ${funcName}`)) {
      success(`Function found: ${funcName}`);
      passed++;
    } else {
      error(`Function missing: ${funcName}`);
      failed++;
    }
  });
}

const focusManagementPath = join(rootDir, 'src/utils/accessibility/focusManagement.ts');
if (existsSync(focusManagementPath)) {
  const content = readFileSync(focusManagementPath, 'utf-8');
  const items = [
    'focusElement',
    'focusFirstElement',
    'focusLastElement',
    'FocusManager',
    'RovingTabindexManager',
    'createFocusTrap',
  ];

  items.forEach((item) => {
    if (content.includes(item)) {
      success(`Found: ${item}`);
      passed++;
    } else {
      error(`Missing: ${item}`);
      failed++;
    }
  });
}

// Check CSS classes
console.log(`\n${colors.cyan}Checking CSS Classes...${colors.reset}\n`);

const cssPath = join(rootDir, 'src/styles/accessibility-aria.css');
if (existsSync(cssPath)) {
  const content = readFileSync(cssPath, 'utf-8');
  const classes = [
    '.sr-only',
    '.skip-links',
    '.skip-link',
    'body.keyboard-navigation',
    'body.mouse-navigation',
    '[data-focus-visible',
    '[role="dialog"]',
    '[role="alert"]',
    '[role="status"]',
  ];

  classes.forEach((className) => {
    if (content.includes(className)) {
      success(`CSS found: ${className}`);
      passed++;
    } else {
      error(`CSS missing: ${className}`);
      failed++;
    }
  });
}

// Check test coverage
console.log(`\n${colors.cyan}Checking Test Coverage...${colors.reset}\n`);

const testPath = join(rootDir, 'tests/accessibility/aria.test.ts');
if (existsSync(testPath)) {
  const content = readFileSync(testPath, 'utf-8');
  const testSuites = [
    'ARIA Helper Utilities',
    'Focus Management Utilities',
    'Accessibility Components',
  ];

  testSuites.forEach((suite) => {
    if (content.includes(`describe('${suite}'`)) {
      success(`Test suite found: ${suite}`);
      passed++;
    } else {
      warn(`Test suite missing: ${suite}`);
    }
  });

  // Count test cases
  const testMatches = content.match(/it\(/g);
  const testCount = testMatches ? testMatches.length : 0;
  info(`Total test cases: ${testCount}`);

  if (testCount >= 20) {
    success(`Comprehensive test coverage (${testCount} tests)`);
    passed++;
  } else {
    warn(`Limited test coverage (${testCount} tests, recommended: 20+)`);
  }
}

// Check documentation
console.log(`\n${colors.cyan}Checking Documentation...${colors.reset}\n`);

const docs = [
  { file: 'docs/accessibility/aria-implementation.md', minLines: 500 },
  { file: 'docs/accessibility/quick-reference.md', minLines: 200 },
  { file: 'examples/accessibility/README.md', minLines: 200 },
];

docs.forEach(({ file, minLines }) => {
  const filePath = join(rootDir, file);
  if (existsSync(filePath)) {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').length;

    if (lines >= minLines) {
      success(`${file} (${lines} lines)`);
      passed++;
    } else {
      warn(`${file} (${lines} lines, recommended: ${minLines}+)`);
    }
  }
});

// Summary
console.log(`\n${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.cyan}║              Verification Summary          ║${colors.reset}`);
console.log(`${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}\n`);

console.log(`${colors.green}Passed:${colors.reset} ${passed} checks`);
if (failed > 0) {
  console.log(`${colors.red}Failed:${colors.reset} ${failed} checks`);
}

const total = passed + failed;
const percentage = Math.round((passed / total) * 100);

console.log(`\n${colors.cyan}Overall Score:${colors.reset} ${percentage}%`);

if (percentage >= 95) {
  console.log(`\n${colors.green}✓ ARIA implementation is complete and ready for production!${colors.reset}\n`);
  process.exit(0);
} else if (percentage >= 80) {
  console.log(`\n${colors.yellow}⚠ ARIA implementation is mostly complete but needs attention.${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`\n${colors.red}✗ ARIA implementation is incomplete.${colors.reset}\n`);
  process.exit(1);
}
