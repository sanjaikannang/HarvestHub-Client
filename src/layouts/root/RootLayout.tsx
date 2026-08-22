import { ReactNode } from "react";
import { UserRole } from "../../utils/enum";
import { useLogout } from "../../features/auth/logout/useLogout";
import { getItemFromStorage } from "../../utils/storage";
import { Outlet, useLocation, Link } from "react-router-dom";
import { LogOut, Home, type LucideIcon, User, Sprout, Tags, ClipboardCheck, Package, ClipboardList } from "lucide-react";

interface NavigationItem {
    id: string;
    label: string;
    path: string;
    icon: LucideIcon;
    matchPattern?: string;
}

const adminNavItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: Home },
    { id: "categories", label: "Categories", path: "/admin/catalog/categories", icon: Tags },
    { id: "products", label: "Product Review", path: "/admin/catalog/products", icon: ClipboardCheck },
    { id: "inspections", label: "Inspections", path: "/admin/inspections", icon: ClipboardList },
    { id: "profile", label: "Profile", path: "/admin/profile", icon: User },
];

const farmerNavItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", path: "/farmer/dashboard", icon: Home },
    { id: "products", label: "My Products", path: "/farmer/products", icon: Package, matchPattern: "/farmer/products" },
    { id: "profile", label: "Profile", path: "/farmer/profile", icon: User },
];

const buyerNavItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", path: "/buyer/dashboard", icon: Home },
    { id: "profile", label: "Profile", path: "/buyer/profile", icon: User },
];

const deliveryPartnerNavItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", path: "/delivery-partner/dashboard", icon: Home },
    { id: "profile", label: "Profile", path: "/delivery-partner/profile", icon: User },
];

const inspectorNavItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", path: "/inspector/dashboard", icon: Home },
    { id: "inspections", label: "My Inspections", path: "/inspector/inspections", icon: ClipboardList },
    { id: "profile", label: "Profile", path: "/inspector/profile", icon: User },
];

const navigationItemsByRole: Record<string, NavigationItem[]> = {
    [UserRole.SUPER_ADMIN]: adminNavItems,
    [UserRole.FARMER]: farmerNavItems,
    [UserRole.BUYER]: buyerNavItems,
    [UserRole.DELIVERY_PARTNER]: deliveryPartnerNavItems,
    [UserRole.INSPECTOR]: inspectorNavItems,
};

export interface RootLayoutContext {
    infoBar?: ReactNode;
}

export function RootLayout() {
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
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive
                                        ? "bg-primaryLighter text-primary"
                                        : "text-textSecondary hover:bg-bgTertiary"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
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
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    <header className="h-16 bg-whiteColor border-b border-borderLight flex items-center justify-end px-6 flex-shrink-0 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col text-right">
                                <span className="text-xs font-medium text-textSecondary">
                                    {userData?.name || userData?.email || userData?.phone}
                                </span>
                                <span className="text-xs text-textSecondary">
                                    {userData?.role}
                                </span>
                            </div>

                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-whiteColor font-semibold">
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
