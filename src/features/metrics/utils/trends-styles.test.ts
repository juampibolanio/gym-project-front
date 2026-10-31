import { describe, it, expect } from 'vitest';
import {
  getTrendColor,
  getTrendText,
  getMtdComparisonText,
} from './trends-styles';

describe('trends-styles utility', () => {
  describe('getTrendColor', () => {
    it('should return text-success-main for positive trends', () => {
      expect(getTrendColor(15)).toBe('text-success-main');
      expect(getTrendColor(0.1)).toBe('text-success-main');
    });

    it('should return text-danger-main for negative trends', () => {
      expect(getTrendColor(-10)).toBe('text-danger-main');
      expect(getTrendColor(-0.5)).toBe('text-danger-main');
    });

    it('should return text-text-muted for zero or non-numeric trends', () => {
      expect(getTrendColor(0)).toBe('text-text-muted');
      expect(getTrendColor(NaN)).toBe('text-text-muted');
    });

    it('should invert colors when invert parameter is true', () => {
      expect(getTrendColor(10, true)).toBe('text-danger-main');
      expect(getTrendColor(-10, true)).toBe('text-success-main');
    });
  });

  describe('getTrendText', () => {
    it('should format positive integer trends with + sign', () => {
      expect(getTrendText(15, 'vs mes anterior')).toBe('+15% vs mes anterior');
    });

    it('should format positive decimal trends to 1 decimal place', () => {
      expect(getTrendText(12.456, 'vs mes anterior')).toBe('+12.5% vs mes anterior');
    });

    it('should format negative trends with - sign and no extra +', () => {
      expect(getTrendText(-8.2, 'vs mes anterior')).toBe('-8.2% vs mes anterior');
      expect(getTrendText(-5, 'vs mes anterior')).toBe('-5% vs mes anterior');
    });

    it('should format zero trend as 0%', () => {
      expect(getTrendText(0, 'vs mes anterior')).toBe('0% vs mes anterior');
    });
  });

  describe('getMtdComparisonText', () => {
    it('should return null when lastMonthMtd is undefined or null', () => {
      expect(getMtdComparisonText(undefined)).toBeNull();
      expect(getMtdComparisonText(null as unknown as number)).toBeNull();
      expect(getMtdComparisonText(NaN)).toBeNull();
    });

    it('should format currency correctly with $ and thousands separators', () => {
      const result = getMtdComparisonText(1350000, true);
      expect(result).toBe('Mismo período mes anterior: $1.350.000');
    });

    it('should format plain count correctly with thousands separators', () => {
      const result = getMtdComparisonText(1250, false);
      expect(result).toBe('Mismo período mes anterior: 1.250');
    });
  });
});

