import { test, expect }        from '@playwright/test';
import { LoginPage }           from '../../pages/LoginPage';
import { InventoryPage }       from '../../pages/InventoryPage';
import { CartPage }            from '../../pages/CartPage';
import { USERS, PRODUCTS }     from '../../utils/testData';

test.describe('@feature-cart', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
  });

  test('add one product — badge shows 1', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    expect(await inventoryPage.getCartCount()).toBe('1');
  });

  test('add two products — badge shows 2', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.addToCartByName(PRODUCTS.tshirt);
    expect(await inventoryPage.getCartCount()).toBe('2');
  });

  test('cart page shows correct item count', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage      = new CartPage(page);
    await inventoryPage.addToCartByName(PRODUCTS.jacket);
    await inventoryPage.goToCart();
    expect(await cartPage.getItemCount()).toBe(1);
  });

});