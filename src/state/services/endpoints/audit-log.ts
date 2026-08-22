import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { ListAuditLogsResponse } from "../../../types/audit-log-types";

export const auditLogApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listAuditLogs: build.query<ListAuditLogsResponse, { districtId?: string } | void>({
            query: (params) => ({
                url: api.auditLog.list(),
                method: "GET",
                params: params ?? undefined,
            }),
            providesTags: ["audit-logs"],
        }),
    }),
});

export const {
    useListAuditLogsQuery,
} = auditLogApiService;
