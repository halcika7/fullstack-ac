import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsEqualTo<T extends object>(
  property: keyof T,
  validationOptions?: ValidationOptions
) {
  return (obj: T, propertyName: string) => {
    registerDecorator({
      name: 'isEqualTo',
      target: obj.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const relatedPropertyName = args.constraints[0] as keyof T;
          const relatedValue = (args.object as T)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${propertyName} must match ${relatedPropertyName} exactly`;
        },
      },
    });
  };
}
