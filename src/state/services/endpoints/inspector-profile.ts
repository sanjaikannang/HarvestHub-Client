import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { GetMyProfileResponse } from "../../../types/profile-types";

export const inspectorProfileApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        getMyInspectorProfile: build.query<GetMyProfileResponse, void>({
            query: () => ({
                url: api.inspector.getMyProfile(),
                method: "GET",
            }),
            providesTags: ['my-inspector-profile'],
        }),
    }),
});

export const {
    useGetMyInspectorProfileQuery,
} = inspectorProfileApiService;
