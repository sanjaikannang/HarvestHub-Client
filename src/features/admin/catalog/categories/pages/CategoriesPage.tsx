import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Modal from "../../../../../common/ui/Modal";
import Button from "../../../../../common/ui/Button";
import Chip from "../../../../../common/ui/Chip";
import { Container } from "../../../../../common/ui/Container";
import { PageHeader } from "../../../../../common/ui/PageHeader";
import { Table, type ColumnDef } from "../../../../../common/ui/Table";
import RowActions from "../../../../../common/ui/RowActions";
import { formatEnumLabel } from "../../../../../utils/utils";
import type { Category } from "../../../../../types/catalog-types";
import CategoryFormModal from "../components/CategoryFormModal";
import { useDeactivateCategoryMutation, useListCategoriesQuery } from "../../../../../state/services/endpoints/category";

const CategoriesPage = () => {
    const { data, isLoading } = useListCategoriesQuery();
    const [deactivateCategory, { isLoading: isDeactivating }] = useDeactivateCategoryMutation();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
    const [deactivatingCategory, setDeactivatingCategory] = useState<Category | undefined>(undefined);

    const categories = useMemo(() => data?.data ?? [], [data]);

    const openCreateForm = () => {
        setEditingCategory(undefined);
        setIsFormOpen(true);
    };

    const openEditForm = (row: Category) => {
        setEditingCategory(row);
        setIsFormOpen(true);
    };

    const handleDeactivate = async () => {
        if (!deactivatingCategory) return;
        try {
            const response = await deactivateCategory(deactivatingCategory.id).unwrap();
            toast.success(response.message || "Category deactivated successfully");
            setDeactivatingCategory(undefined);
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to deactivate category");
        }
    };

    const columns: ColumnDef<Category, unknown>[] = [
        { header: "Name (English)", cell: ({ row }) => row.original.name.en },
        { header: "Name (Tamil)", cell: ({ row }) => row.original.name.ta },
        { header: "Perishability", cell: ({ row }) => formatEnumLabel(row.original.perishabilityTier) },
        { header: "Default Unit", cell: ({ row }) => row.original.defaultUnitOfMeasure.toUpperCase() },
        { header: "Subcategories", cell: ({ row }) => row.original.subcategories.length },
        {
            header: "Status",
            cell: ({ row }) => (
                <Chip label={row.original.isActive ? "Active" : "Inactive"} variant={row.original.isActive ? "green" : "gray"} />
            ),
        },
        {
            header: "Actions",
            width: "110px",
            cell: ({ row }) => (
                <RowActions
                    onEdit={() => openEditForm(row.original)}
                    onDelete={row.original.isActive ? () => setDeactivatingCategory(row.original) : undefined}
                />
            ),
        },
    ];

    return (
        <>
            <PageHeader>
                <div className="flex items-center justify-between">
                    <span>Categories</span>
                    <Button variant="primary" size="sm" icon={Plus} onClick={openCreateForm}>
                        New Category
                    </Button>
                </div>
            </PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="All Categories"
                        columns={columns}
                        data={categories}
                        isLoading={isLoading}
                        totalCount={categories.length}
                        pageNumber={1}
                        pageLimit={Math.max(categories.length, 1)}
                        totalPages={1}
                        onPageChange={() => { }}
                        onPageSizeChange={() => { }}
                    />
                </div>
            </Container>

            {isFormOpen && (
                <CategoryFormModal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    category={editingCategory}
                />
            )}

            <Modal
                isOpen={!!deactivatingCategory}
                onClose={() => setDeactivatingCategory(undefined)}
                title="Deactivate Category"
                size="sm"
            >
                <div className="space-y-6">
                    <p className="text-sm text-textSecondary">
                        Deactivate <span className="font-medium text-textPrimary">{deactivatingCategory?.name.en}</span>?
                        Farmers will no longer be able to submit new products under this category.
                    </p>
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" size="sm" onClick={() => setDeactivatingCategory(undefined)}>
                            Cancel
                        </Button>
                        <Button variant="danger" size="sm" loading={isDeactivating} disabled={isDeactivating} onClick={handleDeactivate}>
                            {isDeactivating ? "" : "Deactivate"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CategoriesPage;
