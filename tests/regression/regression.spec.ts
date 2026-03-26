import { test, expect }      from '@playwright/test';
import { LoginPage }         from '../../pages/LoginPage';
import { InventoryPage }     from '../../pages/InventoryPage';
import { USERS, PRODUCTS }   from '../../utils/testData';

test.describe('@regression', () => {

  test('R01 — valid login', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('R02 — invalid login shows error', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login(USERS.invalid.username, USERS.invalid.password);
    expect(await lp.getErrorMessage()).toContain('do not match');
  });

  test('R03 — locked user is blocked', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login(USERS.locked.username, USERS.locked.password);
    expect(await lp.getErrorMessage()).toContain('locked out');
  });

  test('R04 — add product updates cart badge', async ({ page }) => {
    const lp  = new LoginPage(page);
    const inv = new InventoryPage(page);
    await lp.goto();
    await lp.login(USERS.standard.username, USERS.standard.password);
    await inv.addToCartByName(PRODUCTS.backpack);
    expect(await inv.getCartCount()).toBe('1');
  });

  test('R05 — page title is correct', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveTitle(/Swag Labs/);
  });

});