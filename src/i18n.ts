import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";

import enPage from "./locales/en/page.json";
import enMessage from "./locales/en/message.json";
import enError from "./locales/en/error.json";
import enLabel from "./locales/en/label.json";
import bnPage from "./locales/bn/page.json";
import bnMessage from "./locales/bn/message.json";
import bnError from "./locales/bn/error.json";
import bnLabel from "./locales/bn/label.json";

i18n
    .use(I18NextHttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                page: enPage,
                message: enMessage,
                error: enError,
                label: enLabel,
            },
            bn: {
                page: bnPage,
                message: bnMessage,
                error: bnError,
                label: bnLabel,
            },
        },
        lng: "en", // default language
        fallbackLng: "en",
        supportedLngs: ["en", "bn"], // en-US → en
        load: "languageOnly",
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json", // namespace file per language
        },
        ns: ["message", "page", "errors"], // namespaces we have
        defaultNS: "page", // default if not specified
        detection: {
            order: ["querystring", "localStorage", "navigator"],
            caches: ["localStorage"],
        },
    });

export default i18n;