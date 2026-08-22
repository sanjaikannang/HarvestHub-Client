import { useMemo, useState } from "react";
import Chip from "../../../../common/ui/Chip";
import Button from "../../../../common/ui/Button";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { DeliveryStatus } from "../../../../utils/enum";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import type { Order } from "../../../../types/order-types";
import ProductNameCell from "../../../inspector/inspections/components/ProductNameCell";
import { useOrdersSocket } from "../hooks/useOrdersSocket";
import RaiseDisputeModal from "../../disputes/components/RaiseDisputeModal";
import { useListMyOrdersQuery } from "../../../../state/services/endpoints/order";
import { useListMyDisputesQuery } from "../../../../state/services/endpoints/dispute";

const MyOrdersPage = () => {
    const { data, isLoading, refetch } = useListMyOrdersQuery();
    const orders = useMemo(() => data?.data ?? [], [data]);
    const { data: disputesData } = useListMyDisputesQuery();
    const [disputingOrderId, setDisputingOrderId] = useState<string | undefined>(undefined);

    const disputedOrderIds = useMemo(() => new Set((disputesData?.data ?? []).map((d) => d.orderId)), [disputesData]);

    const activeOrderIds = useMemo(
        () => orders.filter((order) => order.deliveryStatus !== DeliveryStatus.DELIVERED).map((order) => order.id),
        [orders],
    );
    useOrdersSocket(activeOrderIds, refetch);

    const columns: ColumnDef<Order, unknown>[] = [
        { header: "Product", cell: ({ row }) => <ProductNameCell productId={row.original.productId} /> },
        { header: "Quantity", cell: ({ row }) => row.original.quantity },
        { header: "Total Amount", cell: ({ row }) => `₹${row.original.totalAmount}` },
        { header: "Delivery Address", cell: ({ row }) => `${row.original.deliveryAddress.line1}, ${row.original.deliveryAddress.city}` },
        {
            header: "Delivery Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.deliveryStatus)} variant={getChipVariant(row.original.deliveryStatus)} />,
        },
        {
            header: "Actions",
            width: "160px",
            cell: ({ row }) => {
                const order = row.original;
                if (order.deliveryStatus !== DeliveryStatus.DELIVERED || disputedOrderIds.has(order.id)) {
                    return null;
                }
                return (
                    <Button variant="outline" size="sm" onClick={() => setDisputingOrderId(order.id)}>
                        Raise Dispute
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            <PageHeader>My Orders</PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="Orders"
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

            {disputingOrderId && (
                <RaiseDisputeModal
                    isOpen={!!disputingOrderId}
                    onClose={() => setDisputingOrderId(undefined)}
                    orderId={disputingOrderId}
                />
            )}
        </>
    );
};

export default MyOrdersPage;
