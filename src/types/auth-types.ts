import { PreferredLanguage, UserRole } from "../utils/enum";

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
            preferredLanguage: PreferredLanguage;
        };
        tokens: {
            accessToken: string;
        }
    };
}

export interface UpdateLanguageRequest {
    preferredLanguage: PreferredLanguage;
}

export interface UpdateLanguageResponse {
    success: boolean;
    message: string;
    data?: { preferredLanguage: PreferredLanguage };
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

export interface CreateInspectorRequest {
    name: string;
    phone: string;
    email?: string;
    password: string;
}

export interface CreateInspectorResponse {
    success: boolean;
    message: string;
    data?: {
        id: string;
        name: string;
        phone: string;
        email?: string;
        role: string;
        districtId?: string;
    };
}

export interface InspectorSummary {
    id: string;
    name: string;
    phone: string;
    email?: string;
    districtId?: string;
}

export interface ListInspectorsResponse {
    success: boolean;
    message: string;
    data?: InspectorSummary[];
}

export interface CreateDeliveryPartnerRequest {
    name: string;
    phone: string;
    email?: string;
    password: string;
    districtsServiced: string[];
    vehicleType: string;
    vehicleNumber: string;
    capacityKg: number;
}

export interface CreateDeliveryPartnerResponse {
    success: boolean;
    message: string;
    data?: {
        id: string;
        name: string;
        phone: string;
        email?: string;
        role: string;
    };
}

export interface DeliveryPartnerSummary {
    id: string;
    name: string;
    phone: string;
    email?: string;
}

export interface ListDeliveryPartnersResponse {
    success: boolean;
    message: string;
    data?: DeliveryPartnerSummary[];
}
