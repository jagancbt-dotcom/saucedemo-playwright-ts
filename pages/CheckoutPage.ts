import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput      = page.locator('[data-test="firstName"]');
    this.lastNameInput       = page.locator('[data-test="lastName"]');
    this.zipCodeInput        = page.locator('[data-test="postalCode"]');
    this.continueButton      = page.locator('[data-test="continue"]');
    this.finishButton        = page.locator('[data-test="finish"]');
    this.confirmationMessage = page.locator('.complete-header');
  }

  async fillDetails(firstName: string, lastName: string, zip: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zip);
    await this.continueButton.click();
  }

  async placeOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async getConfirmationText(): Promise<string> {
    return await this.confirmationMessage.textContent() ?? '';
  }
}