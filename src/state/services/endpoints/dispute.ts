import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { DisputeStatus } from "../../../utils/enum";
import {
    DisputeResponse,
    ListDisputesResponse,
    RaiseDisputeRequest,
    ResolveDisputeRequest,
} from "../../../types/dispute-types";

export const disputeApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        raiseDispute: build.mutation<DisputeResponse, RaiseDisputeRequest>({
            query: (data) => ({
                url: api.dispute.raise(),
                method: "POST",
                data,
            }),
            invalidatesTags: ["my-disputes", "my-orders"],
        }),
        listMyDisputes: build.query<ListDisputesResponse, void>({
            query: () => ({
                url: api.dispute.listMine(),
                method: "GET",
            }),
            providesTags: ["my-disputes"],
        }),
        listDisputes: build.query<ListDisputesResponse, { districtId?: string; status?: DisputeStatus } | void>({
            query: (params) => ({
                url: api.dispute.list(),
                method: "GET",
                params: params ?? undefined,
            }),
            providesTags: ["disputes"],
        }),
        getDispute: build.query<DisputeResponse, string>({
            query: (id) => ({
                url: api.dispute.getById(id),
                method: "GET",
            }),
            providesTags: ["dispute"],
        }),
        startDisputeReview: build.mutation<DisputeResponse, string>({
            query: (id) => ({
                url: api.dispute.startReview(id),
                method: "PATCH",
            }),
            invalidatesTags: ["disputes", "dispute"],
        }),
        resolveDispute: build.mutation<DisputeResponse, { id: string; data: ResolveDisputeRequest }>({
            query: ({ id, data }) => ({
                url: api.dispute.resolve(id),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["disputes", "dispute", "my-disputes"],
        }),
    }),
});

export const {
    useRaiseDisputeMutation,
    useListMyDisputesQuery,
    useListDisputesQuery,
    useGetDisputeQuery,
    useStartDisputeReviewMutation,
    useResolveDisputeMutation,
} = disputeApiService;
