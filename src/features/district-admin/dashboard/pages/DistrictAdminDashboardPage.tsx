import { ClipboardCheck, ClipboardList, Gavel, Truck, ShieldAlert, ShieldQuestion } from "lucide-react";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import StatsCard from "../components/StatsCard";
import { useGetDistrictAdminDashboardQuery } from "../../../../state/services/endpoints/dashboard";

const DistrictAdminDashboardPage = () => {
    const { data, isLoading } = useGetDistrictAdminDashboardQuery();
    const dashboard = data?.data;

    return (
        <>
            <PageHeader>Dashboard</PageHeader>
            <Container>
                <div className="py-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-textPrimary">District Overview</h2>
                        <p className="text-sm text-textSecondary">
                            Pending actions and activity scoped to your own district.
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-textSecondary">Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <StatsCard label="Pending Product Reviews" value={String(dashboard?.pendingProductReviews ?? 0)} icon={ClipboardCheck} />
                            <StatsCard label="Pending Inspections" value={String(dashboard?.pendingInspections ?? 0)} icon={ClipboardList} />
                            <StatsCard label="Active Bidding Sessions" value={String(dashboard?.activeBiddingSessions ?? 0)} icon={Gavel} />
                            <StatsCard label="Orders in Progress" value={String(dashboard?.ordersInProgress ?? 0)} icon={Truck} />
                            <StatsCard label="Open Disputes" value={String(dashboard?.openDisputes ?? 0)} icon={ShieldAlert} />
                            <StatsCard label="Total Disputes" value={String(dashboard?.totalDisputes ?? 0)} icon={ShieldQuestion} />
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default DistrictAdminDashboardPage;
