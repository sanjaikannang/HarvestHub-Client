export const category = {
    create: () => "/categories",
    update: (id: string) => `/categories/${id}`,
    deactivate: (id: string) => `/categories/${id}/deactivate`,
    list: () => "/categories",
    getById: (id: string) => `/categories/${id}`,
};
