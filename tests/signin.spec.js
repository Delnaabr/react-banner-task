import { test } from "@playwright/test";

test("signin test", async ({ page }) => {
  const signInLink = page.locator("//button[@type='button']");
  const emailField = page.locator("[name='email']");
  const passwordField = page.locator("[name='password']");
  const signInButton = page.locator("[type='submit']");
  const editButton = page.locator("(//button[normalize-space()='Edit'])[1]");
  const cardName = page.locator("[name='name']");
  const updateButton = page.locator("//button[normalize-space()='Update']");
  const removeButton = page.locator(
    "(//button[normalize-space()='Remove'])[1]"
  );
  const deleteCardButton = page.locator("//button[normalize-space()='Delete']");
  const signOutButton = page.locator("//button[normalize-space()='Sign out']");

  await page.goto("http://localhost:3000/");
  await page.waitForTimeout(3000);
  await signInLink.click();
  await emailField.fill("admin@gmail.com");

  await passwordField.fill("admin@123");
  await page.waitForTimeout(3000);

  await signInButton.click();

  await page.waitForTimeout(3000);

  await editButton.click();
  await page.waitForTimeout(3000);

  await cardName.fill("CIBC-Banner-$50");
  await page.waitForTimeout(3000);

  await updateButton.click();
  await page.waitForTimeout(3000);

  await removeButton.click();
  await page.waitForTimeout(3000);

  await deleteCardButton.click();
  await page.waitForTimeout(3000);

  await signOutButton.click();
});
