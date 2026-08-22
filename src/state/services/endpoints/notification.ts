import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import {
    ListNotificationsResponse,
    MarkAllReadResponse,
    MarkReadResponse,
    UnreadCountResponse,
} from "../../../types/notification-types";

export const notificationApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listMyNotifications: build.query<ListNotificationsResponse, void>({
            query: () => ({
                url: api.notification.listMine(),
                method: "GET",
            }),
            providesTags: ["my-notifications"],
        }),
        getUnreadCount: build.query<UnreadCountResponse, void>({
            query: () => ({
                url: api.notification.unreadCount(),
                method: "GET",
            }),
            providesTags: ["unread-count"],
        }),
        markNotificationRead: build.mutation<MarkReadResponse, string>({
            query: (id) => ({
                url: api.notification.markRead(id),
                method: "PATCH",
            }),
            invalidatesTags: ["my-notifications", "unread-count"],
        }),
        markAllNotificationsRead: build.mutation<MarkAllReadResponse, void>({
            query: () => ({
                url: api.notification.markAllRead(),
                method: "PATCH",
            }),
            invalidatesTags: ["my-notifications", "unread-count"],
        }),
    }),
});

export const {
    useListMyNotificationsQuery,
    useGetUnreadCountQuery,
    useMarkNotificationReadMutation,
    useMarkAllNotificationsReadMutation,
} = notificationApiService;
