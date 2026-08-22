import type { RouteObject } from "react-router-dom";
import { UserRole } from "../../../utils/enum";
import { RoleGuard } from "../../../hoc/withRoleGuard";
import BuyerDashboardPage from "../dashboard/pages/BuyerDashboardPage";
import BuyerProfilePage from "../profile/pages/BuyerProfilePage";
import MarketplacePage from "../marketplace/pages/MarketplacePage";
import ProductBiddingPage from "../marketplace/pages/ProductBiddingPage";
import MyBidsPage from "../bids/pages/MyBidsPage";

export const buyerRoutes: RouteObject[] = [
    {
        path: "/buyer/dashboard",
        element: <RoleGuard allowedRoles={[UserRole.BUYER]}><BuyerDashboardPage /></RoleGuard>,
    },
    {
        path: "/buyer/profile",
        element: <RoleGuard allowedRoles={[UserRole.BUYER]}><BuyerProfilePage /></RoleGuard>,
    },
    {
        path: "/buyer/marketplace",
        element: <RoleGuard allowedRoles={[UserRole.BUYER]}><MarketplacePage /></RoleGuard>,
    },
    {
        path: "/buyer/marketplace/:id",
        element: <RoleGuard allowedRoles={[UserRole.BUYER]}><ProductBiddingPage /></RoleGuard>,
    },
    {
        path: "/buyer/bids",
        element: <RoleGuard allowedRoles={[UserRole.BUYER]}><MyBidsPage /></RoleGuard>,
    },
];
