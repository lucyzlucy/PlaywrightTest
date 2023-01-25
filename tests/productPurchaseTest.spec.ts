import { test, expect, Locator } from '@playwright/test';

test('Smoke test', async ({ page }) => {
  await page.goto('/');

  await page.locator('#toggle_button').click({ delay: 1000 });

  const menuItems = page.locator('.ammenu-nav-sections > .ammenu-items > li > a');
  await clickRandomElFromList(menuItems);

  const productCategoryLinks = await page.locator('.supercat-links a');
  await clickRandomElFromList(productCategoryLinks);

  const productLinks = page.locator('.product-item-link');
  await clickRandomElFromList(productLinks);

  const productName = page.locator('.page-title');

  await page.locator('#product-addtocart-button').click();
  await page.locator('.showcart').click({ delay: 3000 });

  const productNameInCart = page.locator('#minicart-content-wrapper .product-item-name a');
  await expect(productNameInCart).toBeVisible();
  await expect(productNameInCart).toHaveText(await productName.textContent());
});



async function clickRandomElFromList(list: Locator) {
  const randomElOrder = Math.floor(Math.random() * ((await list.count()-1) - 0) + 0);
  await list.nth(randomElOrder).click();
}