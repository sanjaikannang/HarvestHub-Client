import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import { ListTemplatesResponse, UpdateTemplateRequest, UpdateTemplateResponse } from "../../../types/notification-types";

export const notificationTemplateApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listNotificationTemplates: build.query<ListTemplatesResponse, void>({
            query: () => ({
                url: api.notificationTemplate.list(),
                method: "GET",
            }),
            providesTags: ["notification-templates"],
        }),
        updateNotificationTemplate: build.mutation<UpdateTemplateResponse, { id: string; data: UpdateTemplateRequest }>({
            query: ({ id, data }) => ({
                url: api.notificationTemplate.update(id),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["notification-templates"],
        }),
    }),
});

export const {
    useListNotificationTemplatesQuery,
    useUpdateNotificationTemplateMutation,
} = notificationTemplateApiService;
