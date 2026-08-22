import { useMemo } from "react";
import Chip from "../../../../common/ui/Chip";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { formatDate } from "../../../../utils/date";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import type { Dispute } from "../../../../types/dispute-types";
import { useListMyDisputesQuery } from "../../../../state/services/endpoints/dispute";

const MyDisputesPage = () => {
    const { data, isLoading } = useListMyDisputesQuery();
    const disputes = useMemo(() => data?.data ?? [], [data]);

    const columns: ColumnDef<Dispute, unknown>[] = [
        { header: "Reason", cell: ({ row }) => formatEnumLabel(row.original.reason) },
        { header: "Description", cell: ({ row }) => <span className="line-clamp-2">{row.original.description}</span> },
        {
            header: "Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.status)} variant={getChipVariant(row.original.status)} />,
        },
        { header: "Refund Amount", cell: ({ row }) => row.original.refundAmount ? `₹${row.original.refundAmount}` : "-" },
        { header: "Raised On", cell: ({ row }) => formatDate(row.original.raisedAt) },
        { header: "Resolution Notes", cell: ({ row }) => row.original.resolutionNotes || "-" },
    ];

    return (
        <>
            <PageHeader>My Disputes</PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="Disputes"
                        columns={columns}
                        data={disputes}
                        isLoading={isLoading}
                        totalCount={disputes.length}
                        pageNumber={1}
                        pageLimit={Math.max(disputes.length, 1)}
                        totalPages={1}
                        onPageChange={() => { }}
                        onPageSizeChange={() => { }}
                    />
                </div>
            </Container>
        </>
    );
};

export default MyDisputesPage;
