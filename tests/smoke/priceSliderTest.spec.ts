import { expect } from '@playwright/test';
import { getNumberFromString } from '../../utils/Helpers';
import { test } from "../base";

const targetValueLeft = 0.1;
const targetValueRight = -0.1;

test('Verify products can be filtered by price @smoke', async ({ app }) => {
  await app.mainPage.goto();
  await app.mainPage.openMenu();

  await app.mainPage.openCatalogue();
  await app.catalogue.clickRandomProductCategory();

  const initialMinPrice = await app.catalogue.getMinPriceFilterValue();
  const initialMaxPrice = await app.catalogue.getMaxPriceFilterValue();

  await app.catalogue.dragAndDropMinPriceHandle(targetValueLeft);
  await app.catalogue.dragAndDropMaxPriceHandle(targetValueRight);

  const changedMinPrice = await app.catalogue.getMinPriceFilterValue();
  const changedMaxPrice = await app.catalogue.getMaxPriceFilterValue();

  expect(changedMinPrice, `Changed minimum price of ${changedMinPrice} should be greater that initial ${initialMinPrice}`).toBeGreaterThan(initialMinPrice);
  expect(changedMaxPrice, `Changed maximum price of ${changedMaxPrice} should be less that initial ${initialMaxPrice}`).toBeLessThan(initialMaxPrice);
 
  const productPrices = await app.catalogue.getAllProductPrices();

  productPrices.forEach(priceText => {
    expect.soft(getNumberFromString(priceText), `Price of ${priceText} should be greater that minimum filter ${changedMinPrice}`).toBeGreaterThanOrEqual(changedMinPrice);
  })

  productPrices.forEach(priceText => {
    expect.soft(getNumberFromString(priceText), `Price of ${priceText} should be less that maximum filter ${changedMaxPrice}`).toBeLessThanOrEqual(changedMaxPrice);
  })

});