import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge     = page.locator('.shopping_cart_badge');
    this.cartIcon      = page.locator('.shopping_cart_link');
    this.productTitles = page.locator('.inventory_item_name');
  }

  async addToCartByName(productName: string): Promise<void> {
    const productCard = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });
    await productCard.locator('button').click();
  }

  async getCartCount(): Promise<string> {
    return await this.cartBadge.textContent() ?? '0';
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }
}