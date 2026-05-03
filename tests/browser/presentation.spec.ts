import { expect, test } from "@playwright/test";

/**
 * AUDIT FIX: Aligned URL and heading text with the Technical Briefing content.
 * Navigates to the real slug established in Milestone 8.
 */
test("presentation page loads", async ({ page }) => {
  // Navigate to the briefing route
  await page.goto("/technical-briefing/");

  // Verify the first H1 in the first sticky slide
  await expect(
    page.getByRole("heading", { level: 1 }).first()
  ).toHaveText("THE MISSION");
});

test("navigation shortcuts work", async ({ page }) => {
  await page.goto("/technical-briefing/");
  
  // Test the 'j' key shortcut established in Milestone 5
  await page.keyboard.press("j");
  
  // Verify the second slide heading becomes visible
  await expect(
    page.getByRole("heading", { level: 1 }).nth(1)
  ).toBeVisible();
});