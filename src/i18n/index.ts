import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translation.json";
import ta from "./locales/ta/translation.json";

// Guest users: detect from localStorage first, then the browser's own
// language, falling back to English — per modules/12-localization/requirement.md.
// Logged-in users: LoginPage/AppProvider override this with users.preferredLanguage
// once the session loads, so it stays consistent across devices.
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ta: { translation: ta },
        },
        fallbackLng: "en",
        supportedLngs: ["en", "ta"],
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
            lookupLocalStorage: "language",
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
