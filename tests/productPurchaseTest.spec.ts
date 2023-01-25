import { test, expect, Locator } from '@playwright/test';

test('Smoke test', async ({ page }) => {
  await page.goto('/');
  await page.locator('#toggle_button').click();

  const menuItems = page.locator('.ammenu-nav-sections > .ammenu-items > li > a');
  await clickRandomElFromList(menuItems);

  const productCategoryLinks = page.locator('.supercat-links a');
  // await productCategoryLinks.first().waitFor();
  // await console.log(await productCategoryLinks.all());
  await clickRandomElFromList(productCategoryLinks);

  const productLinks = page.locator('.product-item-link');
  // await productLinks.first().waitFor();
  // await console.log(await productLinks.all());
  await clickRandomElFromList(productLinks);

  const productName = page.locator('.page-title');

  await page.locator('#product-addtocart-button').click();
  await page.locator('.showcart').click();

  await expect(page.locator('.product-item-name a')).toHaveText(await productName.textContent());
});



async function clickRandomElFromList(list: Locator) {
  const randomElOrder = Math.floor(Math.random() * ((await list.count()-1) - 0) + 0);
  await list.nth(randomElOrder).click();
}