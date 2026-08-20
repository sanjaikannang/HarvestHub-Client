import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";
import Button from "../../../../common/ui/Button";

const PageNotFound = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-bgSecondary p-4">
            <div className="max-w-md w-full text-center space-y-4">
                <SearchX className="w-16 h-16 text-primary mx-auto" />
                <h1 className="text-2xl font-bold text-textPrimary">Page not found</h1>
                <p className="text-sm text-textSecondary">The page you're looking for doesn't exist or has been moved.</p>
                <Link to="/">
                    <Button variant="primary">Back to Home</Button>
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;
