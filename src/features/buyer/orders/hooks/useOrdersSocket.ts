import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { ENV } from "../../../../config/env";

// Joins one room per order so the buyer's order list reflects delivery
// status changes in real time (requirement.md: "Buyer's dashboard reflects
// status changes in real time"). Callers just refetch on any event rather
// than hand-merging the payload — same pattern as useBiddingSocket.
export function useOrdersSocket(orderIds: string[], onEvent: () => void) {
    const onEventRef = useRef(onEvent);
    onEventRef.current = onEvent;

    const key = orderIds.slice().sort().join(",");

    useEffect(() => {
        if (!orderIds.length) return;

        const socket: Socket = io(ENV.BASE_URL, { transports: ["websocket"] });
        orderIds.forEach((orderId) => socket.emit("join-order", { orderId }));
        socket.on("order-status-updated", () => onEventRef.current());

        return () => {
            orderIds.forEach((orderId) => socket.emit("leave-order", { orderId }));
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);
}
