import { describe, it, expect } from 'vitest';
import {
  getLocalDateString,
  getIsoWithLocalMidday,
  getTodayLocalString,
  formatDisplayDate,
} from './dates';

describe('dates utils', () => {
  describe('getLocalDateString', () => {
    it('should return today formatted when no argument is passed', () => {
      const today = new Date();
      const expected = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      expect(getLocalDateString()).toBe(expected);
    });

    it('should format a valid Date object to YYYY-MM-DD', () => {
      const date = new Date(2026, 4, 15); // May 15, 2026
      expect(getLocalDateString(date)).toBe('2026-05-15');
    });

    it('should format an ISO string to local YYYY-MM-DD', () => {
      // 2026-06-20T12:00:00 (midday avoids timezone shift)
      expect(getLocalDateString('2026-06-20T12:00:00.000Z')).toMatch(/^2026-06-20/);
    });

    it('should return empty string for invalid date inputs', () => {
      expect(getLocalDateString('not-a-valid-date')).toBe('');
    });
  });

  describe('getIsoWithLocalMidday', () => {
    it('should convert local date string YYYY-MM-DD to ISO string at 12:00 PM local time', () => {
      const iso = getIsoWithLocalMidday('2026-10-25');
      const date = new Date(iso);
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(9); // 0-indexed October
      expect(date.getDate()).toBe(25);
      expect(date.getHours()).toBe(12);
    });

    it('should return current date ISO string if input is empty or malformed', () => {
      const fallbackIso = getIsoWithLocalMidday('');
      expect(new Date(fallbackIso).getTime()).not.toBeNaN();

      const malformedIso = getIsoWithLocalMidday('invalid');
      expect(new Date(malformedIso).getTime()).not.toBeNaN();
    });
  });

  describe('getTodayLocalString', () => {
    it('should return today in YYYY-MM-DD format', () => {
      const result = getTodayLocalString();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('formatDisplayDate', () => {
    it('should format a valid date to es-AR locale (DD/MM/YYYY)', () => {
      const date = new Date(2026, 9, 25);
      const formatted = formatDisplayDate(date);
      expect(formatted).toBe('25/10/2026');
    });

    it('should return dash "-" when dateInput is null, undefined, or empty', () => {
      expect(formatDisplayDate(null)).toBe('-');
      expect(formatDisplayDate(undefined)).toBe('-');
      expect(formatDisplayDate('')).toBe('-');
    });

    it('should return dash "-" when dateInput is an invalid date string', () => {
      expect(formatDisplayDate('invalid-date')).toBe('-');
    });
  });
});

