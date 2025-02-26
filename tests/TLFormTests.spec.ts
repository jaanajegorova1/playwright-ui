import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("TL form tests", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.APP_URL);
  });

  test("TL-16-1 Form opens", async ({ page }) => {
    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const loginButton = page.getByTestId("signIn-button");

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  });

  test("TL-16-2 Error test on minimum 2 symbols for username field", async ({
    page,
  }) => {
    const usernameField = page.locator("#username");
    const popupMessageMinimum2symbols = page.locator(
      '[class="form-error form-error_active"]',
    );

    await usernameField.fill(faker.string.alpha(1));
    await expect(popupMessageMinimum2symbols).toBeVisible();
    await expect(popupMessageMinimum2symbols).toContainText(
      "The field must contain at least of characters: 2",
    );
  });

  test("TL-16-3 Error test on minimum 8 symbols for password field", async ({
    page,
  }) => {
    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const popupMessageMinimum8symbols = page.locator(
      '[class="form-error form-error_active"]',
    );

    await usernameField.fill(faker.string.alpha(8));
    await passwordField.fill(faker.internet.password({ length: 7 }));
    await expect(popupMessageMinimum8symbols).toBeVisible();
    await expect(popupMessageMinimum8symbols).toContainText(
      "The field must contain at least of characters: 8",
    );
  });

  test("TL-16-4 Error on empty username field", async ({ page }) => {
    const usernameField = page.locator("#username");
    const errorMessage = page.locator('[class="form-error form-error_active"]');

    await usernameField.fill(faker.internet.username());
    await usernameField.clear();
    await expect(errorMessage).toContainText("The field must be filled in.");
  });

  test("TL-16-5 Error on incorrect credentials", async ({ page }) => {
    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const loginButton = page.getByTestId("signIn-button");
    const errorMessageForIncorrectCredentials = page.locator(
      '[class="error-popup__title"]',
    );
    const popupButtonClose = page.getByTestId(
      "authorizationError-popup-close-button",
    );

    await usernameField.fill(faker.string.alpha(4));
    await passwordField.fill(faker.internet.password({ length: 8 }));
    await loginButton.click();
    await expect(errorMessageForIncorrectCredentials).toContainText(
      "Incorrect credentials",
    );
    await popupButtonClose.click();
    await expect(errorMessageForIncorrectCredentials).not.toBeVisible();
  });

  test("TL-16-6 Faker. Error on incorrect credentials", async ({ page }) => {
    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const loginButton = page.getByTestId("signIn-button");
    const errorMessageForIncorrectCredentials = page.locator(
      '[class="error-popup__title"]',
    );
    const popupButtonClose = page.getByTestId(
      "authorizationError-popup-close-button",
    );

    await usernameField.fill(faker.string.alpha(3));
    await passwordField.fill(faker.internet.password({ length: 8 }));
    await loginButton.click();
    await expect(errorMessageForIncorrectCredentials).toContainText(
      "Incorrect credentials",
    );
    await popupButtonClose.click();
    await expect(errorMessageForIncorrectCredentials).not.toBeVisible();
  });
});
