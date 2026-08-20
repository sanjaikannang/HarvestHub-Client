import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import Button from "../../../../common/ui/Button";

const UnAuthorizedPage = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-bgSecondary p-4">
            <div className="max-w-md w-full text-center space-y-4">
                <ShieldAlert className="w-16 h-16 text-red-500 mx-auto" />
                <h1 className="text-2xl font-bold text-textPrimary">Access denied</h1>
                <p className="text-sm text-textSecondary">You don't have permission to view this page.</p>
                <Link to="/login">
                    <Button variant="primary">Back to Login</Button>
                </Link>
            </div>
        </div>
    );
};

export default UnAuthorizedPage;
