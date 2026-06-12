export const formatDuration = (days: number): string => {
    switch (days) {
        case 1: return 'día';
        case 30: return 'mes';
        case 365: return 'año';
        default: return `${days} días`;
    }
};
