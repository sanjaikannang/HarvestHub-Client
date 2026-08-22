import { useMemo } from "react";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import AuditLogTable from "../../../common/audit-log/components/AuditLogTable";
import { useListAuditLogsQuery } from "../../../../state/services/endpoints/audit-log";

const AuditLogPage = () => {
    const { data, isLoading } = useListAuditLogsQuery();
    const entries = useMemo(() => data?.data ?? [], [data]);

    return (
        <>
            <PageHeader>Audit Log</PageHeader>

            <Container>
                <div className="py-6">
                    <AuditLogTable entries={entries} isLoading={isLoading} />
                </div>
            </Container>
        </>
    );
};

export default AuditLogPage;
