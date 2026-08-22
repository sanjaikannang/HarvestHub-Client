import type { ChipVariant } from "../common/ui/Chip";

const formatWord = (word: string): string => {
    if (word === word.toUpperCase()) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    if (word === word.toLowerCase()) return word.charAt(0).toUpperCase() + word.slice(1);
    return word;
};

// Converts an enum value like "SUPER_ADMIN" or "pending_upload" into "Super Admin" / "Pending Upload"
export const formatEnumLabel = (value: string): string => {
    return value.split("_").map(formatWord).join(" ");
};

export const toEnumOptions = <T extends Record<string, string>>(enumObj: T) => {
    return Object.values(enumObj).map((value) => ({ value, label: formatEnumLabel(value) }));
};

// Semantic chip colors for known status-ish enum values — extend this map as
// HarvestHub's own domain statuses (order status, bid status, etc.) get built.
const CHIP_VARIANTS: Record<string, ChipVariant> = {
    ACTIVE: "green",
    APPROVED: "green",
    COMPLETE: "green",
    COMPLETED: "green",
    LISTED: "green",
    SOLD: "green",
    DISPATCHED: "green",
    PENDING: "yellow",
    PENDING_UPLOAD: "yellow",
    UPLOADING: "yellow",
    UNDER_REVIEW: "yellow",
    INSPECTION_SCHEDULED: "yellow",
    SUBMITTED: "blue",
    INSPECTED: "blue",
    BIDDING_LIVE: "blue",
    IN_STORAGE: "blue",
    LIVE: "blue",
    CHANGES_REQUESTED: "orange",
    RESERVED_FOR_SALE: "yellow",
    SCHEDULED: "yellow",
    INACTIVE: "gray",
    UNSOLD: "gray",
    ENDED: "gray",
    SUSPENDED: "red",
    REJECTED: "red",
    FAILED: "red",
    UPLOAD_FAILED: "red",
    INITIATED: "blue",
    PROCESSING: "yellow",
    SUCCESSFUL: "green",
    RELEASED: "green",
    ON_HOLD: "orange",
    REVERSED: "red",
    ORDER_CONFIRMED: "blue",
    PREPARING_FOR_DISPATCH: "yellow",
    PICKED_UP: "yellow",
    IN_TRANSIT: "blue",
    OUT_FOR_DELIVERY: "blue",
    DELIVERED: "green",
    AVAILABLE: "green",
    BUSY: "yellow",
    OFFLINE: "gray",
};

export const getChipVariant = (value: string): ChipVariant => {
    return CHIP_VARIANTS[value.toUpperCase()] || "gray";
};
