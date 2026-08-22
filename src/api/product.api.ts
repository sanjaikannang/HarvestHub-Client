export const product = {
    create: () => "/products",
    update: (id: string) => `/products/${id}`,
    listMine: () => "/products/mine",
    listMarketplace: () => "/products/marketplace",
    getById: (id: string) => `/products/${id}`,
    listForReview: () => "/products",
    startReview: (id: string) => `/products/${id}/start-review`,
    requestChanges: (id: string) => `/products/${id}/request-changes`,
    reject: (id: string) => `/products/${id}/reject`,
};
