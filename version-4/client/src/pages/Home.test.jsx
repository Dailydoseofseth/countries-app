import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";

import { LanguageProvider } from "../context/LanguageContext";
import Home from "./Home";

const COUNTRIES = [
  {
    name: { common: "Canada" },
    population: 38000000,
    region: "Americas",
    capital: ["Ottawa"],
    flags: { svg: "canada.svg" },
    cca3: "CAN",
  },
  {
    name: { common: "Japan" },
    population: 125000000,
    region: "Asia",
    capital: ["Tokyo"],
    flags: { svg: "japan.svg" },
    cca3: "JPN",
  },
  {
    name: { common: "France" },
    population: 68000000,
    region: "Europe",
    capital: ["Paris"],
    flags: { svg: "france.svg" },
    cca3: "FRA",
  },
];

function renderHome() {
  render(
    <LanguageProvider>
      <BrowserRouter>
        <Home countries={COUNTRIES} />
      </BrowserRouter>
    </LanguageProvider>,
  );
}

afterEach(() => {
  cleanup();
});

describe("Home", () => {
  it("renders every country by default", () => {
    renderHome();

    expect(screen.getByText("Canada")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
  });

  it("filters countries as the user types in the search box", async () => {
    const user = userEvent.setup();
    renderHome();

    await user.type(screen.getByPlaceholderText("Search for a country..."), "jap");

    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.queryByText("Canada")).not.toBeInTheDocument();
    expect(screen.queryByText("France")).not.toBeInTheDocument();
  });

  it("filters countries by selected region", async () => {
    const user = userEvent.setup();
    renderHome();

    await user.selectOptions(screen.getByDisplayValue("Filter by Region"), "Europe");

    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.queryByText("Canada")).not.toBeInTheDocument();
    expect(screen.queryByText("Japan")).not.toBeInTheDocument();
  });

  it("combines search and region filters", async () => {
    const user = userEvent.setup();
    renderHome();

    await user.selectOptions(screen.getByDisplayValue("Filter by Region"), "Americas");
    await user.type(screen.getByPlaceholderText("Search for a country..."), "japan");

    expect(screen.queryByText("Canada")).not.toBeInTheDocument();
    expect(screen.queryByText("Japan")).not.toBeInTheDocument();
  });
});
