import { PaymentStatus } from "../utils/enum";

export interface DeliveryAddress {
    label: string;
    line1: string;
    city: string;
    state: string;
    pincode: string;
}

export interface Payment {
    id: string;
    sessionId: string;
    productId: string;
    buyerId: string;
    amount: number;
    status: PaymentStatus;
    razorpayOrderId?: string;
    paymentWindowExpiresAt: string;
    initiatedAt: string;
    completedAt?: string;
}

export interface CheckoutSummary {
    paymentId: string;
    razorpayOrderId: string;
    razorpayKeyId: string;
    amount: number;
    currency: string;
}

export interface CheckoutRequest {
    deliveryAddress: DeliveryAddress;
}

export interface VerifyPaymentRequest {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}

export interface PaymentResponse {
    success: boolean;
    message: string;
    data?: Payment;
}

export interface ListPaymentsResponse {
    success: boolean;
    message: string;
    data?: Payment[];
}

export interface CheckoutResponse {
    success: boolean;
    message: string;
    data?: CheckoutSummary;
}
