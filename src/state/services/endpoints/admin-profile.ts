import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { GetMyProfileResponse } from "../../../types/profile-types";

export const adminProfileApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        getMyAdminProfile: build.query<GetMyProfileResponse, void>({
            query: () => ({
                url: api.admin.getMyProfile(),
                method: "GET",
            }),
            providesTags: ['my-admin-profile'],
        }),
    }),
});

export const {
    useGetMyAdminProfileQuery,
} = adminProfileApiService;
