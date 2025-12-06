
critical-validation
failed yesterday (11/18/2025) in 1m 18s

#Run critical E2E tests

```txt
Run npx playwright test --grep "@critical" --reporter=html,json
  npx playwright test --grep "@critical" --reporter=html,json
  shell: /usr/bin/bash -e {0}
  env:
    CI: true
{
  "config": {
    "configFile": "/home/runner/work/myFreecodecampLearning/myFreecodecampLearning/playwright.config.ts",
    "rootDir": "/home/runner/work/myFreecodecampLearning/myFreecodecampLearning/tests/e2e",
    "forbidOnly": true,
    "fullyParallel": true,
    "globalSetup": null,
    "globalTeardown": null,
    "globalTimeout": 0,
    "grep": {},
    "grepInvert": null,
    "maxFailures": 0,
    "metadata": {
      "ci": {
        "commitHref": "https://github.com/T193R-W00D5/myFreecodecampLearning/commit/5d19d14b0c21a71b52245f241fb4a37272f8a23d",
        "commitHash": "5d19d14b0c21a71b52245f241fb4a37272f8a23d",
        "buildHref": "https://github.com/T193R-W00D5/myFreecodecampLearning/actions/runs/19458639598"
      },
      "gitCommit": {
        "shortHash": "5d19d14",
        "hash": "5d19d14b0c21a71b52245f241fb4a37272f8a23d",
        "subject": "Merge pull request #8 from T193R-W00D5/fix-mobile-chrome-tests",
        "body": "Merge pull request #8 from T193R-W00D5/fix-mobile-chrome-tests\n\nremove: Mobile browser testing to eliminate CI failures",
        "author": {
          "name": "T1g3R W00D5",
          "email": "barry21skatz@yahoo.com",
          "time": 1763241264000
        },
        "committer": {
          "name": "GitHub",
          "email": "noreply@github.com",
          "time": 1763241264000
        },
        "branch": "main"
      }
    },
    "preserveOutput": "always",
    "reporter": [
      [
        "html"
      ],
      [
        "json"
      ]
    ],
    "reportSlowTests": {
      "max": 5,
      "threshold": 300000
    },
    "quiet": false,
    "projects": [
      {
        "outputDir": "/home/runner/work/myFreecodecampLearning/myFreecodecampLearning/test-results",
        "repeatEach": 1,
        "retries": 2,
        "metadata": {
          "ci": {
            "commitHref": "https://github.com/T193R-W00D5/myFreecodecampLearning/commit/5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "commitHash": "5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "buildHref": "https://github.com/T193R-W00D5/myFreecodecampLearning/actions/runs/19458639598"
          },
          "gitCommit": {
            "shortHash": "5d19d14",
            "hash": "5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "subject": "Merge pull request #8 from T193R-W00D5/fix-mobile-chrome-tests",
            "body": "Merge pull request #8 from T193R-W00D5/fix-mobile-chrome-tests\n\nremove: Mobile browser testing to eliminate CI failures",
            "author": {
              "name": "T1g3R W00D5",
              "email": "barry21skatz@yahoo.com",
              "time": 1763241264000
            },
            "committer": {
              "name": "GitHub",
              "email": "noreply@github.com",
              "time": 1763241264000
            },
            "branch": "main"
          }
        },
        "id": "chromium",
        "name": "chromium",
        "testDir": "/home/runner/work/myFreecodecampLearning/myFreecodecampLearning/tests/e2e",
        "testIgnore": [],
        "testMatch": [
          "**/*.@(spec|test).?(c|m)[jt]s?(x)"
        ],
        "timeout": 30000
      },
      {
        "outputDir": "/home/runner/work/myFreecodecampLearning/myFreecodecampLearning/test-results",
        "repeatEach": 1,
        "retries": 2,
        "metadata": {
          "ci": {
            "commitHref": "https://github.com/T193R-W00D5/myFreecodecampLearning/commit/5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "commitHash": "5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "buildHref": "https://github.com/T193R-W00D5/myFreecodecampLearning/actions/runs/19458639598"
          },
          "gitCommit": {
            "shortHash": "5d19d14",
            "hash": "5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "subject": "Merge pull request #8 from T193R-W00D5/fix-mobile-chrome-tests",
            "body": "Merge pull request #8 from T193R-W00D5/fix-mobile-chrome-tests\n\nremove: Mobile browser testing to eliminate CI failures",
            "author": {
              "name": "T1g3R W00D5",
              "email": "barry21skatz@yahoo.com",
              "time": 1763241264000
            },
            "committer": {
              "name": "GitHub",
              "email": "noreply@github.com",
              "time": 1763241264000
            },
            "branch": "main"
          }
        },
        "id": "firefox",
        "name": "firefox",
        "testDir": "/home/runner/work/myFreecodecampLearning/myFreecodecampLearning/tests/e2e",
        "testIgnore": [],
        "testMatch": [
          "**/*.@(spec|test).?(c|m)[jt]s?(x)"
        ],
        "timeout": 30000
      },
      {
        "outputDir": "/home/runner/work/myFreecodecampLearning/myFreecodecampLearning/test-results",
        "repeatEach": 1,
        "retries": 2,
        "metadata": {
          "ci": {
            "commitHref": "https://github.com/T193R-W00D5/myFreecodecampLearning/commit/5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "commitHash": "5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "buildHref": "https://github.com/T193R-W00D5/myFreecodecampLearning/actions/runs/19458639598"
          },
          "gitCommit": {
            "shortHash": "5d19d14",
            "hash": "5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "subject": "Merge pull request #8 from T193R-W00D5/fix-mobile-chrome-tests",
            "body": "Merge pull request #8 from T193R-W00D5/fix-mobile-chrome-tests\n\nremove: Mobile browser testing to eliminate CI failures",
            "author": {
              "name": "T1g3R W00D5",
              "email": "barry21skatz@yahoo.com",
              "time": 1763241264000
            },
            "committer": {
              "name": "GitHub",
              "email": "noreply@github.com",
              "time": 1763241264000
            },
            "branch": "main"
          }
        },
        "id": "webkit",
        "name": "webkit",
        "testDir": "/home/runner/work/myFreecodecampLearning/myFreecodecampLearning/tests/e2e",
        "testIgnore": [],
        "testMatch": [
          "**/*.@(spec|test).?(c|m)[jt]s?(x)"
        ],
        "timeout": 30000
      },
      {
        "outputDir": "/home/runner/work/myFreecodecampLearning/myFreecodecampLearning/test-results",
        "repeatEach": 1,
        "retries": 2,
        "metadata": {
          "ci": {
            "commitHref": "https://github.com/T193R-W00D5/myFreecodecampLearning/commit/5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "commitHash": "5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "buildHref": "https://github.com/T193R-W00D5/myFreecodecampLearning/actions/runs/19458639598"
          },
          "gitCommit": {
            "shortHash": "5d19d14",
            "hash": "5d19d14b0c21a71b52245f241fb4a37272f8a23d",
            "subject": "Merge pull request #8 from T193R-W00D5/fix-mobile-chrome-tests",
            "body": "Merge pull request #8 from T193R-W00D5/fix-mobile-chrome-tests\n\nremove: Mobile browser testing to eliminate CI failures",
            "author": {
              "name": "T1g3R W00D5",
              "email": "barry21skatz@yahoo.com",
              "time": 1763241264000
            },
            "committer": {
              "name": "GitHub",
              "email": "noreply@github.com",
              "time": 1763241264000
            },
            "branch": "main"
          }
        },
        "id": "Microsoft Edge",
        "name": "Microsoft Edge",
        "testDir": "/home/runner/work/myFreecodecampLearning/myFreecodecampLearning/tests/e2e",
        "testIgnore": [],
        "testMatch": [
          "**/*.@(spec|test).?(c|m)[jt]s?(x)"
        ],
        "timeout": 30000
      }
    ],
    "shard": null,
    "updateSnapshots": "missing",
    "updateSourceMethod": "patch",
    "version": "1.56.1",
    "workers": 1,
    "webServer": {
      "command": "npm start",
      "url": "http://localhost:3010",
      "reuseExistingServer": false,
      "stdout": "ignore",
      "stderr": "pipe"
    }
  },
  "suites": [],
  "errors": [
    {
      "message": "Error: http://localhost:3010 is already used, make sure that nothing is running on the port/url or set reuseExistingServer:true in config.webServer.",
      "stack": "Error: http://localhost:3010 is already used, make sure that nothing is running on the port/url or set reuseExistingServer:true in config.webServer."
    }
  ],
  "stats": {
    "startTime": "2025-11-18T08:06:33.849Z",
    "duration": 33.97000000000003,
    "expected": 0,
    "skipped": 0,
    "unexpected": 0,
    "flaky": 0
  }
}
Error: Process completed with exit code 1.

```

