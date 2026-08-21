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
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApiService;
