# Testing Best Practices Guide

## Overview

This guide outlines best practices for testing in this project, covering both Jest unit tests and Playwright E2E tests with our enhanced testing infrastructure.

## Table of Contents
- [General Testing Principles](#general-testing-principles)
- [Debug Console Usage](#debug-console-usage)
- [Parallel Test Execution](#parallel-test-execution)
- [Test Organization](#test-organization)
- [Performance Optimization](#performance-optimization)
- [CI/CD Integration](#cicd-integration)

## General Testing Principles

### 1. Test Independence
```typescript
// ✅ GOOD - Independent tests
test('should navigate to homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Homepage');
});

test('should navigate to about page', async ({ page }) => {
  await page.goto('/about');
  await expect(page).toHaveTitle('About');
});

// ❌ BAD - Dependent tests
test('should login user', async ({ page }) => {
  // Creates user state
});

test('should access dashboard', async ({ page }) => {
  // Depends on previous test's login state
});
```

### 2. Clear Test Names and Tags
```typescript
// ✅ GOOD - Descriptive names with tags
test('should navigate to Home from curriculum page header link @smoke', async ({ curriculumPage }) => {
  // Clear what is being tested and test priority
});

test('should validate Basic HTML navigation from curriculum page @critical', async ({ curriculumPage }) => {
  // Critical test that blocks deployment if it fails
});

// ❌ BAD - Vague names
test('test navigation', async ({ page }) => {
  // What navigation? From where to where?
});
```

### 3. Test Tags for Organization
| Tag | Purpose | Usage |
|-----|---------|-------|
| `@critical` | Must pass for deployment | Core functionality, blocking tests |
| `@smoke` | Quick health checks | Fast validation of key features |
| `@regression` | Comprehensive testing | Full feature validation |

## Debug Console Usage

### Best Practices
```typescript
import { debugConsole } from '../../src/scripts/debug-console.js';

test('navigation test', async ({ curriculumPage, paths }) => {
  // ✅ GOOD - Use debugConsole for conditional output
  debugConsole.log('Expected path:', paths.page_home);
  debugConsole.log('Testing navigation to:', targetUrl);
  
  // ✅ GOOD - Group related debug info
  debugConsole.group('Navigation Validation');
  debugConsole.log('Response status:', response.status());
  debugConsole.log('Final URL:', page.url());
  debugConsole.groupEnd();
  
  // ❌ BAD - Direct console.log (always shows)
  console.log('This always appears in output');
});
```

### Debug Output Control
```javascript
// In src/scripts/debug-console.js
export const bDebug = true;  // Development - shows debug output
export const bDebug = false; // Production - clean output
```

### Log Level Guidelines
```typescript
// Use appropriate log levels
debugConsole.log('Routine debug info');      // General debugging
debugConsole.info('Important information');   // Key insights
debugConsole.warn('Potential issues');        // Warning conditions
debugConsole.error('Actual problems');        // Error conditions
debugConsole.force('Critical info');          // Always shows (ignores bDebug)
```

## Parallel Test Execution

### When to Enable Parallel Mode
```typescript
// ✅ GOOD - Independent navigation tests
test.describe('Curriculum Navigation Tests', () => {
  test.describe.configure({ mode: 'parallel' });
  
  test('header home link @smoke', async ({ curriculumPage }) => {
    // Independent test - can run in parallel
  });
  
  test('footer home link @smoke', async ({ curriculumPage }) => {
    // Independent test - can run in parallel
  });
  
  test('basic HTML navigation @critical', async ({ curriculumPage }) => {
    // Independent test - can run in parallel
  });
});
```

### When NOT to Use Parallel Mode
```typescript
// ❌ BAD - Sequential dependency
test.describe('User Workflow', () => {
  // Don't use parallel mode here
  
  test('should create user account', async ({ page }) => {
    // Must run first
  });
  
  test('should login with created account', async ({ page }) => {
    // Depends on previous test
  });
  
  test('should access user dashboard', async ({ page }) => {
    // Depends on login
  });
});
```

### Parallel Mode Benefits
- ⚡ **3x faster execution** for independent tests
- 🔧 **Better resource utilization** on multi-core machines
- 🚀 **Scalable test suites** as you add more tests

## Test Organization

### File Structure Best Practices
```
tests/
├── e2e/
│   ├── navigation/
│   │   ├── home-navigation.spec.ts        # Homepage navigation tests
│   │   └── curriculum-navigation.spec.ts  # Curriculum page navigation
│   ├── homepage.spec.ts                   # Homepage functionality
│   └── interactive-features.spec.ts       # Interactive elements
├── fixtures/
│   └── test-fixtures.ts                   # Shared test fixtures
└── unit/
    └── (Jest tests in __tests__ folder)
```

### Shared Constants Integration
```typescript
// ✅ GOOD - Use shared constants for consistency
import { paths, ariaLabels } from '../../src/scripts/shared-constants__main.js';

test('home link validation', async ({ curriculumPage }) => {
  const homeLink = curriculumPage.locator('header .home-link');
  
  // Test expects same values as production uses
  await expect(homeLink).toHaveAttribute('href', paths.page_home);
  await expect(homeLink).toHaveAttribute('aria-label', ariaLabels.ariaLabel_homeLink_header);
});
```

### Custom Fixtures Usage
```typescript
// ✅ GOOD - Use appropriate fixtures
test('curriculum page test', async ({ 
  curriculumPage,  // Pre-loaded curriculum page
  paths,           // Shared path constants
  ariaLabels       // Shared aria-label constants
}) => {
  // Page is already loaded and ready
  // Constants are available for assertions
});

// ✅ GOOD - Server validation
test('api test', async ({ serverRunning }) => {
  // Server health is pre-validated
  // Can proceed with API calls
});
```

## Performance Optimization

### Worker Configuration
```typescript
// Current optimal configuration (playwright.config.ts)
workers: process.env.CI ? 1 : 4

// ✅ Local development: 4 workers (fast feedback)
// ✅ CI environment: 1 worker (stability)
// ✅ Perfect for current scale: 3-17 tests
```

### Test Execution Strategies
```bash
# Run specific test suites
npm run test:e2e:chrome -- navigation/        # Navigation tests only
npm run test:e2e:chrome -- --grep "@smoke"    # Smoke tests only
npm run test:e2e:chrome -- --grep "@critical" # Critical tests only

# Parallel execution with multiple workers
npm run test:e2e:chrome -- --workers=4        # Override worker count
```

### Browser Selection for Speed
```bash
# ✅ Fast development testing
npm run test:e2e:chrome     # Chrome only (~3x faster than all browsers)

# ✅ Comprehensive testing
npm run test:e2e           # All browsers (Chrome, Firefox, WebKit)
```

## CI/CD Integration

### GitHub Actions Optimization
```yaml
# Optimal CI configuration
- name: Run Tests
  run: |
    npm test                    # Jest unit tests
    npm run test:e2e:chrome     # Playwright E2E (Chrome only for speed)
```

### Test Failure Handling
```typescript
// ✅ GOOD - Graceful failure handling
test('navigation with fallback', async ({ curriculumPage }) => {
  const [response] = await Promise.all([
    curriculumPage.waitForResponse(
      response => response.url().includes('target') || response.status() === 404
    ),
    curriculumPage.click('a[href*="target"]')
  ]);
  
  // Handle both success and expected failure cases
  expect(response.status()).toBeLessThanOrEqual(404);
});
```

### Environment-Specific Testing
```typescript
// Environment-aware testing
const isCI = !!process.env.CI;
const timeout = isCI ? 30000 : 10000; // Longer timeouts in CI

test('environment-aware test', async ({ page }) => {
  test.setTimeout(timeout);
  // Test implementation
});
```

## Quality Metrics

### Test Coverage Guidelines
- **Unit Tests (Jest)**: Focus on pure functions and utilities
- **E2E Tests (Playwright)**: Focus on user workflows and integration
- **Critical Path Coverage**: Ensure @critical tests cover core functionality

### Performance Benchmarks
- **Local E2E Tests**: Should complete in < 30 seconds
- **CI E2E Tests**: Should complete in < 2 minutes  
- **Unit Tests**: Should complete in < 5 seconds

### Maintenance Guidelines
1. **Review test output regularly** for flaky tests
2. **Update debug output** when debugging specific issues
3. **Add parallel mode** to new independent test suites
4. **Use shared constants** for maintainable assertions

## Troubleshooting

### Common Issues

#### Debug Output Not Showing
```javascript
// Check debug flag in src/scripts/debug-console.js
export const bDebug = true; // Ensure this is true
```

#### Parallel Tests Failing
```typescript
// Check for shared state dependencies
test.describe.configure({ mode: 'default' }); // Disable parallel mode temporarily
```

#### Slow Test Performance
```bash
# Profile test execution
npm run test:e2e:chrome -- --reporter=dot    # Minimal output for speed
npm run test:e2e:chrome -- --workers=2       # Reduce worker count
```

## Related Documentation

- [Debug Console Guide](./DEBUG_CONSOLE_GUIDE.md) - Comprehensive debug console documentation
- [Playwright Guide](./PLAYWRIGHT_GUIDE.md) - Playwright-specific testing guide  
- [TypeScript Guide](./TYPESCRIPT_GUIDE.md) - TypeScript integration and benefits