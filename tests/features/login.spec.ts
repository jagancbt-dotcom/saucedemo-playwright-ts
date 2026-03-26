import { test, expect } from '@playwright/test';
import { LoginPage }     from '../../pages/LoginPage';
import { USERS }         from '../../utils/testData';

test.describe('@feature-login', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid login navigates to products page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('wrong password shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('do not match');
  });

  test('locked out user sees blocked message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });

  test('empty fields shows validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

});