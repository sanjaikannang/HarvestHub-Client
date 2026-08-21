import { useMemo } from "react";
import { Plus } from "lucide-react";
import Chip from "../../../../common/ui/Chip";
import Button from "../../../../common/ui/Button";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { formatDate } from "../../../../utils/date";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import type { Product } from "../../../../types/catalog-types";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import { useListMyProductsQuery } from "../../../../state/services/endpoints/product";

const MyProductsPage = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useListMyProductsQuery();
    const products = useMemo(() => data?.data ?? [], [data]);

    const columns: ColumnDef<Product, unknown>[] = [
        { header: "Product", cell: ({ row }) => row.original.name },
        { header: "Quantity (Est.)", cell: ({ row }) => `${row.original.estimatedQuantity} ${row.original.unitOfMeasure}` },
        { header: "Starting Price", cell: ({ row }) => `₹${row.original.startingPrice}` },
        { header: "Bidding Date", cell: ({ row }) => formatDate(row.original.biddingDate) },
        {
            header: "Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.status)} variant={getChipVariant(row.original.status)} />,
        },
    ];

    return (
        <>
            <PageHeader>
                <div className="flex items-center justify-between">
                    <span>My Products</span>
                    <Button variant="primary" size="sm" icon={Plus} onClick={() => navigate("/farmer/products/new")}>
                        New Product
                    </Button>
                </div>
            </PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="Your Listings"
                        columns={columns}
                        data={products}
                        isLoading={isLoading}
                        onRowClick={(row) => navigate(`/farmer/products/${row.id}/edit`)}
                        totalCount={products.length}
                        pageNumber={1}
                        pageLimit={Math.max(products.length, 1)}
                        totalPages={1}
                        onPageChange={() => { }}
                        onPageSizeChange={() => { }}
                    />
                </div>
            </Container>
        </>
    );
};

export default MyProductsPage;
