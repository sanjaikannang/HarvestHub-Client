import { UserRole } from "../utils/enum";

export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            phone: string;
            email?: string;
            role: UserRole;
            isFirstLogin: boolean;
        };
        tokens: {
            accessToken: string;
        }
    };
}

export interface RegisterRequest {
    name: string;
    phone: string;
    email?: string;
    password: string;
    role: UserRole.FARMER | UserRole.BUYER;
    districtId?: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data?: {
        id: string;
        name: string;
        phone: string;
        email?: string;
        role: UserRole;
    };
}

export interface LogoutResponse {
    success: boolean;
    message: string;
}

export interface ChangePasswordRequest {
    identifier: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ChangePasswordResponse {
    success: boolean;
    message: string;
}

export interface ForgotPasswordRequest {
    identifier: string;
}

export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ResetPasswordResponse {
    success: boolean;
    message: string;
}
