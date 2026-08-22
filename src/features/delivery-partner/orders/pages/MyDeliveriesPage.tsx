import { useMemo } from "react";
import toast from "react-hot-toast";
import Chip from "../../../../common/ui/Chip";
import Button from "../../../../common/ui/Button";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { DeliveryStatus } from "../../../../utils/enum";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import type { Order } from "../../../../types/order-types";
import ProductNameCell from "../../../inspector/inspections/components/ProductNameCell";
import { useListMyOrdersQuery, useUpdateOrderStatusMutation } from "../../../../state/services/endpoints/order";

const DELIVERY_STATUS_SEQUENCE = [
    DeliveryStatus.ORDER_CONFIRMED,
    DeliveryStatus.PREPARING_FOR_DISPATCH,
    DeliveryStatus.PICKED_UP,
    DeliveryStatus.IN_TRANSIT,
    DeliveryStatus.OUT_FOR_DELIVERY,
    DeliveryStatus.DELIVERED,
];

const nextStatus = (current: DeliveryStatus): DeliveryStatus | undefined => {
    const index = DELIVERY_STATUS_SEQUENCE.indexOf(current);
    return index >= 0 && index < DELIVERY_STATUS_SEQUENCE.length - 1 ? DELIVERY_STATUS_SEQUENCE[index + 1] : undefined;
};

const MyDeliveriesPage = () => {
    const { data, isLoading } = useListMyOrdersQuery();
    const orders = useMemo(() => data?.data ?? [], [data]);
    const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

    const handleAdvance = async (order: Order) => {
        const next = nextStatus(order.deliveryStatus);
        if (!next) return;

        try {
            const response = await updateOrderStatus({ id: order.id, data: { status: next } }).unwrap();
            toast.success(response.message || `Order advanced to ${formatEnumLabel(next)}`);
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to update order status");
        }
    };

    const columns: ColumnDef<Order, unknown>[] = [
        { header: "Product", cell: ({ row }) => <ProductNameCell productId={row.original.productId} /> },
        { header: "Delivery Address", cell: ({ row }) => `${row.original.deliveryAddress.line1}, ${row.original.deliveryAddress.city}` },
        {
            header: "Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.deliveryStatus)} variant={getChipVariant(row.original.deliveryStatus)} />,
        },
        {
            header: "Actions",
            width: "220px",
            cell: ({ row }) => {
                const order = row.original;
                const next = nextStatus(order.deliveryStatus);
                if (!next) return null;
                return (
                    <Button variant="primary" size="sm" loading={isUpdating} onClick={() => handleAdvance(order)}>
                        Mark as {formatEnumLabel(next)}
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            <PageHeader>My Deliveries</PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="Assigned Orders"
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
        </>
    );
};

export default MyDeliveriesPage;
