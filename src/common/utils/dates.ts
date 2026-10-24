/**
 * Converts a given ISO string, Date instance, or undefined into a local date string (YYYY-MM-DD).
 *
 * @param dateInput - Optional ISO date string or Date object.
 * @returns A string representing the local date in YYYY-MM-DD format.
 */
export const getLocalDateString = (dateInput?: string | Date | null): string => {
  if (!dateInput) {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }

  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return '';

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Converts a local date string (YYYY-MM-DD) to an ISO string representing midday (12:00 PM) in local time.
 * This prevents timezone offset issues that could shift the date to the previous day in UTC.
 *
 * @param dateString - The local date string in YYYY-MM-DD format.
 * @returns An ISO 8601 string representing midday of the provided date.
 */
export const getIsoWithLocalMidday = (dateString: string): string => {
  if (!dateString) return new Date().toISOString();
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return new Date().toISOString();
  const d = new Date(year, month - 1, day, 12, 0, 0);

  return d.toISOString();
};

/**
 * Retrieves the current local date as a string in YYYY-MM-DD format,
 * automatically adjusting for the local timezone offset.
 *
 * @returns A string representing today's local date.
 */
export const getTodayLocalString = (): string => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

/**
 * Formats a date string or Date object into human-readable Spanish locale string.
 *
 * @param dateInput - Date string or Date instance.
 * @param options - Optional Intl.DateTimeFormatOptions.
 * @returns Formatted date string (e.g., "24/10/2026").
 */
export const formatDisplayDate = (
  dateInput?: string | Date | null,
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
): string => {
  if (!dateInput) return '-';
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return '-';

  return new Intl.DateTimeFormat('es-AR', options).format(d);
};

