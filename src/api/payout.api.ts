export const payout = {
    listMine: () => "/payouts/mine",
    list: () => "/payouts",
    release: (id: string) => `/payouts/${id}/release`,
};
