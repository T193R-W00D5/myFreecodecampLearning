import { test, expect } from '../fixtures/test-fixtures.js';

test.describe('Homepage Tests', () => {
  test('should load the home page successfully @critical @smoke', async ({ homePage }) => {
    // Check that the page loads and has the correct title
    await expect(homePage).toHaveTitle('My freecodecamp learning');
    
    // Check main heading is present
    await expect(homePage.locator('h1').first()).toHaveText('My freecodecamp learning');
    
    // Check welcome section exists
    await expect(homePage.locator('h2')).toHaveText('Welcome!');
  });

  test('should have working navigation links @critical', async ({ homePage }) => {
    // Test the "Bottom of page" link
    const bottomLink = homePage.locator('a[href="#idFooter"]');
    await expect(bottomLink).toBeVisible();
    await expect(bottomLink).toHaveText('Bottom of page');
    
    // Click and verify it scrolls to footer
    await bottomLink.click();
    await expect(homePage.locator('#idFooter')).toBeInViewport();
  });

  test('should display course navigation @smoke', async ({ homePage }) => {
    // Check courses section exists
    await expect(homePage.locator('main section').nth(1).locator('h1')).toHaveText('Courses');
    
    // Check course link exists and is clickable
    const courseLink = homePage.locator('a[href*="Certified-Full-Stack-Developer-Curriculum"]');
    await expect(courseLink).toBeVisible();
    await expect(courseLink).toHaveText('Certified Full Stack Developer Curriculum');
  });

  test('should have proper page structure @regression', async ({ homePage }) => {
    // Verify semantic HTML structure
    await expect(homePage.locator('header#idHeader')).toBeVisible();
    await expect(homePage.locator('main')).toBeVisible();
    await expect(homePage.locator('footer#idFooter')).toBeVisible();
    
    // Check favicon is loaded
    await expect(homePage.locator('link[rel="icon"]')).toHaveAttribute('href', '/assets/favicon/Wizard.ico');
    
    // Check CSS is loaded
    await expect(homePage.locator('link[rel="stylesheet"]')).toHaveAttribute('href', '/css/styles-freecodecamp.css');
  });

  // test('should be responsive on mobile @regression', async ({ homePage }) => {
  //   // Set mobile viewport
  //   await homePage.setViewportSize({ width: 375, height: 667 });
  //   await homePage.reload(); // Reload to apply viewport changes
    
  //   // Verify page still loads properly on mobile
  //   // Use waitForSelector with more lenient visibility check
  //   await homePage.waitForSelector('h1', { state: 'attached' });
    
  //   // Check that the h1 exists in DOM (may be hidden by CSS on mobile)
  //   const h1Element = homePage.locator('h1').first();
  //   await expect(h1Element).toHaveText('My freecodecamp learning');
    
  //   // Check navigation link is still accessible
  //   await expect(homePage.locator('nav ul li a')).toBeAttached();
  // });

});