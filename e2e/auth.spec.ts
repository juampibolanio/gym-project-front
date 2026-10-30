import { test, expect } from '@playwright/test';
import { setupMockApiRoutes, injectAdminSession } from './helpers/auth.helper';

test.describe('Authentication and Session Flows', () => {
  test.beforeEach(async ({ page }) => {
    await setupMockApiRoutes(page);
  });

  test('should render login form elements properly', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: 'ChacuGym' })).toBeVisible();
    await expect(page.getByLabel(/dirección email/i)).toBeVisible();
    await expect(page.getByLabel(/^contraseña$/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /iniciar sesión/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /¿has olvidado la contraseña\?/i })).toBeVisible();
  });

  test('should display validation errors when submitting an empty form', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    await expect(page.getByText('El correo electrónico es obligatorio')).toBeVisible();
    await expect(page.getByText('La contraseña debe tener al menos 6 caracteres')).toBeVisible();
    expect(page.url()).toContain('/login');
  });

  test('should show error notification when credentials are invalid', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel(/dirección email/i).fill('wrong@gym.com');
    await page.getByLabel(/^contraseña$/i).fill('wrongpass');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    await expect(page.getByText('Credenciales inválidas')).toBeVisible();
    expect(page.url()).toContain('/login');
  });

  test('should successfully log in as admin and redirect to /dashboard', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel(/dirección email/i).fill('admin@gym.com');
    await page.getByLabel(/^contraseña$/i).fill('password123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText('¡Bienvenido, Carlos!')).toBeVisible();
    await expect(page.getByRole('button', { name: /cerrar sesión/i })).toBeVisible();
  });

  test('should log out from dashboard and redirect back to /login', async ({ page }) => {
    await injectAdminSession(page);
    await page.goto('/dashboard');

    await expect(page).toHaveURL(/\/dashboard/);
    await page.getByRole('button', { name: /cerrar sesión/i }).click();

    // Verify confirmation modal
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole('heading', { name: 'Cerrar sesión' })).toBeVisible();

    // Confirm logout
    await modal.getByRole('button', { name: /sí, cerrar sesión/i }).click();

    await expect(page).toHaveURL(/\/login/);

    // Verify session storage was cleared
    const authStorage = await page.evaluate(() => localStorage.getItem('auth-storage'));
    const parsed = authStorage ? JSON.parse(authStorage) : null;
    expect(parsed?.state?.token).toBeNull();
  });
});

