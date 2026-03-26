import { test, expect } from '@playwright/test';
import { LoginPage }     from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { USERS }         from '../../utils/testData';

test.describe('@smoke', () => {

  test('login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('products page loads with 6 items', async ({ page }) => {
    const loginPage     = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(inventoryPage.productTitles).toHaveCount(6);
  });

});