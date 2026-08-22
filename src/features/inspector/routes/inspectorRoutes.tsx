import type { RouteObject } from "react-router-dom";
import { UserRole } from "../../../utils/enum";
import { RoleGuard } from "../../../hoc/withRoleGuard";
import InspectorDashboardPage from "../dashboard/pages/InspectorDashboardPage";
import InspectorProfilePage from "../profile/pages/InspectorProfilePage";
import MyInspectionsPage from "../inspections/pages/MyInspectionsPage";

export const inspectorRoutes: RouteObject[] = [
    {
        path: "/inspector/dashboard",
        element: <RoleGuard allowedRoles={[UserRole.INSPECTOR]}><InspectorDashboardPage /></RoleGuard>,
    },
    {
        path: "/inspector/profile",
        element: <RoleGuard allowedRoles={[UserRole.INSPECTOR]}><InspectorProfilePage /></RoleGuard>,
    },
    {
        path: "/inspector/inspections",
        element: <RoleGuard allowedRoles={[UserRole.INSPECTOR]}><MyInspectionsPage /></RoleGuard>,
    },
];
