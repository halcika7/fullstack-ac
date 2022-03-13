import { IsMongoId, IsOptional } from 'class-validator';

export class ValidateMongoId {
  @IsMongoId()
  id!: string;
}

export class ValidateMongoIdQuery {
  @IsOptional()
  @IsMongoId()
  id!: string;
}
