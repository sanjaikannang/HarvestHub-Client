import { useMemo, useState } from "react";
import Chip from "../../../../common/ui/Chip";
import Select from "../../../../common/ui/Select";
import Button from "../../../../common/ui/Button";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { formatDate } from "../../../../utils/date";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import type { Inspection } from "../../../../types/inspection-types";
import DecideInspectionModal from "../components/DecideInspectionModal";
import ProductNameCell from "../../../inspector/inspections/components/ProductNameCell";
import InspectionDetailModal from "../../../inspector/inspections/components/InspectionDetailModal";
import { useListInspectorsQuery } from "../../../../state/services/endpoints/auth";
import { useListInspectionsQuery } from "../../../../state/services/endpoints/inspection";

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

const STAGE_FILTER_OPTIONS = [
    { value: "", label: "All" },
    { value: "scheduled", label: "Scheduled" },
    { value: "awaiting_decision", label: "Awaiting Decision" },
    { value: "decided", label: "Decided" },
];

const InspectionsPage = () => {
    const [stageFilter, setStageFilter] = useState("");
    const [viewingInspection, setViewingInspection] = useState<Inspection | undefined>(undefined);
    const [decidingFor, setDecidingFor] = useState<Inspection | undefined>(undefined);

    const { data, isLoading } = useListInspectionsQuery();
    const { data: inspectorsData } = useListInspectorsQuery();

    const inspections = useMemo(() => {
        const all = data?.data ?? [];
        return stageFilter ? all.filter((i) => i.stage === stageFilter) : all;
    }, [data, stageFilter]);

    const inspectorNameById = useMemo(() => {
        const map = new Map(inspectorsData?.data?.map((i) => [i.id, i.name]));
        return map;
    }, [inspectorsData]);

    const columns: ColumnDef<Inspection, unknown>[] = [
        { header: "Product", cell: ({ row }) => <ProductNameCell productId={row.original.productId} /> },
        { header: "Inspector", cell: ({ row }) => inspectorNameById.get(row.original.inspectorId) || "-" },
        { header: "Scheduled Date", cell: ({ row }) => formatDate(row.original.scheduledDate) },
        { header: "Slot", cell: ({ row }) => row.original.scheduledSlot },
        {
            header: "Stage",
            cell: ({ row }) => <Chip label={STAGE_LABELS[row.original.stage]} variant={STAGE_VARIANTS[row.original.stage]} />,
        },
        {
            header: "Actions",
            width: "160px",
            cell: ({ row }) => (
                row.original.stage === "awaiting_decision" ? (
                    <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); setDecidingFor(row.original); }}>
                        Decide
                    </Button>
                ) : null
            ),
        },
    ];

    return (
        <>
            <PageHeader>Inspections</PageHeader>

            <Container>
                <div className="py-6 space-y-4">
                    <div className="max-w-xs">
                        <Select
                            id="stageFilter" name="stageFilter" label="Filter by Stage"
                            options={STAGE_FILTER_OPTIONS} value={stageFilter}
                            onChange={(value) => setStageFilter(String(value))}
                        />
                    </div>

                    <Table
                        tableTitle="All Inspections"
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

            <InspectionDetailModal
                isOpen={!!viewingInspection}
                onClose={() => setViewingInspection(undefined)}
                inspection={viewingInspection}
            />

            {decidingFor && (
                <DecideInspectionModal
                    isOpen={!!decidingFor}
                    onClose={() => setDecidingFor(undefined)}
                    inspection={decidingFor}
                />
            )}
        </>
    );
};

export default InspectionsPage;
