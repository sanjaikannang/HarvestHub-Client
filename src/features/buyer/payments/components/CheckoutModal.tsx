import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../../../common/ui/Modal";
import Button from "../../../../common/ui/Button";
import InputField from "../../../../common/ui/Input";
import { loadRazorpayScript } from "../../../../utils/loadRazorpayScript";
import type { Payment } from "../../../../types/payment-types";
import { useCheckoutMutation, useVerifyPaymentMutation } from "../../../../state/services/endpoints/payment";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    payment: Payment;
}

const EMPTY_ADDRESS = { label: "", line1: "", city: "", state: "", pincode: "" };

const CheckoutModal = ({ isOpen, onClose, payment }: CheckoutModalProps) => {
    const [address, setAddress] = useState(EMPTY_ADDRESS);
    const [touched, setTouched] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [checkout, { isLoading: isCheckingOut }] = useCheckoutMutation();
    const [verifyPayment] = useVerifyPaymentMutation();

    const hasError = (field: keyof typeof address) => touched && !address[field];
    const isFormValid = Object.values(address).every((value) => value.trim().length > 0);

    const handleClose = () => {
        if (isProcessing) return;
        setAddress(EMPTY_ADDRESS);
        setTouched(false);
        onClose();
    };

    const handlePay = async () => {
        setTouched(true);
        if (!isFormValid) return;

        try {
            setIsProcessing(true);
            const checkoutResponse = await checkout({ id: payment.id, data: { deliveryAddress: address } }).unwrap();
            const summary = checkoutResponse.data!;

            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                toast.error("Failed to load Razorpay. Check your connection and try again.");
                setIsProcessing(false);
                return;
            }

            const razorpay = new (window as any).Razorpay({
                key: summary.razorpayKeyId,
                amount: Math.round(summary.amount * 100),
                currency: summary.currency,
                order_id: summary.razorpayOrderId,
                name: "HarvestHub",
                description: "Payment for winning bid",
                handler: async (response: any) => {
                    try {
                        await verifyPayment({
                            id: payment.id,
                            data: {
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                            },
                        }).unwrap();
                        toast.success("Payment successful — order confirmed");
                        handleClose();
                    } catch (err: any) {
                        toast.error(err.data?.message || "Payment verification failed");
                    } finally {
                        setIsProcessing(false);
                    }
                },
                modal: {
                    ondismiss: () => setIsProcessing(false),
                },
                theme: { color: "#16a34a" },
            });

            razorpay.on("payment.failed", () => {
                toast.error("Payment failed — you can retry within the payment window");
                setIsProcessing(false);
            });

            razorpay.open();
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to start checkout");
            setIsProcessing(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Delivery Address & Payment" size="sm">
            <div className="space-y-4">
                <p className="text-sm text-textSecondary">
                    Amount to pay: <span className="font-semibold text-textPrimary">₹{payment.amount}</span>
                </p>

                <InputField
                    id="label" name="label" label="Address Label" placeholder="Home, Farm, etc."
                    value={address.label} onChange={(e) => setAddress({ ...address, label: e.target.value })}
                    error={hasError("label") ? "Required" : undefined} touched={touched} required
                />
                <InputField
                    id="line1" name="line1" label="Address Line" placeholder="Street, area"
                    value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                    error={hasError("line1") ? "Required" : undefined} touched={touched} required
                />
                <div className="grid grid-cols-2 gap-3">
                    <InputField
                        id="city" name="city" label="City"
                        value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        error={hasError("city") ? "Required" : undefined} touched={touched} required
                    />
                    <InputField
                        id="state" name="state" label="State"
                        value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        error={hasError("state") ? "Required" : undefined} touched={touched} required
                    />
                </div>
                <InputField
                    id="pincode" name="pincode" label="Pincode"
                    value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    error={hasError("pincode") ? "Required" : undefined} touched={touched} required
                />

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" size="sm" onClick={handleClose} disabled={isProcessing}>
                        Cancel
                    </Button>
                    <Button variant="primary" size="sm" loading={isCheckingOut || isProcessing} disabled={isCheckingOut || isProcessing} onClick={handlePay}>
                        {isCheckingOut || isProcessing ? "" : "Proceed to Pay"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CheckoutModal;
