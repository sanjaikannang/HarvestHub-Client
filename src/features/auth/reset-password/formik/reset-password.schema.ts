import * as Yup from 'yup';

export const resetPasswordValidationSchema = Yup.object({
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters long').required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
        .required('Please confirm your new password'),
});

export const changePasswordValidationSchema = Yup.object({
    identifier: Yup.string().required('Phone or email is required').trim(),
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters long').required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
        .required('Please confirm your new password'),
});
