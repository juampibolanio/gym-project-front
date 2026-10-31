import { describe, it, expect } from 'vitest';
import {
  buildRevenueChartOptions,
  RevenueDataPoint,
} from './revenue-chart-options';

const mockData: RevenueDataPoint[] = [
  { month: 'Enero', amount: 100000 },
  { month: 'Febrero', amount: 150000 },
  { month: 'Marzo', amount: 200000 },
];

describe('revenue-chart-options builder', () => {
  it('should generate valid options in monthly mode without average markLine', () => {
    const options = buildRevenueChartOptions({
      data: mockData,
      isDark: false,
      shouldAnimate: true,
      viewMode: 'monthly',
      showAverage: false,
    });

    expect(options.animation).toBe(true);
    expect(options.xAxis).toBeDefined();
    const series = options.series as Array<{
      name: string;
      type: string;
      data: number[];
      markLine?: unknown;
    }>;
    expect(series[0].name).toBe('Recaudación Mensual');
    expect(series[0].data).toEqual([100000, 150000, 200000]);
    expect(series[0].markLine).toBeUndefined();
  });

  it('should include average markLine when showAverage is true', () => {
    const options = buildRevenueChartOptions({
      data: mockData,
      isDark: true,
      shouldAnimate: false,
      viewMode: 'monthly',
      showAverage: true,
    });

    const series = options.series as Array<{
      name: string;
      markLine?: { data: Array<{ type: string; name: string }> };
    }>;
    expect(series[0].markLine).toBeDefined();
    expect(series[0].markLine?.data[0].type).toBe('average');
  });

  it('should set cumulative series name and styling in cumulative mode', () => {
    const options = buildRevenueChartOptions({
      data: mockData,
      isDark: true,
      shouldAnimate: false,
      viewMode: 'cumulative',
      showAverage: false,
    });

    const series = options.series as Array<{
      name: string;
      lineStyle?: { color: string };
    }>;
    expect(series[0].name).toBe('Recaudación Acumulada');
    expect(series[0].lineStyle?.color).toBe('#3b82f6');
  });
});

