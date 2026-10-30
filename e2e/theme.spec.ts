import { test, expect } from '@playwright/test';
import { setupMockApiRoutes, injectAdminSession } from './helpers/auth.helper';

test.describe('Theme Toggle and Visual Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await setupMockApiRoutes(page);
    await injectAdminSession(page);
  });

  test('should toggle theme between light and dark modes', async ({ page }) => {
    await page.goto('/dashboard');

    const themeButton = page.locator('header').getByRole('button', { name: /modo/i });
    await expect(themeButton).toBeVisible();

    const html = page.locator('html');
    const wasDarkInitially = await html.evaluate((el) => el.classList.contains('dark'));

    // Toggle theme
    await themeButton.click();

    if (wasDarkInitially) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }

    // Toggle back
    await themeButton.click();

    if (wasDarkInitially) {
      await expect(html).toHaveClass(/dark/);
    } else {
      await expect(html).not.toHaveClass(/dark/);
    }
  });

  test('should persist theme preference across page reloads', async ({ page }) => {
    await page.goto('/dashboard');

    const themeButton = page.locator('header').getByRole('button', { name: /modo/i });
    await expect(themeButton).toBeVisible();

    const html = page.locator('html');
    const wasDarkInitially = await html.evaluate((el) => el.classList.contains('dark'));

    // Switch theme once
    await themeButton.click();
    const expectedState = !wasDarkInitially;

    if (expectedState) {
      await expect(html).toHaveClass(/dark/);
    } else {
      await expect(html).not.toHaveClass(/dark/);
    }

    // Reload page
    await page.reload();
    await expect(themeButton).toBeVisible();

    // Verify persisted theme
    if (expectedState) {
      await expect(html).toHaveClass(/dark/);
    } else {
      await expect(html).not.toHaveClass(/dark/);
    }
  });
});

