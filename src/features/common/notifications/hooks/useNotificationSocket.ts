import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { ENV } from "../../../../config/env";

// Joins the logged-in user's own notification room so the bell/badge update
// in real time (requirement.md: "in-app... notifications"). Same
// join-room/refetch pattern as useBiddingSocket/useOrdersSocket.
export function useNotificationSocket(userId: string | undefined, onEvent: () => void) {
    const onEventRef = useRef(onEvent);
    onEventRef.current = onEvent;

    useEffect(() => {
        if (!userId) return;

        const socket: Socket = io(ENV.BASE_URL, { transports: ["websocket"] });
        socket.emit("join-notifications", { userId });
        socket.on("notification-received", () => onEventRef.current());

        return () => {
            socket.emit("leave-notifications", { userId });
            socket.disconnect();
        };
    }, [userId]);
}
