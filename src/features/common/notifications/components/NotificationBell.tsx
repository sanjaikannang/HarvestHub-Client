import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../../../utils/date";
import { getItemFromStorage } from "../../../../utils/storage";
import { useNotificationSocket } from "../hooks/useNotificationSocket";
import {
    useGetUnreadCountQuery,
    useListMyNotificationsQuery,
    useMarkAllNotificationsReadMutation,
    useMarkNotificationReadMutation,
} from "../../../../state/services/endpoints/notification";

const NotificationBell = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const userId = getItemFromStorage<{ id: string }>({ key: "user" })?.id;

    const { data: countData, refetch: refetchCount } = useGetUnreadCountQuery();
    const { data: listData, refetch: refetchList } = useListMyNotificationsQuery(undefined, { skip: !isOpen });
    const [markRead] = useMarkNotificationReadMutation();
    const [markAllRead, { isLoading: isMarkingAll }] = useMarkAllNotificationsReadMutation();

    const unreadCount = countData?.data?.count ?? 0;
    const notifications = listData?.data ?? [];

    useNotificationSocket(userId, () => {
        refetchCount();
        if (isOpen) refetchList();
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleItemClick = (id: string, isRead: boolean) => {
        if (!isRead) markRead(id);
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative flex items-center justify-center h-9 w-9 rounded-full hover:bg-bgSecondary transition-colors cursor-pointer"
                aria-label={t('notifications.title')}
            >
                <Bell className="w-5 h-5 text-textSecondary" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-hidden flex flex-col rounded-xl border border-borderLight bg-whiteColor shadow-lg z-50">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-borderLight flex-shrink-0">
                        <p className="text-sm font-semibold text-textPrimary">{t('notifications.title')}</p>
                        {unreadCount > 0 && (
                            <button
                                onClick={() => markAllRead()}
                                disabled={isMarkingAll}
                                className="flex items-center gap-1 text-xs text-primary hover:underline cursor-pointer disabled:opacity-50"
                            >
                                <CheckCheck className="w-3.5 h-3.5" /> {t('notifications.markAllRead')}
                            </button>
                        )}
                    </div>

                    <div className="overflow-y-auto no-scrollbar">
                        {notifications.length === 0 ? (
                            <p className="text-sm text-textTertiary text-center py-8">{t('notifications.empty')}</p>
                        ) : (
                            notifications.map((notif) => (
                                <button
                                    key={notif.id}
                                    onClick={() => handleItemClick(notif.id, notif.isRead)}
                                    className={`w-full text-left px-4 py-3 border-b border-borderLight last:border-b-0 transition-colors cursor-pointer hover:bg-bgSecondary ${notif.isRead ? "" : "bg-primaryLighter/40"
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <p className={`text-sm ${notif.isRead ? "text-textSecondary" : "text-textPrimary font-medium"}`}>
                                            {notif.title}
                                        </p>
                                        {!notif.isRead && <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                                    </div>
                                    <p className="text-xs text-textSecondary mt-1 line-clamp-2">{notif.message}</p>
                                    <p className="text-[11px] text-textTertiary mt-1">{formatDateTime(notif.createdAt)}</p>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
