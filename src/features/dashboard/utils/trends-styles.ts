export const getTrendColor = (trend: number, invert: boolean = false) => {
    if (trend === 0) return 'text-text-muted';
    if (invert) {
      return trend > 0 ? 'text-danger-main' : 'text-success-main';
    }
    return trend > 0 ? 'text-success-main' : 'text-danger-main';
  };

export const getTrendText = (trend: number, suffix: string) => {
    const sign = trend > 0 ? '+' : '';
    return `${sign}${trend}% ${suffix}`;
  };
  