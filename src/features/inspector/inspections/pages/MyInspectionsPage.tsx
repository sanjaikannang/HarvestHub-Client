import { useMemo, useState } from "react";
import Chip from "../../../../common/ui/Chip";
import Button from "../../../../common/ui/Button";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { formatDate } from "../../../../utils/date";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import { formatEnumLabel } from "../../../../utils/utils";
import type { Inspection } from "../../../../types/inspection-types";
import ProductNameCell from "../components/ProductNameCell";
import RecordFindingsModal from "../components/RecordFindingsModal";
import InspectionDetailModal from "../components/InspectionDetailModal";
import { useListMyInspectionsQuery } from "../../../../state/services/endpoints/inspection";

const STAGE_LABELS: Record<string, string> = {
    scheduled: "Scheduled",
    awaiting_decision: "Awaiting Decision",
    decided: "Decided",
};

const STAGE_VARIANTS: Record<string, "blue" | "yellow" | "green"> = {
    scheduled: "blue",
    awaiting_decision: "yellow",
    decided: "green",
};

const MyInspectionsPage = () => {
    const { data, isLoading } = useListMyInspectionsQuery();
    const [recordingFor, setRecordingFor] = useState<Inspection | undefined>(undefined);
    const [viewingInspection, setViewingInspection] = useState<Inspection | undefined>(undefined);

    const inspections = useMemo(() => data?.data ?? [], [data]);

    const columns: ColumnDef<Inspection, unknown>[] = [
        { header: "Product", cell: ({ row }) => <ProductNameCell productId={row.original.productId} /> },
        { header: "Scheduled Date", cell: ({ row }) => formatDate(row.original.scheduledDate) },
        { header: "Slot", cell: ({ row }) => row.original.scheduledSlot },
        { header: "Method", cell: ({ row }) => formatEnumLabel(row.original.collectionMethod) },
        {
            header: "Stage",
            cell: ({ row }) => <Chip label={STAGE_LABELS[row.original.stage]} variant={STAGE_VARIANTS[row.original.stage]} />,
        },
        {
            header: "Actions",
            width: "160px",
            cell: ({ row }) => (
                row.original.stage === "scheduled" ? (
                    <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); setRecordingFor(row.original); }}>
                        Record Findings
                    </Button>
                ) : null
            ),
        },
    ];

    return (
        <>
            <PageHeader>My Inspections</PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="Assigned Visits"
                        columns={columns}
                        data={inspections}
                        isLoading={isLoading}
                        onRowClick={(row) => setViewingInspection(row)}
                        totalCount={inspections.length}
                        pageNumber={1}
                        pageLimit={Math.max(inspections.length, 1)}
                        totalPages={1}
                        onPageChange={() => { }}
                        onPageSizeChange={() => { }}
                    />
                </div>
            </Container>

            {recordingFor && (
                <RecordFindingsModal
                    isOpen={!!recordingFor}
                    onClose={() => setRecordingFor(undefined)}
                    inspection={recordingFor}
                />
            )}

            <InspectionDetailModal
                isOpen={!!viewingInspection}
                onClose={() => setViewingInspection(undefined)}
                inspection={viewingInspection}
            />
        </>
    );
};

export default MyInspectionsPage;
