# Playwright E2E Testing Guide

This guide covers everything you need to know about running and debugging Playwright tests in this project.

## Table of Contents
- [Quick Start](#quick-start)
- [Available Commands](#available-commands)
- [Local Development](#local-development)
- [Debugging Tests](#debugging-tests)
- [Writing New Tests](#writing-new-tests)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Prerequisites
- Node.js 22.21.0 (managed by Volta)
- All dependencies installed: `npm install`
- Playwright browsers: `npx playwright install`

### Run Your First Test
```bash
# Run all E2E tests (headless)
npm run test:e2e

# Run tests with browser visible
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug
```

## Available Commands

### Unit Tests (Jest)
```bash
npm test                # Run Jest unit tests
npm run test:unit       # Same as above (explicit)
```

### E2E Tests (Playwright)
```bash
npm run test:e2e        # All browsers, headless
npm run test:e2e:headed # All browsers, visible
npm run test:e2e:debug  # Debug mode with pauses
npm run test:e2e:ui     # Interactive UI mode

# Browser-specific tests
npm run test:e2e:chrome    # Chromium only
npm run test:e2e:firefox   # Firefox only
npm run test:e2e:webkit    # WebKit (Safari) only

# Combined tests
npm run test:all        # Unit tests + E2E tests
```

### Direct Playwright Commands
```bash
# Run specific test file (TypeScript)
npx playwright test tests/e2e/homepage.spec.ts

# Run specific test folder
npx playwright test tests/e2e/navigation/

# Run specific navigation test file
npx playwright test tests/e2e/navigation/home-navigation.spec.ts

# Run with specific browser
npx playwright test --project=chromium

# Run with custom options
npx playwright test --headed --max-failures=1

# Generate test report
npx playwright show-report

# TypeScript type checking
npx tsc --noEmit
```

## Local Development

### Project Structure
```
tests/
├── e2e/                    # E2E test files (TypeScript)
│   ├── homepage.spec.ts    # Homepage tests
│   ├── interactive-features.spec.ts # Interactive element tests
│   └── navigation/         # Navigation tests (organized by page)
│       ├── home-navigation.spec.ts      # Navigation from homepage
│       └── curriculum-navigation.spec.ts # Navigation from curriculum page
├── fixtures/               # Test data and utilities
│   └── test-fixtures.ts    # Custom fixtures with TypeScript types
└── test-results/          # Generated reports and artifacts
```

### TypeScript Integration

This project uses **TypeScript** for all test files, providing enhanced type safety and better IDE support.

#### Benefits of TypeScript Testing:
- **Type safety** - Catch errors at compile time
- **Better IntelliSense** - Enhanced autocomplete and refactoring
- **Improved maintainability** - Clear interfaces and type definitions
- **Runtime error prevention** - TypeScript catches common mistakes early

### Custom Test Fixtures

This project uses custom Playwright fixtures to eliminate code duplication and improve test reliability. Instead of repeating navigation and setup code in every test, we use centralized fixtures.

#### Available Fixtures

**`serverRunning`** - Validates that the development server is responding:
```javascript
// Automatically validates server health before tests
test('should work', async ({ serverRunning }) => {
  // Server is guaranteed to be running and responding
});
```

**`homePage`** - Navigates to homepage with proper wait conditions:
```javascript
// Automatically navigates to / and waits for networkidle
test('should test homepage', async ({ homePage }) => {
  // Page is already loaded and ready
  await expect(homePage.locator('h1')).toBeVisible();
});
```

**`interactivePage`** - Navigates to interactive features page:
```javascript
// Automatically navigates to /pages/interactive-features.html
test('should test interactions', async ({ interactivePage }) => {
  // Page is loaded with JavaScript ready
  await expect(interactivePage.locator('#calculator')).toBeVisible();
});
```

#### Before vs After Fixtures

**Before (repetitive code in every test):**
```javascript
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
});

test('homepage title', async ({ page }) => {
  await expect(page).toHaveTitle(/freeCodeCamp/);
});
```

**After (using custom fixtures):**
```javascript
import { test, expect } from '../fixtures/test-fixtures.js';

test('homepage title', async ({ homePage }) => {
  await expect(homePage).toHaveTitle(/freeCodeCamp/);
});
```

#### Benefits of Custom Fixtures
- **Eliminates code duplication** across test files
- **Consistent setup** ensures reliable test conditions
- **Easier maintenance** - change navigation logic in one place
- **Better error handling** - centralized retry logic
- **Improved readability** - tests focus on actual testing, not setup

### Server Configuration
- **Base URL**: `http://localhost:3010`
- **Auto-start**: Server starts automatically during tests
- **Manual start**: `npm start` (if needed for debugging)

### Test Configuration
Key settings in `playwright.config.ts`:
- **Parallel execution**: Tests run in parallel for speed
- **Retries**: 2 retries on CI, 0 locally
- **Timeouts**: 30s test timeout, 5s assertion timeout
- **Screenshots**: Only on failure
- **Videos**: Retained on failure
- **Traces**: On first retry
- **TypeScript support**: Automatic `.ts` file handling

## Debugging Tests

### Visual Debugging
```bash
# Debug mode - browser stays open, step through tests
npm run test:e2e:debug

# Headed mode - see browser actions
npm run test:e2e:headed

# UI mode - interactive test runner
npm run test:e2e:ui
```

### Step-by-Step Debugging
1. **Add breakpoints** in your test code:
   ```javascript
   await page.pause(); // Pauses execution
   ```

2. **Run in debug mode**:
   ```bash
   npm run test:e2e:debug
   ```

3. **Use browser developer tools** when paused

### Inspecting Elements
```bash
# Generate selectors interactively
npx playwright codegen localhost:3010
```

### Trace Viewer
```bash
# View traces for failed tests
npx playwright show-trace test-results/[test-name]/trace.zip
```

## Writing New Tests

### Debug Console Integration

All tests should use the centralized debug console for consistent debug output:

```typescript
import { test, expect } from '../fixtures/test-fixtures.js';
import { debugConsole } from '../../src/scripts/debug-console.js';

test.describe('Feature Name', () => {
  test('should test navigation', async ({ curriculumPage, paths }) => {
    const actualHref = await homeLink.getAttribute('href');
    
    // Use debugConsole instead of console.log
    debugConsole.log('Expected href:', paths.page_home);
    debugConsole.log('Actual href:', actualHref);
    
    await expect(homeLink).toHaveAttribute('href', paths.page_home);
  });
});
```

**Debug output control:** Set `bDebug = true/false` in `src/scripts/debug-console.js` to toggle debug output globally.

### Parallel Test Execution

For independent tests that don't share state, enable parallel execution:

```typescript
test.describe('Navigation Tests', () => {
  // Enable parallel execution for faster test runs
  test.describe.configure({ mode: 'parallel' });

  test('header navigation test @smoke', async ({ curriculumPage }) => {
    // This test runs in parallel with other tests
  });

  test('footer navigation test @smoke', async ({ curriculumPage }) => {
    // This test also runs in parallel
  });
});
```

**When to use parallel mode:**
- ✅ Tests are completely independent
- ✅ No shared state or dependencies
- ✅ Each test uses fresh page fixtures
- ❌ Don't use if tests depend on each other

### Worker Configuration

Current setup (in `playwright.config.ts`):
```typescript
workers: process.env.CI ? 1 : 4
```

- **Local development**: 4 workers (faster execution)
- **CI environment**: 1 worker (stability and resource conservation)
- **Perfect for current scale**: 3-17 tests run efficiently

### Test File Template

#### Using Custom Fixtures (Recommended - TypeScript)
```typescript
import { test, expect } from '../fixtures/test-fixtures.js';
import { debugConsole } from '../../src/scripts/debug-console.js';

test.describe('Feature Name', () => {
  // Enable parallel execution if tests are independent
  test.describe.configure({ mode: 'parallel' });

  test('should test homepage feature @smoke', async ({ homePage, paths }) => {
    // homePage is already loaded and ready with full TypeScript support
    debugConsole.log('Testing homepage feature');
    await expect(homePage.locator('selector')).toBeVisible();
  });

  test('should test interactive feature @critical', async ({ interactivePage }) => {
    // interactivePage is already loaded with JavaScript ready
    debugConsole.log('Testing interactive features');
    await expect(interactivePage.locator('#calculator')).toBeVisible();
  });

  test('should verify server is running', async ({ serverRunning }) => {
    // Server health is automatically validated
    // TypeScript provides type checking for all page methods
    debugConsole.log('Server health validated');
  });
});
```

#### Using Standard Playwright (Alternative)
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/your-page');
  });

  test('should do something', async ({ page }) => {
    // Your test code here with TypeScript type safety
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### Best Practices
1. **Use custom fixtures** to eliminate code duplication
2. **Import from fixtures** instead of @playwright/test when available
3. **Use descriptive test names** that explain what is being tested
4. **Group related tests** with `test.describe()`
5. **Prefer fixture-based setup** over `beforeEach` when possible
6. **Use stable selectors** (data-testid, role, text)
7. **Wait for elements** before interacting
8. **Add assertions** to verify state changes

### Common Patterns
```javascript
// Navigation
await page.goto('/path');
await page.click('button');
await page.fill('input', 'value');

// Waiting
await page.waitForSelector('selector');
await page.waitForURL('**/path/**');
await page.waitForResponse(response => response.url().includes('api'));

// Assertions
await expect(page).toHaveTitle('Title');
await expect(page.locator('selector')).toBeVisible();
await expect(page.locator('selector')).toHaveText('Text');
```

## CI/CD Integration

### GitHub Actions Workflows
- **`e2e-tests.yml`**: Runs E2E tests on push/PR
- **`ci.yml`**: Code quality, TypeScript checking, and security checks
- **`node.js.yml`**: Node.js compatibility matrix testing

### Workflow Features
- **Matrix testing**: Configurable browser testing (Chrome-only by default for speed)
- **TypeScript type checking**: Validates types before running tests
- **Artifact collection**: Test results and screenshots
- **Volta integration**: Uses pinned Node.js version
- **Conditional execution**: Full cross-browser tests only on main branch pushes

### CI Performance Optimization

#### Current Setup (Chrome-Only for Speed)
By default, CI runs Playwright tests only on Chrome/Chromium to save time and resources:

```yaml
# In .github/workflows/e2e-tests.yml
matrix:
  browser: [chromium]  # Fast CI - Chrome only
```

#### Switching to Full Browser Testing
When you need comprehensive cross-browser testing, edit `.github/workflows/e2e-tests.yml`:

```yaml
# Comment out the Chrome-only line:
# browser: [chromium]

# Uncomment the full browser line:
browser: [chromium, firefox, webkit]
```

#### CI Behavior Summary
- **Pull Requests & Branch Pushes**: Chrome-only tests (fast)
- **Main Branch Pushes**: Chrome-only + separate full browser job
- **Manual Override**: Edit workflow file to enable all browsers anytime

This approach reduces CI time by ~70% while maintaining test coverage quality.

### Local CI Simulation

#### Bash/Linux/macOS
```bash
# Simulate CI environment
CI=true npm run test:e2e

# Test specific browser like CI
npx playwright test --project=chromium
```

#### PowerShell/Windows
```powershell
# Set CI environment variable
$env:CI = "true"
npm run test:e2e

# Check if CI is set
echo $env:CI

# Clear CI mode when done
$env:CI = $null

# Alternative: Run with CI in one line
$env:CI = "true"; npm run test:e2e; $env:CI = $null
```

## Troubleshooting

### Common Issues

#### Server Not Starting
```bash
# Check if port 3010 is in use
netstat -ano | findstr :3010

# Kill existing process
taskkill /PID <process_id> /F

# Start server manually
npm start
```

#### Browser Installation Issues
```bash
# Reinstall browsers
npx playwright install

# Install system dependencies (Linux/WSL)
npx playwright install-deps
```

#### Test Timeouts
1. **Increase timeout** in `playwright.config.js`
2. **Use explicit waits** instead of fixed delays
3. **Check server performance**

#### Flaky Tests
1. **Add proper wait conditions**
2. **Use `toBeVisible()` instead of `toHaveCount()`**
3. **Increase retry count** for CI

#### VS Code Integration Issues
```bash
# Restart TypeScript server
Ctrl+Shift+P > "TypeScript: Restart TS Server"

# Reload VS Code window
Ctrl+Shift+P > "Developer: Reload Window"
```

### Debug Commands
```bash
# Check Playwright installation
npx playwright --version

# List available browsers
npx playwright install --dry-run

# Validate configuration
npx playwright test --list

# Check system info
npx playwright show-system
```

### Getting Help
1. **Check test artifacts** in `test-results/`
2. **View HTML report**: `npx playwright show-report`
3. **Enable verbose logging**: `DEBUG=pw:* npm run test:e2e`
4. **Consult Playwright docs**: https://playwright.dev/docs

### Performance Tips
1. **Run tests in parallel**: Default configuration
2. **Use `--max-failures=1`** for quick feedback
3. **Filter tests**: `npx playwright test --grep "homepage"`
4. **Skip heavy tests**: Use `test.skip()` temporarily
5. **CI optimization**: Chrome-only testing for faster feedback

### CI Configuration
- **Fast CI**: Edit workflow to use `browser: [chromium]` only
- **Full testing**: Enable all browsers with `browser: [chromium, firefox, webkit]`
- **Local testing**: Always test cross-browser before major releases

## Environment Variables

### Bash/Linux/macOS
Set these in your shell or `.env` file:

```bash
# Force headless mode
HEADLESS=true

# Set custom timeout
TIMEOUT=60000

# Enable debug logging
DEBUG=pw:*

# CI mode
CI=true
```

### PowerShell/Windows
```powershell
# Force headless mode
$env:HEADLESS = "true"

# Set custom timeout
$env:TIMEOUT = "60000"

# Enable debug logging
$env:DEBUG = "pw:*"

# CI mode
$env:CI = "true"

# Check current environment variables
echo "CI: $env:CI"
echo "HEADLESS: $env:HEADLESS"

# Clear environment variables when done
$env:CI = $null
$env:HEADLESS = $null
$env:DEBUG = $null
$env:TIMEOUT = $null
```

### Using Environment Variables
```powershell
# Example: Run tests in CI mode with debug logging
$env:CI = "true"
$env:DEBUG = "pw:*"
npm run test:e2e
$env:CI = $null
$env:DEBUG = $null
```

## Next Steps

1. **Write more tests** for your specific features
2. **Set up IDE integration** (VS Code Playwright extension)
3. **Configure test data** management
4. **Add visual regression testing** with screenshots
5. **Implement accessibility testing** with axe-core

---

For more advanced usage, see the [official Playwright documentation](https://playwright.dev/docs/intro).