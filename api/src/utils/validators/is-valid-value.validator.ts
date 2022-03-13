import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsValidValueClass implements ValidatorConstraintInterface {
  validate(value: unknown, { constraints }: ValidationArguments) {
    if (!constraints[0] || !constraints[0].length) return true;
    return constraints[0].includes(value);
  }

  defaultMessage(_: ValidationArguments) {
    return 'Invalid value';
  }
}

export function IsValidValue<T extends object>(
  validValues: readonly unknown[] | unknown[]
) {
  return (object: T, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [validValues],
      validator: IsValidValueClass,
    });
  };
}
