import type { RouteObject } from "react-router-dom";
import { UserRole } from "../../../utils/enum";
import { RoleGuard } from "../../../hoc/withRoleGuard";
import FarmerDashboardPage from "../dashboard/pages/FarmerDashboardPage";
import FarmerProfilePage from "../profile/pages/FarmerProfilePage";
import MyProductsPage from "../../farmer/products/pages/MyProductsPage";
import ProductFormPage from "../../farmer/products/pages/ProductFormPage";
import MyPayoutsPage from "../payouts/pages/MyPayoutsPage";
import MyOrdersPage from "../orders/pages/MyOrdersPage";

export const farmerRoutes: RouteObject[] = [
    {
        path: "/farmer/dashboard",
        element: <RoleGuard allowedRoles={[UserRole.FARMER]}><FarmerDashboardPage /></RoleGuard>,
    },
    {
        path: "/farmer/profile",
        element: <RoleGuard allowedRoles={[UserRole.FARMER]}><FarmerProfilePage /></RoleGuard>,
    },
    {
        path: "/farmer/products",
        element: <RoleGuard allowedRoles={[UserRole.FARMER]}><MyProductsPage /></RoleGuard>,
    },
    {
        path: "/farmer/products/new",
        element: <RoleGuard allowedRoles={[UserRole.FARMER]}><ProductFormPage /></RoleGuard>,
    },
    {
        path: "/farmer/products/:id/edit",
        element: <RoleGuard allowedRoles={[UserRole.FARMER]}><ProductFormPage /></RoleGuard>,
    },
    {
        path: "/farmer/orders",
        element: <RoleGuard allowedRoles={[UserRole.FARMER]}><MyOrdersPage /></RoleGuard>,
    },
    {
        path: "/farmer/payouts",
        element: <RoleGuard allowedRoles={[UserRole.FARMER]}><MyPayoutsPage /></RoleGuard>,
    },
];
