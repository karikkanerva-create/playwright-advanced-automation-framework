// tests/auth/auth.setup.ts

import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login();

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({
    path: 'auth/storageState.json'
  });
});