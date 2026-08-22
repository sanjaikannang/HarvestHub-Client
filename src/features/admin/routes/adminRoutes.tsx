import type { RouteObject } from "react-router-dom";
import { UserRole } from "../../../utils/enum";
import { RoleGuard } from "../../../hoc/withRoleGuard";
import AdminDashboardPage from "../dashboard/pages/AdminDashboardPage";
import AdminProfilePage from "../profile/pages/AdminProfilePage";
import CategoriesPage from "../catalog/categories/pages/CategoriesPage";
import ProductsReviewPage from "../catalog/products/pages/ProductsReviewPage";
import InspectionsPage from "../inspections/pages/InspectionsPage";
import InventoryPage from "../inventory/pages/InventoryPage";

export const adminRoutes: RouteObject[] = [
    {
        path: "/admin/dashboard",
        element: <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]}><AdminDashboardPage /></RoleGuard>,
    },
    {
        path: "/admin/profile",
        element: <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]}><AdminProfilePage /></RoleGuard>,
    },
    {
        path: "/admin/catalog/categories",
        element: <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]}><CategoriesPage /></RoleGuard>,
    },
    {
        path: "/admin/catalog/products",
        element: <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]}><ProductsReviewPage /></RoleGuard>,
    },
    {
        path: "/admin/inspections",
        element: <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]}><InspectionsPage /></RoleGuard>,
    },
    {
        path: "/admin/inventory",
        element: <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]}><InventoryPage /></RoleGuard>,
    },
];
