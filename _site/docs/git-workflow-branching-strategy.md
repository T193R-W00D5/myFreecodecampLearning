# Git Workflow: Creating Targeted Fix Branches

## Overview

This document describes a powerful git workflow for making targeted fixes while preserving ongoing work on feature branches. This approach allows you to:

- Make focused changes in isolation
- Keep your main work branch clean
- Easily merge fixes back to main
- Update your feature branch with the latest changes

## The Scenario

You're working on a feature branch (`improveInitialPlaywrightTests20251116a`) with ongoing changes, but you discover configuration issues that need immediate fixes. Instead of mixing these fixes with your feature work, create a dedicated fix branch.

## Step-by-Step Workflow

### 1. Assess the Current Situation

First, check your current branch and status:

```bash
git status
git branch
```

You'll see your current work in progress and confirm which branch you're on.

### 2. Create a Targeted Fix Branch

Create and switch to a new branch from main for your fixes:

```bash
git checkout main
git checkout -b fix-playwright-parallel-port-config
```

**Why from main?** This ensures your fix branch contains only the changes needed for the fix, not your ongoing feature work.

### 3. Make Focused Changes

Make only the specific changes needed for your fix. In our case:

- Updated `playwright.config.ts` with proper browser identifiers and server reuse
- Modified `.github/workflows/e2e-tests.yml` for enhanced CI testing
- Applied `npm audit fix` for security vulnerabilities
- Updated documentation in `docs/ci.md`

### 4. Commit and Push the Fix

```bash
git add .
git commit -m "Fix Playwright config: browser identifiers, server reuse, and CI enhancement"
git push -u origin fix-playwright-parallel-port-config
```

### 5. Create and Merge Pull Request

Create a PR from your fix branch to main:

```bash
# Use GitHub UI or CLI
gh pr create --title "Fix Playwright config and enhance CI testing" --body "Targeted fixes for configuration issues"
```

After review and CI passes, merge the PR and delete the fix branch:

```bash
# Via GitHub UI: Squash and merge
# Clean up locally
git checkout main
git pull
git branch -d fix-playwright-parallel-port-config
```

### 6. Update Your Feature Branch

Return to your original feature branch and incorporate the fixes:

```bash
git checkout improveInitialPlaywrightTests20251116a
```

**Stash your work** (if you have uncommitted changes):
```bash
git stash push -m "Save work in progress before merging latest main changes"
```

**Merge the latest main** (which now includes your fixes):
```bash
git merge main
```

**Restore your work**:
```bash
git stash pop
```

## Key Benefits

### ✅ **Clean Separation of Concerns**
- Fixes are isolated from feature work
- Easy to review and understand changes
- Reduces risk of introducing unrelated bugs

### ✅ **Reliable CI/CD**
- Each fix can be tested independently
- Feature branch benefits from improved infrastructure
- Faster feedback loops for both fixes and features

### ✅ **Better Collaboration**
- Teammates can review focused changes
- Fixes can be merged quickly without waiting for feature completion
- Clear git history shows what was fixed when

### ✅ **Risk Management**
- If fix branch has issues, feature branch is unaffected
- Easy to revert specific fixes without losing feature work
- Maintains working main branch at all times

## Alternative Approaches

### Cherry-Pick Method
If you had already committed fixes in your feature branch:

```bash
git checkout main
git cherry-pick <commit-hash-of-fix>
git push
# Then rebase your feature branch
git checkout feature-branch
git rebase main
```

### Direct Main Push (Not Recommended)
```bash
# Don't do this for collaborative projects
git checkout main
git add fixes
git commit -m "Quick fix"
git push
```

**Why avoid?** Bypasses code review, testing, and collaborative workflow.

## Best Practices

### 🎯 **Keep Fixes Small and Focused**
- One fix per branch when possible
- Clear, descriptive commit messages
- Comprehensive PR descriptions

### 🔄 **Use Consistent Naming**
- `fix-[description]` for bug fixes
- `config-[description]` for configuration changes
- `security-[description]` for security updates

### 📋 **Document Your Workflow**
- Update project documentation
- Share workflow with team members
- Include commands in PR descriptions

### 🧪 **Test Thoroughly**
- Run full test suite on fix branch
- Verify CI passes before merging
- Test feature branch after incorporating fixes

## Example Commands Summary

```bash
# 1. Create fix branch from main
git checkout main
git checkout -b fix-description

# 2. Make and commit changes
git add .
git commit -m "Fix: description of changes"
git push -u origin fix-description

# 3. Merge via PR, then update feature branch
git checkout feature-branch
git stash push -m "Save WIP"
git merge main
git stash pop
```

## Conclusion

This workflow provides a robust foundation for managing complex development scenarios. By separating fixes from features, you maintain code quality, enable better collaboration, and reduce the risk of introducing bugs.

The key insight is that **not all changes belong in the same branch** - strategic branching leads to cleaner code, better reviews, and more maintainable projects.

---

*Generated on November 19, 2025 - Based on practical experience fixing Playwright configuration while maintaining feature development workflow.*