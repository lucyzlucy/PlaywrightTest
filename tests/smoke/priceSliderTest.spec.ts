import { test, expect } from '@playwright/test';

test.only('test', async ({ page }) => {
  await page.goto('https://www.gorgany.com/sporiadzhennia');
  await page.getByRole('link', { name: 'Рюкзаки для походів' }).click();


  // drag-and-drop target value in percentage
  const targetValueLeft = 0.1;
  const targetValueRight = -0.1;

  const slider = page.locator(".ui-slider");

  const minPrice = await page.locator(".amshopby-slider-display").locator("i").first().allInnerTexts();
  console.log(minPrice);
  const maxPrice = page.locator(".amshopby-slider-display i:nth-child(5)");
  await maxPrice.waitFor();
  await console.log(await maxPrice.textContent());

  // retrieving the slider handle HTML element
  const leftSliderHandle = page.locator(".ui-slider-handle").first();

  // retrieving the slider handle HTML element
  const rightSliderHandle = page.locator(".ui-slider-handle").last();


  // getting the slider bounding box size
  const sliderBoundingBox = await slider.boundingBox();

  // performing the drag-and-drop interaction
  await leftSliderHandle.dragTo(leftSliderHandle, {
    force: true,
    targetPosition: {
      // moving the slider to the target value in %
      x: sliderBoundingBox.width * targetValueLeft,
      y: 0,
    },
  });

  // performing the drag-and-drop interaction
  await rightSliderHandle.dragTo(rightSliderHandle, {
    force: true,
    targetPosition: {
      // moving the slider to the target value in %
      x: sliderBoundingBox.width * targetValueRight,
      y: 0,
    },
  });



});