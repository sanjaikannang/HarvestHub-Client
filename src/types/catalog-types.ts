import { CollectionMethod, PerishabilityTier, ProductStatus, UnitOfMeasure } from "../utils/enum";

export interface LocaleText {
    en: string;
    ta: string;
}

export interface Subcategory {
    key: string;
    name: LocaleText;
}

export interface Category {
    id: string;
    name: LocaleText;
    perishabilityTier: PerishabilityTier;
    defaultUnitOfMeasure: UnitOfMeasure;
    subcategories: Subcategory[];
    isActive: boolean;
}

export interface CreateCategoryRequest {
    name: LocaleText;
    perishabilityTier: PerishabilityTier;
    defaultUnitOfMeasure: UnitOfMeasure;
    subcategories: Subcategory[];
}

export type UpdateCategoryRequest = Partial<CreateCategoryRequest>;

export interface CategoryResponse {
    success: boolean;
    message: string;
    data?: Category;
}

export interface ListCategoriesResponse {
    success: boolean;
    message: string;
    data?: Category[];
}

export interface Product {
    id: string;
    farmerId: string;
    districtId: string;
    categoryId: string;
    subcategoryKey: string;
    name: string;
    description: string;
    images: string[];
    estimatedQuantity: number;
    unitOfMeasure: UnitOfMeasure;
    verifiedQuantity?: number;
    qualityGrade?: string;
    startingPrice: number;
    finalStartingPrice?: number;
    biddingDate: string;
    biddingStartTime: string;
    biddingEndTime: string;
    collectionMethod: CollectionMethod;
    status: ProductStatus;
    rejectionReason?: string;
    changeRequestNotes?: string;
    inspectionId?: string;
}

// biddingEndTime is never sent — the server always computes it as
// biddingStartTime + 30 minutes (see modules/03-catalog-management).
export interface ProductSubmissionData {
    categoryId: string;
    subcategoryKey: string;
    name: string;
    description: string;
    images: string[];
    estimatedQuantity: number;
    unitOfMeasure: UnitOfMeasure;
    startingPrice: number;
    biddingDate: string;
    biddingStartTime: string;
    collectionMethod: CollectionMethod;
}

export type ProductEditData = Partial<ProductSubmissionData>;

export interface ProductResponse {
    success: boolean;
    message: string;
    data?: Product;
}

export interface ListProductsResponse {
    success: boolean;
    message: string;
    data?: Product[];
}

export interface ListProductsForReviewParams {
    districtId?: string;
    status?: ProductStatus;
}
