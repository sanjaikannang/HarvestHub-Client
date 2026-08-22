import { ReactNode } from "react";
import { UserRole } from "../../utils/enum";
import { useTranslation } from "react-i18next";
import { useLogout } from "../../features/auth/logout/useLogout";
import { getItemFromStorage } from "../../utils/storage";
import { Outlet, useLocation, Link } from "react-router-dom";
import { LogOut, Home, type LucideIcon, User, Sprout, Tags, ClipboardCheck, Package, ClipboardList, Warehouse, ShoppingBasket, Gavel, Wallet, ReceiptText, Settings, Truck, MessageSquareText, ShieldAlert, Building2 } from "lucide-react";
import NotificationBell from "../../features/common/notifications/components/NotificationBell";
import LanguageSwitcher from "../../features/common/language/components/LanguageSwitcher";

interface NavigationItem {
    id: string;
    labelKey: string;
    path: string;
    icon: LucideIcon;
    matchPattern?: string;
}

const adminNavItems: NavigationItem[] = [
    { id: "dashboard", labelKey: "nav.dashboard", path: "/admin/dashboard", icon: Home },
    { id: "categories", labelKey: "nav.categories", path: "/admin/catalog/categories", icon: Tags },
    { id: "products", labelKey: "nav.productReview", path: "/admin/catalog/products", icon: ClipboardCheck },
    { id: "inspections", labelKey: "nav.inspections", path: "/admin/inspections", icon: ClipboardList },
    { id: "inventory", labelKey: "nav.inventory", path: "/admin/inventory", icon: Warehouse },
    { id: "collection-centers", labelKey: "nav.collectionCenters", path: "/admin/collection-centers", icon: Building2 },
    { id: "orders", labelKey: "nav.orders", path: "/admin/orders", icon: Truck },
    { id: "payouts", labelKey: "nav.payouts", path: "/admin/payouts", icon: Wallet },
    { id: "settings", labelKey: "nav.settings", path: "/admin/settings", icon: Settings },
    { id: "notification-templates", labelKey: "nav.notificationTemplates", path: "/admin/notification-templates", icon: MessageSquareText },
    { id: "disputes", labelKey: "nav.disputes", path: "/admin/disputes", icon: ShieldAlert },
    { id: "audit-log", labelKey: "nav.auditLog", path: "/admin/audit-log", icon: ClipboardList },
    { id: "profile", labelKey: "nav.profile", path: "/admin/profile", icon: User },
];

const farmerNavItems: NavigationItem[] = [
    { id: "dashboard", labelKey: "nav.dashboard", path: "/farmer/dashboard", icon: Home },
    { id: "products", labelKey: "nav.myProducts", path: "/farmer/products", icon: Package, matchPattern: "/farmer/products" },
    { id: "orders", labelKey: "nav.myOrders", path: "/farmer/orders", icon: Truck },
    { id: "payouts", labelKey: "nav.myPayouts", path: "/farmer/payouts", icon: Wallet },
    { id: "profile", labelKey: "nav.profile", path: "/farmer/profile", icon: User },
];

const buyerNavItems: NavigationItem[] = [
    { id: "dashboard", labelKey: "nav.dashboard", path: "/buyer/dashboard", icon: Home },
    { id: "marketplace", labelKey: "nav.marketplace", path: "/buyer/marketplace", icon: ShoppingBasket, matchPattern: "/buyer/marketplace" },
    { id: "bids", labelKey: "nav.myBids", path: "/buyer/bids", icon: Gavel },
    { id: "payments", labelKey: "nav.myPayments", path: "/buyer/payments", icon: Wallet },
    { id: "orders", labelKey: "nav.myOrders", path: "/buyer/orders", icon: ReceiptText },
    { id: "disputes", labelKey: "nav.myDisputes", path: "/buyer/disputes", icon: ShieldAlert },
    { id: "profile", labelKey: "nav.profile", path: "/buyer/profile", icon: User },
];

