import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../../common/ui/Modal";
import Button from "../../../../common/ui/Button";
import Select from "../../../../common/ui/Select";
import InputField from "../../../../common/ui/Input";
import ImageUrlListField from "../../../../common/ui/ImageUrlListField";
import { RecommendedVerdict } from "../../../../utils/enum";
import { toEnumOptions } from "../../../../utils/utils";
import type { Inspection } from "../../../../types/inspection-types";
import { useRecordFindingsMutation } from "../../../../state/services/endpoints/inspection";

interface RecordFindingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    inspection: Inspection;
}

interface FormValues {
    verifiedQuantity: number | string;
    qualityGrade: string;
    conditionNotes: string;
    inspectionPhotos: string[];
    recommendedVerdict: RecommendedVerdict;
}

const recommendedVerdictOptions = toEnumOptions(RecommendedVerdict);

const validationSchema = Yup.object({
    verifiedQuantity: Yup.number().typeError("Enter a number").min(0, "Cannot be negative").required("Verified quantity is required"),
    qualityGrade: Yup.string().required("Quality grade is required").trim(),
    conditionNotes: Yup.string(),
    recommendedVerdict: Yup.string().oneOf(Object.values(RecommendedVerdict)).required("A recommendation is required"),
});

const RecordFindingsModal = ({ isOpen, onClose, inspection }: RecordFindingsModalProps) => {
    const [recordFindings, { isLoading }] = useRecordFindingsMutation();

    const initialValues: FormValues = {
        verifiedQuantity: "",
        qualityGrade: "",
        conditionNotes: "",
        inspectionPhotos: [""],
        recommendedVerdict: RecommendedVerdict.APPROVE,
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        try {
            const response = await recordFindings({
                id: inspection.id,
                data: {
                    verifiedQuantity: Number(values.verifiedQuantity),
                    qualityGrade: values.qualityGrade,
                    conditionNotes: values.conditionNotes || undefined,
                    inspectionPhotos: values.inspectionPhotos.filter((url) => url.trim()),
                    recommendedVerdict: values.recommendedVerdict,
                },
            }).unwrap();

            toast.success(response.message || "Findings recorded successfully");
            onClose();
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to record findings");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Record Inspection Findings" size="lg">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField
                                    id="verifiedQuantity" name="verifiedQuantity" type="number" label="Verified Quantity"
                                    value={values.verifiedQuantity} onChange={handleChange} onBlur={handleBlur}
                                    error={errors.verifiedQuantity as string} touched={touched.verifiedQuantity} required
                                />
                                <InputField
                                    id="qualityGrade" name="qualityGrade" label="Quality Grade" placeholder="e.g. A"
                                    value={values.qualityGrade} onChange={handleChange} onBlur={handleBlur}
                                    error={errors.qualityGrade} touched={touched.qualityGrade} required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-textTertiary mb-2">Condition Notes</label>
                                <textarea
                                    name="conditionNotes" rows={3}
                                    value={values.conditionNotes} onChange={handleChange} onBlur={handleBlur}
                                    placeholder="Freshness, sorting needed, damage, etc."
                                    className="block w-full px-3 py-2 border border-borderLight rounded-lg focus:outline-none text-textTertiary placeholder-borderLight"
                                />
                            </div>

                            <ImageUrlListField
                                images={values.inspectionPhotos}
                                onChange={(images) => setFieldValue("inspectionPhotos", images)}
                                label="Inspection Photos"
                                required={false}
                                addButtonLabel="Add Photo URL"
                            />

                            <Select
                                id="recommendedVerdict" name="recommendedVerdict" label="Your Recommendation"
                                options={recommendedVerdictOptions} value={values.recommendedVerdict}
                                onChange={(value) => setFieldValue("recommendedVerdict", value)}
                                error={errors.recommendedVerdict} touched={!!touched.recommendedVerdict} required
                            />

                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" size="sm" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm" loading={isSubmitting || isLoading} disabled={isSubmitting || isLoading}>
                                    {isSubmitting || isLoading ? "" : "Submit Findings"}
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default RecordFindingsModal;
