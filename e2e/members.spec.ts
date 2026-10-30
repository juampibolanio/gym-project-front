import { test, expect } from '@playwright/test';
import { setupMockApiRoutes, injectAdminSession } from './helpers/auth.helper';

test.describe('Members Directory and Management Flows', () => {
  test.beforeEach(async ({ page }) => {
    await setupMockApiRoutes(page);
    await injectAdminSession(page);
  });

  test('should render members directory with table headers, rows, and plan details', async ({ page }) => {
    await page.goto('/dashboard/miembros');

    // Page title and create member button
    await expect(page.getByRole('heading', { name: 'Miembros del sistema' })).toBeVisible();
    await expect(page.getByRole('link', { name: /nuevo miembro/i })).toBeVisible();

    // Member entries
    await expect(page.getByText('Juan Pérez')).toBeVisible();
    await expect(page.getByText('38123456')).toBeVisible();
    await expect(page.getByText('Pase Libre Musculación')).toBeVisible();

    await expect(page.getByText('María Gómez')).toBeVisible();
    await expect(page.getByText('40987654')).toBeVisible();
    await expect(page.getByText('Pase Anual Premium')).toBeVisible();
  });

  test('should filter members using the search input', async ({ page }) => {
    await page.goto('/dashboard/miembros');

    const searchInput = page.getByPlaceholder('Buscar miembros...');
    await expect(searchInput).toBeVisible();

    // Search for Maria
    await searchInput.fill('María');

    // Wait for URL query update and debounced filter
    await expect(page).toHaveURL(/q=Mar/);
    await expect(page.getByText('María Gómez')).toBeVisible();
    await expect(page.getByText('Juan Pérez')).not.toBeVisible();

    // Clear search
    await searchInput.fill('');
    await expect(page.getByText('Juan Pérez')).toBeVisible();
    await expect(page.getByText('María Gómez')).toBeVisible();
  });

  test('should navigate to member detail view when clicking on a row', async ({ page }) => {
    await page.goto('/dashboard/miembros');

    // Click on Juan Pérez row
    const juanRow = page.getByRole('row').filter({ hasText: 'Juan Pérez' });
    await expect(juanRow).toBeVisible();
    await juanRow.click();

    // Verify detail page URL and content (with timeout for Next.js page compilation)
    await expect(page).toHaveURL(/\/dashboard\/miembros\/member-uuid-1/, { timeout: 15000 });
    await expect(page.getByText('Perfil del Miembro')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Juan Pérez' }).first()).toBeVisible();
    await expect(page.getByText('Historial de Pagos')).toBeVisible();
  });

  test('should open row actions menu and allow navigating to details', async ({ page }) => {
    await page.goto('/dashboard/miembros');

    const actionsBtn = page.getByRole('button', { name: /opciones del socio/i }).first();
    await expect(actionsBtn).toBeVisible();
    await actionsBtn.click();

    // Menu options visible
    const viewDetailsOption = page.getByRole('menuitem', { name: /ver detalles/i });
    await expect(viewDetailsOption).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /editar/i })).toBeVisible();

    // Click View Details
    await viewDetailsOption.click();
    await expect(page).toHaveURL(/\/dashboard\/miembros\/member-uuid-1/, { timeout: 15000 });
  });
});
