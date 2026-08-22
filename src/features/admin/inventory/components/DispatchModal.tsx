import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../../../common/ui/Modal";
import Button from "../../../../common/ui/Button";
import Select from "../../../../common/ui/Select";
import type { InventoryEntry } from "../../../../types/inventory-types";
import { useListDeliveryPartnersQuery } from "../../../../state/services/endpoints/auth";
import { useDispatchInventoryMutation } from "../../../../state/services/endpoints/collection-center-inventory";

interface DispatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    entry: InventoryEntry;
}

const DispatchModal = ({ isOpen, onClose, entry }: DispatchModalProps) => {
    const [deliveryPartnerId, setDeliveryPartnerId] = useState("");
    const [touched, setTouched] = useState(false);

    const { data, isLoading: isLoadingPartners } = useListDeliveryPartnersQuery();
    const [dispatchInventory, { isLoading: isDispatching }] = useDispatchInventoryMutation();

    const options = (data?.data ?? []).map((p) => ({ value: p.id, label: `${p.name} (${p.phone})` }));
    const hasError = touched && !deliveryPartnerId;

    const handleClose = () => {
        setDeliveryPartnerId("");
        setTouched(false);
        onClose();
    };

    const handleSubmit = async () => {
        setTouched(true);
        if (!deliveryPartnerId) return;

        try {
            const response = await dispatchInventory({ id: entry.id, data: { deliveryPartnerId } }).unwrap();
            toast.success(response.message || "Inventory dispatched successfully");
            handleClose();
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to dispatch inventory");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Dispatch to Delivery Partner" size="sm">
            <div className="space-y-4">
                <Select
                    id="deliveryPartnerId" name="deliveryPartnerId" label="Delivery Partner"
                    options={options} value={deliveryPartnerId} loading={isLoadingPartners}
                    onChange={(value) => setDeliveryPartnerId(String(value))}
                    error={hasError ? "Select a delivery partner" : undefined} touched={touched} required
                    placeholder={options.length ? "Select a delivery partner" : "No delivery partners yet"}
                />

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" size="sm" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" size="sm" loading={isDispatching} disabled={isDispatching} onClick={handleSubmit}>
                        {isDispatching ? "" : "Confirm Dispatch"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DispatchModal;
