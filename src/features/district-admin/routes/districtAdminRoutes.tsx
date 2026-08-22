import type { RouteObject } from "react-router-dom";
import { UserRole } from "../../../utils/enum";
import { RoleGuard } from "../../../hoc/withRoleGuard";
import DistrictAdminDashboardPage from "../dashboard/pages/DistrictAdminDashboardPage";
import AuditLogPage from "../audit-log/pages/AuditLogPage";

export const districtAdminRoutes: RouteObject[] = [
    {
        path: "/district-admin/dashboard",
        element: <RoleGuard allowedRoles={[UserRole.DISTRICT_ADMIN]}><DistrictAdminDashboardPage /></RoleGuard>,
    },
    {
        path: "/district-admin/audit-log",
        element: <RoleGuard allowedRoles={[UserRole.DISTRICT_ADMIN]}><AuditLogPage /></RoleGuard>,
    },
];
