import type { RouteObject } from "react-router-dom";
import { UserRole } from "../../../utils/enum";
import { RoleGuard } from "../../../hoc/withRoleGuard";
import DeliveryPartnerDashboardPage from "../dashboard/pages/DeliveryPartnerDashboardPage";
import DeliveryPartnerProfilePage from "../profile/pages/DeliveryPartnerProfilePage";
import MyDeliveriesPage from "../orders/pages/MyDeliveriesPage";

export const deliveryPartnerRoutes: RouteObject[] = [
    {
        path: "/delivery-partner/dashboard",
        element: <RoleGuard allowedRoles={[UserRole.DELIVERY_PARTNER]}><DeliveryPartnerDashboardPage /></RoleGuard>,
    },
    {
        path: "/delivery-partner/deliveries",
        element: <RoleGuard allowedRoles={[UserRole.DELIVERY_PARTNER]}><MyDeliveriesPage /></RoleGuard>,
    },
    {
        path: "/delivery-partner/profile",
        element: <RoleGuard allowedRoles={[UserRole.DELIVERY_PARTNER]}><DeliveryPartnerProfilePage /></RoleGuard>,
    },
];
