import { BiddingOutcome, BiddingSessionStatus } from "../utils/enum";

export interface CurrentHighestBid {
    amount: number;
    bidderId: string;
    bidId: string;
}

export interface BiddingSession {
    id: string;
    productId: string;
    startTime: string;
    originalEndTime: string;
    currentEndTime: string;
    status: BiddingSessionStatus;
    minIncrement: number;
    currentHighestBid?: CurrentHighestBid;
    extensionCount: number;
    winnerId?: string;
    winningBidAmount?: number;
    outcome?: BiddingOutcome;
}

export interface Bid {
    id: string;
    sessionId: string;
    productId: string;
    buyerId: string;
    amount: number;
    placedAt: string;
}

export interface PlaceBidRequest {
    amount: number;
}

export interface BiddingSessionResponse {
    success: boolean;
    message: string;
    data?: BiddingSession;
}

export interface ListBidsResponse {
    success: boolean;
    message: string;
    data?: Bid[];
}
