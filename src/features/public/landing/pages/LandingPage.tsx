import { Link } from "react-router-dom";
import { Sprout, Users, Truck, ShoppingBasket } from "lucide-react";
import Button from "../../../../common/ui/Button";

const LandingPage = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-bgSecondary">
            <section className="max-w-5xl mx-auto px-6 py-20 text-center">
                <Sprout className="w-14 h-14 text-primary mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-textPrimary mb-4">HarvestHub</h1>
                <p className="text-lg text-textSecondary max-w-2xl mx-auto mb-8">
                    A direct-to-market platform connecting farmers, buyers, and delivery
                    partners — transparent bidding, quality inspection, and fair payouts,
                    from harvest to doorstep.
                </p>
                <div className="flex items-center justify-center gap-3">
                    <Link to="/register">
                        <Button variant="primary" size="lg">Get Started</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline" size="lg">Login</Button>
                    </Link>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-whiteColor rounded-xl border border-borderLight p-6 text-center">
                    <Sprout className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-textPrimary mb-1">For Farmers</h3>
                    <p className="text-sm text-textSecondary">List your produce and reach verified buyers directly.</p>
                </div>
                <div className="bg-whiteColor rounded-xl border border-borderLight p-6 text-center">
                    <ShoppingBasket className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-textPrimary mb-1">For Buyers</h3>
                    <p className="text-sm text-textSecondary">Bid on inspected, quality-graded produce with confidence.</p>
                </div>
                <div className="bg-whiteColor rounded-xl border border-borderLight p-6 text-center">
                    <Truck className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-textPrimary mb-1">For Delivery Partners</h3>
                    <p className="text-sm text-textSecondary">Pick up delivery jobs and get paid reliably.</p>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 pb-20 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-textTertiary">
                    <Users className="w-4 h-4" />
                    Managed by district admins and inspectors to keep the marketplace fair and accountable.
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
