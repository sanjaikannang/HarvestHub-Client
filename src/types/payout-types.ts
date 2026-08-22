import { PayoutStatus } from "../utils/enum";

export interface Payout {
    id: string;
    orderId: string;
    farmerId: string;
    grossAmount: number;
    commissionPercentage: number;
    commissionAmount: number;
    netPayoutAmount: number;
    status: PayoutStatus;
    holdReason?: string;
    releasedAt?: string;
}

export interface ListPayoutsResponse {
    success: boolean;
    message: string;
    data?: Payout[];
}

export interface ReleasePayoutResponse {
    success: boolean;
    message: string;
    data?: Payout;
}
