// Roles derived from HarvestHub-Server/database/users.md and modules/01-auth-user-management.
// SUPER_ADMIN, DISTRICT_ADMIN and INSPECTOR are "thin" roles with no dashboard built yet
// (see the server's src/utils/enum.ts comment) — only SUPER_ADMIN/FARMER/BUYER/DELIVERY_PARTNER
// have a working feature module + dashboard on the client today.
export enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    DISTRICT_ADMIN = "DISTRICT_ADMIN",
    INSPECTOR = "INSPECTOR",
    FARMER = "FARMER",
    BUYER = "BUYER",
    DELIVERY_PARTNER = "DELIVERY_PARTNER",
}

export enum PreferredLanguage {
    EN = "en",
    TA = "ta",
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHERS = "OTHERS",
}

export enum MaritalStatus {
    SINGLE = "SINGLE",
    MARRIED = "MARRIED",
    DIVORCED = "DIVORCED",
    WIDOWED = "WIDOWED",
}

export enum Country {
    INDIA = "INDIA",
}

export enum MediaStatus {
    PENDING_UPLOAD = "PENDING_UPLOAD",
    UPLOADING = "UPLOADING",
    UPLOAD_COMPLETE = "UPLOAD_COMPLETE",
    UPLOAD_FAILED = "UPLOAD_FAILED",
}

// Mirrors HarvestHub-Server/src/utils/enum.ts — see database/categories.md
export enum PerishabilityTier {
    PERISHABLE = "perishable",
    SEMI_PERISHABLE = "semi_perishable",
    NON_PERISHABLE = "non_perishable",
}

export enum UnitOfMeasure {
    KG = "kg",
    QUINTAL = "quintal",
    TON = "ton",
    DOZEN = "dozen",
    BUNDLE = "bundle",
    LITER = "liter",
}

// database/products.md — full target lifecycle. Only submitted/under_review/
// changes_requested/rejected have client screens today (Catalog module, 03);
// the rest are driven by Inspection (04) and Bidding Engine (06), not built yet.
export enum ProductStatus {
    SUBMITTED = "submitted",
    UNDER_REVIEW = "under_review",
    INSPECTION_SCHEDULED = "inspection_scheduled",
    INSPECTED = "inspected",
    APPROVED = "approved",
    REJECTED = "rejected",
    CHANGES_REQUESTED = "changes_requested",
    LISTED = "listed",
    BIDDING_LIVE = "bidding_live",
    SOLD = "sold",
    UNSOLD = "unsold",
}

export enum CollectionMethod {
    DROP_OFF = "drop_off",
    PICKUP_REQUEST = "pickup_request",
}

// database/inspections.md — the inspector's own recommendation
export enum RecommendedVerdict {
    APPROVE = "approve",
    REJECT = "reject",
    REQUEST_CHANGES = "request_changes",
}

// database/inspections.md — the district admin's final, binding call
export enum AdminDecision {
    APPROVED = "approved",
    REJECTED = "rejected",
    CHANGES_REQUESTED = "changes_requested",
}

// database/collection-center-inventory.md — only in_storage/reserved_for_sale/
// dispatched are written today (Inspection module 04 + this module, 05);
// reservation is normally automatic on a successful sale + payment (Bidding
// Engine 06 / Payment Escrow 07, neither built) — exposed as a manual admin
// action until then.
export enum InventoryStatus {
    IN_STORAGE = "in_storage",
    RESERVED_FOR_SALE = "reserved_for_sale",
    DISPATCHED = "dispatched",
}

// database/bidding-sessions.md
export enum BiddingSessionStatus {
    SCHEDULED = "scheduled",
    LIVE = "live",
    ENDED = "ended",
}

export enum BiddingOutcome {
    SOLD = "sold",
    UNSOLD = "unsold",
}

// database/payments.md — the buyer's 15-minute payment window
export enum PaymentStatus {
    INITIATED = "initiated",
    PROCESSING = "processing",
    SUCCESSFUL = "successful",
    FAILED = "failed",
    EXPIRED = "expired",
}

// database/payouts.md — commission-adjusted farmer settlement, released
// manually by an admin until Order & Delivery (08) auto-triggers it
export enum PayoutStatus {
    PENDING = "pending",
    RELEASED = "released",
    ON_HOLD = "on_hold",
    REVERSED = "reversed",
}

// database/delivery-partner-profiles.md — used for auto-assignment's
// least-loaded/available matching
export enum DeliveryPartnerAvailability {
    AVAILABLE = "available",
    BUSY = "busy",
    OFFLINE = "offline",
}

// database/orders.md
export enum DeliveryStatus {
    ORDER_CONFIRMED = "order_confirmed",
    PREPARING_FOR_DISPATCH = "preparing_for_dispatch",
    PICKED_UP = "picked_up",
    IN_TRANSIT = "in_transit",
    OUT_FOR_DELIVERY = "out_for_delivery",
    DELIVERED = "delivered",
}

// database/disputes.md
export enum DisputeReason {
    QUALITY_ISSUE = "quality_issue",
    QUANTITY_MISMATCH = "quantity_mismatch",
    DAMAGED_IN_TRANSIT = "damaged_in_transit",
}

export enum DisputeStatus {
    RAISED = "raised",
    UNDER_REVIEW = "under_review",
    RESOLVED_REFUND = "resolved_refund",
    RESOLVED_REJECTED = "resolved_rejected",
    ESCALATED = "escalated",
}
