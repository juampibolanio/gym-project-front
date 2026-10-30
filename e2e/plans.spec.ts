import { test, expect } from '@playwright/test';
import { setupMockApiRoutes, injectAdminSession } from './helpers/auth.helper';

test.describe('Membership Plans Management Flows', () => {
  test.beforeEach(async ({ page }) => {
    await setupMockApiRoutes(page);
    await injectAdminSession(page);
  });

  test('should render plans catalog with pricing and features', async ({ page }) => {
    await page.goto('/dashboard/planes');

    await expect(page.getByRole('heading', { name: 'Configuración de planes' })).toBeVisible();
    await expect(page.getByRole('link', { name: /nuevo plan/i })).toBeVisible();

    // Verify first plan card
    await expect(page.getByRole('heading', { name: 'Pase Libre Musculación' })).toBeVisible();
    await expect(page.getByText('$15.000')).toBeVisible();
    await expect(page.getByText('Acceso total a la sala')).toBeVisible();

    // Verify second plan card
    await expect(page.getByRole('heading', { name: 'Pase Anual Premium' })).toBeVisible();
    await expect(page.getByText('$150.000')).toBeVisible();
    await expect(page.getByText('Acceso ilimitado todo el año')).toBeVisible();
  });

  test('should navigate to create plan form when clicking Nuevo Plan', async ({ page }) => {
    await page.goto('/dashboard/planes');

    await page.getByRole('link', { name: /nuevo plan/i }).click();

    await expect(page).toHaveURL(/\/dashboard\/planes\/nuevo/, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'Crear Nuevo Plan' })).toBeVisible();
    await expect(page.getByLabel(/nombre del plan/i)).toBeVisible();
    await expect(page.getByLabel(/precio/i)).toBeVisible();
  });

  test('should display validation errors when submitting an empty form', async ({ page }) => {
    await page.goto('/dashboard/planes/nuevo');

    // Click submit button directly without filling
    await page.getByRole('button', { name: /crear plan/i }).click();

    await expect(page.getByText('El nombre debe tener al menos 3 caracteres')).toBeVisible();
    await expect(page.getByText(/Required|El precio debe ser mayor a 0/i)).toBeVisible();
    expect(page.url()).toContain('/dashboard/planes/nuevo');
  });

  test('should successfully create a new plan and redirect to catalog', async ({ page }) => {
    await page.goto('/dashboard/planes/nuevo');

    // Fill form
    await page.getByLabel(/nombre del plan/i).fill('Pase Crossfit Pro');
    await page.getByLabel(/precio/i).fill('25000');

    const durationInput = page.getByLabel(/duración \(días\)/i);
    await durationInput.fill('45');

    await page.getByLabel(/beneficios del plan/i).fill('Acceso ilimitado a boxes\nCoaching personalizado');

    // Submit
    await page.getByRole('button', { name: /crear plan/i }).click();

    // Redirection to plans catalog
    await expect(page).toHaveURL(/\/dashboard\/planes/, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'Configuración de planes' })).toBeVisible();
  });
});
