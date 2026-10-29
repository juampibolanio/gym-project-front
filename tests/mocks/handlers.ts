import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('*/api/v1/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string; domain?: string };

    if (body.email === 'admin@gym.com' && body.password === 'password123') {
      return HttpResponse.json(
        {
          access_token: 'mock-access-token',
          refresh_token: 'mock-refresh-token',
          user: {
            uuid: 'user-uuid-1',
            dni: '35123456',
            name: 'Carlos',
            surname: 'Admin',
            email: 'admin@gym.com',
            role: 'ADMIN',
            gymUuid: 'gym-uuid-1',
          },
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      {
        statusCode: 401,
        message: 'Credenciales inválidas',
        error: 'Unauthorized',
      },
      { status: 401 }
    );
  }),

  http.post('*/api/v1/auth/logout', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.post('*/api/v1/auth/refresh', () => {
    return HttpResponse.json(
      {
        access_token: 'fresh-access-token',
        refresh_token: 'fresh-refresh-token',
      },
      { status: 200 }
    );
  }),

  http.post('*/api/v1/membership-plans', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        uuid: 'new-plan-uuid-1',
        name: body.name,
        price: body.price,
        durationDays: body.durationDays,
        description: body.description,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),

  http.post('*/api/v1/payments', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        uuid: 'new-payment-uuid-1',
        memberUuid: body.memberUuid,
        paymentMethod: body.paymentMethod,
        amountPaid: body.amountPaid,
        notes: body.notes,
        date: body.date,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),
];
