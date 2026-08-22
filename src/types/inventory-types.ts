import { InventoryStatus } from "../utils/enum";

export interface InventoryEntry {
    id: string;
    collectionCenterId: string;
    productId: string;
    receivedQuantity: number;
    receivedDate: string;
    status: InventoryStatus;
    reservedAt?: string;
    dispatchedAt?: string;
    deliveryPartnerId?: string;
}

export interface ListInventoryParams {
    collectionCenterId?: string;
    status?: InventoryStatus;
}

export interface DispatchInventoryRequest {
    deliveryPartnerId: string;
}

export interface InventoryResponse {
    success: boolean;
    message: string;
    data?: InventoryEntry;
}

export interface ListInventoryResponse {
    success: boolean;
    message: string;
    data?: InventoryEntry[];
}
