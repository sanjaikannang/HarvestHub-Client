import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Chip from "../../../../common/ui/Chip";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { formatDateTime } from "../../../../utils/date";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import type { Product } from "../../../../types/catalog-types";
import { formatEnumLabel, getChipVariant } from "../../../../utils/utils";
import { useListMarketplaceQuery } from "../../../../state/services/endpoints/product";

const MarketplacePage = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useListMarketplaceQuery();
    const products = useMemo(() => data?.data ?? [], [data]);

    const columns: ColumnDef<Product, unknown>[] = [
        { header: "Product", cell: ({ row }) => row.original.name },
        { header: "Quantity", cell: ({ row }) => `${row.original.verifiedQuantity ?? row.original.estimatedQuantity} ${row.original.unitOfMeasure}` },
        { header: "Starting Price", cell: ({ row }) => `₹${row.original.finalStartingPrice ?? row.original.startingPrice}` },
        { header: "Bidding Starts", cell: ({ row }) => formatDateTime(row.original.biddingStartTime) },
        {
            header: "Status",
            cell: ({ row }) => <Chip label={formatEnumLabel(row.original.status)} variant={getChipVariant(row.original.status)} />,
        },
    ];

    return (
        <>
            <PageHeader>Marketplace</PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="Available Produce"
                        columns={columns}
                        data={products}
                        isLoading={isLoading}
                        onRowClick={(row) => navigate(`/buyer/marketplace/${row.id}`)}
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

export default MarketplacePage;
