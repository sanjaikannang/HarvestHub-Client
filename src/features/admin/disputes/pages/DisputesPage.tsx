import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Chip from "../../../../common/ui/Chip";
import Button from "../../../../common/ui/Button";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { DisputeStatus } from "../../../../utils/enum";
import { formatDate } from "../../../../utils/date";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import type { Dispute } from "../../../../types/dispute-types";
import ResolveDisputeModal from "../components/ResolveDisputeModal";
import ProductNameCell from "../../../inspector/inspections/components/ProductNameCell";
import { useGetOrderQuery } from "../../../../state/services/endpoints/order";
import { useListDisputesQuery, useStartDisputeReviewMutation } from "../../../../state/services/endpoints/dispute";

const ACTIONABLE_STATUSES = [DisputeStatus.RAISED, DisputeStatus.UNDER_REVIEW, DisputeStatus.ESCALATED];

const DisputeProductCell = ({ orderId }: { orderId: string }) => {
    const { data, isLoading } = useGetOrderQuery(orderId);
    if (isLoading) return <span className="text-textTertiary">Loading...</span>;
    return data?.data ? <ProductNameCell productId={data.data.productId} /> : <span className="text-textTertiary">-</span>;
};

const DisputesPage = () => {
    const { data, isLoading } = useListDisputesQuery();
    const disputes = useMemo(() => data?.data ?? [], [data]);
    const [startReview, { isLoading: isStartingReview }] = useStartDisputeReviewMutation();
    const [resolvingDispute, setResolvingDispute] = useState<Dispute | undefined>(undefined);

    const handleStartReview = async (id: string) => {
        try {
            const response = await startReview(id).unwrap();
            toast.success(response.message || "Dispute moved to review");
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to start review");
        }
    };

    const columns: ColumnDef<Dispute, unknown>[] = [
        { header: "Product", cell: ({ row }) => <DisputeProductCell orderId={row.original.orderId} /> },
        { header: "Reason", cell: ({ row }) => formatEnumLabel(row.original.reason) },
        { header: "Description", cell: ({ row }) => <span className="line-clamp-2">{row.original.description}</span> },
        {
            header: "Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.status)} variant={getChipVariant(row.original.status)} />,
        },
        { header: "Raised On", cell: ({ row }) => formatDate(row.original.raisedAt) },
        {
            header: "Actions",
            width: "220px",
            cell: ({ row }) => {
                const dispute = row.original;
                if (!ACTIONABLE_STATUSES.includes(dispute.status)) return null;
                return (
                    <div className="flex gap-2">
                        {dispute.status === DisputeStatus.RAISED && (
                            <Button variant="outline" size="sm" loading={isStartingReview} onClick={() => handleStartReview(dispute.id)}>
                                Start Review
                            </Button>
                        )}
                        <Button variant="primary" size="sm" onClick={() => setResolvingDispute(dispute)}>
                            Resolve
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <PageHeader>Disputes</PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="All Disputes"
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

            {resolvingDispute && (
                <ResolveDisputeModal
                    isOpen={!!resolvingDispute}
                    onClose={() => setResolvingDispute(undefined)}
                    dispute={resolvingDispute}
                />
            )}
        </>
    );
};

export default DisputesPage;
