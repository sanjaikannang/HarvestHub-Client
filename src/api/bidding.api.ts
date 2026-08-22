export const bidding = {
    getSession: (productId: string) => `/bidding-sessions/${productId}`,
    listBidHistory: (productId: string) => `/bidding-sessions/${productId}/bids`,
    placeBid: (productId: string) => `/bidding-sessions/${productId}/bids`,
    listMyBids: () => "/bids/mine",
};
