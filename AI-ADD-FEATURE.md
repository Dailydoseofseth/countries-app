# Activity: Building a New Feature with Claude's AI Agent

**Project:** Countries Project
**Tools:** Claude (with AI Agent)

## What You'll Do

You'll use Claude's AI Agent to add a new feature to the Countries project, then use the same agent to test it, debug it, and clean it up. Your instructor will check in with you at several points — look for the 🔔 **Instructor Check-in** boxes below and flag the instructor when you hit one.

---

## Before You Start

Make sure you have:

- [ ] Claude installed and opened
- [ ] The Countries project cloned to your computer, and open as your workspace in Claude
- [ ] Git installed and working from your terminal (or Claude's built-in terminal: **View → Terminal**, or `Cmd+``)
- [ ] Confirmed you're starting from an up-to-date `main` (or `master`) branch

---

## Step 1: Create Your Own Branch

You'll do this work on a dedicated branch so it never touches `main` and your instructor can review your changes independently.

**In the terminal (inside Claude):**

```bash
# Make sure you're on the main branch and it's up to date
git checkout main
git pull

# Create and switch to a new branch for this activity
git checkout -b feature/<your-name>-<short-feature-name>
```

Example:

```bash
git checkout -b feature/jordan-favorites-list
```

**Naming convention:** `feature/<your-name>-<short-feature-name>`, all lowercase, words separated by hyphens.

**Confirm you're on the new branch:**

```bash
git branch
```

Your branch name should have a `*` next to it.

### Doing this with the AI Agent instead

You can also ask Claude's Agent to do this for you. Open the Agent panel (`Cmd+I` on Mac) and type something like:

> "Create and check out a new git branch called `feature/jordan-favorites-list` off of an up-to-date main branch."

The agent will run the terminal commands and show you what it did — read that output before moving on, so you know it actually landed on the right branch.

---

## Step 2: Pick Your Feature

Choose one feature to add to the Countries project. Or you can make up your own!

Example feature ideas:

**Data & comparison**

- **Country comparison tool** — pick two (or more) countries and see stats side by side (population, area, region, languages)
- **Stats visualization** — a bar chart or graph of top N countries by population/area (good excuse to bring in a charting library)
- **Neighboring countries explorer** — click a country and highlight/list its bordering countries

**Interactive/game-like**

- **Flag or capital quiz** — show a flag, guess the country (or vice versa); nice because it needs actual game-state logic (score, "next question"), which gives the agent more to debug
- **"Random country of the day"** with some persistence so it doesn't just reroll every refresh

**Personalization**

- **Visited countries tracker** — separate from favorites: mark countries you've been to, show a % of world visited
- **Personal notes on a country** — a small text field per country that saves locally

**Under-the-hood / non-visual features**

- **Accessibility pass** — keyboard navigation, ARIA labels, focus states on existing cards/lists. Good one specifically because it stress-tests the "optimization suggestions" part of the activity rather than pure code-gen.
- **Offline support / caching** — cache the API response so the app still shows data without network. Forces the agent into a different kind of problem (service worker or local storage caching) than the UI-feature pattern the others fall into.
- **i18n / language toggle** for the UI itself (not the country data) — translate a few UI strings into 2–3 languages
- A **random country** button

Write one sentence describing your feature before moving on — you'll use it in your prompt to the agent.

---

````code
# Activity: Building a New Feature with Claude's AI Agent

**Project:** Countries Project
**Tools:** Claude (with AI Agent)

## What You'll Do

You'll use Claude's AI Agent to add a new feature to the Countries project, then use the same agent to test it, debug it, and clean it up. Your instructor will check in with you at several points — look for the 🔔 **Instructor Check-in** boxes below and flag the instructor when you hit one.

---

## Before You Start

Make sure you have:

- [ ]  Claude installed and opened
- [ ]  The Countries project cloned to your computer, and open as your workspace in Claude
- [ ]  Git installed and working from your terminal (or Claude's built-in terminal: **View → Terminal**, or `Cmd+``)
- [ ]  Confirmed you're starting from an up-to-date `main` (or `master`) branch


---

## Step 1: Create Your Own Branch

You'll do this work on a dedicated branch so it never touches `main` and your instructor can review your changes independently.

**In the terminal (inside Claude):**

```bash
# Make sure you're on the main branch and it's up to date
git checkout main
git pull

# Create and switch to a new branch for this activity
git checkout -b feature/<your-name>-<short-feature-name>
````

Example:

```bash
git checkout -b feature/jordan-favorites-list
```

**Naming convention:** `feature/<your-name>-<short-feature-name>`, all lowercase, words separated by hyphens.

**Confirm you're on the new branch:**

```bash
git branch
```

Your branch name should have a `*` next to it.

### Doing this with the AI Agent instead

You can also ask Claude's Agent to do this for you. Open the Agent panel (`Cmd+I` on Mac) and type something like:

> "Create and check out a new git branch called `feature/jordan-favorites-list` off of an up-to-date main branch."

The agent will run the terminal commands and show you what it did — read that output before moving on, so you know it actually landed on the right branch.

---

## Step 2: Pick Your Feature

Choose one feature to add to the Countries project. Or you can make up your own!

Example feature ideas:

**Data & comparison**

- **Country comparison tool** — pick two (or more) countries and see stats side by side (population, area, region, languages)
- **Stats visualization** — a bar chart or graph of top N countries by population/area (good excuse to bring in a charting library)
- **Neighboring countries explorer** — click a country and highlight/list its bordering countries

**Interactive/game-like**

- **Flag or capital quiz** — show a flag, guess the country (or vice versa); nice because it needs actual game-state logic (score, "next question"), which gives the agent more to debug
- **"Random country of the day"** with some persistence so it doesn't just reroll every refresh

**Personalization**

- **Visited countries tracker** — separate from favorites: mark countries you've been to, show a % of world visited
- **Personal notes on a country** — a small text field per country that saves locally

**Under-the-hood / non-visual features**

- **Accessibility pass** — keyboard navigation, ARIA labels, focus states on existing cards/lists. Good one specifically because it stress-tests the "optimization suggestions" part of the activity rather than pure code-gen.
- **Offline support / caching** — cache the API response so the app still shows data without network. Forces the agent into a different kind of problem (service worker or local storage caching) than the UI-feature pattern the others fall into.
- **i18n / language toggle** for the UI itself (not the country data) — translate a few UI strings into 2–3 languages
- A **random country** button

### Write one sentence describing your feature before moving on — you'll use it in your prompt to the agent.

```sql
i18n / language toggle for the UI itself (not the country data) — translate a few UI strings into 2–3 languages (Taiwanese, Vietnamese, English)
```

---

## Step 3: Generate the Feature with Claude's Agent

1. Open the Agent panel: `Cmd+I` (Mac). Make sure it's set to **Agent** mode (use the mode switcher — `Shift+Tab` cycles through Agent / Ask / Plan / Debug — or the dropdown in the panel).
2. Give the agent context and a clear, specific prompt. A weak prompt gets a weak result. Compare:
   - ❌ **Weak:** "Add a favorites feature."
   - ✅ **Better:** "Add a favorites feature to the Countries project. Users should be able to click a star icon on any country card to save it, and view a separate 'Favorites' page listing only saved countries. Match the existing component structure and styling used elsewhere in the app."

   Tip: use `@` to reference specific files or folders (e.g., `@components/CountryCard`) so the agent has the right context instead of guessing at your project structure.

3. Let the agent propose changes. It will show a **plan** and then a **diff** for each file it wants to change.
4. **Read the diff before accepting it.** Don't click Accept on autopilot — check that the agent changed what you expected and didn't touch unrelated files. Accept file-by-file if you want more control.
5. If it's missing something or went the wrong direction, don't start over — reply in the same thread and refine: "This looks good, but also show a count of saved countries at the top of the Favorites page."

---

## Step 4: Test and Debug with the Agent

1. Ask the agent to write tests for the feature you just added, e.g.:

   > "Write tests for the favorites feature you just added, covering: adding a country to favorites, removing it, and the Favorites page showing the correct list."
   >
   > \*You can also ask the agent what tests would be appropriate for the feature you have built together.

2. Run the tests (ask the agent to run them for you, or run your project's normal test command yourself).
3. If something fails, don't fix it by hand first — try the agent first:

   > "This test is failing: [paste the error]. Look at the relevant code and fix the issue."

4. Manually try the feature in the browser/app too. Automated tests passing doesn't guarantee the feature actually feels right to use.

---

## Step 5: Documentation and Optimization Pass

Ask the agent to review its own work critically:

> "Review the code you just wrote for the favorites feature. Suggest any optimizations, point out any edge cases I should handle, and add clear comments or docstrings where they're missing."

Then:

- Skim the suggestions — you don't have to take all of them.
- If your project has a README, ask the agent to add a short section describing the new feature.
- Apply at least one optimization or documentation suggestion, and note in your own words why it's an improvement.

---

## Step 6: Wrap Up

```bash
git add .
git commit -m "Add favorites feature"
git push -u origin feature/<your-name>-<short-feature-name>
```

> 🔔 Are you able to briefly explain what the feature does, one thing the agent got right on the first try, and one thing you had to correct or redirect it on?

---

## Claude Code Quick Reference (VS Code Terminal)

Claude Code is primarily a CLI tool, not a GUI panel — you run it inside a terminal (VS Code's integrated terminal works fine: **View → Terminal**, or `` Cmd+` `` / `` Ctrl+` ``).

**In the terminal:**

| Action                                        | Mac      | Windows / Linux | Notes                                            |
| ---------------------------------------------- | -------- | ---------------- | ------------------------------------------------- |
| Start Claude Code                              | `claude` | `claude`          | Run from your project's root directory            |
| Interrupt the current response                 | `Ctrl+C` | `Ctrl+C`          | Stops whatever Claude is doing                     |
| Exit Claude Code                               | `Ctrl+D` | `Ctrl+D`          | Or type `/exit`                                    |
| Cycle interaction modes (e.g. into Plan Mode)  | `Shift+Tab` | `Shift+Tab`    | Cycles between normal / auto-accept / plan mode    |
| Reference a file or folder in a prompt         | `@filename` or `@foldername` | same | Typed text, not a keybinding — works the same on every OS |
| Run a one-off shell command without leaving the session | `! <command>` | same | Typed text, not a keybinding |

**Useful slash commands (type these into the prompt):**

| Command         | Purpose                                              |
| --------------- | ----------------------------------------------------- |
| `/help`         | Show help and available commands                       |
| `/clear`        | Start a fresh conversation                             |
| `/config`       | Open settings (theme, model, permissions, etc.)         |
| `/code-review`  | Review your current diff for bugs and cleanups          |
| `/init`         | Generate a CLAUDE.md file describing this codebase      |

> If you've also installed the Claude Code extension for VS Code, it adds its own sidebar and commands on top of the CLI — open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and search "Claude" to see what's available in your installed version, since extension shortcuts can change between releases.

---

## Quick Reference

| Action                                 | Shortcut (Mac / Win-Linux)   |
| -------------------------------------- | ---------------------------- |
| Open Agent                             | `Cmd+I`                      |
| Cycle Agent / Ask / Plan / Debug modes | `Shift+Tab`                  |
| Inline edit on selected code           | `Cmd+K`                      |
| Open chat                              | `Cmd+L`                      |
| Reference a file/folder in a prompt    | `@filename` or `@foldername` |
| Terminal                               | `Cmd+``                      |

**Reminder:** always read the agent's plan and diffs before accepting. You're responsible for the code that ends up in your branch, even if the agent wrote it.

````
---
---

## Step 3: Generate the Feature with Claude's Agent

1. Open the Agent panel: `Cmd+I` (Mac). Make sure it's set to **Agent** mode (use the mode switcher — `Shift+Tab` cycles through Agent / Ask / Plan / Debug — or the dropdown in the panel).
2. Give the agent context and a clear, specific prompt. A weak prompt gets a weak result. Compare:
    - ❌ **Weak:** "Add a favorites feature."
    - ✅ **Better:** "Add a favorites feature to the Countries project. Users should be able to click a star icon on any country card to save it, and view a separate 'Favorites' page listing only saved countries. Match the existing component structure and styling used elsewhere in the app."

    Tip: use `@` to reference specific files or folders (e.g., `@components/CountryCard`) so the agent has the right context instead of guessing at your project structure.

3. Let the agent propose changes. It will show a **plan** and then a **diff** for each file it wants to change.
4. **Read the diff before accepting it.** Don't click Accept on autopilot — check that the agent changed what you expected and didn't touch unrelated files. Accept file-by-file if you want more control.
5. If it's missing something or went the wrong direction, don't start over — reply in the same thread and refine: "This looks good, but also show a count of saved countries at the top of the Favorites page."

---

## Step 4: Test and Debug with the Agent

1. Ask the agent to write tests for the feature you just added, e.g.:

    > "Write tests for the favorites feature you just added, covering: adding a country to favorites, removing it, and the Favorites page showing the correct list."
    >
    *You can also ask the agent what tests would be appropriate for the feature you have built together.
2. Run the tests (ask the agent to run them for you, or run your project's normal test command yourself).
3. If something fails, don't fix it by hand first — try the agent first:

    > "This test is failing: [paste the error]. Look at the relevant code and fix the issue."
    >
4. Manually try the feature in the browser/app too. Automated tests passing doesn't guarantee the feature actually feels right to use.

---

## Step 5: Documentation and Optimization Pass

Ask the agent to review its own work critically:

> "Review the code you just wrote for the favorites feature. Suggest any optimizations, point out any edge cases I should handle, and add clear comments or docstrings where they're missing."
>

Then:

- Skim the suggestions — you don't have to take all of them.
- If your project has a README, ask the agent to add a short section describing the new feature.
- Apply at least one optimization or documentation suggestion, and note in your own words why it's an improvement.

---

## Step 6: Wrap Up

```bash
git add .
git commit -m "Add favorites feature"
git push -u origin feature/<your-name>-<short-feature-name>
````

> 🔔 Are you able to briefly explain what the feature does, one thing the agent got right on the first try, and one thing you had to correct or redirect it on?

---

## Quick Reference

| Action                                 | Shortcut (Mac / Win-Linux)   |
| -------------------------------------- | ---------------------------- |
| Open Agent                             | `Cmd+I`                      |
| Cycle Agent / Ask / Plan / Debug modes | `Shift+Tab`                  |
| Inline edit on selected code           | `Cmd+K`                      |
| Open chat                              | `Cmd+L`                      |
| Reference a file/folder in a prompt    | `@filename` or `@foldername` |
| Terminal                               | `Cmd+``                      |

**Reminder:** always read the agent's plan and diffs before accepting. You're responsible for the code that ends up in your branch, even if the agent wrote it.
