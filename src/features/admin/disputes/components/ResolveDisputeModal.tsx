import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../../../common/ui/Modal";
import Select from "../../../../common/ui/Select";
import Button from "../../../../common/ui/Button";
import InputField from "../../../../common/ui/Input";
import type { Dispute } from "../../../../types/dispute-types";
import { useResolveDisputeMutation } from "../../../../state/services/endpoints/dispute";

interface ResolveDisputeModalProps {
    isOpen: boolean;
    onClose: () => void;
    dispute: Dispute;
}

const OUTCOME_OPTIONS = [
    { value: "reject", label: "Reject" },
    { value: "refund", label: "Approve Refund" },
];

const ResolveDisputeModal = ({ isOpen, onClose, dispute }: ResolveDisputeModalProps) => {
    const [outcome, setOutcome] = useState<"reject" | "refund" | "">("");
    const [resolutionNotes, setResolutionNotes] = useState("");
    const [refundAmount, setRefundAmount] = useState("");
    const [touched, setTouched] = useState(false);

    const [resolveDispute, { isLoading }] = useResolveDisputeMutation();

    const isNotesValid = resolutionNotes.trim().length > 0;
    const isRefundValid = outcome !== "refund" || (Number(refundAmount) > 0);

    const handleClose = () => {
        setOutcome("");
        setResolutionNotes("");
        setRefundAmount("");
        setTouched(false);
        onClose();
    };

    const handleSubmit = async () => {
        setTouched(true);
        if (!outcome || !isNotesValid || !isRefundValid) return;

        try {
            const response = await resolveDispute({
                id: dispute.id,
                data: {
                    outcome,
                    resolutionNotes: resolutionNotes.trim(),
                    refundAmount: outcome === "refund" ? Number(refundAmount) : undefined,
                },
            }).unwrap();
            toast.success(response.message || "Dispute resolved successfully");
            handleClose();
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to resolve dispute");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Resolve Dispute" size="sm">
            <div className="space-y-4">
                <div className="bg-bgSecondary rounded-lg p-3 text-sm">
                    <p className="font-medium text-textPrimary">{dispute.description}</p>
                </div>

                <Select
                    id="outcome" name="outcome" label="Outcome"
                    options={OUTCOME_OPTIONS} value={outcome}
                    onChange={(value) => setOutcome(value as "reject" | "refund")}
                    error={touched && !outcome ? "Select an outcome" : undefined} touched={touched} required
                    placeholder="Select an outcome"
                />

                {outcome === "refund" && (
                    <InputField
                        id="refundAmount" name="refundAmount" type="number" label="Refund Amount (₹)"
                        value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)}
                        error={touched && !isRefundValid ? "Enter a valid refund amount" : undefined} touched={touched} required
                    />
                )}

                <div>
                    <label htmlFor="resolutionNotes" className="block text-sm font-medium text-textTertiary mb-2">
                        Resolution Notes<span className="text-red-600 ml-1">*</span>
                    </label>
                    <textarea
                        id="resolutionNotes" name="resolutionNotes" rows={3}
                        value={resolutionNotes} onChange={(e) => setResolutionNotes(e.target.value)}
                        placeholder="Explain the decision"
                        className={`block w-full px-3 py-2 border rounded-lg focus:outline-none duration-200 text-textTertiary placeholder-borderLight ${touched && !isNotesValid ? "border-red-500" : "border-borderLight"
                            }`}
                    />
                    {touched && !isNotesValid && <p className="text-xs text-red-600 mt-1">Resolution notes are required</p>}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" size="sm" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" size="sm" loading={isLoading} disabled={isLoading} onClick={handleSubmit}>
                        {isLoading ? "" : "Submit"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ResolveDisputeModal;
