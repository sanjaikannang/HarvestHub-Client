import { ShieldCheck, ClipboardCheck, MapPin, Languages, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import StatsCard from "../components/StatsCard";
import { formatEnumLabel } from "../../../../utils/utils";
import { useGetMyInspectorProfileQuery } from "../../../../state/services/endpoints/inspector-profile";
import { useListMyInspectionsQuery } from "../../../../state/services/endpoints/inspection";

const InspectorDashboardPage = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetMyInspectorProfileQuery();
    const { data: inspectionsData } = useListMyInspectionsQuery();
    const profile = data?.data;

    const inspections = inspectionsData?.data ?? [];
    const scheduledCount = inspections.filter((i) => i.stage === "scheduled").length;

    return (
        <>
            <PageHeader>{t('nav.dashboard')}</PageHeader>
            <Container>
                <div className="py-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-textPrimary">
                            {t('dashboard.inspector.welcome')}{profile?.name ? `, ${profile.name}` : ''}
                        </h2>
                        <p className="text-sm text-textSecondary">
                            {t('dashboard.inspector.subtitle')}
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-textSecondary">{t('common.loading')}</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard label={t('common.role')} value={formatEnumLabel(profile?.role || '-')} icon={ShieldCheck} />
                            <StatsCard label={t('dashboard.inspector.statVisitsScheduled')} value={String(scheduledCount)} icon={ClipboardCheck} />
                            <StatsCard label={t('common.phone')} value={profile?.phone || '-'} icon={Phone} />
                            <StatsCard label={t('common.district')} value={profile?.districtId || '-'} icon={MapPin} />
                            <StatsCard label={t('common.language')} value={formatEnumLabel(profile?.preferredLanguage || '-')} icon={Languages} />
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default InspectorDashboardPage;
