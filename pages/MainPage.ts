import { Locator, Page } from '@playwright/test';
import { clickRandomElFromList } from '../utils/Helpers';
import { ProductCataloguePage } from './ProductCataloguePage';
import { LoginPage } from './LoginPage';

export class MainPage {
    readonly page: Page;
    readonly menuToggle: Locator;
    readonly menuItems: Locator;
    readonly bucketButton: Locator;
    readonly bucketProductName: Locator;
    readonly bucketLabelProductNumber: Locator;
    readonly loginPageLink: Locator;
    readonly userName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuToggle = page.locator('#toggle_button');
        this.menuItems = page.locator('.ammenu-nav-sections > .ammenu-items > li > a');
        this.bucketButton = page.locator('.showcart')
        this.bucketProductName = page.locator('#minicart-content-wrapper .product-item-name a');
        this.bucketLabelProductNumber = page.locator('.counter-number');
        this.userName = page.locator('.logged-in');
        this.loginPageLink = page.locator('.authorization-link');
    }

    async goto() {
        await this.page.goto('/');
    }

    async openMenu() {
        await this.menuToggle.click({ delay: 3000 });
    }

    async openCatalogue() {
        await clickRandomElFromList(this.menuItems);
    }

    async openLoginPage() {
        await this.loginPageLink.click();
    }

    async openCartPreview() {
        await this.bucketButton.click({ delay: 3000 });
    }

}