import { createContext, useContext, useState } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "language";
const DEFAULT_LANGUAGE = "en";

function getInitialLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored && translations[stored] ? stored : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  function setLanguage(nextLanguage) {
    setLanguageState(nextLanguage);
    localStorage.setItem(STORAGE_KEY, nextLanguage);
  }

  function t(key, vars) {
    const strings = translations[language] || translations[DEFAULT_LANGUAGE];
    // Falls back to the raw key so a typo shows up as visibly wrong text instead of a blank/crash;
    // this warning is what actually surfaces the typo during development.
    if (!(key in strings) && import.meta.env.DEV) {
      console.warn(`Missing translation key: "${key}"`);
    }
    let text = strings[key] ?? key;
    if (vars) {
      for (const [varName, value] of Object.entries(vars)) {
        text = text.replace(`{${varName}}`, value);
      }
    }
    return text;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Colocated with LanguageProvider on purpose; only affects Fast Refresh smoothness, not correctness.
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