Github CoPilot: (autogenerated question) for failed test: Please find a solution for this failing job. Use the logs, job definition, and any referenced files where the failure occurred. Keep your response focused on the solution and include code suggestions when appropriate.

Github CoPilot:

The job failed because the server at http://localhost:3010 was already in use. This often happens if a previous process using that port did not shut down correctly, or if multiple jobs are trying to use the same port simultaneously.

# Solution Steps

1. Terminate Existing Processes on Port 3010 Before starting your server in the workflow job, ensure nothing else is running on that port. In your workflow or setup script, add a step to kill any process using port 3010:

```YAML
- name: Free Port 3010
  run: |
    if lsof -i:3010; then
      kill -9 $(lsof -t -i:3010)
    fi
```

1. Configure Server Reuse (if your test framework supports it) If you are using a framework with a config.webServer option (e.g., Playwright), set reuseExistingServer: true so tests will reuse an already running server instead of failing:

```js
// playwright.config.js
module.exports = {  
  webServer: {
    command: 'npm start',
    port: 3010,
    reuseExistingServer: true, // <--- Add this line
  }
};
```

1. Ensure Clean Shutdown in Previous Steps Double-check any previous workflow steps that start servers. Make sure they finish with a clean shutdown. For example, send SIGTERM or use the proper shutdown command after tests finish.

