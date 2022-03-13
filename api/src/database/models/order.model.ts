import { CreateOrderDto } from '@dto/order.dto';
import { ObjectId } from '@interfaces/common.interface';
import { BaseModel } from './base.model';

export interface OrderModel extends CreateOrderDto, BaseModel {
  customer: ObjectId;
}
