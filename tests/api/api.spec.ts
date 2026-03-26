import { test, expect } from '@playwright/test';
import { LoginPage }    from '../../pages/LoginPage';
import { USERS }        from '../../utils/testData';

test.describe('@api', () => {

  test('login page loads even if JSON resources fail', async ({ page }) => {
    // intercept all .json requests and return 500 error
    await page.route('**/*.json', async route => {
      await route.fulfill({
        status: 500,
        body: 'Server error',
      });
    });
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('verify GET request is made after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // set up listener BEFORE the action that triggers it
    const requestPromise = page.waitForRequest(request =>
      request.url().includes('saucedemo.com') &&
      request.method() === 'GET'
    );

    await loginPage.login(USERS.standard.username, USERS.standard.password);

    const request = await requestPromise;
    expect(request.url()).toContain('saucedemo');
  });

});