import { User, Phone, Mail, MapPin, Languages, CheckCircle2, XCircle } from "lucide-react";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import { formatEnumLabel } from "../../../../utils/utils";
import { useGetMyDeliveryPartnerProfileQuery } from "../../../../state/services/endpoints/delivery-partner-profile";

const DeliveryPartnerProfilePage = () => {
    const { data, isLoading } = useGetMyDeliveryPartnerProfileQuery();
    const profile = data?.data;

    if (isLoading || !profile) {
        return (
            <>
                <PageHeader>My Profile</PageHeader>
                <Container><p className="py-6 text-sm text-textSecondary">Loading...</p></Container>
            </>
        );
    }

    return (
        <>
            <PageHeader>My Profile</PageHeader>
            <Container>
                <div className="py-6 max-w-2xl">
                    <div className="bg-whiteColor rounded-xl border border-borderLight p-6 space-y-4">
                        <div className="flex items-center gap-3 pb-4 border-b border-borderLight">
                            <div className="w-12 h-12 rounded-full bg-primary text-whiteColor flex items-center justify-center font-semibold text-lg">
                                {profile.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold text-textPrimary">{profile.name}</p>
                                <p className="text-sm text-textSecondary">{formatEnumLabel(profile.role)}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-textSecondary">
                                <Phone className="w-4 h-4" /> {profile.phone}
                                {profile.isPhoneVerified ? (
                                    <CheckCircle2 className="w-4 h-4 text-success" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-textDisabled" />
                                )}
                            </div>
                            {profile.email && (
                                <div className="flex items-center gap-2 text-textSecondary">
                                    <Mail className="w-4 h-4" /> {profile.email}
                                </div>
                            )}
                            <div className="flex items-center gap-2 text-textSecondary">
                                <MapPin className="w-4 h-4" /> {profile.districtId || 'Not set'}
                            </div>
                            <div className="flex items-center gap-2 text-textSecondary">
                                <Languages className="w-4 h-4" /> {formatEnumLabel(profile.preferredLanguage)}
                            </div>
                            <div className="flex items-center gap-2 text-textSecondary">
                                <User className="w-4 h-4" /> {profile.id}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default DeliveryPartnerProfilePage;
