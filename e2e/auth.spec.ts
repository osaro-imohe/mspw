import { test, expect } from "@playwright/test";

test.describe("Sign Up Page", () => {
  test("displays all required elements", async ({ page }) => {
    await page.goto("/signup");

    await expect(page.locator("h1")).toContainText("Sign up");
    await expect(page.getByText("Already have an account?")).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();

    await expect(
      page.getByRole("button", { name: /continue with google/i })
    ).toBeVisible();

    await expect(page.getByText("or continue with email")).toBeVisible();

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Confirm password")).toBeVisible();

    await expect(page.getByText(/terms of use/i)).toBeVisible();
    await expect(page.getByText(/privacy policy/i)).toBeVisible();

    await expect(
      page.getByRole("button", { name: /create account/i })
    ).toBeVisible();
  });

  test("shows validation errors for empty form submission", async ({
    page,
  }) => {
    await page.goto("/signup");

    await page.getByRole("button", { name: /create account/i }).click();

    await expect(
      page.getByText(/please enter a valid email/i)
    ).toBeVisible();
  });

  test("shows password requirements error for weak password", async ({
    page,
  }) => {
    await page.goto("/signup");

    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password", { exact: true }).fill("weak");
    await page.getByLabel("Confirm password").fill("weak");

    await page.getByRole("button", { name: /create account/i }).click();

    await expect(
      page.getByText(/password must be at least 8 characters/i)
    ).toBeVisible();
  });

  test("shows password mismatch error", async ({ page }) => {
    await page.goto("/signup");

    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password", { exact: true }).fill("Password123");
    await page.getByLabel("Confirm password").fill("DifferentPassword123");

    await page.getByRole("button", { name: /create account/i }).click();

    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
  });

  test("navigates to sign in page via link", async ({ page }) => {
    await page.goto("/signup");

    await page.getByRole("link", { name: "Sign in" }).click();

    await expect(page).toHaveURL("/signin");
  });
});

test.describe("Sign In Page", () => {
  test("displays all required elements", async ({ page }) => {
    await page.goto("/signin");

    await expect(page.locator("h1")).toContainText("Sign in");
    await expect(page.getByText("Don't have an account?")).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();

    await expect(
      page.getByRole("button", { name: /continue with google/i })
    ).toBeVisible();

    await expect(page.getByText("or continue with email")).toBeVisible();

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByLabel("Confirm password")).not.toBeVisible();

    await expect(
      page.getByRole("button", { name: /^sign in$/i })
    ).toBeVisible();
  });

  test("shows validation errors for empty form submission", async ({
    page,
  }) => {
    await page.goto("/signin");

    await page.getByRole("button", { name: /^sign in$/i }).click();

    await expect(
      page.getByText(/please enter a valid email/i)
    ).toBeVisible();
  });

  test("navigates to sign up page via link", async ({ page }) => {
    await page.goto("/signin");

    await page.getByRole("link", { name: "Sign up" }).click();

    await expect(page).toHaveURL("/signup");
  });
});
