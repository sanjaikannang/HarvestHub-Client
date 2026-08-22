import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { User, Mail, Lock, Phone } from "lucide-react";
import Modal from "../../../../common/ui/Modal";
import Button from "../../../../common/ui/Button";
import InputField from "../../../../common/ui/Input";
import { useCreateDeliveryPartnerMutation } from "../../../../state/services/endpoints/auth";
import { useListDistrictsQuery } from "../../../../state/services/endpoints/district";

interface CreateDeliveryPartnerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormValues {
    name: string;
    phone: string;
    email: string;
    password: string;
    districtsServiced: string[];
    vehicleType: string;
    vehicleNumber: string;
    capacityKg: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").trim(),
    phone: Yup.string().required("Phone number is required").trim(),
    email: Yup.string().email("Please enter a valid email address"),
    password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
    districtsServiced: Yup.array().of(Yup.string()).min(1, "Select at least one district"),
    vehicleType: Yup.string().required("Vehicle type is required").trim(),
    vehicleNumber: Yup.string().required("Vehicle number is required").trim(),
    capacityKg: Yup.number().typeError("Enter a valid number").positive("Must be greater than 0").required("Capacity is required"),
});

const CreateDeliveryPartnerModal = ({ isOpen, onClose }: CreateDeliveryPartnerModalProps) => {
    const [createDeliveryPartner, { isLoading }] = useCreateDeliveryPartnerMutation();
    const { data: districtsData, isLoading: isLoadingDistricts } = useListDistrictsQuery();
    const districts = districtsData?.data ?? [];

    const initialValues: FormValues = {
        name: "", phone: "", email: "", password: "",
        districtsServiced: [], vehicleType: "", vehicleNumber: "", capacityKg: "",
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        try {
            const response = await createDeliveryPartner({
                name: values.name,
                phone: values.phone,
                email: values.email || undefined,
                password: values.password,
                districtsServiced: values.districtsServiced,
                vehicleType: values.vehicleType,
                vehicleNumber: values.vehicleNumber,
                capacityKg: Number(values.capacityKg),
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
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
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
                            <InputField
                                id="vehicleType" name="vehicleType" label="Vehicle Type" placeholder="e.g. mini_truck"
                                value={values.vehicleType} onChange={handleChange} onBlur={handleBlur}
                                error={errors.vehicleType} touched={touched.vehicleType} required
                            />
                            <InputField
                                id="vehicleNumber" name="vehicleNumber" label="Vehicle Number" placeholder="e.g. TN45AB1234"
                                value={values.vehicleNumber} onChange={handleChange} onBlur={handleBlur}
                                error={errors.vehicleNumber} touched={touched.vehicleNumber} required
                            />
                            <InputField
                                id="capacityKg" name="capacityKg" type="number" label="Capacity (kg)" placeholder="e.g. 1500"
                                value={values.capacityKg} onChange={handleChange} onBlur={handleBlur}
                                error={errors.capacityKg} touched={touched.capacityKg} required
                            />

                            <div>
                                <label className="block text-sm font-medium text-textTertiary mb-2">
                                    Districts Serviced<span className="text-red-600 ml-1">*</span>
                                </label>
                                <div className="border border-borderLight p-3 max-h-32 overflow-y-auto space-y-2">
                                    {isLoadingDistricts ? (
                                        <p className="text-sm text-textTertiary">Loading districts...</p>
                                    ) : districts.length === 0 ? (
                                        <p className="text-sm text-textTertiary">No districts available</p>
                                    ) : (
                                        districts.map((d) => (
                                            <label key={d.id} className="flex items-center gap-2 text-sm text-textPrimary cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={values.districtsServiced.includes(d.id)}
                                                    onChange={(e) => {
                                                        const next = e.target.checked
                                                            ? [...values.districtsServiced, d.id]
                                                            : values.districtsServiced.filter((id) => id !== d.id);
                                                        setFieldValue("districtsServiced", next);
                                                    }}
                                                />
                                                {d.name}, {d.state}
                                            </label>
                                        ))
                                    )}
                                </div>
                                {touched.districtsServiced && errors.districtsServiced && (
                                    <p className="text-xs text-red-600 mt-1">{errors.districtsServiced as string}</p>
                                )}
                            </div>

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
