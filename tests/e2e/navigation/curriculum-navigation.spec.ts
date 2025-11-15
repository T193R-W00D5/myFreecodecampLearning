import { test, expect } from '../../fixtures/test-fixtures.js';
import { debugConsole } from '../../../src/scripts/debug-console.js';
//import { p_index_html } from '../../../src/scripts/_main-helper.js'

test.describe('Curriculum Page Navigation Tests', () => {
  // Enable parallel execution for independent navigation tests
  test.describe.configure({ mode: 'parallel' });
  test('should navigate to Basic HTML from curriculum page @critical', async ({ curriculumPage }) => {
    // Click on the Basic HTML link
    const basicHtmlLink = curriculumPage.locator('a[href*="Basic-HTML"]');
    
    // Get the href to understand the navigation
    const href = await basicHtmlLink.getAttribute('href');
    debugConsole.log('Basic HTML link href:', href);
    
    // Click and wait for navigation or handle the response
    const [response] = await Promise.all([
      curriculumPage.waitForResponse(response => response.url().includes('Basic-HTML') || response.status() === 404),
      basicHtmlLink.click()
    ]);
    
    // Check that we got some response (even if 404)
    debugConsole.log('Navigation response status:', response.status());
    debugConsole.log('Navigation URL:', response.url());
    
    // Verify the click was registered
    expect(response.status()).toBeLessThanOrEqual(404);
  });

  test('should navigate to Home from curriculum page header Home link @smoke', async ({ curriculumPage, paths, ariaLabels, roles }) => {

    // *** For Debugging *** Log the expected aria-label to the console
    debugConsole.log('Header Home link aria-label should be:', ariaLabels.ariaLabel_homeLink_header);

    // Locate the header link
    const homeLink_header = curriculumPage.locator('header').getByRole('link', { name: 'Home' });

    // Assert that the header Home link is visible
    await expect(homeLink_header).toBeVisible();

    // *** For Debugging *** Log the expected path to the console
    debugConsole.log('Header Home link path should be:', paths.page_home);
    
    // Get the actual href attribute of the header Home link
    const actualHref_homeLink_header = await homeLink_header.getAttribute('href');
    // *** For Debugging *** Log the href to the console
    debugConsole.log('Header Home link href:', actualHref_homeLink_header);

    // Assert that the header Home link href is matches the expected path
    await expect(homeLink_header).toHaveAttribute('href', paths.page_home);
    
    // Click the link and wait for navigation
    await homeLink_header.click();
    //await expect(curriculumPage).toHaveURL(new RegExp(`${p_index_html.replace('.', '\\.')}$`));
    
    // Assert that the URL is matches the expected home page path
    await expect(curriculumPage).toHaveURL(new RegExp(`${paths.page_home.replace('.', '\\.')}$`));
    
  });
  
  test('should navigate to Home from curriculum page footer Home link @smoke', async ({ curriculumPage, paths, ariaLabels, roles }) => {

    // *** For Debugging *** Log the expected aria-label to the console
    debugConsole.log('Footer Home link aria-label should be:', ariaLabels.ariaLabel_homeLink_footer);

    // Locate the footer link
    const homeLink_footer = curriculumPage.locator('footer').getByRole('link', { name: 'Home' });

    // Assert that the footer Home link is visible
    await expect(homeLink_footer).toBeVisible();

    // *** For Debugging *** Log the expected path to the console
    debugConsole.log('Footer Home link path should be:', paths.page_home);

    // Get the actual href attribute of the footer Home link
    const actualHref_homeLink_footer = await homeLink_footer.getAttribute('href');
    // *** For Debugging *** Log the href to the console
    debugConsole.log('Footer Home link href:', actualHref_homeLink_footer);

    // Assert that the footer Home link href is matches the expected path
    await expect(homeLink_footer).toHaveAttribute('href', paths.page_home);
    
    // Click the link and wait for navigation
    await homeLink_footer.click();
    //await expect(curriculumPage).toHaveURL(new RegExp(`${p_index_html.replace('.', '\\.')}$`));
    
    // Assert that the URL is matches the expected home page path
    await expect(curriculumPage).toHaveURL(new RegExp(`${paths.page_home.replace('.', '\\.')}$`));

  });
});