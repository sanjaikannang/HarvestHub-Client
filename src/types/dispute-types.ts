import { DisputeReason, DisputeStatus } from "../utils/enum";

export interface Dispute {
    id: string;
    orderId: string;
    buyerId: string;
    reason: DisputeReason;
    description: string;
    photos: string[];
    status: DisputeStatus;
    resolvedBy?: string;
    resolutionNotes?: string;
    refundAmount?: number;
    raisedAt: string;
    resolvedAt?: string;
}

export interface RaiseDisputeRequest {
    orderId: string;
    reason: DisputeReason;
    description: string;
    photos?: string[];
}

export interface ResolveDisputeRequest {
    outcome: "reject" | "refund" | "escalate";
    resolutionNotes: string;
    refundAmount?: number;
}

export interface DisputeResponse {
    success: boolean;
    message: string;
    data?: Dispute;
}

export interface ListDisputesResponse {
    success: boolean;
    message: string;
    data?: Dispute[];
}
