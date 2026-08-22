import Modal from "./Modal";
import Button from "./Button";
import { useTranslation } from "react-i18next";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting?: boolean;
    title: string;
    message: React.ReactNode;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isDeleting = false, title, message }: DeleteConfirmModalProps) => {
    const { t } = useTranslation();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
        >
            <div className="space-y-6">
                <p className="text-sm text-textSecondary">
                    {message}
                </p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" size="sm" onClick={onClose}>
                        {t('common.cancel')}
                    </Button>
                    <Button variant="danger" size="sm" loading={isDeleting} disabled={isDeleting} onClick={onConfirm}>
                        {isDeleting ? '' : t('common.delete')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmModal;
