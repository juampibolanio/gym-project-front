import { Page } from '@playwright/test';

export const mockAdminUser = {
  uuid: 'user-uuid-1',
  dni: '35123456',
  name: 'Carlos',
  surname: 'Admin',
  email: 'admin@gym.com',
  role: 'ADMIN',
  gymUuid: 'gym-uuid-1',
};

export async function setupMockApiRoutes(page: Page) {
  // Mock login endpoint
  await page.route('**/api/v1/auth/login', async (route) => {
    const postData = route.request().postDataJSON();
    if (postData?.email === 'admin@gym.com' && postData?.password === 'password123') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'mock-access-token',
          refresh_token: 'mock-refresh-token',
          user: mockAdminUser,
        }),
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          statusCode: 401,
          message: 'Credenciales inválidas',
          error: 'Unauthorized',
        }),
      });
    }
  });

  // Mock logout endpoint
  await page.route('**/api/v1/auth/logout', async (route) => {
    await route.fulfill({ status: 204 });
  });

  // Mock gym information
  await page.route('**/api/v1/gyms/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        uuid: 'gym-uuid-1',
        name: 'Chacu Gym',
        logoUrl: null,
      }),
    });
  });

  // Mock metrics overview
  await page.route('**/api/v1/metrics/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        totalActiveMembers: 120,
        monthlyRevenue: 1500000,
        newMembersThisMonth: 15,
        expiredMemberships: 5,
        dailyEntries: [],
        membersFlow: [],
        planDistribution: [],
      }),
    });
  });

  // Mock membership plans
  await page.route('**/api/v1/membership-plans**', async (route) => {
    if (route.request().method() === 'POST') {
      const data = route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          uuid: 'new-plan-uuid-1',
          name: data?.name,
          price: data?.price,
          durationDays: data?.durationDays,
          description: data?.description,
          isActive: true,
          createdAt: new Date().toISOString(),
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [
          {
            uuid: 'plan-uuid-1',
            name: 'Pase Libre Musculación',
            price: 15000,
            durationDays: 30,
            description: 'Acceso total a la sala',
            isActive: true,
          },
        ],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      }),
    });
  });

  // Mock members
  await page.route('**/api/v1/members**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [
          {
            uuid: 'member-uuid-1',
            dni: '38123456',
            name: 'Juan',
            surname: 'Pérez',
            birthDate: '1995-05-15',
            phoneNumber: '+5491123456789',
            status: 'ACTIVE',
            createdAt: '2026-01-01T00:00:00.000Z',
          },
        ],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      }),
    });
  });
}

export async function injectAdminSession(page: Page) {
  await page.addInitScript((adminUser) => {
    localStorage.setItem(
      'auth-storage',
      JSON.stringify({
        state: {
          token: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          user: adminUser,
          domain: 'test',
        },
        version: 0,
      })
    );
  }, mockAdminUser);
}

