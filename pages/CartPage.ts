import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems      = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}