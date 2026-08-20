import type { RouteObject } from "react-router-dom";
import PublicLayout from "../../layouts/public/PublicLayout";
import LandingPage from "../../features/public/landing/pages/LandingPage";
import { withGuestGuard } from "../../hoc/withGuestGuard";

// Landing page is an "open" route — an already-authenticated user hitting it
// (back button, bookmark, typed URL) gets bounced to their dashboard, same as
// /login already does.
const GuardedLandingPage = withGuestGuard(LandingPage);

export const publicRoutes: RouteObject[] = [
    {
        element: <PublicLayout />,
        children: [
            {
                path: "/",
                element: <GuardedLandingPage />,
            },
        ]
    },
];
