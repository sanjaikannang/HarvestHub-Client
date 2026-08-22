import { api } from "../../../api";
import { apiInstance } from "../api-instance";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    LogoutResponse,
    ChangePasswordRequest,
    ChangePasswordResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    CreateInspectorRequest,
    CreateInspectorResponse,
    ListInspectorsResponse,
} from "../../../types/auth-types";

export const authApiService = apiInstance.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => {
                return {
                    url: api.auth.login(),
                    method: "POST",
                    data: credentials,
                };
            },
        }),
        register: build.mutation<RegisterResponse, RegisterRequest>({
            query: (data) => {
                return {
                    url: api.auth.register(),
                    method: "POST",
                    data,
                };
            },
        }),
        logout: build.mutation<LogoutResponse, void>({
            query: () => {
                return {
                    url: api.auth.logout(),
                    method: "POST",
                };
            },
        }),
        changePassword: build.mutation<ChangePasswordResponse, ChangePasswordRequest>({
            query: (data) => {
                return {
                    url: api.auth.changePassword(),
                    method: "POST",
                    data,
                };
            },
        }),
        forgotPassword: build.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
            query: (data) => {
                return {
                    url: api.auth.forgotPassword(),
                    method: "POST",
                    data,
                };
            },
        }),
        resetPassword: build.mutation<ResetPasswordResponse, ResetPasswordRequest>({
            query: (data) => {
                return {
                    url: api.auth.resetPassword(),
                    method: "POST",
                    data,
                };
            },
        }),
        createInspector: build.mutation<CreateInspectorResponse, CreateInspectorRequest>({
            query: (data) => ({
                url: api.auth.createInspector(),
                method: "POST",
                data,
            }),
            invalidatesTags: ["inspectors"],
        }),
        listInspectors: build.query<ListInspectorsResponse, { districtId?: string } | void>({
            query: (params) => ({
                url: api.auth.listInspectors(),
                method: "GET",
                params: params || undefined,
            }),
            providesTags: ["inspectors"],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useCreateInspectorMutation,
    useListInspectorsQuery,
} = authApiService;
