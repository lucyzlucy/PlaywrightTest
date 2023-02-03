import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { allure, LabelName } from "allure-playwright";
import { ProductCataloguePage } from '../pages/ProductCataloguePage';


test('Smoke test refactored', async ({ page }, testInfo) => {
    const env = testInfo.project.name;
    allure.id("Smoke Test");
    allure.label({
        "name": "environment",
        "value": `$env`
      })
    const catalogue = new ProductCataloguePage(page);
    await catalogue.goto();
    await catalogue.openMenu();
    await catalogue.openCatalogue();
    await catalogue.clickRandomProductCategory();
    const productPage = await catalogue.clickRandomProductLink();
    await productPage.addProductToCart();
    await expect(catalogue.bucketLabelProductNumber).toHaveText("2");

    await productPage.openCartPreview();
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.bucketProductName).toHaveText(await productPage.productName.textContent());
});