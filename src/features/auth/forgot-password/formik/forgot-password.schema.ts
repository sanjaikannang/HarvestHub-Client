import * as Yup from 'yup';

export const forgotPasswordValidationSchema = Yup.object({
    identifier: Yup.string().required('Phone or email is required').trim(),
});
