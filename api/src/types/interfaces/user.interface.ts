import { UserRoles } from '@enums/user-roles.enum';
import { ObjectId } from './common.interface';

export interface UserI {
  _id: ObjectId;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRoles;
  number_of_orders: number;
  money_spent: number;
}
