// Minimal slice of the District Management module's (02) types — just enough
// to power the collection-center picker in the Inspection decision flow. Full
// district/collection-center CRUD screens aren't built on the client yet.
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
