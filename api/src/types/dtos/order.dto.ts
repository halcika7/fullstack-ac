import { ObjectId } from '@interfaces/common.interface';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { cars, CarType } from '@interfaces/car.interface';
import { IsValidValue } from '@utils/validators/is-valid-value.validator';

class OrderOption {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsPositive()
  price!: number;
}

export class CreateOrderDto {
  customer!: ObjectId;

  @IsValidValue(cars)
  car_type!: CarType;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => OrderOption)
  options!: OrderOption[];

  @IsPositive()
  price!: number;

  @IsNumber()
  discount!: number;

  @IsPositive()
  total_price!: number;
}
