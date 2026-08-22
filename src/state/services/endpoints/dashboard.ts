import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { DistrictAdminDashboardResponse, SuperAdminDashboardResponse } from "../../../types/dashboard-types";

export const dashboardApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        getSuperAdminDashboard: build.query<SuperAdminDashboardResponse, void>({
            query: () => ({
                url: api.dashboard.superAdmin(),
                method: "GET",
            }),
            providesTags: ["super-admin-dashboard"],
        }),
        getDistrictAdminDashboard: build.query<DistrictAdminDashboardResponse, void>({
            query: () => ({
                url: api.dashboard.districtAdmin(),
                method: "GET",
            }),
            providesTags: ["district-admin-dashboard"],
        }),
    }),
});

export const {
    useGetSuperAdminDashboardQuery,
    useGetDistrictAdminDashboardQuery,
} = dashboardApiService;
