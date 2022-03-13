import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestHandler } from 'express';
import { BadRequest } from '@exceptions';
import { Dictionary } from '@interfaces/common.interface';

export const validator = <T>(
  type: ClassConstructor<T>,
  value: 'body' | 'query' | 'params'
): RequestHandler => {
  return async (req, _res, next) => {
    try {
      const validationValues = await validate(
        plainToInstance<T, T>(type, req[value]),
        {
          skipMissingProperties: false,
          whitelist: true,
          forbidNonWhitelisted: true,
        }
      );

      const errors = validationValues.reduce(
        (prevErrors, { property, constraints, children }) => {
          /* istanbul ignore next */
          const constrain = constraints ?? children![0].constraints ?? {};
          let response: string | Dictionary[] = Object.values(constrain)[0];

          /* istanbul ignore next */
          if (children?.[0]?.children?.length) {
            response = children.map(child =>
              child.children!.reduce(
                (prev, current) => ({
                  ...prev,
                  [current.property]: Object.values(current.constraints!)[0],
                }),
                {} as Dictionary
              )
            );
          }

          return { ...prevErrors, [property]: response };
        },
        {} as Dictionary
      );

      if (Object.keys(errors).length) {
        throw new BadRequest({ errors });
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
};
