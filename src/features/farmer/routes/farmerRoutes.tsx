import type { RouteObject } from "react-router-dom";
import { UserRole } from "../../../utils/enum";
import { RoleGuard } from "../../../hoc/withRoleGuard";
import FarmerDashboardPage from "../dashboard/pages/FarmerDashboardPage";
import FarmerProfilePage from "../profile/pages/FarmerProfilePage";

export const farmerRoutes: RouteObject[] = [
    {
        path: "/farmer/dashboard",
        element: <RoleGuard allowedRoles={[UserRole.FARMER]}><FarmerDashboardPage /></RoleGuard>,
    },
    {
        path: "/farmer/profile",
        element: <RoleGuard allowedRoles={[UserRole.FARMER]}><FarmerProfilePage /></RoleGuard>,
    },
];
