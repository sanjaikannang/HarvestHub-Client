import type { RouteObject } from "react-router-dom";
import { withAuthGuard } from "../../hoc/withAuthGuard";
import { RootLayout } from "../../layouts/root/RootLayout";
import { adminRoutes } from "../../features/admin/routes/adminRoutes";
import { farmerRoutes } from "../../features/farmer/routes/farmerRoutes";
import { buyerRoutes } from "../../features/buyer/routes/buyerRoutes";
import { deliveryPartnerRoutes } from "../../features/delivery-partner/routes/deliveryPartnerRoutes";

const ProtectedRootLayout = withAuthGuard(RootLayout);

export const protectedRoutes: RouteObject[] = [
    {
        element: <ProtectedRootLayout />,
        children: [
            ...adminRoutes,
            ...farmerRoutes,
            ...buyerRoutes,
            ...deliveryPartnerRoutes,
        ],
    },
];
