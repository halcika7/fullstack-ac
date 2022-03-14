import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().required().min(4).max(30),
  options: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        name: yup.string().required().min(4).max(30),
        price: yup.number().min(1).required(),
        sedan: yup.number().min(0).required(),
        pickup: yup.number().min(0).required(),
        suv: yup.number().min(0).required(),
        mini_bus: yup.number().min(0).required(),
      })
    )
    .required(),
});
