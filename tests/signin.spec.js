import { expect, test } from "@playwright/test";

test("signin test", async ({ page }) => {
  const signInLink = page.locator("//button[@type='button']");
  const emailField = page.locator("[name='email']");
  const passwordField = page.locator("[name='password']");
  const signInButton = page.locator("[type='submit']");
  const editButton = page.locator("(//button[normalize-space()='Edit'])[1]");
  const allEditButtons = page.locator("(//button[normalize-space()='Edit'])");
  const allRemoveButtons = page.locator(
    "(//button[normalize-space()='Remove'])"
  );

  const cardName = page.locator("[name='name']");
  const updateButton = page.locator("//button[normalize-space()='Update']");
  const removeButton = page.locator(
    "(//button[normalize-space()='Remove'])[1]"
  );
  const deleteCardButton = page.locator("//button[normalize-space()='Delete']");
  const signOutButton = page.locator("//button[normalize-space()='Sign out']");
  const dragFromElement = page.locator(
    "//div[@class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root card-single css-bhp9pd-MuiPaper-root-MuiCard-root']//span[normalize-space()='Digital Ma...']"
  );
  const dragToElement = page.locator(
    "//div[@class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root card-single css-bhp9pd-MuiPaper-root-MuiCard-root']//span[normalize-space()='2021 Busin...']"
  );
  const signInModal = page.locator("//div[@class='MuiBox-root css-1fr59qp']");
  // const successToastForLogin = page.locator(
  //   "//div[@class='Toastify__toast Toastify__toast-theme--light Toastify__toast--success Toastify__toast--close-on-click']"
  // );
  const successToastForLogin = page.locator(
    "//div[@class='Toastify__toast Toastify__toast-theme--light Toastify__toast--success Toastify__toast--close-on-click']//div [@class='Toastify__toast-body']//div[text()='Admin signed in successfully']"
  );
  const successToastForUpdate = page.locator(
    "//div[@class='Toastify__toast Toastify__toast-theme--light Toastify__toast--success Toastify__toast--close-on-click']"
  );
  const editModal = page.locator(
    "//div[@class='modal-container MuiBox-root css-0']"
  );
  const deleteModal = page.locator(
    "//div[@class='delete-modal MuiBox-root css-0']"
  );
  const cancelButton = page.locator("//button[normalize-space()='Cancel']");

  await page.goto("http://localhost:3000/");

  await page.waitForTimeout(3000);

  await signInLink.click();

  await page.waitForTimeout(3000);

  //did sign in modal appearing
  await expect(signInModal).toBeVisible();

  await emailField.fill("admin@gmail.com");

  await passwordField.fill("admin@123");
  await page.waitForTimeout(3000);

  await signInButton.click();

  //did sign in modal disappearing
  await expect(signInModal).not.toBeVisible();
  console.log("Success");

  //whether success toast message is coming after login
  await expect(successToastForLogin).toBeVisible();

  //whether the edit buttons are present after login
  const editButtons = allEditButtons;
  console.log(await editButtons.allInnerTexts());

  //whether the delete buttons are present after login
  const deleteButtons = allRemoveButtons;
  console.log(await deleteButtons.allInnerTexts());

  // await page.waitForTimeout(3000);

  await expect(dragFromElement).toBeVisible();
  // await dragFromElement.dblclick();

  //   await dragFromElement.dragTo(dragToElement);
  await dragFromElement.hover();
  await page.mouse.down();
  await page.waitForTimeout(3000);
  await dragToElement.hover();
  await page.mouse.up();

  await page.waitForTimeout(5000);

  await editButton.click();
  await page.waitForTimeout(3000);

  //whether the edit modal is appearing
  await expect(editModal).toBeVisible();
  console.log("editModal appearing");

  //cancel button
  await cancelButton.click();
  await page.waitForTimeout(3000);

  //Is the edit modal disappears
  await expect(editModal).not.toBeVisible();
  console.log("edit modal disappears");

  //edit
  await editButton.click();
  await page.waitForTimeout(3000);
  await cardName.fill("CIBC-Banner-$50");
  await page.waitForTimeout(3000);

  await updateButton.click();

  //success toast message is coming after updating
  await expect(successToastForUpdate).toBeVisible();
  console.log("Success toast is coming for update");

  await page.waitForTimeout(3000);
  await removeButton.click();
  await page.waitForTimeout(3000);

  //Is delete modal appears
  await expect(deleteModal).toBeVisible();
  console.log("delete modal appears");

  //cancel button
  await cancelButton.click();
  await page.waitForTimeout(3000);

  //Is the delete modal disappears
  await expect(deleteModal).not.toBeVisible();
  console.log("delete modal disappears");

  //delete
  await page.waitForTimeout(3000);
  await removeButton.click();
  await page.waitForTimeout(3000);
  await expect(deleteModal).toBeVisible();

  await deleteCardButton.click();
  await expect(deleteModal).not.toBeVisible();

  //delete toast is coming after deleting
  await expect(successToastForUpdate).toBeVisible();
  console.log("Delete toast is coming");

  await page.waitForTimeout(3000);

  await signOutButton.click();
});
