import { useEffect, useRef, useState } from "react";
import { Languages, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getItemFromStorage, setItemInStorage } from "../../../../utils/storage";
import { PreferredLanguage } from "../../../../utils/enum";
import { useUpdateLanguageMutation } from "../../../../state/services/endpoints/auth";

const LANGUAGES: { code: PreferredLanguage; labelKey: string }[] = [
    { code: PreferredLanguage.EN, labelKey: "common.english" },
    { code: PreferredLanguage.TA, labelKey: "common.tamil" },
];

// Available in the header on every screen, authenticated or not (see
// modules/12-localization/requirement.md). Switching re-renders all UI text
// immediately via react-i18next; for a logged-in user it's also persisted to
// their profile so it's applied automatically on their next login/device.
const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [updateLanguage] = useUpdateLanguageMutation();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (code: PreferredLanguage) => {
        i18n.changeLanguage(code);
        setIsOpen(false);

        const accessToken = getItemFromStorage({ key: "accessToken" });
        if (accessToken) {
            updateLanguage({ preferredLanguage: code });

            const user = getItemFromStorage<Record<string, unknown>>({ key: "user" });
            if (user) {
                setItemInStorage({ key: "user", value: { ...user, preferredLanguage: code } });
            }
        }
    };

    const currentLabelKey = LANGUAGES.find((lang) => lang.code === i18n.language)?.labelKey ?? "common.english";

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-1.5 h-9 px-2.5 rounded-full hover:bg-bgSecondary transition-colors cursor-pointer text-sm text-textSecondary"
                aria-label={t("common.language")}
            >
                <Languages className="w-4 h-4" />
                <span>{t(currentLabelKey)}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl border border-borderLight bg-whiteColor shadow-lg z-50 overflow-hidden">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className="w-full flex items-center justify-between px-4 py-2 text-sm text-left cursor-pointer hover:bg-bgSecondary transition-colors"
                        >
                            <span className={i18n.language === lang.code ? "text-primary font-medium" : "text-textPrimary"}>
                                {t(lang.labelKey)}
                            </span>
                            {i18n.language === lang.code && <Check className="w-4 h-4 text-primary" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
