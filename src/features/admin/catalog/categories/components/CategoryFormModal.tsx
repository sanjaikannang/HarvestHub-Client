import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { Formik, Form, FieldArray } from "formik";
import Modal from "../../../../../common/ui/Modal";
import Button from "../../../../../common/ui/Button";
import Select from "../../../../../common/ui/Select";
import InputField from "../../../../../common/ui/Input";
import { toEnumOptions } from "../../../../../utils/utils";
import { categoryValidationSchema } from "../formik/category.schema";
import { PerishabilityTier, UnitOfMeasure } from "../../../../../utils/enum";
import type { Category, CreateCategoryRequest } from "../../../../../types/catalog-types";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "../../../../../state/services/endpoints/category";

interface CategoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: Category;
}

const perishabilityOptions = toEnumOptions(PerishabilityTier);
const unitOfMeasureOptions = toEnumOptions(UnitOfMeasure);

const emptySubcategory = { key: "", name: { en: "", ta: "" } };

const CategoryFormModal = ({ isOpen, onClose, category }: CategoryFormModalProps) => {
    const isEditing = !!category;
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const isSaving = isCreating || isUpdating;

    const initialValues: CreateCategoryRequest = category
        ? {
            name: category.name,
            perishabilityTier: category.perishabilityTier,
            defaultUnitOfMeasure: category.defaultUnitOfMeasure,
            subcategories: category.subcategories,
        }
        : {
            name: { en: "", ta: "" },
            perishabilityTier: PerishabilityTier.PERISHABLE,
            defaultUnitOfMeasure: UnitOfMeasure.KG,
            subcategories: [emptySubcategory],
        };

    const handleSubmit = async (values: CreateCategoryRequest, { setSubmitting }: any) => {
        try {
            const response = isEditing
                ? await updateCategory({ id: category!.id, data: values }).unwrap()
                : await createCategory(values).unwrap();

            toast.success(response.message || `Category ${isEditing ? "updated" : "created"} successfully`);
            onClose();
        } catch (error: any) {
            toast.error(error.data?.message || `Failed to ${isEditing ? "update" : "create"} category`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Category" : "New Category"} size="lg">
            <Formik
                initialValues={initialValues}
                validationSchema={categoryValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField
                                    id="name.en" name="name.en" label="Name (English)" placeholder="e.g. Vegetables"
                                    value={values.name.en} onChange={handleChange} onBlur={handleBlur}
                                    error={(errors.name as any)?.en} touched={(touched.name as any)?.en} required
                                />
                                <InputField
                                    id="name.ta" name="name.ta" label="Name (Tamil)" placeholder="e.g. காய்கறிகள்"
                                    value={values.name.ta} onChange={handleChange} onBlur={handleBlur}
                                    error={(errors.name as any)?.ta} touched={(touched.name as any)?.ta} required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Select
                                    id="perishabilityTier" name="perishabilityTier" label="Perishability Tier"
                                    options={perishabilityOptions} value={values.perishabilityTier}
                                    onChange={(value) => setFieldValue("perishabilityTier", value)}
                                    error={errors.perishabilityTier as string} touched={!!touched.perishabilityTier} required
                                />
                                <Select
                                    id="defaultUnitOfMeasure" name="defaultUnitOfMeasure" label="Default Unit of Measure"
                                    options={unitOfMeasureOptions} value={values.defaultUnitOfMeasure}
                                    onChange={(value) => setFieldValue("defaultUnitOfMeasure", value)}
                                    error={errors.defaultUnitOfMeasure as string} touched={!!touched.defaultUnitOfMeasure} required
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-textTertiary">
                                        Subcategories <span className="text-red-600">*</span>
                                    </label>
                                </div>

                                <FieldArray name="subcategories">
                                    {({ push, remove }) => (
                                        <div className="space-y-3">
                                            {values.subcategories.map((subcategory, index) => (
                                                <div key={index} className="flex items-start gap-2 p-3 border border-borderLight">
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                                                        <InputField
                                                            id={`subcategories.${index}.key`} name={`subcategories.${index}.key`}
                                                            placeholder="key (e.g. tomato)" value={subcategory.key}
                                                            onChange={handleChange} onBlur={handleBlur}
                                                            error={(errors.subcategories?.[index] as any)?.key}
                                                            touched={!!(touched.subcategories?.[index] as any)?.key}
                                                        />
                                                        <InputField
                                                            id={`subcategories.${index}.name.en`} name={`subcategories.${index}.name.en`}
                                                            placeholder="Name (English)" value={subcategory.name.en}
                                                            onChange={handleChange} onBlur={handleBlur}
                                                            error={(errors.subcategories?.[index] as any)?.name?.en}
                                                            touched={!!(touched.subcategories?.[index] as any)?.name?.en}
                                                        />
                                                        <InputField
                                                            id={`subcategories.${index}.name.ta`} name={`subcategories.${index}.name.ta`}
                                                            placeholder="Name (Tamil)" value={subcategory.name.ta}
                                                            onChange={handleChange} onBlur={handleBlur}
                                                            error={(errors.subcategories?.[index] as any)?.name?.ta}
                                                            touched={!!(touched.subcategories?.[index] as any)?.name?.ta}
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        title="Remove subcategory"
                                                        onClick={() => remove(index)}
                                                        disabled={values.subcategories.length === 1}
                                                        className="p-2 mt-0.5 hover:bg-bgSecondary text-red-600 hover:text-red-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}

                                            {typeof errors.subcategories === "string" && (
                                                <p className="text-xs text-red-600">{errors.subcategories}</p>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() => push({ ...emptySubcategory })}
                                                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline cursor-pointer"
                                            >
                                                <Plus className="h-4 w-4" /> Add Subcategory
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" size="sm" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm" loading={isSubmitting || isSaving} disabled={isSubmitting || isSaving}>
                                    {isSubmitting || isSaving ? "" : isEditing ? "Save Changes" : "Create Category"}
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default CategoryFormModal;
