import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LanguageProvider } from "../context/LanguageContext";
import SavedCountries from "./SavedCountries";

const COUNTRIES = [
  {
    name: { common: "Canada" },
    population: 38000000,
    region: "Americas",
    capital: ["Ottawa"],
    flags: { svg: "canada.svg" },
    cca3: "CAN",
  },
];

function mockFetch({ allUsers = [] } = {}) {
  return vi.fn((url) => {
    if (url === "/api/get-newest-user") {
      return Promise.resolve({ json: () => Promise.resolve([]) });
    }
    if (url === "/api/get-all-users") {
      return Promise.resolve({ json: () => Promise.resolve(allUsers) });
    }
    if (url === "/api/add-one-user") {
      return Promise.resolve({ json: () => Promise.resolve({}) });
    }
    return Promise.reject(new Error(`Unhandled fetch in test: ${url}`));
  });
}

function renderSavedCountries(props = {}) {
  render(
    <LanguageProvider>
      <BrowserRouter>
        <SavedCountries countries={COUNTRIES} savedCountries={[]} {...props} />
      </BrowserRouter>
    </LanguageProvider>,
  );
}

beforeEach(() => {
  globalThis.fetch = mockFetch();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("SavedCountries", () => {
  it("only shows countries actually in the saved list", () => {
    renderSavedCountries({ savedCountries: [{ country_name: "Canada" }] });

    expect(screen.getByText("Canada")).toBeInTheDocument();
  });

  it("does not show unsaved countries", () => {
    renderSavedCountries({ savedCountries: [] });

    expect(screen.queryByText("Canada")).not.toBeInTheDocument();
  });

  it("submits the profile form to the backend and shows a welcome message", async () => {
    const user = userEvent.setup();
    renderSavedCountries();

    await user.type(screen.getByPlaceholderText("Name"), "Ada Lovelace");
    await user.type(screen.getByPlaceholderText("Email"), "ada@example.com");
    await user.type(screen.getByPlaceholderText("Country"), "Canada");
    await user.type(screen.getByPlaceholderText("Bio"), "First programmer.");
    await user.click(screen.getByRole("button", { name: "Save Profile" }));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/add-one-user",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "Ada Lovelace",
          country_name: "Canada",
          email: "ada@example.com",
          bio: "First programmer.",
        }),
      }),
    );

    expect(
      await screen.findByText("Welcome, Ada Lovelace!"),
    ).toBeInTheDocument();
  });

  it("clears the form fields after a successful submit", async () => {
    const user = userEvent.setup();
    renderSavedCountries();

    const nameInput = screen.getByPlaceholderText("Name");
    await user.type(nameInput, "Ada Lovelace");
    await user.click(screen.getByRole("button", { name: "Save Profile" }));

    await screen.findByText("Welcome, Ada Lovelace!");
    expect(nameInput).toHaveValue("");
  });

  it("renders users returned from the backend", async () => {
    globalThis.fetch = mockFetch({
      allUsers: [
        {
          user_id: 1,
          name: "Grace Hopper",
          country_name: "USA",
          email: "grace@example.com",
          bio: "Compiler pioneer.",
        },
      ],
    });

    renderSavedCountries();

    expect(await screen.findByText("Grace Hopper")).toBeInTheDocument();
  });
});
