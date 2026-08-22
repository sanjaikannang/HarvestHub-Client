import { useGetProductQuery } from "../../../../state/services/endpoints/product";

const ProductNameCell = ({ productId }: { productId: string }) => {
    const { data, isLoading } = useGetProductQuery(productId);
    if (isLoading) return <span className="text-textTertiary">Loading...</span>;
    return <>{data?.data?.name || "-"}</>;
};

export default ProductNameCell;
