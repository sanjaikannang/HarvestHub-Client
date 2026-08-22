import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { ENV } from "../../../config/env";

export type BiddingSocketEvent = "session-started" | "bid-placed" | "session-ended";

// One socket per mounted session view — joins a room named after the
// product so the server can broadcast bid-placed/session-ended events to
// everyone watching (requirement.md: "Real-time updates... broadcast via
// WebSocket/SSE"). Callers just refetch their RTK Query data on any event
// rather than trying to hand-merge the payload into the cache.
export function useBiddingSocket(productId: string | undefined, onEvent: (event: BiddingSocketEvent) => void) {
    const onEventRef = useRef(onEvent);
    onEventRef.current = onEvent;

    useEffect(() => {
        if (!productId) return;

        const socket: Socket = io(ENV.BASE_URL, { transports: ["websocket"] });
        socket.emit("join-session", { productId });

        const events: BiddingSocketEvent[] = ["session-started", "bid-placed", "session-ended"];
        events.forEach((event) => socket.on(event, () => onEventRef.current(event)));

        return () => {
            socket.emit("leave-session", { productId });
            socket.disconnect();
        };
    }, [productId]);
}
