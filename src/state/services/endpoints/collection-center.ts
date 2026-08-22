import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { ListCollectionCentersResponse } from "../../../types/district-types";

export const collectionCenterApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listCollectionCenters: build.query<ListCollectionCentersResponse, { districtId?: string } | void>({
            query: (params) => ({
                url: api.collectionCenter.list(),
                method: "GET",
                params: params || undefined,
            }),
            providesTags: ["collection-centers"],
        }),
    }),
});

export const {
    useListCollectionCentersQuery,
} = collectionCenterApiService;
