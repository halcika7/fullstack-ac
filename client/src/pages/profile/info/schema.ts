import * as yup from 'yup';

export const schema = yup.object({
  username: yup.string().required().min(3).max(30),
  first_name: yup.string().required().min(3).max(30),
  last_name: yup.string().required().min(3).max(30),
});
