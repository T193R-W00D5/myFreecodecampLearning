import { test as base, Page } from '@playwright/test';

// Define custom fixtures interface
interface CustomFixtures {
  serverRunning: Page;
  homePage: Page;
  curriculumPage: Page;
  interactivePage: Page;
}

// Extend base test with custom fixtures
export const test = base.extend<CustomFixtures>({
  // Custom fixture for testing with server running
  serverRunning: async ({ page }, use) => {
    // Verify server is responding before running tests
    const response = await page.goto('/');
    if (!response?.ok()) {
      throw new Error('Server is not running or not responding properly');
    }
    await use(page);
  },

  // Custom fixture for homepage testing
  homePage: async ({ page }, use) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    await use(page);
  },

  // Custom fixture for curriculum page testing
  curriculumPage: async ({ page }, use) => {
    await page.goto('/pages/s100101-Certified-Full-Stack-Developer-Curriculum/_Home-Certified-Full-Stack-Developer-Curriculum.html');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    await use(page);
  },

  // Custom fixture for testing interactive elements
  interactivePage: async ({ page }, use) => {
    await page.goto('/pages/interactive-features.html');
    // Wait for any JavaScript to load
    await page.waitForLoadState('networkidle');
    await use(page);
  }
});

export { expect } from '@playwright/test';