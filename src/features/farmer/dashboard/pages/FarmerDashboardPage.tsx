import { Sprout, MapPin, Languages, Phone } from "lucide-react";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import StatsCard from "../components/StatsCard";
import { formatEnumLabel } from "../../../../utils/utils";
import { useGetMyFarmerProfileQuery } from "../../../../state/services/endpoints/farmer-profile";

const FarmerDashboardPage = () => {
    const { data, isLoading } = useGetMyFarmerProfileQuery();
    const profile = data?.data;

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
                            Your produce listings, bids received, and payouts will show up
                            here once the catalog and bidding modules are built out.
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-textSecondary">Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard label="Role" value={formatEnumLabel(profile?.role || '-')} icon={Sprout} />
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

export default FarmerDashboardPage;
