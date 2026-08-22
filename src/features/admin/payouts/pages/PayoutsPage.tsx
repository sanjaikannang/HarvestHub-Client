import { useMemo } from "react";
import toast from "react-hot-toast";
import Chip from "../../../../common/ui/Chip";
import Button from "../../../../common/ui/Button";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { PayoutStatus } from "../../../../utils/enum";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import type { Payout } from "../../../../types/payout-types";
import { useListPayoutsQuery, useReleasePayoutMutation } from "../../../../state/services/endpoints/payout";

const PayoutsPage = () => {
    const { data, isLoading } = useListPayoutsQuery();
    const payouts = useMemo(() => data?.data ?? [], [data]);
    const [releasePayout, { isLoading: isReleasing }] = useReleasePayoutMutation();

    const handleRelease = async (payoutId: string) => {
        try {
            const response = await releasePayout(payoutId).unwrap();
            toast.success(response.message || "Payout released successfully");
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to release payout");
        }
    };

    const columns: ColumnDef<Payout, unknown>[] = [
        { header: "Gross Amount", cell: ({ row }) => `₹${row.original.grossAmount}` },
        { header: "Commission", cell: ({ row }) => `${row.original.commissionPercentage}% (₹${row.original.commissionAmount})` },
        { header: "Net Payout", cell: ({ row }) => `₹${row.original.netPayoutAmount}` },
        {
            header: "Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.status)} variant={getChipVariant(row.original.status)} />,
        },
        {
            header: "Actions",
            width: "160px",
            cell: ({ row }) => {
                if (row.original.status !== PayoutStatus.PENDING) return null;
                return (
                    <Button variant="primary" size="sm" loading={isReleasing} onClick={() => handleRelease(row.original.id)}>
                        Release
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            <PageHeader>Payouts</PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="All Payouts"
                        columns={columns}
                        data={payouts}
                        isLoading={isLoading}
                        totalCount={payouts.length}
                        pageNumber={1}
                        pageLimit={Math.max(payouts.length, 1)}
                        totalPages={1}
                        onPageChange={() => { }}
                        onPageSizeChange={() => { }}
                    />
                </div>
            </Container>
        </>
    );
};

export default PayoutsPage;
