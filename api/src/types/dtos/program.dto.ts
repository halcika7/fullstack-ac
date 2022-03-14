import { UniqueValue } from '@utils/validators/unique-property-value';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProgramOptionDto {
  _id?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  name!: string;

  @IsPositive()
  price!: number;

  @Min(0)
  sedan!: number;

  @Min(0)
  pickup!: number;

  @Min(0)
  suv!: number;

  @Min(0)
  mini_bus!: number;
}

export class CreateProgramDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @UniqueValue('Program')
  name!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ProgramOptionDto)
  options!: ProgramOptionDto[];
}

export class DeleteProgramsDto {
  @IsMongoId({ each: true })
  ids!: string[];
}
