export interface PlatformSettings {
    commissionPercentage: number;
}

export interface GetSettingsResponse {
    success: boolean;
    message: string;
    data?: PlatformSettings;
}

export interface UpdateSettingsRequest {
    commissionPercentage: number;
}

export interface UpdateSettingsResponse {
    success: boolean;
    message: string;
    data?: PlatformSettings;
}
