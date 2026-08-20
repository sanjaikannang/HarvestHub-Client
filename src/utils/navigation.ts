import { UserRole } from "./enum";
import { NavigateFunction } from "react-router-dom";

export const navigateByUserRole = (
    role: UserRole,
    navigate: NavigateFunction
) => {
    switch (role) {
        case UserRole.SUPER_ADMIN:
            navigate("/admin/dashboard", { replace: true });
            break;

        case UserRole.FARMER:
            navigate("/farmer/dashboard", { replace: true });
            break;

        case UserRole.BUYER:
            navigate("/buyer/dashboard", { replace: true });
            break;

        case UserRole.DELIVERY_PARTNER:
            navigate("/delivery-partner/dashboard", { replace: true });
            break;

        default:
            navigate("/login", { replace: true });
    }
};
