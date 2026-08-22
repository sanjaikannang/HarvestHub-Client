import { ShoppingBasket, MapPin, Languages, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import StatsCard from "../components/StatsCard";
import { formatEnumLabel } from "../../../../utils/utils";
import { useGetMyBuyerProfileQuery } from "../../../../state/services/endpoints/buyer-profile";

const BuyerDashboardPage = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetMyBuyerProfileQuery();
    const profile = data?.data;

    return (
        <>
            <PageHeader>{t('nav.dashboard')}</PageHeader>
            <Container>
                <div className="py-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-textPrimary">
                            {t('dashboard.buyer.welcome')}{profile?.name ? `, ${profile.name}` : ''}
                        </h2>
                        <p className="text-sm text-textSecondary">
                            {t('dashboard.buyer.subtitle')}
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-textSecondary">{t('common.loading')}</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard label={t('common.role')} value={formatEnumLabel(profile?.role || '-')} icon={ShoppingBasket} />
                            <StatsCard label={t('common.phone')} value={profile?.phone || '-'} icon={Phone} />
                            <StatsCard label={t('common.homeDistrict')} value={profile?.districtId || t('common.notSet')} icon={MapPin} />
                            <StatsCard label={t('common.language')} value={formatEnumLabel(profile?.preferredLanguage || '-')} icon={Languages} />
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default BuyerDashboardPage;
