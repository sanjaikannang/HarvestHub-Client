import toast from "react-hot-toast";
import { useState } from "react";
import { Formik, Form } from 'formik';
import { User, Mail, Lock, Phone } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import Button from "../../../../common/ui/Button";
import { UserRole } from "../../../../utils/enum";
import InputField from "../../../../common/ui/Input";
import { registerValidationSchema } from "../formik/register.schema";
import { useRegisterMutation } from "../../../../state/services/endpoints/auth";

interface RegisterFormValues {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [role, setRole] = useState<UserRole.FARMER | UserRole.BUYER>(UserRole.FARMER);

  const initialValues: RegisterFormValues = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: any
  ) => {
    try {
      const response = await register({
        name: values.name,
        phone: values.phone,
        email: values.email || undefined,
        password: values.password,
        role,
      }).unwrap();

      toast.success(response.message || 'Registration successful!');
      navigate('/login');

    } catch (error: any) {
      toast.error(error.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primaryLighter via-white to-primaryLighter flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 lg:p-10">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-primary mb-1">HarvestHub</h1>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Create an account</h2>
            <p className="text-sm text-neutral-600">Only farmers and buyers can self-register</p>
          </div>

          <div className="flex rounded-lg border border-borderLight overflow-hidden mb-6">
            <button
              type="button"
              onClick={() => setRole(UserRole.FARMER)}
              className={`flex-1 py-2 text-sm font-medium cursor-pointer transition-colors ${role === UserRole.FARMER ? 'bg-primary text-whiteColor' : 'bg-whiteColor text-textSecondary'}`}
            >
              I'm a Farmer
            </button>
            <button
              type="button"
              onClick={() => setRole(UserRole.BUYER)}
              className={`flex-1 py-2 text-sm font-medium cursor-pointer transition-colors ${role === UserRole.BUYER ? 'bg-primary text-whiteColor' : 'bg-whiteColor text-textSecondary'}`}
            >
              I'm a Buyer
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <div className="space-y-4">
                  <InputField
                    id="name" name="name" type="text" label="Full Name" placeholder="Enter your full name"
                    value={values.name} onChange={handleChange} onBlur={handleBlur}
                    error={errors.name} touched={touched.name} icon={User} required
                  />
                  <InputField
                    id="phone" name="phone" type="tel" label="Phone Number" placeholder="+91XXXXXXXXXX"
                    value={values.phone} onChange={handleChange} onBlur={handleBlur}
                    error={errors.phone} touched={touched.phone} icon={Phone} required
                  />
                  <InputField
                    id="email" name="email" type="email" label="Email (optional)" placeholder="Enter your email"
                    value={values.email} onChange={handleChange} onBlur={handleBlur}
                    error={errors.email} touched={touched.email} icon={Mail}
                  />
                  <InputField
                    id="password" name="password" type="password" label="Password" placeholder="Create a password"
                    value={values.password} onChange={handleChange} onBlur={handleBlur}
                    error={errors.password} touched={touched.password} icon={Lock} showPasswordToggle required
                  />
                  <InputField
                    id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" placeholder="Re-enter your password"
                    value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                    error={errors.confirmPassword} touched={touched.confirmPassword} icon={Lock} showPasswordToggle required
                  />

                  <div className="mt-6">
                    <Button
                      type="submit" variant="primary" size="md"
                      loading={isSubmitting || isLoading} disabled={isSubmitting || isLoading} fullWidth
                    >
                      {isSubmitting || isLoading ? '' : 'Create account'}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
