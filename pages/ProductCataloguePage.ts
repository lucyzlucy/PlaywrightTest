import { Locator, Page } from '@playwright/test';
import { clickRandomElFromList, dragAndDropOnSlider } from '../utils/Helpers';
import { ProductInfoPage } from './ProductInfoPage';

export class ProductCataloguePage {
  readonly page: Page;
  readonly productCategoryLinks: Locator;
  readonly productLinks: Locator;
  readonly slider: Locator;
  readonly minPriceLocator: Locator;
  readonly maxPriceLocator: Locator;
  readonly minSliderHandle: Locator;
  readonly maxSliderHandle: Locator;
  readonly nextPageButton: Locator;
  readonly productsLoader: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCategoryLinks = page.locator('.supercat-links a');
    this.productLinks = page.locator('.product-item-link');
    this.slider = page.locator(".ui-slider").first();
    this.minPriceLocator = page.locator("//div[contains(@class, 'price')]//i[1]");
    this.maxPriceLocator = page.locator("//div[contains(@class, 'price')]//i[3]");
    this.minSliderHandle = page.locator(".ui-slider-handle").nth(0);
    this.maxSliderHandle = page.locator(".ui-slider-handle").nth(1);
    this.nextPageButton = page.getByRole('link', { name: 'Сторінка Наступне' });
    this.productsLoader = page.locator('#amasty-shopby-overlay span');
    this.productPrice = page.locator(".price-wrapper[data-price-type='finalPrice'] .price");
  }

  async clickRandomProductCategory() {
    await clickRandomElFromList(this.productCategoryLinks);
  }

  async clickRandomProductLink(): Promise<ProductInfoPage> {
    await clickRandomElFromList(this.productLinks);
    return new ProductInfoPage(this.page);
  }

  async getMinPriceFilterValue(): Promise<number> {
    return await this.getPriceFilterValue(this.minPriceLocator);
  }

  async getMaxPriceFilterValue(): Promise<number> {
    return await this.getPriceFilterValue(this.maxPriceLocator);
  }

  async dragAndDropMinPriceHandle(targetValue: number) {
    await this.dragAndDropPriceHandle(this.minSliderHandle, targetValue);
  }

  async dragAndDropMaxPriceHandle(targetValue: number) {
    await this.dragAndDropPriceHandle(this.maxSliderHandle, targetValue);
  }

  private async dragAndDropPriceHandle(handleLocator: Locator, targetValue: number) {
    const responsePromise = this.page.waitForResponse(request => request.url().includes('price'));
    await dragAndDropOnSlider(handleLocator, this.slider, targetValue);
    await responsePromise;
  }

  async getAllProductPrices(): Promise<Array<string>> {
    await this.productsLoader.waitFor({ state: 'hidden' });

    let productPricesAccumulated = await this.productPrice.allInnerTexts();
  
    while (await this.nextPageButton.isVisible()) {
      const responsePromise3 = this.page.waitForResponse(request => request.url().includes('price'));
      await this.nextPageButton.click();
      await responsePromise3;
      await this.productsLoader.waitFor({ state: 'hidden' });
      productPricesAccumulated = productPricesAccumulated.concat(await this.productPrice.allInnerTexts());
    }
    return productPricesAccumulated;
  }

  private async getPriceFilterValue(priceFilterLocator: Locator): Promise<number> {
    await this.productsLoader.waitFor({ state: 'hidden' });

    await priceFilterLocator.scrollIntoViewIfNeeded();
    const priceFilterValue = await priceFilterLocator.textContent();
    console.log(`Price filter value: ${priceFilterValue}`);
    return Number.parseInt(priceFilterValue);
  }

}
