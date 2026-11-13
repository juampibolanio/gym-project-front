import { ApiError } from '../interfaces/api-error.interface';

/**
 * Extracts a user-friendly error message from an API error or unknown error.
 * Supports NestJS standard response formats, including class-validator array messages.
 *
 * @param error - The caught error object
 * @param fallbackMessage - Default message if no specific error text is found
 * @returns Human-readable error message
 */
export function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string = 'Ha ocurrido un error inesperado'
): string {
  if (!error) return fallbackMessage;

  const apiError = error as ApiError;
  const message = apiError.response?.data?.message;

  if (Array.isArray(message)) {
    const firstValid = message.find((msg) => typeof msg === 'string' && msg.trim().length > 0);
    if (firstValid) return firstValid.trim();
  } else if (typeof message === 'string' && message.trim().length > 0) {
    return message.trim();
  }

  const backendError = apiError.response?.data?.error;
  if (typeof backendError === 'string' && backendError.trim().length > 0) {
    return backendError.trim();
  }

  if (typeof (error as Error).message === 'string' && (error as Error).message.trim().length > 0) {
    const rawMsg = (error as Error).message.trim();
    if (rawMsg.toLowerCase().includes('network error')) {
      return 'No se pudo conectar con el servidor. Revisa tu conexión a internet.';
    }
    if (rawMsg.toLowerCase().includes('timeout')) {
      return 'El servidor tardó demasiado en responder. Inténtalo nuevamente.';
    }
  }

  return fallbackMessage;
}
