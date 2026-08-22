import { Sprout, MapPin, Languages, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import StatsCard from "../components/StatsCard";
import { formatEnumLabel } from "../../../../utils/utils";
import { useGetMyFarmerProfileQuery } from "../../../../state/services/endpoints/farmer-profile";

const FarmerDashboardPage = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetMyFarmerProfileQuery();
    const profile = data?.data;

    return (
        <>
            <PageHeader>{t('nav.dashboard')}</PageHeader>
            <Container>
                <div className="py-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-textPrimary">
                            {t('dashboard.farmer.welcome')}{profile?.name ? `, ${profile.name}` : ''}
                        </h2>
                        <p className="text-sm text-textSecondary">
                            {t('dashboard.farmer.subtitle')}
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-textSecondary">{t('common.loading')}</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard label={t('common.role')} value={formatEnumLabel(profile?.role || '-')} icon={Sprout} />
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

export default FarmerDashboardPage;
