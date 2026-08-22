import { DeliveryStatus } from "../utils/enum";
import type { DeliveryAddress } from "./payment-types";

export interface DeliveryStatusHistoryEntry {
    status: DeliveryStatus;
    timestamp: string;
    updatedBy: string;
}

export interface Order {
    id: string;
    productId: string;
    sessionId: string;
    paymentId: string;
    buyerId: string;
    farmerId: string;
    districtId: string;
    winningBidAmount: number;
    quantity: number;
    totalAmount: number;
    deliveryAddress: DeliveryAddress;
    deliveryPartnerId?: string;
    deliveryStatus: DeliveryStatus;
    deliveryStatusHistory: DeliveryStatusHistoryEntry[];
}

export interface OrderResponse {
    success: boolean;
    message: string;
    data?: Order;
}

export interface ListOrdersResponse {
    success: boolean;
    message: string;
    data?: Order[];
}
