import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.gorgany.com/sporiadzhennia');
  await page.getByRole('link', { name: 'Рюкзаки для походів' }).click();


   // the value corresponding to the 100% of the slider
   const maxValue = 20;
   // drag-and-drop target value in percentage
   const targetValue = 0.4; // 40%
 
   // retrieving the slider handle HTML element
   const sliderHandle = page.locator(".ui-slider-handle").first();
   // retrieving the slider HTML element
   const slider = page.locator(".ui-slider");
 
   // getting the slider bounding box size
   const sliderBoundingBox = await slider.boundingBox();
 
   // performing the drag-and-drop interaction
   await sliderHandle.dragTo(sliderHandle, {
     force: true,
     targetPosition: {
       // moving the slider to the target value in %
       x: sliderBoundingBox.width * targetValue,
       y: 0,
     },
   });

});