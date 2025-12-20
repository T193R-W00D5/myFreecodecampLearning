import { test, expect } from "../fixtures/test-fixtures.js";

test.describe("Interactive Features Tests", () => {
  test("should load interactive features page @critical @smoke", async ({
    fixture_startFrom_interactivePage,
  }) => {
    await expect(fixture_startFrom_interactivePage).toHaveTitle(
      "Interactive Features",
    );
    await expect(fixture_startFrom_interactivePage.locator("h1")).toHaveText(
      "Interactive Features",
    );
  });

  test("should show message when Click Me button is clicked @critical", async ({
    fixture_startFrom_interactivePage,
  }) => {
    const messageBtn = fixture_startFrom_interactivePage.locator("#messageBtn");
    const messageBox =
      fixture_startFrom_interactivePage.locator("#textMessage");

    // Verify button exists and is clickable
    await expect(messageBtn).toBeVisible();
    await expect(messageBtn).toHaveText("Click Me");

    // Click the button
    await messageBtn.click();

    // Check if message appears (this will depend on your JavaScript implementation)
    // We'll wait a bit for any JavaScript to execute
    await fixture_startFrom_interactivePage.waitForTimeout(100);

    // Check if the message box is updated
    // Note: This test might need adjustment based on your actual JavaScript behavior
    await expect(messageBox).toBeVisible();
  });

  test("should trigger alert test functionality @smoke", async ({
    fixture_startFrom_interactivePage,
  }) => {
    const alertBtn = fixture_startFrom_interactivePage.locator("#alert_test");

    // Verify alert button exists
    await expect(alertBtn).toBeVisible();
    await expect(alertBtn).toHaveText("Alert Test");

    // Click the alert test button
    await alertBtn.click();

    // Wait for any snackbar or alert functionality
    await fixture_startFrom_interactivePage.waitForTimeout(100);

    // Check if snackbar element is present
    const snackbar = fixture_startFrom_interactivePage.locator(
      "#snackbar_alert_test",
    );
    await expect(snackbar).toBeVisible();
  });

  test("should have proper accessibility attributes @smoke", async ({
    fixture_startFrom_interactivePage,
  }) => {
    // Check aria-labels
    await expect(
      fixture_startFrom_interactivePage.locator("#messageBtn"),
    ).toHaveAttribute("aria-label", "message_test");
    await expect(
      fixture_startFrom_interactivePage.locator("#alert_test"),
    ).toHaveAttribute("aria-label", "alert_test");

    // Check aria-live regions
    await expect(
      fixture_startFrom_interactivePage.locator("#textMessage"),
    ).toHaveAttribute("aria-live", "polite");

    // Check tabindex
    await expect(
      fixture_startFrom_interactivePage.locator("#messageBtn"),
    ).toHaveAttribute("tabindex", "0");
  });

  test("should handle keyboard navigation @regression", async ({
    fixture_startFrom_interactivePage,
  }) => {
    // Focus directly on the message button first
    await fixture_startFrom_interactivePage.locator("#messageBtn").focus();
    await expect(
      fixture_startFrom_interactivePage.locator("#messageBtn"),
    ).toBeFocused();

    // Test Enter key on focused button
    await fixture_startFrom_interactivePage.keyboard.press("Enter");
    await fixture_startFrom_interactivePage.waitForTimeout(100);

    // Tab to next button
    await fixture_startFrom_interactivePage.keyboard.press("Tab");
    await expect(
      fixture_startFrom_interactivePage.locator("#alert_test"),
    ).toBeFocused();
  });

  test("should load required JavaScript files @regression", async ({
    fixture_startFrom_interactivePage,
  }) => {
    // Check if the main script is loaded by looking for network requests
    const scriptRequests: string[] = [];
    fixture_startFrom_interactivePage.on("request", (request) => {
      if (request.url().includes(".js")) {
        scriptRequests.push(request.url());
      }
    });

    await fixture_startFrom_interactivePage.reload();

    // Wait for scripts to load
    await fixture_startFrom_interactivePage.waitForTimeout(1000);

    // Check if script.js was requested
    const hasMainScript = scriptRequests.some((url) =>
      url.includes("script.js"),
    );
    expect(hasMainScript).toBeTruthy();
  });
});
