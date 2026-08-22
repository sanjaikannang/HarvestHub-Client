import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../../common/ui/Container";
import { PageHeader } from "../../../../common/ui/PageHeader";
import { formatDateTime } from "../../../../utils/date";
import { Table, type ColumnDef } from "../../../../common/ui/Table";
import type { Bid } from "../../../../types/bidding-types";
import ProductNameCell from "../../../inspector/inspections/components/ProductNameCell";
import { useListMyBidsQuery } from "../../../../state/services/endpoints/bidding";

const MyBidsPage = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useListMyBidsQuery();
    const bids = useMemo(() => data?.data ?? [], [data]);

    const columns: ColumnDef<Bid, unknown>[] = [
        { header: "Product", cell: ({ row }) => <ProductNameCell productId={row.original.productId} /> },
        { header: "Your Bid", cell: ({ row }) => `₹${row.original.amount}` },
        { header: "Placed At", cell: ({ row }) => formatDateTime(row.original.placedAt) },
    ];

    return (
        <>
            <PageHeader>My Bids</PageHeader>

            <Container>
                <div className="py-6">
                    <Table
                        tableTitle="Bid History"
                        columns={columns}
                        data={bids}
                        isLoading={isLoading}
                        onRowClick={(row) => navigate(`/buyer/marketplace/${row.productId}`)}
                        totalCount={bids.length}
                        pageNumber={1}
                        pageLimit={Math.max(bids.length, 1)}
                        totalPages={1}
                        onPageChange={() => { }}
                        onPageSizeChange={() => { }}
                    />
                </div>
            </Container>
        </>
    );
};

export default MyBidsPage;
