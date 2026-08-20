import { PreferredLanguage, UserRole } from "../utils/enum";

// Shared shape — every role's "get my profile" endpoint returns this today,
// since none of the roles have grown a dedicated profile schema yet (see the
// server's src/services/user-service/*/*.service.ts comments).
export interface MyProfileData {
    id: string;
    name: string;
    phone: string;
    email?: string;
    role: UserRole;
    districtId?: string;
    preferredLanguage: PreferredLanguage;
    isPhoneVerified: boolean;
}

export interface GetMyProfileResponse {
    success: boolean;
    message: string;
    data?: MyProfileData;
}

// Generic list-response shapes, worth keeping as every future paginated list
// endpoint (products, orders, bids, ...) will follow this same convention.
export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface BaseApiResponse<T> {
    success: boolean;
    message: string;
    data?: T[];
    pagination?: PaginationMeta;
}

export interface BasePaginationParams {
    page?: number;
    limit?: number;
    search?: string;
}
