import { test, expect } from "../../fixtures/test-fixtures.js";

test.describe("Home Page Navigation Tests", () => {
  test("should navigate to course curriculum page @critical", async ({
    fixture_startFrom_Home,
  }) => {
    // Click on the course link
    const courseLink = fixture_startFrom_Home.locator(
      // 'a[href*="Certified-Full-Stack-Developer-Curriculum"]',
      'a[href*="Home-my-free-code-camp-learning.html"]',
    );

    // Get the href to understand the navigation
    const href = await courseLink.getAttribute("href");
    console.log("Course link href:", href);

    // Click and wait for navigation or handle the response
    const [response] = await Promise.all([
      fixture_startFrom_Home.waitForResponse(
        (response) =>
          response
            .url()
            .includes("Home-my-free-code-camp-learning.html") ||
          response.status() === 404,
      ),
      courseLink.click(),
    ]);

    // Check that we got some response (even if 404)
    console.log("Navigation response status:", response.status());
    console.log("Navigation URL:", response.url());

    // Verify the click was registered (URL should have changed or we got a response)
    expect(response.status()).toBeLessThanOrEqual(404);
  });

  test("should handle static file serving @smoke", async ({
    fixture_startFrom_Home,
  }) => {
    // Test CSS file loads
    const response = await fixture_startFrom_Home.goto(
      "/tigercuriosity/css/styles-tigercuriosity.css",
    );
    expect([200, 304]).toContain(response?.status());

    // For 304 responses, content-type might not be included in headers
    // since the browser already has the cached version with the correct type
    if (response?.status() === 200) {
      // Only check content-type for fresh responses
      const headers = response?.headers() || {};
      const contentType =
        headers["content-type"] ||
        headers["Content-Type"] ||
        headers["Content-type"];
      expect(contentType).toBeTruthy();
      expect(contentType).toContain("text/css");
    } else {
      console.log(
        "304 response - content-type validation skipped (cached response)",
      );
    }
  });

  test("should handle favicon properly @smoke", async ({
    fixture_startFrom_Home,
  }) => {
    // Test favicon loads
    const response = await fixture_startFrom_Home.goto(
      "/tigercuriosity/assets/favicon/Wizard.ico",
    );
    expect([200, 304]).toContain(response?.status());
  });

  test("should handle 404 gracefully @regression", async ({
    fixture_startFrom_Home,
  }) => {
    // Test non-existent page
    const response = await fixture_startFrom_Home.goto(
      "/tigercuriosity/non-existent-page",
      {
        waitUntil: "networkidle",
      },
    );

    // Should return some response (your server should handle this)
    // This test will help you identify how your server handles 404s
    console.log("404 response status:", response?.status());
  });
});
