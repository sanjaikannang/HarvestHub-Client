import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
}

const StatsCard = ({ label, value, icon: Icon }: StatsCardProps) => (
    <div className="bg-whiteColor rounded-xl border border-borderLight p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-primaryLighter flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0">
            <p className="text-xs text-textSecondary">{label}</p>
            <p className="text-lg font-semibold text-textPrimary truncate">{value}</p>
        </div>
    </div>
);

export default StatsCard;
