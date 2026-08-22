import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Modal from "../../../../common/ui/Modal";
import Button from "../../../../common/ui/Button";
import Chip from "../../../../common/ui/Chip";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import RowActions from "../../../../common/ui/RowActions";
import type { CollectionCenter } from "../../../../types/district-types";
import CollectionCenterFormModal from "../components/CollectionCenterFormModal";
import { useListDistrictsQuery } from "../../../../state/services/endpoints/district";
import { useListCollectionCentersQuery, useUpdateCollectionCenterMutation } from "../../../../state/services/endpoints/collection-center";

const CollectionCentersPage = () => {
    const { data, isLoading } = useListCollectionCentersQuery();
    const { data: districtsData } = useListDistrictsQuery();
    const [updateCollectionCenter, { isLoading: isToggling }] = useUpdateCollectionCenterMutation();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCenter, setEditingCenter] = useState<CollectionCenter | undefined>(undefined);
    const [togglingCenter, setTogglingCenter] = useState<CollectionCenter | undefined>(undefined);

    const collectionCenters = useMemo(() => data?.data ?? [], [data]);

    const districtNameById = useMemo(() => {
        const map = new Map(districtsData?.data?.map((district) => [district.id, district.name]));
        return map;
    }, [districtsData]);

    const openCreateForm = () => {
        setEditingCenter(undefined);
        setIsFormOpen(true);
    };

    const openEditForm = (row: CollectionCenter) => {
        setEditingCenter(row);
        setIsFormOpen(true);
    };

    const handleToggleActive = async () => {
        if (!togglingCenter) return;
        try {
            const response = await updateCollectionCenter({
                id: togglingCenter.id,
                data: { isActive: !togglingCenter.isActive },
            }).unwrap();
            toast.success(response.message || `Collection center ${togglingCenter.isActive ? "deactivated" : "activated"} successfully`);
            setTogglingCenter(undefined);
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to update collection center status");
        }
    };

    const columns: ColumnDef<CollectionCenter, unknown>[] = [
        { header: "Name", cell: ({ row }) => row.original.name },
        { header: "District", cell: ({ row }) => districtNameById.get(row.original.districtId) || "-" },
        { header: "City", cell: ({ row }) => row.original.address.city },
        { header: "Contact Phone", cell: ({ row }) => row.original.contactPhone },
        { header: "Capacity (kg)", cell: ({ row }) => row.original.capacityKg ?? "-" },
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
                    onDelete={() => setTogglingCenter(row.original)}
                />
            ),
        },
    ];

    return (
        <>
            <PageHeader>
                <div className="flex items-center justify-between">
                    <span>Collection Centers</span>
                    <Button variant="primary" size="sm" icon={Plus} onClick={openCreateForm}>
                        New Collection Center
                    </Button>
                </div>
            </PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="All Collection Centers"
                        columns={columns}
                        data={collectionCenters}
                        isLoading={isLoading}
                        totalCount={collectionCenters.length}
                        pageNumber={1}
                        pageLimit={Math.max(collectionCenters.length, 1)}
                        totalPages={1}
                        onPageChange={() => { }}
                        onPageSizeChange={() => { }}
                    />
                </div>
            </Container>

            {isFormOpen && (
                <CollectionCenterFormModal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    collectionCenter={editingCenter}
                />
            )}

            <Modal
                isOpen={!!togglingCenter}
                onClose={() => setTogglingCenter(undefined)}
                title={togglingCenter?.isActive ? "Deactivate Collection Center" : "Activate Collection Center"}
                size="sm"
            >
                <div className="space-y-6">
                    <p className="text-sm text-textSecondary">
                        {togglingCenter?.isActive ? "Deactivate" : "Activate"}{" "}
                        <span className="font-medium text-textPrimary">{togglingCenter?.name}</span>?
                        {togglingCenter?.isActive && " It will no longer be selectable as a receiving center for approved inspections."}
                    </p>
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" size="sm" onClick={() => setTogglingCenter(undefined)}>
                            Cancel
                        </Button>
                        <Button
                            variant={togglingCenter?.isActive ? "danger" : "primary"}
                            size="sm" loading={isToggling} disabled={isToggling} onClick={handleToggleActive}
                        >
                            {isToggling ? "" : togglingCenter?.isActive ? "Deactivate" : "Activate"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CollectionCentersPage;
