export const notification = {
    listMine: () => "/notifications/mine",
    unreadCount: () => "/notifications/unread-count",
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: () => "/notifications/read-all",
};
