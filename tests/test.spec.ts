import { test, expect } from '@playwright/test';
test(
'storage state test',
async ({ page }) => {

  await page.goto('/inventory.html');
  await expect(page).toHaveTitle(/Swag Labs/);
  await page.goto('/inventory.html');
await expect(page).toHaveURL(/inventory\.html/);
await expect(page.getByTestId('inventory-item').first()).toBeVisible();

});