import type { RouteObject } from "react-router-dom";
import { UserRole } from "../../../utils/enum";
import { RoleGuard } from "../../../hoc/withRoleGuard";
import FarmerDashboardPage from "../dashboard/pages/FarmerDashboardPage";
import FarmerProfilePage from "../profile/pages/FarmerProfilePage";
import MyProductsPage from "../../farmer/products/pages/MyProductsPage";
import ProductFormPage from "../../farmer/products/pages/ProductFormPage";

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
];
