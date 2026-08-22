import { ShieldCheck, ClipboardCheck, MapPin, Languages, Phone } from "lucide-react";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import StatsCard from "../components/StatsCard";
import { formatEnumLabel } from "../../../../utils/utils";
import { useGetMyInspectorProfileQuery } from "../../../../state/services/endpoints/inspector-profile";
import { useListMyInspectionsQuery } from "../../../../state/services/endpoints/inspection";

const InspectorDashboardPage = () => {
    const { data, isLoading } = useGetMyInspectorProfileQuery();
    const { data: inspectionsData } = useListMyInspectionsQuery();
    const profile = data?.data;

    const inspections = inspectionsData?.data ?? [];
    const scheduledCount = inspections.filter((i) => i.stage === "scheduled").length;

    return (
        <>
            <PageHeader>Dashboard</PageHeader>
            <Container>
                <div className="py-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-textPrimary">
                            Welcome{profile?.name ? `, ${profile.name}` : ''}
                        </h2>
                        <p className="text-sm text-textSecondary">
                            Your assigned visits show up here — see "My Inspections" to
                            record findings once you've completed a visit.
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-textSecondary">Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard label="Role" value={formatEnumLabel(profile?.role || '-')} icon={ShieldCheck} />
                            <StatsCard label="Visits Scheduled" value={String(scheduledCount)} icon={ClipboardCheck} />
                            <StatsCard label="Phone" value={profile?.phone || '-'} icon={Phone} />
                            <StatsCard label="District" value={profile?.districtId || '-'} icon={MapPin} />
                            <StatsCard label="Language" value={formatEnumLabel(profile?.preferredLanguage || '-')} icon={Languages} />
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default InspectorDashboardPage;
