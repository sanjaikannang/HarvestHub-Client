export interface CollectionCenterAddress {
    line1: string;
    city: string;
    state: string;
    pincode: string;
}

export interface CollectionCenter {
    id: string;
    districtId: string;
    name: string;
    address: CollectionCenterAddress;
    contactPhone: string;
    capacityKg?: number;
    isActive: boolean;
}

export interface ListCollectionCentersResponse {
    success: boolean;
    message: string;
    data?: CollectionCenter[];
}

export interface CollectionCenterResponse {
    success: boolean;
    message: string;
    data: CollectionCenter;
}

export interface CreateCollectionCenterRequest {
    districtId: string;
    name: string;
    address: CollectionCenterAddress;
    contactPhone: string;
    capacityKg?: number;
}

export interface UpdateCollectionCenterRequest {
    name?: string;
    address?: CollectionCenterAddress;
    contactPhone?: string;
    capacityKg?: number;
    isActive?: boolean;
}

export interface District {
    id: string;
    name: string;
    state: string;
    districtAdminId?: string;
    isActive: boolean;
}

export interface ListDistrictsResponse {
    success: boolean;
    message: string;
    data?: District[];
}
