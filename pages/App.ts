import { Page } from "@playwright/test";
import { MainPage } from "./MainPage";
import { ProductCataloguePage } from "./ProductCataloguePage";
import { ProductInfoPage } from "./ProductInfoPage";
import { LoginPage } from "./LoginPage";

export class App {
    readonly page: Page;
    readonly mainPage: MainPage;
    readonly catalogue: ProductCataloguePage;
    readonly productInfoPage: ProductInfoPage;
    readonly loginPage: LoginPage;

    constructor(page: Page){
        this.page = page,
        this.mainPage = new MainPage(this.page);
        this.catalogue = new ProductCataloguePage(this.page);
        this.productInfoPage = new ProductInfoPage(this.page);
        this.loginPage = new LoginPage(this.page);
    }

}