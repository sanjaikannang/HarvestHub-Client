import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../../common/ui/Button";
import InputField from "../../../../common/ui/Input";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "../../../../state/services/endpoints/platform-settings";

const PlatformSettingsPage = () => {
    const { data, isLoading } = useGetSettingsQuery();
    const [updateSettings, { isLoading: isSaving }] = useUpdateSettingsMutation();
    const [commissionPercentage, setCommissionPercentage] = useState("");

    useEffect(() => {
        if (data?.data) {
            setCommissionPercentage(String(data.data.commissionPercentage));
        }
    }, [data]);

    const handleSave = async () => {
        const value = Number(commissionPercentage);
        if (isNaN(value) || value < 0 || value > 100) {
            toast.error("Commission percentage must be between 0 and 100");
            return;
        }

        try {
            const response = await updateSettings({ commissionPercentage: value }).unwrap();
            toast.success(response.message || "Platform settings updated successfully");
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to update platform settings");
        }
    };

    return (
        <>
            <PageHeader>Platform Settings</PageHeader>

            <Container>
                <div className="py-6 max-w-sm">
                    <div className="bg-whiteColor border border-borderLight p-6 space-y-4">
                        <InputField
                            id="commissionPercentage" name="commissionPercentage" type="number"
                            label="Platform Commission (%)" placeholder="5"
                            value={isLoading ? "" : commissionPercentage}
                            onChange={(e) => setCommissionPercentage(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button variant="primary" size="md" fullWidth loading={isSaving} disabled={isSaving || isLoading} onClick={handleSave}>
                            {isSaving ? "" : "Save"}
                        </Button>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default PlatformSettingsPage;
