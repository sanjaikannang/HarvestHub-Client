import { Link, Outlet } from "react-router-dom";
import LanguageSwitcher from "../../features/common/language/components/LanguageSwitcher";

export function AuthLayout() {
    return (
        <>
            <header className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-4 z-50">
                <Link to="/" className="text-xl font-bold text-textPrimary">
                    HarvestHub
                </Link>
                <LanguageSwitcher />
            </header>
            <main>
                <Outlet />
            </main>
        </>

    );
}
