import { test, expect } from '@playwright/test';

test.describe('E2E Infrastructure Smoke Test', () => {
  test('should verify Playwright runner and browser capability', async ({ page }) => {
    await page.setContent('<html><body><div id="app-root">Playwright is ready</div></body></html>');
    const root = page.locator('#app-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveText('Playwright is ready');
  });
});

