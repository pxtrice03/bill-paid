/**
 * Format a number as a CFA amount 
 */
export const money = (n: number): string => `${Math.round(n)} CFA`

export const isLow = (stock: number, total: number): boolean => stock > 0 && stock < total / 3
