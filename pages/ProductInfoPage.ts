import { expect, Locator, Page } from '@playwright/test';
import { MainPage } from './MainPage';

export class ProductInfoPage {
    readonly page: Page;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('#product-addtocart-button');
    }

    async addProductToCart() {
        await this.addToCartButton.click();
    }

}