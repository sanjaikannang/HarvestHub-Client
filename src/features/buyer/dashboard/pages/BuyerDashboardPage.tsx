import { ShoppingBasket, MapPin, Languages, Phone } from "lucide-react";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import StatsCard from "../components/StatsCard";
import { formatEnumLabel } from "../../../../utils/utils";
import { useGetMyBuyerProfileQuery } from "../../../../state/services/endpoints/buyer-profile";

const BuyerDashboardPage = () => {
    const { data, isLoading } = useGetMyBuyerProfileQuery();
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
                            Browse produce and place bids once the catalog and bidding
                            modules are built out — this dashboard will surface your active
                            bids and order history then.
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-textSecondary">Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard label="Role" value={formatEnumLabel(profile?.role || '-')} icon={ShoppingBasket} />
                            <StatsCard label="Phone" value={profile?.phone || '-'} icon={Phone} />
                            <StatsCard label="Home district" value={profile?.districtId || 'Not set'} icon={MapPin} />
                            <StatsCard label="Language" value={formatEnumLabel(profile?.preferredLanguage || '-')} icon={Languages} />
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default BuyerDashboardPage;
