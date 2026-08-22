import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import Modal from "../../../../common/ui/Modal";
import Button from "../../../../common/ui/Button";
import Select from "../../../../common/ui/Select";
import InputField from "../../../../common/ui/Input";
import type { CollectionCenter, CreateCollectionCenterRequest } from "../../../../types/district-types";
import { collectionCenterValidationSchema } from "../formik/collection-center.schema";
import { useListDistrictsQuery } from "../../../../state/services/endpoints/district";
import { useCreateCollectionCenterMutation, useUpdateCollectionCenterMutation } from "../../../../state/services/endpoints/collection-center";

interface CollectionCenterFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionCenter?: CollectionCenter;
}

const CollectionCenterFormModal = ({ isOpen, onClose, collectionCenter }: CollectionCenterFormModalProps) => {
    const isEditing = !!collectionCenter;
    const { data: districtsData, isLoading: isLoadingDistricts } = useListDistrictsQuery();
    const [createCollectionCenter, { isLoading: isCreating }] = useCreateCollectionCenterMutation();
    const [updateCollectionCenter, { isLoading: isUpdating }] = useUpdateCollectionCenterMutation();
    const isSaving = isCreating || isUpdating;

    const districtOptions = (districtsData?.data ?? [])
        .filter((district) => district.isActive)
        .map((district) => ({ value: district.id, label: `${district.name}, ${district.state}` }));

    const initialValues: CreateCollectionCenterRequest = collectionCenter
        ? {
            districtId: collectionCenter.districtId,
            name: collectionCenter.name,
            address: collectionCenter.address,
            contactPhone: collectionCenter.contactPhone,
            capacityKg: collectionCenter.capacityKg,
        }
        : {
            districtId: "",
            name: "",
            address: { line1: "", city: "", state: "", pincode: "" },
            contactPhone: "",
            capacityKg: undefined,
        };

    const handleSubmit = async (values: CreateCollectionCenterRequest, { setSubmitting }: any) => {
        try {
            const response = isEditing
                ? await updateCollectionCenter({
                    id: collectionCenter!.id,
                    data: {
                        name: values.name,
                        address: values.address,
                        contactPhone: values.contactPhone,
                        capacityKg: values.capacityKg,
                    },
                }).unwrap()
                : await createCollectionCenter(values).unwrap();

            toast.success(response.message || `Collection center ${isEditing ? "updated" : "created"} successfully`);
            onClose();
        } catch (error: any) {
            toast.error(error.data?.message || `Failed to ${isEditing ? "update" : "create"} collection center`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Collection Center" : "New Collection Center"} size="lg">
            <Formik
                initialValues={initialValues}
                validationSchema={collectionCenterValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="space-y-4">
                            <Select
                                id="districtId" name="districtId" label="District"
                                options={districtOptions} value={values.districtId} loading={isLoadingDistricts}
                                onChange={(value) => setFieldValue("districtId", value)}
                                error={errors.districtId as string} touched={!!touched.districtId}
                                disabled={isEditing} required
                            />

                            <InputField
                                id="name" name="name" label="Name" placeholder="e.g. Chennai Collection Center"
                                value={values.name} onChange={handleChange} onBlur={handleBlur}
                                error={errors.name as string} touched={!!touched.name} required
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField
                                    id="address.line1" name="address.line1" label="Address Line" placeholder="e.g. Main Market Road"
                                    value={values.address.line1} onChange={handleChange} onBlur={handleBlur}
                                    error={(errors.address as any)?.line1} touched={!!(touched.address as any)?.line1} required
                                />
                                <InputField
                                    id="address.city" name="address.city" label="City" placeholder="e.g. Chennai"
                                    value={values.address.city} onChange={handleChange} onBlur={handleBlur}
                                    error={(errors.address as any)?.city} touched={!!(touched.address as any)?.city} required
                                />
                                <InputField
                                    id="address.state" name="address.state" label="State" placeholder="e.g. Tamil Nadu"
                                    value={values.address.state} onChange={handleChange} onBlur={handleBlur}
                                    error={(errors.address as any)?.state} touched={!!(touched.address as any)?.state} required
                                />
                                <InputField
                                    id="address.pincode" name="address.pincode" label="Pincode" placeholder="e.g. 600001"
                                    value={values.address.pincode} onChange={handleChange} onBlur={handleBlur}
                                    error={(errors.address as any)?.pincode} touched={!!(touched.address as any)?.pincode} required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField
                                    id="contactPhone" name="contactPhone" label="Contact Phone" type="tel" placeholder="+91XXXXXXXXXX"
                                    value={values.contactPhone} onChange={handleChange} onBlur={handleBlur}
                                    error={errors.contactPhone as string} touched={!!touched.contactPhone} required
                                />
                                <InputField
                                    id="capacityKg" name="capacityKg" label="Capacity (kg)" type="number" placeholder="e.g. 5000"
                                    value={values.capacityKg ?? ""} onChange={handleChange} onBlur={handleBlur}
                                    error={errors.capacityKg as string} touched={!!touched.capacityKg}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" size="sm" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm" loading={isSubmitting || isSaving} disabled={isSubmitting || isSaving}>
                                    {isSubmitting || isSaving ? "" : isEditing ? "Save Changes" : "Create Collection Center"}
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default CollectionCenterFormModal;
