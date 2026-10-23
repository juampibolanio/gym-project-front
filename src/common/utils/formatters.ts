/**
 * Formats a raw numeric string or number into Argentine Peso currency representation (e.g. "15.000").
 * Strips non-digit characters and formats with thousands separators.
 */
export function formatCurrencyInput(value: string | number | undefined | null): string {
  if (value === undefined || value === null || value === '') return '';
  const stringValue = typeof value === 'number' ? String(value) : value;
  const rawValue = stringValue.replace(/\D/g, '');
  if (!rawValue) return '';
  return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(Number(rawValue));
}

/**
 * Strips formatting dots/commas to retrieve the clean integer number.
 */
export function parseCurrencyInput(value: string): number {
  const clean = value.replace(/\D/g, '');
  return clean ? Number(clean) : 0;
}

