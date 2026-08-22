import { ENV } from "../../config/env";
import { axiosBaseQuery } from "./base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const apiInstance = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({ baseUrl: ENV.BASE_URL }),
    endpoints: () => ({}),
    tagTypes: [
        "my-admin-profile",
        "my-farmer-profile",
        "my-buyer-profile",
        "my-delivery-partner-profile",
        "my-inspector-profile",
        "categories",
        "category",
        "my-products",
        "products-for-review",
        "product",
        "inspections",
        "my-inspections",
        "inspection",
        "inspectors",
        "delivery-partners",
        "collection-centers",
        "inventory",
    ],
});
