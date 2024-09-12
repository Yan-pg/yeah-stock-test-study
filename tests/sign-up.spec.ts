import { test, expect } from "@playwright/test";
import { describe } from "node:test";

describe("Sign up", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-up");
  });

  test("has title", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "SignUp" })).toBeVisible();
  });

  test("has error message when invalid credentials", async ({ page }) => {
    const button = page.getByRole("button", { name: "Login" });

    await button.click();

    expect(page.getByText("Name is required")).toBeVisible();
    expect(page.getByText("Email is required")).toBeVisible();
    expect(page.getByText("Password is required")).toBeVisible();
  });

  test("redirects to dashboard when valid credentials", async ({ page }) => {
    await page.route("*/**/users", async (route) => {
      await route.fulfill({
        status: 201,
      });
    });

    await page.fill('input[name="name"]', "Yan César");
    await page.fill('input[name="email"]', "test@gmail.com");
    await page.fill('input[name="password"]', "12345677");

    await page.click('button[type="submit"]');

    expect(page.url()).toContain("sign-in?email=test@gmail.com");
  });

  test("redirects to sign up page", async ({ page }) => {
    await page.getByRole("link", { name: "Sign In" }).click();

    expect(page.url()).toContain("/sign-in");
  });
});
