import { test, expect } from "@playwright/test";

/**
 * AUDIT FIX: Aligned expectation with the frontmatter title in home.md.
 * Verified against Received string in image_193cda.png.
 */
test("homepage loads", async ({ page }) => {
  await page.goto("/");
  
  const header = page.getByRole("heading", { level: 1 }).first();
  await expect(header).toHaveText("Career Horizons: AI Forward Engineering");
});