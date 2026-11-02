import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../components/HeaderComponent';

export class CartPage {
  readonly header: HeaderComponent;
  readonly cartItems: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.cartItems = page.getByTestId('inventory-item');
  }

  async open(): Promise<void> {
    await this.header.openCart();
  }

  async expectProduct(name: string): Promise<void> {
    await expect(this.cartItems.filter({ hasText: name })).toBeVisible();
  }

  async removeProduct(name: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: name });
    await item.getByRole('button', { name: 'Remove' }).click();
  }
}
