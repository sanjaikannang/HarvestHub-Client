import { useMemo, useState } from "react";
import Chip from "../../../../common/ui/Chip";
import Button from "../../../../common/ui/Button";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { PaymentStatus } from "../../../../utils/enum";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import type { Payment } from "../../../../types/payment-types";
import CheckoutModal from "../components/CheckoutModal";
import PaymentWindowCell from "../components/PaymentWindowCell";
import ProductNameCell from "../../../inspector/inspections/components/ProductNameCell";
import { useListMyPaymentsQuery } from "../../../../state/services/endpoints/payment";

const MyPaymentsPage = () => {
    const { data, isLoading } = useListMyPaymentsQuery(undefined, { pollingInterval: 15_000 });
    const payments = useMemo(() => data?.data ?? [], [data]);
    const [payingFor, setPayingFor] = useState<Payment | undefined>(undefined);

    const columns: ColumnDef<Payment, unknown>[] = [
        { header: "Product", cell: ({ row }) => <ProductNameCell productId={row.original.productId} /> },
        { header: "Amount", cell: ({ row }) => `₹${row.original.amount}` },
        {
            header: "Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.status)} variant={getChipVariant(row.original.status)} />,
        },
        {
            header: "Time Left",
            cell: ({ row }) => <PaymentWindowCell status={row.original.status} paymentWindowExpiresAt={row.original.paymentWindowExpiresAt} />,
        },
        {
            header: "Actions",
            width: "160px",
            cell: ({ row }) => {
                const paymentEntry = row.original;
                if (paymentEntry.status !== PaymentStatus.INITIATED && paymentEntry.status !== PaymentStatus.PROCESSING) {
                    return null;
                }
                return (
                    <Button variant="primary" size="sm" onClick={() => setPayingFor(paymentEntry)}>
                        Pay Now
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            <PageHeader>My Payments</PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="Payments"
                        columns={columns}
                        data={payments}
                        isLoading={isLoading}
                        totalCount={payments.length}
                        pageNumber={1}
                        pageLimit={Math.max(payments.length, 1)}
                        totalPages={1}
                        onPageChange={() => { }}
                        onPageSizeChange={() => { }}
                    />
                </div>
            </Container>

            {payingFor && (
                <CheckoutModal
                    isOpen={!!payingFor}
                    onClose={() => setPayingFor(undefined)}
                    payment={payingFor}
                />
            )}
        </>
    );
};

export default MyPaymentsPage;
