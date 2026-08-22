import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Chip from "../../../../../common/ui/Chip";
import Select from "../../../../../common/ui/Select";
import Button from "../../../../../common/ui/Button";
import { Container } from "../../../../../common/ui/Container";
import { PageHeader } from "../../../../../common/ui/PageHeader";
import { Table, type ColumnDef } from "../../../../../common/ui/Table";
import { formatDate } from "../../../../../utils/date";
import { ProductStatus } from "../../../../../utils/enum";
import ReviewActionModal from "../components/ReviewActionModal";
import ProductDetailModal from "../components/ProductDetailModal";
import type { Product } from "../../../../../types/catalog-types";
import { formatEnumLabel, getChipVariant } from "../../../../../utils/utils";
import { useListCategoriesQuery } from "../../../../../state/services/endpoints/category";
import { useListProductsForReviewQuery, useStartReviewMutation } from "../../../../../state/services/endpoints/product";
import ScheduleInspectionModal from "../../../inspections/components/ScheduleInspectionModal";

// Only the statuses this module can actually put a product into — the rest
// of the lifecycle (inspection_scheduled onward) belongs to modules 04/06.
const STATUS_FILTER_OPTIONS = [
    { value: "", label: "All" },
    { value: ProductStatus.SUBMITTED, label: "Submitted" },
    { value: ProductStatus.UNDER_REVIEW, label: "Under Review" },
    { value: ProductStatus.CHANGES_REQUESTED, label: "Changes Requested" },
    { value: ProductStatus.REJECTED, label: "Rejected" },
];

const REVIEWABLE_STATUSES = [ProductStatus.SUBMITTED, ProductStatus.UNDER_REVIEW];

const ProductsReviewPage = () => {
    const [statusFilter, setStatusFilter] = useState<ProductStatus | "">("");
    const [viewingProduct, setViewingProduct] = useState<Product | undefined>(undefined);
    const [reviewAction, setReviewAction] = useState<{ productId: string; mode: "request-changes" | "reject" } | undefined>(undefined);
    const [schedulingFor, setSchedulingFor] = useState<Product | undefined>(undefined);

    const { data, isLoading } = useListProductsForReviewQuery(statusFilter ? { status: statusFilter } : undefined);
    const { data: categoriesData } = useListCategoriesQuery();
    const [startReview, { isLoading: isStartingReview }] = useStartReviewMutation();

    const products = useMemo(() => data?.data ?? [], [data]);
    const categoryById = useMemo(() => {
        const map = new Map(categoriesData?.data?.map((c) => [c.id, c]));
        return map;
    }, [categoriesData]);

    const handleStartReview = async (product: Product) => {
        try {
            const response = await startReview(product.id).unwrap();
            toast.success(response.message || "Product moved to review");
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to start review");
        }
    };

    const columns: ColumnDef<Product, unknown>[] = [
        { header: "Product", cell: ({ row }) => row.original.name },
        { header: "Category", cell: ({ row }) => categoryById.get(row.original.categoryId)?.name.en || "-" },
        { header: "Qty (Est.)", cell: ({ row }) => `${row.original.estimatedQuantity} ${row.original.unitOfMeasure}` },
        { header: "Bidding Date", cell: ({ row }) => formatDate(row.original.biddingDate) },
        {
            header: "Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.status)} variant={getChipVariant(row.original.status)} />,
        },
        {
            header: "Actions",
            width: "380px",
            cell: ({ row }) => {
                const product = row.original;
                const canReview = REVIEWABLE_STATUSES.includes(product.status);
                return (
                    <div className="flex items-center gap-2">
                        {product.status === ProductStatus.SUBMITTED && (
                            <Button
                                variant="outline" size="sm"
                                loading={isStartingReview}
                                onClick={(e) => { e.stopPropagation(); handleStartReview(product); }}
                            >
                                Start Review
                            </Button>
                        )}
                        <Button
                            variant="outline" size="sm"
                            disabled={!canReview}
                            onClick={(e) => { e.stopPropagation(); setSchedulingFor(product); }}
                        >
                            Schedule Inspection
                        </Button>
                        <Button
                            variant="outline" size="sm"
                            disabled={!canReview}
                            onClick={(e) => { e.stopPropagation(); setReviewAction({ productId: product.id, mode: "request-changes" }); }}
                        >
                            Request Changes
                        </Button>
                        <Button
                            variant="danger" size="sm"
                            disabled={!canReview}
                            onClick={(e) => { e.stopPropagation(); setReviewAction({ productId: product.id, mode: "reject" }); }}
                        >
                            Reject
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <PageHeader>Product Review Queue</PageHeader>

            <Container>
                <div className="py-6 space-y-4">
                    <div className="max-w-xs">
                        <Select
                            id="statusFilter" name="statusFilter" label="Filter by Status"
                            options={STATUS_FILTER_OPTIONS} value={statusFilter}
                            onChange={(value) => setStatusFilter(value as ProductStatus | "")}
                        />
                    </div>

                    <Table
                        tableTitle="Products"
                        columns={columns}
                        data={products}
                        isLoading={isLoading}
                        onRowClick={(row) => setViewingProduct(row)}
                        totalCount={products.length}
                        pageNumber={1}
                        pageLimit={Math.max(products.length, 1)}
                        totalPages={1}
                        onPageChange={() => { }}
                        onPageSizeChange={() => { }}
                    />
                </div>
            </Container>

            <ProductDetailModal
                isOpen={!!viewingProduct}
                onClose={() => setViewingProduct(undefined)}
                product={viewingProduct}
                category={viewingProduct ? categoryById.get(viewingProduct.categoryId) : undefined}
            />

            {reviewAction && (
                <ReviewActionModal
                    isOpen={!!reviewAction}
                    onClose={() => setReviewAction(undefined)}
                    productId={reviewAction.productId}
                    mode={reviewAction.mode}
                />
            )}

            {schedulingFor && (
                <ScheduleInspectionModal
                    isOpen={!!schedulingFor}
                    onClose={() => setSchedulingFor(undefined)}
                    product={schedulingFor}
                />
            )}
        </>
    );
};

export default ProductsReviewPage;
