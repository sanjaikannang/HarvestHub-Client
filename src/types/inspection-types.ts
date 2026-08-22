import { AdminDecision, CollectionMethod, RecommendedVerdict } from "../utils/enum";

export interface Inspection {
    id: string;
    productId: string;
    districtId: string;
    inspectorId: string;
    collectionMethod: CollectionMethod;
    scheduledDate: string;
    scheduledSlot: string;
    visitedAt?: string;
    verifiedQuantity?: number;
    qualityGrade?: string;
    conditionNotes?: string;
    inspectionPhotos?: string[];
    recommendedVerdict?: RecommendedVerdict;
    adminDecision?: AdminDecision;
    adminDecisionReason?: string;
    decidedBy?: string;
    decidedAt?: string;
    // Derived by the server, not stored — 'scheduled' | 'awaiting_decision' | 'decided'
    stage: "scheduled" | "awaiting_decision" | "decided";
}

export interface ScheduleInspectionRequest {
    productId: string;
    inspectorId: string;
    collectionMethod: CollectionMethod;
    scheduledDate: string;
    scheduledSlot: string;
}

export interface RecordFindingsRequest {
    verifiedQuantity: number;
    qualityGrade: string;
    conditionNotes?: string;
    inspectionPhotos?: string[];
    recommendedVerdict: RecommendedVerdict;
}

export interface DecideInspectionRequest {
    decision: AdminDecision;
    reason?: string;
    collectionCenterId?: string;
}

export interface InspectionResponse {
    success: boolean;
    message: string;
    data?: Inspection;
}

export interface ListInspectionsResponse {
    success: boolean;
    message: string;
    data?: Inspection[];
}

export interface ListInspectionsParams {
    districtId?: string;
}
