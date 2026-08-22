import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { GetSettingsResponse, UpdateSettingsRequest, UpdateSettingsResponse } from "../../../types/platform-settings-types";

export const platformSettingsApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        getSettings: build.query<GetSettingsResponse, void>({
            query: () => ({
                url: api.platformSettings.get(),
                method: "GET",
            }),
            providesTags: ["platform-settings"],
        }),
        updateSettings: build.mutation<UpdateSettingsResponse, UpdateSettingsRequest>({
            query: (data) => ({
                url: api.platformSettings.update(),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["platform-settings"],
        }),
    }),
});

export const {
    useGetSettingsQuery,
    useUpdateSettingsMutation,
} = platformSettingsApiService;
