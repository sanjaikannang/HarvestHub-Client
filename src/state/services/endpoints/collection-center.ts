import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import {
    CollectionCenterResponse,
    CreateCollectionCenterRequest,
    ListCollectionCentersResponse,
    UpdateCollectionCenterRequest,
} from "../../../types/district-types";

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
        createCollectionCenter: build.mutation<CollectionCenterResponse, CreateCollectionCenterRequest>({
            query: (data) => ({
                url: api.collectionCenter.create(),
                method: "POST",
                data,
            }),
            invalidatesTags: ["collection-centers"],
        }),
        updateCollectionCenter: build.mutation<CollectionCenterResponse, { id: string; data: UpdateCollectionCenterRequest }>({
            query: ({ id, data }) => ({
                url: api.collectionCenter.update(id),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["collection-centers"],
        }),
    }),
});

export const {
    useListCollectionCentersQuery,
    useCreateCollectionCenterMutation,
    useUpdateCollectionCenterMutation,
} = collectionCenterApiService;
