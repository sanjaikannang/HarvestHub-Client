import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../../../common/ui/Modal";
import Button from "../../../../common/ui/Button";
import InputField from "../../../../common/ui/Input";
import type { NotificationTemplate } from "../../../../types/notification-types";
import { useUpdateNotificationTemplateMutation } from "../../../../state/services/endpoints/notification-template";

interface EditTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    template: NotificationTemplate;
}

const EditTemplateModal = ({ isOpen, onClose, template }: EditTemplateModalProps) => {
    const [enTitle, setEnTitle] = useState(template.translations.en.title);
    const [enMessage, setEnMessage] = useState(template.translations.en.message);
    const [taTitle, setTaTitle] = useState(template.translations.ta.title);
    const [taMessage, setTaMessage] = useState(template.translations.ta.message);

    const [updateTemplate, { isLoading }] = useUpdateNotificationTemplateMutation();

    const handleSubmit = async () => {
        try {
            const response = await updateTemplate({
                id: template.id,
                data: {
                    en: { title: enTitle, message: enMessage },
                    ta: { title: taTitle, message: taMessage },
                },
            }).unwrap();
            toast.success(response.message || "Template updated successfully");
            onClose();
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to update template");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Notification Template" size="md">
            <div className="space-y-4">
                <p className="text-xs text-textTertiary">
                    Use <code>{"{{placeholder}}"}</code> tokens exactly as they appear — they're substituted at send time.
                </p>

                <div className="space-y-3">
                    <p className="text-sm font-semibold text-textPrimary">English</p>
                    <InputField id="enTitle" name="enTitle" label="Title" value={enTitle} onChange={(e) => setEnTitle(e.target.value)} required />
                    <InputField id="enMessage" name="enMessage" label="Message" value={enMessage} onChange={(e) => setEnMessage(e.target.value)} required />
                </div>

                <div className="space-y-3">
                    <p className="text-sm font-semibold text-textPrimary">Tamil</p>
                    <InputField id="taTitle" name="taTitle" label="Title" value={taTitle} onChange={(e) => setTaTitle(e.target.value)} required />
                    <InputField id="taMessage" name="taMessage" label="Message" value={taMessage} onChange={(e) => setTaMessage(e.target.value)} required />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" size="sm" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" size="sm" loading={isLoading} disabled={isLoading} onClick={handleSubmit}>
                        {isLoading ? "" : "Save"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditTemplateModal;
