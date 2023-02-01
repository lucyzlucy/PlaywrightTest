import { expect, Locator, Page } from '@playwright/test';
import { MainPage } from './MainPage';

export class ProductInfoPage extends MainPage{
    readonly page: Page;
    readonly productName: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.productName = page.locator('.page-title');
        this.addToCartButton = page.locator('#product-addtocart-button');
    }

    async addProductToCart() {
        await this.addToCartButton.click();
    }

}