const deliveryPartnerNavItems: NavigationItem[] = [
    { id: "dashboard", labelKey: "nav.dashboard", path: "/delivery-partner/dashboard", icon: Home },
    { id: "deliveries", labelKey: "nav.myDeliveries", path: "/delivery-partner/deliveries", icon: Truck },
    { id: "profile", labelKey: "nav.profile", path: "/delivery-partner/profile", icon: User },
];

const inspectorNavItems: NavigationItem[] = [
    { id: "dashboard", labelKey: "nav.dashboard", path: "/inspector/dashboard", icon: Home },
    { id: "inspections", labelKey: "nav.myInspections", path: "/inspector/inspections", icon: ClipboardList },
    { id: "profile", labelKey: "nav.profile", path: "/inspector/profile", icon: User },
];

const districtAdminNavItems: NavigationItem[] = [
    { id: "dashboard", labelKey: "nav.dashboard", path: "/district-admin/dashboard", icon: Home },
    { id: "audit-log", labelKey: "nav.auditLog", path: "/district-admin/audit-log", icon: ClipboardList },
];

const navigationItemsByRole: Record<string, NavigationItem[]> = {
    [UserRole.SUPER_ADMIN]: adminNavItems,
    [UserRole.FARMER]: farmerNavItems,
    [UserRole.BUYER]: buyerNavItems,
    [UserRole.DELIVERY_PARTNER]: deliveryPartnerNavItems,
    [UserRole.INSPECTOR]: inspectorNavItems,
    [UserRole.DISTRICT_ADMIN]: districtAdminNavItems,
};

export interface RootLayoutContext {
    infoBar?: ReactNode;
}

export function RootLayout() {
    const { t } = useTranslation();
    const location = useLocation();
    const { logout } = useLogout();

    const isActiveRoute = (item: NavigationItem): boolean => {
        if (item.matchPattern) {
            return location.pathname.startsWith(item.matchPattern);
        }
        return location.pathname === item.path;
    };

    const handleLogout = () => {
        logout();
    };

    const userData = getItemFromStorage({ key: "user" }) as {
        name?: string;
        email?: string;
        phone?: string;
        role: string;
    };

    const roleInitial = userData?.name?.charAt(0).toUpperCase() || userData?.role?.charAt(0).toUpperCase();
    const navigationItems = navigationItemsByRole[userData?.role] || [];

    return (
        <>
            <div className="flex h-screen bg-bgSecondary">
                {/* Sidebar */}
                <aside className="w-56 bg-whiteColor border-r border-borderLight flex flex-col shadow-xl">
                    <div className="h-16 flex items-center justify-center gap-2 px-4 border-b border-borderLight flex-shrink-0">
                        <Sprout className="w-5 h-5 text-primary" />
                        <h1 className="font-bold text-xl text-center text-textPrimary">
                            HarvestHub
                        </h1>
                    </div>

                    {/* Navigation Items - Scrollable */}
                    <nav className="flex-1 p-1.5 space-y-1.5 overflow-y-auto no-scrollbar">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActiveRoute(item);

                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-2 transition-colors ${isActive
                                        ? "bg-primaryLighter text-primary"
                                        : "text-textSecondary hover:bg-bgTertiary"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{t(item.labelKey)}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="py-2 border-t border-borderLight flex-shrink-0">
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-3 px-4 py-3 w-full text-textSecondary cursor-pointer transition-colors">
                            <LogOut className="w-5 h-5" />
                            <span>{t("nav.logout")}</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    <header className="h-16 bg-whiteColor border-b border-borderLight flex items-center justify-end px-6 flex-shrink-0 shadow-sm">
                        <div className="flex items-center gap-4">
                            <LanguageSwitcher />
                            <NotificationBell />

                            <div className="flex flex-col text-right">
                                <span className="text-xs font-medium text-textSecondary">
                                    {userData?.name || userData?.email || userData?.phone}
                                </span>
                                <span className="text-xs text-textSecondary">
                                    {userData?.role}
                                </span>
                            </div>

                            <div className="w-8 h-8 bg-primary flex items-center justify-center text-whiteColor font-semibold">
                                {roleInitial}
                            </div>
                        </div>

                    </header>

                    {/* Main Content - Scrollable */}
                    <main className="flex-1 overflow-y-auto no-scrollbar">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
