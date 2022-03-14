import * as yup from 'yup';
import { passwordMessage, passwordRegex } from '../../../utils/password';

export const schema = yup.object({
  password: yup.string().required().min(6).max(30).matches(passwordRegex, {
    message: passwordMessage,
  }),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
