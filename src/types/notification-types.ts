export interface Notification {
    id: string;
    type: string;
    locale: string;
    title: string;
    message: string;
    channel: string;
    relatedEntityType?: string;
    relatedEntityId?: string;
    isRead: boolean;
    createdAt: string;
}

export interface ListNotificationsResponse {
    success: boolean;
    message: string;
    data?: Notification[];
}

export interface UnreadCountResponse {
    success: boolean;
    message: string;
    data?: { count: number };
}

export interface MarkReadResponse {
    success: boolean;
    message: string;
    data?: Notification;
}

export interface MarkAllReadResponse {
    success: boolean;
    message: string;
}

export interface TranslationPair {
    title: string;
    message: string;
}

export interface NotificationTemplate {
    id: string;
    templateKey: string;
    channel: string;
    translations: { en: TranslationPair; ta: TranslationPair };
    isActive: boolean;
}

export interface ListTemplatesResponse {
    success: boolean;
    message: string;
    data?: NotificationTemplate[];
}

export interface UpdateTemplateRequest {
    en: TranslationPair;
    ta: TranslationPair;
}

export interface UpdateTemplateResponse {
    success: boolean;
    message: string;
    data?: NotificationTemplate;
}
