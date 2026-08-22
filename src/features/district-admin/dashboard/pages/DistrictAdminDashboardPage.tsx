import { ClipboardCheck, ClipboardList, Gavel, Truck, ShieldAlert, ShieldQuestion } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import StatsCard from "../components/StatsCard";
import { useGetDistrictAdminDashboardQuery } from "../../../../state/services/endpoints/dashboard";

const DistrictAdminDashboardPage = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetDistrictAdminDashboardQuery();
    const dashboard = data?.data;

    return (
        <>
            <PageHeader>{t('nav.dashboard')}</PageHeader>
            <Container>
                <div className="py-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-textPrimary">{t('dashboard.districtAdmin.title')}</h2>
                        <p className="text-sm text-textSecondary">
                            {t('dashboard.districtAdmin.subtitle')}
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-textSecondary">{t('common.loading')}</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <StatsCard label={t('dashboard.districtAdmin.statPendingProductReviews')} value={String(dashboard?.pendingProductReviews ?? 0)} icon={ClipboardCheck} />
                            <StatsCard label={t('dashboard.districtAdmin.statPendingInspections')} value={String(dashboard?.pendingInspections ?? 0)} icon={ClipboardList} />
                            <StatsCard label={t('dashboard.districtAdmin.statActiveBiddingSessions')} value={String(dashboard?.activeBiddingSessions ?? 0)} icon={Gavel} />
                            <StatsCard label={t('dashboard.districtAdmin.statOrdersInProgress')} value={String(dashboard?.ordersInProgress ?? 0)} icon={Truck} />
                            <StatsCard label={t('dashboard.districtAdmin.statOpenDisputes')} value={String(dashboard?.openDisputes ?? 0)} icon={ShieldAlert} />
                            <StatsCard label={t('dashboard.districtAdmin.statTotalDisputes')} value={String(dashboard?.totalDisputes ?? 0)} icon={ShieldQuestion} />
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default DistrictAdminDashboardPage;
