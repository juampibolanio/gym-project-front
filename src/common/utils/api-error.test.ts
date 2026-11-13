import { describe, it, expect } from 'vitest';
import { getApiErrorMessage } from './api-error';
import { ApiError } from '../interfaces/api-error.interface';

describe('getApiErrorMessage', () => {
  it('should return the fallback message when error is null or undefined', () => {
    expect(getApiErrorMessage(null, 'Error por defecto')).toBe('Error por defecto');
    expect(getApiErrorMessage(undefined, 'Error por defecto')).toBe('Error por defecto');
    expect(getApiErrorMessage(undefined)).toBe('Ha ocurrido un error inesperado');
  });

  it('should extract string message from response data', () => {
    const error: ApiError = {
      response: {
        data: {
          message: 'El correo electrónico ya se encuentra registrado',
          statusCode: 400,
        },
      },
    };
    expect(getApiErrorMessage(error, 'Fallback')).toBe(
      'El correo electrónico ya se encuentra registrado'
    );
  });

  it('should extract the first error message when message is an array', () => {
    const error: ApiError = {
      response: {
        data: {
          message: ['El nombre es requerido', 'El email es inválido'],
          statusCode: 400,
        },
      },
    };
    expect(getApiErrorMessage(error, 'Fallback')).toBe('El nombre es requerido');
  });

  it('should fallback when message is an empty array', () => {
    const error: ApiError = {
      response: {
        data: {
          message: [],
          statusCode: 400,
        },
      },
    };
    expect(getApiErrorMessage(error, 'Fallback')).toBe('Fallback');
  });

  it('should extract backend error field if message is missing', () => {
    const error: ApiError = {
      response: {
        data: {
          error: 'Unauthorized',
          statusCode: 401,
        },
      },
    };
    expect(getApiErrorMessage(error, 'Fallback')).toBe('Unauthorized');
  });

  it('should return a user-friendly message for Network Error', () => {
    const error = new Error('Network Error');
    expect(getApiErrorMessage(error, 'Fallback')).toBe(
      'No se pudo conectar con el servidor. Revisa tu conexión a internet.'
    );
  });

  it('should return a user-friendly message for timeout', () => {
    const error = new Error('timeout of 10000ms exceeded');
    expect(getApiErrorMessage(error, 'Fallback')).toBe(
      'El servidor tardó demasiado en responder. Inténtalo nuevamente.'
    );
  });

  it('should return fallback message for unknown or unhandled errors', () => {
    const error = { foo: 'bar' };
    expect(getApiErrorMessage(error, 'Error personalizado')).toBe('Error personalizado');
  });
});
