export interface OrdersByMonth {
  month: string;
  'Number of Orders': number;
  monthNumber: number;
}

export interface FacilityStat {
  number_of_customers: number;
  money_earned: number;
  number_of_given_discounts: number;
  money_discount: number;
}

export interface State {
  orders: OrdersByMonth[];
  stat: FacilityStat;
}
