import { Locator } from '@playwright/test';

export async function clickRandomElFromList(list: Locator) {
    const randomElOrder = Math.floor(Math.random() * ((await list.count()-1) - 0) + 0);
    await list.nth(randomElOrder).click();
  }