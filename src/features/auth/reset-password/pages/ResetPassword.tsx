import toast from "react-hot-toast";
import { Formik, Form } from 'formik';
import { Lock, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Button from "../../../../common/ui/Button";
import InputField from "../../../../common/ui/Input";
import { getItemFromStorage } from "../../../../utils/storage";
import { changePasswordValidationSchema } from "../formik/reset-password.schema";
import { useChangePasswordMutation } from "../../../../state/services/endpoints/auth";

// Forced first-login password change (admin-onboarded accounts land here
// straight after login — see LoginPage's isFirstLogin redirect).
const ResetPassword = () => {
    const navigate = useNavigate();
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const storedUser = getItemFromStorage<{ email?: string; phone?: string }>({ key: "user" });

    return (
        <div className="h-screen bg-gradient-to-br from-primaryLighter via-white to-primaryLighter flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden">
                <div className="p-8 lg:p-12">
                    <div className="mb-8 text-center">
                        <h2 className="text-xl font-semibold text-neutral-900 mb-2">Set a new password</h2>
                        <p className="text-sm text-neutral-600">This is your first login — please choose a new password to continue</p>
                    </div>

                    <Formik
                        initialValues={{
                            identifier: storedUser?.email || storedUser?.phone || '',
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        }}
                        validationSchema={changePasswordValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                const response = await changePassword(values).unwrap();
                                toast.success(response.message);
                                navigate('/login', { replace: true });
                            } catch (error: any) {
                                toast.error(error.data?.message || 'Password change failed');
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                            <Form>
                                <div className="space-y-4">
                                    <InputField
                                        id="identifier" name="identifier" type="text" label="Phone or Email"
                                        value={values.identifier} onChange={handleChange} onBlur={handleBlur}
                                        error={errors.identifier} touched={touched.identifier} icon={User} required
                                    />
                                    <InputField
                                        id="currentPassword" name="currentPassword" type="password" label="Current (temporary) password"
                                        value={values.currentPassword} onChange={handleChange} onBlur={handleBlur}
                                        error={errors.currentPassword} touched={touched.currentPassword} icon={Lock} showPasswordToggle required
                                    />
                                    <InputField
                                        id="newPassword" name="newPassword" type="password" label="New Password"
                                        value={values.newPassword} onChange={handleChange} onBlur={handleBlur}
                                        error={errors.newPassword} touched={touched.newPassword} icon={Lock} showPasswordToggle required
                                    />
                                    <InputField
                                        id="confirmPassword" name="confirmPassword" type="password" label="Confirm New Password"
                                        value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                                        error={errors.confirmPassword} touched={touched.confirmPassword} icon={Lock} showPasswordToggle required
                                    />

                                    <div className="mt-6">
                                        <Button
                                            type="submit" variant="primary" size="md"
                                            loading={isSubmitting || isLoading} disabled={isSubmitting || isLoading} fullWidth
                                        >
                                            {isSubmitting || isLoading ? '' : 'Change password'}
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

export default ResetPassword;
