import { Navigate } from "react-router-dom";
import { UserRole } from "../utils/enum";
import { getItemFromStorage } from "../utils/storage";

// Guard for AUTH/PUBLIC routes (login, register, etc.)
// Redirects authenticated users to their dashboard
export function withGuestGuard<P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> {
    const ComponentWithGuestGuard: React.FC<P> = (props) => {
        const checkAuthentication = (): boolean => {
            const accessToken = getItemFromStorage({ key: "accessToken" });
            return !!accessToken;
        };

        const isAuthenticated = checkAuthentication();

        if (isAuthenticated) {
            const userRole = getItemFromStorage({ key: "userRole" }) as UserRole;

            // The fallback for any unrecognized role must NOT be "/" or
            // "/login" — both are guest-guarded, so redirecting an
            // authenticated user there just re-runs this same check and
            // bounces right back.
            const roleRouteMap: Record<UserRole, string> = {
                [UserRole.SUPER_ADMIN]: "/admin/dashboard",
                [UserRole.DISTRICT_ADMIN]: "/district-admin/dashboard",
                [UserRole.INSPECTOR]: "/inspector/dashboard",
                [UserRole.FARMER]: "/farmer/dashboard",
                [UserRole.BUYER]: "/buyer/dashboard",
                [UserRole.DELIVERY_PARTNER]: "/delivery-partner/dashboard",
            };

            const redirectPath = roleRouteMap[userRole] || "/unauthorized";
            return <Navigate to={redirectPath} replace />;
        }

        return <WrappedComponent {...props} />;
    };

    ComponentWithGuestGuard.displayName = `withGuestGuard(${WrappedComponent.displayName || WrappedComponent.name || "Component"
        })`;

    return ComponentWithGuestGuard;
}
