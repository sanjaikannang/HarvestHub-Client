import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../../../common/ui/Modal";
import Select from "../../../../common/ui/Select";
import Button from "../../../../common/ui/Button";
import { DisputeReason } from "../../../../utils/enum";
import { formatEnumLabel } from "../../../../utils/utils";
import ImageUrlListField from "../../../../common/ui/ImageUrlListField";
import { useRaiseDisputeMutation } from "../../../../state/services/endpoints/dispute";

interface RaiseDisputeModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
}

const REASON_OPTIONS = Object.values(DisputeReason).map((value) => ({ value, label: formatEnumLabel(value) }));

const RaiseDisputeModal = ({ isOpen, onClose, orderId }: RaiseDisputeModalProps) => {
    const [reason, setReason] = useState<DisputeReason | "">("");
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState<string[]>([]);
    const [touched, setTouched] = useState(false);

    const [raiseDispute, { isLoading }] = useRaiseDisputeMutation();

    const isDescriptionValid = description.trim().length > 0;

    const handleClose = () => {
        setReason("");
        setDescription("");
        setPhotos([]);
        setTouched(false);
        onClose();
    };

    const handleSubmit = async () => {
        setTouched(true);
        if (!reason || !isDescriptionValid) return;

        try {
            const response = await raiseDispute({
                orderId,
                reason,
                description: description.trim(),
                photos: photos.filter((url) => url.trim().length > 0),
            }).unwrap();
            toast.success(response.message || "Dispute raised successfully");
            handleClose();
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to raise dispute");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Raise a Dispute" size="sm">
            <div className="space-y-4">
                <Select
                    id="reason" name="reason" label="Reason"
                    options={REASON_OPTIONS} value={reason}
                    onChange={(value) => setReason(value as DisputeReason)}
                    error={touched && !reason ? "Select a reason" : undefined} touched={touched} required
                    placeholder="Select a reason"
                />

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-textTertiary mb-2">
                        Description<span className="text-red-600 ml-1">*</span>
                    </label>
                    <textarea
                        id="description" name="description" rows={4}
                        value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the issue in detail"
                        className={`block w-full px-3 py-2 border rounded-lg focus:outline-none duration-200 text-textTertiary placeholder-borderLight ${touched && !isDescriptionValid ? "border-red-500" : "border-borderLight"
                            }`}
                    />
                    {touched && !isDescriptionValid && <p className="text-xs text-red-600 mt-1">Description is required</p>}
                </div>

                <ImageUrlListField images={photos} onChange={setPhotos} label="Photos (optional)" required={false} addButtonLabel="Add Photo URL" />

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" size="sm" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" size="sm" loading={isLoading} disabled={isLoading} onClick={handleSubmit}>
                        {isLoading ? "" : "Submit Dispute"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default RaiseDisputeModal;