1. Parallel Job Consideration If you're running jobs in parallel that use the same port, stagger them or use different ports for each job.

# Summary of Changes

Add a step to free port 3010 before starting your server.
If using test tools like Playwright, set reuseExistingServer: true in your configuration.
Review your workflow for servers that might not shut down properly.
Let me know if you want to see your current workflow file (.github/workflows/scheduled-validation.yml) or any referenced test configuration for more detailed advice.

T193R-W00D5: In my curriculum-navigation.spec.ts, I am using Playwright parallel mode like this: "test.describe.configure({ mode: 'parallel' });". Would this cause the issue we are seeing, or is parallel mode ignored in the GitHub CI tests here?

Github CoPilot: Short answer: test.describe.configure({ mode: 'parallel' }) is not being silently ignored — it affects test scheduling — but it is not the root cause by itself. The real issue is that Playwright (by default) will try to start your configured webServer in multiple workers, and when more than one worker/process attempts to start the server on the same port you get the "port already used" error seen in job ref 5d19d14b0c21a71b52245f241fb4a37272f8a23d.

Why this happens

- test.describe.configure({ mode: 'parallel' }) makes tests inside that describe run in parallel (in addition to Playwright’s normal distribution of tests across workers).

- Playwright’s config.webServer is started per worker by default. If you have multiple workers (the default on CI is >1), several workers may try to run the same startup command and collide on port 3010.

-The log shows the exact failure: "http://localhost:3010 is already used…" — that means another worker/process already bound that port.

Recommended fixes (pick one or combine)

1. Prefer: reuse the existing server

- Set reuseExistingServer: true in playwright.config.[ts|js]. This tells Playwright to detect and reuse a running server and prevents other workers from trying to start it again.

Example (playwright.config.ts):

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3010',
    port: 3010,
    reuseExistingServer: true,    // <- add this
    timeout: 120_000,
  },
  // optionally tune workers
  // workers: 2,
});
```

1. Run tests with only one worker (simpler, but reduces parallelism)
Either set workers: 1 in the config or run tests with --workers=1 in your workflow.

Examples:

- playwright.config.ts:

```ts
export default defineConfig({
  workers: 1,
  // ...
});
```

- Or in GitHub Actions step:

```YAML
- run: npx playwright test --workers=1
```

1. Ensure the CI job does not start multiple servers / free the port

- Add a step to your GitHub Actions workflow to kill any process on port 3010 before starting tests (defensive):

```YAML
- name: Free port 3010
  run: |
    if lsof -i:3010 -t >/dev/null; then
      kill -9 $(lsof -t -i:3010) || true
    fi
```

1. Use a unique port per concurrent job (if you run multiple jobs in parallel)

- If scheduled workflows and PR workflows both run concurrently and use the same port, either ensure reuseExistingServer:true or pick dynamic ports per job (less common).

Which to choose

- reuseExistingServer: true is usually the best fix: keeps parallelism and prevents start collisions.

- workers: 1 is simplest if you don't need parallelism in CI.

- Killing the port is a defensive measure but not a real fix if multiple workers will still try to start the server.

Extra checks

- Confirm your playwright.config webServer has url or port set so Playwright waits for readiness (url is recommended).

- Confirm your workflow doesn’t run multiple jobs that each try to start the dev server on the same port without reuseExistingServer.

If you want, I can:

- Edit your playwright.config file to add reuseExistingServer and post a PR, or

- Show the exact change applied to the repo (using job/commit ref 5d19d14b0c21a71b52245f241fb4a37272f8a23d) — tell me which you prefer.

T193R-W00D5: This makes sense. Can you show me your recommended change in my playwright.config.ts file that I copied below?

```txt
... I pasted my original playwright.config.ts here ...
```

Github CoPilot: GitHub Copilot Chat Assistant

Set webServer.reuseExistingServer to true on CI so Playwright will reuse any already-running dev server (avoids multiple processes trying to bind :3010). Replace the current line reuseExistingServer: !process.env.CI with reuseExistingServer: true.

Updated playwright.config.ts (only the webServer section changed):

```ts
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3010',
    reuseExistingServer: true,   // <- changed to always reuse existing server (prevents port-in-use on CI)
    stdout: 'ignore',
    stderr: 'pipe',
  },
```

Why: If the CI job or another process has already started the app (or multiple workers try to start it), Playwright will detect the running server and reuse it instead of attempting to start new instances that collide on port 3010.

Optional defensive additions
- If you still see occasional collisions, add a pre-test step in your GitHub Actions workflow to free the port:
  ```yaml
  - name: Free port 3010
    run: |
      if lsof -i:3010 -t >/dev/null; then
        kill -9 $(lsof -t -i:3010) || true
      fi
  ```
- Or, if you never need parallelism in CI, you can keep workers: 1 (you already have that) or explicitly run tests with --workers=1.

If you want, I can open a PR with this single-line change to playwright.config.ts (ref: 5d19d14b0c21a71b52245f241fb4a37272f8a23d).
