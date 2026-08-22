import { useParams } from "react-router-dom";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import BiddingSessionPanel from "../../../bidding/components/BiddingSessionPanel";
import { useGetProductQuery } from "../../../../state/services/endpoints/product";

const ProductBiddingPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetProductQuery(id!);
    const product = data?.data;

    if (isLoading || !product) {
        return (
            <>
                <PageHeader>Product</PageHeader>
                <Container><p className="py-6 text-sm text-textSecondary">Loading...</p></Container>
            </>
        );
    }

    return (
        <>
            <PageHeader>{product.name}</PageHeader>
            <Container>
                <div className="py-6 max-w-3xl space-y-4">
                    <div className="bg-whiteColor border border-borderLight p-6 space-y-3">
                        {product.images.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto">
                                {product.images.map((url, i) => (
                                    <img key={i} src={url} alt={`${product.name} ${i + 1}`} className="h-28 w-28 object-cover border border-borderLight flex-shrink-0" />
                                ))}
                            </div>
                        )}
                        <p className="text-sm text-textSecondary">{product.description}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-xs text-textTertiary">Quantity</p>
                                <p className="text-textPrimary">{product.verifiedQuantity ?? product.estimatedQuantity} {product.unitOfMeasure}</p>
                            </div>
                            {product.qualityGrade && (
                                <div>
                                    <p className="text-xs text-textTertiary">Quality Grade</p>
                                    <p className="text-textPrimary">{product.qualityGrade}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <BiddingSessionPanel product={product} canBid />
                </div>
            </Container>
        </>
    );
};

export default ProductBiddingPage;
