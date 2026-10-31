import { describe, it, expect } from 'vitest';
import {
  buildMembersChartOptions,
} from './members-chart-options';
import { MemberTrajectoryItem } from '../interfaces/metrics.interface';

const mockMembersData: MemberTrajectoryItem[] = [
  { month: 'Enero', newMembers: 20, churnedMembers: 5 },
  { month: 'Febrero', newMembers: 10, churnedMembers: 15 },
  { month: 'Marzo', newMembers: 25, churnedMembers: 10 },
];

describe('members-chart-options builder', () => {
  it('should generate two line series for flow mode (Altas vs Bajas)', () => {
    const options = buildMembersChartOptions({
      data: mockMembersData,
      isDark: false,
      shouldAnimate: true,
      viewMode: 'flow',
    });

    const series = options.series as Array<{
      name: string;
      type: string;
      data: number[];
    }>;

    expect(series).toHaveLength(2);
    expect(series[0].name).toBe('Nuevas Altas');
    expect(series[0].type).toBe('line');
    expect(series[0].data).toEqual([20, 10, 25]);

    expect(series[1].name).toBe('Bajas');
    expect(series[1].type).toBe('line');
    expect(series[1].data).toEqual([5, 15, 10]);
  });

  it('should generate single bar series with positive and negative net values for net mode', () => {
    const options = buildMembersChartOptions({
      data: mockMembersData,
      isDark: true,
      shouldAnimate: false,
      viewMode: 'net',
    });

    const series = options.series as Array<{
      name: string;
      type: string;
      data: Array<{ value: number; itemStyle: { color: string } }>;
    }>;

    expect(series).toHaveLength(1);
    expect(series[0].name).toBe('Balance Neto');
    expect(series[0].type).toBe('bar');

    // Enero: 20 - 5 = +15 (green)
    expect(series[0].data[0].value).toBe(15);
    expect(series[0].data[0].itemStyle.color).toBe('#10b981');

    // Febrero: 10 - 15 = -5 (red)
    expect(series[0].data[1].value).toBe(-5);
    expect(series[0].data[1].itemStyle.color).toBe('#ef4444');

    // Marzo: 25 - 10 = +15 (green)
    expect(series[0].data[2].value).toBe(15);
    expect(series[0].data[2].itemStyle.color).toBe('#10b981');
  });
});

