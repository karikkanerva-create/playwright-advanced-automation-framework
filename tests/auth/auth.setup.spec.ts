// tests/auth/auth.setup.ts

import { test as setup, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { LoginPage } from '../../pages/LoginPage';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login();

  await expect(page).toHaveURL(/inventory/);

  await mkdir('auth', { recursive: true });

  await page.context().storageState({
    path: 'auth/storageState.json'
  });
});