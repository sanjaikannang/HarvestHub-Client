import Chip from "../../../../../common/ui/Chip";
import Modal from "../../../../../common/ui/Modal";
import { formatDateTime } from "../../../../../utils/date";
import type { Category, Product } from "../../../../../types/catalog-types";
import { formatEnumLabel, getChipVariant } from "../../../../../utils/utils";

interface ProductDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product;
    category?: Category;
}

const ProductDetailModal = ({ isOpen, onClose, product, category }: ProductDetailModalProps) => {
    if (!product) return null;

    const subcategory = category?.subcategories.find((s) => s.key === product.subcategoryKey);

    const field = (label: string, value: React.ReactNode) => (
        <div>
            <p className="text-xs text-textTertiary">{label}</p>
            <p className="text-sm text-textPrimary">{value ?? "-"}</p>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={product.name} size="lg">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Chip label={formatEnumLabel(product.status)} variant={getChipVariant(product.status)} />
                </div>

                {product.images.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto">
                        {product.images.map((url, i) => (
                            <img key={i} src={url} alt={`${product.name} ${i + 1}`} className="h-24 w-24 object-cover border border-borderLight flex-shrink-0" />
                        ))}
                    </div>
                )}

                <div>
                    <p className="text-xs text-textTertiary">Description</p>
                    <p className="text-sm text-textPrimary">{product.description}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {field("Category", category?.name.en)}
                    {field("Subcategory", subcategory?.name.en || product.subcategoryKey)}
                    {field("Estimated Quantity", `${product.estimatedQuantity} ${product.unitOfMeasure}`)}
                    {field("Starting Price", `₹${product.startingPrice} / ${product.unitOfMeasure}`)}
                    {field("Collection Method", formatEnumLabel(product.collectionMethod))}
                    {field("Bidding Starts", formatDateTime(product.biddingStartTime))}
                    {field("Bidding Ends", formatDateTime(product.biddingEndTime))}
                    {product.verifiedQuantity !== undefined && field("Verified Quantity", `${product.verifiedQuantity} ${product.unitOfMeasure}`)}
                    {product.qualityGrade && field("Quality Grade", product.qualityGrade)}
                </div>

                {product.rejectionReason && (
                    <div className="p-3 bg-red-50 border border-red-100">
                        <p className="text-xs font-medium text-red-700">Rejection Reason</p>
                        <p className="text-sm text-red-700">{product.rejectionReason}</p>
                    </div>
                )}

                {product.changeRequestNotes && (
                    <div className="p-3 bg-orange-50 border border-orange-100">
                        <p className="text-xs font-medium text-orange-700">Requested Changes</p>
                        <p className="text-sm text-orange-700">{product.changeRequestNotes}</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ProductDetailModal;
