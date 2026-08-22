import { useMemo } from "react";
import Chip from "../../../../common/ui/Chip";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { formatDate } from "../../../../utils/date";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import type { Payout } from "../../../../types/payout-types";
import { useListMyPayoutsQuery } from "../../../../state/services/endpoints/payout";

const MyPayoutsPage = () => {
    const { data, isLoading } = useListMyPayoutsQuery();
    const payouts = useMemo(() => data?.data ?? [], [data]);

    const columns: ColumnDef<Payout, unknown>[] = [
        { header: "Gross Amount", cell: ({ row }) => `₹${row.original.grossAmount}` },
        { header: "Commission", cell: ({ row }) => `${row.original.commissionPercentage}% (₹${row.original.commissionAmount})` },
        { header: "Net Payout", cell: ({ row }) => `₹${row.original.netPayoutAmount}` },
        {
            header: "Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.status)} variant={getChipVariant(row.original.status)} />,
        },
        { header: "Released At", cell: ({ row }) => row.original.releasedAt ? formatDate(row.original.releasedAt) : "-" },
    ];

    return (
        <>
            <PageHeader>My Payouts</PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="Payouts"
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

export default MyPayoutsPage;
