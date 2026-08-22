import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { ProductStatus } from "../../../utils/enum";
import {
    ListProductsForReviewParams,
    ListProductsResponse,
    ProductEditData,
    ProductResponse,
    ProductSubmissionData,
} from "../../../types/catalog-types";

export const productApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listMyProducts: build.query<ListProductsResponse, ProductStatus | void>({
            query: (status) => ({
                url: api.product.listMine(),
                method: "GET",
                params: status ? { status } : undefined,
            }),
            providesTags: ["my-products"],
        }),
        getProduct: build.query<ProductResponse, string>({
            query: (id) => ({
                url: api.product.getById(id),
                method: "GET",
            }),
            providesTags: ["product"],
        }),
        listProductsForReview: build.query<ListProductsResponse, ListProductsForReviewParams | void>({
            query: (params) => ({
                url: api.product.listForReview(),
                method: "GET",
                params: params || undefined,
            }),
            providesTags: ["products-for-review"],
        }),
        listMarketplace: build.query<ListProductsResponse, void>({
            query: () => ({
                url: api.product.listMarketplace(),
                method: "GET",
            }),
            providesTags: ["marketplace-products"],
        }),
        createProduct: build.mutation<ProductResponse, ProductSubmissionData>({
            query: (data) => ({
                url: api.product.create(),
                method: "POST",
                data,
            }),
            invalidatesTags: ["my-products"],
        }),
        updateProduct: build.mutation<ProductResponse, { id: string; data: ProductEditData }>({
            query: ({ id, data }) => ({
                url: api.product.update(id),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["my-products", "product", "products-for-review"],
        }),
        startReview: build.mutation<ProductResponse, string>({
            query: (id) => ({
                url: api.product.startReview(id),
                method: "PATCH",
            }),
            invalidatesTags: ["products-for-review", "product"],
        }),
        requestChanges: build.mutation<ProductResponse, { id: string; notes: string }>({
            query: ({ id, notes }) => ({
                url: api.product.requestChanges(id),
                method: "PATCH",
                data: { notes },
            }),
            invalidatesTags: ["products-for-review", "product"],
        }),
        rejectProduct: build.mutation<ProductResponse, { id: string; reason: string }>({
            query: ({ id, reason }) => ({
                url: api.product.reject(id),
                method: "PATCH",
                data: { reason },
            }),
            invalidatesTags: ["products-for-review", "product"],
        }),
    }),
});

export const {
    useListMyProductsQuery,
    useGetProductQuery,
    useListProductsForReviewQuery,
    useListMarketplaceQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useStartReviewMutation,
    useRequestChangesMutation,
    useRejectProductMutation,
} = productApiService;
