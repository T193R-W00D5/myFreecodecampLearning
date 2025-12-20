import { test as base } from "@playwright/test";
import type { Page } from "@playwright/test";

import * as sharedConstants_main from "../../src/scripts/sharedConstants-__main.js";
//import * as sharedConstants_CFSDBasicHTML from "../../src/scripts/sharedConstants-CFSD-basic-html-helper.js";

export interface CustomFixtures {
  // Custom page fixtures, i.e. browser tabs with specific starting URLs
  // serverRunning: Page; // Page to verify server is responding before running tests
  fixture_startFrom_Home: Page;
  fixture_startFrom_CFSD_Home: Page;
  fixture_startFrom_interactivePage: Page;

  // // Constants fixtures from sharedConstants_main
  // paths_main: typeof sharedConstants_main.paths;
  // ariaLabels_main: typeof sharedConstants_main.ariaLabels;
  // roles_main: typeof sharedConstants_main.roles;
  // linkVisibleNames_main: typeof sharedConstants_main.linkVisibleNames;

  // // Constants fixtures from sharedConstants_CFSDBasicHTML
  // paths_CFSD_Basic_HTML: typeof sharedConstants_CFSDBasicHTML.paths_CFSD_Basic_HTML;
  // ariaLabels_CFSD_Basic_HTML: typeof sharedConstants_CFSDBasicHTML.ariaLabels_CFSD_Basic_HTML;
  // roles_CFSD_Basic_HTML: typeof sharedConstants_CFSDBasicHTML.roles_CFSD_Basic_HTML;
  // linkVisibleNames_CFSD_Basic_HTML: typeof sharedConstants_CFSDBasicHTML.linkVisibleNames_CFSD_Basic_HTML;
}

export const test = base.extend<CustomFixtures>({
  // ****************************************************************************************************************************
  // ****************************************************************************************************************************
  // Shared constants to expose in tests via fixtures so we don't have to import them for each spec.ts file ***
  //   This is really only necessary if we have more than one spec file that uses most of these constants because they can
  //     just be imported directly where needed otherwise. There is no performance benefit to exposing them as fixtures.
  //   The async ({}, use) => await use(...) pattern is implemented here to expose constants as fixtures.

  // //////sharedConstants_main: async ({}, use) => await use(sharedConstants_main),
  // paths_main: async ({}, use) => await use(sharedConstants_main.paths),
  // ariaLabels_main: async ({}, use) => await use(sharedConstants_main.ariaLabels),
  // roles_main: async ({}, use) => await use(sharedConstants_main.roles),
  // linkVisibleNames_main: async ({}, use) => await use(sharedConstants_main.linkVisibleNames),

  // paths_CFSD_Basic_HTML: async ({}, use) => await use(sharedConstants_CFSDBasicHTML.paths_CFSD_Basic_HTML),
  // ariaLabels_CFSD_Basic_HTML: async ({}, use) => await use(sharedConstants_CFSDBasicHTML.ariaLabels_CFSD_Basic_HTML),
  // roles_CFSD_Basic_HTML: async ({}, use) => await use(sharedConstants_CFSDBasicHTML.roles_CFSD_Basic_HTML),
  // linkVisibleNames_CFSD_Basic_HTML: async ({}, use) => await use(sharedConstants_CFSDBasicHTML.linkVisibleNames_CFSD_Basic_HTML),

  // ****************************************************************************************************************************
  // ****************************************************************************************************************************

  // Custom fixture for testing with server running
  // serverRunning: async ({ page }, use) => {
  //   // Verify that the server is responding before running tests
  //   const response = await page.goto('/');
  //   if (!response?.ok()) {
  //     throw new Error('Server is not running or not responding properly');
  //   }
  //   await use(page);
  // },

  // Custom fixture for fixture_startFrom_Home testing
  fixture_startFrom_Home: async ({ page }, use) => {
    await page.goto("/tigercuriosity/");
    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");
    await use(page);
  },

  // Custom fixture for curriculum page testing
  fixture_startFrom_CFSD_Home: async ({ page }, use) => {
    // await page.goto('/pages/s100101-CFSDc/Home-Certified-Full-Stack-Developer-Curriculum.html');
    // await page.goto(sharedConstants_main.paths.path_CFSD_Home);
    await page.goto(sharedConstants_main.paths.path_CFSD_Home);
    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");
    await use(page);
  },

  // Custom fixture for testing interactive elements
  fixture_startFrom_interactivePage: async ({ page }, use) => {
    // await page.goto('/pages/interactive-features.html');
    await page.goto(sharedConstants_main.paths.path_InteractiveFeatures);
    // Wait for any JavaScript to load
    await page.waitForLoadState("networkidle");
    await use(page);
  },
});

export { expect } from "@playwright/test";
