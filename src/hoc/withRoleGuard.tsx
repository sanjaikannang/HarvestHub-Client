import { Navigate } from "react-router-dom";
import { UserRole } from "../utils/enum";
import { getItemFromStorage } from "../utils/storage";

interface RoleGuardProps {
    allowedRoles: UserRole[];
    children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
    const userRole = getItemFromStorage({ key: "userRole" }) as UserRole;

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};
