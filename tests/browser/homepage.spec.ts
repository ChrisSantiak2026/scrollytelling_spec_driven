import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  
  // AUDIT FIX: Update the expected text to match your professional title.
  const header = page.getByRole("heading", { level: 1 }).first();
  await expect(header).toHaveText(/The AI-Forward Engineer/);
});
