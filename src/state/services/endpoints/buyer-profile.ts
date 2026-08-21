import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { GetMyProfileResponse } from "../../../types/profile-types";

export const buyerProfileApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        getMyBuyerProfile: build.query<GetMyProfileResponse, void>({
            query: () => ({
                url: api.buyer.getMyProfile(),
                method: "GET",
            }),
            providesTags: ['my-buyer-profile'],
        }),
    }),
});

export const {
    useGetMyBuyerProfileQuery,
} = buyerProfileApiService;
