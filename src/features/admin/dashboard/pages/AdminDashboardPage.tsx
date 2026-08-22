import { Users, ShoppingBasket, Package, Truck, IndianRupee, Percent, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import StatsCard from "../components/StatsCard";
import { useGetMyAdminProfileQuery } from "../../../../state/services/endpoints/admin-profile";
import { useGetSuperAdminDashboardQuery } from "../../../../state/services/endpoints/dashboard";

const AdminDashboardPage = () => {
    const { t } = useTranslation();
    const { data: profileData } = useGetMyAdminProfileQuery();
    const profile = profileData?.data;

    const { data, isLoading } = useGetSuperAdminDashboardQuery();
    const dashboard = data?.data;

    return (
        <>
            <PageHeader>{t('nav.dashboard')}</PageHeader>
            <Container>
                <div className="py-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-textPrimary">
                            {t('dashboard.admin.welcome')}{profile?.name ? `, ${profile.name}` : ''}
                        </h2>
                        <p className="text-sm text-textSecondary">
                            {t('dashboard.admin.subtitle')}
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-textSecondary">{t('common.loading')}</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <StatsCard label={t('dashboard.admin.statTotalFarmers')} value={String(dashboard?.totalFarmers ?? 0)} icon={Users} />
                                <StatsCard label={t('dashboard.admin.statTotalBuyers')} value={String(dashboard?.totalBuyers ?? 0)} icon={ShoppingBasket} />
                                <StatsCard label={t('dashboard.admin.statTotalProducts')} value={String(dashboard?.totalProducts ?? 0)} icon={Package} />
                                <StatsCard label={t('dashboard.admin.statTotalOrders')} value={String(dashboard?.totalOrders ?? 0)} icon={Truck} />
                                <StatsCard label={t('dashboard.admin.statTotalRevenue')} value={`₹${dashboard?.totalRevenue ?? 0}`} icon={IndianRupee} />
                                <StatsCard label={t('dashboard.admin.statTotalCommission')} value={`₹${dashboard?.totalCommission ?? 0}`} icon={Percent} />
                                <StatsCard label={t('dashboard.admin.statPendingEscalations')} value={String(dashboard?.pendingEscalations ?? 0)} icon={ShieldAlert} />
                            </div>

                            <div>
                                <h3 className="text-md font-semibold text-textPrimary mb-3">{t('dashboard.admin.districtsOverview')}</h3>
                                <div className="overflow-x-auto rounded-xl border border-borderLight bg-whiteColor">
                                    <table className="w-full border-collapse">
                                        <thead className="bg-bgSecondary">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">{t('dashboard.admin.tableDistrict')}</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">{t('dashboard.admin.tableState')}</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">{t('dashboard.admin.tableActiveFarmers')}</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">{t('dashboard.admin.tableActiveBuyers')}</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">{t('dashboard.admin.tableProductsInPipeline')}</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">{t('dashboard.admin.tableOrdersInProgress')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(dashboard?.districts ?? []).length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="px-4 py-6 text-center text-sm text-textSecondary">{t('dashboard.admin.noDistrictsYet')}</td>
                                                </tr>
                                            ) : (
                                                dashboard!.districts.map((district) => (
                                                    <tr key={district.id} className="border-t border-borderLight">
                                                        <td className="px-4 py-3 text-sm text-textPrimary">{district.name}</td>
                                                        <td className="px-4 py-3 text-sm text-textSecondary">{district.state}</td>
                                                        <td className="px-4 py-3 text-sm text-textSecondary">{district.stats.activeFarmers}</td>
                                                        <td className="px-4 py-3 text-sm text-textSecondary">{district.stats.activeBuyers}</td>
                                                        <td className="px-4 py-3 text-sm text-textSecondary">{district.stats.productsInPipeline}</td>
                                                        <td className="px-4 py-3 text-sm text-textSecondary">{district.stats.ordersInProgress}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </>
    );
};

export default AdminDashboardPage;
