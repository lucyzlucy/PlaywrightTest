import { test, expect, Locator } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { ProductCataloguePage } from '../pages/ProductCataloguePage';


test('Smoke test refactored', async ({ page }) => {
    const catalogue = new ProductCataloguePage(page);
    await catalogue.goto();
    await catalogue.openMenu();
    await catalogue.openCatalogue();
    await catalogue.clickRandomProductCategory();
    const productPage = await catalogue.clickRandomProductLink();
    await productPage.addProductToCart();
    await expect(catalogue.bucketLabelProductNumber).toHaveText("1");

    await productPage.openCartPreview();
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.bucketProductName).toHaveText(await productPage.productName.textContent());
});