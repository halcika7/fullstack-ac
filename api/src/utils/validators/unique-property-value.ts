import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { model } from 'mongoose';

interface CustomValidationArguments extends ValidationArguments {
  object: { _id: string };
}

@ValidatorConstraint({ async: true })
export class IsUniqueValue implements ValidatorConstraintInterface {
  async validate(
    value: unknown,
    { constraints, property, object }: CustomValidationArguments
  ) {
    const row = await model(constraints[0]).findOne({ [property]: value });

    if (object._id && row?._id) return object._id === row.id;

    return !row;
  }

  defaultMessage({ object }: CustomValidationArguments) {
    if (object._id) {
      return `is already in use`;
    }

    return `must be a unique value.`;
  }
}

export function UniqueValue<T extends object>(
  collectionName: string,
  validationOptions?: ValidationOptions
) {
  return (object: T, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [collectionName],
      validator: IsUniqueValue,
    });
  };
}
