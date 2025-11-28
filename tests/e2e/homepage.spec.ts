import { test, expect } from '../fixtures/test-fixtures.js';

test.describe('fixture_startFrom_Home Tests', () => {
  test('should load the home page successfully @critical @smoke', async ({ fixture_startFrom_Home }) => {
    // Check that the page loads and has the correct title
    await expect(fixture_startFrom_Home).toHaveTitle('My freecodecamp learning');
    
    // Check main heading is present
    await expect(fixture_startFrom_Home.locator('h1').first()).toHaveText('My freecodecamp learning');
    
    // Check welcome section exists
    await expect(fixture_startFrom_Home.locator('h2')).toHaveText('Welcome!');
  });

  test('should have working navigation links @critical', async ({ fixture_startFrom_Home }) => {
    // Test the "Bottom of page" link
    const bottomLink = fixture_startFrom_Home.locator('a[href="#idFooter"]');
    await expect(bottomLink).toBeVisible();
    await expect(bottomLink).toHaveText('Bottom of page');
    
    // Click and verify it scrolls to footer
    await bottomLink.click();
    await expect(fixture_startFrom_Home.locator('#idFooter')).toBeInViewport();
  });

  test('should display course navigation @smoke', async ({ fixture_startFrom_Home }) => {
    // Check courses section exists
    await expect(fixture_startFrom_Home.locator('main section').nth(1).locator('h1')).toHaveText('Courses');
    
    // Check course link exists and is clickable
    const courseLink = fixture_startFrom_Home.locator('a[href*="Certified-Full-Stack-Developer-Curriculum"]');
    await expect(courseLink).toBeVisible();
    await expect(courseLink).toHaveText('Certified Full Stack Developer Curriculum');
  });

  test('should have proper page structure @regression', async ({ fixture_startFrom_Home }) => {
    // Verify semantic HTML structure
    await expect(fixture_startFrom_Home.locator('header#idHeader')).toBeVisible();
    await expect(fixture_startFrom_Home.locator('main')).toBeVisible();
    await expect(fixture_startFrom_Home.locator('footer#idFooter')).toBeVisible();
    
    // Check favicon is loaded
    await expect(fixture_startFrom_Home.locator('link[rel="icon"]')).toHaveAttribute('href', '/assets/favicon/Wizard.ico');
    
    // Check CSS is loaded
    await expect(fixture_startFrom_Home.locator('link[rel="stylesheet"]')).toHaveAttribute('href', '/css/styles-freecodecamp.css');
  });

  // test('should be responsive on mobile @regression', async ({ fixture_startFrom_Home }) => {
  //   // Set mobile viewport
  //   await fixture_startFrom_Home.setViewportSize({ width: 375, height: 667 });
  //   await fixture_startFrom_Home.reload(); // Reload to apply viewport changes
    
  //   // Verify page still loads properly on mobile
  //   // Use waitForSelector with more lenient visibility check
  //   await fixture_startFrom_Home.waitForSelector('h1', { state: 'attached' });
    
  //   // Check that the h1 exists in DOM (may be hidden by CSS on mobile)
  //   const h1Element = fixture_startFrom_Home.locator('h1').first();
  //   await expect(h1Element).toHaveText('My freecodecamp learning');
    
  //   // Check navigation link is still accessible
  //   await expect(fixture_startFrom_Home.locator('nav ul li a')).toBeAttached();
  // });

});