import { test, expect } from '../fixtures/test-fixtures.js';

test.describe('Interactive Features Tests', () => {
  test('should load interactive features page @critical @smoke', async ({ interactivePage }) => {
    await expect(interactivePage).toHaveTitle('Cafe Menu');
    await expect(interactivePage.locator('h1')).toHaveText('Interactive Features');
  });

  test('should show message when Click Me button is clicked @critical', async ({ interactivePage }) => {
    const messageBtn = interactivePage.locator('#messageBtn');
    const messageBox = interactivePage.locator('#textMessage');

    // Verify button exists and is clickable
    await expect(messageBtn).toBeVisible();
    await expect(messageBtn).toHaveText('Click Me');

    // Click the button
    await messageBtn.click();

    // Check if message appears (this will depend on your JavaScript implementation)
    // We'll wait a bit for any JavaScript to execute
    await interactivePage.waitForTimeout(100);
    
    // Check if the message box is updated
    // Note: This test might need adjustment based on your actual JavaScript behavior
    await expect(messageBox).toBeVisible();
  });

  test('should trigger alert test functionality @smoke', async ({ interactivePage }) => {
    const alertBtn = interactivePage.locator('#alert_test');
    
    // Verify alert button exists
    await expect(alertBtn).toBeVisible();
    await expect(alertBtn).toHaveText('Alert Test');

    // Click the alert test button
    await alertBtn.click();

    // Wait for any snackbar or alert functionality
    await interactivePage.waitForTimeout(100);
    
    // Check if snackbar element is present
    const snackbar = interactivePage.locator('#snackbar_alert_test');
    await expect(snackbar).toBeVisible();
  });

  test('should have proper accessibility attributes @smoke', async ({ interactivePage }) => {
    // Check aria-labels
    await expect(interactivePage.locator('#messageBtn')).toHaveAttribute('aria-label', 'message_test');
    await expect(interactivePage.locator('#alert_test')).toHaveAttribute('aria-label', 'alert_test');
    
    // Check aria-live regions
    await expect(interactivePage.locator('#textMessage')).toHaveAttribute('aria-live', 'polite');
    
    // Check tabindex
    await expect(interactivePage.locator('#messageBtn')).toHaveAttribute('tabindex', '0');
  });

  test('should handle keyboard navigation @regression', async ({ interactivePage }) => {
    // Test tab navigation to buttons
    await interactivePage.keyboard.press('Tab');
    await expect(interactivePage.locator('#messageBtn')).toBeFocused();
    
    // Test Enter key on focused button
    await interactivePage.keyboard.press('Enter');
    await interactivePage.waitForTimeout(100);
    
    // Tab to next button
    await interactivePage.keyboard.press('Tab');
    await expect(interactivePage.locator('#alert_test')).toBeFocused();
  });

  test('should load required JavaScript files @regression', async ({ interactivePage }) => {
    // Check if the main script is loaded by looking for network requests
    const scriptRequests: string[] = [];
    interactivePage.on('request', (request) => {
      if (request.url().includes('.js')) {
        scriptRequests.push(request.url());
      }
    });

    await interactivePage.reload();
    
    // Wait for scripts to load
    await interactivePage.waitForTimeout(1000);
    
    // Check if script.js was requested
    const hasMainScript = scriptRequests.some(url => url.includes('script.js'));
    expect(hasMainScript).toBeTruthy();
  });
});