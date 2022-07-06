import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import emMain from "./en/main.json";
import ruMain from "./ru/main.json"

const resources = {
  en: {
    main: emMain
  },
  ru: {
    main: ruMain
  },
}

export const availableLanguages = Object.keys(resources)

i18n.use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    defaultNS: "main",
    fallbackLng: "en",
  });
