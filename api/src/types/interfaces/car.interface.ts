export const cars = ['suv', 'sedan', 'pickup', 'minibus'] as const;

export type CarType = typeof cars[number];
