import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { DeliveryPartnerAvailability } from "../../../utils/enum";
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
        updateAvailability: build.mutation<{ success: boolean; message: string; data?: { currentStatus: DeliveryPartnerAvailability } }, { status: DeliveryPartnerAvailability }>({
            query: (data) => ({
                url: api.deliveryPartner.updateAvailability(),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ['my-delivery-partner-profile'],
        }),
    }),
});

export const {
    useGetMyDeliveryPartnerProfileQuery,
    useUpdateAvailabilityMutation,
} = deliveryPartnerProfileApiService;
