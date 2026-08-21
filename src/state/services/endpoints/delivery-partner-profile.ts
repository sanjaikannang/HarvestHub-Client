import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { GetMyProfileResponse } from "../../../types/profile-types";

export const deliveryPartnerProfileApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        getMyDeliveryPartnerProfile: build.query<GetMyProfileResponse, void>({
            query: () => ({
                url: api.deliveryPartner.getMyProfile(),
                method: "GET",
            }),
            providesTags: ['my-delivery-partner-profile'],
        }),
    }),
});

export const {
    useGetMyDeliveryPartnerProfileQuery,
} = deliveryPartnerProfileApiService;
