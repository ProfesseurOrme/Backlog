import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import translationEN from "./locales/en-translation.json";
import translationFR from "./locales/fr-translation.json";

const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation : translationFR
    }
};

// @ts-ignore
i18n
    .use(detector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "fr",
        fallbackLng: "en",
        whitelist: ["en", "fr"],
        detection : {
            checkWhiteList : true
        },
        interpolation : {
            escapeValue : false
        }
    });

export default i18n;