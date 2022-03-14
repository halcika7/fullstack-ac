import * as yup from 'yup';

export const schema = yup.object({
  username: yup.string().required().min(3).max(30),
  first_name: yup.string().required().min(3).max(30),
  last_name: yup.string().required().min(3).max(30),
  password: yup
    .string()
    .required()
    .min(6)
    .max(30)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.])/, {
      message:
        'Password should contain at least one uppercase letter, one lowercase letter and one special character',
    }),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
