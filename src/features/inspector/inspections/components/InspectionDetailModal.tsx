import Chip from "../../../../common/ui/Chip";
import Modal from "../../../../common/ui/Modal";
import { formatDate, formatDateTime } from "../../../../utils/date";
import type { Inspection } from "../../../../types/inspection-types";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import ProductNameCell from "./ProductNameCell";

interface InspectionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    inspection?: Inspection;
}

const STAGE_LABELS: Record<string, string> = {
    scheduled: "Scheduled",
    awaiting_decision: "Awaiting Decision",
    decided: "Decided",
};

const STAGE_VARIANTS: Record<string, "blue" | "yellow" | "green"> = {
    scheduled: "blue",
    awaiting_decision: "yellow",
    decided: "green",
};

const InspectionDetailModal = ({ isOpen, onClose, inspection }: InspectionDetailModalProps) => {
    if (!inspection) return null;

    const field = (label: string, value: React.ReactNode) => (
        <div>
            <p className="text-xs text-textTertiary">{label}</p>
            <p className="text-sm text-textPrimary">{value ?? "-"}</p>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Inspection Details" size="lg">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Chip label={STAGE_LABELS[inspection.stage]} variant={STAGE_VARIANTS[inspection.stage]} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {field("Product", <ProductNameCell productId={inspection.productId} />)}
                    {field("Collection Method", formatEnumLabel(inspection.collectionMethod))}
                    {field("Scheduled Date", formatDate(inspection.scheduledDate))}
                    {field("Scheduled Slot", inspection.scheduledSlot)}
                    {inspection.visitedAt && field("Visited At", formatDateTime(inspection.visitedAt))}
                </div>

                {inspection.visitedAt && (
                    <div className="pt-3 border-t border-borderLight">
                        <p className="text-sm font-medium text-textPrimary mb-2">Inspector's Findings</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {field("Verified Quantity", inspection.verifiedQuantity)}
                            {field("Quality Grade", inspection.qualityGrade)}
                            {field("Recommendation", inspection.recommendedVerdict && formatEnumLabel(inspection.recommendedVerdict))}
                        </div>
                        {inspection.conditionNotes && (
                            <div className="mt-2">
                                <p className="text-xs text-textTertiary">Condition Notes</p>
                                <p className="text-sm text-textPrimary">{inspection.conditionNotes}</p>
                            </div>
                        )}
                        {!!inspection.inspectionPhotos?.length && (
                            <div className="flex gap-2 overflow-x-auto mt-2">
                                {inspection.inspectionPhotos.map((url, i) => (
                                    <img key={i} src={url} alt={`Inspection ${i + 1}`} className="h-20 w-20 object-cover border border-borderLight flex-shrink-0" />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {inspection.adminDecision && (
                    <div className="pt-3 border-t border-borderLight">
                        <p className="text-sm font-medium text-textPrimary mb-2">Admin Decision</p>
                        <div className="flex items-center gap-2 mb-2">
                            <Chip label={formatEnumLabel(inspection.adminDecision)} variant={getChipVariant(inspection.adminDecision)} />
                        </div>
                        {inspection.adminDecisionReason && (
                            <p className="text-sm text-textSecondary">{inspection.adminDecisionReason}</p>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default InspectionDetailModal;
