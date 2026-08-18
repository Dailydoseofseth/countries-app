import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "theme";
const THEMES = ["light", "dark", "inverted"];
const DEFAULT_THEME = "light";

function getSystemTheme() {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return DEFAULT_THEME;
}

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  // Only fall back to the OS preference when the user never chose explicitly;
  // "inverted" is a manual-only mode, never auto-selected from system prefs.
  return stored && THEMES.includes(stored) ? stored : getSystemTheme();
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Reflect the active theme onto <html> so CSS can key off [data-theme=...]
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function setTheme(nextTheme) {
    setThemeState(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  function cycleTheme() {
    const nextIndex = (THEMES.indexOf(theme) + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Colocated with ThemeProvider on purpose; only affects Fast Refresh smoothness, not correctness.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
