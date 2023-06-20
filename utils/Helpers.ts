import { Locator } from '@playwright/test';

export async function clickRandomElFromList(list: Locator) {
    await list.first().waitFor();
    const elLength = await list.count();
    console.log(`Elements count: ${elLength}`);
    const randomElOrder = Math.floor(Math.random() * ((elLength-1) - 0) + 0);
    console.log(`Element order chosen: ${randomElOrder}`);
    const randomEl = list.nth(randomElOrder);
    console.log(await randomEl.allInnerTexts());
    await randomEl.click();
  }