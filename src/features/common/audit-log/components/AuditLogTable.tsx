import Chip from "../../../../common/ui/Chip";
import { formatDateTime } from "../../../../utils/date";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import type { AuditLogEntry } from "../../../../types/audit-log-types";

interface AuditLogTableProps {
    entries: AuditLogEntry[];
    isLoading: boolean;
}

const AuditLogTable = ({ entries, isLoading }: AuditLogTableProps) => {
    const columns: ColumnDef<AuditLogEntry, unknown>[] = [
        { header: "Action", cell: ({ row }) => <Chip label={formatEnumLabel(row.original.action)} variant={getChipVariant(row.original.action)} /> },
        { header: "Target", cell: ({ row }) => `${formatEnumLabel(row.original.targetEntityType)} (${row.original.targetEntityId.slice(-6)})` },
        { header: "Actor Role", cell: ({ row }) => formatEnumLabel(row.original.actorRole) },
        { header: "Reason", cell: ({ row }) => row.original.reason || "-" },
        { header: "When", cell: ({ row }) => formatDateTime(row.original.createdAt) },
    ];

    return (
        <Table
            tableTitle="Audit Log"
            columns={columns}
            data={entries}
            isLoading={isLoading}
            totalCount={entries.length}
            pageNumber={1}
            pageLimit={Math.max(entries.length, 1)}
            totalPages={1}
            onPageChange={() => { }}
            onPageSizeChange={() => { }}
        />
    );
};

export default AuditLogTable;
