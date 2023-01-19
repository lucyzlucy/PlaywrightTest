import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Туристичне спорядження, одяг і взуття від найкращих брендів | Gorgany - експерти з туризму/);
});
