import { test } from "@playwright/test";

test("signin test", async ({ page }) => {
  const signInLink = page.locator("//button[@type='button']");
  const emailField = page.locator("[name='email']");
  const passwordField = page.locator("[name='password']");
  const signInButton = page.locator("[type='submit']");


  await page.goto("http://localhost:3000/");
  await page.waitForTimeout(3000);
  await signInLink.click();
  await emailField.fill("admin@gmail.com");
  await passwordField.fill("admin@123");
  await signInButton.click();


  await page.waitForTimeout(3000);


});


