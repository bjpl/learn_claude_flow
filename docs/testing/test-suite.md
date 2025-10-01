# Test Suite Documentation

## Overview

Comprehensive test suite for Phase 1 and Phase 2 implementations with 80%+ code coverage.

## Test Structure

```
src/tests/
├── unit/                 # Unit tests for Redux slices
│   ├── uiSlice.test.ts
│   ├── gameSlice.test.ts
│   └── performanceSlice.test.ts
├── integration/          # Integration tests
│   └── routing.test.tsx
├── accessibility/        # A11y tests with jest-axe
│   └── a11y.test.tsx
├── performance/          # Performance regression tests
│   └── regression.test.ts
├── e2e/                  # End-to-end tests (future)
└── utils/                # Test utilities
    ├── test-utils.tsx    # Custom render with providers
    └── mockData.ts       # Mock data generators
```

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test Suites
```bash
npm run test:unit           # Unit tests only
npm run test:integration    # Integration tests only
npm run test:a11y           # Accessibility tests only
npm run test:performance    # Performance tests only
```

### Coverage
```bash
npm run test:coverage       # Generate coverage report
npm run test:coverage:check # Check coverage thresholds
```

### Watch Mode
```bash
npm run test:watch          # Run tests in watch mode
```

## Test Categories

### 1. Unit Tests

#### Redux Slices
- **uiSlice.test.ts**: Theme, menu, notifications, loading, error states
- **gameSlice.test.ts**: Game modes, scoring, placements, difficulty
- **performanceSlice.test.ts**: FPS, render time, memory, metrics

**Coverage Target**: 90%+

#### Test Patterns
```typescript
describe('slice name', () => {
  describe('reducers', () => {
    it('should handle action', () => {
      const actual = reducer(initialState, action());
      expect(actual.property).toBe(expectedValue);
    });
  });

  describe('edge cases', () => {
    it('should handle edge case', () => {
      // Test boundary conditions
    });
  });
});
```

### 2. Integration Tests

#### Routing
- Route rendering
- Lazy loading
- Navigation flow
- State persistence
- Loading states

**Coverage Target**: 85%+

### 3. Accessibility Tests

#### jest-axe Integration
- ARIA attributes
- Keyboard navigation
- Form labels
- Image alt text
- Color contrast
- Heading hierarchy
- Landmark regions

**Target**: Zero violations

#### Test Pattern
```typescript
it('should have no a11y violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 4. Performance Tests

#### Regression Testing
- Array operations: < 100ms
- Object operations: < 50ms
- String operations: < 100ms
- Redux updates: < 50ms
- Memory leaks: < 10MB increase

#### Benchmark Reporting
- Duration tracking
- Iteration counts
- Average per iteration
- Memory usage

## Test Utilities

### Custom Render
```typescript
import { render } from '@/tests/utils/test-utils';

// Automatically wraps with Provider and Router
const { store, ...utils } = render(<Component />);
```

### Mock Data
```typescript
import {
  mockDepartment,
  mockInitialUIState,
  mockRootState,
  createMockStore,
} from '@/tests/utils/mockData';
```

## CI/CD Integration

### GitHub Actions Workflow

```yaml
- Run linter
- Run type check
- Run unit tests
- Run integration tests
- Run accessibility tests
- Run performance tests
- Generate coverage
- Upload to Codecov
- Check thresholds
```

### Coverage Requirements

- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

## Best Practices

### 1. Test Organization
- One describe block per feature
- Group related tests
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. Test Isolation
- No shared state between tests
- Use beforeEach/afterEach for setup/cleanup
- Mock external dependencies
- Use test-specific data

### 3. Assertions
- One concept per test
- Use specific matchers
- Test both success and failure cases
- Test edge cases and boundaries

### 4. Performance
- Keep tests fast (< 100ms per test)
- Use shallow rendering when possible
- Mock heavy operations
- Batch similar tests

### 5. Maintenance
- Update tests with code changes
- Remove obsolete tests
- Keep test data simple
- Document complex test scenarios

## Common Issues

### 1. Async Operations
```typescript
// Use waitFor for async state changes
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

### 2. Router Issues
```typescript
// Use test-utils render which includes Router
import { render } from '@/tests/utils/test-utils';
```

### 3. Redux State
```typescript
// Use preloadedState for initial store state
render(<Component />, {
  preloadedState: {
    ui: customUIState,
  },
});
```

### 4. Lazy Loading
```typescript
// Wait for lazy components to load
await waitFor(() => {
  expect(screen.getByText('Component')).toBeInTheDocument();
});
```

## Coverage Reports

### HTML Report
Open `coverage/index.html` in browser for detailed coverage view.

### Console Output
```bash
npm run test:coverage
```

Shows:
- File-by-file coverage
- Summary statistics
- Uncovered lines
- Threshold status

## Future Enhancements

1. **E2E Tests**: Playwright/Cypress for full user flows
2. **Visual Regression**: Percy/Chromatic for UI changes
3. **Load Testing**: K6 for performance under load
4. **Mutation Testing**: Stryker for test quality
5. **Contract Testing**: Pact for API contracts

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [Redux Testing](https://redux.js.org/usage/writing-tests)

## Metrics

- **Total Tests**: 50+
- **Coverage**: 80%+
- **Test Execution Time**: < 10s
- **CI/CD Pipeline**: < 2min
- **Accessibility Violations**: 0

---

Last Updated: 2025-09-30
Agent: QA Engineer (Testing Specialist)
