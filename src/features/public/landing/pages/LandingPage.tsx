import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sprout, Users, Truck, ShoppingBasket } from "lucide-react";
import Button from "../../../../common/ui/Button";

const LandingPage = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-bgSecondary">
            <section className="max-w-5xl mx-auto px-6 py-20 text-center">
                <Sprout className="w-14 h-14 text-primary mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-textPrimary mb-4">HarvestHub</h1>
                <p className="text-lg text-textSecondary max-w-2xl mx-auto mb-8">
                    {t("landing.tagline")}
                </p>
                <div className="flex items-center justify-center gap-3">
                    <Link to="/register">
                        <Button variant="primary" size="lg">{t("landing.getStarted")}</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline" size="lg">{t("landing.login")}</Button>
                    </Link>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-whiteColor border border-borderLight p-6 text-center">
                    <Sprout className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-textPrimary mb-1">{t("landing.forFarmersTitle")}</h3>
                    <p className="text-sm text-textSecondary">{t("landing.forFarmersDesc")}</p>
                </div>
                <div className="bg-whiteColor border border-borderLight p-6 text-center">
                    <ShoppingBasket className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-textPrimary mb-1">{t("landing.forBuyersTitle")}</h3>
                    <p className="text-sm text-textSecondary">{t("landing.forBuyersDesc")}</p>
                </div>
                <div className="bg-whiteColor border border-borderLight p-6 text-center">
                    <Truck className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-textPrimary mb-1">{t("landing.forDeliveryTitle")}</h3>
                    <p className="text-sm text-textSecondary">{t("landing.forDeliveryDesc")}</p>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 pb-20 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-textTertiary">
                    <Users className="w-4 h-4" />
                    {t("landing.managedBy")}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
