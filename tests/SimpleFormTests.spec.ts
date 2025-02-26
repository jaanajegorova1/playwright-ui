import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Local simple form tests", async () => {
  test.beforeEach(async ({ page }) => {
    const path = require("path");
    const filePath = `file://${path.resolve("src/simpleForm.html")}`;
    await page.goto(filePath);
  });

  test("Form opens", async ({ page }) => {
    const emailField = page.getByTestId("email");
    const usernameField = page.getByTestId("username");
    const submitButton = page.getByTestId("submit-order");
    const popupMessage = page.locator("#popup-message");

    await expect(emailField).toBeVisible();
    await expect(usernameField).toBeVisible();
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeDisabled();
    await usernameField.fill(faker.internet.username());
    await expect(submitButton).toBeDisabled();
    await usernameField.fill(faker.internet.email());
    await expect(submitButton).toBeEnabled();
    await expect(popupMessage).not.toBeVisible();
    await submitButton.click();
    await expect(popupMessage).toBeVisible();
    await page.waitForTimeout(5100);
    await expect(popupMessage).not.toBeVisible();
  });
});
