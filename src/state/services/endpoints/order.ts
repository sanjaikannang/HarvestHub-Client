import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import {
    AssignDeliveryPartnerRequest,
    ListOrdersResponse,
    OrderResponse,
    UpdateOrderStatusRequest,
} from "../../../types/order-types";

export const orderApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listMyOrders: build.query<ListOrdersResponse, void>({
            query: () => ({
                url: api.order.listMine(),
                method: "GET",
            }),
            providesTags: ["my-orders"],
        }),
        listOrders: build.query<ListOrdersResponse, { districtId?: string } | void>({
            query: (params) => ({
                url: api.order.list(),
                method: "GET",
                params: params ?? undefined,
            }),
            providesTags: ["orders"],
        }),
        getOrder: build.query<OrderResponse, string>({
            query: (id) => ({
                url: api.order.getById(id),
                method: "GET",
            }),
            providesTags: ["order"],
        }),
        updateOrderStatus: build.mutation<OrderResponse, { id: string; data: UpdateOrderStatusRequest }>({
            query: ({ id, data }) => ({
                url: api.order.updateStatus(id),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["my-orders", "orders", "order"],
        }),
        assignDeliveryPartner: build.mutation<OrderResponse, { id: string; data: AssignDeliveryPartnerRequest }>({
            query: ({ id, data }) => ({
                url: api.order.assignDeliveryPartner(id),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["orders", "order"],
        }),
    }),
});

export const {
    useListMyOrdersQuery,
    useListOrdersQuery,
    useGetOrderQuery,
    useUpdateOrderStatusMutation,
    useAssignDeliveryPartnerMutation,
} = orderApiService;
