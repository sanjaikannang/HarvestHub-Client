export interface DistrictOverviewEntry {
    id: string;
    name: string;
    state: string;
    districtAdminId?: string;
    isActive: boolean;
    stats: {
        activeFarmers: number;
        activeBuyers: number;
        productsInPipeline: number;
        ordersInProgress: number;
    };
}

export interface SuperAdminDashboardData {
    districts: DistrictOverviewEntry[];
    totalFarmers: number;
    totalBuyers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalCommission: number;
    pendingEscalations: number;
}

export interface SuperAdminDashboardResponse {
    success: boolean;
    message: string;
    data?: SuperAdminDashboardData;
}

export interface DistrictAdminDashboardData {
    districtId: string;
    pendingProductReviews: number;
    pendingInspections: number;
    activeBiddingSessions: number;
    ordersInProgress: number;
    openDisputes: number;
    totalDisputes: number;
}

export interface DistrictAdminDashboardResponse {
    success: boolean;
    message: string;
    data?: DistrictAdminDashboardData;
}
