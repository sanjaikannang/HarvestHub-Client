export const inspection = {
    schedule: () => "/inspections",
    list: () => "/inspections",
    listMine: () => "/inspections/mine",
    getById: (id: string) => `/inspections/${id}`,
    recordFindings: (id: string) => `/inspections/${id}/findings`,
    decide: (id: string) => `/inspections/${id}/decision`,
};
