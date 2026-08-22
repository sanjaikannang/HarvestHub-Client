import { useEffect, useState } from "react";
import { CountdownTimer } from "../../../../common/ui/CountdownTimer";
import { PaymentStatus } from "../../../../utils/enum";

interface PaymentWindowCellProps {
    status: PaymentStatus;
    paymentWindowExpiresAt: string;
}

const PaymentWindowCell = ({ status, paymentWindowExpiresAt }: PaymentWindowCellProps) => {
    const [now, setNow] = useState(() => Date.now());
    const isOpen = status === PaymentStatus.INITIATED || status === PaymentStatus.PROCESSING;

    useEffect(() => {
        if (!isOpen) return;
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, [isOpen]);

    if (!isOpen) return <span className="text-textTertiary">-</span>;

    const remainingMs = new Date(paymentWindowExpiresAt).getTime() - now;
    return <CountdownTimer remainingMs={remainingMs} size="sm" />;
};

export default PaymentWindowCell;
