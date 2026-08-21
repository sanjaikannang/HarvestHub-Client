import toast from "react-hot-toast";
import { Formik, Form } from 'formik';
import { User, Lock } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import Button from "../../../../common/ui/Button";
import { UserRole } from "../../../../utils/enum";
import InputField from "../../../../common/ui/Input";
import { setItemInStorage } from "../../../../utils/storage";
import { loginValidationSchema } from "../formik/login.schema";
import { navigateByUserRole } from "../../../../utils/navigation";
import { useLoginMutation } from "../../../../state/services/endpoints/auth";

interface LoginFormValues {
  identifier: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const initialValues: LoginFormValues = {
    identifier: '',
    password: ''
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: any
  ) => {
    try {
      const response = await login(values).unwrap();

      if (response.data.tokens) {
        setItemInStorage({
          key: 'accessToken',
          value: response.data.tokens.accessToken,
        });

        setItemInStorage({
          key: 'user',
          value: response.data.user,
        });

        setItemInStorage({
          key: 'userRole',
          value: response.data.user.role,
        });
      }

      toast.success(response.message || 'Login successful!');

      if (response.data.user.isFirstLogin) {
        navigate('/reset-password');
      } else {
        const userRole = response.data.user.role as UserRole;
        navigateByUserRole(userRole, navigate);
      }

    } catch (error: any) {
      toast.error(error.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-br from-primaryLighter via-white to-primaryLighter flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-primary mb-1">HarvestHub</h1>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">Login</h2>
              <p className="text-sm text-neutral-600">Enter your phone or email to access your account</p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <div className="space-y-4">
                    <InputField
                      id="identifier"
                      name="identifier"
                      type="text"
                      label="Phone or Email"
                      placeholder="Enter your phone number or email"
                      value={values.identifier}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.identifier}
                      touched={touched.identifier}
                      icon={User}
                      required
                    />

                    <InputField
                      id="password"
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.password}
                      touched={touched.password}
                      icon={Lock}
                      showPasswordToggle
                      required
                    />

                    <div className="text-right">
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary font-medium hover:underline transition-colors duration-200"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <div className="mt-6">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        loading={isSubmitting || isLoading}
                        disabled={isSubmitting || isLoading}
                        fullWidth
                      >
                        {isSubmitting || isLoading ? '' : 'Login'}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-600">
                New farmer or buyer?{' '}
                <Link
                  to="/register"
                  className="text-primary font-medium hover:underline transition-colors duration-200"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
