import type { RouteObject } from "react-router-dom";
import { UserRole } from "../../../utils/enum";
import { RoleGuard } from "../../../hoc/withRoleGuard";
import BuyerDashboardPage from "../dashboard/pages/BuyerDashboardPage";
import BuyerProfilePage from "../profile/pages/BuyerProfilePage";

export const buyerRoutes: RouteObject[] = [
    {
        path: "/buyer/dashboard",
        element: <RoleGuard allowedRoles={[UserRole.BUYER]}><BuyerDashboardPage /></RoleGuard>,
    },
    {
        path: "/buyer/profile",
        element: <RoleGuard allowedRoles={[UserRole.BUYER]}><BuyerProfilePage /></RoleGuard>,
    },
];
