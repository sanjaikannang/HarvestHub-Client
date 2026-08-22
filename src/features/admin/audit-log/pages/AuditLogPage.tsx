import { useMemo, useState } from "react";
import Select from "../../../../common/ui/Select";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import AuditLogTable from "../../../common/audit-log/components/AuditLogTable";
import { useListDistrictsQuery } from "../../../../state/services/endpoints/district";
import { useListAuditLogsQuery } from "../../../../state/services/endpoints/audit-log";

const AuditLogPage = () => {
    const [districtId, setDistrictId] = useState("");
    const { data: districtsData } = useListDistrictsQuery();
    const districts = districtsData?.data ?? [];

    const { data, isLoading } = useListAuditLogsQuery(districtId ? { districtId } : undefined);
    const entries = useMemo(() => data?.data ?? [], [data]);

    const districtOptions = [{ value: "", label: "All Districts" }, ...districts.map((d) => ({ value: d.id, label: `${d.name}, ${d.state}` }))];

    return (
        <>
            <PageHeader>Audit Log</PageHeader>

            <Container>
                <div className="py-6 space-y-4">
                    <div className="max-w-xs">
                        <Select
                            id="districtId" name="districtId" label="Filter by District"
                            options={districtOptions} value={districtId}
                            onChange={(value) => setDistrictId(String(value))}
                        />
                    </div>

                    <AuditLogTable entries={entries} isLoading={isLoading} />
                </div>
            </Container>
        </>
    );
};

export default AuditLogPage;
