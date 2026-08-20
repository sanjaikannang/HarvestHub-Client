import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    identifier: Yup.string()
        .required('Phone or email is required')
        .trim(),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required')
});
