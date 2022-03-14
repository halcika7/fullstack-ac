export interface Order {
  _id: string;
  car_type: 'suv' | 'sedan' | 'pickup' | 'mini_bus';
  options: {
    name: string;
    price: number;
  }[];
  price: number;
  discount: number;
  total_price: number;
  customer: string;
  createdAt: string;
}

export type CarType = Order['car_type'];

export interface CreateOrder {
  car_type: CarType;
  options: { name: string; price: number }[];
  price: number;
  total_price: number;
  discount: number;
}

export interface State {
  orders: Order[];
  last_seen?: string;
  hasMore: boolean;
  message?: string;
}
