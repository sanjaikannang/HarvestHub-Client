import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { ListPayoutsResponse, ReleasePayoutResponse } from "../../../types/payout-types";

export const payoutApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listMyPayouts: build.query<ListPayoutsResponse, void>({
            query: () => ({
                url: api.payout.listMine(),
                method: "GET",
            }),
            providesTags: ["my-payouts"],
        }),
        listPayouts: build.query<ListPayoutsResponse, { districtId?: string } | void>({
            query: (params) => ({
                url: api.payout.list(),
                method: "GET",
                params: params ?? undefined,
            }),
            providesTags: ["payouts"],
        }),
        releasePayout: build.mutation<ReleasePayoutResponse, string>({
            query: (id) => ({
                url: api.payout.release(id),
                method: "PATCH",
            }),
            invalidatesTags: ["payouts", "my-payouts"],
        }),
    }),
});

export const {
    useListMyPayoutsQuery,
    useListPayoutsQuery,
    useReleasePayoutMutation,
} = payoutApiService;
