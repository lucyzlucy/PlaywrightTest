import { expect, Locator, Page } from '@playwright/test';
import { clickRandomElFromList } from '../utils/Helpers';
import { MainPage } from './MainPage';
import { ProductInfoPage } from './ProductInfoPage';

export class LoginPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly logInButton: Locator;
    readonly captchaCheckbox: Locator;


    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#pass');
        this.logInButton = page.locator('#send2');
        this.captchaCheckbox = page.frameLocator('[title="reCAPTCHA"]').getByRole('checkbox');
    }

    async logIn(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.captchaCheckbox.waitFor();
        await this.captchaCheckbox.click();
        await this.logInButton.click();
        return new MainPage(this.page);
    }

}