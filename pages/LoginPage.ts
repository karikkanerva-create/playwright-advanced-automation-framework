import type { Page } from '@playwright/test';
import { getStandardUser, type UserCredentials } from '../utils/dataFactory';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    //await this.page.goto('/');
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error('BASE_URL environment variable is not set');
    }
    await this.page.goto(baseUrl);
  }

  async login(credentials: UserCredentials = getStandardUser()): Promise<void> {
    await this.page.locator('[data-test="username"]').fill(credentials.username);
    await this.page.locator('[data-test="password"]').fill(credentials.password);
    await this.page.locator('[data-test="login-button"]').click();
  }
}

