export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  first_name: string;
  last_name: string;
  confirmPassword: string;
}

export interface User {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'customer';
  createdAt: string;
  updatedAt: string;
  number_of_orders: number;
  money_spent: number;
}

export interface State {
  loading: boolean;
  token?: string;
  user?: User;
  errors?: Partial<RegisterDto>;
  message?: string;
}
