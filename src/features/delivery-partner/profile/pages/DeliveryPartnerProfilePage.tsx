import toast from "react-hot-toast";
import { User, Phone, Mail, MapPin, Languages, CheckCircle2, XCircle, Truck, Package } from "lucide-react";
import Chip from "../../../../common/ui/Chip";
import Button from "../../../../common/ui/Button";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Container } from "../../../../common/ui/Container";
import { DeliveryPartnerAvailability } from "../../../../utils/enum";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import { useGetMyDeliveryPartnerProfileQuery, useUpdateAvailabilityMutation } from "../../../../state/services/endpoints/delivery-partner-profile";

const AVAILABILITY_OPTIONS = [
    DeliveryPartnerAvailability.AVAILABLE,
    DeliveryPartnerAvailability.BUSY,
    DeliveryPartnerAvailability.OFFLINE,
];

const DeliveryPartnerProfilePage = () => {
    const { data, isLoading } = useGetMyDeliveryPartnerProfileQuery();
    const profile = data?.data;
    const [updateAvailability, { isLoading: isUpdatingAvailability }] = useUpdateAvailabilityMutation();

    const handleAvailabilityChange = async (status: DeliveryPartnerAvailability) => {
        try {
            const response = await updateAvailability({ status }).unwrap();
            toast.success(response.message || "Availability updated");
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to update availability");
        }
    };

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
                            {profile.vehicleType && (
                                <div className="flex items-center gap-2 text-textSecondary">
                                    <Truck className="w-4 h-4" /> {formatEnumLabel(profile.vehicleType)} — {profile.vehicleNumber}
                                </div>
                            )}
                            {profile.capacityKg !== undefined && (
                                <div className="flex items-center gap-2 text-textSecondary">
                                    <Package className="w-4 h-4" /> Capacity: {profile.capacityKg} kg
                                </div>
                            )}
                            {profile.activeOrderCount !== undefined && (
                                <div className="flex items-center gap-2 text-textSecondary">
                                    Active Orders: {profile.activeOrderCount}
                                </div>
                            )}
                        </div>
                    </div>

                    {profile.currentStatus && (
                        <div className="bg-whiteColor rounded-xl border border-borderLight p-6 space-y-3 mt-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-textPrimary">Availability</p>
                                <Chip label={formatEnumLabel(profile.currentStatus)} variant={getChipVariant(profile.currentStatus)} />
                            </div>
                            <div className="flex gap-2">
                                {AVAILABILITY_OPTIONS.map((status) => (
                                    <Button
                                        key={status}
                                        variant={profile.currentStatus === status ? "primary" : "outline"}
                                        size="sm"
                                        disabled={isUpdatingAvailability || profile.currentStatus === status}
                                        onClick={() => handleAvailabilityChange(status)}
                                    >
                                        {formatEnumLabel(status)}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default DeliveryPartnerProfilePage;
