import { useMemo } from "react";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import Chip from "../../../../common/ui/Chip";
import Button from "../../../../common/ui/Button";
import Select from "../../../../common/ui/Select";
import InputField from "../../../../common/ui/Input";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { ProductStatus, CollectionMethod, UnitOfMeasure } from "../../../../utils/enum";
import { useNavigate, useParams } from "react-router-dom";
import { formatEnumLabel, getChipVariant, toEnumOptions } from "../../../../utils/utils";
import { productValidationSchema } from "../formik/product.schema";
import ImageUrlListField from "../../../../common/ui/ImageUrlListField";
import { useListCategoriesQuery } from "../../../../state/services/endpoints/category";
import { useCreateProductMutation, useGetProductQuery, useUpdateProductMutation } from "../../../../state/services/endpoints/product";

// Editable while the listing hasn't moved past this module's own review stage
// (see modules/03-catalog-management/requirement.md) — mirrors the server's
// EDITABLE_STATUSES in src/services/product-service/product.service.ts.
const EDITABLE_STATUSES = [ProductStatus.SUBMITTED, ProductStatus.UNDER_REVIEW, ProductStatus.CHANGES_REQUESTED, ProductStatus.REJECTED];

const collectionMethodOptions = toEnumOptions(CollectionMethod);
const unitOfMeasureOptions = toEnumOptions(UnitOfMeasure);

const pad = (n: number) => String(n).padStart(2, "0");
const toDateInputValue = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toTimeInputValue = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

interface ProductFormValues {
    categoryId: string;
    subcategoryKey: string;
    name: string;
    description: string;
    images: string[];
    estimatedQuantity: number | string;
    unitOfMeasure: UnitOfMeasure;
    startingPrice: number | string;
    biddingDate: string;
    biddingTime: string;
    collectionMethod: CollectionMethod;
}

const ProductFormPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = !!id;

    const { data: productData, isLoading: isLoadingProduct } = useGetProductQuery(id!, { skip: !isEditing });
    const { data: categoriesData } = useListCategoriesQuery();
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const isSaving = isCreating || isUpdating;

    const product = productData?.data;
    const categories = useMemo(() => categoriesData?.data?.filter((c) => c.isActive) ?? [], [categoriesData]);

    const isReadOnly = isEditing && !!product && !EDITABLE_STATUSES.includes(product.status);

    if (isEditing && isLoadingProduct) {
        return (
            <>
                <PageHeader>Product</PageHeader>
                <Container><p className="py-6 text-sm text-textSecondary">Loading...</p></Container>
            </>
        );
    }

    const initialValues: ProductFormValues = product
        ? {
            categoryId: product.categoryId,
            subcategoryKey: product.subcategoryKey,
            name: product.name,
            description: product.description,
            images: product.images,
            estimatedQuantity: product.estimatedQuantity,
            unitOfMeasure: product.unitOfMeasure,
            startingPrice: product.startingPrice,
            biddingDate: toDateInputValue(new Date(product.biddingDate)),
            biddingTime: toTimeInputValue(new Date(product.biddingStartTime)),
            collectionMethod: product.collectionMethod,
        }
        : {
            categoryId: "",
            subcategoryKey: "",
            name: "",
            description: "",
            images: [""],
            estimatedQuantity: "",
            unitOfMeasure: UnitOfMeasure.KG,
            startingPrice: "",
            biddingDate: "",
            biddingTime: "",
            collectionMethod: CollectionMethod.DROP_OFF,
        };

    const handleSubmit = async (values: ProductFormValues, { setSubmitting }: any) => {
        try {
            const biddingStartTime = new Date(`${values.biddingDate}T${values.biddingTime}`);

            const payload = {
                categoryId: values.categoryId,
                subcategoryKey: values.subcategoryKey,
                name: values.name,
                description: values.description,
                images: values.images.filter((url) => url.trim()),
                estimatedQuantity: Number(values.estimatedQuantity),
                unitOfMeasure: values.unitOfMeasure,
                startingPrice: Number(values.startingPrice),
                biddingDate: new Date(values.biddingDate).toISOString(),
                biddingStartTime: biddingStartTime.toISOString(),
                collectionMethod: values.collectionMethod,
            };

            const response = isEditing
                ? await updateProduct({ id: id!, data: payload }).unwrap()
                : await createProduct(payload).unwrap();

            toast.success(response.message || `Product ${isEditing ? "updated" : "submitted"} successfully`);
            navigate("/farmer/products");
        } catch (error: any) {
            toast.error(error.data?.message || `Failed to ${isEditing ? "update" : "submit"} product`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <PageHeader>{isEditing ? "Edit Product" : "Submit a Product"}</PageHeader>
            <Container>
                <div className="py-6 max-w-2xl space-y-4">
                    {product && (
                        <div className="flex items-center gap-2">
                            <Chip label={formatEnumLabel(product.status)} variant={getChipVariant(product.status)} />
                            {isReadOnly && (
                                <span className="text-sm text-textSecondary">
                                    This product has moved past review and can no longer be edited here.
                                </span>
                            )}
                        </div>
                    )}

                    {product?.rejectionReason && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                            <p className="text-xs font-medium text-red-700">Rejection Reason</p>
                            <p className="text-sm text-red-700">{product.rejectionReason}</p>
                        </div>
                    )}

                    {product?.changeRequestNotes && (
                        <div className="p-3 rounded-lg bg-orange-50 border border-orange-100">
                            <p className="text-xs font-medium text-orange-700">Changes Requested</p>
                            <p className="text-sm text-orange-700">{product.changeRequestNotes}</p>
                        </div>
                    )}

                    <Formik
                        initialValues={initialValues}
                        validationSchema={productValidationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => {
                            const selectedCategory = categories.find((c) => c.id === values.categoryId);
                            const subcategoryOptions = (selectedCategory?.subcategories ?? []).map((s) => ({ value: s.key, label: s.name.en }));

                            return (
                                <Form>
                                    <fieldset disabled={isReadOnly} className="space-y-4 disabled:opacity-60">
                                        <InputField
                                            id="name" name="name" label="Product Name" placeholder="e.g. Fresh Farm Tomatoes"
                                            value={values.name} onChange={handleChange} onBlur={handleBlur}
                                            error={errors.name} touched={touched.name} required
                                        />

                                        <div>
                                            <label className="block text-sm font-medium text-textTertiary mb-2">
                                                Description <span className="text-red-600">*</span>
                                            </label>
                                            <textarea
                                                name="description" rows={3} disabled={isReadOnly}
                                                value={values.description} onChange={handleChange} onBlur={handleBlur}
                                                placeholder="Describe your produce — freshness, harvest date, quality, etc."
                                                className={`block w-full px-3 py-2 border rounded-lg focus:outline-none text-textTertiary placeholder-borderLight disabled:bg-borderLight disabled:cursor-not-allowed ${touched.description && errors.description ? "border-red-500" : "border-borderLight"}`}
                                            />
                                            {touched.description && errors.description && (
                                                <p className="text-xs text-red-600 mt-1">{errors.description}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Select
                                                id="categoryId" name="categoryId" label="Category"
                                                options={categories.map((c) => ({ value: c.id, label: c.name.en }))}
                                                value={values.categoryId} disabled={isReadOnly}
                                                onChange={(value) => { setFieldValue("categoryId", value); setFieldValue("subcategoryKey", ""); }}
                                                error={errors.categoryId} touched={!!touched.categoryId} required
                                            />
                                            <Select
                                                id="subcategoryKey" name="subcategoryKey" label="Subcategory"
                                                options={subcategoryOptions} value={values.subcategoryKey}
                                                disabled={isReadOnly || !values.categoryId}
                                                onChange={(value) => setFieldValue("subcategoryKey", value)}
                                                error={errors.subcategoryKey} touched={!!touched.subcategoryKey} required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <InputField
                                                id="estimatedQuantity" name="estimatedQuantity" type="number" label="Estimated Quantity"
                                                value={values.estimatedQuantity} onChange={handleChange} onBlur={handleBlur}
                                                error={errors.estimatedQuantity as string} touched={touched.estimatedQuantity} required
                                            />
                                            <Select
                                                id="unitOfMeasure" name="unitOfMeasure" label="Unit of Measure"
                                                options={unitOfMeasureOptions} value={values.unitOfMeasure} disabled={isReadOnly}
                                                onChange={(value) => setFieldValue("unitOfMeasure", value)}
                                                error={errors.unitOfMeasure} touched={!!touched.unitOfMeasure} required
                                            />
                                        </div>

                                        <InputField
                                            id="startingPrice" name="startingPrice" type="number" label="Starting Price (per unit)"
                                            value={values.startingPrice} onChange={handleChange} onBlur={handleBlur}
                                            error={errors.startingPrice as string} touched={touched.startingPrice} required
                                        />

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <InputField
                                                id="biddingDate" name="biddingDate" type="date" label="Bidding Date"
                                                value={values.biddingDate} onChange={handleChange} onBlur={handleBlur}
                                                error={errors.biddingDate} touched={touched.biddingDate} required
                                            />
                                            <InputField
                                                id="biddingTime" name="biddingTime" type="time" label="Bidding Start Time"
                                                value={values.biddingTime} onChange={handleChange} onBlur={handleBlur}
                                                error={errors.biddingTime} touched={touched.biddingTime} required
                                            />
                                        </div>
                                        <p className="text-xs text-textTertiary -mt-2">Bidding automatically closes 30 minutes after the start time.</p>

                                        <Select
                                            id="collectionMethod" name="collectionMethod" label="Collection Method"
                                            options={collectionMethodOptions} value={values.collectionMethod} disabled={isReadOnly}
                                            onChange={(value) => setFieldValue("collectionMethod", value)}
                                            error={errors.collectionMethod} touched={!!touched.collectionMethod} required
                                        />

                                        <ImageUrlListField
                                            images={values.images}
                                            onChange={(images) => setFieldValue("images", images)}
                                            error={typeof errors.images === "string" ? errors.images : undefined}
                                            touched={!!touched.images}
                                        />
                                    </fieldset>

                                    {!isReadOnly && (
                                        <div className="flex justify-end gap-3 pt-4">
                                            <Button type="button" variant="outline" size="sm" onClick={() => navigate("/farmer/products")}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="primary" size="sm" loading={isSubmitting || isSaving} disabled={isSubmitting || isSaving}>
                                                {isSubmitting || isSaving ? "" : isEditing ? "Save Changes" : "Submit Product"}
                                            </Button>
                                        </div>
                                    )}
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </Container>
        </>
    );
};

export default ProductFormPage;
