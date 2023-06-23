import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { getNumberFromString } from '../../utils/Helpers';

const targetValueLeft = 0.1;
const targetValueRight = -0.1;

test('Verify products can be filtered by price @smoke', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.goto();
  await mainPage.openMenu();

  const catalogue = await mainPage.openCatalogue();
  await catalogue.clickRandomProductCategory();

  const initialMinPrice = await catalogue.getMinPriceFilterValue();
  const initialMaxPrice = await catalogue.getMaxPriceFilterValue();

  await catalogue.dragAndDropMinPriceHandle(targetValueLeft);
  await catalogue.dragAndDropMaxPriceHandle(targetValueRight);

  const changedMinPrice = await catalogue.getMinPriceFilterValue();
  const changedMaxPrice = await catalogue.getMaxPriceFilterValue();

  expect(changedMinPrice, `Changed minimum price of ${changedMinPrice} should be greater that initial ${initialMinPrice}`).toBeGreaterThan(initialMinPrice);
  expect(changedMaxPrice, `Changed maximum price of ${changedMaxPrice} should be less that initial ${initialMaxPrice}`).toBeLessThan(initialMaxPrice);

 
  const productPrices = await catalogue.getAllProductPrices();

  productPrices.forEach(priceText => {
    expect.soft(getNumberFromString(priceText), `Price of ${priceText} should be greater that minimum filter ${changedMinPrice}`).toBeGreaterThanOrEqual(changedMinPrice);
  })

  productPrices.forEach(priceText => {
    expect.soft(getNumberFromString(priceText), `Price of ${priceText} should be less that maximum filter ${changedMaxPrice}`).toBeLessThanOrEqual(changedMaxPrice);
  })

});