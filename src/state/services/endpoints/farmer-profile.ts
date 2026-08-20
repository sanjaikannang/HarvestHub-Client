import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { GetMyProfileResponse } from "../../../types/profile-types";

export const farmerProfileApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        getMyFarmerProfile: build.query<GetMyProfileResponse, void>({
            query: () => ({
                url: api.farmer.getMyProfile(),
                method: "GET",
            }),
            providesTags: ['my-farmer-profile'],
        }),
    }),
});

export const {
    useGetMyFarmerProfileQuery,
} = farmerProfileApiService;
