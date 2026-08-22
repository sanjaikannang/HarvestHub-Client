import { useMemo, useState } from "react";
import Chip from "../../../../common/ui/Chip";
import Button from "../../../../common/ui/Button";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import type { Order } from "../../../../types/order-types";
import AssignDeliveryPartnerModal from "../components/AssignDeliveryPartnerModal";
import ProductNameCell from "../../../inspector/inspections/components/ProductNameCell";
import { useListOrdersQuery } from "../../../../state/services/endpoints/order";

const OrdersPage = () => {
    const { data, isLoading } = useListOrdersQuery();
    const orders = useMemo(() => data?.data ?? [], [data]);
    const [assigningFor, setAssigningFor] = useState<Order | undefined>(undefined);

    const columns: ColumnDef<Order, unknown>[] = [
        { header: "Product", cell: ({ row }) => <ProductNameCell productId={row.original.productId} /> },
        { header: "Quantity", cell: ({ row }) => row.original.quantity },
        { header: "Total Amount", cell: ({ row }) => `₹${row.original.totalAmount}` },
        {
            header: "Delivery Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.deliveryStatus)} variant={getChipVariant(row.original.deliveryStatus)} />,
        },
        {
            header: "Delivery Partner",
            cell: ({ row }) => (
                <Button variant={row.original.deliveryPartnerId ? "outline" : "primary"} size="sm" onClick={() => setAssigningFor(row.original)}>
                    {row.original.deliveryPartnerId ? "Reassign" : "Assign"}
                </Button>
            ),
        },
    ];

    return (
        <>
            <PageHeader>Orders</PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="All Orders"
                        columns={columns}
                        data={orders}
                        isLoading={isLoading}
                        totalCount={orders.length}
                        pageNumber={1}
                        pageLimit={Math.max(orders.length, 1)}
                        totalPages={1}
                        onPageChange={() => { }}
                        onPageSizeChange={() => { }}
                    />
                </div>
            </Container>

            {assigningFor && (
                <AssignDeliveryPartnerModal
                    isOpen={!!assigningFor}
                    onClose={() => setAssigningFor(undefined)}
                    order={assigningFor}
                />
            )}
        </>
    );
};

export default OrdersPage;
