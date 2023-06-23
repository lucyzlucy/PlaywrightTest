import { Locator } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import fs from 'fs';

export async function clickRandomElFromList(list: Locator) {
    await list.first().scrollIntoViewIfNeeded();
    const elLength = await list.count();
    console.log(`Elements count: ${elLength}`);
    const randomElOrder = Math.floor(Math.random() * ((elLength-1) - 0) + 0);
    console.log(`Element order chosen: ${randomElOrder}`);
    const randomEl = list.nth(randomElOrder);
    console.log(await randomEl.allInnerTexts());
    await randomEl.click();
}

export function readCsvRecords(filePath: string) {
  return parse(fs.readFileSync(filePath), {
    columns: true,
    skip_empty_lines: true,
  });
}

