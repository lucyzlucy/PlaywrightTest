import { Locator } from '@playwright/test';

export async function clickRandomElFromList(list: Locator) {
    const randomElOrder = Math.floor(Math.random() * ((await list.count()-1) - 0) + 0);
    console.log(`Element order chosen: ${randomElOrder}`);
    const randomEl = list.nth(randomElOrder);
    console.log(await randomEl.allInnerTexts());
    await randomEl.click();
  }