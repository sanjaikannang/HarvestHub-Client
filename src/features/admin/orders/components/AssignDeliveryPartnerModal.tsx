import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../../../common/ui/Modal";
import Button from "../../../../common/ui/Button";
import Select from "../../../../common/ui/Select";
import type { Order } from "../../../../types/order-types";
import { useListDeliveryPartnersQuery } from "../../../../state/services/endpoints/auth";
import { useAssignDeliveryPartnerMutation } from "../../../../state/services/endpoints/order";

interface AssignDeliveryPartnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order;
}

const AssignDeliveryPartnerModal = ({ isOpen, onClose, order }: AssignDeliveryPartnerModalProps) => {
    const [deliveryPartnerId, setDeliveryPartnerId] = useState(order.deliveryPartnerId ?? "");
    const [touched, setTouched] = useState(false);

    const { data, isLoading: isLoadingPartners } = useListDeliveryPartnersQuery();
    const [assignDeliveryPartner, { isLoading: isAssigning }] = useAssignDeliveryPartnerMutation();

    const options = (data?.data ?? []).map((p) => ({ value: p.id, label: `${p.name} (${p.phone})` }));
    const hasError = touched && !deliveryPartnerId;

    const handleClose = () => {
        setTouched(false);
        onClose();
    };

    const handleSubmit = async () => {
        setTouched(true);
        if (!deliveryPartnerId) return;

        try {
            const response = await assignDeliveryPartner({ id: order.id, data: { deliveryPartnerId } }).unwrap();
            toast.success(response.message || "Delivery partner assigned successfully");
            handleClose();
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to assign delivery partner");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Assign Delivery Partner" size="sm">
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
                    <Button variant="primary" size="sm" loading={isAssigning} disabled={isAssigning} onClick={handleSubmit}>
                        {isAssigning ? "" : "Assign"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AssignDeliveryPartnerModal;
