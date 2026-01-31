import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("displays the title", async ({ page }) => {
    await page.goto("/");

    const heading = page.locator("h1");
    await expect(heading).toContainText("Make Something");
    await expect(heading).toContainText("People");
    await expect(heading).toContainText("Want");
  });
});
