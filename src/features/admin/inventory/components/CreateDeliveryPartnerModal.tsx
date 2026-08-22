import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { User, Mail, Lock, Phone } from "lucide-react";
import Modal from "../../../../common/ui/Modal";
import Button from "../../../../common/ui/Button";
import InputField from "../../../../common/ui/Input";
import { useCreateDeliveryPartnerMutation } from "../../../../state/services/endpoints/auth";

interface CreateDeliveryPartnerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormValues {
    name: string;
    phone: string;
    email: string;
    password: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").trim(),
    phone: Yup.string().required("Phone number is required").trim(),
    email: Yup.string().email("Please enter a valid email address"),
    password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
});

const CreateDeliveryPartnerModal = ({ isOpen, onClose }: CreateDeliveryPartnerModalProps) => {
    const [createDeliveryPartner, { isLoading }] = useCreateDeliveryPartnerMutation();

    const initialValues: FormValues = { name: "", phone: "", email: "", password: "" };

    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        try {
            const response = await createDeliveryPartner({
                name: values.name,
                phone: values.phone,
                email: values.email || undefined,
                password: values.password,
            }).unwrap();

            toast.success(response.message || "Delivery partner created successfully");
            onClose();
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to create delivery partner");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Delivery Partner" size="sm">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                    <Form>
                        <div className="space-y-4">
                            <InputField
                                id="name" name="name" label="Full Name" placeholder="Enter full name" icon={User}
                                value={values.name} onChange={handleChange} onBlur={handleBlur}
                                error={errors.name} touched={touched.name} required
                            />
                            <InputField
                                id="phone" name="phone" type="tel" label="Phone Number" placeholder="+91XXXXXXXXXX" icon={Phone}
                                value={values.phone} onChange={handleChange} onBlur={handleBlur}
                                error={errors.phone} touched={touched.phone} required
                            />
                            <InputField
                                id="email" name="email" type="email" label="Email (optional)" placeholder="Enter email" icon={Mail}
                                value={values.email} onChange={handleChange} onBlur={handleBlur}
                                error={errors.email} touched={touched.email}
                            />
                            <InputField
                                id="password" name="password" type="password" label="Initial Password" placeholder="Set an initial password" icon={Lock}
                                value={values.password} onChange={handleChange} onBlur={handleBlur}
                                error={errors.password} touched={touched.password} showPasswordToggle required
                            />

                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" size="sm" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm" loading={isSubmitting || isLoading} disabled={isSubmitting || isLoading}>
                                    {isSubmitting || isLoading ? "" : "Create Account"}
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default CreateDeliveryPartnerModal;
