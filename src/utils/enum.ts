// Roles derived from HarvestHub-Server/database/users.md and modules/01-auth-user-management.
// SUPER_ADMIN, DISTRICT_ADMIN and INSPECTOR are "thin" roles with no dashboard built yet
// (see the server's src/utils/enum.ts comment) — only SUPER_ADMIN/FARMER/BUYER/DELIVERY_PARTNER
// have a working feature module + dashboard on the client today.
export enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    DISTRICT_ADMIN = "DISTRICT_ADMIN",
    INSPECTOR = "INSPECTOR",
    FARMER = "FARMER",
    BUYER = "BUYER",
    DELIVERY_PARTNER = "DELIVERY_PARTNER",
}

export enum PreferredLanguage {
    EN = "en",
    TA = "ta",
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHERS = "OTHERS",
}

export enum MaritalStatus {
    SINGLE = "SINGLE",
    MARRIED = "MARRIED",
    DIVORCED = "DIVORCED",
    WIDOWED = "WIDOWED",
}

export enum Country {
    INDIA = "INDIA",
}

export enum MediaStatus {
    PENDING_UPLOAD = "PENDING_UPLOAD",
    UPLOADING = "UPLOADING",
    UPLOAD_COMPLETE = "UPLOAD_COMPLETE",
    UPLOAD_FAILED = "UPLOAD_FAILED",
}
