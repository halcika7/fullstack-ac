export interface OrdersByMonth {
  month: string;
  'Number of Orders': number;
  'Total Earnings': number;
  monthNumber: number;
}

export const months = [
  'null',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
] as const;
