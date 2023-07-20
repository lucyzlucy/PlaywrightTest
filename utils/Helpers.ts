import { Locator } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import fs from 'fs';

export async function clickRandomElFromList(list: Locator) {
  await list.first().scrollIntoViewIfNeeded();
  const elLength = await list.count();
  console.log(`Elements count: ${elLength}`);
  const randomElOrder = Math.floor(Math.random() * ((elLength - 1) - 0) + 0);
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

export async function dragAndDropOnSlider(elementToDrag: Locator, slider: Locator, targetValue: number) {
  await elementToDrag.waitFor();
  await elementToDrag.scrollIntoViewIfNeeded();

  await slider.scrollIntoViewIfNeeded();

  const sliderBoundingBox = await slider.boundingBox();

  await console.log(`Slider width: ${sliderBoundingBox.width}`)
  await elementToDrag.dragTo(elementToDrag, {
    force: true,
    targetPosition: {
      x: sliderBoundingBox.width * targetValue,
      y: 0,
    },
  });
}

export function getNumberFromString(str: string): number {
  return Number.parseInt(str.replace(/\s+/g, ''));
}

