import { expect, test } from "@playwright/test";

test("evidence pack counts two quiet-hours nights", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "QuietLog" })).toBeVisible();
  await expect(page.getByTestId("author-credit")).toContainText("Alessandro Alghisi");
  await page.getByTestId("nav-pack").click();
  await expect(page.getByTestId("evidence-pack")).toContainText("2 quiet-hours nights");
  await expect(page.getByTestId("pack-minutes")).toContainText("185 minutes");
});
