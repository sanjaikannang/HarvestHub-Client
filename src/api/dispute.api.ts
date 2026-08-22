export const dispute = {
    raise: () => "/disputes",
    listMine: () => "/disputes/mine",
    list: () => "/disputes",
    startReview: (id: string) => `/disputes/${id}/review`,
    resolve: (id: string) => `/disputes/${id}/resolve`,
    getById: (id: string) => `/disputes/${id}`,
};
