import { test, expect } from '@playwright/test';
import { ProductCataloguePage } from '../../pages/ProductCataloguePage';
import { MainPage } from '../../pages/MainPage';

test('Random product purchase test @smoke', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.openMenu();

    const catalogue = await mainPage.openCatalogue();
    await catalogue.clickRandomProductCategory();

    const productPage = await catalogue.clickRandomProductLink();
    await productPage.addProductToCart();
    await expect(mainPage.bucketLabelProductNumber).toHaveText("1");

    await mainPage.openCartPreview();
    await expect(mainPage.productName).toBeVisible();
    await expect(mainPage.bucketProductName).toHaveText(await mainPage.productName.textContent());
});