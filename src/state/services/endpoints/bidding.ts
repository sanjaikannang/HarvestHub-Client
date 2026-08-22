import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import {
    BiddingSessionResponse,
    ListBidsResponse,
    PlaceBidRequest,
} from "../../../types/bidding-types";

export const biddingApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        getBiddingSession: build.query<BiddingSessionResponse, string>({
            query: (productId) => ({
                url: api.bidding.getSession(productId),
                method: "GET",
            }),
            providesTags: ["bidding-session"],
        }),
        listBidHistory: build.query<ListBidsResponse, string>({
            query: (productId) => ({
                url: api.bidding.listBidHistory(productId),
                method: "GET",
            }),
            providesTags: ["bid-history"],
        }),
        placeBid: build.mutation<BiddingSessionResponse, { productId: string; data: PlaceBidRequest }>({
            query: ({ productId, data }) => ({
                url: api.bidding.placeBid(productId),
                method: "POST",
                data,
            }),
            invalidatesTags: ["bidding-session", "bid-history", "my-bids"],
        }),
        listMyBids: build.query<ListBidsResponse, void>({
            query: () => ({
                url: api.bidding.listMyBids(),
                method: "GET",
            }),
            providesTags: ["my-bids"],
        }),
    }),
});

export const {
    useGetBiddingSessionQuery,
    useListBidHistoryQuery,
    usePlaceBidMutation,
    useListMyBidsQuery,
} = biddingApiService;
