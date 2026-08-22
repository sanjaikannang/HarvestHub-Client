import { useMemo, useState } from "react";
import Chip from "../../../../common/ui/Chip";
import Button from "../../../../common/ui/Button";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { Accordion, AccordionItem } from "../../../../common/ui/Accordion";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import type { NotificationTemplate } from "../../../../types/notification-types";
import EditTemplateModal from "../components/EditTemplateModal";
import { useListNotificationTemplatesQuery } from "../../../../state/services/endpoints/notification-template";

const NotificationTemplatesPage = () => {
    const { data, isLoading } = useListNotificationTemplatesQuery();
    const templates = useMemo(() => data?.data ?? [], [data]);
    const [editingTemplate, setEditingTemplate] = useState<NotificationTemplate | undefined>(undefined);

    return (
        <>
            <PageHeader>Notification Templates</PageHeader>

            <Container>
                <div className="py-6 max-w-3xl">
                    {isLoading ? (
                        <p className="text-sm text-textSecondary">Loading...</p>
                    ) : (
                        <Accordion>
                            {templates.map((template) => (
                                <AccordionItem
                                    key={template.id}
                                    header={
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-textPrimary">{formatEnumLabel(template.templateKey)}</span>
                                            <Chip label={formatEnumLabel(template.channel)} variant={getChipVariant(template.channel)} />
                                        </div>
                                    }
                                    actions={
                                        <Button variant="outline" size="sm" onClick={() => setEditingTemplate(template)}>
                                            Edit
                                        </Button>
                                    }
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-xs font-semibold text-textTertiary mb-1">English</p>
                                            <p className="font-medium text-textPrimary">{template.translations.en.title}</p>
                                            <p className="text-textSecondary">{template.translations.en.message}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-textTertiary mb-1">Tamil</p>
                                            <p className="font-medium text-textPrimary">{template.translations.ta.title}</p>
                                            <p className="text-textSecondary">{template.translations.ta.message}</p>
                                        </div>
                                    </div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </div>
            </Container>

            {editingTemplate && (
                <EditTemplateModal
                    isOpen={!!editingTemplate}
                    onClose={() => setEditingTemplate(undefined)}
                    template={editingTemplate}
                />
            )}
        </>
    );
};

export default NotificationTemplatesPage;
