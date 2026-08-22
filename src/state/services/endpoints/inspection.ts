import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import {
    DecideInspectionRequest,
    InspectionResponse,
    ListInspectionsParams,
    ListInspectionsResponse,
    RecordFindingsRequest,
    ScheduleInspectionRequest,
} from "../../../types/inspection-types";

export const inspectionApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        listInspections: build.query<ListInspectionsResponse, ListInspectionsParams | void>({
            query: (params) => ({
                url: api.inspection.list(),
                method: "GET",
                params: params || undefined,
            }),
            providesTags: ["inspections"],
        }),
        listMyInspections: build.query<ListInspectionsResponse, void>({
            query: () => ({
                url: api.inspection.listMine(),
                method: "GET",
            }),
            providesTags: ["my-inspections"],
        }),
        getInspection: build.query<InspectionResponse, string>({
            query: (id) => ({
                url: api.inspection.getById(id),
                method: "GET",
            }),
            providesTags: ["inspection"],
        }),
        scheduleInspection: build.mutation<InspectionResponse, ScheduleInspectionRequest>({
            query: (data) => ({
                url: api.inspection.schedule(),
                method: "POST",
                data,
            }),
            invalidatesTags: ["inspections", "products-for-review"],
        }),
        recordFindings: build.mutation<InspectionResponse, { id: string; data: RecordFindingsRequest }>({
            query: ({ id, data }) => ({
                url: api.inspection.recordFindings(id),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["my-inspections", "inspections", "inspection"],
        }),
        decideInspection: build.mutation<InspectionResponse, { id: string; data: DecideInspectionRequest }>({
            query: ({ id, data }) => ({
                url: api.inspection.decide(id),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["inspections", "inspection", "products-for-review", "my-products", "product"],
        }),
    }),
});

export const {
    useListInspectionsQuery,
    useListMyInspectionsQuery,
    useGetInspectionQuery,
    useScheduleInspectionMutation,
    useRecordFindingsMutation,
    useDecideInspectionMutation,
} = inspectionApiService;
