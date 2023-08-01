import { Locator, Page } from '@playwright/test';

export class ProductInfoPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly productName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('.page-title');
        this.addToCartButton = page.locator('#product-addtocart-button');
    }

    async addProductToCart() {
        await this.addToCartButton.click();
    }

}