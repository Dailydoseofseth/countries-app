import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, afterEach, describe, expect, it } from "vitest";
import { LanguageProvider, useLanguage } from "./LanguageContext";

function LanguageProbe() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <span data-testid="translated-text">{t("savedCountries")}</span>
      <button onClick={() => setLanguage("vi")}>Switch to Vietnamese</button>
    </div>
  );
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
});

describe("LanguageContext", () => {
  it("defaults to English when nothing is stored", () => {
    render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("current-language")).toHaveTextContent("en");
    expect(screen.getByTestId("translated-text")).toHaveTextContent(
      "Saved Countries",
    );
  });

  it("re-renders translated text when the language changes", async () => {
    const user = userEvent.setup();

    render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>,
    );

    await user.click(screen.getByText("Switch to Vietnamese"));

    expect(screen.getByTestId("current-language")).toHaveTextContent("vi");
    expect(screen.getByTestId("translated-text")).toHaveTextContent(
      "Quốc gia đã lưu",
    );
  });

  it("persists the chosen language across a remount", async () => {
    const user = userEvent.setup();

    const { unmount } = render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>,
    );

    await user.click(screen.getByText("Switch to Vietnamese"));
    unmount();

    render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("current-language")).toHaveTextContent("vi");
  });

  it("falls back to the key itself for an unknown translation key", () => {
    function UnknownKeyProbe() {
      const { t } = useLanguage();
      return <span data-testid="unknown">{t("thisKeyDoesNotExist")}</span>;
    }

    render(
      <LanguageProvider>
        <UnknownKeyProbe />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("unknown")).toHaveTextContent(
      "thisKeyDoesNotExist",
    );
  });
});
