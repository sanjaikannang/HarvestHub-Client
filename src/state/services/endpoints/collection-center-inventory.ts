import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import {
    DispatchInventoryRequest,
    InventoryResponse,
    ListInventoryParams,
    ListInventoryResponse,
} from "../../../types/inventory-types";

export const collectionCenterInventoryApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listInventory: build.query<ListInventoryResponse, ListInventoryParams | void>({
            query: (params) => ({
                url: api.collectionCenterInventory.list(),
                method: "GET",
                params: params || undefined,
            }),
            providesTags: ["inventory"],
        }),
        getInventory: build.query<InventoryResponse, string>({
            query: (id) => ({
                url: api.collectionCenterInventory.getById(id),
                method: "GET",
            }),
            providesTags: ["inventory"],
        }),
        reserveInventory: build.mutation<InventoryResponse, string>({
            query: (id) => ({
                url: api.collectionCenterInventory.reserve(id),
                method: "PATCH",
            }),
            invalidatesTags: ["inventory"],
        }),
        dispatchInventory: build.mutation<InventoryResponse, { id: string; data: DispatchInventoryRequest }>({
            query: ({ id, data }) => ({
                url: api.collectionCenterInventory.dispatch(id),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["inventory"],
        }),
    }),
});

export const {
    useListInventoryQuery,
    useGetInventoryQuery,
    useReserveInventoryMutation,
    useDispatchInventoryMutation,
} = collectionCenterInventoryApiService;
