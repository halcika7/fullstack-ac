import { RegisterDto } from '../../auth/store/types';

export interface Profile {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  password?: string;
  confirmPassword?: string;
}

export type State = {
  message?: string;
  errors?: Partial<RegisterDto>;
};
