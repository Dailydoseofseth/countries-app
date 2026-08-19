import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "./ThemeContext";

function ThemeProbe() {
  const { theme, setTheme, cycleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme("dark")}>Switch to dark</button>
      <button onClick={() => setTheme("inverted")}>Switch to inverted</button>
      <button onClick={cycleTheme}>Cycle</button>
    </div>
  );
}

function mockSystemPreference(prefersDark) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: prefersDark && query === "(prefers-color-scheme: dark)",
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

beforeEach(() => {
  localStorage.clear();
  mockSystemPreference(false);
});

afterEach(() => {
  cleanup();
});

describe("ThemeContext", () => {
  it("defaults to light when nothing is stored and the OS prefers light", () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("defaults to dark when nothing is stored and the OS prefers dark", () => {
    mockSystemPreference(true);

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
  });

  it("switches themes live and updates the document attribute", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    await user.click(screen.getByText("Switch to inverted"));

    expect(screen.getByTestId("current-theme")).toHaveTextContent("inverted");
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      "inverted",
    );
  });

  it("persists the chosen theme across a remount", async () => {
    const user = userEvent.setup();

    const { unmount } = render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    await user.click(screen.getByText("Switch to dark"));
    unmount();

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
  });

  it("cycles through light -> dark -> inverted -> google -> light", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");

    await user.click(screen.getByText("Cycle"));
    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");

    await user.click(screen.getByText("Cycle"));
    expect(screen.getByTestId("current-theme")).toHaveTextContent("inverted");

    await user.click(screen.getByText("Cycle"));
    expect(screen.getByTestId("current-theme")).toHaveTextContent("google");

    await user.click(screen.getByText("Cycle"));
    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
  });
});
