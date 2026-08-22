export const payment = {
    checkout: (id: string) => `/payments/${id}/checkout`,
    verify: (id: string) => `/payments/${id}/verify`,
    getById: (id: string) => `/payments/${id}`,
    listMine: () => "/payments/mine",
};
