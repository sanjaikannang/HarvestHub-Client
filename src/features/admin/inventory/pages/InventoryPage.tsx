import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { UserPlus } from "lucide-react";
import Chip from "../../../../common/ui/Chip";
import Select from "../../../../common/ui/Select";
import Button from "../../../../common/ui/Button";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { formatDate } from "../../../../utils/date";
import { InventoryStatus } from "../../../../utils/enum";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import type { InventoryEntry } from "../../../../types/inventory-types";
import DispatchModal from "../components/DispatchModal";
import CreateDeliveryPartnerModal from "../components/CreateDeliveryPartnerModal";
import ProductNameCell from "../../../inspector/inspections/components/ProductNameCell";
import { useListCollectionCentersQuery } from "../../../../state/services/endpoints/collection-center";
import { useListInventoryQuery, useReserveInventoryMutation } from "../../../../state/services/endpoints/collection-center-inventory";

const STATUS_FILTER_OPTIONS = [
    { value: "", label: "All" },
    { value: InventoryStatus.IN_STORAGE, label: "In Storage" },
    { value: InventoryStatus.RESERVED_FOR_SALE, label: "Reserved for Sale" },
    { value: InventoryStatus.DISPATCHED, label: "Dispatched" },
];

const InventoryPage = () => {
    const [statusFilter, setStatusFilter] = useState<InventoryStatus | "">("");
    const [dispatchingFor, setDispatchingFor] = useState<InventoryEntry | undefined>(undefined);
    const [isAddingPartner, setIsAddingPartner] = useState(false);

    const { data, isLoading } = useListInventoryQuery(statusFilter ? { status: statusFilter } : undefined);
    const { data: centersData } = useListCollectionCentersQuery();
    const [reserveInventory, { isLoading: isReserving }] = useReserveInventoryMutation();

    const entries = useMemo(() => data?.data ?? [], [data]);
    const centerNameById = useMemo(() => {
        const map = new Map(centersData?.data?.map((c) => [c.id, c.name]));
        return map;
    }, [centersData]);

    const handleReserve = async (entry: InventoryEntry) => {
        try {
            const response = await reserveInventory(entry.id).unwrap();
            toast.success(response.message || "Inventory reserved for sale");
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to reserve inventory");
        }
    };

    const columns: ColumnDef<InventoryEntry, unknown>[] = [
        { header: "Product", cell: ({ row }) => <ProductNameCell productId={row.original.productId} /> },
        { header: "Collection Center", cell: ({ row }) => centerNameById.get(row.original.collectionCenterId) || "-" },
        { header: "Received Qty", cell: ({ row }) => row.original.receivedQuantity },
        { header: "Received Date", cell: ({ row }) => formatDate(row.original.receivedDate) },
        {
            header: "Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.status)} variant={getChipVariant(row.original.status)} />,
        },
        {
            header: "Actions",
            width: "160px",
            cell: ({ row }) => {
                const entry = row.original;
                if (entry.status === InventoryStatus.IN_STORAGE) {
                    return (
                        <Button variant="outline" size="sm" loading={isReserving} onClick={() => handleReserve(entry)}>
                            Reserve for Sale
                        </Button>
                    );
                }
                if (entry.status === InventoryStatus.RESERVED_FOR_SALE) {
                    return (
                        <Button variant="primary" size="sm" onClick={() => setDispatchingFor(entry)}>
                            Dispatch
                        </Button>
                    );
                }
                return null;
            },
        },
    ];

    return (
        <>
            <PageHeader>
                <div className="flex items-center justify-between">
                    <span>Collection Center Inventory</span>
                    <Button variant="outline" size="sm" icon={UserPlus} onClick={() => setIsAddingPartner(true)}>
                        Add Delivery Partner
                    </Button>
                </div>
            </PageHeader>

            <Container>
                <div className="py-6 space-y-4">
                    <div className="max-w-xs">
                        <Select
                            id="statusFilter" name="statusFilter" label="Filter by Status"
                            options={STATUS_FILTER_OPTIONS} value={statusFilter}
                            onChange={(value) => setStatusFilter(value as InventoryStatus | "")}
                        />
                    </div>

                    <Table
                        tableTitle="Inventory"
                        columns={columns}
                        data={entries}
                        isLoading={isLoading}
                        totalCount={entries.length}
                        pageNumber={1}
                        pageLimit={Math.max(entries.length, 1)}
                        totalPages={1}
                        onPageChange={() => { }}
                        onPageSizeChange={() => { }}
                    />
                </div>
            </Container>

            {dispatchingFor && (
                <DispatchModal
                    isOpen={!!dispatchingFor}
                    onClose={() => setDispatchingFor(undefined)}
                    entry={dispatchingFor}
                />
            )}

            <CreateDeliveryPartnerModal
                isOpen={isAddingPartner}
                onClose={() => setIsAddingPartner(false)}
            />
        </>
    );
};

export default InventoryPage;
