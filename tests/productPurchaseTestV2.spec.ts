import { test, expect } from '@playwright/test';
import { ProductCataloguePage } from '../pages/ProductCataloguePage';
import { allure, LabelName } from "allure-playwright";

test('Smoke test refactored', async ({ page }, testoptions) => {
    allure.label({ name: LabelName.TAG, value: testoptions.project.name })
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