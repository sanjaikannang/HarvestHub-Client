import type { RouteObject } from "react-router-dom";
import { UserRole } from "../../../utils/enum";
import { RoleGuard } from "../../../hoc/withRoleGuard";
import AdminDashboardPage from "../dashboard/pages/AdminDashboardPage";
import AdminProfilePage from "../profile/pages/AdminProfilePage";
import CategoriesPage from "../catalog/categories/pages/CategoriesPage";
import ProductsReviewPage from "../catalog/products/pages/ProductsReviewPage";

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
];
