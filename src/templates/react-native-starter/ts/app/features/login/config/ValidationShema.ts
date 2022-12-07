import * as yup from 'yup';

export const validationSchemaLogin = yup.object({
  username: yup.string().required('Masukan username'),
  password: yup.string().required('Masukan Password'),
});
