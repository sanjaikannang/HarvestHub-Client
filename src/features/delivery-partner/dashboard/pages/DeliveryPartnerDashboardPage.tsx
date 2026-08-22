import { Truck, Package, Phone, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import StatsCard from "../components/StatsCard";
import { formatEnumLabel } from "../../../../utils/utils";
import { useGetMyDeliveryPartnerProfileQuery } from "../../../../state/services/endpoints/delivery-partner-profile";

const DeliveryPartnerDashboardPage = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetMyDeliveryPartnerProfileQuery();
    const profile = data?.data;

    return (
        <>
            <PageHeader>{t('nav.dashboard')}</PageHeader>
            <Container>
                <div className="py-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-textPrimary">
                            {t('dashboard.deliveryPartner.welcome')}{profile?.name ? `, ${profile.name}` : ''}
                        </h2>
                        <p className="text-sm text-textSecondary">
                            {t('dashboard.deliveryPartner.subtitle')}
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-textSecondary">{t('common.loading')}</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard label={t('dashboard.deliveryPartner.statAvailability')} value={formatEnumLabel(profile?.currentStatus || '-')} icon={CheckCircle2} />
                            <StatsCard label={t('dashboard.deliveryPartner.statActiveOrders')} value={String(profile?.activeOrderCount ?? '-')} icon={Package} />
                            <StatsCard label={t('dashboard.deliveryPartner.statVehicle')} value={profile?.vehicleNumber || t('common.notSet')} icon={Truck} />
                            <StatsCard label={t('common.phone')} value={profile?.phone || '-'} icon={Phone} />
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default DeliveryPartnerDashboardPage;
