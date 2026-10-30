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

export const mockPlans = [
  {
    uuid: 'plan-uuid-1',
    name: 'Pase Libre Musculación',
    price: 15000,
    durationDays: 30,
    description: 'Acceso total a la sala\nClases grupales incluidas\nVestuarios con duchas',
    isActive: true,
  },
  {
    uuid: 'plan-uuid-2',
    name: 'Pase Anual Premium',
    price: 150000,
    durationDays: 365,
    description: 'Acceso ilimitado todo el año\nEvaluación nutricional',
    isActive: true,
  },
];

export const mockMembers = [
  {
    uuid: 'member-uuid-1',
    dni: '38123456',
    name: 'Juan',
    surname: 'Pérez',
    birthDate: '1995-05-15',
    phoneNumber: '+5491123456789',
    state: 'ACTIVE',
    observations: 'Socio regular',
    profileImageUrl: null,
    createdAt: '2026-01-01T00:00:00.000Z',
    subscriptions: [
      {
        uuid: 'sub-uuid-1',
        status: 'ACTIVE',
        startDate: '2026-01-01T00:00:00.000Z',
        endDate: '2030-01-01T00:00:00.000Z',
        plan: {
          uuid: 'plan-uuid-1',
          name: 'Pase Libre Musculación',
          price: 15000,
          durationDays: 30,
        },
      },
    ],
  },
  {
    uuid: 'member-uuid-2',
    dni: '40987654',
    name: 'María',
    surname: 'Gómez',
    birthDate: '1998-08-20',
    phoneNumber: '+5491198765432',
    state: 'ACTIVE',
    observations: 'Socia destacada',
    profileImageUrl: null,
    createdAt: '2026-02-01T00:00:00.000Z',
    subscriptions: [
      {
        uuid: 'sub-uuid-2',
        status: 'ACTIVE',
        startDate: '2026-02-01T00:00:00.000Z',
        endDate: '2030-01-01T00:00:00.000Z',
        plan: {
          uuid: 'plan-uuid-2',
          name: 'Pase Anual Premium',
          price: 150000,
          durationDays: 365,
        },
      },
    ],
  },
];

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
        data: mockPlans,
        meta: { total: mockPlans.length, page: 1, limit: 10, totalPages: 1 },
      }),
    });
  });

  // Mock members (strictly match /members to avoid matching /membership-plans)
  await page.route(/\/api\/v1\/members(\?|\/|$)/, async (route) => {
    const url = new URL(route.request().url());
    const pathname = url.pathname;

    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    if (lastSegment !== 'members') {
      const found = mockMembers.find((m) => m.uuid === lastSegment);
      if (found) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(found),
        });
        return;
      }
    }

    const term = url.searchParams.get('term')?.toLowerCase().trim() || '';
    let filtered = mockMembers;
    if (term) {
      filtered = mockMembers.filter(
        (m) =>
          m.name.toLowerCase().includes(term) ||
          m.surname.toLowerCase().includes(term) ||
          m.dni.includes(term)
      );
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: filtered,
        meta: { total: filtered.length, page: 1, limit: 10, lastPage: 1 },
      }),
    });
  });

  // Mock payments
  await page.route('**/api/v1/payments**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [],
        meta: { total: 0, page: 1, limit: 10, lastPage: 1 },
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

