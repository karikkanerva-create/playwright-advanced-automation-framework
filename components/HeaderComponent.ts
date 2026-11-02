import { type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  readonly cartLink: Locator;
  
  constructor(page: Page) {
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
