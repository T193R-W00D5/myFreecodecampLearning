# CI/CD Pipeline Documentation

This project uses a comprehensive CI/CD pipeline with GitHub Actions for quality assurance, testing, and type safety.

## Overview

The CI/CD setup consists of three main workflows:

1. **E2E Tests** (`.github/workflows/e2e-tests.yml`) - Playwright testing with TypeScript
2. **CI Quality Checks** (`.github/workflows/ci.yml`) - Linting, TypeScript checking, and security
3. **Node.js Compatibility** (`.github/workflows/node.js.yml`) - Cross-version compatibility testing

## Workflow Details

### 1. E2E Tests Workflow

**Purpose**: Run end-to-end tests with Playwright across multiple browsers

**Triggers**: 
- Push to `main`, `develop` branches
- Pull requests to `main`

**Jobs**:
- **Unit Tests**: Jest unit tests
- **E2E Tests**: Chrome-only testing for fast feedback (configurable)
- **E2E Tests Full**: All browsers on main branch pushes only

**Key Features**:
- TypeScript test files (`.ts`) automatically handled
- Matrix testing across desktop browsers (Chromium, Firefox, WebKit, Edge)
- Artifact collection for test results and reports
- Volta integration for consistent Node.js version

### 2. CI Quality Checks Workflow

**Purpose**: Code quality, TypeScript validation, and security auditing

**Triggers**:
- Push to `main`, `develop` branches  
- Pull requests to `main`

**Jobs**:
- **Lint, TypeScript Check, and Build**:
  - JavaScript syntax validation
  - **TypeScript type checking** (`npx tsc --noEmit`)
  - Server startup validation
  - Package.json validation
  - Playwright configuration validation

- **Security Audit**:
  - Dependency vulnerability scanning
  - Security advisory checks

**TypeScript Integration**:
```yaml
- name: Check for syntax errors
  run: |
    # Check JavaScript syntax
    node --check src/script.js
    node --check server.js
    
    # Check TypeScript compilation
    npx tsc --noEmit
    
    # Check if server starts without errors
    timeout 10s npm start || [ $? -eq 124 ]
```

### 3. Node.js Compatibility Matrix

**Purpose**: Ensure compatibility across Node.js versions

**Matrix Testing**: Node versions 18.x, 20.x, 22.x
**Pinned Testing**: Exact Volta-pinned version from `package.json`

## TypeScript Integration

### Compilation Checking
- All TypeScript files are type-checked in CI
- Compilation errors fail the build
- No JavaScript output generated (`noEmit: true`)

### Test Execution
- Playwright automatically handles `.ts` test files
- Custom fixtures with TypeScript types
- Enhanced error reporting with type information

## Performance Optimizations

### Fast CI Strategy
- **Default**: Chrome-only E2E testing for quick feedback
- **Full testing**: All browsers only on main branch pushes
- **Result**: ~70% reduction in CI time

### Configuration
```yaml
# Fast CI (default)
matrix:
  browser: [chromium]

# Full testing (uncomment when needed)
# matrix:
#   browser: [chromium, firefox, webkit]
```

## Local CI Simulation

### Run Full Test Suite Locally
```bash
# All tests (Jest + Playwright)
npm run test:all

# Just E2E tests (all browsers)
npm run test:e2e

# TypeScript type checking
npx tsc --noEmit

# Simulate CI environment
CI=true npm run test:e2e  # Bash/Linux
$env:CI = "true"; npm run test:e2e  # PowerShell
```

### Debugging CI Failures

**TypeScript Errors**:
```bash
# Check types locally
npx tsc --noEmit

# Fix type errors and re-run
```

**Test Failures**:
```bash
# Run specific failing test
npx playwright test tests/e2e/failing-test.spec.ts --project=chromium

# Generate test report
npx playwright show-report
```

## Artifact Collection

### What's Collected
- Test results (HTML reports)
- Screenshots on failure
- Video recordings on failure
- Test traces for debugging

### Retention
- Standard results: 30 days
- Comprehensive results (main branch): 90 days

## Branch Protection

### Requirements
- All CI checks must pass
- TypeScript compilation must succeed
- No security vulnerabilities in dependencies
- Unit tests must pass
- E2E tests must pass (Chrome minimum)

## Contributing Guidelines

### Before Committing
1. Run TypeScript check: `npx tsc --noEmit`
2. Run tests locally: `npm run test:all`
3. Ensure no lint errors
4. Update documentation if needed

### Updating Dependencies
1. Security audit: `npm audit`
2. Test compatibility: `npm run test:all`
3. Check TypeScript compatibility
4. Update CI if major version changes

## Volta Integration

### Node.js Version Management
- **Pinned version**: Defined in `package.json` (`volta.node`)
- **CI consistency**: Same version used in all workflows
- **Developer alignment**: Local and CI environments match

### Updating Node.js Version
```bash
# Local update
volta install node@22.21.0
volta pin node@22.21.0

# Commit updated package.json
git add package.json
git commit -m "Update Node.js to 22.21.0"
```

## Monitoring and Maintenance

### Regular Tasks
- Monitor CI performance and adjust browser matrix as needed
- Update dependencies and security patches
- Review and update TypeScript configuration
- Optimize test performance and reliability

### Metrics to Watch
- CI execution time
- Test flakiness rate
- TypeScript compilation time
- Security vulnerability count

Engines and matrix choices (short note)
-------------------------------------

We also include a lightweight `engines` field in `package.json` to help editors, linters, and some deployment platforms understand the supported Node range for this project. The `engines` entry is not enforced by Volta or GitHub Actions, but it provides a helpful signal to contributors and some tools (for example, VS Code, Heroku, or `npm` warnings).

Matrix choices: the compatibility matrix intentionally tests recent LTS and modern Node majors (here: 18.x, 20.x, 22.x) to balance test coverage and CI cost. The pinned job still tests the exact Volta-pinned version from `package.json` (for exact reproducibility).

Quick `engines` example (what contributors will see)
-------------------------------------------------

If `package.json` contains an `engines` entry like:

```json
"engines": {
  "node": ">=18 <=22.21.0"
}
```

And a contributor runs `npm install` or `npm ci` using an older Node (for example Node 16), `npm` will typically print a warning similar to:

```
npm WARN EBADENGINE Unsupported engine for freecodecamporg-website-copies@1.0.0: wanted: {"node": ">=18 <=22.21.0"} (current: {"node":"16.20.0", "npm":"..."})
```

Notes:
- `npm` only warns by default and does not automatically switch or block installs. Use Volta, `nvm`, or `nvm-windows` to actually select a compatible runtime.
- This warning helps contributors notice mismatched runtimes early so they can switch to the pinned version before running tests or starting the dev server.

Troubleshooting
- If CI fails with `pinned node ... is NOT covered by compatibility matrix`, either:
  - Update the compatibility matrix in the workflow to include the matching major (e.g. add `22.x`), or
  - Change the pinned version in `package.json` to one covered by the matrix.

Questions or changes
- If you'd prefer a different policy (for example, matrix-only CI, or using Volta in the runner), open an issue or a PR describing the desired behavior and we'll adjust the workflow.
