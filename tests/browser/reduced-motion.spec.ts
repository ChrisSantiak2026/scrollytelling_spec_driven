import { expect, test } from "@playwright/test";

test("reduced motion still renders content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText("Career Horizons: AI Forward Engineering");
});
