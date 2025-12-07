# Instructions

[![Node.js CI](https://github.com/T193R-W00D5/freecodecampOrg/actions/workflows/node.js.yml/badge.svg)](https://github.com/T193R-W00D5/freecodecampOrg/actions/workflows/node.js.yml)
[![E2E Tests](https://github.com/T193R-W00D5/freecodecampOrg/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/T193R-W00D5/freecodecampOrg/actions/workflows/e2e-tests.yml)
[![CI](https://github.com/T193R-W00D5/freecodecampOrg/actions/workflows/ci.yml/badge.svg)](https://github.com/T193R-W00D5/freecodecampOrg/actions/workflows/ci.yml)

## Local Development Server: Jekyll

This project uses Jekyll as a static site generator for both development and deployment.

### Prerequisites

- Ruby installed with Jekyll and Bundler gems
- All project dependencies installed via `bundle install`

### Starting the Development Server

1. Open a new terminal inside VS Code pointed to your project root folder location.

2. Run from terminal:

```bash
bundle exec jekyll serve
```

3. Open <http://127.0.0.1:4000/myFreecodecampLearning/> in your browser. You should see your webpage!

The Jekyll server will automatically:
- ✅ Process all Jekyll templating and layouts
- ✅ Handle path resolution for GitHub Pages compatibility  
- ✅ Auto-regenerate when you make changes to files
- ✅ Serve the site at the correct baseurl

### Jekyll vs Node.js

This project previously used a Node.js server but has migrated to Jekyll for:
- 🎯 **Better GitHub Pages integration** - Native Jekyll support
- 🔧 **Automatic path resolution** - No manual environment detection needed
- 📝 **Templating system** - Reusable layouts and components
- 🚀 **Optimized deployment** - Jekyll generates static files for faster loading

## Testing

🛒 1. Install nodemon (globally or locally)

Globally (available from anywhere):

```bash
npm install -g nodemon
```
Locally (specific to your project):

```bash
npm install --save-dev nodemon
```

🧨 2. Run Your Server with nodemon

Once installed, instead of:

```bash
node server.js
```

…you’ll use:

```bash
nodemon server.js
```

Watch it launch—and then automatically restart if you tweak server.js or other watched files.

🗂️ Optional: Add a Script to package.json

If you want to simplify your workflow even further, add a custom script:

```json
"scripts": {
  "dev": "nodemon server.js"
}
```

Then run:

```bash
npm run dev
```

Your server's now on autopilot ✈️

## Testing

This project includes both unit tests (Jest) and end-to-end tests (Playwright) with **TypeScript** support for enhanced type safety and better development experience.

### Quick Start Testing
```bash
# Run all unit tests
npm test

# Run all E2E tests (headless) - TypeScript files
npm run test:e2e

# Run E2E tests with browser visible (great for debugging)
npm run test:e2e:headed

# Run TypeScript type checking
npx tsc --noEmit

# Run both unit and E2E tests
npm run test:all
```

### Available Test Commands
```bash
# Unit Tests (Jest)
npm test                # Jest unit tests
npm run test:unit       # Same as above

# E2E Tests (Playwright with TypeScript)
npm run test:e2e        # All browsers, headless
npm run test:e2e:headed # All browsers, visible
npm run test:e2e:debug  # Debug mode with pauses
npm run test:e2e:ui     # Interactive UI mode

# Browser-specific E2E tests
npm run test:e2e:chrome    # Chromium only
npm run test:e2e:firefox   # Firefox only  
npm run test:e2e:webkit    # WebKit/Safari only

# TypeScript
npx tsc --noEmit        # Type checking without output
```

### Test Setup
1. **Unit tests** are in `__tests__/` directory (Jest)
2. **E2E tests** are in `tests/e2e/` directory (TypeScript + Playwright)
3. **Test fixtures** provide type-safe, reusable test setup
4. **Test results** saved to `test-results/` directory

### TypeScript Integration
- All Playwright tests use TypeScript (`.ts` files)
- Enhanced type safety and IntelliSense support
- Automatic type checking in CI pipeline
- Custom fixtures with proper type definitions

For detailed testing information, see [docs/PLAYWRIGHT_GUIDE.md](docs/PLAYWRIGHT_GUIDE.md).

## Volta (recommended) — pin and use a project Node version

Volta is a lightweight, fast tool for pinning Node, npm, and yarn per-project so every contributor uses the same runtime without global installs.

Quick guide

- Install Volta:
  - macOS / Linux (recommended):
```bash
curl https://get.volta.sh | bash
```
  - Windows (Scoop):
```powershell
# install scoop first: https://scoop.sh/
# then:
scoop install volta
```
  - Windows (Chocolatey):
```powershell
choco install volta
```

- Pin the project Node version (example uses the version pinned in this project):
```bash
volta pin node@22.21.0
```
This writes a `volta` entry into `package.json` so Volta users automatically use that Node version when they cd into the project.

- Alternative: add a `volta` section manually to `package.json`:
```json
"volta": {
  "node": "22.21.0"
}
```

- Verify:
```bash
node -v        # should match the pinned version for Volta users
volta list     # shows the pinned tools/versions
```

Notes & tips
- Volta is non-destructive and sits in your PATH, so it coexists well with `nvm` (or `nvm-windows`) as long as you understand which manager is first in your PATH. On Windows, Volta is usually friendlier for non-admin installs.
- If some contributors prefer `nvm`, consider also adding a small `.nvmrc` file containing the major/minor version (for example `22.21.0`) so `nvm` users can run `nvm use`:
```text
22.21.0
```
- To help CI and other tools, consider adding an `engines` field to `package.json`:
```json
"engines": {
  "node": ">=18 <=22.21.0"
}
```

Other small suggestions
- Use `npm ci` in CI for reproducible installs.
- Add a small `CONTRIBUTING.md` describing how to run the server locally and how to run tests.
- Consider adding `.editorconfig` and a formatter/linter (Prettier / ESLint) if you want consistent style across contributors.
- Keep `.vscode` workspace settings checked in only if they are helpful for all contributors (you already have a workspace node check which is useful).

If you want, I can add a `.nvmrc`, `CONTRIBUTING.md`, or an `engines` entry for you — tell me which and I’ll add it.
```text
22.21.0
```
- To help CI and other tools, consider adding an `engines` field to `package.json`:
```json
"engines": {
  "node": ">=18 <=22.21.0"
}
```

Other small suggestions
- Use `npm ci` in CI for reproducible installs.
- Add a small `CONTRIBUTING.md` describing how to run the server locally and how to run tests.
- Consider adding `.editorconfig` and a formatter/linter (Prettier / ESLint) if you want consistent style across contributors.
- Keep `.vscode` workspace settings checked in only if they are helpful for all contributors (you already have a workspace node check which is useful).

If you want, I can add a `.nvmrc`, `CONTRIBUTING.md`, or an `engines` entry for you — tell me which and I’ll add it.
