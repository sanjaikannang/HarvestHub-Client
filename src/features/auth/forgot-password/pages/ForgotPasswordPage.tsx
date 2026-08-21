import toast from "react-hot-toast";
import { Formik, Form } from 'formik';
import { User } from "lucide-react";
import { Link } from 'react-router-dom';
import Button from "../../../../common/ui/Button";
import InputField from "../../../../common/ui/Input";
import { forgotPasswordValidationSchema } from "../formik/forgot-password.schema";
import { useForgotPasswordMutation } from "../../../../state/services/endpoints/auth";

const ForgotPasswordPage = () => {
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    return (
        <div className="h-screen bg-gradient-to-br from-primaryLighter via-white to-primaryLighter flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8 lg:p-12">
                    <div className="mb-8 text-center">
                        <h2 className="text-xl font-semibold text-neutral-900 mb-2">Forgot Password</h2>
                        <p className="text-sm text-neutral-600">Enter your phone or email and we'll send you reset instructions</p>
                    </div>

                    <Formik
                        initialValues={{ identifier: '' }}
                        validationSchema={forgotPasswordValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                const response = await forgotPassword(values).unwrap();
                                toast.success(response.message);
                            } catch (error: any) {
                                toast.error(error.data?.message || 'Request failed');
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
                                        placeholder="Enter your phone number or email"
                                        value={values.identifier} onChange={handleChange} onBlur={handleBlur}
                                        error={errors.identifier} touched={touched.identifier} icon={User} required
                                    />

                                    <div className="mt-6">
                                        <Button
                                            type="submit" variant="primary" size="md"
                                            loading={isSubmitting || isLoading} disabled={isSubmitting || isLoading} fullWidth
                                        >
                                            {isSubmitting || isLoading ? '' : 'Send reset instructions'}
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="text-sm text-primary font-medium hover:underline">
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
