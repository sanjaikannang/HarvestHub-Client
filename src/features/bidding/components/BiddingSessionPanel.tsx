import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Chip from "../../../common/ui/Chip";
import Button from "../../../common/ui/Button";
import InputField from "../../../common/ui/Input";
import { CountdownTimer } from "../../../common/ui/CountdownTimer";
import { formatDateTime } from "../../../utils/date";
import { BiddingSessionStatus } from "../../../utils/enum";
import { formatEnumLabel, getChipVariant } from "../../../utils/utils";
import { getItemFromStorage } from "../../../utils/storage";
import { useBiddingSocket } from "../hooks/useBiddingSocket";
import type { Product } from "../../../types/catalog-types";
import { useGetBiddingSessionQuery, useListBidHistoryQuery, usePlaceBidMutation } from "../../../state/services/endpoints/bidding";

interface BiddingSessionPanelProps {
    product: Product;
    canBid: boolean;
}

const BiddingSessionPanel = ({ product, canBid }: BiddingSessionPanelProps) => {
    const [bidAmount, setBidAmount] = useState("");
    const [now, setNow] = useState(() => Date.now());

    const { data, error, isLoading, refetch } = useGetBiddingSessionQuery(product.id);
    const session = data?.data;
    const sessionNotStarted = (error as any)?.status === 404;

    const { data: historyData, refetch: refetchHistory } = useListBidHistoryQuery(product.id, { skip: !session });
    const bids = historyData?.data ?? [];

    const [placeBid, { isLoading: isPlacing }] = usePlaceBidMutation();

    useBiddingSocket(product.id, () => {
        refetch();
        refetchHistory();
    });

    useEffect(() => {
        if (session?.status !== BiddingSessionStatus.LIVE) return;
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, [session?.status]);

    const currentUserId = getItemFromStorage<{ id: string }>({ key: "user" })?.id;

    const floor = product.finalStartingPrice ?? product.startingPrice;
    const minRequired = session?.currentHighestBid
        ? session.currentHighestBid.amount + session.minIncrement
        : floor;

    const handlePlaceBid = async () => {
        const amount = Number(bidAmount);
        if (!amount || amount < minRequired) {
            toast.error(`Bid must be at least ₹${minRequired}`);
            return;
        }

        try {
            const response = await placeBid({ productId: product.id, data: { amount } }).unwrap();
            toast.success(response.message || "Bid placed successfully");
            setBidAmount("");
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to place bid");
        }
    };

    if (isLoading) {
        return <p className="text-sm text-textSecondary">Loading bidding session...</p>;
    }

    if (sessionNotStarted || !session) {
        return (
            <div className="bg-whiteColor rounded-xl border border-borderLight p-6">
                <p className="text-sm text-textSecondary">
                    Bidding hasn't started yet — scheduled for{" "}
                    <span className="font-medium text-textPrimary">{formatDateTime(product.biddingStartTime)}</span>.
                </p>
            </div>
        );
    }

    const remainingMs = new Date(session.currentEndTime).getTime() - now;

    return (
        <div className="bg-whiteColor rounded-xl border border-borderLight p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <Chip label={formatEnumLabel(session.status)} variant={getChipVariant(session.status)} />
                {session.status === BiddingSessionStatus.LIVE && (
                    <CountdownTimer remainingMs={remainingMs} />
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div>
                    <p className="text-xs text-textTertiary">Current Highest Bid</p>
                    <p className="text-lg font-semibold text-textPrimary">
                        {session.currentHighestBid ? `₹${session.currentHighestBid.amount}` : `No bids yet (floor ₹${floor})`}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-textTertiary">Min. Increment</p>
                    <p className="text-textPrimary">₹{session.minIncrement}</p>
                </div>
                {session.extensionCount > 0 && (
                    <div>
                        <p className="text-xs text-textTertiary">Anti-Sniping Extensions</p>
                        <p className="text-textPrimary">{session.extensionCount}</p>
                    </div>
                )}
            </div>

            {session.status === BiddingSessionStatus.ENDED && (
                <div className={`p-3 rounded-lg border ${session.outcome === "sold" ? "bg-green-50 border-green-100" : "bg-gray-50 border-gray-200"}`}>
                    <p className="text-sm font-medium text-textPrimary">
                        {session.outcome === "sold"
                            ? `Sold for ₹${session.winningBidAmount}${session.winnerId === currentUserId ? " — you won!" : ""}`
                            : "Unsold — no bids met the starting price."}
                    </p>
                </div>
            )}

            {canBid && session.status === BiddingSessionStatus.LIVE && (
                <div className="flex items-end gap-3">
                    <InputField
                        id="bidAmount" name="bidAmount" type="number" label={`Your Bid (min ₹${minRequired})`}
                        value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={String(minRequired)} className="flex-1"
                    />
                    <Button variant="primary" size="md" loading={isPlacing} disabled={isPlacing} onClick={handlePlaceBid}>
                        {isPlacing ? "" : "Place Bid"}
                    </Button>
                </div>
            )}

            {bids.length > 0 && (
                <div>
                    <p className="text-sm font-medium text-textPrimary mb-2">Bid History</p>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {bids.map((bid) => (
                            <div key={bid.id} className="flex items-center justify-between text-sm px-3 py-2 rounded-lg bg-bgSecondary">
                                <span className="text-textPrimary">
                                    {bid.buyerId === currentUserId ? "You" : `Buyer ${bid.buyerId.slice(-6)}`}
                                </span>
                                <span className="font-medium text-textPrimary">₹{bid.amount}</span>
                                <span className="text-xs text-textTertiary">{formatDateTime(bid.placedAt)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BiddingSessionPanel;
