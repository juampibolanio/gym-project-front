import { describe, it, expect } from 'vitest';
import { formatCurrencyInput, parseCurrencyInput } from './formatters';

describe('formatters utils', () => {
  describe('formatCurrencyInput', () => {
    it('should format numbers with thousands separators in Argentine locale', () => {
      expect(formatCurrencyInput(15000)).toBe('15.000');
      expect(formatCurrencyInput(1500000)).toBe('1.500.000');
      expect(formatCurrencyInput(0)).toBe('0');
    });

    it('should format raw numeric strings', () => {
      expect(formatCurrencyInput('25000')).toBe('25.000');
      expect(formatCurrencyInput('100')).toBe('100');
    });

    it('should strip non-digit characters and format the remaining digits', () => {
      expect(formatCurrencyInput('$ 15.000,00')).toBe('1.500.000');
      expect(formatCurrencyInput('abc 500 def')).toBe('500');
    });

    it('should return empty string for null, undefined, or empty values', () => {
      expect(formatCurrencyInput(null)).toBe('');
      expect(formatCurrencyInput(undefined)).toBe('');
      expect(formatCurrencyInput('')).toBe('');
    });

    it('should return empty string if string contains no digits', () => {
      expect(formatCurrencyInput('abc')).toBe('');
      expect(formatCurrencyInput('$$$')).toBe('');
    });
  });

  describe('parseCurrencyInput', () => {
    it('should parse formatted currency strings back to clean integers', () => {
      expect(parseCurrencyInput('15.000')).toBe(15000);
      expect(parseCurrencyInput('1.500.000')).toBe(1500000);
      expect(parseCurrencyInput('$ 25.000')).toBe(25000);
    });

    it('should return 0 for empty or non-numeric strings', () => {
      expect(parseCurrencyInput('')).toBe(0);
      expect(parseCurrencyInput('abc')).toBe(0);
      expect(parseCurrencyInput('$')).toBe(0);
    });
  });
});

