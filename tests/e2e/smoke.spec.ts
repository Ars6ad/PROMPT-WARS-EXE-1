import { test, expect } from "@playwright/test";

test.describe("FairShift E2E Smoke Journey", () => {
  test("worker logs in -> checks pay -> files anonymous safety report -> admin logs in -> sees report without worker identity", async ({
    page,
  }) => {
    // 1. Visit landing page
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Fair work should be");

    // 2. Click login button for Asha Kumar (Construction Helper)
    await page.click('text="Launch Worker App (Construction)"');
    await expect(page).toHaveURL(/.*\/worker\/dashboard/);
    await expect(page.locator("h1")).toContainText("Asha");

    // 3. Worker checks pay wallet
    await page.click('text="View Full Payslip Breakdown"');
    await expect(page).toHaveURL(/.*\/worker\/pay/);
    await expect(page.locator("text=Itemized Earnings & Deductions")).toBeVisible();
    await expect(page.locator("text=Plain Language Pay Summary")).toBeVisible();

    // 4. Worker reports a safety hazard anonymously
    await page.goto("/worker/safety");
    await page.click('button:has-text("Report a Hazard")');

    // Step 1: select category
    await page.click('button:has-text("Missing / Damaged PPE")');
    await page.click('button:has-text("Continue")');

    // Step 2: enter description
    await page.fill('textarea[placeholder*="Scaffold lock pin"]', "Level 3 workers missing chin straps on helmets.");
    await page.click('button:has-text("Continue")');

    // Step 3: verify anonymous is checked and submit
    const anonCheckbox = page.locator('input[type="checkbox"]');
    await expect(anonCheckbox).toBeChecked();
    await page.click('button:has-text("Submit Safety Incident")');

    // Verify confirmation
    await expect(page.locator("text=Safety report logged")).toBeVisible();

    // 5. Admin logs in
    await page.click('button[aria-label="Switch Role"]');
    await page.click('text="Priya Sharma"');

    // 6. Admin navigates to Safety Command Center
    await page.goto("/admin/safety");
    await expect(page.locator("h1")).toContainText("Safety Hazard Triage");

    // 7. Verify the anonymous report does NOT expose worker name
    await expect(page.locator("text=Anonymous Worker")).toBeVisible();
    await expect(page.locator("text=Asha Kumar")).not.toBeVisible();
  });
});
