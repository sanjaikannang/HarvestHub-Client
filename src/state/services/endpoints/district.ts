import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { ListDistrictsResponse } from "../../../types/district-types";

export const districtApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listDistricts: build.query<ListDistrictsResponse, void>({
            query: () => ({
                url: api.district.list(),
                method: "GET",
            }),
            providesTags: ["districts"],
        }),
    }),
});

export const {
    useListDistrictsQuery,
} = districtApiService;
