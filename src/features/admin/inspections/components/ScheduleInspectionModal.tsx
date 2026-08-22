import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Modal from "../../../../common/ui/Modal";
import Button from "../../../../common/ui/Button";
import Select from "../../../../common/ui/Select";
import InputField from "../../../../common/ui/Input";
import { CollectionMethod } from "../../../../utils/enum";
import { toEnumOptions } from "../../../../utils/utils";
import type { Product } from "../../../../types/catalog-types";
import { useListInspectorsQuery } from "../../../../state/services/endpoints/auth";
import { useScheduleInspectionMutation } from "../../../../state/services/endpoints/inspection";

interface ScheduleInspectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

interface FormValues {
    inspectorId: string;
    collectionMethod: CollectionMethod;
    scheduledDate: string;
    scheduledSlot: string;
}

const collectionMethodOptions = toEnumOptions(CollectionMethod);

const validationSchema = Yup.object({
    inspectorId: Yup.string().required("Select an inspector"),
    collectionMethod: Yup.string().oneOf(Object.values(CollectionMethod)).required("Collection method is required"),
    scheduledDate: Yup.string().required("Scheduled date is required"),
    scheduledSlot: Yup.string().required("Scheduled slot is required").trim(),
});

const ScheduleInspectionModal = ({ isOpen, onClose, product }: ScheduleInspectionModalProps) => {
    const { data: inspectorsData, isLoading: isLoadingInspectors } = useListInspectorsQuery({ districtId: product.districtId });
    const [scheduleInspection, { isLoading: isScheduling }] = useScheduleInspectionMutation();

    const inspectorOptions = (inspectorsData?.data ?? []).map((i) => ({ value: i.id, label: `${i.name} (${i.phone})` }));

    const initialValues: FormValues = {
        inspectorId: "",
        collectionMethod: product.collectionMethod,
        scheduledDate: "",
        scheduledSlot: "",
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        try {
            const response = await scheduleInspection({
                productId: product.id,
                inspectorId: values.inspectorId,
                collectionMethod: values.collectionMethod,
                scheduledDate: new Date(values.scheduledDate).toISOString(),
                scheduledSlot: values.scheduledSlot,
            }).unwrap();

            toast.success(response.message || "Inspection scheduled successfully");
            onClose();
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to schedule inspection");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Schedule Inspection — ${product.name}`} size="md">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="space-y-4">
                            <Select
                                id="inspectorId" name="inspectorId" label="Inspector"
                                options={inspectorOptions} value={values.inspectorId} loading={isLoadingInspectors}
                                onChange={(value) => setFieldValue("inspectorId", value)}
                                error={errors.inspectorId} touched={!!touched.inspectorId} required
                                placeholder={inspectorOptions.length ? "Select an inspector" : "No inspectors in this district yet"}
                            />

                            <Select
                                id="collectionMethod" name="collectionMethod" label="Collection Method"
                                options={collectionMethodOptions} value={values.collectionMethod}
                                onChange={(value) => setFieldValue("collectionMethod", value)}
                                error={errors.collectionMethod} touched={!!touched.collectionMethod} required
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField
                                    id="scheduledDate" name="scheduledDate" type="date" label="Scheduled Date"
                                    value={values.scheduledDate} onChange={handleChange} onBlur={handleBlur}
                                    error={errors.scheduledDate} touched={touched.scheduledDate} required
                                />
                                <InputField
                                    id="scheduledSlot" name="scheduledSlot" label="Scheduled Slot" placeholder="e.g. 10:00-11:00"
                                    value={values.scheduledSlot} onChange={handleChange} onBlur={handleBlur}
                                    error={errors.scheduledSlot} touched={touched.scheduledSlot} required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" size="sm" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm" loading={isSubmitting || isScheduling} disabled={isSubmitting || isScheduling}>
                                    {isSubmitting || isScheduling ? "" : "Schedule Inspection"}
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default ScheduleInspectionModal;
