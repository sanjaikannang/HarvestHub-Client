export const order = {
    listMine: () => "/orders/mine",
    list: () => "/orders",
    getById: (id: string) => `/orders/${id}`,
    updateStatus: (id: string) => `/orders/${id}/status`,
    assignDeliveryPartner: (id: string) => `/orders/${id}/assign-delivery-partner`,
};
