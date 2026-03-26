import { test, expect }                       from '@playwright/test';
import { LoginPage }                          from '../../pages/LoginPage';
import { InventoryPage }                      from '../../pages/InventoryPage';
import { CartPage }                           from '../../pages/CartPage';
import { CheckoutPage }                       from '../../pages/CheckoutPage';
import { USERS, PRODUCTS, CHECKOUT_INFO }     from '../../utils/testData';

test.describe('@feature-checkout', () => {

  test('complete checkout shows confirmation', async ({ page }) => {
    // Step 1 — login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    // Step 2 — add product and go to cart
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();

    // Step 3 — click checkout
    const cartPage = new CartPage(page);
    await cartPage.checkout();

    // Step 4 — fill details and place order
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillDetails(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.zipCode
    );
    await checkoutPage.placeOrder();

    // Step 5 — verify confirmation
    const message = await checkoutPage.getConfirmationText();
    expect(message).toContain('Thank you');
  });

});