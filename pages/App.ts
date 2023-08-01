import { Page } from "@playwright/test";
import { MainPage } from "./MainPage";
import { ProductCataloguePage } from "./ProductCataloguePage";
import { ProductInfoPage } from "./ProductInfoPage";

export class App {
    readonly page: Page;
    readonly mainPage: MainPage;
    readonly catalogue: ProductCataloguePage;
    readonly productInfoPage: ProductInfoPage;

    constructor(page: Page){
        this.page = page,
        this.mainPage = new MainPage(this.page);
        this.catalogue = new ProductCataloguePage(this.page);
        this.productInfoPage = new ProductInfoPage(this.page);
    }

}