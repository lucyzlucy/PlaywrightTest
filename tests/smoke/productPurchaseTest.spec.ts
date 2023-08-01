import { expect } from '@playwright/test';
import { test } from "../base";

test('Random product purchase test @smoke', async ({ app }) => {
    await app.mainPage.goto();
    await app.mainPage.openMenu();
    await app.mainPage.openCatalogue();
    await app.catalogue.clickRandomProductCategory();

    await app.catalogue.clickRandomProductLink();
    await app.productInfoPage.addProductToCart();
    await expect(app.mainPage.bucketLabelProductNumber).toHaveText("1");

    await app.mainPage.openCartPreview();
    await expect(app.productInfoPage.productName).toBeVisible();
    await expect(app.mainPage.bucketProductName).toHaveText(await app.productInfoPage.productName.textContent());
});