//import { test as base, Page } from '@playwright/test';
import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';
//import { p_index_html as alias_p_index_html } from '..//../src/scripts/_main-helper.js'   // '../../../src/scripts/_main-helper.js'
import { paths, ariaLabels, roles, linkText } from '../../src/scripts/shared-constants__main.js';

// Define custom fixtures interface
interface CustomFixtures {
  serverRunning: Page;
  homePage: Page;
  curriculumPage: Page;
  interactivePage: Page;
  //p_index_html: string;
  paths: typeof paths;
  ariaLabels: typeof ariaLabels;
  roles: typeof roles;
  linkText: typeof linkText;
}

// Extend base test with custom fixtures
export const test = base.extend<CustomFixtures>({

/*   p_index_html: async ({}, use) => {
    await use(alias_p_index_html);
  }, */
  
  paths: async ({}, use) => await use(paths),
  ariaLabels: async ({}, use) => await use(ariaLabels),
  roles: async ({}, use) => await use(roles),

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