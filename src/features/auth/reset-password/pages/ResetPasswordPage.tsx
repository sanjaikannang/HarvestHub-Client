import toast from "react-hot-toast";
import { Formik, Form } from 'formik';
import { Lock } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import Button from "../../../../common/ui/Button";
import InputField from "../../../../common/ui/Input";
import { resetPasswordValidationSchema } from "../formik/reset-password.schema";
import { useResetPasswordMutation } from "../../../../state/services/endpoints/auth";

// Reached via the link sent by /auth/forgot-password (token in the URL)
const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    return (
        <div className="h-screen bg-gradient-to-br from-primaryLighter via-white to-primaryLighter flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8 lg:p-12">
                    <div className="mb-8 text-center">
                        <h2 className="text-xl font-semibold text-neutral-900 mb-2">Reset Password</h2>
                        <p className="text-sm text-neutral-600">Choose a new password for your account</p>
                    </div>

                    <Formik
                        initialValues={{ newPassword: '', confirmPassword: '' }}
                        validationSchema={resetPasswordValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                const response = await resetPassword({ token: token as string, ...values }).unwrap();
                                toast.success(response.message);
                                navigate('/login', { replace: true });
                            } catch (error: any) {
                                toast.error(error.data?.message || 'Reset failed');
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                            <Form>
                                <div className="space-y-4">
                                    <InputField
                                        id="newPassword" name="newPassword" type="password" label="New Password"
                                        placeholder="Enter a new password"
                                        value={values.newPassword} onChange={handleChange} onBlur={handleBlur}
                                        error={errors.newPassword} touched={touched.newPassword} icon={Lock} showPasswordToggle required
                                    />
                                    <InputField
                                        id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password"
                                        placeholder="Re-enter the new password"
                                        value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                                        error={errors.confirmPassword} touched={touched.confirmPassword} icon={Lock} showPasswordToggle required
                                    />

                                    <div className="mt-6">
                                        <Button
                                            type="submit" variant="primary" size="md"
                                            loading={isSubmitting || isLoading} disabled={isSubmitting || isLoading} fullWidth
                                        >
                                            {isSubmitting || isLoading ? '' : 'Reset password'}
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
