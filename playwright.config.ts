import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['line'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4000/tigercuriosity',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // I am not designing the site for mobile at this time.
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: 'msedge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    // Chrome requires admin privileges to install, using Chromium instead
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'bundle exec jekyll serve',
    url: 'http://127.0.0.1:4000/tigercuriosity/',
    // 11/19/2025 T193R-W00D5: Using 'reuseExistingServer: !process.env.CI,' may have been causing issues in GitHub CI environments
    //  See project "/docs/Ai_chats/20251119a GitHub CoPilot - fix parallel worker tests using same port.md" for more details.
    // reuseExistingServer: !process.env.CI,   <- 11/19/2025 T193R-W00D5: commented out and changed to "true" to try to fix CI port-in-use issues
    reuseExistingServer: true,   // <- 11/19/2025 T193R-W00D5: changed to always reuse existing server (prevents port-in-use on CI)
    stdout: 'ignore',
    stderr: 'pipe',
  },

  /* Global setup/teardown */
  outputDir: 'test-results/',
  
  /* Timeout settings */
  timeout: 30000,
  expect: {
    timeout: 5000
  },
});