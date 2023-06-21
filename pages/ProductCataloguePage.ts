import { expect, Locator, Page } from '@playwright/test';
import { clickRandomElFromList } from '../utils/Helpers';
import { MainPage } from './MainPage';
import { ProductInfoPage } from './ProductInfoPage';

export class ProductCataloguePage {
  readonly page: Page;
  readonly productCategoryLinks: Locator;
  readonly productLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCategoryLinks = page.locator('.supercat-links a');
    this.productLinks = page.locator('.product-item-link');
  }

  async clickRandomProductCategory() {
    await clickRandomElFromList(this.productCategoryLinks);
  }

  async clickRandomProductLink(): Promise<ProductInfoPage> {
    await clickRandomElFromList(this.productLinks);
    return new ProductInfoPage(this.page);
  }

}