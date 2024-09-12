import { test, expect } from "@playwright/test";
import { describe } from "node:test";

describe("Sign In", () => {
  test("has title", async ({ page }) => {
    await page.goto("http://localhost:5173/sign-in");

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("has erro message when invalid credentials", async ({ page }) => {
    await page.goto("/sign-in");

    const button = page.getByRole("button", { name: "Login" });

    await button.click();

    expect(page.getByText("Email is required")).toBeVisible();
    expect(page.getByText("Password is required")).toBeVisible();
  });

  test("redirects to dashboard when valid credentials", async ({ page }) => {
    await page.route("*/**/users/sessions", async (route) => {
      const json = { token: "test" };
      await route.fulfill({
        status: 200,
        body: JSON.stringify(json),
      });
    });

    await page.goto("/sign-in");

    await page.fill('input[name="email"]', "test@gmail.com");
    await page.fill('input[name="password"]', "12345677");

    await page.click('button[type="submit"]');

    expect(page.url()).toBe("http://localhost:5173/");
  });

  test("redirects to sign up page", async ({ page }) => {
    await page.goto("/sign-in");

    await page.click('a[href="/sign-up"]');

    expect(page.url()).toContain("/sign-up");
  });
});
