import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
    name: Yup.string().required('Name is required').trim(),
    phone: Yup.string().required('Phone number is required').trim(),
    email: Yup.string().email('Please enter a valid email address'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Please confirm your password'),
});
