import { Users, ShoppingBasket, Package, Truck, IndianRupee, Percent, ShieldAlert } from "lucide-react";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import StatsCard from "../components/StatsCard";
import { useGetMyAdminProfileQuery } from "../../../../state/services/endpoints/admin-profile";
import { useGetSuperAdminDashboardQuery } from "../../../../state/services/endpoints/dashboard";

const AdminDashboardPage = () => {
    const { data: profileData } = useGetMyAdminProfileQuery();
    const profile = profileData?.data;

    const { data, isLoading } = useGetSuperAdminDashboardQuery();
    const dashboard = data?.data;

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
                            Platform-wide activity, performance, and pending actions across all districts.
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-textSecondary">Loading...</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <StatsCard label="Total Farmers" value={String(dashboard?.totalFarmers ?? 0)} icon={Users} />
                                <StatsCard label="Total Buyers" value={String(dashboard?.totalBuyers ?? 0)} icon={ShoppingBasket} />
                                <StatsCard label="Total Products" value={String(dashboard?.totalProducts ?? 0)} icon={Package} />
                                <StatsCard label="Total Orders" value={String(dashboard?.totalOrders ?? 0)} icon={Truck} />
                                <StatsCard label="Total Revenue" value={`₹${dashboard?.totalRevenue ?? 0}`} icon={IndianRupee} />
                                <StatsCard label="Total Commission" value={`₹${dashboard?.totalCommission ?? 0}`} icon={Percent} />
                                <StatsCard label="Pending Escalations" value={String(dashboard?.pendingEscalations ?? 0)} icon={ShieldAlert} />
                            </div>

                            <div>
                                <h3 className="text-md font-semibold text-textPrimary mb-3">Districts Overview</h3>
                                <div className="overflow-x-auto rounded-xl border border-borderLight bg-whiteColor">
                                    <table className="w-full border-collapse">
                                        <thead className="bg-bgSecondary">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">District</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">State</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">Active Farmers</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">Active Buyers</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">Products in Pipeline</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-textSecondary">Orders in Progress</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(dashboard?.districts ?? []).length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="px-4 py-6 text-center text-sm text-textSecondary">No districts yet.</td>
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
