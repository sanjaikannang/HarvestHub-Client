import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../../../../common/ui/Modal";
import Button from "../../../../../common/ui/Button";
import { useRejectProductMutation, useRequestChangesMutation } from "../../../../../state/services/endpoints/product";

interface ReviewActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    mode: "request-changes" | "reject";
}

const COPY = {
    "request-changes": {
        title: "Request Changes",
        label: "What needs to change?",
        placeholder: "e.g. Please add a clearer photo of the produce",
        emptyError: "Please describe what needs to change",
        successMessage: "Changes requested successfully",
    },
    reject: {
        title: "Reject Product",
        label: "Reason for rejection",
        placeholder: "e.g. Quantity too small to justify a bidding session",
        emptyError: "Please provide a rejection reason",
        successMessage: "Product rejected",
    },
};

const ReviewActionModal = ({ isOpen, onClose, productId, mode }: ReviewActionModalProps) => {
    const [text, setText] = useState("");
    const [touched, setTouched] = useState(false);
    const copy = COPY[mode];

    const [requestChanges, { isLoading: isRequestingChanges }] = useRequestChangesMutation();
    const [rejectProduct, { isLoading: isRejecting }] = useRejectProductMutation();
    const isSubmitting = isRequestingChanges || isRejecting;

    const handleClose = () => {
        setText("");
        setTouched(false);
        onClose();
    };

    const handleSubmit = async () => {
        setTouched(true);
        if (!text.trim()) return;

        try {
            const response = mode === "request-changes"
                ? await requestChanges({ id: productId, notes: text.trim() }).unwrap()
                : await rejectProduct({ id: productId, reason: text.trim() }).unwrap();

            toast.success(response.message || copy.successMessage);
            handleClose();
        } catch (error: any) {
            toast.error(error.data?.message || `Failed to ${mode === "request-changes" ? "request changes" : "reject product"}`);
        }
    };

    const hasError = touched && !text.trim();

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={copy.title} size="sm">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-textTertiary mb-2">
                        {copy.label} <span className="text-red-600">*</span>
                    </label>
                    <textarea
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={() => setTouched(true)}
                        placeholder={copy.placeholder}
                        className={`block w-full px-3 py-2 border rounded-lg focus:outline-none text-textTertiary placeholder-borderLight ${hasError ? "border-red-500" : "border-borderLight"}`}
                    />
                    {hasError && <p className="text-xs text-red-600 mt-1">{copy.emptyError}</p>}
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" size="sm" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant={mode === "reject" ? "danger" : "primary"}
                        size="sm"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? "" : copy.title}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ReviewActionModal;
