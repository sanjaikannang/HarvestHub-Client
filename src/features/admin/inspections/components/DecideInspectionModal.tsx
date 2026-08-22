import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../../../common/ui/Modal";
import Button from "../../../../common/ui/Button";
import Select from "../../../../common/ui/Select";
import { AdminDecision } from "../../../../utils/enum";
import { toEnumOptions } from "../../../../utils/utils";
import type { Inspection } from "../../../../types/inspection-types";
import { useListCollectionCentersQuery } from "../../../../state/services/endpoints/collection-center";
import { useDecideInspectionMutation } from "../../../../state/services/endpoints/inspection";

interface DecideInspectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    inspection: Inspection;
}

const decisionOptions = toEnumOptions(AdminDecision);

const DecideInspectionModal = ({ isOpen, onClose, inspection }: DecideInspectionModalProps) => {
    const [decision, setDecision] = useState<AdminDecision>(AdminDecision.APPROVED);
    const [reason, setReason] = useState("");
    const [collectionCenterId, setCollectionCenterId] = useState("");
    const [touched, setTouched] = useState(false);

    const { data: collectionCentersData, isLoading: isLoadingCenters } = useListCollectionCentersQuery({ districtId: inspection.districtId });
    const [decideInspection, { isLoading: isDeciding }] = useDecideInspectionMutation();

    const collectionCenterOptions = (collectionCentersData?.data ?? [])
        .filter((c) => c.isActive)
        .map((c) => ({ value: c.id, label: c.name }));

    const needsReason = decision !== AdminDecision.APPROVED;
    const needsCollectionCenter = decision === AdminDecision.APPROVED;
    const reasonError = needsReason && !reason.trim();
    const collectionCenterError = needsCollectionCenter && !collectionCenterId;

    const handleClose = () => {
        setDecision(AdminDecision.APPROVED);
        setReason("");
        setCollectionCenterId("");
        setTouched(false);
        onClose();
    };

    const handleSubmit = async () => {
        setTouched(true);
        if (reasonError || collectionCenterError) return;

        try {
            const response = await decideInspection({
                id: inspection.id,
                data: {
                    decision,
                    ...(needsReason ? { reason: reason.trim() } : {}),
                    ...(needsCollectionCenter ? { collectionCenterId } : {}),
                },
            }).unwrap();

            toast.success(response.message || "Decision recorded successfully");
            handleClose();
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to record decision");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Decide Inspection" size="md">
            <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                        <p className="text-xs text-textTertiary">Verified Quantity</p>
                        <p className="text-textPrimary">{inspection.verifiedQuantity}</p>
                    </div>
                    <div>
                        <p className="text-xs text-textTertiary">Quality Grade</p>
                        <p className="text-textPrimary">{inspection.qualityGrade}</p>
                    </div>
                    <div>
                        <p className="text-xs text-textTertiary">Inspector Recommends</p>
                        <p className="text-textPrimary">{inspection.recommendedVerdict}</p>
                    </div>
                </div>

                <Select
                    id="decision" name="decision" label="Decision"
                    options={decisionOptions} value={decision}
                    onChange={(value) => setDecision(value as AdminDecision)}
                    required
                />

                {needsCollectionCenter && (
                    <Select
                        id="collectionCenterId" name="collectionCenterId" label="Receiving Collection Center"
                        options={collectionCenterOptions} value={collectionCenterId} loading={isLoadingCenters}
                        onChange={(value) => setCollectionCenterId(String(value))}
                        error={collectionCenterError ? "Select a collection center" : undefined}
                        touched={touched} required
                        placeholder={collectionCenterOptions.length ? "Select a collection center" : "No active collection centers in this district"}
                    />
                )}

                {needsReason && (
                    <div>
                        <label className="block text-sm font-medium text-textTertiary mb-2">
                            Reason <span className="text-red-600">*</span>
                        </label>
                        <textarea
                            rows={3}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder={decision === AdminDecision.REJECTED ? "Why is this product being rejected?" : "What needs to change?"}
                            className={`block w-full px-3 py-2 border focus:outline-none text-textTertiary placeholder-borderLight ${reasonError && touched ? "border-red-500" : "border-borderLight"}`}
                        />
                        {reasonError && touched && <p className="text-xs text-red-600 mt-1">A reason is required</p>}
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" size="sm" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant={decision === AdminDecision.REJECTED ? "danger" : "primary"}
                        size="sm"
                        loading={isDeciding}
                        disabled={isDeciding}
                        onClick={handleSubmit}
                    >
                        {isDeciding ? "" : "Confirm Decision"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DecideInspectionModal;
