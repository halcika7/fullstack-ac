import { ObjectId } from '@interfaces/common.interface';
import { IsEqualTo } from '@utils/validators/is-equal-to.validator';
import { UniqueValue } from '@utils/validators/unique-property-value';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  _id?: string | ObjectId;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  first_name!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  last_name!: string;

  @IsString()
  @IsNotEmpty()
  @UniqueValue('User')
  username!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.])/, {
    message:
      'Password should contain at least one uppercase letter, one lowercase letter and one special character',
  })
  password!: string;

  @IsEqualTo<CreateUserDto>('password')
  confirmPassword!: string;
}

export class UpdateUserDto {
  @IsMongoId()
  _id!: ObjectId;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  first_name!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  last_name!: string;

  @IsString()
  @IsNotEmpty()
  @UniqueValue('User')
  username!: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.])/)
  password!: string;

  @ValidateIf(obj => obj.password)
  @IsEqualTo<CreateUserDto>('password')
  confirmPassword!: string;
}
