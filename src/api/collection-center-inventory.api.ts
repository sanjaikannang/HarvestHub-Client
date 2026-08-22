export const collectionCenterInventory = {
    list: () => "/collection-center-inventory",
    getById: (id: string) => `/collection-center-inventory/${id}`,
    reserve: (id: string) => `/collection-center-inventory/${id}/reserve`,
    dispatch: (id: string) => `/collection-center-inventory/${id}/dispatch`,
};
