import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import {
    CheckoutRequest,
    CheckoutResponse,
    ListPaymentsResponse,
    PaymentResponse,
    VerifyPaymentRequest,
} from "../../../types/payment-types";
import { OrderResponse } from "../../../types/order-types";

export const paymentApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listMyPayments: build.query<ListPaymentsResponse, void>({
            query: () => ({
                url: api.payment.listMine(),
                method: "GET",
            }),
            providesTags: ["my-payments"],
        }),
        getPayment: build.query<PaymentResponse, string>({
            query: (id) => ({
                url: api.payment.getById(id),
                method: "GET",
            }),
            providesTags: ["payment"],
        }),
        checkout: build.mutation<CheckoutResponse, { id: string; data: CheckoutRequest }>({
            query: ({ id, data }) => ({
                url: api.payment.checkout(id),
                method: "POST",
                data,
            }),
            invalidatesTags: ["payment", "my-payments"],
        }),
        verifyPayment: build.mutation<OrderResponse, { id: string; data: VerifyPaymentRequest }>({
            query: ({ id, data }) => ({
                url: api.payment.verify(id),
                method: "POST",
                data,
            }),
            invalidatesTags: ["payment", "my-payments", "my-orders"],
        }),
    }),
});

export const {
    useListMyPaymentsQuery,
    useGetPaymentQuery,
    useCheckoutMutation,
    useVerifyPaymentMutation,
} = paymentApiService;
