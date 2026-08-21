import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import {
    CategoryResponse,
    CreateCategoryRequest,
    ListCategoriesResponse,
    UpdateCategoryRequest,
} from "../../../types/catalog-types";

export const categoryApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listCategories: build.query<ListCategoriesResponse, void>({
            query: () => ({
                url: api.category.list(),
                method: "GET",
            }),
            providesTags: ["categories"],
        }),
        getCategory: build.query<CategoryResponse, string>({
            query: (id) => ({
                url: api.category.getById(id),
                method: "GET",
            }),
            providesTags: ["category"],
        }),
        createCategory: build.mutation<CategoryResponse, CreateCategoryRequest>({
            query: (data) => ({
                url: api.category.create(),
                method: "POST",
                data,
            }),
            invalidatesTags: ["categories"],
        }),
        updateCategory: build.mutation<CategoryResponse, { id: string; data: UpdateCategoryRequest }>({
            query: ({ id, data }) => ({
                url: api.category.update(id),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["categories", "category"],
        }),
        deactivateCategory: build.mutation<CategoryResponse, string>({
            query: (id) => ({
                url: api.category.deactivate(id),
                method: "PATCH",
            }),
            invalidatesTags: ["categories", "category"],
        }),
    }),
});

export const {
    useListCategoriesQuery,
    useGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeactivateCategoryMutation,
} = categoryApiService;
