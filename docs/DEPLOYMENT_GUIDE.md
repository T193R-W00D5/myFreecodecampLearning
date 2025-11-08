# Deployment Pipeline and Test Tagging Guide

## Overview

This document describes the deployment pipeline implementation and test tagging strategy for the freecodecampOrg learning project.

## Test Tag Categories

### `@critical` - Production Blocking Tests
These tests **MUST pass** before production deployment. If 2 or more critical tests fail, production deployment is automatically blocked.

**Examples:**
- Homepage loads successfully
- Core navigation works
- Interactive features function properly
- Critical user journeys complete

**Current Critical Tests:**
- `Homepage: should load the home page successfully @critical @smoke`
- `Homepage: should have working navigation links @critical`
- `Interactive Features: should load interactive features page @critical @smoke`
- `Interactive Features: should show message when Click Me button is clicked @critical`
- `Navigation: should navigate to course curriculum page @critical`
- `Navigation: should navigate to Basic HTML from curriculum page @critical`

### `@smoke` - Quick Health Checks
Fast tests that verify basic functionality. Run frequently to catch obvious issues.

**Examples:**
- Page loads properly
- Basic UI elements are visible
- Static resources load correctly

### `@regression` - Comprehensive Testing
Detailed tests that verify complex scenarios and edge cases. Run weekly or before major releases.

**Examples:**
- Mobile responsiveness
- Accessibility features
- Error handling
- Performance characteristics

## Deployment Workflows

### Manual Deployment (Current - Option A)

**Trigger:** Manual button click in GitHub Actions

**Workflow:**
1. Navigate to Actions tab in GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Choose environment (staging/production)
5. Type "deploy" to confirm
6. Optionally run critical tests before deployment

**Features:**
- Full control over deployment timing
- Pre-deployment test gate
- Choice of staging or production environment
- Deployment confirmation required

### Scheduled Validation

**Triggers:**
- **Daily:** 8 AM weekdays - critical tests
- **Weekly:** 8 PM Sundays - full regression suite
- **Manual:** Run any test suite on demand

**Test Failure Handling:**
- **2+ critical test failures:** Creates "Production Deployment Blocked" issue
- **<2 critical test failures:** Creates "Production Deployment Ready" issue
- **Smoke/regression failures:** Warning notifications only

### Future Auto-Deployment (Option B - Prepared)

**Implementation:** Uncomment trigger sections in workflow files

**Workflow:**
1. Code merged to main branch
2. Scheduled validation runs automatically
3. If critical tests pass → deployment approved
4. Manual approval gate (optional)
5. Auto-deployment to production

## Deployment Environments

### Production
- **URL:** `https://t193r-w00d5.github.io/myFreecodecampLearning`
- **Purpose:** Live application for end users
- **Requirements:** All critical tests must pass
- **Approval:** Manual deployment trigger required

### Staging
- **URL:** `https://t193r-w00d5.github.io/myFreecodecampLearning/staging`
- **Purpose:** Pre-production testing environment
- **Requirements:** Basic smoke tests must pass
- **Approval:** Can be deployed more freely for testing

## Test Execution Examples

### Run Critical Tests Locally
```bash
npx playwright test --grep "@critical"
```

### Run Smoke Tests
```bash
npx playwright test --grep "@smoke"
```

### Run Regression Tests
```bash
npx playwright test --grep "@regression"
```

### Run Multiple Tag Categories
```bash
npx playwright test --grep "@critical|@smoke"
```

## GitHub Actions Integration

### Manual Deployment
1. Go to GitHub repository
2. Click "Actions" tab
3. Select "Deploy to GitHub Pages"
4. Click "Run workflow"
5. Configure deployment options:
   - Environment: staging/production
   - Confirmation: type "deploy"
   - Run tests: true/false

### View Test Results
1. Go to "Actions" tab
2. Select "Scheduled E2E Validation"
3. Click on latest run
4. View test artifacts and reports
5. Check deployment readiness issues

## Configuration Files

### Deploy Workflow
- **File:** `.github/workflows/deploy.yml`
- **Purpose:** Manual deployment with test gates
- **Features:** Environment selection, test execution, deployment confirmation

### Validation Workflow
- **File:** `.github/workflows/scheduled-validation.yml`
- **Purpose:** Automated test execution and deployment readiness
- **Features:** Multiple test suites, failure threshold monitoring, GitHub issue creation

## Best Practices

### Test Tagging Guidelines
1. **Tag conservatively:** Only mark truly critical tests as `@critical`
2. **Balance test suites:** Distribute tests across smoke, critical, and regression
3. **Update tags:** Review and adjust tags as application evolves
4. **Document decisions:** Explain why tests have specific tags

### Deployment Safety
1. **Always run critical tests** before production deployment
2. **Use staging environment** for risky changes
3. **Monitor deployment readiness issues** in GitHub
4. **Review test failures** before overriding blocks

### Performance Optimization
1. **Keep critical tests fast** (under 30 seconds total)
2. **Run regression tests** less frequently
3. **Parallelize test execution** where possible
4. **Cache dependencies** in CI/CD pipeline

## Troubleshooting

### Common Issues

**Critical Tests Failing:**
1. Check test output in Actions tab
2. Run tests locally to reproduce
3. Fix failing tests before deployment
4. Re-run validation after fixes

**Deployment Blocked:**
1. Review "Production Deployment Blocked" issue
2. Check which critical tests failed
3. Fix underlying issues
4. Manually trigger validation rerun

**Staging Environment Issues:**
1. Deploy to staging first for testing
2. Compare staging vs local behavior
3. Check GitHub Pages settings
4. Verify file exclusions in deploy workflow

**Test Tag Changes:**
1. Update tags in test files
2. Test locally with new tag filters
3. Update documentation
4. Commit and push changes